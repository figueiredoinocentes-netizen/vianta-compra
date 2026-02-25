import { useRef, useEffect, useState } from "react";
import TopStrip from "@/components/vianta/TopStrip";
import HeroSection from "@/components/vianta/HeroSection";
import AdvantagesSection from "@/components/vianta/AdvantagesSection";
import ConsultancySection from "@/components/vianta/ConsultancySection";
import SocialProofSection from "@/components/vianta/SocialProofSection";
import Footer from "@/components/vianta/Footer";
import StickyButton from "@/components/vianta/StickyButton";
import FormDialog from "@/components/vianta/FormDialog";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [showStickyBtn, setShowStickyBtn] = useState(false);

  // Dialog state
  const [stockDialogOpen, setStockDialogOpen] = useState(false);
  const [consultancyDialogOpen, setConsultancyDialogOpen] = useState(false);
  const openStockDialog = () => {
    setStockDialogOpen(true);
  };

  const openConsultancyDialog = () => {
    setConsultancyDialogOpen(true);
  };

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? 0;
      setShowStickyBtn(heroBottom < 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <title>Vianta — Venda de Viaturas para TVDE | Uber & Bolt</title>

      <TopStrip />
      <HeroSection heroRef={heroRef} onContact={openStockDialog} />
      <ConsultancySection onScrollToForm={openConsultancyDialog} />
      <AdvantagesSection />
      <SocialProofSection />
      <Footer />

      <StickyButton visible={showStickyBtn} onScrollToTop={scrollToHero} />

      <FormDialog
        type="stock"
        open={stockDialogOpen}
        onOpenChange={setStockDialogOpen}
      />
      <FormDialog
        type="consultancy"
        open={consultancyDialogOpen}
        onOpenChange={setConsultancyDialogOpen}
      />
    </div>
  );
};

export default Index;
