import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import familyImage from "@/assets/family-flag.jpg";

const testimonials = [
  {
    name: "Ricardo & Ana Silva",
    category: "EB-2 NIW • Aprovado em 2024",
    text: "A equipe foi excepcional do início ao fim. Em menos de 12 meses tivemos nosso Green Card aprovado. O suporte e a dedicação de toda a equipe fizeram toda a diferença na nossa jornada.",
    rating: 5,
  },
  {
    name: "Mariana Costa",
    category: "H-1B • Profissional de TI",
    text: "Depois de anos tentando sozinha, decidi contratar a assessoria e foi a melhor decisão. O processo foi claro, transparente e muito mais rápido do que eu imaginava.",
    rating: 5,
  },
  {
    name: "Fernando Oliveira",
    category: "EB-5 • Investidor",
    text: "Como empresário, precisava de uma equipe que entendesse tanto o lado jurídico quanto o empresarial. Superaram todas as minhas expectativas. Recomendo sem hesitar.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-32"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Histórias de{" "}
              <span className="text-accent italic">quem realizou o sonho</span>
            </h2>
            <p className="text-muted-foreground font-body mt-4 leading-relaxed max-w-md">
              Milhares de famílias já conquistaram seu Green Card e uma nova vida no exterior. Conheça algumas dessas histórias.
            </p>

            <div className="mt-8 relative rounded-2xl overflow-hidden">
              <img
                src={familyImage}
                alt="Família celebrando a aprovação do Green Card"
                className="w-full h-auto object-cover rounded-2xl"
                loading="lazy"
                width={640}
                height={800}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-display text-xl font-bold">
                  17.000+ famílias beneficiadas
                </p>
                <p className="text-white/70 font-body text-sm">
                  Transformando sonhos em realidade
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Testimonials */}
          <div className="flex flex-col gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-secondary border border-border rounded-xl p-8 relative"
              >
                <Quote
                  size={40}
                  className="absolute top-6 right-6 text-accent/30"
                />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={18} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-foreground/80 font-body leading-relaxed italic text-[15px]">
                  "{t.text}"
                </p>
                <div className="mt-6">
                  <p className="font-display text-foreground font-semibold">
                    {t.name}
                  </p>
                  <p className="text-muted-foreground text-sm font-body">
                    {t.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
