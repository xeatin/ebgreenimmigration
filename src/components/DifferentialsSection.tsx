import { motion } from "framer-motion";
import { Award, Users, Scale, Clock } from "lucide-react";

const differentials = [
  {
    icon: Award,
    stat: "+98%",
    title: "Taxa de Sucesso",
    description: "Uma das maiores taxas de aprovação do mercado de assessoria imigratória para os Estados Unidos.",
  },
  {
    icon: Users,
    stat: "500+",
    title: "Famílias Beneficiadas",
    description: "Centenas de famílias já conquistaram seu Green Card e realizaram o sonho de viver nos EUA.",
  },
  {
    icon: Scale,
    stat: "100%",
    title: "Parceria Jurídica",
    description: "Trabalhamos em parceria com advogados de imigração credenciados nos Estados Unidos.",
  },
  {
    icon: Clock,
    stat: "24/7",
    title: "Suporte Dedicado",
    description: "Acompanhamento em tempo real do seu processo, com equipe bilíngue disponível para você.",
  },
];

const DifferentialsSection = () => {
  return (
    <section id="diferenciais" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-light rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3 font-semibold">Diferenciais</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Nossos resultados falam por nós
          </h2>
          <div className="w-16 h-1 bg-gradient-gold mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentials.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                <item.icon className="text-primary group-hover:text-primary-foreground transition-colors" size={28} />
              </div>
              <p className="font-display text-4xl font-bold text-gold mb-2">{item.stat}</p>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
