import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contato" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-3">Fale Conosco</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Entre em Contato
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Agende uma consulta gratuita e descubra como podemos ajudá-lo.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            {[
              { icon: Phone, label: "Telefone", value: "+1 (555) 123-4567" },
              { icon: Mail, label: "E-mail", value: "contato@ebgreen.com" },
              { icon: MapPin, label: "Endereço", value: "Miami, FL — Estados Unidos" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="text-primary" size={22} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-body">{item.label}</p>
                  <p className="text-foreground font-semibold">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="bg-primary rounded-xl p-6 mt-8">
              <p className="text-primary-foreground font-display text-lg font-semibold">Consulta Gratuita</p>
              <p className="text-primary-foreground/70 text-sm mt-2 font-body">
                Oferecemos uma avaliação inicial sem custo para analisar o seu caso e identificar as melhores opções.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-card rounded-xl p-8 border border-border space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-muted-foreground font-body mb-1.5 block">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground font-body mb-1.5 block">E-mail</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1.5 block">Telefone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
                placeholder="+55 (11) 99999-9999"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1.5 block">Mensagem</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body resize-none"
                placeholder="Descreva brevemente como podemos ajudá-lo..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent text-accent-foreground px-6 py-3.5 rounded-md font-semibold text-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
            >
              Enviar Mensagem
              <Send size={18} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
