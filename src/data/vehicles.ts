export type Transmission = "Automático" | "Manual";
export type Fuel = "Elétrico" | "Híbrido" | "Gasolina" | "Diesel" | "GPL";
export type Availability = "stock" | "order" | "soon" | "sold" | "reserved";

export interface Vehicle {
  id: string;
  model: string;
  version?: string;
  /** String para preservar formatos como "06/2024" ou "2023" vindos da sheet */
  year: string;
  transmission: Transmission;
  fuel: Fuel;
  fuelLabel?: string;
  salePrice: number;
  monthlyPrice?: number;
  realRange?: number;
  mileage: number;
  imageUrl: string;
  specs: string[];
  seats: number;
  categories?: string[];
  availableFrom?: string;
  availability?: Availability;
  /** Texto livre de destaque da viatura */
  highlight?: string;
  horsepower?: string;
  battery?: string;
  bootVolume?: string;
  batteryHealth?: string;
  warrantyVehicle?: string;
  warrantyBattery?: string;
  color?: string;
  tvdeEligibleUntil?: string;
  /** Galeria de fotos (fotos reais + foto de stock como fallback) */
  gallery?: string[];
}

/**
 * Fallback estático — usado apenas como referência ou se a sheet falhar.
 * Os dados em produção vêm de Google Sheets via src/lib/sheet-vehicles.ts
 */
export const fallbackVehicles: Vehicle[] = [
  {
    id: "peugeot-e2008",
    model: "Peugeot e2008",
    version: "GT Electric 50kWh",
    year: "2024",
    transmission: "Automático",
    fuel: "Elétrico",
    salePrice: 28500,
    monthlyPrice: 285,
    realRange: 320,
    mileage: 10000,
    imageUrl: "/images/peugeot-e2008.png",
    specs: [],
    seats: 5,
    categories: ["Comfort", "Eletric", "Green"],
    availability: "stock",
  },
];
