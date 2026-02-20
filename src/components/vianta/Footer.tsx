import logo from "@/assets/logo-vianta-black.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Logo */}
          <img src={logo} alt="Vianta" className="h-11 w-auto" />




          {/* Legal info */}
          <div className="text-xs text-primary-foreground/70 space-y-1">
            <p>Dos Inocentes Lda. • NIF: 514 455 624</p>
            <p>Av. Silvério Galrão Nogueira, nº8 • 2640-169 Cheleiros, Portugal</p>
          </div>

          {/* Links */}
          <div className="flex gap-4 text-xs text-primary-foreground/60">
            <a href="#" className="hover:text-primary-foreground transition-colors underline underline-offset-2">
              Política de Privacidade
            </a>
            <span>&bull;</span>
            <a href="#" className="hover:text-primary-foreground transition-colors underline underline-offset-2">
              RGPD
            </a>
          </div>

          <p className="text-xs text-primary-foreground/40">
            &copy; {new Date().getFullYear()} Vianta. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>);

};

export default Footer;