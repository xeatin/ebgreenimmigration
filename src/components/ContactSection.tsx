import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Instagram, Lock, ChevronDown, ArrowRight, ArrowLeft, Check, ShieldCheck, Info, Award, Globe2, Target, Shield, Clock, Paperclip, X, Sparkles } from "lucide-react";

const WhatsAppIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

import PhoneCodeSelector from "./PhoneCodeSelector";
import { useState, Fragment } from "react";
import { z } from "zod";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type FormErrors = Partial<Record<
  "firstName" | "lastName" | "email" | "phone" | "visa" | "education" | "achievements" |
  "experience" | "countryOfBirth" | "timeline" | "privacy" | "message",
  string
>>;

const VISA_OPTIONS = [
  { id: "EB-1A", label: "EB-1A", desc: "Habilidade Extraordinária" },
  { id: "EB-2 NIW", label: "EB-2 NIW", desc: "Profissionais qualificados e interesse nacional" },
  { id: "EB-3", label: "EB-3", desc: "Trabalho e oferta de emprego" },
  { id: "EB-5 / E-2 Investidor", label: "EB-5 / E-2", desc: "Investimento nos Estados Unidos" },
  { id: "H-1B / L-1 / O-1", label: "H-1B, L-1, O-1", desc: "Vistos de Trabalho" },
  { id: "F-1 Estudante", label: "F-1", desc: "Visto de Estudante" },
  { id: "Family-Based", label: "Family-Based", desc: "Patrocínio Familiar" },
  { id: "R-1 Religioso", label: "R-1", desc: "Trabalhador Religioso" },
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
  "Sim, publicações acadêmicas",
  "Sim, prêmios e reconhecimentos",
  "Sim, ambos",
  "Não, mas tenho outras evidências",
  "Ainda não",
];

const EXPERIENCE_OPTIONS = ["Menos de 5 anos", "De 5 a 10 anos", "Mais de 10 anos"];

const COUNTRY_GROUPS: { continent: string; countries: string[] }[] = [
  { continent: "América do Sul", countries: ["🇧🇷 Brasil", "🇦🇷 Argentina", "🇨🇱 Chile", "🇨🇴 Colômbia", "🇪🇨 Equador", "🇵🇾 Paraguai", "🇵🇪 Peru", "🇺🇾 Uruguai", "🇻🇪 Venezuela", "🇧🇴 Bolívia"] },
  { continent: "América do Norte e Central", countries: ["🇺🇸 Estados Unidos", "🇨🇦 Canadá", "🇲🇽 México", "🇨🇷 Costa Rica", "🇨🇺 Cuba", "🇵🇦 Panamá", "🇩🇴 República Dominicana"] },
  { continent: "Europa", countries: ["🇵🇹 Portugal", "🇪🇸 Espanha", "🇮🇹 Itália", "🇫🇷 França", "🇩🇪 Alemanha", "🇬🇧 Reino Unido", "🇮🇪 Irlanda", "🇨🇭 Suíça", "🇳🇱 Países Baixos", "🇧🇪 Bélgica"] },
  { continent: "África", countries: ["🇦🇴 Angola", "🇲🇿 Moçambique", "🇨🇻 Cabo Verde", "🇿🇦 África do Sul", "🇳🇬 Nigéria", "🇪🇬 Egito", "🇲🇦 Marrocos"] },
  { continent: "Ásia", countries: ["🇨🇳 China", "🇮🇳 Índia", "🇯🇵 Japão", "🇰🇷 Coreia do Sul", "🇵🇭 Filipinas", "🇻🇳 Vietnã", "🇹🇭 Tailândia", "🇮🇱 Israel"] },
  { continent: "Oceania", countries: ["🇦🇺 Austrália", "🇳🇿 Nova Zelândia"] },
];

const CURRENT_STATUS_OPTIONS = [
  "Ainda no Brasil / país de origem",
  "Visto de Turista (B1/B2)",
  "Visto de Estudante (F1/F2)",
  "Visto de Trabalho (H1B/L1/O1)",
  "Visto de Investidor (E2/EB-5)",
  "Green Card em processo",
  "Status irregular / fora de status",
  "Asilo / refúgio",
  "Outros",
];

const TIMELINE_OPTIONS = [
  "O quanto antes",
  "Em breve (1–3 meses)",
  "Planejando (3–12 meses)",
  "Ainda estou explorando opções",
];

const STEPS = [
  { n: 1, label: "Contato" },
  { n: 2, label: "Perfil" },
  { n: 3, label: "Análise" },
];

