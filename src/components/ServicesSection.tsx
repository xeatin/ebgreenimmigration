import { motion } from "framer-motion";
import { FileText, Users, Briefcase, GraduationCap, Shield, Globe, ArrowRight, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t, type Language } from "@/i18n/translations";

const icons = [Shield, FileText, Globe, Briefcase, GraduationCap, Users];
const titles = ["EB-1A", "EB-2 NIW", "", "", "", ""];
const subtitles = ["Extraordinary Ability", "National Interest Waiver", "EB-5, E-2", "H-1B, L-1, O-1", "", ""];
const highlights = [true, true, false, false, false, false];

const ServicesSection = () => {
  const { lang } = useLanguage();
  const s = translations.services;
  type ServiceTranslationItem = {
    title?: Record<Language, string>;
    subtitle?: Record<Language, string>;
    description: Record<Language, string>;
  };

  const services = (s.items as readonly ServiceTranslationItem[]).map((item, i) => ({
    icon: icons[i],
    title: item.title ? t(item.title, lang) : titles[i],
    subtitle: item.subtitle ? t(item.subtitle, lang) : subtitles[i],
    description: t(item.description, lang),
    highlight: highlights[i],
  }));

  // Separate highlighted (first 2) and rest
  const highlightedServices = services.slice(0, 2);
  const otherServices = services.slice(2);

  return (
    <section id="servicos" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3 font-semibold">{t(s.sectionLabel, lang)}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gold">
            {t(s.sectionTitle, lang)}
          </h2>
          <p className="mt-4 text-cream/60 max-w-2xl mx-auto text-lg font-body">
            {t(s.sectionSubtitle, lang)}
          </p>
          <div className="w-16 h-1 bg-brand-green mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* All services in uniform grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Highlighted pair with shared tag */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative md:col-span-2 lg:col-span-2"
          >
            <div className="border border-gold/30 rounded-xl p-4 pt-4 bg-gold/5 h-full shadow-[0_0_20px_hsl(var(--gold)/0.08)] hover:shadow-[0_0_30px_hsl(var(--brand-green)/0.18)] transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <span className="bg-gradient-gold text-green-deep text-xs font-bold font-body px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-[0_0_12px_hsl(var(--gold)/0.35)]">
                  <Star size={12} className="fill-green-deep" />
                  {t(s.mostPopular, lang)}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {highlightedServices.map((service, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative p-6 rounded-xl border border-gold/30 hover:border-brand-green/60 bg-gold/10 transition-all group cursor-pointer hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gold/20">
                        <service.icon className="text-gold" size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-display text-lg font-semibold text-gold relative inline-block ${(service.title.includes("EB-1A") || service.title.includes("EB-2")) ? 'drop-shadow-[0_0_5px_hsl(var(--brand-green)/0.35)]' : ''}`}>
                          {service.title}
                          {(service.title.includes("EB-1A") || service.title.includes("EB-2")) && (
                            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-brand-green rounded-full" />
                          )}
                        </h3>
                        <p className="text-gold/80 text-xs font-body mt-0.5">{service.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-cream/60 font-body mt-3 leading-relaxed text-sm">{service.description}</p>
                    <div className="mt-3 flex items-center gap-1 text-gold text-sm font-semibold font-body opacity-0 group-hover:opacity-100 transition-opacity">
                      {t(s.learnMore, lang)} <ArrowRight size={14} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Other services */}
          {otherServices.map((service, i) => (
            <motion.div
              key={i + 2}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 2) * 0.08 }}
              className="relative p-6 rounded-xl border-2 bg-cream/5 border-cream/10 hover:border-brand-green/50 hover:shadow-[0_0_0_1px_hsl(var(--brand-green)/0.35)] transition-all group cursor-pointer hover:-translate-y-1"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-cream/10">
                  <service.icon className="text-cream/70" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-gold">{service.title}</h3>
                  <p className="text-gold/80 text-xs font-body mt-0.5">{service.subtitle}</p>
                </div>
              </div>
              <p className="text-cream/60 font-body mt-3 leading-relaxed text-sm">{service.description}</p>
              <div className="mt-3 flex items-center gap-1 text-gold text-sm font-semibold font-body opacity-0 group-hover:opacity-100 transition-opacity">
                {t(s.learnMore, lang)} <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;