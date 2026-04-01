import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import familyImage from "@/assets/family-flag.jpg";

const testimonials = [
  {
    name: "Ricardo & Ana Silva",
    category: "EB-2 NIW • Aprovado em 2024",
    text: "A equipe foi excepcional do início ao fim. Em menos de 12 meses tivemos nosso Green Card aprovado. O suporte fizeram toda a diferença.",
    rating: 5,
  },
  {
    name: "Mariana Costa",
    category: "H-1B • Profissional de TI",
    text: "Depois de anos tentando sozinha, decidi contratar a assessoria e foi a melhor decisão. Processo claro, transparente e rápido.",
    rating: 5,
  },
  {
    name: "Fernando Oliveira",
    category: "EB-5 • Investidor",
    text: "Precisava de uma equipe que entendesse o lado jurídico e empresarial. Superaram todas as expectativas. Recomendo sem hesitar.",
    rating: 5,
  },
  {
    name: "Camila & Pedro Almeida",
    category: "EB-1A • Aprovado em 2023",
    text: "Nosso caso era complexo, mas a equipe encontrou a melhor estratégia. Hoje vivemos nos EUA com tranquilidade e segurança.",
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight">
              Histórias de{" "}
              <em className="text-accent not-italic font-bold bg-gradient-to-r from-accent to-[hsl(38_60%_72%)] bg-clip-text text-transparent">
                quem realizou o sonho
              </em>
            </h2>
            <p className="text-muted-foreground font-body mt-4 leading-relaxed max-w-md">
              Milhares de famílias já conquistaram seu Green Card e uma nova vida no exterior. Conheça algumas dessas histórias.
            </p>

            <div className="mt-8 relative rounded-2xl overflow-hidden aspect-video max-h-[280px]">
              <img
                src={familyImage}
                alt="Família celebrando a aprovação do Green Card"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1280}
                height={640}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-display text-lg font-bold">
                  17.000+ famílias beneficiadas
                </p>
                <p className="text-white/70 font-body text-xs">
                  Transformando sonhos em realidade
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Testimonials */}
          <div className="flex flex-col gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-secondary border border-border rounded-xl px-6 py-5 relative"
              >
                <Quote
                  size={32}
                  className="absolute top-4 right-4 text-accent/20"
                />
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-foreground/80 font-body leading-relaxed italic text-sm">
                  "{t.text}"
                </p>
                <div className="mt-3">
                  <p className="font-display text-foreground font-semibold text-sm">
                    {t.name}
                  </p>
                  <p className="text-muted-foreground text-xs font-body">
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
