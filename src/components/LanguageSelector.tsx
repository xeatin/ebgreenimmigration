import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/translations";

const languages: { code: Language; country: string; label: string }[] = [
  { code: "pt", country: "br", label: "PT" },
  { code: "en", country: "us", label: "EN" },
  { code: "es", country: "es", label: "ES" },
];

const LanguageSelector = ({ darkMode = false }: { darkMode?: boolean }) => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-label={l.label}
          className={`flex items-center justify-center p-1 rounded-md transition-all ${
            l.code === lang
              ? darkMode
                ? "ring-2 ring-gold bg-green-deep/10"
                : "ring-2 ring-gold bg-cream/10"
              : "opacity-60 hover:opacity-100"
          }`}
        >
          <img
            src={`https://flagcdn.com/w40/${l.country}.png`}
            srcSet={`https://flagcdn.com/w80/${l.country}.png 2x`}
            width={24}
            height={18}
            alt={l.label}
            className="rounded-sm object-cover w-6 h-[18px]"
          />
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
