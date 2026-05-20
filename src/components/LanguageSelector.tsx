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
    <div className="flex items-center gap-1.5">
      {languages.map((l) => {
        const isActive = l.code === lang;
        return (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            aria-label={l.label}
            aria-pressed={isActive}
            title={l.label}
            className={`flex items-center justify-center p-1 rounded-md transition-transform duration-200 ${
              isActive
                ? "scale-110"
                : "opacity-60 hover:opacity-100 hover:scale-105"
            }`}
          >
            <img
              src={`https://flagcdn.com/w80/${l.country}.png`}
              srcSet={`https://flagcdn.com/w160/${l.country}.png 2x`}
              width={22}
              height={16}
              alt={l.label}
              className="object-cover w-[22px] h-4 rounded-sm"
            />
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSelector;