// Heurística simples para sugerir visto baseado nas respostas do perfil
const suggestVisa = (data: {
  education: string;
  achievements: string;
  experience: string;
  countryOfBirth: string;
}): { id: string; label: string; reason: string }[] => {
  const { education, achievements, experience } = data;
  if (!education || !achievements || !experience) return [];

  // Ensino Médio → descartar, não sugerir nenhum visto
  if (education === "Ensino Médio") return [];

  const hasAwards = /Sim/i.test(achievements);
  const hasPublications = /Sim/i.test(achievements);
  const hasBoth = /ambos/i.test(achievements);
  const senior = /Mais de 10/i.test(experience);
  const mid = /5 a 10/i.test(experience);
  const hasExperience5plus = senior || mid;

  const isTecnico = education === "Técnico e Tecnólogo";
  const isBacharelado = education === "Nível Superior / Bacharelado";
  const isPosGrad = education === "Pós-Graduação";
  const isMestrado = education === "Mestrado";
  const isDoutorado = education === "Doutorado";
  const isPosDoutorado = education === "Pós-Doutorado";

  const technical = isTecnico;
  const bachelor = isBacharelado;
  const postgrad = isPosGrad || isMestrado || isDoutorado || isPosDoutorado;
  const doctorate = isDoutorado || isPosDoutorado;
  const advanced = isPosGrad || isMestrado || isDoutorado || isPosDoutorado;

  // Doutorado/Pós-Doutorado + publicações → EB-1A e EB-2 NIW combinados
  if ((isDoutorado || isPosDoutorado) && hasPublications) {
    return [{
      id: "EB-1A e EB-2 NIW",
      label: "EB-1A e EB-2 NIW – Habilidade Extraordinária + Interesse Nacional",
      reason: "Seu doutorado com publicações abre caminho para os vistos EB-1A e EB-2 NIW.",
    }];
  }

  // Doutorado/Pós-Doutorado sem publicações → EB-2 NIW
  if (isDoutorado || isPosDoutorado) {
    return [{
      id: "EB-2 NIW",
      label: "EB-2 NIW — Interesse Nacional",
      reason: "Sua formação de doutorado sustenta um forte caso de Interesse Nacional (NIW).",
    }];
  }
  // Pós-Graduação/Mestrado + publicações → EB-1A e EB-2 NIW combinados
  if ((isPosGrad || isMestrado) && hasPublications) {
    return [{
      id: "EB-1A e EB-2 NIW",
      label: "EB-1A e EB-2 NIW – Habilidade Extraordinária + Interesse Nacional",
      reason: "Sua formação avançada com publicações abre caminho para os vistos EB-1A e EB-2 NIW.",
    }];
  }
  if ((bachelor || postgrad) && postgrad) {
    return [{
      id: "EB-2 NIW",
      label: "EB-2 NIW — Interesse Nacional",
      reason: "Sua formação superior com pós-graduação sustenta um forte caso de Interesse Nacional (NIW), independentemente do tempo de experiência.",
    }];
  }

  if (technical && (senior || mid)) {
    return [{
      id: "EB-2 NIW",
      label: "EB-2 NIW – Interesse Nacional",
      reason: "Sua formação técnica/tecnológica aliada a uma sólida experiência profissional sustenta um pedido de Interesse Nacional.",
    }];
  }
  if (technical && !hasExperience5plus) {
    return [{
      id: "EB-3",
      label: "EB-3 — Trabalho Qualificado",
      reason: "Para o perfil técnico/tecnólogo com menos de 5 anos de experiência, o caminho mais indicado é o EB-3, que requer um patrocinador (sponsor) nos EUA.",
    }];
  }
  if (bachelor && (senior || mid)) {
    return [{
      id: "EB-2 NIW",
      label: "EB-2 NIW — Interesse Nacional",
      reason: "Sua formação superior aliada a uma sólida experiência profissional sustenta um forte caso de Interesse Nacional (NIW).",
    }];
  }
  if (hasBoth && senior) {
    return [{
      id: "EB-1A",
      label: "EB-1A — Habilidade Extraordinária",
      reason: "Seu perfil sênior, com publicações e prêmios reconhecidos, é altamente compatível com o EB-1A.",
    }];
  }
  if (advanced && hasAwards) {
    return [{
      id: "EB-2 NIW",
      label: "EB-2 NIW — Interesse Nacional",
      reason: "Sua formação avançada e evidências profissionais sustentam um forte caso de Interesse Nacional (NIW).",
    }];
  }
  if (senior || mid) {
    return [{
      id: "H-1B / L-1 / O-1",
      label: "Vistos de Trabalho — H-1B, L-1 ou O-1",
      reason: "Sua experiência profissional consolidada favorece estratégias via vistos de trabalho qualificado.",
    }];
  }
  if (advanced) {
    return [{
      id: "EB-2 NIW",
      label: "EB-2 NIW — Interesse Nacional",
      reason: "Sua formação avançada cria uma base sólida para um pedido de Interesse Nacional.",
    }];
  }
  return [{
    id: "EB-3",
    label: "EB-3 — Trabalho Qualificado",
    reason: "Seu perfil sugere um caminho viável via EB-3 com oferta de emprego qualificado.",
  }];
};

