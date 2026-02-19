import { useEffect } from "react";

interface GHLFormSectionProps {
  formRef: React.RefObject<HTMLElement>;
}

const GHLFormSection = ({ formRef }: GHLFormSectionProps) => {
  useEffect(() => {
    if (document.querySelector('script[src="https://api.bfdigital.io/js/form_embed.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://api.bfdigital.io/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

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
        <p className="text-muted-foreground text-center text-sm mb-8">
          Preencheu o formulário? A nossa equipa entra em contacto em breve.
        </p>

        <iframe
          src="https://api.bfdigital.io/widget/form/D26uSHUDyRjZS4ZZuij4"
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
