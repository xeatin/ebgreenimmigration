import { motion } from "framer-motion";
import { Shield, Globe, Languages, Users } from "lucide-react";
import teamImg from "@/assets/team.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const badgeIcons = [Languages, Globe, Shield, Users];

const AboutSection = () => {
  const { lang } = useLanguage();
  const s = translations.about;

  return (
    <section id="sobre" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden">
              <img src={teamImg} alt="Equipe Ebgreen Immigration" className="w-full h-auto object-cover" loading="lazy" width={800} height={1000} />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-5 shadow-xl border border-border max-w-[240px]">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-3">
                <Globe className="text-gold" size={20} />
              </div>
              <p className="font-display text-base font-bold text-gold whitespace-nowrap">EUA · Brasil · Europa</p>
              <div className="w-full h-px bg-border my-2" />
              <p className="text-muted-foreground text-sm font-body leading-relaxed">Referência mundial em mobilidade global e direito imigratório.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3 font-semibold">{t(s.sectionLabel, lang)}</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
              {t(s.title1, lang)}{" "}
              <span className="text-gradient-gold">{t(s.titleHighlight, lang)}</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-gold mx-auto mt-6 mb-8 rounded-full" />

            <p className="text-muted-foreground text-lg leading-relaxed font-body" dangerouslySetInnerHTML={{ __html: t(s.paragraph1, lang) }} />
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed font-body">{t(s.paragraph2, lang)}</p>

            <ul className="mt-8 space-y-3">
              {s.bullets.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Shield className="text-gold shrink-0 mt-0.5" size={18} />
                  <span className="text-foreground font-body text-sm">{t(item, lang)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;