import ebgreenLogo from "@/assets/ebgreen-logo-negative.svg";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const Footer = () => {
  const { lang } = useLanguage();
  const s = translations.footer;

  return (
    <footer className="bg-footer-green py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-start gap-8 md:gap-4">
          <div className="shrink-0 flex flex-col items-center">
            <img src={ebgreenLogo} alt="Ebgreen Immigration" className="h-[68px] mb-2" />
            <p className="text-gold font-display text-sm font-semibold tracking-wide">
              {t(s.slogan, lang)}
            </p>
          </div>

          <div className="mt-4 md:ml-16">
            <h4 className="font-display text-cream font-semibold mb-1 text-sm">{t(s.disclaimerTitle, lang)}</h4>
            <p className="text-cream/50 text-xs font-body leading-relaxed whitespace-pre-line">
              {t(s.disclaimerText, lang)}{"\n"}
              <a href="mailto:info@ebgreenusa.com" className="text-gold hover:underline">info@ebgreenusa.com</a>
            </p>
          </div>

        </div>

        <div className="border-t border-cream/10 mt-8 pt-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/30 text-sm font-body">
            © {new Date().getFullYear()} Ebgreen Immigration. {t(s.rights, lang)}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-cream/30 hover:text-gold text-sm font-body transition-colors">{t(s.privacy, lang)}</a>
            <a href="#" className="text-cream/30 hover:text-gold text-sm font-body transition-colors">{t(s.terms, lang)}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;