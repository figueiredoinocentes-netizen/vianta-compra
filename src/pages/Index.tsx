import { useRef, useEffect, useState } from "react";
import TopStrip from "@/components/vianta/TopStrip";
import HeroSection from "@/components/vianta/HeroSection";
import InlineForm from "@/components/vianta/InlineForm";
import ConsultancySection from "@/components/vianta/ConsultancySection";
import AdvantagesSection from "@/components/vianta/AdvantagesSection";
import SocialProofSection from "@/components/vianta/SocialProofSection";
import Footer from "@/components/vianta/Footer";
import StickyButton from "@/components/vianta/StickyButton";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const stockFormRef = useRef<HTMLDivElement>(null);
  const [showStickyBtn, setShowStickyBtn] = useState(false);
  const [stockFormOpen, setStockFormOpen] = useState(false);

  const openStockForm = () => {
    setStockFormOpen(true);
    setTimeout(() => stockFormRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
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
      <HeroSection heroRef={heroRef} onContact={openStockForm} />
      <InlineForm type="stock" open={stockFormOpen} formRef={stockFormRef} />
      <ConsultancySection onScrollToForm={openStockForm} />
      <AdvantagesSection />
      <SocialProofSection />
      <Footer />

      <StickyButton visible={showStickyBtn} onScrollToTop={scrollToHero} />
    </div>
  );
};

export default Index;