const ContactSection = () => {
  const { lang } = useLanguage();
  const { toast } = useToast();
  const s = translations.contact;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    firstName: string; lastName: string; email: string; phoneCode: string; phone: string;
    visa: string;
    education: string; license: string; achievements: string; experience: string; countryOfBirth: string;
    message: string; currentStatus: string; timeline: string;
    privacy: boolean;
    resume: File | null;
  }>({
    firstName: "", lastName: "", email: "", phoneCode: "+55", phone: "",
    visa: "",
    education: "", license: "", achievements: "", experience: "", countryOfBirth: "",
    message: "", currentStatus: "", timeline: "",
    privacy: false,
    resume: null,
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
      if (formData.firstName.trim().length < 2) e.firstName = t(s.errors.firstNameMin, lang);
      if (formData.lastName.trim().length < 2) e.lastName = t(s.errors.lastNameMin, lang);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) e.email = t(s.errors.emailInvalid, lang);
      if (!/^\d{6,20}$/.test(formData.phone.replace(/\D/g, ""))) e.phone = t(s.errors.phoneInvalid, lang);
    }
    if (current === 2) {
      if (!formData.education) e.education = t(s.errors.educationRequired, lang);
      if (!formData.achievements) e.achievements = t(s.errors.required, lang);
      if (!formData.experience) e.experience = t(s.errors.experienceRequired, lang);
      if (!formData.countryOfBirth) e.countryOfBirth = t(s.errors.required, lang);
    }
    if (current === 3) {
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
    setStep((p) => {
      const next = Math.min(3, p + 1);
      if (p === 2 && next === 3 && !formData.visa) {
        const sug = suggestVisa(formData);
        if (sug.length) setFormData((d) => ({ ...d, visa: sug.map((s) => s.id).join(" + ") }));
      }
      return next;
    });
  };

  const handleBack = () => {
    setErrors({});
    setStep((p) => Math.max(1, p - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(3)) {
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

    // Upload resume to Storage if present
    let resumeUrl = "";
    let resumeName = "";
    if (formData.resume) {
      try {
        const ext = formData.resume.name.split(".").pop()?.toLowerCase() || "pdf";
        const safeBase = `${formData.firstName}-${formData.lastName}`
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "") || "lead";
        const path = `${new Date().toISOString().slice(0, 10)}/${safeBase}-${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("resumes")
          .upload(path, formData.resume, {
            contentType: formData.resume.type || "application/octet-stream",
            upsert: false,
          });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("resumes").getPublicUrl(path);
        resumeUrl = pub.publicUrl;
        resumeName = formData.resume.name;
      } catch (err) {
        console.error("Resume upload failed:", err);
        toast({
          title: "Falha ao enviar currículo",
          description: "Continuamos com o envio sem o anexo.",
          variant: "destructive",
        });
      }
    }

    const composedMessage = [
      formData.message,
      formData.countryOfBirth ? `País de nascimento: ${formData.countryOfBirth}` : "",
      formData.achievements ? `Publicações/Prêmios: ${formData.achievements}` : "",
      formData.license ? `Licença Profissional: ${formData.license}` : "",
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
        resumeUrl,
        resumeName,
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
          resumeUrl,
          resumeName,
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
      education: "", license: "", achievements: "", experience: "", countryOfBirth: "",
      message: "", currentStatus: "", timeline: "",
      privacy: false,
      resume: null,
    });
    setStep(1);
    setIsSubmitting(false);
  };

  /* ---------- Tokens (claro/institucional, fiel ao sample v2) ---------- */
  const labelCls = "block text-[11px] font-semibold text-foreground/55 tracking-[0.08em] uppercase mb-1.5 font-body";
  const reqCls = "text-gold";
  const inputBase =
    "w-full h-11 px-3.5 bg-white border rounded-md text-foreground text-sm font-body placeholder:text-foreground/30 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20";
  const inputCls = (err?: string) =>
    `${inputBase} ${err ? "border-red-500/60" : "border-border"}`;
  const selectCls = (err?: string) =>
    `${inputCls(err)} appearance-none bg-no-repeat pr-9 cursor-pointer`;
  const selectBg = {
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 5 4.5-5' stroke='%23C9963B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
    backgroundPosition: "right 12px center",
  };
  const errCls = "text-[11px] text-red-500 font-body mt-1";

  /* ---------- Step contents ---------- */

  const Step1 = (
    <div>
      <h3 className="font-display text-[22px] sm:text-[24px] font-semibold text-foreground leading-tight mb-2">
        Descubra se você é elegível para o <span className="shimmer-gold italic font-semibold">Green Card</span>.
      </h3>
      <p className="text-[13px] text-muted-foreground font-body font-light leading-relaxed mb-6 max-w-[62ch]">
        Milhares de profissionais já conquistaram o Green Card sem saber que tinham elegibilidade. Leva menos de 1 minuto para descobrir o seu caminho.
      </p>

      <p className={labelCls}>Qual visto mais se aproxima do seu objetivo? <span className={reqCls}>*</span></p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {VISA_OPTIONS.map((v) => {
          const selected = formData.visa === v.id;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setFormData({ ...formData, visa: v.id })}
              className={`relative text-left p-3 rounded-[10px] border transition-all overflow-hidden group ${
                selected
                  ? "border-gold bg-gold/[0.06]"
                  : "border-border bg-white hover:border-gold/50"
              }`}
            >
              <span
                className={`absolute top-0 left-0 right-0 h-[2px] bg-gold origin-left transition-transform ${
                  selected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
              {selected && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-gold flex items-center justify-center">
                  <Check size={8} strokeWidth={3} className="text-black" />
                </span>
              )}
              <p className={`font-body font-semibold text-[12px] mb-0.5 leading-tight ${selected ? "text-foreground" : "text-foreground"}`}>
                {v.label}
              </p>
              <p className="text-[10px] text-muted-foreground leading-snug">{v.desc}</p>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setFormData({ ...formData, visa: "Não sei ainda" })}
          className={`relative text-left p-3 rounded-[10px] border transition-all col-span-2 md:col-span-2 overflow-hidden group ${
            formData.visa === "Não sei ainda"
              ? "border-gold bg-gold/[0.06]"
              : "border-border bg-white hover:border-gold/50"
          }`}
        >
          <span
            className={`absolute top-0 left-0 right-0 h-[2px] bg-gold origin-left transition-transform ${
              formData.visa === "Não sei ainda" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
          {formData.visa === "Não sei ainda" && (
            <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-gold flex items-center justify-center">
              <Check size={8} strokeWidth={3} className="text-black" />
            </span>
          )}
          <p className="font-body font-semibold text-[12px] mb-0.5 text-foreground">
            Não sei ainda
          </p>
          <p className="text-[10px] text-muted-foreground">Quero orientação</p>
        </button>
      </div>
      {errors.visa && <p className={`${errCls} mt-2`}>{errors.visa}</p>}
    </div>
  );

  const Step2 = (
    <div>
      <h3 className="font-display text-[22px] font-semibold text-foreground leading-tight mb-1.5">
        Seu <span className="text-gold italic">perfil profissional</span>
      </h3>
      <p className="text-[13px] text-foreground/55 font-body font-light mb-6">
        Essas informações ajudam nossa equipe a avaliar sua elegibilidade antes da consulta.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelCls}>Formação Acadêmica <span className={reqCls}>*</span></label>
          <select
            value={formData.education}
            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            className={selectCls(errors.education)}
            style={selectBg}
          >
            <option value="" className="bg-white">Selecionar...</option>
            {EDUCATION_OPTIONS.map((o) => <option key={o} value={o} className="bg-white">{o}</option>)}
          </select>
          {errors.education && <p className={errCls}>{errors.education}</p>}
        </div>
        <div>
          <label className={labelCls}>Publicações, prêmios ou reconhecimentos? <span className={reqCls}>*</span></label>
          <select
            value={formData.achievements}
            onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
            className={selectCls(errors.achievements)}
            style={selectBg}
          >
            <option value="" className="bg-white">Selecionar...</option>
            {ACHIEVEMENTS_OPTIONS.map((o) => <option key={o} value={o} className="bg-white">{o}</option>)}
          </select>
          {errors.achievements && <p className={errCls}>{errors.achievements}</p>}
        </div>
      </div>

      {formData.education === "Ensino Médio" && (
        <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3">
          <p className="text-[13px] font-body font-semibold text-destructive mb-0.5">
            Perfil não elegível para análise
          </p>
          <p className="text-[12px] font-body text-destructive/80">
            Os vistos de imigração que trabalhamos exigem, no mínimo, formação técnica/tecnológica ou superior. Recomendamos buscar outras alternativas para o seu caso.
          </p>
        </div>
      )}

      <div className="mb-4">
        <label className={labelCls}>Licença Profissional</label>
        <select
          value={formData.license}
          onChange={(e) => setFormData({ ...formData, license: e.target.value })}
          className={selectCls()}
          style={selectBg}
        >
          <option value="" className="bg-white">Selecionar...</option>
          {["Não tenho","CAU","COREN","CRA","CRC","CREA","CREFITO","CRF","CRM","CRN","CRO","CRP","OAB"].map((o) => (
            <option key={o} value={o} className="bg-white">{o}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Experiência Profissional <span className={reqCls}>*</span></label>
          <select
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className={selectCls(errors.experience)}
            style={selectBg}
          >
            <option value="" className="bg-white">Selecionar...</option>
            {EXPERIENCE_OPTIONS.map((o) => <option key={o} value={o} className="bg-white">{o}</option>)}
          </select>
          {errors.experience && <p className={errCls}>{errors.experience}</p>}
        </div>
        <div>
          <label className={labelCls}>País de Nascimento <span className={reqCls}>*</span></label>
          <select
            value={formData.countryOfBirth}
            onChange={(e) => setFormData({ ...formData, countryOfBirth: e.target.value })}
            className={selectCls(errors.countryOfBirth)}
            style={selectBg}
          >
            <option value="" className="bg-white">Selecionar país...</option>
            {COUNTRY_GROUPS.map((g) => (
              <optgroup key={g.continent} label={g.continent} className="bg-white">
                {g.countries.map((c) => <option key={c} value={c} className="bg-white">{c}</option>)}
              </optgroup>
            ))}
          </select>
          {errors.countryOfBirth && <p className={errCls}>{errors.countryOfBirth}</p>}
        </div>
      </div>
    </div>
  );

  const Step3 = (
    <div>
      <h3 className="font-display text-[22px] font-semibold text-foreground leading-tight mb-1.5">
        Suas <span className="text-gold italic">informações</span>
      </h3>
      <p className="text-[13px] text-foreground/55 font-body font-light mb-6">
        Para enviarmos o resultado da sua avaliação e agendar sua consulta gratuita.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelCls}>Nome <span className={reqCls}>*</span></label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="Ex: João"
            className={inputCls(errors.firstName)}
          />
          {errors.firstName && <p className={errCls}>{errors.firstName}</p>}
        </div>
        <div>
          <label className={labelCls}>Sobrenome <span className={reqCls}>*</span></label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Ex: Silva"
            className={inputCls(errors.lastName)}
          />
          {errors.lastName && <p className={errCls}>{errors.lastName}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className={labelCls}>E-mail <span className={reqCls}>*</span></label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="seu@email.com"
          className={inputCls(errors.email)}
        />
        {errors.email && <p className={errCls}>{errors.email}</p>}
      </div>

      <div>
        <label className={labelCls}>WhatsApp / Telefone <span className={reqCls}>*</span></label>
        <div className={`flex items-center gap-2 rounded-md border bg-white transition focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 ${errors.phone ? "border-red-500/60" : "border-border"}`}>
          <PhoneCodeSelector
            value={formData.phoneCode}
            onChange={(val) => setFormData({ ...formData, phoneCode: val })}
          />
          <div className="w-px h-6 bg-border shrink-0" />
          <span className="px-1 text-sm text-foreground font-body shrink-0">{formData.phoneCode}</span>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(00) 00000-0000"
            className="flex-1 h-11 px-1 bg-transparent text-foreground placeholder:text-foreground/30 text-sm font-body outline-none"
          />
        </div>
        {errors.phone && <p className={errCls}>{errors.phone}</p>}
      </div>
    </div>
  );

  const suggestions = suggestVisa(formData);

  const Step4 = (
    <div>
      <h3 className="font-display text-[22px] font-semibold text-foreground leading-tight mb-1.5">
        Contexto do <span className="text-gold italic">seu caso</span>
      </h3>
      <p className="text-[13px] text-foreground/55 font-body font-light mb-5">
        Informações complementares para uma análise mais precisa do seu perfil.
      </p>

      {/* Sugestão preliminar baseada nas respostas */}
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            key={suggestions.map((s) => s.id).join("-")}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mb-5 relative rounded-xl border border-gold/40 bg-gradient-to-br from-gold/[0.08] via-white to-white p-4 sm:p-5 overflow-hidden"
          >
            <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="flex items-start gap-3">
              <span className="w-9 h-9 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shrink-0">
                <Sparkles size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] tracking-[0.18em] uppercase font-body font-semibold text-gold mb-2">
                  {suggestions.length > 1 ? "Sugestões preliminares baseadas nas suas respostas" : "Sugestão preliminar baseada nas suas respostas"}
                </p>
                <div className="space-y-3">
                  {suggestions.map((sug) => (
                    <div key={sug.id}>
                      <p className="font-display text-[17px] font-semibold text-foreground leading-tight mb-1">
                        {sug.label}
                      </p>
                      <p className="text-[12.5px] text-muted-foreground font-body leading-relaxed">
                        {sug.reason}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-foreground/40 font-body italic mt-3">
                  {suggestions.length > 1 ? "Estas sugestões são apenas indicativas. A análise final será feita por nossa equipe." : "Esta sugestão é apenas indicativa. A análise final será feita por nossa equipe."}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 px-3 py-2.5 rounded-md bg-emerald-500/[0.08] border border-emerald-500/25 mb-5">
        <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
        <span className="text-[12px] text-emerald-700 font-body">
          Todas as informações são estritamente confidenciais e protegidas.
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelCls}>
            Status atual <span className="text-foreground/40 normal-case font-light tracking-normal text-[10px] ml-1">(opcional)</span>
          </label>
          <select
            value={formData.currentStatus}
            onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
            className={selectCls()}
            style={selectBg}
          >
            <option value="" className="bg-white">Selecionar...</option>
            {CURRENT_STATUS_OPTIONS.map((o) => <option key={o} value={o} className="bg-white">{o}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Quando pretende iniciar? <span className={reqCls}>*</span></label>
          <select
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className={selectCls(!formData.timeline && errors.message ? "x" : undefined)}
            style={selectBg}
          >
            <option value="" className="bg-white">Selecionar...</option>
            {TIMELINE_OPTIONS.map((o) => <option key={o} value={o} className="bg-white">{o}</option>)}
          </select>
          {errors.message && !formData.timeline && <p className={errCls}>Selecione quando pretende iniciar.</p>}
        </div>
      </div>

      {/* Currículo */}
      <div className="mb-5">
        <label className={labelCls}>
          Envie seu currículo <span className="text-foreground/40 normal-case font-light tracking-normal text-[10px] ml-1">(opcional)</span>
        </label>
        {formData.resume ? (
          <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-md border border-border bg-white">
            <div className="flex items-center gap-2 min-w-0">
              <Paperclip size={14} className="text-gold shrink-0" />
              <span className="text-sm text-foreground font-body truncate">{formData.resume.name}</span>
              <span className="text-[11px] text-foreground/40 font-body shrink-0">
                ({(formData.resume.size / 1024).toFixed(0)} KB)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, resume: null })}
              className="p-1 rounded text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition shrink-0"
              aria-label="Remover arquivo"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="flex items-center gap-2.5 px-3 py-2.5 rounded-md border border-dashed border-border bg-muted/40 hover:border-gold hover:bg-gold/5 transition cursor-pointer group">
            <Paperclip size={15} className="text-foreground/50 group-hover:text-gold transition shrink-0" />
            <span className="text-sm text-foreground/60 group-hover:text-foreground font-body transition">
              Selecione arquivo
            </span>
            <span className="ml-auto text-[11px] text-foreground/40 font-body">
              PDF, DOC, DOCX · até 5MB
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (file.size > 5 * 1024 * 1024) {
                  toast({ title: "Arquivo muito grande", description: "O currículo deve ter no máximo 5MB.", variant: "destructive" });
                  return;
                }
                setFormData({ ...formData, resume: file });
              }}
            />
          </label>
        )}
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer group" onClick={(e) => {
        if ((e.target as HTMLElement).tagName === "A") e.stopPropagation();
      }}>
        <span
          className={`w-[18px] h-[18px] mt-0.5 rounded border-[1.5px] flex items-center justify-center shrink-0 transition ${
            formData.privacy ? "bg-gold border-gold" : "border-border bg-white"
          }`}
        >
          {formData.privacy && <Check size={11} strokeWidth={3} className="text-black" />}
        </span>
        <input
          type="checkbox"
          checked={formData.privacy}
          onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
          className="sr-only"
        />
        <span className="text-[12px] text-muted-foreground font-body leading-relaxed">
          {t(s.privacy, lang)}
        </span>
      </label>
      {errors.privacy && <p className={errCls}>{errors.privacy}</p>}
    </div>
  );

  const stepContent = step === 1 ? Step3 : step === 2 ? Step2 : Step4;

  const DIFFERENTIALS = [
    { icon: Award, label: "Análise especializada" },
    { icon: Globe2, label: "Atendimento internacional" },
    { icon: Target, label: "Estratégia personalizada" },
    { icon: Shield, label: "Confidencialidade e segurança" },
  ];

  return (
    <section id="contato" className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-10 lg:gap-14 items-start max-w-[1280px] mx-auto">
          {/* ============ LEFT: Institutional column ============ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-28"
          >
            <p className="text-gold font-body text-xs tracking-[0.32em] uppercase mb-5 font-semibold">
              {t(s.sectionLabel, lang)}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-[1.05] tracking-tight">
              Qual é o seu caminho<br />
              para o <span className="text-gold italic">Green Card?</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-base font-body leading-relaxed max-w-md">
              Seu perfil pode ter mais potencial do que você imagina. Inicie uma avaliação gratuita e descubra possíveis caminhos migratórios para os Estados Unidos.
            </p>

            {/* Differentials card */}
            <div className="mt-8 rounded-xl border border-border bg-white px-6 py-5 shadow-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {DIFFERENTIALS.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center text-center gap-2.5">
                    <span className="w-10 h-10 rounded-full border border-gold/40 bg-gold/[0.06] flex items-center justify-center text-gold">
                      <Icon size={17} strokeWidth={1.6} />
                    </span>
                    <p className="text-[11px] font-body font-medium text-foreground leading-snug">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dark contact card */}
            <div className="mt-6 rounded-xl bg-green-deep text-white p-6 relative overflow-hidden">
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
              <p className="font-display text-lg font-semibold mb-5">
                Fale com a <span className="italic text-gold/95">Eb<span className="text-white">green</span></span>
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-5 mb-6">
                <a href="https://wa.me/17712017117" target="_blank" rel="noopener noreferrer" className="group min-w-0">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-semibold text-white/45 mb-1.5 font-body">
                    <span className="text-gold"><WhatsAppIcon size={12} /></span> WhatsApp
                  </div>
                  <p className="text-sm font-body text-white group-hover:text-gold transition whitespace-nowrap">+1 (771) 201-7117</p>
                </a>
                <a href="mailto:info@ebgreenusa.com" className="group min-w-0">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-semibold text-white/45 mb-1.5 font-body">
                    <Mail size={12} className="text-gold" /> E-mail
                  </div>
                  <p className="text-sm font-body text-white group-hover:text-gold transition whitespace-nowrap">info@ebgreenusa.com</p>
                </a>
                <a href="https://instagram.com/ebgreenusa" target="_blank" rel="noopener noreferrer" className="group min-w-0">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-semibold text-white/45 mb-1.5 font-body">
                    <Instagram size={12} className="text-gold" /> Instagram
                  </div>
                  <p className="text-sm font-body text-white group-hover:text-gold transition whitespace-nowrap">@ebgreenusa</p>
                </a>
              </div>
              <div className="pt-5 border-t border-white/10">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-semibold text-white/45 mb-1.5 font-body">
                  <Clock size={12} className="text-gold" /> Atendimento
                </div>
                <p className="text-sm font-body text-white">Segunda – Sexta: 9:00 AM – 5:00 PM</p>
                <p className="text-[11px] text-white/45 font-body mt-0.5">(Eastern Time)</p>
              </div>
            </div>
          </motion.div>

          {/* ============ RIGHT: Form card ============ */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            noValidate
            className="relative bg-white rounded-2xl border border-border shadow-[0_30px_60px_-30px_rgba(15,17,23,0.25)] overflow-hidden"
          >
            <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent z-10" />

            {/* HEADER */}
            <div className="bg-secondary/60 border-b border-border px-5 sm:px-7 py-4 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-3 md:pr-6 md:border-r md:border-border shrink-0">
                <div className="w-9 h-9 rounded-md bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2L3 5.5v5C3 13.8 5.8 16.5 9 16.5s6-2.7 6-6v-5L9 2z" stroke="#C9963B" strokeWidth="1.3" fill="none"/>
                    <path d="M6 9l2 2 4-4" stroke="#C9963B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground tracking-[0.18em] font-body uppercase font-semibold">
                    Avaliação
                  </p>
                  <p className="font-display text-[15px] font-semibold text-foreground leading-tight">
                    Análise Preliminar de Elegibilidade
                  </p>
                </div>
              </div>

              {/* Stepper inline */}
              <div className="flex items-center flex-1 md:pl-2 w-full">
                {STEPS.map((stp, idx) => {
                  const active = step === stp.n;
                  const done = step > stp.n;
                  return (
                    <Fragment key={stp.n}>
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <div
                          key={`${stp.n}-${active ? "a" : done ? "d" : "i"}`}
                          className="relative w-7 h-7 flex items-center justify-center"
                        >
                          {/* track */}
                          <svg className="absolute inset-0" width="28" height="28" viewBox="0 0 28 28">
                            <circle
                              cx="14"
                              cy="14"
                              r="12"
                              fill="none"
                              stroke="hsl(var(--border))"
                              strokeWidth="1.5"
                            />
                          </svg>
                          {/* progress arc */}
                          {(active || done) && (
                            <svg
                              className={`absolute inset-0 origin-center ${active ? "animate-ring-spin" : ""}`}
                              width="28"
                              height="28"
                              viewBox="0 0 28 28"
                              style={{ transform: active ? undefined : "rotate(-90deg)" }}
                            >
                              <circle
                                cx="14"
                                cy="14"
                                r="12"
                                fill="none"
                                stroke="hsl(var(--gold))"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeDasharray="75.4"
                                strokeDashoffset={done ? 0 : 40}
                                className={done ? "animate-ring-draw" : ""}
                              />
                            </svg>
                          )}
                          {/* number / check */}
                          {done ? (
                            <span className="relative text-gold animate-check-fade">
                              <Check size={12} strokeWidth={3} />
                            </span>
                          ) : (
                            <span
                              className={`relative text-[11px] font-body font-semibold ${
                                active ? "text-gold" : "text-muted-foreground"
                              }`}
                            >
                              {stp.n}
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-[9px] font-body font-semibold tracking-[0.1em] uppercase whitespace-nowrap transition-colors ${
                            active ? "text-gold" : "text-muted-foreground"
                          }`}
                        >
                          {stp.label}
                        </span>
                      </div>
                      {idx < STEPS.length - 1 && (
                        <div className="flex-1 h-px bg-border mb-[18px] mx-1.5 sm:mx-2 relative overflow-hidden min-w-[12px]">
                          <span
                            className="absolute inset-y-0 left-0 bg-gold transition-all duration-500"
                            style={{ width: step > stp.n ? "100%" : "0%" }}
                          />
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>

            {/* BODY */}
            <div className="px-5 sm:px-7 pt-7 pb-4 min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  {stepContent}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ELIGIBILITY NOTICE */}
            <div className="mx-5 sm:mx-7 mb-3 rounded-[10px] border border-gold/30 bg-gold/[0.04] overflow-hidden">
              <button
                type="button"
                onClick={() => setDisclaimerOpen((v) => !v)}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-left"
              >
                <span className="w-5 h-5 rounded-full border-[1.5px] border-gold flex items-center justify-center shrink-0">
                  <Info size={10} className="text-gold" />
                </span>
                <span className="flex-1 text-[11px] font-bold text-gold tracking-[0.14em] uppercase font-body">
                  Aviso de Elegibilidade
                </span>
                <ChevronDown
                  size={14}
                  className={`text-muted-foreground transition-transform ${disclaimerOpen ? "rotate-180" : ""}`}
                />
              </button>
              {disclaimerOpen && (
                <div className="px-4 pb-3.5">
                  <p className="text-[12px] text-muted-foreground font-body font-light leading-[1.75]">
                    A análise considera seu histórico profissional, objetivos imigratórios, documentação disponível e requisitos legais aplicáveis. Essa avaliação tem como objetivo assegurar que cada caso seja desenvolvido com estratégia, transparência e elevado padrão técnico.
                  </p>
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="bg-secondary/60 border-t border-border px-5 sm:px-7 py-3.5 flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-body font-light">
                <Lock size={12} />
                Dados protegidos e análise confidencial.
              </div>

              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="h-11 px-4 rounded-md border border-border text-muted-foreground text-[13px] font-body hover:border-foreground/30 hover:text-foreground transition inline-flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} /> Voltar
                </button>
              )}

              <div className="ml-auto">
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={step === 2 && formData.education === "Ensino Médio"}
                    className="btn-highlight h-11 px-7 rounded-md bg-gradient-gold text-green-deep font-body font-semibold text-[13px] tracking-[0.02em] hover:opacity-90 active:scale-[0.98] transition inline-flex items-center gap-2 min-w-[200px] justify-center shadow-[0_8px_24px_-8px_hsl(var(--gold)/0.55)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50"
                  >
                    Continuar avaliação <ArrowRight size={15} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-highlight h-11 px-7 rounded-md bg-gradient-gold text-green-deep font-body font-semibold text-[13px] tracking-[0.02em] hover:opacity-90 active:scale-[0.98] transition inline-flex items-center gap-2 min-w-[220px] justify-center shadow-[0_8px_24px_-8px_hsl(var(--gold)/0.55)] disabled:opacity-60"
                  >
                    {isSubmitting ? t(s.submitting, lang) : (
                      <>Receber minha avaliação <Send size={14} /></>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
