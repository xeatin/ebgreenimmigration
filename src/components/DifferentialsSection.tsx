import { motion } from "framer-motion";
import { Award, Users, Scale, Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const icons = [Award, Users, Scale, Clock];
const stats = ["+89%", "10+", "100%", "24/7"];

const DifferentialsSection = () => {
  const { lang } = useLanguage();
  const s = translations.diff;

  return (
    <section id="diferenciais" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-light rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative">
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
          <div className="w-16 h-1 bg-gradient-to-r from-gold to-brand-green mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {s.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <Icon className="text-primary group-hover:text-primary-foreground transition-colors" size={28} />
                </div>
                <p className="font-display text-4xl font-bold text-gold mb-2">{stats[i]}</p>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{t(item.title, lang)}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">{t(item.description, lang)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;