import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const ProcessSection = () => {
  const { lang } = useLanguage();
  const s = translations.process;

  const steps = s.steps.map((step, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: t(step.title, lang),
    desc: t(step.desc, lang),
  }));

  return (
    <section id="processo" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3 font-semibold">{t(s.sectionLabel, lang)}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            {t(s.sectionTitle, lang)}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg font-body">
            {t(s.sectionSubtitle, lang)}
          </p>
          <div className="w-16 h-1 bg-gradient-gold mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="flex items-start gap-4">
                <span className="font-display text-5xl font-bold text-gold/20 leading-none">{step.num}</span>
                <div className="pt-2">
                  <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed">{step.desc}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -bottom-4 left-8 w-px h-8 bg-border" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="#contato"
            className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-green-deep px-8 py-4 rounded-md font-bold text-lg font-body hover:opacity-90 transition-opacity"
          >
            {t(s.cta, lang)}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;