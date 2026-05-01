import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const CTASection = () => {
  const { lang } = useLanguage();
  const s = translations.cta;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary rounded-2xl p-12 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground leading-tight">
              {t(s.title1, lang)}{" "}
              <span className="text-gradient-gold">{t(s.titleHighlight, lang)}</span>{" "}
              {t(s.title2, lang)}
            </h2>
            <p className="mt-4 text-primary-foreground/70 text-lg max-w-2xl mx-auto font-body">
              {t(s.subtitle, lang)}
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="#contato"
                className="btn-highlight inline-flex items-center justify-center gap-2 bg-gradient-gold text-green-deep px-8 py-4 rounded-md font-bold text-lg font-body hover:opacity-90 transition-opacity"
              >
                {t(s.ctaPrimary, lang)}
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;