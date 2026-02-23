import { useEffect, useRef } from "react";
import { X, Zap, Fuel, Calendar, Shield, CheckCircle2, Clock, Users, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Vehicle } from "@/data/vehicles";

interface VehicleBottomSheetProps {
  vehicle: Vehicle | null;
  open: boolean;
  onClose: () => void;
  onContact: (vehicleLabel: string) => void;
}

const VehicleBottomSheet = ({ vehicle, open, onClose, onContact }: VehicleBottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (deltaY > 80) {
      onClose();
    }
  };

  if (!vehicle) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-foreground/50 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl shadow-2xl transition-all duration-300 ease-out max-h-[90vh] overflow-y-auto md:bottom-auto md:top-1/2 md:left-1/2 md:right-auto md:w-full md:max-w-lg md:rounded-3xl md:max-h-[85vh] ${open ? "translate-y-0 md:-translate-x-1/2 md:-translate-y-1/2 md:scale-100 md:opacity-100" : "translate-y-full md:translate-y-0 md:-translate-x-1/2 md:-translate-y-1/2 md:scale-95 md:opacity-0 md:pointer-events-none"}`}
      >
        {/* Handle bar */}
      <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-10 h-1 bg-border rounded-full" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-muted text-muted-foreground"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Car image */}
        <div className="aspect-video bg-secondary overflow-hidden mx-4 rounded-2xl mt-2">
          <img
            src={vehicle.imageUrl}
            alt={vehicle.model}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-5 pb-8">
          {/* Title + price */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-xl font-semibold text-foreground font-heading tracking-tight">{vehicle.model}</h2>
              <div className="flex items-center gap-2 mt-1">
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
              {/* Categories */}
              {vehicle.categories && vehicle.categories.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {vehicle.categories.map((cat) => (
                    <span key={cat} className="bg-accent/10 text-accent text-xs font-semibold px-2.5 py-1 rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="text-right">
              {vehicle.previousPrice && (
                <p className="text-sm text-muted-foreground line-through leading-none mb-0.5">{vehicle.previousPrice}€</p>
              )}
              <p className="text-3xl font-extrabold text-primary leading-none">{vehicle.weeklyPrice}€</p>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-heading">por semana</p>
            </div>
          </div>

          {/* CTA button — immediately below title/price */}
          <Button
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-extrabold rounded-xl text-base h-14 shadow-md mt-4 mb-5"
            size="lg"
            onClick={() => {
              onClose();
              onContact(`${vehicle.model} (${vehicle.year})`);
            }}
          >
            Pedir contacto sobre esta viatura
          </Button>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-muted rounded-xl p-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent shrink-0" />
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-heading">Ano</p>
                <p className="text-sm font-semibold text-foreground">{vehicle.year}</p>
              </div>
            </div>
            <div className="bg-muted rounded-xl p-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent shrink-0" />
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-heading">Caução</p>
                <p className="text-sm font-semibold text-foreground">{vehicle.deposit}€</p>
                <p className="text-[10px] text-accent font-medium mt-0.5">Pagamento fracionável</p>
              </div>
            </div>
            <div className="bg-muted rounded-xl p-3 flex items-center gap-2">
              {vehicle.fuel === "Elétrico" ? (
                <Zap className="w-4 h-4 text-accent shrink-0" />
              ) : (
                <Fuel className="w-4 h-4 text-accent shrink-0" />
              )}
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-heading">Combustível</p>
                <p className="text-sm font-semibold text-foreground">{vehicle.fuelLabel ?? vehicle.fuel}</p>
              </div>
            </div>
            <div className="bg-muted rounded-xl p-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-accent shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3" />
              </svg>
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-heading">Caixa</p>
                <p className="text-sm font-semibold text-foreground">{vehicle.transmission}</p>
              </div>
            </div>
            <div className="bg-muted rounded-xl p-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-accent shrink-0" />
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-heading">Lugares</p>
                <p className="text-sm font-semibold text-foreground">{vehicle.seats}</p>
              </div>
            </div>
            <div className="bg-muted rounded-xl p-3 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-accent shrink-0" />
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-heading">Quilometragem</p>
                <p className="text-sm font-semibold text-foreground">Até 2.000km/semana</p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default VehicleBottomSheet;

