import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const HeroSection = () => {
  const { lang } = useLanguage();
  const s = translations.hero;

  return (
    <section id="hero" className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Profissionais em aeroporto internacional" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-t from-green-deep via-green-deep/80 to-green-deep/40" />
      </div>

      <div className="relative z-10 container mx-auto px-6 pb-20 pt-40">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-full px-4 py-2 mb-8"
          >
            <Shield size={14} className="text-gold" />
            <span className="text-cream/90 font-body text-sm">{t(s.badge, lang)}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4.2rem] font-bold text-cream leading-[1.1]"
          >
            {t(s.title1, lang)}{" "}
            <span className="text-gradient-gold whitespace-nowrap">{t(s.titleHighlight, lang)}</span>
            <br />
            {t(s.title2, lang)}
            <br />
            {t(s.title3, lang)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-cream/70 text-lg md:text-xl max-w-xl font-body leading-relaxed"
          >
            {t(s.subtitle, lang)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-green-deep px-8 py-4 rounded-md font-bold text-lg font-body hover:opacity-90 transition-opacity"
            >
              {t(s.ctaPrimary, lang)}
              <ArrowRight size={20} />
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center gap-2 border border-cream/30 text-cream px-8 py-4 rounded-md font-semibold font-body hover:border-gold hover:text-gold transition-colors"
            >
              {t(s.ctaSecondary, lang)}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-cream/10 bg-cream/5 backdrop-blur-sm rounded-xl border border-cream/10 p-6 md:p-0"
        >
          {[
            { number: "100%", label: t(s.stats.families, lang) },
            { number: "+92%", label: t(s.stats.success, lang) },
            { number: "10+", label: t(s.stats.experience, lang) },
            { number: "3", label: t(s.stats.offices, lang), subtitle: t(s.stats.officesSubtitle, lang) },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:py-6">
              <p className="font-display text-3xl md:text-4xl font-bold text-gold">{stat.number}</p>
              <p className="text-cream/50 text-sm mt-1 font-body">{stat.label}</p>
              {stat.subtitle && <p className="text-cream/40 text-xs mt-0.5 font-body">{stat.subtitle}</p>}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;