import { Zap, Fuel, Gauge, Clock, CheckCircle2, BatteryCharging } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Vehicle } from "@/data/vehicles";
import { trackEvent } from "@/lib/meta-pixel";

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: () => void;
}

const FuelIcon = ({ fuel }: { fuel: string }) => {
  if (fuel === "Elétrico") return <Zap className="w-3.5 h-3.5" />;
  return <Fuel className="w-3.5 h-3.5" />;
};

const formatPrice = (price: number) =>
  price.toLocaleString("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const formatMileage = (km: number) =>
  km.toLocaleString("pt-PT") + " km";

const VehicleCard = ({ vehicle, onSelect }: VehicleCardProps) => {
  return (
    <div
      className="flex-none w-[88vw] max-w-[360px] bg-card rounded-2xl shadow-md border border-border overflow-hidden snap-center cursor-pointer active:scale-[0.98] transition-transform"
      onClick={() => { trackEvent("ViewContent", { content_name: vehicle.model }); onSelect(); }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
    >
      {/* Car image */}
      <div className="relative bg-secondary h-52 overflow-hidden">
        <img
          src={vehicle.imageUrl}
          alt={vehicle.model}
          className="w-full h-full object-cover"
          loading="eager"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src.endsWith("/placeholder.svg")) return;
            img.src = "/placeholder.svg";
          }}
        />
        {vehicle.availability === "stock" && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Em Stock
          </div>
        )}
        {vehicle.availability === "order" && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5" />
            Por Encomenda · 30-60 dias
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground text-lg leading-tight font-heading truncate">{vehicle.model}</h3>
            {vehicle.version && (
              <p className="text-muted-foreground text-xs mt-0.5 truncate">{vehicle.version}</p>
            )}
            <p className="text-muted-foreground text-sm mt-1">{vehicle.year}</p>
          </div>
          <div className="text-right shrink-0">
            {vehicle.monthlyPrice ? (
              <>
                <p className="text-3xl font-extrabold text-primary leading-none whitespace-nowrap">
                  {vehicle.monthlyPrice}€<span className="text-base font-bold">/mês</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1 whitespace-nowrap">desde {formatPrice(vehicle.salePrice)}</p>
              </>
            ) : (
              <p className="text-3xl font-extrabold text-primary leading-none">{formatPrice(vehicle.salePrice)}</p>
            )}
          </div>
        </div>

        {/* Specs badges */}
        <div className="flex items-center gap-3 mb-5 text-muted-foreground">
          {vehicle.realRange ? (
            <span className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md">
              <BatteryCharging className="w-3.5 h-3.5" />
              {vehicle.realRange} km
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
              </svg>
              {vehicle.transmission}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md">
            <FuelIcon fuel={vehicle.fuel} />
            {vehicle.fuelLabel ?? vehicle.fuel}
          </span>
          <span className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md">
            <Gauge className="w-3.5 h-3.5" />
            {formatMileage(vehicle.mileage)}
          </span>
        </div>


        <Button
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl h-12"
        >
          Estou Interessado
        </Button>
      </div>
    </div>
  );
};

export default VehicleCard;
