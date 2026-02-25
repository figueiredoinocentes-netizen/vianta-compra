import { useRef, useEffect, useState } from "react";
import TopStrip from "@/components/vianta/TopStrip";
import HeroSection from "@/components/vianta/HeroSection";
import AdvantagesSection from "@/components/vianta/AdvantagesSection";
import ConsultancySection from "@/components/vianta/ConsultancySection";
import SocialProofSection from "@/components/vianta/SocialProofSection";
import GHLFormSection from "@/components/vianta/GHLFormSection";
import Footer from "@/components/vianta/Footer";
import StickyButton from "@/components/vianta/StickyButton";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const [showStickyBtn, setShowStickyBtn] = useState(false);
  const [selectedVehicleLabel, setSelectedVehicleLabel] = useState<string | null>(null);

  const scrollToForm = (vehicleLabel?: string) => {
    if (vehicleLabel !== undefined) setSelectedVehicleLabel(vehicleLabel);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? 0;
      const formTop = formRef.current?.getBoundingClientRect().top ?? Infinity;
      const windowH = window.innerHeight;

      const pastHero = heroBottom < 0;
      const nearForm = formTop < windowH * 1.2;

      setShowStickyBtn(pastHero && !nearForm);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <title>Vianta — Venda de Viaturas para TVDE | Uber & Bolt</title>

      <TopStrip />
      <HeroSection heroRef={heroRef} onContact={scrollToForm} />
      <AdvantagesSection />
      <ConsultancySection onScrollToForm={() => scrollToForm()} />
      <SocialProofSection />
      <GHLFormSection formRef={formRef} selectedVehicle={selectedVehicleLabel} onClearVehicle={() => setSelectedVehicleLabel(null)} />
      <Footer />

      <StickyButton visible={showStickyBtn} onScrollToTop={scrollToHero} />
    </div>
  );
};

export default Index;
