import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Avaliação de Perfil", desc: "Análise completa da sua elegibilidade e melhor estratégia migratória." },
  { num: "02", title: "Planejamento Estratégico", desc: "Definição do caminho ideal com cronograma e expectativas claras." },
  { num: "03", title: "Documentação", desc: "Preparação e revisão criteriosa de toda documentação necessária." },
  { num: "04", title: "Petição & Apresentação", desc: "Submissão oficial ao USCIS com acompanhamento dedicado." },
  { num: "05", title: "Entrevista Consular", desc: "Preparação completa para entrevista, incluindo simulações." },
  { num: "06", title: "Aprovação", desc: "Visto aprovado! Suporte contínuo na sua chegada aos EUA." },
];

const ProcessSection = () => {
  return (
    <section id="processo" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3 font-semibold">Processo</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Como funciona
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg font-body">
            Um processo claro, transparente e com acompanhamento em cada etapa.
          </p>
          <div className="w-16 h-1 bg-gradient-gold mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="flex items-start gap-4">
                <span className="font-display text-5xl font-bold text-gold/20 leading-none">{step.num}</span>
                <div className="pt-2">
                  <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed">{step.desc}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -bottom-4 left-8 w-px h-8 bg-border" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="#contato"
            className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-green-deep px-8 py-4 rounded-md font-bold text-lg font-body hover:opacity-90 transition-opacity"
          >
            Comece Sua Jornada Agora
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
