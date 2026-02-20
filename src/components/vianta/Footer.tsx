const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-tight font-heading">
            Vianta
          </div>

          {/* Legal info */}
          <div className="text-xs text-primary-foreground/70 space-y-1">
            <p>Vianta Lda. &bull; NIF: 000 000 000</p>
            <p>Av. Exemplo, 123 &bull; 1000-001 Lisboa, Portugal</p>
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
    </footer>
  );
};

export default Footer;
