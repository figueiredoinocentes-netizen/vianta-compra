interface GHLFormSectionProps {
  formRef: React.RefObject<HTMLElement>;
}

const GHLFormSection = ({ formRef }: GHLFormSectionProps) => {
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

        {/* ============================================================
            SUBSTITUA O BLOCO ABAIXO PELO CÓDIGO EMBED DO SEU FORMULÁRIO GHL
            ============================================================ */}
        <div className="w-full rounded-2xl border-2 border-dashed border-border bg-muted min-h-64 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M8 9h8M8 13h5" />
            </svg>
          </div>
          <p className="font-semibold text-foreground text-sm">Formulário GoHighLevel</p>
          <p className="text-xs text-muted-foreground max-w-xs">
            Cole aqui o código embed do seu formulário GHL. O bloco acima será substituído pelo formulário real.
          </p>
          <code className="text-xs bg-border/50 px-3 py-1.5 rounded-lg text-muted-foreground font-mono">
            {`<!-- Cole o código GHL aqui -->`}
          </code>
        </div>
        {/* ============================================================ */}
      </div>
    </section>
  );
};

export default GHLFormSection;
