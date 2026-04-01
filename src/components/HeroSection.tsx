import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Skyline dos Estados Unidos" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-green-dark/70" />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-24 pb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-6"
        >
          Assessoria de Imigração nos EUA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-primary-foreground leading-tight max-w-4xl mx-auto"
        >
          Seu caminho para os{" "}
          <span className="text-gradient-gold">Estados Unidos</span>{" "}
          começa aqui
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto font-body leading-relaxed"
        >
          Assessoria especializada para vistos, green cards e processos migratórios.
          Transformamos o sonho americano em realidade com segurança e expertise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contato"
            className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-md font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Agende uma Consulta
            <ArrowRight size={20} />
          </a>
          <a
            href="#servicos"
            className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-md font-semibold text-lg hover:border-gold hover:text-gold transition-colors"
          >
            Nossos Serviços
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { number: "500+", label: "Famílias Atendidas" },
            { number: "98%", label: "Taxa de Aprovação" },
            { number: "15+", label: "Anos de Experiência" },
            { number: "24h", label: "Suporte Dedicado" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl md:text-4xl font-bold text-gold">{stat.number}</p>
              <p className="text-primary-foreground/60 text-sm mt-1 font-body">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
