import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ebgreenLogo from "@/assets/ebgreen-logo-negative.svg";

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Serviços", href: "#servicos" },
  { label: "Como Funciona", href: "#processo" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-green-deep text-cream/80 text-xs py-2 hidden md:block">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <span>Escritório nos EUA — Orlando, FL | Miami, FL</span>
          <div className="flex items-center gap-4">
            <a href="tel:+15551234567" className="flex items-center gap-1 hover:text-gold transition-colors">
              <Phone size={12} />
              +1 (555) 123-4567
            </a>
            <span className="text-cream/30">|</span>
            <a href="https://wa.me/15551234567" className="hover:text-gold transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>

      <nav className={`fixed top-0 md:top-8 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-green-deep/98 backdrop-blur-md shadow-xl md:top-0" : "bg-transparent"
      }`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="flex items-center">
            <img src={ebgreenLogo} alt="Ebgreen Immigration" className="h-[75px]" />
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-cream/70 hover:text-gold transition-colors text-sm font-medium font-body"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              className="bg-gradient-gold text-green-deep px-6 py-2.5 rounded-md text-sm font-bold font-body hover:opacity-90 transition-opacity ml-2"
            >
              Consulta Gratuita
            </a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-cream">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-green-deep overflow-hidden"
            >
              <div className="px-6 pb-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-cream/70 hover:text-gold transition-colors text-sm font-medium font-body"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contato"
                  onClick={() => setIsOpen(false)}
                  className="bg-gradient-gold text-green-deep px-6 py-2.5 rounded-md text-sm font-bold font-body text-center"
                >
                  Consulta Gratuita
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
