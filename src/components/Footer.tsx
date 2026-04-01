const Footer = () => {
  const links = {
    Serviços: [
      { label: "EB-2 NIW", href: "#servicos" },
      { label: "Vistos de Trabalho", href: "#servicos" },
      { label: "Green Card Familiar", href: "#servicos" },
      { label: "Vistos de Investidor", href: "#servicos" },
      { label: "Vistos de Estudante", href: "#servicos" },
    ],
    Empresa: [
      { label: "Sobre Nós", href: "#sobre" },
      { label: "Diferenciais", href: "#diferenciais" },
      { label: "Como Funciona", href: "#processo" },
      { label: "Contato", href: "#contato" },
    ],
    Contato: [
      { label: "+1 (555) 123-4567", href: "tel:+15551234567" },
      { label: "contato@ebgreen.com", href: "mailto:contato@ebgreen.com" },
      { label: "Orlando, FL — EUA", href: "#" },
      { label: "Miami, FL — EUA", href: "#" },
    ],
  };

  return (
    <footer className="bg-green-deep py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
                <span className="font-display text-lg font-bold text-green-deep">Eb</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-cream leading-tight">Ebgreen</span>
                <span className="text-cream/50 text-[10px] font-body tracking-[0.25em] uppercase leading-tight">Immigration</span>
              </div>
            </div>
            <p className="text-cream/50 text-sm font-body leading-relaxed">
              Assessoria especializada em imigração americana. Transformando sonhos em realidade há mais de 15 anos.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display text-cream font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {items.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-cream/50 hover:text-gold text-sm font-body transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/30 text-sm font-body">
            © {new Date().getFullYear()} Ebgreen Immigration. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-cream/30 hover:text-gold text-sm font-body transition-colors">Política de Privacidade</a>
            <a href="#" className="text-cream/30 hover:text-gold text-sm font-body transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
