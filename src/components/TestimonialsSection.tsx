import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import familyImage from "@/assets/family-flag.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const testimonials = [
  {
    name: "Ricardo & Ana Silva",
    category: "EB-2 NIW • Aprovado em 2024",
    text: {
      pt: "A equipe foi excepcional do início ao fim. Em menos de 12 meses tivemos nosso Green Card aprovado. O suporte fizeram toda a diferença.",
      en: "The team was exceptional from start to finish. In less than 12 months we had our Green Card approved. The support made all the difference.",
      es: "El equipo fue excepcional de principio a fin. En menos de 12 meses obtuvimos nuestro Green Card aprobado. El soporte hizo toda la diferencia.",
    },
    rating: 5,
  },
  {
    name: "Mariana Costa",
    category: "H-1B • Profissional de TI",
    text: {
      pt: "Depois de anos tentando sozinha, decidi contratar a assessoria e foi a melhor decisão. Processo claro, transparente e rápido.",
      en: "After years of trying on my own, I decided to hire the advisory and it was the best decision. Clear, transparent, and fast process.",
      es: "Después de años intentándolo sola, decidí contratar la asesoría y fue la mejor decisión. Proceso claro, transparente y rápido.",
    },
    rating: 5,
  },
  {
    name: "Fernando Oliveira",
    category: "EB-5 • Investidor",
    text: {
      pt: "Precisava de uma equipe que entendesse o lado jurídico e empresarial. Superaram todas as expectativas. Recomendo sem hesitar.",
      en: "I needed a team that understood both the legal and business sides. They exceeded all expectations. I recommend without hesitation.",
      es: "Necesitaba un equipo que entendiera el lado jurídico y empresarial. Superaron todas las expectativas. Recomiendo sin dudar.",
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
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    loop: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="depoimentos" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left column – title + image (UNCHANGED) */}
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

          {/* Right column – Embla carousel */}
          <div className="flex flex-col">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {testimonials.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-secondary border border-border rounded-xl px-6 py-5 relative shrink-0 w-[85vw] sm:w-[340px] lg:w-[280px]"
                  >
                    <Quote size={32} className="absolute top-4 right-4 text-accent/20" />
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: item.rating }).map((_, j) => (
                        <Star key={j} size={14} className="text-accent fill-accent" />
                      ))}
                    </div>
                    <p className="text-foreground/80 font-body leading-relaxed italic text-sm">
                      "{t(item.text, lang)}"
                    </p>
                    <div className="mt-3">
                      <p className="font-display text-foreground font-semibold text-sm">{item.name}</p>
                      <p className="text-muted-foreground text-xs font-body">{item.category}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Controls below carousel */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canScrollPrev}
                className="w-10 h-10 rounded-full border border-border bg-secondary flex items-center justify-center text-foreground transition-colors hover:bg-accent hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {scrollSnaps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => emblaApi?.scrollTo(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      idx === selectedIndex ? "bg-accent" : "bg-border"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canScrollNext}
                className="w-10 h-10 rounded-full border border-border bg-secondary flex items-center justify-center text-foreground transition-colors hover:bg-accent hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
