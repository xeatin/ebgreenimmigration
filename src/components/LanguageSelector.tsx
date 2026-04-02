import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/translations";

const languages: { code: Language; flag: string; label: string }[] = [
  { code: "pt", flag: "🇧🇷", label: "PT" },
  { code: "en", flag: "🇺🇸", label: "EN" },
  { code: "es", flag: "🇪🇸", label: "ES" },
];

const LanguageSelector = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm font-body transition-colors ${
            l.code === lang
              ? "text-gold bg-cream/10"
              : "text-cream/60 hover:text-gold hover:bg-cream/5"
          }`}
        >
          <span className="text-base">{l.flag}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;