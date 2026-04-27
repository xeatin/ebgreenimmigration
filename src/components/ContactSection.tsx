import { motion } from "framer-motion";
import { Mail, Send, Upload, Instagram, Clock, MapPin } from "lucide-react";

const WhatsAppIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

import PhoneCodeSelector from "./PhoneCodeSelector";
import { useState } from "react";
import { z } from "zod";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type FormErrors = Partial<Record<
  "firstName" | "lastName" | "email" | "phone" | "visa" | "education" | "experience" | "privacy" | "message",
  string
>>;

const ContactSection = () => {
  const { lang } = useLanguage();
  const { toast } = useToast();
  const s = translations.contact;

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phoneCode: "+55", phone: "",
    migrateTo: "", education: "", experience: "",
    visa: "", message: "", privacy: false
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // A regra de filtragem (ensino médio / técnico+menos de 5 anos)
  // agora é aplicada no servidor (edge function send-contact-email),
  // garantindo o mesmo comportamento para o formulário e o botão WhatsApp.

  const buildSchema = () =>
    z.object({
      firstName: z.string().trim().min(2, t(s.errors.firstNameMin, lang)).max(80),
      lastName: z.string().trim().min(2, t(s.errors.lastNameMin, lang)).max(80),
      email: z.string().trim().email(t(s.errors.emailInvalid, lang)).max(255),
      phone: z
        .string()
        .trim()
        .min(1, t(s.errors.required, lang))
        .refine((v) => /^\d{6,20}$/.test(v.replace(/\D/g, "")), {
          message: t(s.errors.phoneInvalid, lang),
        }),
      visa: z.string().min(1, t(s.errors.visaRequired, lang)),
      education: z.string().min(1, t(s.errors.educationRequired, lang)),
      experience: z.string().min(1, t(s.errors.experienceRequired, lang)),
      message: z.string().max(2000, t(s.errors.messageMax, lang)).optional().or(z.literal("")),
      privacy: z.literal(true, {
        errorMap: () => ({ message: t(s.errors.privacyRequired, lang) }),
      }),
    });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const schema = buildSchema();
    const parsed = schema.safeParse(formData);
    if (!parsed.success) {
      const f = parsed.error.flatten().fieldErrors;
      setErrors({
        firstName: f.firstName?.[0],
        lastName: f.lastName?.[0],
        email: f.email?.[0],
        phone: f.phone?.[0],
        visa: f.visa?.[0],
        education: f.education?.[0],
        experience: f.experience?.[0],
        message: f.message?.[0],
        privacy: f.privacy?.[0],
      });
      toast({
        title: t(s.validationTitle, lang),
        variant: "destructive",
      });
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      await supabase.functions.invoke('send-contact-email', {
        body: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneCode: formData.phoneCode,
          phone: formData.phone,
          visa: formData.visa,
          education: formData.education,
          experience: formData.experience,
          message: formData.message,
        },
      });
    } catch (err) {
      // silently fail - user should not notice
    }

    toast({
      title: t(s.successTitle, lang),
      description: t(s.successMsg, lang),
    });
    setFormData({
      firstName: "", lastName: "", email: "", phoneCode: "+55", phone: "",
      migrateTo: "", education: "", experience: "",
      visa: "", message: "", privacy: false
    });
    setIsSubmitting(false);
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body text-sm";
  const inputErrorClass = "border-destructive focus:ring-destructive";
  const labelClass = "text-sm text-muted-foreground font-body mb-1.5 block";
  const errorClass = "text-xs text-destructive font-body mt-1";

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
                  { icon: WhatsAppIcon, label: "WHATSAPP", value: "+1 (771) 201-7117", href: "https://wa.me/17712017117" },
                  { icon: Mail, label: "E-MAIL", value: "info@ebgreenusa.com", href: "mailto:info@ebgreenusa.com" },
                  { icon: Instagram, label: "INSTAGRAM", value: "@ebgreenusa", href: "https://instagram.com/ebgreenusa" },
                  { icon: MapPin, label: t(s.officesLabel, lang), value: t(s.officesValue, lang), href: undefined },
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
            noValidate
            className="lg:col-span-3 bg-card rounded-xl p-8 border border-border shadow-lg space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="firstName">{t(s.firstName, lang)}</label>
                <input id="firstName" type="text" value={formData.firstName}
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? "firstName-err" : undefined}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className={`${inputClass} ${errors.firstName ? inputErrorClass : ""}`} placeholder="Ex John" />
                {errors.firstName && <p id="firstName-err" className={errorClass}>{errors.firstName}</p>}
              </div>
              <div>
                <label className={labelClass} htmlFor="lastName">{t(s.lastName, lang)}</label>
                <input id="lastName" type="text" value={formData.lastName}
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? "lastName-err" : undefined}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className={`${inputClass} ${errors.lastName ? inputErrorClass : ""}`} placeholder="Ex Doe" />
                {errors.lastName && <p id="lastName-err" className={errorClass}>{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="email">{t(s.emailLabel, lang)}</label>
                <input id="email" type="email" value={formData.email}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-err" : undefined}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`${inputClass} ${errors.email ? inputErrorClass : ""}`} placeholder="john@doe.com" />
                {errors.email && <p id="email-err" className={errorClass}>{errors.email}</p>}
              </div>
              <div>
                <label className={labelClass}>{t(s.phoneLabel, lang)}</label>
                <div className={`flex items-center rounded-lg border bg-background focus-within:ring-2 focus-within:ring-ring ${errors.phone ? "border-destructive focus-within:ring-destructive" : "border-input"}`}>
                  <PhoneCodeSelector
                    value={formData.phoneCode}
                    onChange={(val) => setFormData({ ...formData, phoneCode: val })}
                  />
                  <div className="w-px h-6 bg-input shrink-0" />
                  <span className="px-2 text-sm text-foreground font-body shrink-0">{formData.phoneCode}</span>
                  <input type="tel" value={formData.phone}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-err" : undefined}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 px-1 py-3 bg-transparent text-foreground focus:outline-none font-body text-sm" placeholder="300 400 5000" />
                </div>
                {errors.phone && <p id="phone-err" className={errorClass}>{errors.phone}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="visa">{t(s.visaType, lang)} *</label>
                <select id="visa" value={formData.visa}
                  aria-invalid={!!errors.visa}
                  aria-describedby={errors.visa ? "visa-err" : undefined}
                  onChange={(e) => setFormData({ ...formData, visa: e.target.value })}
                  className={`${inputClass} ${errors.visa ? inputErrorClass : ""}`}>
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
                {errors.visa && <p id="visa-err" className={errorClass}>{errors.visa}</p>}
              </div>
              <div>
                <label className={labelClass} htmlFor="education">{t(s.education, lang)}</label>
                <select id="education" value={formData.education}
                  aria-invalid={!!errors.education}
                  aria-describedby={errors.education ? "education-err" : undefined}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className={`${inputClass} ${errors.education ? inputErrorClass : ""}`}>
                  <option value="">{t(s.select, lang)}</option>
                  {Object.entries(s.educationOptions).map(([key, val]) => (
                    <option key={key} value={key}>{t(val, lang)}</option>
                  ))}
                </select>
                {errors.education && <p id="education-err" className={errorClass}>{errors.education}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="experience">{t(s.experience, lang)}</label>
                <select id="experience" value={formData.experience}
                  aria-invalid={!!errors.experience}
                  aria-describedby={errors.experience ? "experience-err" : undefined}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className={`${inputClass} ${errors.experience ? inputErrorClass : ""}`}>
                  <option value="">{t(s.select, lang)}</option>
                  {Object.entries(s.experienceOptions).map(([key, val]) => (
                    <option key={key} value={key}>{t(val, lang)}</option>
                  ))}
                </select>
                {errors.experience && <p id="experience-err" className={errorClass}>{errors.experience}</p>}
              </div>
              <div>
                <label className={labelClass}>{t(s.resume, lang)}</label>
                <label className="flex items-center gap-2 px-4 py-3 rounded-lg border border-input bg-accent cursor-pointer hover:bg-accent/80 transition-colors">
                  <Upload size={18} className="text-foreground shrink-0" />
                  <span className="text-sm font-body text-foreground font-semibold">{t(s.selectFile, lang)}</span>
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) toast({ title: file.name });
                    }} />
                </label>
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="message">{t(s.message, lang)}</label>
              <textarea id="message" rows={2} value={formData.message}
                maxLength={2000}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-err" : undefined}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${inputClass} resize-none ${errors.message ? inputErrorClass : ""}`}
                placeholder={t(s.messagePlaceholder, lang)} />
              {errors.message && <p id="message-err" className={errorClass}>{errors.message}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.privacy}
                  aria-invalid={!!errors.privacy}
                  onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                  className="w-4 h-4 rounded border-input accent-accent" />
                <span className="text-sm text-muted-foreground font-body">{t(s.privacy, lang)}</span>
              </label>
              {errors.privacy && <p className={errorClass}>{errors.privacy}</p>}
            </div>

            <button type="submit" disabled={isSubmitting}
              className="w-full bg-gradient-gold text-green-deep px-6 py-4 rounded-lg font-bold text-lg font-body hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 disabled:opacity-60">
              {isSubmitting ? t(s.submitting, lang) : t(s.submit, lang)}
              {!isSubmitting && <Send size={18} />}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;