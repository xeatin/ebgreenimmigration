import { motion } from "framer-motion";
import { FileText, Users, Briefcase, GraduationCap, Shield, Globe, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "EB-2 NIW",
    subtitle: "National Interest Waiver",
    description: "Green Card sem necessidade de oferta de emprego. Ideal para profissionais com habilidades excepcionais ou grau avançado.",
    highlight: true,
  },
  {
    icon: FileText,
    title: "Vistos de Trabalho",
    subtitle: "H-1B, L-1, O-1, TN",
    description: "Vistos para profissionais qualificados que desejam trabalhar legalmente nos Estados Unidos.",
  },
  {
    icon: Users,
    title: "Green Card Familiar",
    subtitle: "Reunificação Familiar",
    description: "Petições através de cônjuges, filhos e familiares cidadãos americanos ou residentes permanentes.",
  },
  {
    icon: Briefcase,
    title: "Vistos de Investidor",
    subtitle: "EB-5, E-2",
    description: "Caminhos para empreendedores e investidores que desejam abrir ou adquirir negócios nos EUA.",
  },
  {
    icon: GraduationCap,
    title: "Vistos de Estudante",
    subtitle: "F-1, J-1, M-1",
    description: "Acesso às melhores universidades americanas com planejamento estratégico de imigração.",
  },
  {
    icon: Globe,
    title: "Consultoria Completa",
    subtitle: "Avaliação de Perfil",
    description: "Análise personalizada para identificar o melhor caminho migratório para o seu caso específico.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3 font-semibold">Nossos Serviços</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-cream">
            Soluções completas para cada perfil
          </h2>
          <p className="mt-4 text-cream/60 max-w-2xl mx-auto text-lg font-body">
            Da avaliação inicial à aprovação final, oferecemos acompanhamento em todas as etapas.
          </p>
          <div className="w-16 h-1 bg-gradient-gold mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative p-8 rounded-xl border transition-all group cursor-pointer hover:-translate-y-1 ${
                service.highlight
                  ? "bg-gold/10 border-gold/30 hover:border-gold/60"
                  : "bg-cream/5 border-cream/10 hover:border-gold/30"
              }`}
            >
              {service.highlight && (
                <div className="absolute -top-3 left-6 bg-gradient-gold text-green-deep text-xs font-bold font-body px-3 py-1 rounded-full">
                  MAIS PROCURADO
                </div>
              )}
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  service.highlight ? "bg-gold/20" : "bg-cream/10"
                }`}>
                  <service.icon className={service.highlight ? "text-gold" : "text-cream/70"} size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold text-cream">{service.title}</h3>
                  <p className="text-gold/80 text-sm font-body mt-0.5">{service.subtitle}</p>
                </div>
              </div>
              <p className="text-cream/60 font-body mt-4 leading-relaxed text-sm">{service.description}</p>
              <div className="mt-4 flex items-center gap-1 text-gold text-sm font-semibold font-body opacity-0 group-hover:opacity-100 transition-opacity">
                Saiba mais <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
