import { useRef } from "react";
import { vehicles } from "@/data/vehicles";
import VehicleCard from "./VehicleCard";
import type { Vehicle } from "@/data/vehicles";

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLElement>;
  onContact: (vehicleLabel: string) => void;
}

const HeroSection = ({ heroRef, onContact }: HeroSectionProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleSelect = (vehicle: Vehicle) => {
    onContact(`${vehicle.model} (${vehicle.year})`);
  };

  return (
    <section
      ref={heroRef as React.RefObject<HTMLDivElement>}
      id="hero"
      className="bg-primary pt-8 pb-10">

      <div className="px-5 mb-8">
        <h1 className="text-3xl font-bold text-primary-foreground leading-tight mb-2 text-center font-heading tracking-tight">Encontre a sua viatura ideal</h1>
        <p className="text-primary-foreground/70 text-sm text-center mt-1">Viaturas preparadas para atividade TVDE, prontas a trabalhar.</p>
      </div>

      {/* Carousel */}
      <div ref={carouselRef}
      className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none px-[9vw]"
      style={{ WebkitOverflowScrolling: "touch" }}>

        {vehicles.map((vehicle) =>
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onSelect={handleSelect} />
        )}
      </div>

      {/* Swipe hint */}
      <p className="text-center text-primary-foreground/50 text-xs mt-5">
        ← deslize para ver mais →
      </p>
    </section>
  );
};

export default HeroSection;
