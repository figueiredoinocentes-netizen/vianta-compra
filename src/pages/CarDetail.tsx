import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, Zap, Fuel, Calendar, Gauge, Users, Palette, Battery,
  BatteryCharging, Briefcase, ShieldCheck, CheckCircle2,
  Clock, CalendarClock, XCircle, Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { Vehicle } from "@/data/vehicles";
import { fetchVehicles } from "@/lib/sheet-vehicles";
import InlineForm from "@/components/vianta/InlineForm";
import TopStrip from "@/components/vianta/TopStrip";
import Footer from "@/components/vianta/Footer";
import { trackEvent } from "@/lib/meta-pixel";

const formatPrice = (price: number) =>
  price.toLocaleString("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const formatMileage = (km: number) => km.toLocaleString("pt-PT") + " km";

const SpecItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div className="bg-muted rounded-xl p-3 flex items-center gap-2">
      <span className="text-accent shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-heading">{label}</p>
        <p className="text-sm font-semibold text-foreground break-words">{value}</p>
      </div>
    </div>
  );
};

const AvailabilityBadge = ({ vehicle }: { vehicle: Vehicle }) => {
  const base = "inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border";
  switch (vehicle.availability) {
    case "stock":
      return <span className={`${base} bg-emerald-500/15 border-emerald-500/30 text-emerald-700`}><CheckCircle2 className="w-3.5 h-3.5" />Em Stock</span>;
    case "order":
      return <span className={`${base} bg-amber-500/15 border-amber-500/30 text-amber-700`}><Clock className="w-3.5 h-3.5" />Por Encomenda · 30-60 dias</span>;
    case "soon":
      return <span className={`${base} bg-sky-500/15 border-sky-500/30 text-sky-700`}><CalendarClock className="w-3.5 h-3.5" />Disponível em Breve{vehicle.availableFrom ? ` · ${vehicle.availableFrom}` : ""}</span>;
    case "sold":
      return <span className={`${base} bg-slate-500/15 border-slate-500/30 text-slate-700`}><XCircle className="w-3.5 h-3.5" />Vendido</span>;
    case "reserved":
      return <span className={`${base} bg-violet-500/15 border-violet-500/30 text-violet-700`}><Lock className="w-3.5 h-3.5" />Reservado</span>;
    default:
      return null;
  }
};

