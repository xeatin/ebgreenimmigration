import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marcos e Juliana S.",
    location: "São Paulo → Orlando, FL",
    text: "A Ebgreen foi essencial em todo o nosso processo de EB-2 NIW. Em menos de 18 meses, recebemos nosso Green Card. O atendimento é impecável.",
    rating: 5,
  },
  {
    name: "Ana Carolina M.",
    location: "Rio de Janeiro → Miami, FL",
    text: "Profissionalismo do início ao fim. A equipe preparou toda a documentação com extremo cuidado e nos deu segurança em cada etapa do processo.",
    rating: 5,
  },
  {
    name: "Ricardo e Fernanda L.",
    location: "Belo Horizonte → New York, NY",
    text: "Já tínhamos tentado com outra assessoria e não deu certo. A Ebgreen identificou o problema, reformulou nosso caso e conseguimos a aprovação.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3 font-semibold">Depoimentos</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-cream">
            Quem confia na Ebgreen
          </h2>
          <div className="w-16 h-1 bg-gradient-gold mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-cream/5 border border-cream/10 rounded-xl p-8 hover:border-gold/30 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-cream/80 font-body leading-relaxed italic">"{t.text}"</p>
              <div className="mt-6 pt-4 border-t border-cream/10">
                <p className="font-display text-cream font-semibold">{t.name}</p>
                <p className="text-cream/50 text-sm font-body">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
