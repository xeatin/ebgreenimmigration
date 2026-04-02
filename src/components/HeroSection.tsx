import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Profissionais em aeroporto internacional" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-t from-green-deep via-green-deep/80 to-green-deep/40" />
      </div>

      <div className="relative z-10 container mx-auto px-6 pb-20 pt-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-full px-4 py-2 mb-8"
          >
            <Shield size={14} className="text-gold" />
            <span className="text-cream/90 font-body text-sm">+92% de Taxa de Aprovação nos Processos</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-[1.1]"
          >
            Sua jornada para os{" "}
            <span className="text-gradient-gold">EUA</span>{" "}
            começa com quem entende
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-cream/70 text-lg md:text-xl max-w-xl font-body leading-relaxed"
          >
            Assessoria completa em Green Cards, Vistos de Trabalho, Investimento e 
            EB-2 NIW. Mais de 500 famílias realizaram o sonho americano com a Ebgreen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-green-deep px-8 py-4 rounded-md font-bold text-lg font-body hover:opacity-90 transition-opacity"
            >
              Iniciar Minha Jornada
              <ArrowRight size={20} />
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center gap-2 border border-cream/30 text-cream px-8 py-4 rounded-md font-semibold font-body hover:border-gold hover:text-gold transition-colors"
            >
              Explorar Serviços
            </a>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-cream/10 bg-cream/5 backdrop-blur-sm rounded-xl border border-cream/10 p-6 md:p-0"
        >
          {[
            { number: "500+", label: "Famílias Beneficiadas" },
            { number: "+98%", label: "Taxa de Sucesso" },
            { number: "15+", label: "Anos de Experiência" },
            { number: "2", label: "Escritórios nos EUA" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:py-6">
              <p className="font-display text-3xl md:text-4xl font-bold text-gold">{stat.number}</p>
              <p className="text-cream/50 text-sm mt-1 font-body">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
