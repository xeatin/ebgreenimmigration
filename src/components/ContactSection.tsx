import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Instagram, Clock, MapPin, Lock, ChevronDown, ArrowRight, Check } from "lucide-react";

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
import ebgreenLogo from "@/assets/ebgreen-logo.svg";

type FormErrors = Partial<Record<
  "firstName" | "lastName" | "email" | "phone" | "visa" | "education" | "achievements" |
  "experience" | "countryOfBirth" | "timeline" | "privacy" | "message",
  string
>>;

const VISA_OPTIONS = [
  { id: "eb1a-o1", label: "EB-1A / O-1", desc: "Habilidade extraordinária" },
  { id: "eb2-niw", label: "EB-2 NIW", desc: "Interesse nacional" },
  { id: "eb3", label: "EB-3", desc: "Profissional qualificado" },
  { id: "eb5-e2", label: "EB-5 / E-2", desc: "Investidor" },
  { id: "h1b-l1-others", label: "H-1B / L-1 / Outros", desc: "Trabalho temporário" },
  { id: "f1", label: "F-1", desc: "Estudante" },
  { id: "family-based", label: "Family-Based", desc: "Reunificação familiar" },
  { id: "r1", label: "R-1", desc: "Religioso" },
  { id: "nao-sei", label: "Não sei ainda", desc: "Quero orientação" },
];

const EDUCATION_OPTIONS = [
  "Ensino Médio",
  "Técnico e Tecnólogo",
  "Nível Superior / Bacharelado",
  "Pós-Graduação",
  "Mestrado",
  "Doutorado",
  "Pós-Doutorado",
];

const ACHIEVEMENTS_OPTIONS = [
  "Sim — publicações",
  "Sim — prêmios",
  "Sim — ambos",
  "Não, mas tenho evidências",
  "Ainda não",
];

const EXPERIENCE_OPTIONS = [
  "Menos de 5 anos",
  "De 5 a 10 anos",
  "Mais de 10 anos",
];

const COUNTRY_GROUPS: { continent: string; countries: string[] }[] = [
  {
    continent: "América do Sul",
    countries: ["Brasil", "Argentina", "Chile", "Colômbia", "Equador", "Paraguai", "Peru", "Uruguai", "Venezuela", "Bolívia"],
  },
  {
    continent: "América do Norte e Central",
    countries: ["Estados Unidos", "Canadá", "México", "Costa Rica", "Cuba", "Panamá", "República Dominicana"],
  },
  {
    continent: "Europa",
    countries: ["Portugal", "Espanha", "Itália", "França", "Alemanha", "Reino Unido", "Irlanda", "Suíça", "Países Baixos", "Bélgica"],
  },
  {
    continent: "África",
    countries: ["Angola", "Moçambique", "Cabo Verde", "África do Sul", "Nigéria", "Egito", "Marrocos"],
  },
  {
    continent: "Ásia",
    countries: ["China", "Índia", "Japão", "Coreia do Sul", "Filipinas", "Vietnã", "Tailândia", "Israel"],
  },
  {
    continent: "Oceania",
    countries: ["Austrália", "Nova Zelândia"],
  },
];

const CURRENT_STATUS_OPTIONS = [
  "Visto de Turista (B1/B2)",
  "Estudante (F1/F2)",
  "Green Card em processo",
  "Outros",
];

const TIMELINE_OPTIONS = [
  "O quanto antes",
  "Em breve (1–3 meses)",
  "Planejando (3–12 meses)",
  "Ainda explorando",
];

const STEPS = [
  { n: 1, label: "Objetivo" },
  { n: 2, label: "Perfil" },
  { n: 3, label: "Contato" },
  { n: 4, label: "Análise" },
];

