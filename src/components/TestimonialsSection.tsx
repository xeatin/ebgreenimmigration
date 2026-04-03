import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronUp, ChevronDown } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import familyImage from "@/assets/family-flag.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const testimonials = [
  {
    name: "Ricardo & Ana Silva",
    category: "EB-2 NIW • Aprovado em 2024",
    text: {
      pt: "A equipe foi excepcional do início ao fim. Em menos de 12 meses tivemos nosso Green Card aprovado. O suporte e a dedicação de toda a equipe fizeram toda a diferença na nossa jornada.",
      en: "The team was exceptional from start to finish. In less than 12 months we had our Green Card approved. The support and dedication of the entire team made all the difference in our journey.",
      es: "El equipo fue excepcional de principio a fin. En menos de 12 meses obtuvimos nuestro Green Card aprobado. El soporte y la dedicación de todo el equipo hicieron toda la diferencia en nuestro viaje.",
    },
    rating: 5,
  },
  {
    name: "Mariana Costa",
    category: "H-1B • Profissional de TI",
    text: {
      pt: "Depois de anos tentando sozinha, decidi contratar a assessoria e foi a melhor decisão. O processo foi claro, transparente e muito mais rápido do que eu imaginava.",
      en: "After years of trying on my own, I decided to hire the advisory and it was the best decision. The process was clear, transparent, and much faster than I imagined.",
      es: "Después de años intentándolo sola, decidí contratar la asesoría y fue la mejor decisión. El proceso fue claro, transparente y mucho más rápido de lo que imaginaba.",
    },
    rating: 5,
  },
  {
    name: "Fernando Oliveira",
    category: "EB-5 • Investidor",
    text: {
      pt: "Como empresário, precisava de uma equipe que entendesse tanto o lado jurídico quanto o empresarial. Superaram todas as minhas expectativas. Recomendo sem hesitar.",
      en: "As a businessman, I needed a team that understood both the legal and business sides. They exceeded all my expectations. I recommend without hesitation.",
      es: "Como empresario, necesitaba un equipo que entendiera tanto el lado jurídico como el empresarial. Superaron todas mis expectativas. Recomiendo sin dudar.",
    },
    rating: 5,
  },
  {
    name: "Camila & Pedro Almeida",
    category: "EB-1A • Aprovado em 2025",
    text: {
      pt: "Nosso caso era complexo, mas a equipe encontrou a melhor estratégia. Hoje vivemos nos EUA com tranquilidade e segurança.",
      en: "Our case was complex, but the team found the best strategy. Today we live in the USA with peace and security.",
      es: "Nuestro caso era complejo, pero el equipo encontró la mejor estrategia. Hoy vivimos en EE.UU. con tranquilidad y seguridad.",
    },
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const { lang } = useLanguage();
  const s = translations.testimonials;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="depoimentos" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left column – title + image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight">
              {t(s.title1, lang)}{" "}
              <em className="text-accent not-italic font-bold bg-gradient-to-r from-accent to-[hsl(38_60%_72%)] bg-clip-text text-transparent">
                {t(s.titleHighlight, lang)}
              </em>
            </h2>
            <p className="text-muted-foreground font-body mt-4 leading-relaxed max-w-md">
              {t(s.subtitle, lang)}
            </p>

            <div className="mt-8 relative rounded-2xl overflow-hidden aspect-video max-h-[280px]">
              <img src={familyImage} alt="Família celebrando" className="w-full h-full object-cover" loading="lazy" width={1280} height={640} />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-display text-lg font-bold">{t(s.familiesCount, lang)}</p>
                <p className="text-white/70 font-body text-xs">{t(s.familiesSubtitle, lang)}</p>
              </div>
            </div>
          </motion.div>

          {/* Right column – Vertical Embla carousel */}
          <div className="relative">
            <div className="overflow-hidden max-h-[520px]" ref={emblaRef}>
              <div className="flex flex-col gap-4">
                {testimonials.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-card border border-border rounded-xl px-6 py-5 relative min-h-0 flex-[0_0_auto]"
                  >
                    <Quote size={28} className="absolute top-5 right-5 text-accent/25" />
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: item.rating }).map((_, j) => (
                        <Star key={j} size={14} className="text-accent fill-accent" />
                      ))}
                    </div>
                    <p className="text-foreground/80 font-body leading-relaxed italic text-sm pr-8">
                      "{t(item.text, lang)}"
                    </p>
                    <div className="mt-4">
                      <p className="font-display text-foreground font-semibold text-sm">{item.name}</p>
                      <p className="text-accent text-xs font-body">{item.category}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="w-9 h-9 rounded-full border border-border bg-secondary flex items-center justify-center text-foreground transition-colors hover:bg-accent hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous testimonial"
              >
                <ChevronUp size={18} />
              </button>

              {/* Dot indicators */}
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => emblaApi?.scrollTo(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === selectedIndex
                        ? "bg-accent w-5"
                        : "bg-border w-2 hover:bg-muted-foreground"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="w-9 h-9 rounded-full border border-border bg-secondary flex items-center justify-center text-foreground transition-colors hover:bg-accent hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next testimonial"
              >
                <ChevronDown size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
