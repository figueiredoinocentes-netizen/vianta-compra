import { Play } from "lucide-react";

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

        {/* Video placeholder — replace src with real video URL */}
        <div className="relative aspect-video bg-card rounded-2xl border border-border overflow-hidden flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <Play className="w-7 h-7 text-accent ml-1" />
            </div>
            <p className="text-xs font-medium">Vídeo em breve</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
