import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, MapPin, Loader2, RefreshCw, Star, FileText } from "lucide-react";
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

type Bulletin = {
  month: string;
  monthNumber: number;
  year: number;
  url: string;
  publishedAt: string;
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
    pt: "Seu caminho para o Green Card pode depender da estratégia certa.",
    en: "Your path to the Green Card may depend on the right strategy.",
    es: "Tu camino hacia la Green Card puede depender de la estrategia correcta.",
  },
  ctaButton: {
    pt: "Quero falar com um especialista",
    en: "Talk to a specialist",
    es: "Hablar con un especialista",
  },
  featured: { pt: "Destaque", en: "Featured", es: "Destacado" },
  bulletinEyebrow: {
    pt: "Visa Bulletin · Atualizado mensalmente",
    en: "Visa Bulletin · Updated monthly",
    es: "Visa Bulletin · Actualizado mensualmente",
  },
  bulletinTitle: {
    pt: "Visa Bulletin oficial",
    en: "Official Visa Bulletin",
    es: "Visa Bulletin oficial",
  },
  bulletinDesc: {
    pt: "O Departamento de Estado dos EUA publica mensalmente o Visa Bulletin, com as datas de corte (Final Action Dates) e as datas para arquivamento (Dates for Filing) das categorias EB-1, EB-2, EB-3 e família. Acompanhe o boletim mais recente abaixo.",
    en: "The U.S. Department of State publishes the Visa Bulletin monthly, with the Final Action Dates and Dates for Filing for EB-1, EB-2, EB-3 and family categories. See the latest bulletin below.",
    es: "El Departamento de Estado de EE. UU. publica mensualmente el Visa Bulletin, con las Final Action Dates y las Dates for Filing de las categorías EB-1, EB-2, EB-3 y familiares. Consulta el boletín más reciente a continuación.",
  },
  bulletinCta: {
    pt: "Ver o Visa Bulletin completo",
    en: "Open the full Visa Bulletin",
    es: "Ver el Visa Bulletin completo",
  },
  bulletinSource: {
    pt: "Fonte: travel.state.gov",
    en: "Source: travel.state.gov",
    es: "Fuente: travel.state.gov",
  },
  bulletinLoading: {
    pt: "Buscando o último Visa Bulletin...",
    en: "Loading latest Visa Bulletin...",
    es: "Cargando el último Visa Bulletin...",
  },
};

const MONTH_LABELS: Record<string, Record<"pt" | "en" | "es", string>> = {
  january: { pt: "Janeiro", en: "January", es: "Enero" },
  february: { pt: "Fevereiro", en: "February", es: "Febrero" },
  march: { pt: "Março", en: "March", es: "Marzo" },
  april: { pt: "Abril", en: "April", es: "Abril" },
  may: { pt: "Maio", en: "May", es: "Mayo" },
  june: { pt: "Junho", en: "June", es: "Junio" },
  july: { pt: "Julho", en: "July", es: "Julio" },
  august: { pt: "Agosto", en: "August", es: "Agosto" },
  september: { pt: "Setembro", en: "September", es: "Septiembre" },
  october: { pt: "Outubro", en: "October", es: "Octubre" },
  november: { pt: "Novembro", en: "November", es: "Noviembre" },
  december: { pt: "Dezembro", en: "December", es: "Diciembre" },
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
  const [bulletin, setBulletin] = useState<Bulletin | null>(null);

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

  const loadBulletin = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("visa-bulletin");
      if (error) throw error;
      if (data?.bulletin) setBulletin(data.bulletin);
    } catch (e) {
      console.error("visa-bulletin error", e);
    }
  };

  useEffect(() => {
    load();
    loadBulletin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const featured = items[0];
  const rest = items.slice(1);

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
          {/* Visa Bulletin featured card */}
          <motion.a
            href={bulletin?.url ?? "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html"}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="group block mb-10 rounded-2xl overflow-hidden bg-gradient-to-br from-green-deep to-green-deep/90 border border-gold/40 shadow-[0_20px_50px_-20px_hsl(var(--green-deep)/0.6)] hover:shadow-[0_25px_60px_-15px_hsl(var(--gold)/0.45)] transition-all"
          >
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-gold text-green-deep flex items-center justify-center shadow-md">
                <FileText size={26} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gold font-body text-xs uppercase tracking-[0.18em] font-bold">
                  {copy.bulletinEyebrow[lang]}
                </p>
                <h2 className="font-display text-2xl md:text-3xl text-cream mt-2 leading-tight">
                  {copy.bulletinTitle[lang]}
                  {bulletin && (
                    <span className="block text-gold mt-1">
                      {MONTH_LABELS[bulletin.month]?.[lang] ?? bulletin.month} {bulletin.year}
                    </span>
                  )}
                </h2>
                <p className="text-cream/80 font-body text-sm md:text-base mt-3 leading-relaxed">
                  {copy.bulletinDesc[lang]}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-2 bg-gradient-gold text-green-deep px-5 py-2.5 rounded-md font-bold font-body text-sm group-hover:opacity-90 transition-opacity">
                    {copy.bulletinCta[lang]}
                    <ExternalLink size={14} />
                  </span>
                  <span className="text-cream/50 text-xs font-body uppercase tracking-wider">
                    {bulletin ? copy.bulletinSource[lang] : copy.bulletinLoading[lang]}
                  </span>
                </div>
              </div>
            </div>
          </motion.a>

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
              {/* Featured first item */}
              {featured && (
                <motion.a
                  key={featured.link}
                  href={featured.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.99 }}
                  className="block relative bg-white rounded-2xl border-2 border-eligibility-green shadow-[0_15px_40px_-15px_hsl(var(--eligibility-green)/0.4)] p-8 cursor-pointer transition-all duration-200 hover:shadow-[0_20px_50px_-15px_hsl(var(--eligibility-green)/0.55)]"
                >
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 bg-eligibility-green text-cream px-3 py-1 rounded-full text-xs font-bold font-body uppercase tracking-wider">
                    <Star size={12} className="fill-cream" />
                    {copy.featured[lang]}
                  </span>
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-eligibility-green/15 text-eligibility-green flex items-center justify-center">
                      <MapPin size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display text-2xl md:text-3xl text-green-deep leading-snug">
                        {featured.title}
                      </h2>
                      <p className="text-xs text-green-deep/60 font-body mt-2 uppercase tracking-wider">
                        {formatDate(featured.pubDate, lang)}{featured.source ? ` · ${featured.source}` : ""}
                      </p>
                      {featured.description && (
                        <p className="text-green-deep/80 font-body text-base mt-4 line-clamp-4">
                          {featured.description}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1.5 mt-5 text-eligibility-green font-body font-bold text-sm">
                        {copy.readMore[lang]}
                        <ExternalLink size={14} />
                      </span>
                    </div>
                  </div>
                </motion.a>
              )}

              {/* Rest */}
              {rest.map((item, i) => (
                <motion.a
                  key={item.link}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="block bg-white rounded-xl border-l-4 border-gold shadow-sm p-6 cursor-pointer transition-all duration-200 hover:border-eligibility-green hover:shadow-[0_8px_24px_-8px_hsl(var(--eligibility-green)/0.45)] active:bg-eligibility-green/10 active:border-eligibility-green focus:outline-none focus-visible:ring-2 focus-visible:ring-eligibility-green"
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
                      <span className="inline-flex items-center gap-1.5 mt-4 text-gold font-body font-semibold text-sm">
                        {copy.readMore[lang]}
                        <ExternalLink size={14} />
                      </span>
                    </div>
                  </div>
                </motion.a>
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
