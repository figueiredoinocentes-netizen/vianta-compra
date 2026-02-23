import { Zap, Fuel, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Vehicle } from "@/data/vehicles";
import { trackEvent } from "@/lib/meta-pixel";

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
}

const FuelIcon = ({ fuel }: { fuel: string }) => {
  if (fuel === "Elétrico") return <Zap className="w-3.5 h-3.5" />;
  return <Fuel className="w-3.5 h-3.5" />;
};

const VehicleCard = ({ vehicle, onSelect }: VehicleCardProps) => {
  return (
    <div
      className="flex-none w-[88vw] max-w-[360px] bg-card rounded-2xl shadow-md border border-border overflow-hidden snap-center cursor-pointer active:scale-[0.98] transition-transform"
      onClick={() => { trackEvent("ViewContent", { content_name: vehicle.model }); onSelect(vehicle); }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(vehicle)}
    >
      {/* Car image */}
      <div className="relative bg-secondary h-52 overflow-hidden">
        <img
          src={vehicle.imageUrl}
          alt={vehicle.model}
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Availability badge */}
        <div className="absolute top-3 left-3">
          {vehicle.availability === "available" ? (
            <span className="inline-flex items-center gap-1 bg-available-bg text-available text-xs font-semibold px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3" />
              Disponível
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-soon-bg text-soon-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              Disponível em breve
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground text-lg leading-tight font-heading">{vehicle.model}</h3>
            <p className="text-muted-foreground text-sm">{vehicle.year}</p>
          </div>
          <div className="text-right">
            {vehicle.previousPrice && (
              <p className="text-sm text-muted-foreground line-through leading-none mb-0.5">{vehicle.previousPrice}€</p>
            )}
            <p className="text-3xl font-extrabold text-primary leading-none">{vehicle.weeklyPrice}€</p>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-heading">por semana</p>
          </div>
        </div>

        {/* Specs icons */}
        <div className="flex items-center gap-3 mb-5 text-muted-foreground">
          <span className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
            </svg>
            {vehicle.transmission}
          </span>
          <span className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md">
            <FuelIcon fuel={vehicle.fuel} />
            {vehicle.fuelLabel ?? vehicle.fuel}
          </span>
        </div>

        <Button
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl h-12"
        >
          Mais Informação
        </Button>
      </div>
    </div>
  );
};

export default VehicleCard;
