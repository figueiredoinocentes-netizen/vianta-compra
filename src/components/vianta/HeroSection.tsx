import { useEffect, useRef, useState } from "react";
import type { Vehicle } from "@/data/vehicles";
import { fetchVehicles } from "@/lib/sheet-vehicles";
import VehicleCard from "./VehicleCard";

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLElement>;
  onContact: () => void;
}

const VehicleSkeleton = () => (
  <div className="flex-none w-[88vw] max-w-[360px] bg-card rounded-2xl shadow-md border border-border overflow-hidden snap-center">
    <div className="h-52 bg-muted animate-pulse" />
    <div className="p-5 space-y-3">
      <div className="h-5 w-2/3 bg-muted animate-pulse rounded" />
      <div className="h-3 w-1/3 bg-muted animate-pulse rounded" />
      <div className="h-10 w-full bg-muted animate-pulse rounded mt-4" />
      <div className="h-12 w-full bg-muted animate-pulse rounded mt-2" />
    </div>
  </div>
);

const HeroSection = ({ heroRef, onContact }: HeroSectionProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchVehicles()
      .then((data) => { if (!cancelled) { setVehicles(data); setLoading(false); } })
      .catch((err) => {
        console.error("[HeroSection] failed to load vehicles:", err);
        if (!cancelled) { setError(true); setLoading(false); }
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <section
      ref={heroRef as React.RefObject<HTMLDivElement>}
      id="hero"
      className="bg-primary pt-8 pb-10">

      <div className="px-5 mb-8">
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

      {/* Carousel (mobile) / Vertical list (desktop) */}
      <div ref={carouselRef}
      className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none px-[9vw] md:flex-col md:items-center md:overflow-x-visible md:snap-none md:px-5 md:max-w-2xl md:mx-auto md:gap-6"
      style={{ WebkitOverflowScrolling: "touch" }}>

        {loading && (
          <>
            <VehicleSkeleton />
            <VehicleSkeleton />
            <VehicleSkeleton />
          </>
        )}
        {!loading && vehicles.map((vehicle) =>
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onSelect={onContact} />
        )}
      </div>

    </section>
  );
};

export default HeroSection;
