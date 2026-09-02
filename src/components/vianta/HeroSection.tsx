import { useEffect, useMemo, useRef, useState } from "react";
import type { Fuel, Vehicle } from "@/data/vehicles";
import { fetchVehicles } from "@/lib/sheet-vehicles";
import { Slider } from "@/components/ui/slider";
import VehicleCard from "./VehicleCard";

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLElement>;
  onContact: () => void;
}

const FUEL_ORDER: Fuel[] = ["Elétrico", "Híbrido", "Gasolina", "Diesel", "GPL"];

const VehicleSkeleton = () => (
  <div className="w-full bg-card rounded-2xl shadow-md border border-border overflow-hidden">
    <div className="h-52 bg-muted animate-pulse" />
    <div className="p-5 space-y-3">
      <div className="h-5 w-2/3 bg-muted animate-pulse rounded" />
      <div className="h-3 w-1/3 bg-muted animate-pulse rounded" />
      <div className="h-10 w-full bg-muted animate-pulse rounded mt-4" />
      <div className="h-12 w-full bg-muted animate-pulse rounded mt-2" />
    </div>
  </div>
);

const chipBase = "shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors";

const HeroSection = ({ heroRef, onContact }: HeroSectionProps) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fuelFilter, setFuelFilter] = useState<Fuel | null>(null);
  const [maxMonthly, setMaxMonthly] = useState<number | null>(null);
  const priceBounds = useRef<{ min: number; max: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchVehicles()
      .then((data) => {
        if (cancelled) return;
        setVehicles(data);
        setLoading(false);
        const prices = data.map((v) => v.monthlyPrice).filter((p): p is number => !!p);
        if (prices.length) {
          const bounds = { min: Math.min(...prices), max: Math.max(...prices) };
          priceBounds.current = bounds;
          setMaxMonthly(bounds.max);
        }
      })
      .catch((err) => {
        console.error("[HeroSection] failed to load vehicles:", err);
        if (!cancelled) { setError(true); setLoading(false); }
      });
    return () => { cancelled = true; };
  }, []);

  const availableFuels = useMemo(
    () => FUEL_ORDER.filter((f) => vehicles.some((v) => v.fuel === f)),
    [vehicles],
  );

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (fuelFilter && v.fuel !== fuelFilter) return false;
      if (maxMonthly !== null && v.monthlyPrice && v.monthlyPrice > maxMonthly) return false;
      return true;
    });
  }, [vehicles, fuelFilter, maxMonthly]);

  const filtersActive = fuelFilter !== null || (priceBounds.current && maxMonthly !== priceBounds.current.max);

  return (
    <section
      ref={heroRef as React.RefObject<HTMLDivElement>}
      id="hero"
      className="bg-primary pt-8 pb-10">

      <div className="px-5 mb-6">
        <h1 className="text-3xl font-bold text-primary-foreground leading-tight mb-2 text-center font-heading tracking-tight">Adquira a sua viatura TVDE</h1>
        <p className="text-primary-foreground/70 text-sm text-center mt-1">Viaturas preparadas para atividade TVDE, prontas a trabalhar.</p>
        {error && (
          <p className="text-primary-foreground/60 text-xs text-center mt-3">
            Não foi possível carregar as viaturas. Tente novamente mais tarde.
          </p>
        )}
        {!loading && !error && vehicles.length === 0 && (
          <p className="text-primary-foreground/60 text-xs text-center mt-3">
            Sem viaturas disponíveis no momento.
          </p>
        )}
      </div>

      {/* Filtros */}
      {!loading && vehicles.length > 0 && (
        <div className="px-5 md:px-6 md:max-w-6xl md:mx-auto mb-5">
          <div className="bg-card rounded-2xl p-4 shadow-md">
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
              <button
                onClick={() => setFuelFilter(null)}
                className={`${chipBase} ${!fuelFilter ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
              >
                Todos
              </button>
              {availableFuels.map((f) => (
                <button
                  key={f}
                  onClick={() => setFuelFilter(fuelFilter === f ? null : f)}
                  className={`${chipBase} ${fuelFilter === f ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
                >
                  {f}
                </button>
              ))}
            </div>

            {priceBounds.current && priceBounds.current.max > priceBounds.current.min && maxMonthly !== null && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest font-heading">Prestação até</span>
                  <span className="text-sm font-bold text-foreground">{maxMonthly}€/mês</span>
                </div>
                <Slider
                  min={priceBounds.current.min}
                  max={priceBounds.current.max}
                  step={5}
                  value={[maxMonthly]}
                  onValueChange={([v]) => setMaxMonthly(v)}
                />
              </div>
            )}

            {filtersActive && (
              <button
                onClick={() => { setFuelFilter(null); setMaxMonthly(priceBounds.current?.max ?? null); }}
                className="text-xs font-semibold text-accent underline underline-offset-2 mt-3"
              >
                Repor filtros
              </button>
            )}
          </div>
        </div>
      )}

      {/* Grid vertical de viaturas */}
      <div
        className="grid grid-cols-1 gap-4 px-5 md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:px-6 md:max-w-6xl md:mx-auto"
      >
        {loading && (
          <>
            <VehicleSkeleton />
            <VehicleSkeleton />
            <VehicleSkeleton />
          </>
        )}
        {!loading && filteredVehicles.map((vehicle) =>
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onSelect={onContact} />
        )}
        {!loading && !error && vehicles.length > 0 && filteredVehicles.length === 0 && (
          <p className="col-span-full text-primary-foreground/60 text-xs text-center py-6">
            Sem viaturas com estes filtros.
          </p>
        )}
      </div>

    </section>
  );
};

export default HeroSection;
