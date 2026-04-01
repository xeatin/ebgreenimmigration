import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const highlights = [
  "Equipe bilíngue (Português e Inglês)",
  "Atendimento personalizado e humanizado",
  "Acompanhamento completo do processo",
  "Parceria com escritórios de advocacia nos EUA",
  "Transparência em todas as etapas",
  "Resultados comprovados há mais de 15 anos",
];

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-3">Quem Somos</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Mais de 15 anos transformando{" "}
              <span className="text-gradient-gold">sonhos em realidade</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              A Ebgreen Immigration nasceu da vontade de ajudar brasileiros e imigrantes
              de todo o mundo a conquistarem seu espaço nos Estados Unidos. Nossa equipe
              combina conhecimento jurídico profundo com um atendimento acolhedor e
              personalizado.
            </p>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Entendemos que cada caso é único, por isso criamos estratégias sob medida
              para garantir o melhor resultado possível em cada processo migratório.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary rounded-2xl p-10"
          >
            <h3 className="font-display text-2xl font-semibold text-primary-foreground mb-8">
              Por que escolher a Ebgreen?
            </h3>
            <div className="space-y-5">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="text-gold mt-0.5 shrink-0" size={20} />
                  <span className="text-primary-foreground/90 font-body">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
