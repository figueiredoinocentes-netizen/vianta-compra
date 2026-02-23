import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const COOKIE_KEY = "vianta_cookie_consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const handleConsent = (value: "accepted" | "rejected") => {
    localStorage.setItem(COOKIE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-primary text-primary-foreground px-4 py-4 shadow-lg">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3 text-sm">
        <p className="flex-1 text-center sm:text-left">
          Este site utiliza cookies para melhorar a sua experiência.{" "}
          <Link to="/privacidade" className="underline underline-offset-2 hover:text-primary-foreground/80">
            Política de Privacidade
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleConsent("rejected")}
          >
            Rejeitar
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            onClick={() => handleConsent("accepted")}
          >
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
