import { motion } from "framer-motion";
import { FileText, Users, Briefcase, GraduationCap, Shield, Globe } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Vistos de Trabalho",
    description: "H-1B, L-1, O-1 e outros vistos de trabalho para profissionais qualificados que desejam atuar nos EUA.",
  },
  {
    icon: Users,
    title: "Green Card Familiar",
    description: "Reunificação familiar através de petições de cônjuges, filhos e outros familiares cidadãos americanos.",
  },
  {
    icon: Briefcase,
    title: "Vistos de Investidor",
    description: "EB-5, E-2 e vistos para empreendedores e investidores que querem abrir negócios nos Estados Unidos.",
  },
  {
    icon: GraduationCap,
    title: "Vistos de Estudante",
    description: "F-1, J-1 e vistos acadêmicos para estudantes que buscam educação de qualidade nas universidades americanas.",
  },
  {
    icon: Shield,
    title: "Cidadania Americana",
    description: "Assessoria completa no processo de naturalização, desde a elegibilidade até a cerimônia de juramento.",
  },
  {
    icon: Globe,
    title: "Consultoria Migratória",
    description: "Avaliação personalizada do seu perfil para encontrar o melhor caminho imigratório para sua situação.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-3">O Que Fazemos</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Nossos Serviços
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Oferecemos soluções completas para cada etapa do seu processo de imigração.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-8 rounded-lg border border-border hover:border-accent/50 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <service.icon className="text-primary group-hover:text-accent transition-colors" size={24} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
