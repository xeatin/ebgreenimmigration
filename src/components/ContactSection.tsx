import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", visa: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso! Entraremos em contato em até 24 horas.");
    setFormData({ name: "", email: "", phone: "", visa: "", message: "" });
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
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3 font-semibold">Fale Conosco</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Agende sua consulta gratuita
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg font-body">
            Preencha o formulário e descubra as possibilidades para a sua jornada nos EUA.
          </p>
          <div className="w-16 h-1 bg-gradient-gold mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: Phone, label: "Telefone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
              { icon: MessageCircle, label: "WhatsApp", value: "+1 (555) 123-4567", href: "https://wa.me/15551234567" },
              { icon: Mail, label: "E-mail", value: "contato@ebgreen.com", href: "mailto:contato@ebgreen.com" },
              { icon: MapPin, label: "Orlando, FL", value: "Estados Unidos", href: "#" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <item.icon className="text-primary group-hover:text-primary-foreground transition-colors" size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-body">{item.label}</p>
                  <p className="text-foreground font-semibold font-body group-hover:text-gold transition-colors">{item.value}</p>
                </div>
              </a>
            ))}

            <div className="bg-primary rounded-xl p-6 mt-4">
              <p className="text-primary-foreground font-display text-lg font-semibold">Consulta 100% Gratuita</p>
              <p className="text-primary-foreground/70 text-sm mt-2 font-body leading-relaxed">
                Avaliação inicial sem compromisso. Analisamos seu perfil e apresentamos 
                as melhores opções para o seu caso.
              </p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-card rounded-xl p-8 border border-border shadow-lg space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-muted-foreground font-body mb-1.5 block">Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground font-body mb-1.5 block">E-mail *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-muted-foreground font-body mb-1.5 block">Telefone / WhatsApp</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
                  placeholder="+55 (11) 99999-9999"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground font-body mb-1.5 block">Tipo de Visto</label>
                <select
                  value={formData.visa}
                  onChange={(e) => setFormData({ ...formData, visa: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
                >
                  <option value="">Selecione...</option>
                  <option value="eb2-niw">EB-2 NIW</option>
                  <option value="eb5">EB-5 (Investidor)</option>
                  <option value="h1b">H-1B (Trabalho)</option>
                  <option value="e2">E-2 (Investidor)</option>
                  <option value="f1">F-1 (Estudante)</option>
                  <option value="familiar">Green Card Familiar</option>
                  <option value="outro">Outro / Não sei</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1.5 block">Mensagem *</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body resize-none"
                placeholder="Conte-nos brevemente sobre seus objetivos e situação atual..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-gold text-green-deep px-6 py-4 rounded-lg font-bold text-lg font-body hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
            >
              Enviar Mensagem
              <Send size={18} />
            </button>
            <p className="text-center text-xs text-muted-foreground font-body">
              Ao enviar, você concorda com nossa política de privacidade.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
