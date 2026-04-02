import { motion } from "framer-motion";
import { Mail, Phone, Send, MessageCircle, Upload } from "lucide-react";
import { useState } from "react";

const countries = [
  "Brasil", "Portugal", "Angola", "Moçambique", "Cabo Verde", "Argentina", "Colômbia",
  "México", "Chile", "Peru", "Venezuela", "Equador", "Uruguai", "Paraguai", "Bolívia",
  "Estados Unidos", "Canadá", "Alemanha", "França", "Espanha", "Itália", "Reino Unido",
  "Japão", "China", "Índia", "Austrália", "Outro"
];

const phoneCodes = [
  { code: "+55", flag: "🇧🇷", country: "BR" },
  { code: "+1", flag: "🇺🇸", country: "US" },
  { code: "+351", flag: "🇵🇹", country: "PT" },
  { code: "+244", flag: "🇦🇴", country: "AO" },
  { code: "+258", flag: "🇲🇿", country: "MZ" },
  { code: "+54", flag: "🇦🇷", country: "AR" },
  { code: "+57", flag: "🇨🇴", country: "CO" },
  { code: "+52", flag: "🇲🇽", country: "MX" },
  { code: "+56", flag: "🇨🇱", country: "CL" },
  { code: "+51", flag: "🇵🇪", country: "PE" },
  { code: "+49", flag: "🇩🇪", country: "DE" },
  { code: "+44", flag: "🇬🇧", country: "GB" },
  { code: "+61", flag: "🇦🇺", country: "AU" },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phoneCode: "+55", phone: "",
    nationality: "", migrateTo: "", education: "", experience: "",
    visa: "", message: "", privacy: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso! Entraremos em contato em até 24 horas.");
    setFormData({
      firstName: "", lastName: "", email: "", phoneCode: "+55", phone: "",
      nationality: "", migrateTo: "", education: "", experience: "",
      visa: "", message: "", privacy: false
    });
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body text-sm";
  const labelClass = "text-sm text-muted-foreground font-body mb-1.5 block";

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
              { icon: Phone, label: "Telefone", value: "+1 (771) 201-7117", href: "tel:+17712017117" },
              { icon: MessageCircle, label: "WhatsApp", value: "+1 (771) 201-7117", href: "https://wa.me/17712017117" },
              { icon: Mail, label: "E-mail", value: "Info@ebgreenusa.com", href: "mailto:Info@ebgreenusa.com" },
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
            {/* Nome / Sobrenome */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Primeiro Nome *</label>
                <input type="text" required value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className={inputClass} placeholder="Ex John" />
              </div>
              <div>
                <label className={labelClass}>Último Nome *</label>
                <input type="text" required value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className={inputClass} placeholder="Ex Doe" />
              </div>
            </div>

            {/* Email / Telefone */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Endereço de email *</label>
                <input type="email" required value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass} placeholder="john@doe.com" />
              </div>
              <div>
                <label className={labelClass}>Telefone *</label>
                <div className="flex gap-2">
                  <select value={formData.phoneCode}
                    onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                    className="w-24 px-2 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body text-sm">
                    {phoneCodes.map((p) => (
                      <option key={p.code} value={p.code}>{p.flag} {p.code}</option>
                    ))}
                  </select>
                  <input type="tel" value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`${inputClass} flex-1`} placeholder="300 400 5000" />
                </div>
              </div>
            </div>

            {/* Nacionalidade / Migrar para */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Qual sua nacionalidade? *</label>
                <select required value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className={inputClass}>
                  <option value="">Selecione...</option>
                  {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Migrar para *</label>
                <select required value={formData.migrateTo}
                  onChange={(e) => setFormData({ ...formData, migrateTo: e.target.value })}
                  className={inputClass}>
                  <option value="">Selecione...</option>
                  <option value="estados-unidos">Estados Unidos</option>
                  <option value="canada">Canadá</option>
                  <option value="europa">Europa</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>

            {/* Formação / Experiência */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Formação Acadêmica *</label>
                <select required value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className={inputClass}>
                  <option value="">Selecione...</option>
                  <option value="ensino-medio">Ensino Médio</option>
                  <option value="tecnico">Técnico</option>
                  <option value="tecnologo">Tecnólogo</option>
                  <option value="superior">Nível superior/Bacharelado</option>
                  <option value="pos-graduacao">Pós Graduação</option>
                  <option value="mestrado">Mestrado</option>
                  <option value="doutorado">Doutorado</option>
                  <option value="pos-doutorado">Pós Doutorado</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Anos de Experiência Profissional *</label>
                <select required value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className={inputClass}>
                  <option value="">Selecione...</option>
                  <option value="menos-5">Menos de 5 anos</option>
                  <option value="5-10">De 5 a 10 anos</option>
                  <option value="mais-10">Mais de 10 anos</option>
                </select>
              </div>
            </div>

            {/* Tipo de Visto / Currículo */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Tipo de Visto</label>
                <select value={formData.visa}
                  onChange={(e) => setFormData({ ...formData, visa: e.target.value })}
                  className={inputClass}>
                  <option value="">Selecione...</option>
                  <option value="eb1a">EB-1A</option>
                  <option value="eb2-niw">EB-2 NIW</option>
                  <option value="eb3">EB-3</option>
                  <option value="eb4">EB-4</option>
                  <option value="eb5">EB-5</option>
                  <option value="cr1">CR-1</option>
                  <option value="e2">E-2</option>
                  <option value="f1-f2">F-1/F-2</option>
                  <option value="l1a">L-1A</option>
                  <option value="k1">K-1</option>
                  <option value="o1">O-1</option>
                  <option value="r1">R-1</option>
                  <option value="family-based">Family-Based</option>
                  <option value="aos">AOS</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Envie seu currículo</label>
                <label className="flex items-center gap-2 px-4 py-3 rounded-lg border border-input bg-accent cursor-pointer hover:bg-accent/80 transition-colors">
                  <Upload size={18} className="text-foreground shrink-0" />
                  <span className="text-sm font-body text-foreground font-semibold">Selecione Arquivo</span>
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) alert(`Arquivo "${file.name}" selecionado.`);
                    }} />
                </label>
              </div>
            </div>

            {/* Mensagem */}
            <div>
              <label className={labelClass}>Mensagem</label>
              <textarea rows={4} value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder="Fale mais sobre você e seu desejo de imigrar." />
            </div>

            {/* Privacy */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" required checked={formData.privacy}
                onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                className="w-4 h-4 rounded border-input accent-accent" />
              <span className="text-sm text-muted-foreground font-body">
                Eu concordo com a Política de Privacidade.
              </span>
            </label>

            <button type="submit"
              className="w-full bg-gradient-gold text-green-deep px-6 py-4 rounded-lg font-bold text-lg font-body hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2">
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
