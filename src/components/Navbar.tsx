import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold text-primary-foreground">
            Eb<span className="text-gradient-gold">green</span>
          </span>
          <span className="hidden sm:block text-primary-foreground/70 text-sm font-body tracking-wider uppercase">
            Immigration
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-primary-foreground/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            className="bg-accent text-accent-foreground px-5 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Consulta Gratuita
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary-foreground"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-primary overflow-hidden"
          >
            <div className="px-6 pb-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm font-medium uppercase"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contato"
                onClick={() => setIsOpen(false)}
                className="bg-accent text-accent-foreground px-5 py-2.5 rounded-md text-sm font-semibold text-center"
              >
                Consulta Gratuita
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
