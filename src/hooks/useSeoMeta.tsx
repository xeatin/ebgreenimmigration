import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

type SeoConfig = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogLocale: string;
  htmlLang: string;
};

const SEO_BY_LANG: Record<string, SeoConfig> = {
  pt: {
    title: "EBGreen Immigration | Green Card EB-1A, EB-2 NIW e Vistos para os EUA",
    description:
      "Assessoria especializada em Green Card por mérito profissional. EB-1A, EB-2 NIW, O-1 e vistos de trabalho. Atendimento em português, inglês e espanhol. Consulta gratuita.",
    ogTitle: "EBGreen Immigration | Green Card EB-1A, EB-2 NIW e Vistos para os EUA",
    ogDescription:
      "Assessoria especializada em Green Card por mérito profissional. EB-1A, EB-2 NIW, O-1 e vistos de trabalho. Atendimento em português, inglês e espanhol. Consulta gratuita.",
    ogLocale: "pt_BR",
    htmlLang: "pt-BR",
  },
  en: {
    title: "EBGreen Immigration | Green Card EB-1A, EB-2 NIW and US Visas",
    description:
      "Expert immigration consulting for EB-1A, EB-2 NIW, O-1 and work visas. Individual strategy, 89%+ approval rate. Free consultation available.",
    ogTitle: "EBGreen Immigration | Green Card Experts",
    ogDescription:
      "Get your Green Card with the right strategy. Specialists in EB-1A, EB-2 NIW, O-1 and investor visas. Free consultation.",
    ogLocale: "en_US",
    htmlLang: "en",
  },
  es: {
    title: "EBGreen Immigration | Green Card EB-1A, EB-2 NIW y Visas para EE.UU.",
    description:
      "Asesoría especializada en Green Card por mérito profesional. EB-1A, EB-2 NIW, O-1 y visas de trabajo. Atención en español. Consulta gratuita.",
    ogTitle: "EBGreen Immigration | Expertos en Green Card",
    ogDescription:
      "Consigue tu Green Card con la estrategia correcta. Especialistas en EB-1A, EB-2 NIW, O-1 y visas de inversor. Consulta gratuita.",
    ogLocale: "es_ES",
    htmlLang: "es",
  },
};

const setMeta = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (el) el.setAttribute(attr, value);
};

export const useSeoMeta = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    const cfg = SEO_BY_LANG[lang] ?? SEO_BY_LANG.pt;

    document.documentElement.lang = cfg.htmlLang;
    document.title = cfg.title;

    setMeta('meta[name="description"]', "content", cfg.description);
    setMeta('meta[property="og:title"]', "content", cfg.ogTitle);
    setMeta('meta[property="og:description"]', "content", cfg.ogDescription);
    setMeta('meta[property="og:locale"]', "content", cfg.ogLocale);
    setMeta('meta[name="twitter:title"]', "content", cfg.ogTitle);
    setMeta('meta[name="twitter:description"]', "content", cfg.ogDescription);
  }, [lang]);
};
