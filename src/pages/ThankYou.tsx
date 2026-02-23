import { useEffect } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/meta-pixel";
import { CheckCircle } from "lucide-react";

const ThankYou = () => {
  useEffect(() => {
    trackEvent("Lead");
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
        <h1 className="text-3xl font-extrabold text-foreground mb-3 font-heading">
          Obrigado pelo seu contacto!
        </h1>
        <p className="text-muted-foreground mb-8">
          A nossa equipa vai entrar em contacto consigo em breve.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-xl bg-accent text-accent-foreground px-6 py-3 font-semibold hover:opacity-90 transition-opacity"
        >
          Voltar à página principal
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
