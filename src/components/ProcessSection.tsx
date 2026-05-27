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
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-[1.15] tracking-tight">
            {t(s.sectionTitle, lang)}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg font-body">
            {t(s.sectionSubtitle, lang)}
          </p>
          <div className="w-16 h-1 bg-brand-green mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-x-[2.55rem] gap-y-[2.975rem]">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-5 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)]"
            >
              <span className="font-display text-6xl font-bold text-gold/40 leading-none select-none shrink-0">
                {step.num}
              </span>
              <div className="pt-2">
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
