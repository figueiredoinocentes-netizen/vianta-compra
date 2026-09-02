/**
 * Carrega viaturas dinamicamente da Google Sheet pública (aba "Venda").
 *
 * IMPORTANTE: A sheet TEM de continuar com permissão "Qualquer pessoa com o
 * link pode ver". Se for tornada privada este endpoint deixa de funcionar.
 */
import type { Vehicle, Fuel, Transmission, Availability } from "@/data/vehicles";

const SHEET_ID = "1IymwMQtujdohVQPEuIfjxqZvH8EfZTLyp8wW7K7hO00";
const SHEET_NAME = "Venda";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;

/** Parser CSV minimal — lida com aspas duplas e vírgulas dentro de campos. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = false; }
      } else {
        field += c;
      }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
      else if (c === "\r") { /* skip */ }
      else field += c;
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

/** "28 500,00 €" -> 28500 ; "" -> undefined */
function parsePtNumber(v: string | undefined): number | undefined {
  if (!v) return undefined;
  const cleaned = v.replace(/[€\s]/g, "").replace(/\./g, "").replace(",", ".");
  if (!cleaned) return undefined;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : undefined;
}

/** Converte URL Drive em URL embutível como <img>. */
function normalizeDriveUrl(url: string | undefined, size = 800): string {
  if (!url) return "/placeholder.svg";
  const m = url.match(/\/file\/d\/([^/]+)/) || url.match(/[?&]id=([^&]+)/);
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w${size}`;
  return url;
}

/**
 * "Fotos Reais" pode conter: vazio, um link de ficheiro Drive, vários links
 * (vírgula ou quebra de linha) ou um link de PASTA Drive.
 * Links de pasta são ignorados (não é possível listar sem API autenticada).
 */
function parseRealPhotos(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((u) => /^https?:\/\//i.test(u))
    .filter((u) => !/\/drive\/(u\/\d+\/)?folders\//i.test(u))
    .map((u) => normalizeDriveUrl(u, 1200));
}

function slugify(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function mapAvailability(estado: string): Availability | null {
  const e = estado.trim().toLowerCase();
  if (e === "para venda") return "stock";
  if (e === "por encomenda") return "order";
  if (e === "disponível em breve" || e === "disponivel em breve") return "soon";
  if (e === "vendido") return "sold";
  if (e === "acordo verbal") return "reserved";
  return null;
}

/** "17/8/2026" | "17/08/2026" -> Date | null */
function parsePtDate(v: string | undefined): Date | null {
  if (!v) return null;
  const m = v.trim().match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (!m) return null;
  const d = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  return Number.isNaN(d.getTime()) ? null : d;
}

function daysSince(date: Date): number {
  return (Date.now() - date.getTime()) / 86400000;
}

const ORDER: Record<Availability, number> = {
  stock: 0, order: 0, soon: 0, reserved: 1, sold: 2,
};

function mapFuel(v: string): Fuel {
  const x = v.trim().toLowerCase();
  if (x.startsWith("elét") || x.startsWith("elec")) return "Elétrico";
  if (x.startsWith("híb") || x.startsWith("hib")) return "Híbrido";
  if (x.startsWith("dies")) return "Diesel";
  if (x === "gpl" || x === "glp" || x === "lpg" || x.includes("gpl") || x.includes("lpg")) return "GPL";
  return "Gasolina";
}

function mapTransmission(v: string): Transmission {
  return v.trim().toLowerCase().startsWith("manual") ? "Manual" : "Automático";
}

export async function fetchVehicles(): Promise<Vehicle[]> {
  const res = await fetch(CSV_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Sheet HTTP ${res.status}`);
  const text = await res.text();
  const rows = parseCsv(text);
  if (rows.length < 2) return [];

  const header = rows[0].map((h) => h.trim());
  const idx = (name: string) => header.indexOf(name);

  const iCarro = idx("Carro");
  const iVersao = idx("Versão");
  const iValor = idx("Valor");
  const iPrest = idx("120 Meses/10 anos");
  const iAuton = idx("Autonomia Real");
  const iCategorias = idx("Categorias");
  const iComb = idx("Combustível");
  const iEstado = idx("Estado");
  const iAno = idx("Ano");
  const iKm = idx("KM's");
  const iCaixa = idx("Caixa");
  const iFoto = idx("Foto");
  const iDispDe = idx("Disponível a partir de");
  const iDataVendido = idx("Data Vendido");

  const vehicles: Vehicle[] = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.length === 0) continue;
    const estado = row[iEstado] ?? "";
    const availability = mapAvailability(estado);
    if (!availability) continue;

    if (availability === "sold") {
      // Defensivo: se a coluna "Data Vendido" ainda não existir, esconder como antes.
      if (iDataVendido < 0) continue;
      const soldAt = parsePtDate(row[iDataVendido]);
      if (!soldAt) continue;
      const age = daysSince(soldAt);
      if (age > 30) continue;
    }

    const model = (row[iCarro] ?? "").trim();
    if (!model) continue;

    const version = (row[iVersao] ?? "").trim() || undefined;
    const year = (row[iAno] ?? "").trim();
    const salePrice = parsePtNumber(row[iValor]) ?? 0;
    const monthlyPrice = parsePtNumber(row[iPrest]);
    const realRange = parsePtNumber(row[iAuton]);
    const mileage = parsePtNumber(row[iKm]) ?? 0;
    const fuelRaw = (row[iComb] ?? "").trim();
    const fuel = mapFuel(fuelRaw);
    const fuelLabel = fuelRaw || undefined;
    const transmission = mapTransmission(row[iCaixa] ?? "");
    const imageUrl = normalizeDriveUrl(row[iFoto]);
    const categories = (row[iCategorias] ?? "")
      .split(",").map((c) => c.trim()).filter(Boolean);
    const availableFrom = iDispDe >= 0 ? (row[iDispDe] ?? "").trim() || undefined : undefined;

    vehicles.push({
      id: `${slugify(model)}-${r}`,
      model,
      version,
      year,
      transmission,
      fuel,
      fuelLabel,
      salePrice,
      monthlyPrice,
      realRange,
      mileage,
      imageUrl,
      specs: [],
      seats: 5,
      categories: categories.length ? categories : undefined,
      availability,
      availableFrom,
    });
  }

  vehicles.sort((a, b) => ORDER[a.availability ?? "stock"] - ORDER[b.availability ?? "stock"]);

  return vehicles;
}
