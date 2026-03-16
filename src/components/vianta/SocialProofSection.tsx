const SocialProofSection = () => {
  return (
    <section className="bg-muted py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-extrabold text-foreground text-center mb-2 leading-tight">
          No mercado desde 2017
        </h2>
        <p className="text-muted-foreground text-center text-sm mb-8 max-w-sm mx-auto">
          Anos de experiência a ajudar motoristas TVDE a encontrar a viatura certa.
        </p>

        <div className="relative mx-auto overflow-hidden rounded-2xl border border-border" style={{ maxWidth: 320, aspectRatio: "9/16", maxHeight: 500 }}>
          <iframe
            src="https://www.youtube.com/embed/n5XBwfwWOvQ"
            title="Vianta — Testemunho"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
