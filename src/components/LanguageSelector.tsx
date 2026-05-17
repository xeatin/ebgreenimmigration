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
            className={`relative flex items-center justify-center p-0.5 rounded-md transition-all duration-200 ${
              isActive
                ? `scale-110 ring-2 ring-offset-1 ring-gold ${
                    darkMode ? "ring-offset-green-deep" : "ring-offset-cream"
                  } shadow-[0_2px_8px_-2px_hsl(var(--gold)/0.6)]`
                : "opacity-50 hover:opacity-100 hover:scale-105 grayscale hover:grayscale-0"
            }`}
          >
            <img
              src={`https://flagcdn.com/w40/${l.country}.png`}
              srcSet={`https://flagcdn.com/w80/${l.country}.png 2x`}
              width={22}
              height={16}
              alt={l.label}
              className="object-cover w-[22px] h-[16px] rounded-sm"
            />
            {isActive && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_6px_hsl(var(--gold))]" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSelector;
