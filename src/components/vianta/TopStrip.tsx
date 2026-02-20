import logo from "@/assets/logo-vianta.svg";

const TopStrip = () => {
  return (
    <div className="bg-strip text-strip-foreground flex items-center justify-between px-4 py-2">
      <img src={logo} alt="Vianta" className="h-8 w-auto" />
      <span className="text-xs font-serif tracking-widest uppercase text-center flex-1 px-2">
        Desde 2017 &bull; Entrega rápida &bull; Processo transparente
      </span>
    </div>
  );
};

export default TopStrip;
