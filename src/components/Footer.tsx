const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="font-display text-2xl font-bold text-primary-foreground">
              Eb<span className="text-gradient-gold">green</span>
            </span>
            <span className="text-primary-foreground/70 text-sm ml-2 font-body">Immigration</span>
          </div>
          <div className="flex gap-8">
            {["Início", "Serviços", "Sobre", "Contato"].map((link) => (
              <a
                key={link}
                href={`#${link === "Início" ? "hero" : link === "Serviços" ? "servicos" : link.toLowerCase()}`}
                className="text-primary-foreground/60 hover:text-gold text-sm transition-colors font-body"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/40 text-sm font-body">
            © {new Date().getFullYear()} Ebgreen Immigration. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
