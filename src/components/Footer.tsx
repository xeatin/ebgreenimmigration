import ebgreenLogo from "@/assets/ebgreen-logo-negative.svg";

const Footer = () => {
  return (
    <footer className="bg-green-deep py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-start gap-8 md:gap-4">
          {/* Brand / Logo */}
          <div className="shrink-0 flex flex-col items-center">
            <img src={ebgreenLogo} alt="Ebgreen Immigration" className="h-[68px] mb-2" />
            <p className="text-gold font-display text-sm font-semibold tracking-wide">
              Respeito, Resposta e Resultados
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 md:ml-16">
            <h4 className="font-display text-cream font-semibold mb-1 text-sm">Disclaimer:</h4>
            <p className="text-cream/50 text-xs font-body leading-relaxed">
              ebgreen Immigration is a registered trademark in the United States and other countries. Unauthorized use of the trademark is strictly prohibited.
              <br />
              The information and services provided on this website are for informational purposes only. If you have any questions, please contact us at
              <br />
              <a href="mailto:info@ebgreenusa.com" className="text-gold hover:underline">info@ebgreenusa.com</a>
            </p>
          </div>

          {/* Contato */}
          <div className="shrink-0 mt-4 md:-ml-16">
            <h4 className="font-display text-cream font-semibold mb-2 text-sm">Contato:</h4>
            <a href="tel:+17712017117" className="text-gold hover:text-gold-light text-sm font-body transition-colors">
              +1 771 201 7117
            </a>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-8 pt-5 flex flex-col md:flex-row justify-between items-center gap-4">
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