import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import founderImg from "@/assets/founder.jpg";

const highlights = [
  "Equipe bilíngue (Português, Espanhol e Inglês)",
  "Parceria com advogados credenciados nos EUA",
  "Escritórios em Orlando e Miami, FL",
  "Atendimento personalizado e humanizado",
  "Acompanhamento de cada etapa do processo",
  "Transparência total — sem surpresas",
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
            <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3 font-semibold">Quem Somos</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Inovação e excelência em{" "}
              <span className="text-gradient-gold">mobilidade global</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-gold mt-6 mb-8 rounded-full" />
            
            <p className="text-muted-foreground text-lg leading-relaxed font-body">
              A <strong className="text-foreground">Ebgreen Immigration</strong> é uma assessoria imigratória
              com sede nos Estados Unidos, especializada em ajudar famílias e 
              profissionais a conquistarem seu espaço no território americano.
            </p>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed font-body">
              Com mais de 15 anos de experiência, nossa equipe combina conhecimento 
              jurídico profundo com um olhar estratégico para cada caso, garantindo 
              o melhor caminho para o seu sucesso migratório.
            </p>

            <div className="mt-8 space-y-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-gold shrink-0" size={18} />
                  <span className="text-foreground font-body text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={founderImg}
                alt="Fundador da Ebgreen Immigration"
                className="w-full h-auto object-cover"
                loading="lazy"
                width={800}
                height={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-deep/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="font-display text-2xl font-bold text-cream">Liderança Estratégica</p>
                <p className="text-cream/70 font-body text-sm mt-1">
                  Nossa equipe é formada por especialistas com experiência direta 
                  em processos migratórios junto ao USCIS.
                </p>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-5 shadow-xl border border-border max-w-[200px]">
              <p className="font-display text-3xl font-bold text-gold">15+</p>
              <p className="text-muted-foreground text-sm font-body">Anos de experiência em imigração americana</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
