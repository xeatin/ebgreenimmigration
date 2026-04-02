import ebgreenLogo from "@/assets/ebgreen-logo-color.png";

const Footer = () => {
  return (
    <footer className="bg-green-deep py-8">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Brand / Logo */}
          <div>
            <img src={ebgreenLogo} alt="Ebgreen Immigration" className="h-14 mb-2" />
            <p className="text-gold font-display text-xs font-semibold tracking-wide">
              Respeito, Resposta e Resultados
            </p>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="font-display text-cream font-semibold mb-1 text-xs">Disclaimer:</h4>
            <p className="text-cream/50 text-[11px] font-body leading-relaxed">
              ebgreen Immigration is a registered trademark in the United States and other countries. Unauthorized use of the trademark is strictly prohibited.
              The information and services provided on this website are for informational purposes only. If you have any questions, please contact us at{" "}
              <a href="mailto:info@ebgreenusa.com" className="text-gold hover:underline">info@ebgreenusa.com</a>
            </p>
          </div>

          {/* Contato */}
          <div className="md:text-right">
            <h4 className="font-display text-gold font-semibold mb-1 text-xs">Contato:</h4>
            <a href="tel:+17712017117" className="text-cream/70 hover:text-gold text-sm font-body transition-colors">
              +1 (771) 201 7117
            </a>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-cream/30 text-xs font-body">
            © {new Date().getFullYear()} Ebgreen Immigration. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-cream/30 hover:text-gold text-xs font-body transition-colors">Política de Privacidade</a>
            <a href="#" className="text-cream/30 hover:text-gold text-xs font-body transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
