import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const AboutSection = () => {
  const { lang } = useLanguage();
  const s = translations.about;

  return (
    <section id="sobre" className="relative py-24 md:py-32 bg-muted/30 overflow-hidden">
      {/* Architectural grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "8.333% 100%",
        }}
      />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* LEFT — Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold font-body text-xs tracking-[0.3em] uppercase font-semibold">
                {t(s.sectionLabel, lang)}
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight mb-8">
              {t(s.title1, lang)}{" "}
              <span className="text-gradient-gold italic font-medium">
                {t(s.titleHighlight, lang)}
              </span>
              .
            </h2>

            <div className="space-y-5 max-w-[60ch] mb-12">
              <p
                className="text-muted-foreground text-base md:text-lg leading-relaxed font-body"
                dangerouslySetInnerHTML={{ __html: t(s.paragraph1, lang) }}
              />
              <p className="text-muted-foreground text-base leading-relaxed font-body">
                {t(s.paragraph2, lang)}
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 border-t border-border pt-8">
              {s.bullets.slice(0, 4).map((item, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <div className="w-1.5 h-1.5 bg-navy shrink-0 mt-2 transition-colors group-hover:bg-gold" />
                  <span className="text-foreground font-body text-sm leading-snug">
                    {t(item, lang)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* RIGHT — Architectural Monogram Plaque */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative order-1 lg:order-2"
          >
            <div className="relative h-[480px] md:h-[600px] lg:h-[680px] flex justify-end">
              {/* Main plaque */}
              <div className="relative w-[88%] h-[92%] bg-navy shadow-2xl flex flex-col justify-center items-center overflow-hidden border border-foreground/5">
                {/* Inner frame lines */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-10 md:top-14 left-0 right-0 h-px bg-gold/15" />
                  <div className="absolute bottom-10 md:bottom-14 left-0 right-0 h-px bg-gold/15" />
                  <div className="absolute left-10 md:left-14 top-0 bottom-0 w-px bg-gold/15" />
                  <div className="absolute right-10 md:right-14 top-0 bottom-0 w-px bg-gold/15" />
                </div>

                {/* Subtle radial glow */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 45%, hsl(var(--gold) / 0.18), transparent 60%)",
                  }}
                />

                {/* Gold monogram */}
                <div className="relative z-10 flex flex-col items-center select-none">
                  <div
                    className="font-display italic font-bold leading-none tracking-tighter bg-clip-text text-transparent drop-shadow-sm"
                    style={{
                      fontSize: "clamp(8rem, 18vw, 16rem)",
                      backgroundImage:
                        "linear-gradient(to bottom, hsl(var(--gold-light)), hsl(var(--gold)) 50%, hsl(38 60% 38%))",
                    }}
                  >
                    EB
                  </div>
                  <div className="mt-3 flex items-center gap-5 text-gold/70 text-[10px] md:text-xs tracking-[0.35em] font-body font-medium">
                    <span>EBGREEN</span>
                    <div className="w-1 h-1 bg-gold/50 rotate-45" />
                    <span>IMMIGRATION</span>
                  </div>
                </div>
              </div>

              {/* Floating credibility cornerstone card */}
              <div className="absolute left-0 bottom-0 w-[68%] md:w-[60%] lg:w-[58%] bg-card border border-border p-6 md:p-8 shadow-[8px_8px_0_0_hsl(var(--navy))] md:shadow-[12px_12px_0_0_hsl(var(--navy))]">
                <div className="flex flex-col gap-5">
                  {/* Seal */}
                  <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center p-1 shrink-0">
                    <div className="w-full h-full rounded-full border border-dashed border-gold/40 bg-gold/10 flex items-center justify-center">
                      <span className="font-display italic text-gold text-sm">
                        §
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-gold font-body text-[10px] tracking-[0.25em] uppercase font-semibold mb-2">
                      {t(s.cardTitle, lang)}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight mb-2">
                      {t(s.floatingCard, lang)}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">
                      {t(s.cardDescription, lang)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
