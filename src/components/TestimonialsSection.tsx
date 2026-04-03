import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
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
  {
    name: "Giovanna Paula",
    category: "F-1/F-2 • Aprovado em 2026",
    text: {
      pt: "A assessoria tornou todo o processo do visto de estudante muito mais simples. Foi aprovado em apenas 3 dias! Me senti acompanhada em cada etapa e hoje estou realizando meu sonho de estudar nos Estados Unidos.",
      en: "The advisory made the entire student visa process much simpler. It was approved in just 3 days! I felt supported at every step and today I am living my dream of studying in the United States.",
      es: "La asesoría hizo que todo el proceso de visa de estudiante fuera mucho más simple. ¡Fue aprobado en solo 3 días! Me sentí acompañada en cada etapa y hoy estoy cumpliendo mi sueño de estudiar en Estados Unidos.",
    },
    rating: 5,
  },
  {
    name: "Cátia Simone",
    category: "F-1/F-2 • Aprovado em 2025",
    text: {
      pt: "Graças ao trabalho impecável da equipe, consegui meu visto sem nenhuma complicação. O atendimento foi humanizado e profissional do início ao fim.",
      en: "Thanks to the team's impeccable work, I got my visa without any complications. The service was humanized and professional from start to finish.",
      es: "Gracias al trabajo impecable del equipo, obtuve mi visa sin ninguna complicación. El servicio fue humanizado y profesional de principio a fin.",
    },
    rating: 5,
  },
  {
    name: "Claudio de Jesus",
    category: "R-1 • Aprovado em 2025",
    text: {
      pt: "O processo do visto religioso parecia impossível, mas a equipe demonstrou conhecimento profundo e conseguiu a aprovação com agilidade. Sou muito grato por todo o suporte.",
      en: "The religious visa process seemed impossible, but the team demonstrated deep knowledge and achieved approval quickly. I am very grateful for all the support.",
      es: "El proceso de visa religiosa parecía imposible, pero el equipo demostró un conocimiento profundo y logró la aprobación con agilidad. Estoy muy agradecido por todo el apoyo.",
    },
    rating: 5,
  },
];

const getAvatarColor = (category: string): string => {
  if (category.includes("EB-1") || category.includes("EB-2")) return "bg-[#C8962D]";
  if (category.includes("H-1B")) return "bg-[#2D3A5C]";
  if (category.includes("EB-5")) return "bg-[#1B4D3E]";
  if (category.includes("F-1") || category.includes("F-2")) return "bg-[#5B2C6F]";
  if (category.includes("R-1")) return "bg-[#8B4513]";
  return "bg-accent";
};

const TestimonialsSection = () => {
  const s = translations.testimonials;
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const maxScrollLeft = Math.max(container.scrollWidth - container.clientWidth, 0);
    setCanScrollPrev(container.scrollLeft > 4);
    setCanScrollNext(container.scrollLeft < maxScrollLeft - 4);

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const distance = Math.abs(card.offsetLeft - container.scrollLeft - container.offsetLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setSelectedIndex(closestIndex);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;

    container.scrollTo({
      left: card.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });
  }, []);

  const scrollPrev = useCallback(() => {
    scrollToIndex(Math.max(selectedIndex - 1, 0));
  }, [scrollToIndex, selectedIndex]);

  const scrollNext = useCallback(() => {
    scrollToIndex(Math.min(selectedIndex + 1, testimonials.length - 1));
  }, [scrollToIndex, selectedIndex]);

  return (
    <section id="depoimentos" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3 font-semibold">Depoimentos</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight">
            {t(s.title1, lang)}{" "}
            <em className="text-accent not-italic font-bold bg-gradient-to-r from-accent to-[hsl(38_60%_72%)] bg-clip-text text-transparent">
              {t(s.titleHighlight, lang)}
            </em>
          </h2>
          <p className="text-muted-foreground font-body mt-4 leading-relaxed max-w-lg mx-auto">
            {t(s.subtitle, lang).split("Green Card").map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>{part}<span className="text-accent font-semibold">Green Card</span></span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
        </motion.div>

        {/* Horizontal scroll carousel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={updateScrollState}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`[data-testimonials-scroll]::-webkit-scrollbar { display: none; }`}</style>
            {testimonials.map((item, i) => {
              const initials = item.name
                .split(/[\s&]+/)
                .filter(w => w.length > 0)
                .map(w => w[0].toUpperCase())
                .slice(0, 2)
                .join("");

              return (
                <motion.div
                  key={item.name}
                  ref={(node) => { cardRefs.current[i] = node; }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-card border border-border rounded-xl px-6 py-5 snap-start shrink-0 w-[320px] md:w-[380px]"
                  data-testimonials-scroll
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                      <span className="text-white font-display font-bold text-sm">{initials}</span>
                    </div>
                    <div>
                      <p className="font-display text-foreground font-semibold text-sm leading-tight">{item.name}</p>
                      <p className="text-accent text-xs font-body">{item.category}</p>
                    </div>
                  </div>

                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: item.rating }).map((_, j) => (
                      <Star key={j} size={14} className="text-accent fill-accent" />
                    ))}
                  </div>

                  <p className="text-foreground/80 font-body leading-relaxed italic text-sm">
                    "{t(item.text, lang)}"
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation below */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="w-9 h-9 rounded-full border border-border bg-secondary flex items-center justify-center text-foreground transition-colors hover:bg-accent hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
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
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
