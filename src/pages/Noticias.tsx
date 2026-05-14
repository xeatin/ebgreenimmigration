import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, MapPin, Loader2, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source?: string;
};

const copy = {
  title: {
    pt: "Últimas Notícias de Imigração Americana",
    en: "Latest U.S. Immigration News",
    es: "Últimas Noticias de Inmigración Americana",
  },
  subtitle: {
    pt: "Fique por dentro das principais notícias, mudanças e atualizações sobre imigração americana em um só lugar.",
    en: "Stay up to date with the main news, changes and updates on U.S. immigration — all in one place.",
    es: "Mantente al día con las principales noticias, cambios y actualizaciones sobre inmigración americana en un solo lugar.",
  },
  readMore: { pt: "Ler completa", en: "Read more", es: "Leer completa" },
  loading: { pt: "Carregando notícias...", en: "Loading news...", es: "Cargando noticias..." },
  error: {
    pt: "Não foi possível carregar as notícias agora. Tente novamente.",
    en: "Could not load the news right now. Please try again.",
    es: "No se pudieron cargar las noticias ahora. Intenta de nuevo.",
  },
  retry: { pt: "Tentar novamente", en: "Try again", es: "Intentar de nuevo" },
  ctaTitle: {
    pt: "Quer entender como essas mudanças afetam seu caso?",
    en: "Want to know how these changes affect your case?",
    es: "¿Quieres saber cómo estos cambios afectan tu caso?",
  },
  ctaButton: {
    pt: "Quero falar com um especialista",
    en: "Talk to a specialist",
    es: "Hablar con un especialista",
  },
};

const formatDate = (raw: string, lang: "pt" | "en" | "es") => {
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US";
  return d.toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" });
};

const Noticias = () => {
  const { lang } = useLanguage();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke("uscis-news");
      if (error) throw error;
      setItems(data?.items ?? []);
    } catch (e) {
      console.error(e);
      setError(copy.error[lang]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <section className="pt-32 pb-12 bg-gradient-to-b from-green-deep to-green-deep/95">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-tight"
          >
            {copy.title[lang]}
          </motion.h1>
          <p className="mt-4 text-cream/80 font-body text-sm md:text-base">
            {copy.subtitle[lang]}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {loading && (
            <div className="flex items-center justify-center py-20 text-green-deep/70">
              <Loader2 className="animate-spin mr-3" />
              <span className="font-body">{copy.loading[lang]}</span>
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-20">
              <p className="text-green-deep/80 font-body mb-4">{error}</p>
              <button
                onClick={load}
                className="inline-flex items-center gap-2 bg-gold text-green-deep px-5 py-2.5 rounded-md font-bold font-body hover:opacity-90"
              >
                <RefreshCw size={16} />
                {copy.retry[lang]}
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-5">
              {items.map((item, i) => (
                <motion.article
                  key={item.link}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl border-l-4 border-gold shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center">
                      <MapPin size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display text-xl md:text-2xl text-green-deep leading-snug">
                        {item.title}
                      </h2>
                      <p className="text-xs text-green-deep/60 font-body mt-1 uppercase tracking-wider">
                        {formatDate(item.pubDate, lang)}{item.source ? ` · ${item.source}` : ""}
                      </p>
                      {item.description && (
                        <p className="text-green-deep/75 font-body text-sm mt-3 line-clamp-3">
                          {item.description}
                        </p>
                      )}
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-4 text-gold font-body font-semibold text-sm hover:underline"
                      >
                        {copy.readMore[lang]}
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          <div className="mt-16 text-center bg-green-deep rounded-2xl p-10">
            <h3 className="font-display text-2xl md:text-3xl text-cream">
              {copy.ctaTitle[lang]}
            </h3>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-whatsapp-lead"))}
              className="mt-6 bg-gradient-gold text-green-deep px-8 py-3 rounded-md font-bold font-body hover:opacity-90 transition-opacity"
            >
              {copy.ctaButton[lang]}
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Noticias;