const ContactSection = () => {
  const { lang } = useLanguage();
  const { toast } = useToast();
  const s = translations.contact;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phoneCode: "+55", phone: "",
    visa: "",
    education: "", achievements: "", experience: "", countryOfBirth: "",
    message: "", currentStatus: "", timeline: "",
    privacy: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(true);

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

  const validateStep = (current: number): boolean => {
    const e: FormErrors = {};
    if (current === 1) {
      if (!formData.visa) e.visa = t(s.errors.visaRequired, lang);
    }
    if (current === 2) {
      if (!formData.education) e.education = t(s.errors.educationRequired, lang);
      if (!formData.achievements) e.achievements = t(s.errors.required, lang);
      if (!formData.experience) e.experience = t(s.errors.experienceRequired, lang);
      if (!formData.countryOfBirth) e.countryOfBirth = t(s.errors.required, lang);
    }
    if (current === 3) {
      if (formData.firstName.trim().length < 2) e.firstName = t(s.errors.firstNameMin, lang);
      if (formData.lastName.trim().length < 2) e.lastName = t(s.errors.lastNameMin, lang);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) e.email = t(s.errors.emailInvalid, lang);
      if (!/^\d{6,20}$/.test(formData.phone.replace(/\D/g, ""))) e.phone = t(s.errors.phoneInvalid, lang);
    }
    if (current === 4) {
      if (!formData.timeline) e.message = t(s.errors.required, lang);
      if (!formData.privacy) e.privacy = t(s.errors.privacyRequired, lang);
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(step)) {
      toast({ title: t(s.validationTitle, lang), variant: "destructive" });
      return;
    }
    setErrors({});
    setStep((p) => Math.min(4, p + 1));
  };

  const handleBack = () => {
    setErrors({});
    setStep((p) => Math.max(1, p - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(4)) {
      toast({ title: t(s.validationTitle, lang), variant: "destructive" });
      return;
    }

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
      toast({ title: t(s.validationTitle, lang), variant: "destructive" });
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    const composedMessage = [
      formData.message,
      formData.countryOfBirth ? `País de nascimento: ${formData.countryOfBirth}` : "",
      formData.achievements ? `Publicações/Prêmios: ${formData.achievements}` : "",
      formData.currentStatus ? `Status atual: ${formData.currentStatus}` : "",
      formData.timeline ? `Quando pretende iniciar: ${formData.timeline}` : "",
    ].filter(Boolean).join("\n");

    fetch('https://n8n.srv1283251.hstgr.cloud/webhook/website-form-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'website-main-form',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneCode: formData.phoneCode,
        phone: formData.phone,
        visa: formData.visa,
        education: formData.education,
        experience: formData.experience,
        message: composedMessage,
      }),
    }).catch(() => {});

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          source: "website-main-form",
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneCode: formData.phoneCode,
          phone: formData.phone,
          visa: formData.visa,
          education: formData.education,
          experience: formData.experience,
          message: composedMessage,
        },
      });

      if (error || data?.success === false) {
        throw error || new Error(data?.error || "Erro ao enviar lead");
      }
    } catch (err) {
      toast({
        title: t(s.validationTitle, lang),
        description: "Não foi possível enviar o lead. Tente novamente.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    toast({
      title: t(s.successTitle, lang),
      description: t(s.successMsg, lang),
    });
    setFormData({
      firstName: "", lastName: "", email: "", phoneCode: "+55", phone: "",
      visa: "",
      education: "", achievements: "", experience: "", countryOfBirth: "",
      message: "", currentStatus: "", timeline: "",
      privacy: false,
    });
    setStep(1);
    setIsSubmitting(false);
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body text-sm";
  const inputErrorClass = "border-destructive focus:ring-destructive";
  const labelClass = "text-sm text-muted-foreground font-body mb-1.5 block";
  const errorClass = "text-xs text-destructive font-body mt-1";

  /* ---------- Reusable building blocks ---------- */

  const ChoiceCard = ({
    selected, onClick, title, desc, className = "",
  }: { selected: boolean; onClick: () => void; title: string; desc?: string; className?: string }) => (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-left p-4 rounded-xl border transition-all font-body ${
        selected
          ? "border-gold bg-gold/10 shadow-md"
          : "border-border bg-background hover:border-gold/50 hover:bg-gold/5"
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-sm font-semibold text-foreground">{title}</p>
          {desc && <p className="text-xs text-muted-foreground mt-1">{desc}</p>}
        </div>
        {selected && (
          <span className="w-5 h-5 shrink-0 rounded-full bg-gold flex items-center justify-center">
            <Check size={12} className="text-green-deep" strokeWidth={3} />
          </span>
        )}
      </div>
    </button>
  );

  const SelectField = ({
    id, label, value, onChange, options, error, placeholder = "Selecione",
  }: {
    id: string; label: string; value: string; onChange: (v: string) => void;
    options: string[] | { group: string; items: string[] }[]; error?: string; placeholder?: string;
  }) => {
    const isGrouped = Array.isArray(options) && options.length > 0 && typeof options[0] !== "string";
    return (
      <div>
        <label className={labelClass} htmlFor={id}>{label}</label>
        <select
          id={id} value={value} onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} ${error ? inputErrorClass : ""}`}
        >
          <option value="">{placeholder}</option>
          {isGrouped
            ? (options as { group: string; items: string[] }[]).map((g) => (
                <optgroup key={g.group} label={g.group}>
                  {g.items.map((it) => <option key={it} value={it}>{it}</option>)}
                </optgroup>
              ))
            : (options as string[]).map((it) => <option key={it} value={it}>{it}</option>)}
        </select>
        {error && <p className={errorClass}>{error}</p>}
      </div>
    );
  };

  /* ---------- Steps ---------- */

  const Step1 = (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-2xl font-bold text-foreground">
          Pronto para iniciar sua <span className="text-gold italic">avaliação?</span>
        </h3>
        <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
          Responda algumas perguntas rápidas e receba uma análise preliminar do seu perfil, com orientação clara sobre os caminhos migratórios mais adequados e os próximos passos.
        </p>
      </div>

      <div>
        <p className={labelClass}>Qual visto mais se aproxima do seu objetivo? *</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {VISA_OPTIONS.slice(0, 7).map((v) => (
            <ChoiceCard
              key={v.id}
              selected={formData.visa === v.id}
              onClick={() => setFormData({ ...formData, visa: v.id })}
              title={v.label}
              desc={v.desc}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
          <ChoiceCard
            selected={formData.visa === "r1"}
            onClick={() => setFormData({ ...formData, visa: "r1" })}
            title="R-1"
            desc="Religioso"
            className="md:col-span-2"
          />
          <ChoiceCard
            selected={formData.visa === "nao-sei"}
            onClick={() => setFormData({ ...formData, visa: "nao-sei" })}
            title="Não sei ainda"
            desc="Quero orientação"
            className="md:col-span-2"
          />
        </div>
        {errors.visa && <p className={errorClass}>{errors.visa}</p>}
      </div>
    </div>
  );

  const Step2 = (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-2xl font-bold text-foreground">
          Conte-nos sobre seu <span className="text-gold italic">perfil</span>
        </h3>
        <p className="mt-2 text-sm text-muted-foreground font-body">
          Essas informações nos ajudam a identificar os caminhos migratórios mais adequados.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <SelectField
          id="education" label="Escolaridade *" value={formData.education}
          onChange={(v) => setFormData({ ...formData, education: v })}
          options={EDUCATION_OPTIONS} error={errors.education}
        />
        <SelectField
          id="experience" label="Experiência profissional *" value={formData.experience}
          onChange={(v) => setFormData({ ...formData, experience: v })}
          options={EXPERIENCE_OPTIONS} error={errors.experience}
        />
      </div>

      <SelectField
        id="achievements" label="Possui publicações ou prêmios na sua área? *"
        value={formData.achievements}
        onChange={(v) => setFormData({ ...formData, achievements: v })}
        options={ACHIEVEMENTS_OPTIONS} error={errors.achievements}
      />

      <SelectField
        id="countryOfBirth" label="País de nascimento *"
        value={formData.countryOfBirth}
        onChange={(v) => setFormData({ ...formData, countryOfBirth: v })}
        options={COUNTRY_GROUPS.map((g) => ({ group: g.continent, items: g.countries }))}
        error={errors.countryOfBirth}
        placeholder="Selecione seu país"
      />
    </div>
  );

  const Step3 = (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-2xl font-bold text-foreground">
          Seus <span className="text-gold italic">dados de contato</span>
        </h3>
        <p className="mt-2 text-sm text-muted-foreground font-body">
          Usaremos para enviar sua análise preliminar e dar continuidade ao atendimento.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="firstName">Nome *</label>
          <input id="firstName" type="text" value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className={`${inputClass} ${errors.firstName ? inputErrorClass : ""}`} placeholder="Ex.: João" />
          {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="lastName">Sobrenome *</label>
          <input id="lastName" type="text" value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className={`${inputClass} ${errors.lastName ? inputErrorClass : ""}`} placeholder="Ex.: Silva" />
          {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="email">E-mail *</label>
          <input id="email" type="email" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`${inputClass} ${errors.email ? inputErrorClass : ""}`} placeholder="voce@email.com" />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>
        <div>
          <label className={labelClass}>Telefone *</label>
          <div className={`flex items-center rounded-lg border bg-background focus-within:ring-2 focus-within:ring-ring ${errors.phone ? "border-destructive focus-within:ring-destructive" : "border-input"}`}>
            <PhoneCodeSelector
              value={formData.phoneCode}
              onChange={(val) => setFormData({ ...formData, phoneCode: val })}
            />
            <div className="w-px h-6 bg-input shrink-0" />
            <span className="px-2 text-sm text-foreground font-body shrink-0">{formData.phoneCode}</span>
            <input type="tel" value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="flex-1 px-1 py-3 bg-transparent text-foreground focus:outline-none font-body text-sm" placeholder="11 99999 0000" />
          </div>
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </div>
      </div>
    </div>
  );

  const Step4 = (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-2xl font-bold text-foreground">
          Análise <span className="text-gold italic">preliminar</span>
        </h3>
        <p className="mt-2 text-sm text-muted-foreground font-body">
          Detalhes finais para personalizar sua avaliação.
        </p>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">Conte-nos brevemente sobre seu objetivo (opcional)</label>
        <textarea id="message" rows={3} value={formData.message}
          maxLength={2000}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${inputClass} resize-none`}
          placeholder="Ex.: Sou pesquisador na área de…" />
      </div>

      <SelectField
        id="currentStatus" label="Status migratório atual (opcional)"
        value={formData.currentStatus}
        onChange={(v) => setFormData({ ...formData, currentStatus: v })}
        options={CURRENT_STATUS_OPTIONS}
        placeholder="Selecione (se aplicável)"
      />

      <div>
        <p className={labelClass}>Quando pretende iniciar o processo? *</p>
        <div className="grid grid-cols-2 gap-3">
          {TIMELINE_OPTIONS.map((opt) => (
            <ChoiceCard
              key={opt}
              selected={formData.timeline === opt}
              onClick={() => setFormData({ ...formData, timeline: opt })}
              title={opt}
            />
          ))}
        </div>
        {errors.message && !formData.timeline && <p className={errorClass}>Selecione uma opção.</p>}
      </div>

      <div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" checked={formData.privacy}
            onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
            className="w-4 h-4 mt-0.5 rounded border-input accent-gold" />
          <span className="text-sm text-muted-foreground font-body">{t(s.privacy, lang)}</span>
        </label>
        {errors.privacy && <p className={errorClass}>{errors.privacy}</p>}
      </div>
    </div>
  );

  const stepContent = step === 1 ? Step1 : step === 2 ? Step2 : step === 3 ? Step3 : Step4;

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
          {/* Sidebar */}
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
                <p className="mt-3 text-muted-foreground text-sm font-body leading-relaxed whitespace-pre-line">
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

          {/* Multi-step form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-3 bg-card rounded-xl border border-border shadow-lg overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-border">
              <div className="flex items-center gap-3">
                <img src={ebgreenLogo} alt="Ebgreen" className="h-9 w-auto" />
                <div className="w-px h-8 bg-border" />
                <div>
                  <p className="text-[10px] text-muted-foreground font-body font-semibold tracking-[0.2em] uppercase">
                    Avaliação
                  </p>
                  <p className="font-display text-sm font-semibold text-foreground">
                    Análise Preliminar de Elegibilidade
                  </p>
                </div>
              </div>

              {/* Progress steps */}
              <div className="mt-6 grid grid-cols-4 gap-2">
                {STEPS.map((st) => {
                  const active = step === st.n;
                  const done = step > st.n;
                  return (
                    <div key={st.n} className="flex flex-col items-center gap-2">
                      <div className="w-full flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-bold shrink-0 transition-all ${
                            active
                              ? "bg-gold text-green-deep ring-2 ring-gold/30"
                              : done
                                ? "bg-gold/80 text-green-deep"
                                : "bg-background border border-border text-muted-foreground"
                          }`}
                        >
                          {done ? <Check size={14} strokeWidth={3} /> : st.n}
                        </div>
                        <div className={`flex-1 h-0.5 rounded-full ${done || active ? "bg-gold/60" : "bg-border"}`} />
                      </div>
                      <span className={`text-[11px] font-body text-center w-full ${active ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                        {st.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step body */}
            <div className="px-6 sm:px-8 py-5 min-h-[360px] flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  {stepContent}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="px-6 sm:px-8 pb-6 flex items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Voltar
                </button>
              ) : <span />}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-gradient-gold text-green-deep px-6 py-3 rounded-lg font-bold text-sm font-body hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
                >
                  Continuar avaliação <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-gold text-green-deep px-6 py-3 rounded-lg font-bold text-sm font-body hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? t(s.submitting, lang) : "Receber minha avaliação"}
                  {!isSubmitting && <Send size={16} />}
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border bg-background/40 px-6 sm:px-8 py-4 space-y-3">
              <button
                type="button"
                onClick={() => setDisclaimerOpen((v) => !v)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="text-xs font-body font-semibold text-foreground tracking-wide">
                  Aviso de Elegibilidade
                </span>
                <ChevronDown
                  size={14}
                  className={`text-muted-foreground transition-transform ${disclaimerOpen ? "rotate-180" : ""}`}
                />
              </button>
              {disclaimerOpen && (
                <p className="text-[11px] leading-relaxed text-muted-foreground font-body">
                  A análise considera seu histórico profissional, objetivos imigratórios, documentação disponível e requisitos legais aplicáveis. Essa avaliação tem como objetivo assegurar que cada caso seja desenvolvido com estratégia, transparência e elevado padrão técnico.
                </p>
              )}
              <div className="flex items-center gap-2 pt-1">
                <Lock size={12} className="text-gold shrink-0" />
                <span className="text-[11px] text-muted-foreground font-body">
                  Dados protegidos e análise confidencial
                </span>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