/** Classes partilhadas pelo CTA em-linha (fim da página) e pelo CTA flutuante — têm de ter o mesmo aspeto. */
const ctaClassName = (unavailable: boolean) =>
  unavailable
    ? "w-full bg-muted text-muted-foreground font-extrabold rounded-xl text-base h-14 cursor-not-allowed"
    : "w-full bg-cta hover:bg-cta/90 text-cta-foreground font-extrabold rounded-xl text-base h-14 shadow-md";

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [showFloatingCta, setShowFloatingCta] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);
  const bottomCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetchVehicles()
      .then((list) => {
        if (cancelled) return;
        setVehicle(list.find((v) => v.id === id) ?? null);
        setLoading(false);
      })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api]);

  // Esconde o CTA flutuante assim que o CTA "real" do fim da página entra em vista.
  useEffect(() => {
    const node = bottomCtaRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFloatingCta(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [vehicle]);

  const openForm = () => {
    if (vehicle) trackEvent("ViewContent", { content_name: vehicle.model });
    setFormOpen(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-5 space-y-4">
        <div className="h-64 bg-muted animate-pulse rounded-2xl" />
        <div className="h-6 w-2/3 bg-muted animate-pulse rounded" />
        <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="text-xl font-semibold font-heading text-foreground">Viatura não encontrada</h1>
        <p className="text-muted-foreground text-sm">Esta viatura já não está disponível ou o link está incorreto.</p>
        <Link to="/" className="text-accent font-semibold underline">Voltar às viaturas</Link>
      </div>
    );
  }

  const unavailable = vehicle.availability === "sold" || vehicle.availability === "reserved";
  const photos = vehicle.gallery?.length ? vehicle.gallery : [vehicle.imageUrl];
  const isElectric = vehicle.fuel === "Elétrico" || vehicle.fuel === "Híbrido";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <title>{`${vehicle.model}${vehicle.version ? " " + vehicle.version : ""} — Vianta TVDE`}</title>
      <TopStrip />

      <main className="flex-1 w-full max-w-3xl mx-auto px-5 pb-28">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mt-4 mb-3">
          <ArrowLeft className="w-4 h-4" /> Voltar às viaturas
        </Link>

        {/* Gallery */}
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {photos.map((src, i) => (
              <CarouselItem key={`${src}-${i}`}>
                <div className="aspect-video bg-secondary rounded-2xl overflow-hidden">
                  <img
                    src={src}
                    alt={`${vehicle.model} — foto ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src.endsWith("/placeholder.svg")) return;
                      img.src = "/placeholder.svg";
                    }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {photos.length > 1 && (
            <>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </>
          )}
        </Carousel>

        {photos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-none mt-3">
            {photos.map((src, i) => (
              <button
                key={`thumb-${i}`}
                onClick={() => api?.scrollTo(i)}
                className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${current === i ? "border-accent" : "border-transparent"}`}
                aria-label={`Ver foto ${i + 1}`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        {/* Title + price */}
        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-foreground font-heading tracking-tight">{vehicle.model}</h1>
            {vehicle.version && <p className="text-muted-foreground text-sm mt-0.5">{vehicle.version}</p>}
            <div className="mt-2"><AvailabilityBadge vehicle={vehicle} /></div>
          </div>
          <div className="shrink-0 text-right">
            {vehicle.monthlyPrice ? (
              <>
                <p className="text-xs text-muted-foreground leading-none">desde</p>
                <p className="text-3xl font-extrabold text-primary leading-none mt-1 whitespace-nowrap">
                  {vehicle.monthlyPrice}€<span className="text-base font-bold">/mês</span>
                </p>
                {vehicle.salePrice > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">{formatPrice(vehicle.salePrice)}</p>
                )}
              </>
            ) : vehicle.salePrice > 0 ? (
              <p className="text-3xl font-extrabold text-primary leading-none">{formatPrice(vehicle.salePrice)}</p>
            ) : null}
          </div>
        </div>

        {/* Specs */}
        <h2 className="text-sm font-semibold text-foreground font-heading uppercase tracking-widest mt-6 mb-3">Especificações</h2>
        <div className="grid grid-cols-2 gap-3">
          <SpecItem icon={<Calendar className="w-4 h-4" />} label="Ano" value={vehicle.year} />
          <SpecItem icon={<Gauge className="w-4 h-4" />} label="Quilometragem" value={vehicle.mileage ? formatMileage(vehicle.mileage) : undefined} />
          <SpecItem icon={vehicle.fuel === "Elétrico" ? <Zap className="w-4 h-4" /> : <Fuel className="w-4 h-4" />} label="Combustível" value={vehicle.fuelLabel ?? vehicle.fuel} />
          <SpecItem icon={<Users className="w-4 h-4" />} label="Caixa" value={vehicle.transmission} />
          <SpecItem icon={<Palette className="w-4 h-4" />} label="Cor" value={vehicle.color} />
          <SpecItem icon={<Zap className="w-4 h-4" />} label="Potência" value={vehicle.horsepower ? `${vehicle.horsepower} cv` : undefined} />
          {isElectric && <SpecItem icon={<Battery className="w-4 h-4" />} label="Bateria" value={vehicle.battery} />}
          {isElectric && <SpecItem icon={<BatteryCharging className="w-4 h-4" />} label="Estado da Bateria" value={vehicle.batteryHealth} />}
          <SpecItem icon={<BatteryCharging className="w-4 h-4" />} label="Autonomia Real" value={vehicle.realRange ? `${vehicle.realRange} km` : undefined} />
          <SpecItem icon={<Briefcase className="w-4 h-4" />} label="Bagageira" value={vehicle.bootVolume ? `${vehicle.bootVolume} L` : undefined} />
          <SpecItem icon={<CalendarClock className="w-4 h-4" />} label="Fim Elegível TVDE" value={vehicle.tvdeEligibleUntil} />
        </div>

        {/* Categorias */}
        {vehicle.categories && vehicle.categories.length > 0 && (
          <>
            <h2 className="text-sm font-semibold text-foreground font-heading uppercase tracking-widest mt-6 mb-3">Categorias TVDE</h2>
            <div className="flex flex-wrap gap-1.5">
              {vehicle.categories.map((cat) => (
                <span key={cat} className="bg-accent/10 text-accent text-xs font-semibold px-2.5 py-1 rounded-full">{cat}</span>
              ))}
            </div>
          </>
        )}

        {/* O que está incluído */}
        <h2 className="text-sm font-semibold text-foreground font-heading uppercase tracking-widest mt-6 mb-3">O que está incluído</h2>
        <ul className="bg-muted rounded-xl p-4 space-y-3">
          {[
            "Viatura pronta a operar: dístico, inspeção e extintor incluídos",
            "Mediação de financiamento e seguro",
            "Garantia Standard Vianta (motor e caixa, 18 meses, extensível até 36 com custo adicional)",
            "Acompanhamento pós-venda",
            "Integração na frota Vianta com Slot",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Garantias */}
        {(vehicle.warrantyVehicle || vehicle.warrantyBattery) && (
          <>
            <h2 className="text-sm font-semibold text-foreground font-heading uppercase tracking-widest mt-6 mb-3">Garantias</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SpecItem icon={<ShieldCheck className="w-4 h-4" />} label="Garantia Viatura" value={vehicle.warrantyVehicle} />
              <SpecItem icon={<ShieldCheck className="w-4 h-4" />} label="Garantia Bateria" value={vehicle.warrantyBattery} />
            </div>
          </>
        )}

        {/* Financiamento */}
        {vehicle.monthlyPrice ? (
          <>
            <h2 className="text-sm font-semibold text-foreground font-heading uppercase tracking-widest mt-6 mb-3">Financiamento</h2>
            <div className="bg-muted rounded-xl p-4">
              <p className="text-sm text-muted-foreground">Mensalidade indicativa a 120 meses</p>
              <p className="text-2xl font-extrabold text-primary mt-1">{vehicle.monthlyPrice}€<span className="text-base font-bold">/mês</span></p>
              <p className="text-xs text-muted-foreground mt-2">Valor indicativo, sujeito a aprovação de crédito.</p>
            </div>
          </>
        ) : null}

        {/* CTA (fim da página) */}
        <div ref={bottomCtaRef} className="mt-6">
          <Button
            disabled={unavailable}
            onClick={unavailable ? undefined : openForm}
            size="lg"
            className={ctaClassName(unavailable)}
          >
            Estou Interessado
          </Button>
        </div>
      </main>

      <InlineForm type="stock" open={formOpen} formRef={formRef} />

      {/* CTA flutuante — visível desde o topo, visual idêntico ao botão acima, esconde-se quando esse entra em vista */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 px-5 pb-5 pt-3 bg-gradient-to-t from-background via-background/95 to-transparent transition-all duration-300 ${
          showFloatingCta && !formOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="max-w-3xl mx-auto">
          <Button
            disabled={unavailable}
            onClick={unavailable ? undefined : openForm}
            size="lg"
            className={ctaClassName(unavailable)}
          >
            Estou Interessado
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarDetail;
