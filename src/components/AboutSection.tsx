import { motion } from "framer-motion";
import { Shield, Globe, Languages, Users } from "lucide-react";
import teamImg from "@/assets/team.jpg";

const badges = [
  { icon: Languages, label: "Atendimento bilíngue (PT, EN, ES)" },
  { icon: Globe, label: "Presença nos EUA e Brasil" },
  { icon: Shield, label: "Compromisso com resultados" },
  { icon: Users, label: "Equipe multidisciplinar dedicada" },
];

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left – Team Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden">
              <img
                src={teamImg}
                alt="Equipe Ebgreen Immigration"
                className="w-full h-auto object-cover"
                loading="lazy"
                width={800}
                height={1000}
              />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-5 shadow-xl border border-border max-w-[220px]">
              <p className="font-display text-3xl font-bold text-gold">15+</p>
              <p className="text-muted-foreground text-sm font-body">
                Anos de experiência em mobilidade global e direito imigratório.
              </p>
            </div>
          </motion.div>

          {/* Right – Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3 font-semibold">
              Sobre a Ebgreen
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Excelência e inovação em{" "}
              <span className="text-gradient-gold">mobilidade global</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-gold mt-6 mb-8 rounded-full" />

            <p className="text-muted-foreground text-lg leading-relaxed font-body">
              A <strong className="text-foreground">Ebgreen Immigration</strong> é uma das mais respeitadas
              firmas de assessoria imigratória. Com anos de experiência, já ajudamos milhares de famílias a
              conquistarem o sonho de viver nos Estados Unidos.
            </p>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed font-body">
              Nossa equipe conta com advogados especializados e consultores dedicados que acompanham cada caso
              de perto, garantindo a melhor estratégia para o seu perfil.
            </p>

            {/* Highlight bullets */}
            <ul className="mt-8 space-y-3">
              {[
                "Atendimento bilíngue (Português, Inglês e Espanhol)",
                "Análise estratégica individual de cada caso",
                "Acompanhamento completo do início à aprovação",
                "Transparência em todas as etapas do processo",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Shield className="text-gold shrink-0 mt-0.5" size={18} />
                  <span className="text-foreground font-body text-sm">{item}</span>
                </li>
              ))}
            </ul>

            {/* Badge cards */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {badges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-4 shadow-sm"
                >
                  <Icon className="text-gold shrink-0" size={22} />
                  <span className="text-foreground font-body text-sm font-medium">{label}</span>
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
