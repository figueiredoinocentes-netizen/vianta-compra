import { useEffect } from "react";
import { Car, X } from "lucide-react";

interface GHLFormSectionProps {
  formRef: React.RefObject<HTMLElement>;
  selectedVehicle: string | null;
  onClearVehicle: () => void;
}

const GHLFormSection = ({ formRef, selectedVehicle, onClearVehicle }: GHLFormSectionProps) => {
  useEffect(() => {
    if (document.querySelector('script[src="https://api.bfdigital.io/js/form_embed.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://api.bfdigital.io/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const baseUrl = "https://api.bfdigital.io/widget/form/D26uSHUDyRjZS4ZZuij4";
  const iframeSrc = selectedVehicle
    ? `${baseUrl}?viatura=${encodeURIComponent(selectedVehicle)}`
    : baseUrl;

  return (
    <section
      ref={formRef as React.RefObject<HTMLDivElement>}
      id="formulario"
      className="bg-background py-12 px-4"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-extrabold text-foreground text-center mb-2">
          Peça contacto — é rápido
        </h2>
        <p className="text-muted-foreground text-center text-sm mb-6">
          Preencheu o formulário? A nossa equipa entra em contacto em breve.
        </p>

        {/* Vehicle context banner */}
        {selectedVehicle && (
          <div className="flex items-center justify-between bg-muted border border-border rounded-xl px-4 py-3 mb-6">
            <div className="flex items-center gap-3">
              <Car className="w-5 h-5 text-accent shrink-0" />
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-heading">A pedir contacto sobre</p>
                <p className="text-sm font-semibold text-foreground">{selectedVehicle}</p>
              </div>
            </div>
            <button
              onClick={onClearVehicle}
              className="p-1.5 rounded-full hover:bg-border text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Limpar viatura selecionada"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <iframe
          key={selectedVehicle ?? "default"}
          src={iframeSrc}
          style={{ width: "100%", height: "1007px", border: "none", borderRadius: "3px" }}
          id="inline-D26uSHUDyRjZS4ZZuij4"
          data-layout='{"id":"INLINE"}'
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Form 0"
          data-height="1007"
          data-layout-iframe-id="inline-D26uSHUDyRjZS4ZZuij4"
          data-form-id="D26uSHUDyRjZS4ZZuij4"
          title="Form 0"
        />
      </div>
    </section>
  );
};

export default GHLFormSection;

