import { motion } from "framer-motion";
import { Mail, Send, Upload, Instagram, Phone, Clock, MapPin } from "lucide-react";
import PhoneCodeSelector from "./PhoneCodeSelector";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";





const ContactSection = () => {
  const { lang } = useLanguage();
  const s = translations.contact;

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phoneCode: "+55", phone: "",
    migrateTo: "", education: "", experience: "",
    visa: "", message: "", privacy: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t(s.successMsg, lang));
    setFormData({
      firstName: "", lastName: "", email: "", phoneCode: "+55", phone: "",
      migrateTo: "", education: "", experience: "",
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
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3 font-semibold">{t(s.sectionLabel, lang)}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            {t(s.sectionTitle1, lang)}
            <br />
            {t(s.sectionTitle2, lang)}{" "}
            <span className="text-gold">{t(s.sectionTitleHighlight, lang)}</span>
          </h2>
          <p className="mt-4 text-muted-foreground mx-auto text-lg font-body">{t(s.sectionSubtitle, lang)}</p>
          <div className="w-16 h-1 bg-gradient-gold mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-20 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {t(s.sidebarTitle1, lang)}{" "}
                  <span className="text-gold italic">{t(s.sidebarTitleHighlight, lang)}</span>
                </h3>
                <p className="mt-3 text-muted-foreground text-sm font-body leading-relaxed">
                  {t(s.sidebarSubtitle, lang)}
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Phone, label: "WHATSAPP", value: "+1 (771) 201-7117", href: "https://wa.me/17712017117" },
                  { icon: Mail, label: "E-MAIL", value: "info@ebgreenusa.com", href: "mailto:info@ebgreenusa.com" },
                  { icon: Instagram, label: "INSTAGRAM", value: "@ebgreenusa", href: "https://instagram.com/ebgreenusa" },
                  { icon: MapPin, label: t(s.officesLabel, lang), value: "EUA • Brasil • Europa", href: undefined },
                  { icon: Clock, label: t(s.hoursLabel, lang), value: t(s.hoursValue, lang), href: undefined },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl border border-gold/40 bg-gold/5 flex items-center justify-center shrink-0">
                      <item.icon className="text-gold" size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-body font-semibold tracking-[0.2em] uppercase">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-foreground font-semibold font-body text-sm hover:text-gold transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-semibold font-body text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
                <label className={labelClass}>{t(s.firstName, lang)}</label>
                <input type="text" required value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className={inputClass} placeholder="Ex John" />
              </div>
              <div>
                <label className={labelClass}>{t(s.lastName, lang)}</label>
                <input type="text" required value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className={inputClass} placeholder="Ex Doe" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>{t(s.emailLabel, lang)}</label>
                <input type="email" required value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass} placeholder="john@doe.com" />
              </div>
              <div>
                <label className={labelClass}>{t(s.phoneLabel, lang)}</label>
                <div className="flex items-center rounded-lg border border-input bg-background focus-within:ring-2 focus-within:ring-ring">
                  <PhoneCodeSelector
                    value={formData.phoneCode}
                    onChange={(val) => setFormData({ ...formData, phoneCode: val })}
                  />
                  <div className="w-px h-6 bg-input shrink-0" />
                  <span className="px-2 text-sm text-foreground font-body shrink-0">{formData.phoneCode}</span>
                  <input type="tel" value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 px-1 py-3 bg-transparent text-foreground focus:outline-none font-body text-sm" placeholder="300 400 5000" />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>{t(s.visaType, lang)}</label>
                <select value={formData.visa}
                  onChange={(e) => setFormData({ ...formData, visa: e.target.value })}
                  className={inputClass}>
                  <option value="">{t(s.select, lang)}</option>
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
                  <option value="outros">Outros</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>{t(s.education, lang)}</label>
                <select required value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className={inputClass}>
                  <option value="">{t(s.select, lang)}</option>
                  {Object.entries(s.educationOptions).map(([key, val]) => (
                    <option key={key} value={key}>{t(val, lang)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>{t(s.experience, lang)}</label>
                <select required value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className={inputClass}>
                  <option value="">{t(s.select, lang)}</option>
                  {Object.entries(s.experienceOptions).map(([key, val]) => (
                    <option key={key} value={key}>{t(val, lang)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>{t(s.resume, lang)}</label>
                <label className="flex items-center gap-2 px-4 py-3 rounded-lg border border-input bg-accent cursor-pointer hover:bg-accent/80 transition-colors">
                  <Upload size={18} className="text-foreground shrink-0" />
                  <span className="text-sm font-body text-foreground font-semibold">{t(s.selectFile, lang)}</span>
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) alert(`Arquivo "${file.name}" selecionado.`);
                    }} />
                </label>
              </div>
            </div>

            <div>
              <label className={labelClass}>{t(s.message, lang)}</label>
              <textarea rows={2} value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder={t(s.messagePlaceholder, lang)} />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" required checked={formData.privacy}
                onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                className="w-4 h-4 rounded border-input accent-accent" />
              <span className="text-sm text-muted-foreground font-body">{t(s.privacy, lang)}</span>
            </label>

            <button type="submit"
              className="w-full bg-gradient-gold text-green-deep px-6 py-4 rounded-lg font-bold text-lg font-body hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2">
              {t(s.submit, lang)}
              <Send size={18} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;