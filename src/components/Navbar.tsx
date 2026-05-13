import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import ebgreenLogoNegative from "@/assets/ebgreen-logo-negative.svg";
import ebgreenLogo from "@/assets/ebgreen-logo.svg";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overLight, setOverLight] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { lang } = useLanguage();

  const navLinks = [
    { label: t(translations.nav.home, lang), href: "#hero", id: "hero" },
    { label: t(translations.nav.differentials, lang), href: "#diferenciais", id: "diferenciais" },
    { label: t(translations.nav.services, lang), href: "#servicos", id: "servicos" },
    { label: t(translations.nav.process, lang), href: "#processo", id: "processo" },
    { label: t(translations.nav.about, lang), href: "#sobre", id: "sobre" },
    { label: t(translations.nav.contact, lang), href: "#contato", id: "contato" },
  ];

  useEffect(() => {
    const lightSectionIds = ["diferenciais", "processo", "sobre", "depoimentos", "contato"];

    const checkBackground = () => {
      setScrolled(window.scrollY > 50);
      const navHeight = 80;
      const checkPoint = window.scrollY + navHeight;

      let isOverLightSection = false;
      for (const id of lightSectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (checkPoint >= top && checkPoint < bottom) {
            isOverLightSection = true;
            break;
          }
        }
      }
      setOverLight(isOverLightSection);
    };

    window.addEventListener("scroll", checkBackground);
    checkBackground();
    return () => window.removeEventListener("scroll", checkBackground);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.id).filter(Boolean);
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.4, rootMargin: "-80px 0px -40% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const isActive = (id: string) => activeSection === id;

  return (
    <>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? overLight
            ? "bg-white/95 backdrop-blur-md shadow-xl"
            : "bg-green-deep/98 backdrop-blur-md shadow-xl"
          : "bg-transparent"
      }`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="flex items-center">
            <img src={overLight && scrolled ? ebgreenLogo : ebgreenLogoNegative} alt="Ebgreen Immigration" className="h-[75px] transition-all duration-300" />
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = isActive(link.id);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative transition-colors text-sm font-medium font-body ${
                    overLight && scrolled
                      ? active
                        ? "text-eligibility-green"
                        : "text-green-deep/80 hover:text-gold"
                      : active
                        ? "text-eligibility-green"
                        : "text-cream/70 hover:text-gold"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-eligibility-green rounded-full" />
                  )}
                </a>
              );
            })}
            <LanguageSelector darkMode={overLight && scrolled} />
            <a
              href="#contato"
              className="btn-highlight bg-gradient-gold text-green-deep px-6 py-2.5 rounded-md text-sm font-bold font-body hover:opacity-90 transition-opacity ml-2"
            >
              {t(translations.nav.cta, lang)}
            </a>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSelector darkMode={overLight && scrolled} />
            <button onClick={() => setIsOpen(!isOpen)} className={overLight && scrolled ? "text-green-deep" : "text-cream"}>
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
                {navLinks.map((link) => {
                  const active = isActive(link.id);
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`transition-colors text-sm font-medium font-body ${
                        active ? "text-eligibility-green" : "text-cream/70 hover:text-gold"
                      }`}
                    >
                      {link.label}
                      {active && (
                        <span className="block w-8 h-0.5 bg-eligibility-green rounded-full mt-1" />
                      )}
                    </a>
                  );
                })}
                <a
                  href="#contato"
                  onClick={() => setIsOpen(false)}
                  className="btn-highlight bg-gradient-gold text-green-deep px-6 py-2.5 rounded-md text-sm font-bold font-body text-center"
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