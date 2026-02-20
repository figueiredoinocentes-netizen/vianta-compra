import { useRef, useState } from "react";
import { vehicles } from "@/data/vehicles";
import VehicleCard from "./VehicleCard";
import VehicleBottomSheet from "./VehicleBottomSheet";
import type { Vehicle } from "@/data/vehicles";

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLElement>;
  onContact: () => void;
}

const HeroSection = ({ heroRef, onContact }: HeroSectionProps) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setSheetOpen(true);
  };

  return (
    <section
      ref={heroRef as React.RefObject<HTMLDivElement>}
      id="hero"
      className="bg-primary pt-6 pb-8">

      <div className="px-5 mb-6">
        <h1 className="text-3xl font-extrabold text-primary-foreground leading-tight mb-2 text-center">Escolha a viatura
e comece já!<br />e comece já.
        </h1>
        <p className="text-primary-foreground/70 text-sm">
          Veja disponibilidade e preços — sem compromisso.
        </p>
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none px-5"
        style={{ WebkitOverflowScrolling: "touch" }}>

        {vehicles.map((vehicle) =>
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onSelect={handleSelect} />

        )}
        {/* Trailing spacer so last card doesn't sit flush against edge */}
        <div className="flex-none w-4" />
      </div>

      {/* Swipe hint */}
      <p className="text-center text-primary-foreground/50 text-xs mt-3">
        ← deslize para ver mais →
      </p>

      <VehicleBottomSheet
        vehicle={selectedVehicle}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onContact={onContact} />

    </section>);

};

export default HeroSection;