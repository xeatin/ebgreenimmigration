import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ebgreenLogo from "@/assets/ebgreen-logo-negative.svg";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang } = useLanguage();

  const navLinks = [
    { label: t(translations.nav.home, lang), href: "#hero" },
    { label: t(translations.nav.differentials, lang), href: "#diferenciais" },
    { label: t(translations.nav.services, lang), href: "#servicos" },
    { label: t(translations.nav.process, lang), href: "#processo" },
    { label: t(translations.nav.about, lang), href: "#sobre" },
    { label: t(translations.nav.contact, lang), href: "#contato" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-green-deep/98 backdrop-blur-md shadow-xl" : "bg-transparent"
      }`}>
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
            <LanguageSelector />
            <a
              href="#contato"
              className="bg-gradient-gold text-green-deep px-6 py-2.5 rounded-md text-sm font-bold font-body hover:opacity-90 transition-opacity ml-2"
            >
              {t(translations.nav.cta, lang)}
            </a>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSelector />
            <button onClick={() => setIsOpen(!isOpen)} className="text-cream">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
                  {t(translations.nav.cta, lang)}
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