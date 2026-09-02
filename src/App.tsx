import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ThankYou from "./pages/ThankYou";
import CarDetail from "./pages/CarDetail";
import CookieBanner from "./components/vianta/CookieBanner";
import { initPixel } from "@/lib/meta-pixel";
import { initClarity } from "@/lib/clarity";

const queryClient = new QueryClient();

const AppInner = () => {
  useEffect(() => {
    if (localStorage.getItem("vianta_cookie_consent") === "accepted") {
      initPixel();
      initClarity();
    }
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppInner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacidade" element={<PrivacyPolicy />} />
          <Route path="/obrigado" element={<ThankYou />} />
          <Route path="/carro/:id" element={<CarDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
