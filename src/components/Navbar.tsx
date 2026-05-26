import { useState, useEffect, useMemo } from "react";
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
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/quero-migrar-para-os-eua";

  const navLinks = useMemo(() => [
    { label: t(translations.nav.home, lang), href: isHomePage ? "#hero" : "/#hero", id: "hero" },
    { label: t(translations.nav.differentials, lang), href: isHomePage ? "#diferenciais" : "/#diferenciais", id: "diferenciais" },
    { label: t(translations.nav.services, lang), href: isHomePage ? "#servicos" : "/#servicos", id: "servicos" },
    { label: t(translations.nav.process, lang), href: isHomePage ? "#processo" : "/#processo", id: "processo" },
    { label: t(translations.nav.about, lang), href: isHomePage ? "#sobre" : "/#sobre", id: "sobre" },
    { label: "Blog", href: "/blog", id: "blog" },
    { label: t(translations.nav.news, lang), href: "/noticias", id: "noticias" },
    { label: t(translations.nav.contact, lang), href: isHomePage ? "#contato" : "/#contato", id: "contato" },
  ], [isHomePage, lang]);

  useEffect(() => {
    const checkBackground = () => {
      setScrolled(window.scrollY > 50);
      const navHeight = 80;

      // Probe the element directly under the navbar to detect light vs dark backgrounds
      const probeY = navHeight + 4;
      const probeX = Math.min(window.innerWidth - 20, Math.max(20, window.innerWidth / 2));
      const stack = document.elementsFromPoint(probeX, probeY);

      const parseRgb = (s: string): [number, number, number, number] | null => {
        const m = s.match(/rgba?\(([^)]+)\)/);
        if (!m) return null;
        const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
        return [parts[0] || 0, parts[1] || 0, parts[2] || 0, parts[3] ?? 1];
      };

      let isLight = false;
      for (const el of stack) {
        const bg = getComputedStyle(el as HTMLElement).backgroundColor;
        const rgb = parseRgb(bg);
        if (!rgb || rgb[3] === 0) continue;
        const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
        isLight = luminance > 0.6;
        break;
      }
      setOverLight(isLight);
    };

    window.addEventListener("scroll", checkBackground, { passive: true });
    window.addEventListener("resize", checkBackground);
    // Run after paint so target elements exist
    const t = setTimeout(checkBackground, 50);
    checkBackground();
    return () => {
      window.removeEventListener("scroll", checkBackground);
      window.removeEventListener("resize", checkBackground);
      clearTimeout(t);
    };
  }, [isHomePage, location.pathname]);

  useEffect(() => {
    if (!isHomePage) return;
    const sections = navLinks.map((l) => l.id).filter((id) => id !== "blog");
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
  }, [isHomePage, navLinks]);

  const isActive = (id: string) => {
    if (id === "blog") return location.pathname === "/blog";
    if (id === "noticias") return location.pathname === "/noticias";
    return isHomePage && activeSection === id;
  };

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
          <a href={isHomePage ? "#hero" : "/"} className="flex items-center">
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
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-whatsapp-lead"))}
              className="btn-highlight bg-gradient-gold text-green-deep px-6 py-2.5 rounded-md text-sm font-bold font-body hover:opacity-90 transition-opacity ml-2"
            >
              {t(translations.nav.cta, lang)}
            </button>
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
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    window.dispatchEvent(new CustomEvent("open-whatsapp-lead"));
                  }}
                  className="btn-highlight bg-gradient-gold text-green-deep px-6 py-2.5 rounded-md text-sm font-bold font-body text-center"
                >
                  {t(translations.nav.cta, lang)}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;