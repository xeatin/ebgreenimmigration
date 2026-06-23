import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Instagram, Lock, ChevronDown, ArrowRight, ArrowLeft, Check, ShieldCheck, Info, Award, Globe2, Target, Shield, Clock, Paperclip, X, Sparkles } from "lucide-react";

const WhatsAppIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

import PhoneCodeSelector from "./PhoneCodeSelector";
import { useState, useRef, useEffect, Fragment } from "react";
import { trackForm, trackMetaCustom, trackMetaLead, trackGoogleAdsLead } from "@/lib/analytics";
import { getAttribution, attributionPayload } from "@/lib/tracking/attribution";
import { newEventId, hashUserData } from "@/lib/tracking/event-id";
import { z } from "zod";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t, type Language } from "@/i18n/translations";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { openCalendlyPopup } from "@/lib/calendly";

type FormErrors = Partial<Record<
  "firstName" | "lastName" | "email" | "phone" | "visa" | "education" | "license" | "achievements" |
  "experience" | "timeline" | "privacy" | "message",
  string
>>;

const VISA_OPTIONS = [
  { id: "EB-1A", label: "EB-1A" },
  { id: "EB-2 NIW", label: "EB-2 NIW" },
  { id: "EB-3", label: "EB-3" },
  { id: "EB-5 / E-2 Investidor", label: "EB-5 / E-2" },
  { id: "H-1B / L-1 / O-1", label: "H-1B, L-1, O-1" },
  { id: "F-1 Estudante", label: "F-1" },
  { id: "Family-Based", label: "Family-Based" },
  { id: "R-1 Religioso", label: "R-1" },
];

const EDUCATION_OPTIONS = [
  "Ensino Médio",
  "Técnico e Tecnólogo",
  "Nível Superior / Bacharelado",
  "Pós-Graduação",
  "Mestrado",
  "Doutorado",
  "Pós-Doutorado",
  "Investimentos",
];

const ACHIEVEMENTS_OPTIONS = [
  "Sim, publicações acadêmicas",
  "Sim, prêmios e reconhecimentos",
  "Sim, ambos",
  "Não, mas tenho outras evidências",
  "Ainda não",
];

const EXPERIENCE_OPTIONS = ["Menos de 5 anos", "De 5 a 10 anos", "Mais de 10 anos"];

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

const TRACKING_WEBHOOK_URL =
  import.meta.env.VITE_N8N_WEBHOOK_URL ||
  "https://n8n.srv1283251.hstgr.cloud/webhook/website-form-lead-tracking-v1";

const getCookieValue = (name: string) => {
  if (typeof document === "undefined") return "";
  return document.cookie
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${name}=`))
    ?.slice(name.length + 1) || "";
};

const getGaClientId = () => {
  const gaCookie = getCookieValue("_ga");
  const parts = gaCookie.split(".");
  return parts.length >= 4 ? `${parts[2]}.${parts[3]}` : gaCookie;
};

const normalizeQualificationValue = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

const getLeadQualification = (education: string, experience: string) => {
  const normalizedEducation = normalizeQualificationValue(education);
  const normalizedExperience = normalizeQualificationValue(experience);
  const isHighSchool = normalizedEducation.includes("ensino medio") || normalizedEducation === "high school";
  const isTechnical = normalizedEducation.includes("tecnico") || normalizedEducation.includes("tecnologo");
  // Técnico/Tecnólogo só qualifica com MAIS de 10 anos de experiência (alinhado ao
  // gate determinístico da Bia/AGENDAMENTO). 10 anos ou menos → não qualifica.
  const isTechnicalSenior = normalizedExperience.includes("mais de 10");

  if (isHighSchool) {
    return { status: "low" as const, reason: "Ensino Médio" };
  }

  if (isTechnical && !isTechnicalSenior) {
    return {
      status: "low" as const,
      reason: "Técnico/Tecnólogo com 10 anos ou menos de experiência",
    };
  }

  return {
    status: "qualified" as const,
    reason: "Atende aos critérios mínimos de qualificação",
  };
};

const getLeadSourceLabel = (attribution: ReturnType<typeof attributionPayload>) => {
  const normalizedSource = normalizeQualificationValue(attribution.utm_source || "");

  if (["meta", "facebook", "instagram"].includes(normalizedSource) || attribution.fbclid) {
    return "Meta Ads";
  }

  if (normalizedSource === "google" || attribution.gclid || attribution.gbraid || attribution.wbraid) {
    return "Google Ads";
  }

  if (normalizedSource === "linkedin") {
    return "LinkedIn";
  }

  if (["organic", "organico"].includes(normalizedSource)) {
    return "Orgânico";
  }

  if (normalizedSource === "indicacao") {
    return "Indicação";
  }

  return "Website";
};

// Heurística simples para sugerir visto baseado nas respostas do perfil
const suggestVisa = (data: {
  education: string;
  achievements: string;
  experience: string;
}): { id: string; label: string; reason: string }[] => {
  const { education, achievements, experience } = data;
  if (!education || !achievements || !experience) return [];

  // Ensino Médio → sugerir EB-3 (Trabalho Qualificado / Não Qualificado)
  if (education === "Ensino Médio") {
    return [{
      id: "EB-3",
      label: "EB-3 — Trabalho Qualificado ou Não Qualificado",
      reason: "Para perfis iguais ao seu, existe um caminho excelente para o seu Green Card: a categoria <strong>EB-3</strong>, que pode abranger tanto <strong>trabalhadores qualificados (Skilled Workers)</strong> quanto <strong>trabalhadores não qualificados (Unskilled / Other Workers)</strong>, dependendo da vaga oferecida pelo empregador nos EUA.\n\nO EB-3 é uma das vias mais sólidas para profissionais com <strong>ensino médio, formação técnica ou experiência profissional</strong>, e também pode ser uma opção para trabalhadores sem qualificação específica, desde que exista uma <strong>oferta de emprego permanente nos EUA</strong>.\n\n<strong>A boa notícia? Se você já tem um sponsor ou está em negociação com uma empresa americana, a Ebgreen pode cuidar de todo o processo para você.</strong>",
    }];
  }

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

  // Doutorado + publicações → EB-1A e EB-2 NIW combinados
  if (isDoutorado && hasPublications) {
    return [{
      id: "EB-1A e EB-2 NIW",
      label: "EB-1A e EB-2 NIW – Habilidade Extraordinária",
      reason: "Seu doutorado e suas publicações podem abrir caminhos estratégicos para o Green Card por meio do EB-1A ou do EB-2 NIW. Essas categorias são voltadas a profissionais com trajetória diferenciada, contribuições relevantes e potencial de impacto em sua área de atuação nos Estados Unidos.",
    }];
  }
  // Pós-Doutorado + publicações → EB-1A e EB-2 NIW combinados
  if (isPosDoutorado && hasPublications) {
    return [{
      id: "EB-1A e EB-2 NIW",
      label: "EB-1A e EB-2 NIW – Habilidade Extraordinária",
      reason: "Seu pós-doutorado e suas publicações podem abrir caminhos estratégicos para o Green Card por meio do EB-1A ou do EB-2 NIW. Essas categorias são voltadas a profissionais com trajetória diferenciada, contribuições relevantes e potencial de impacto em sua área de atuação nos Estados Unidos.",
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
      reason: "Sua formação superior com pós-graduação sustenta um forte caso de Interesse Nacional (NIW). Essa categoria é voltada a profissionais com trajetória diferenciada, contribuições relevantes e potencial de impacto em sua área de atuação nos Estados Unidos.",
    }];
  }

  if (technical && (senior || mid)) {
    return [{
      id: "EB-2 NIW",
      label: "EB-2 NIW – Interesse Nacional",
      reason: "Sua formação técnica/tecnológica, aliada a uma sólida experiência profissional, pode sustentar um pedido de EB-2 NIW com foco no Interesse Nacional. Essa categoria pode permitir a obtenção do Green Card.",
    }];
  }
  if (technical && !hasExperience5plus) {
    return [{
      id: "EB-3",
      label: "EB-3 — Trabalho Qualificado ou Não Qualificado",
      reason: "Para perfis iguais ao seu, existe um caminho excelente para o seu Green Card: a categoria <strong>EB-3</strong>, que pode abranger tanto <strong>trabalhadores qualificados (Skilled Workers)</strong> quanto <strong>trabalhadores não qualificados (Unskilled / Other Workers)</strong>, dependendo da vaga oferecida pelo empregador nos EUA.\n\nO EB-3 é uma das vias mais sólidas para profissionais com <strong>ensino médio, formação técnica ou experiência profissional</strong>, e também pode ser uma opção para trabalhadores sem qualificação específica, desde que exista uma <strong>oferta de emprego permanente nos EUA</strong>.\n\n<strong>A boa notícia? Se você já tem um sponsor ou está em negociação com uma empresa americana, a Ebgreen pode cuidar de todo o processo para você.</strong>",
    }];
  }
  if (bachelor && (senior || mid)) {
    return [{
      id: "EB-2 NIW",
      label: "EB-2 NIW — Interesse Nacional",
      reason: "Sua formação superior, aliada a uma sólida experiência profissional, pode sustentar um forte caso de EB-2 NIW com foco no Interesse Nacional. Essa categoria pode permitir a obtenção do Green Card.",
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
    label: "EB-3 — Trabalho Qualificado ou Não Qualificado",
    reason: "Para perfis iguais ao seu, existe um caminho excelente para o seu Green Card: a categoria <strong>EB-3</strong>, que pode abranger tanto <strong>trabalhadores qualificados (Skilled Workers)</strong> quanto <strong>trabalhadores não qualificados (Unskilled / Other Workers)</strong>, dependendo da vaga oferecida pelo empregador nos EUA.\n\nO EB-3 é uma das vias mais sólidas para profissionais com <strong>ensino médio, formação técnica ou experiência profissional</strong>, e também pode ser uma opção para trabalhadores sem qualificação específica, desde que exista uma <strong>oferta de emprego permanente nos EUA</strong>.\n\n<strong>A boa notícia? Se você já tem um sponsor ou está em negociação com uma empresa americana, a Ebgreen pode cuidar de todo o processo para você.</strong>",
  }];
};

interface ContactSectionProps {
  presetVisa?: string;
  formIdSuffix?: string;
}

const ContactSection = ({ presetVisa, formIdSuffix }: ContactSectionProps = {}) => {
  const { lang } = useLanguage();
  const { toast } = useToast();
  const s = translations.contact;
  type TranslatedGroup = Record<string, Record<Language, string> | undefined>;
  const STEPS = [
    { n: 1, label: t(s.form.stepContact, lang) },
    { n: 2, label: t(s.form.stepProfile, lang) },
    { n: 3, label: t(s.form.stepAnalysis, lang) },
  ];
  const trOpt = (group: TranslatedGroup | undefined, key: string) => {
    const value = group?.[key];
    return value ? t(value, lang) : key;
  };

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    firstName: string; lastName: string; email: string; phoneCode: string; phone: string;
    visa: string;
    education: string; license: string; achievements: string; experience: string;
    message: string; currentStatus: string; timeline: string; knownVisa: string;
    privacy: boolean;
    resume: File | null;
  }>({
    firstName: "", lastName: "", email: "", phoneCode: "+55", phone: "",
    visa: presetVisa ?? "",
    education: "", license: "", achievements: "", experience: "",
    message: "", currentStatus: "", timeline: "", knownVisa: "",
    privacy: false,
    resume: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [eb3Sponsor, setEb3Sponsor] = useState<null | "yes" | "no">(null);

  const startedRef = useRef(false);
  const submittedRef = useRef(false);
  const FORM_ID = formIdSuffix ? `main_contact_form_${formIdSuffix}` : "main_contact_form";

  const markStart = (field: string) => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackForm("form_start", { form_id: FORM_ID, field });
    }
  };

  useEffect(() => {
    const onLeave = () => {
      if (startedRef.current && !submittedRef.current) {
        trackForm("form_abandon", { form_id: FORM_ID, form_step: step, visa_context: formData.visa });
      }
    };
    window.addEventListener("pagehide", onLeave);
    return () => window.removeEventListener("pagehide", onLeave);
  }, [FORM_ID, step, formData.visa]);

  const buildSchema = () =>
    z.object({
      firstName: z.string().trim().min(2, t(s.errors.firstNameMin, lang)).max(80),
      lastName: z.string().trim().min(2, t(s.errors.lastNameMin, lang)).max(80),
      email: z.string().trim().email(t(s.errors.emailInvalid, lang)).max(255),
      phone: z
        .string()
        .trim()
        .min(1, t(s.errors.required, lang))
        .refine(
          (v) => {
            const digits = v.replace(/\D/g, "");
            if (formData.phoneCode === "+55") {
              // Brazilian: DDD (2 digits, 1-9) + 8 or 9 digit number; mobile starts with 9
              return /^[1-9][1-9]\d{8,9}$/.test(digits) && (digits.length === 10 || digits.length === 11);
            }
            return /^\d{6,20}$/.test(digits);
          },
          {
            message:
              formData.phoneCode === "+55"
                ? t(s.errors.phoneBrInvalid, lang)
                : t(s.errors.phoneInvalid, lang),
          },
        ),
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
      const digits = formData.phone.replace(/\D/g, "");
      if (formData.phoneCode === "+55") {
        const validBr = /^[1-9][1-9]\d{8,9}$/.test(digits) && (digits.length === 10 || digits.length === 11);
        if (!validBr) e.phone = t(s.errors.phoneBrInvalid, lang);
      } else if (!/^\d{6,20}$/.test(digits)) {
        e.phone = t(s.errors.phoneInvalid, lang);
      }
    }
    if (current === 2) {
      if (!formData.education) e.education = t(s.errors.educationRequired, lang);
      if (!formData.license) e.license = t(s.errors.required, lang);
      if (!formData.achievements) e.achievements = t(s.errors.required, lang);
      if (!formData.experience) e.experience = t(s.errors.experienceRequired, lang);
    }
    if (current === 3) {
      // Step 3 agora é apenas análise + agendamento via Calendly.
      // Sem campos obrigatórios — o Calendly captura o restante.
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(step)) {
      trackForm("form_error", { form_id: FORM_ID, form_step: step, reason: "validation" });
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
      trackForm("form_step", { form_id: FORM_ID, form_step: next, visa_context: formData.visa });
      return next;
    });
  };

  const handleBack = () => {
    setErrors({});
    setStep((p) => {
      const prev = Math.max(1, p - 1);
      trackForm("form_step", { form_id: FORM_ID, form_step: prev, visa_context: formData.visa });
      return prev;
    });
  };

  const handleFinalCtaClick = () => {
    if (isSubmitting) return;
    trackMetaCustom("assessment_final_cta_click", {
      form_id: FORM_ID,
      form_step: step,
      visa_context: formData.visa,
      cta_text: t(s.form.submitCta, lang),
    });
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

    // Upload resume to Storage if present. The bucket is private — we send the
    // storage path to the edge function, which generates a signed download URL
    // server-side (so resume files are never publicly enumerable).
    let resumePath = "";
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
        resumePath = path;
        resumeName = formData.resume.name;
      } catch (err) {
        console.error("Resume upload failed:", err);
        toast({
          title: t(s.form.resumeFailTitle, lang),
          description: t(s.form.resumeFailDesc, lang),
          variant: "destructive",
        });
      }
    }

    const composedMessage = [
      formData.message,
      formData.achievements ? `Publicações/Prêmios: ${formData.achievements}` : "",
      formData.license ? `Licença Profissional: ${formData.license}` : "",
      formData.currentStatus ? `Status atual: ${formData.currentStatus}` : "",
      formData.timeline ? `Quando pretende iniciar: ${formData.timeline}` : "",
      formData.knownVisa ? `Sei qual o meu visto: ${formData.knownVisa}` : "",
    ].filter(Boolean).join("\n");

    // Sanitiza nome: evita duplicação quando o usuário digita o nome completo
    // em ambos os campos (ex: firstName="Williams" + lastName="Williams da Silva"
    // → lastName="da Silva"). Mesma lógica aplicada no edge function.
    const collapseSpaces = (s: string) => (s || "").replace(/\s+/g, " ").trim();
    const sanitizedFirstName = collapseSpaces(formData.firstName);
    let sanitizedLastName = collapseSpaces(formData.lastName);
    if (sanitizedFirstName && sanitizedLastName) {
      const fnLower = sanitizedFirstName.toLowerCase();
      const lnLower = sanitizedLastName.toLowerCase();
      if (lnLower.startsWith(fnLower + " ")) {
        sanitizedLastName = sanitizedLastName.slice(sanitizedFirstName.length).trim();
      } else if (lnLower === fnLower) {
        sanitizedLastName = "";
      }
    }

    // Attribution + event_id para deduplicação Pixel ↔ CAPI
    const attribution = attributionPayload(getAttribution());
    const leadSourceLabel = getLeadSourceLabel(attribution);
    const eventId = newEventId();
    const userData = await hashUserData({
      email: formData.email,
      phone: formData.phone,
      phoneCode: formData.phoneCode,
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      country: "br",
    });

    const submissionPayload = {
      source: "website",
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      email: formData.email,
      phoneCode: formData.phoneCode,
      phone: formData.phone,
      visa: formData.visa,
      education: formData.education,
      experience: formData.experience,
      knownVisa: formData.knownVisa,
      message: `${t(s.form.defaultMessage, lang)}\n\n${composedMessage}`.trim(),
      resumePath,
      resumeName,
      event_id: eventId,
      event_source_url: typeof window !== "undefined" ? window.location.href : undefined,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      ga_client_id: getGaClientId(),
      attribution,
      user_data_hashed: userData,
    };

    let qualification: 'low' | 'qualified' = getLeadQualification(
      formData.education,
      formData.experience,
    ).status;
    let qualificationReason = getLeadQualification(
      formData.education,
      formData.experience,
    ).reason;

    try {
      if (qualification === "qualified") {
        const response = await fetch(TRACKING_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionPayload),
        });

        const responseText = await response.text();
        let data: unknown = null;
        try {
          data = JSON.parse(responseText);
        } catch {
          data = responseText;
        }

        const failed = !response.ok
          || (typeof data === "object"
            && data !== null
            && "success" in data
            && (data as { success?: boolean }).success === false);

        if (failed) {
          throw new Error(
            typeof data === "object" && data !== null && "error" in data
              ? String((data as { error?: string }).error || "Erro ao enviar lead")
              : "Erro ao enviar lead",
          );
        }

        const ownerNotificationPayload = {
          ...submissionPayload,
          source: leadSourceLabel,
          skipKommo: true,
          message: [
            submissionPayload.message,
            "",
            "[Notificação interna] Lead qualificado já enviado ao Kommo via n8n tracking.",
            `Event ID: ${eventId}`,
          ].join("\n"),
        };

        try {
          const { data: emailData, error: emailError } = await supabase.functions.invoke("send-contact-email", {
            body: ownerNotificationPayload,
          });
          if (emailError || emailData?.success === false) {
            console.warn("[lead] owner email notification failed:", emailError || emailData);
          }
        } catch (emailError) {
          console.warn("[lead] owner email notification failed:", emailError);
        }

        console.info("[lead] qualification:", qualification, "| reason:", qualificationReason, "| trackingWebhook:", data);
      } else {
        const { data, error } = await supabase.functions.invoke("send-contact-email", {
          body: {
            ...submissionPayload,
            source: leadSourceLabel,
          },
        });

        if (error || data?.success === false) {
          throw error || new Error(data?.error || "Erro ao enviar lead");
        }

        qualification = data?.qualification === "low" ? "low" : qualification;
        qualificationReason = data?.qualificationReason || qualificationReason;
        console.info("[lead] qualification:", qualification, "| reason:", qualificationReason, "| kommo:", data?.kommo);
      }
    } catch (err) {
      trackForm("form_error", { form_id: FORM_ID, visa_context: formData.visa, reason: "submit_failed" });
      toast({
        title: t(s.validationTitle, lang),
        description: t(s.form.submitFailDesc, lang),
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    submittedRef.current = true;
    trackForm("form_submit", { form_id: FORM_ID, visa_context: formData.visa, reason: qualification });
    trackMetaLead(
      {
        content_name: FORM_ID,
        content_category: "lead_form",
        status: qualification,
        visa_context: formData.visa,
      },
      { eventId, userDataHashed: userData },
    );
    trackMetaCustom(
      "assessment_form_submit",
      {
        form_id: FORM_ID,
        status: qualification,
        visa_context: formData.visa,
      },
      { eventId },
    );
    trackGoogleAdsLead({
      eventId,
      value: 1,
      currency: "USD",
      userDataHashed: {
        em: userData.em,
        ph: userData.ph,
        fn: userData.fn,
        ln: userData.ln,
        country: userData.country,
      },
    });
    if (qualification === 'low') {
      toast({
        title: t(s.form.successLowTitle, lang),
        description: t(s.form.successLowDesc, lang),
      });
    } else {
      toast({
        title: t(s.successTitle, lang),
        description: t(s.successMsg, lang),
      });
    }
    setFormData({
      firstName: "", lastName: "", email: "", phoneCode: "+55", phone: "",
      visa: "",
      education: "", license: "", achievements: "", experience: "",
      message: "", currentStatus: "", timeline: "", knownVisa: "",
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
    "w-full h-12 px-3.5 bg-white border rounded-md text-foreground text-sm font-body placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/30 focus:shadow-card";
  const inputCls = (err?: string) =>
    `${inputBase} ${err ? "border-destructive/60 focus:ring-destructive/20" : "border-border"}`;
  const selectCls = (err?: string) =>
    `${inputCls(err)} appearance-none bg-no-repeat pr-9 cursor-pointer`;
  const selectBg = {
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 5 4.5-5' stroke='%23C9963B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
    backgroundPosition: "right 12px center",
  };
  const errCls = "text-[11px] text-destructive font-body mt-1.5";

  /* ---------- Step contents ---------- */

  const Step1 = (
    <div>
      <h3 className="font-display text-[22px] sm:text-[24px] font-semibold text-foreground leading-tight mb-2">
        {t(s.form.step1TitleA, lang)} <span className="shimmer-gold italic font-semibold">Green Card</span>.
      </h3>
      <p className="text-[13px] text-muted-foreground font-body font-light leading-relaxed mb-6 max-w-[62ch]">
        {t(s.form.step1Sub, lang)}
      </p>

      <p className={labelCls}>{t(s.form.step1Question, lang)} <span className={reqCls}>*</span></p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {VISA_OPTIONS.map((v) => {
          const selected = formData.visa === v.id;
          const visaDescriptions = s.visaDesc as TranslatedGroup | undefined;
          const visaDescription = visaDescriptions?.[v.id];
          const desc = visaDescription ? t(visaDescription, lang) : "";
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setFormData({ ...formData, visa: v.id })}
              className={`relative text-left p-3 rounded-[10px] border transition-all overflow-hidden group shadow-card hover:shadow-card-hover ${
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
              <p className="text-[10px] text-muted-foreground leading-snug">{desc}</p>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setFormData({ ...formData, visa: "Não sei ainda" })}
          className={`relative text-left p-3 rounded-[10px] border transition-all col-span-2 md:col-span-2 overflow-hidden group shadow-card hover:shadow-card-hover ${
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
            {t(s.form.dontKnow, lang)}
          </p>
          <p className="text-[10px] text-muted-foreground">{t(s.form.dontKnowDesc, lang)}</p>
        </button>
      </div>
      {errors.visa && <p className={`${errCls} mt-2`}>{errors.visa}</p>}
    </div>
  );

  const Step2 = (
    <div>
      <h3 className="font-display text-[22px] font-semibold text-foreground leading-tight mb-1.5">
        {t(s.form.step2TitleA, lang)} <span className="text-gold italic">{t(s.form.step2TitleB, lang)}</span>
      </h3>
      <p className="text-[13px] text-foreground/55 font-body font-light mb-6">
        {t(s.form.step2Sub, lang)}
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelCls}>{t(s.form.labelEducation, lang)} <span className={reqCls}>*</span></label>
          <select
            value={formData.education}
            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            className={selectCls(errors.education)}
            style={selectBg}
          >
            <option value="" className="bg-white">{t(s.form.selectPlaceholder, lang)}</option>
            {EDUCATION_OPTIONS.map((o) => <option key={o} value={o} className="bg-white">{trOpt(s.educationList, o)}</option>)}
          </select>
          {errors.education && <p className={errCls}>{errors.education}</p>}
        </div>
        <div>
          <label className={labelCls}>{t(s.form.labelAchievements, lang)} <span className={reqCls}>*</span></label>
          <select
            value={formData.achievements}
            onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
            className={selectCls(errors.achievements)}
            style={selectBg}
          >
            <option value="" className="bg-white">{t(s.form.selectPlaceholder, lang)}</option>
            {ACHIEVEMENTS_OPTIONS.map((o) => <option key={o} value={o} className="bg-white">{trOpt(s.achievementsList, o)}</option>)}
          </select>
          {errors.achievements && <p className={errCls}>{errors.achievements}</p>}
        </div>
      </div>


      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelCls}>{t(s.form.labelLicense, lang)} <span className={reqCls}>*</span></label>
          <select
            value={formData.license}
            onChange={(e) => setFormData({ ...formData, license: e.target.value })}
            className={selectCls(errors.license)}
            style={selectBg}
          >
            <option value="" className="bg-white">{t(s.form.selectPlaceholder, lang)}</option>
            {["Não tenho","CAU","COREN","CRA","CRC","CREA","CREFITO","CRF","CRM","CRN","CRO","CRP","OAB"].map((o) => (
              <option key={o} value={o} className="bg-white">{o === "Não tenho" ? t(s.form.noLicense, lang) : o}</option>
            ))}
          </select>
          {errors.license && <p className={errCls}>{errors.license}</p>}
        </div>
        <div>
          <label className={labelCls}>{t(s.form.labelExperience, lang)} <span className={reqCls}>*</span></label>
          <select
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className={selectCls(errors.experience)}
            style={selectBg}
          >
            <option value="" className="bg-white">{t(s.form.selectPlaceholder, lang)}</option>
            {EXPERIENCE_OPTIONS.map((o) => <option key={o} value={o} className="bg-white">{trOpt(s.experienceList, o)}</option>)}
          </select>
          {errors.experience && <p className={errCls}>{errors.experience}</p>}
        </div>
      </div>
    </div>
  );

  const Step3 = (
    <div>
      <h3 className="font-display text-[22px] font-semibold text-foreground leading-tight mb-1.5">
        {t(s.form.step1TitleA, lang)} <span className="text-gold italic font-semibold">Green Card</span>.
      </h3>
      <p className="text-[13px] text-foreground/55 font-body font-light mb-6">
        {t(s.form.step1Sub, lang)}
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelCls}>{t(s.form.labelFirstName, lang)} <span className={reqCls}>*</span></label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder={t(s.form.placeholderFirstName, lang)}
            className={inputCls(errors.firstName)}
          />
          {errors.firstName && <p className={errCls}>{errors.firstName}</p>}
        </div>
        <div>
          <label className={labelCls}>{t(s.form.labelLastName, lang)} <span className={reqCls}>*</span></label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder={t(s.form.placeholderLastName, lang)}
            className={inputCls(errors.lastName)}
          />
          {errors.lastName && <p className={errCls}>{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelCls}>{t(s.form.labelEmail, lang)} <span className={reqCls}>*</span></label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={t(s.form.placeholderEmail, lang)}
            className={inputCls(errors.email)}
          />
          {errors.email && <p className={errCls}>{errors.email}</p>}
        </div>
        <div>
          <label className={labelCls}>{t(s.form.labelPhone, lang)} <span className={reqCls}>*</span></label>
          <div className={`flex items-center gap-2 rounded-md border bg-white transition-all duration-200 focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green/30 focus-within:shadow-card ${errors.phone ? "border-destructive/60" : "border-border"}`}>
            <PhoneCodeSelector
              value={formData.phoneCode}
              onChange={(val) => setFormData({ ...formData, phoneCode: val })}
            />
            <div className="w-px h-6 bg-border shrink-0" />
            <input
              type="tel"
              inputMode="numeric"
              value={formData.phone}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "");
                let masked = digits;
                if (formData.phoneCode === "+55") {
                  const d = digits.slice(0, 11);
                  if (d.length <= 2) masked = d.length ? `(${d}` : "";
                  else if (d.length <= 6) masked = `(${d.slice(0, 2)}) ${d.slice(2)}`;
                  else if (d.length <= 10) masked = `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
                  else masked = `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
                } else if (formData.phoneCode === "+1") {
                  const d = digits.slice(0, 10);
                  if (d.length <= 3) masked = d.length ? `(${d}` : "";
                  else if (d.length <= 6) masked = `(${d.slice(0, 3)}) ${d.slice(3)}`;
                  else masked = `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
                } else {
                  masked = digits.slice(0, 15);
                }
                setFormData({ ...formData, phone: masked });
              }}
              placeholder={formData.phoneCode === "+55" ? "(11) 98765-4321" : formData.phoneCode === "+1" ? "(771) 201-7117" : t(s.form.placeholderPhone, lang)}
              className="flex-1 h-12 px-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 text-sm font-body outline-none"
            />
          </div>
          {errors.phone && <p className={errCls}>{errors.phone}</p>}
        </div>
      </div>
    </div>
  );

  const suggestions = suggestVisa(formData);

  const Step4 = (
    <div>
      {/* Analise preliminar baseada nas suas respostas */}
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            key={suggestions.map((s) => s.id).join("-")}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mb-5 relative rounded-xl border border-brand-green/40 bg-gradient-to-br from-brand-green/[0.06] via-white to-white p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          >
            {/* Floating attention badge outside the card */}
            <motion.span
              initial={{ opacity: 0, y: -6, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
              className="absolute -top-2.5 -right-2.5 z-10 flex items-center gap-1 bg-brand-green text-cream text-[10px] font-bold font-body px-2.5 py-1 rounded-full shadow-[0_4px_14px_hsl(var(--brand-green)/0.5)] uppercase tracking-wider"
            >
              <Sparkles size={10} className="fill-cream" />
              {t(s.form.yourAnalysis, lang)}
            </motion.span>
            <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-green to-transparent rounded-t-xl" />
            <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-brand-green/20 animate-pulse pointer-events-none" />
            <div className="flex items-start gap-3">
              <span className="w-9 h-9 rounded-full bg-brand-green/15 border border-brand-green/40 flex items-center justify-center text-brand-green shrink-0 animate-pulse">
                <Sparkles size={16} className="animate-spin" style={{ animationDuration: '3s' }} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] tracking-[0.18em] uppercase font-body font-extralight text-brand-green mb-2">
                  {suggestions.length > 1 ? t(s.form.analysisLabelMulti, lang) : t(s.form.analysisLabel, lang)}
                </p>
                <div className="space-y-3">
                  {suggestions.map((sug) => (
                    <div key={sug.id}>
                      <p className="font-display text-[17px] font-semibold text-foreground leading-tight mb-1">
                        {sug.label}
                      </p>
                      <p className="text-[12.5px] text-muted-foreground font-body leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: sug.reason }} />
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-foreground/40 font-body italic mt-3">
                  {suggestions.length > 1 ? t(s.form.analysisDisclaimerMulti, lang) : t(s.form.analysisDisclaimer, lang)}
                </p>
                {(() => {
                  const isEb3 = suggestions.some((s) => /^EB-?3/i.test(s.id));
                  const scheduleBtn = (
                    <button
                      type="button"
                      onClick={() => {
                        const attribution = getAttribution();
                        trackForm("schedule_click", {
                          form_id: FORM_ID,
                          visa_context: suggestions[0]?.id ?? formData.visa,
                        });
                        openCalendlyPopup({
                          firstName: formData.firstName,
                          lastName: formData.lastName,
                          email: formData.email,
                          customAnswers: {
                            a1: [formData.phoneCode, formData.phone].filter(Boolean).join(" "),
                            a2: suggestions.map((sug) => sug.label).join(" | "),
                          },
                          utm: {
                            utmSource: attribution?.utm_source,
                            utmMedium: attribution?.utm_medium,
                            utmCampaign: attribution?.utm_campaign,
                            utmContent: attribution?.utm_content,
                            utmTerm: attribution?.utm_term,
                          },
                        });
                      }}
                      className="mt-4 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-md bg-brand-green text-cream text-[13px] font-body font-semibold uppercase tracking-wider shadow-[0_6px_20px_hsl(var(--brand-green)/0.35)] hover:brightness-110 transition"
                    >
                      <Clock size={14} />
                      Agendar consulta agora
                    </button>
                  );

                  if (!isEb3) return scheduleBtn;

                  if (eb3Sponsor === null) {
                    return (
                      <div className="mt-4 rounded-lg border border-gold/40 bg-gold/[0.04] p-4">
                        <p className="text-[13px] font-body font-semibold text-foreground mb-1">
                          Antes de agendar, precisamos confirmar um ponto importante:
                        </p>
                        <p className="text-[12.5px] text-muted-foreground font-body leading-relaxed mb-3">
                          Você já possui um <strong>sponsor</strong> (empregador americano disposto a contratá-lo) ou está em negociação com uma empresa nos EUA?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEb3Sponsor("yes");
                              trackForm("eb3_sponsor_answer", { form_id: FORM_ID, answer: "yes" });
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-brand-green text-cream text-[13px] font-body font-semibold uppercase tracking-wider hover:brightness-110 transition"
                          >
                            <Check size={14} /> Sim, tenho sponsor
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEb3Sponsor("no");
                              trackForm("eb3_sponsor_answer", { form_id: FORM_ID, answer: "no" });
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-border bg-white text-foreground text-[13px] font-body font-semibold uppercase tracking-wider hover:border-foreground/40 transition"
                          >
                            Ainda não tenho
                          </button>
                        </div>
                      </div>
                    );
                  }

                  if (eb3Sponsor === "yes") {
                    return (
                      <div className="mt-4">
                        <div className="mb-3 flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-500/[0.08] border border-emerald-500/25">
                          <Check size={14} className="text-emerald-600 shrink-0" />
                          <span className="text-[12px] text-emerald-700 font-body">
                            Perfeito! Como você já possui um sponsor, podemos avançar com seu agendamento.
                          </span>
                        </div>
                        {scheduleBtn}
                      </div>
                    );
                  }

                  return (
                    <div className="mt-4 rounded-lg border border-border bg-secondary/40 p-4">
                      <p className="font-display text-[15px] font-semibold text-foreground mb-2">
                        Agradecemos seu interesse 💚
                      </p>
                      <p className="text-[12.5px] text-muted-foreground font-body leading-relaxed">
                        A categoria <strong>EB-3</strong> exige uma <strong>oferta de emprego permanente nos EUA</strong> de um empregador disposto a patrociná-lo (sponsor). Sem esse requisito, não conseguimos dar andamento ao processo neste momento.
                        <br />
                        Assim que você conseguir um sponsor — ou estiver em negociação com uma empresa americana —, retorne aqui e teremos prazer em cuidar de todo o processo para você.
                      </p>
                      <button
                        type="button"
                        onClick={() => setEb3Sponsor(null)}
                        className="mt-3 text-[12px] text-brand-green font-body font-semibold underline hover:opacity-80"
                      >
                        Revisar resposta
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 px-3 py-2.5 rounded-md bg-emerald-500/[0.08] border border-emerald-500/25 mt-1">
        <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
        <span className="text-[12px] text-emerald-700 font-body">
          {t(s.form.advanceBadge, lang)}
        </span>
      </div>

      <p className="mt-4 text-[11px] text-muted-foreground font-body font-light leading-relaxed">
        Ao agendar, você concorda com nossa{" "}
        <a href="#" className="text-foreground font-medium underline hover:opacity-80">
          {t(translations.footer.privacy, lang)}
        </a>
        . Seus dados são tratados com confidencialidade e enviados diretamente à nossa equipe de especialistas.
      </p>
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
            <h2 className="font-display text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-[1.15] tracking-tight px-0 my-0 mx-0">
              {t(s.form.heroTitle1, lang)}<br />
              <span className="text-gold">{t(s.form.heroTitleHighlight, lang)}</span> {t(s.form.heroTitle2, lang)}
            </h2>
            <p className="mt-5 text-muted-foreground text-base font-body leading-relaxed text-justify">
              {t(s.sectionSubtitle, lang)}
            </p>

            {/* Institutional stats row */}
            <div className="mt-7 grid grid-cols-3 gap-4 pb-5 border-b border-foreground/10">
              <div>
                <p className="font-body text-xs text-foreground font-medium leading-none">10+</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground font-body">{t(s.form.stats10y, lang)}</p>
              </div>
              <div>
                <p className="font-body text-xs text-foreground font-medium leading-none">+89%</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground font-body">{t(s.form.statsApproval, lang)}</p>
              </div>
              <div>
                <p className="font-body text-xs text-foreground font-medium leading-none whitespace-nowrap">
                  PT<span className="text-gold mx-1">·</span>EN<span className="text-gold mx-1">·</span>ES
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground font-body">{t(s.form.statsService, lang)}</p>
              </div>
            </div>

            {/* Dark contact card */}
            <div className="mt-4 rounded-xl bg-green-deep text-white px-5 md:px-6 pt-[19px] md:pt-[23px] pb-5 md:pb-6 relative overflow-hidden border border-transparent hover:border-brand-green/65 hover:shadow-[inset_0_0_0_1px_hsl(var(--brand-green)/0.50)] transition-all duration-300 group">
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
              <p className="font-display text-lg font-semibold">
                {t(s.form.directContact, lang)}
              </p>
              <div className="mt-[11px] mb-[19px] h-px w-full bg-white/10" />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-5">
                <a href="https://wa.me/17712017117" target="_blank" rel="noopener noreferrer" className="group min-w-0">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-semibold text-white/45 mb-1 font-body">
                    <span className="text-gold"><WhatsAppIcon size={12} /></span> WhatsApp
                  </div>
                  <p className="text-sm font-body text-white group-hover:text-gold transition whitespace-nowrap">+1 (771) 201-7117</p>
                </a>
                <a href="mailto:info@ebgreenusa.com" className="group min-w-0">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-semibold text-white/45 mb-1 font-body">
                    <Mail size={12} className="text-gold" /> E-mail
                  </div>
                  <p className="text-sm font-body text-white group-hover:text-gold transition whitespace-nowrap">info@ebgreenusa.com</p>
                </a>
                <a href="https://instagram.com/ebgreenusa" target="_blank" rel="noopener noreferrer" className="group min-w-0">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-semibold text-white/45 mb-1 font-body">
                    <Instagram size={12} className="text-gold" /> Instagram
                  </div>
                  <p className="text-sm font-body text-white group-hover:text-gold transition whitespace-nowrap">@ebgreenusa</p>
                </a>
              </div>
              <p className="text-sm font-body text-gold/90">
                {t(s.form.mondayFriday, lang)} <span className="text-white/40 mx-1">·</span> 9:00–17:00 ET
              </p>
            </div>
          </motion.div>

          {/* ============ RIGHT: Form card ============ */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            onFocusCapture={(e) => {
              const t = e.target as HTMLElement;
              const name = (t as HTMLInputElement).name || t.tagName.toLowerCase();
              markStart(name);
            }}
            noValidate
            className="relative bg-white rounded-2xl border border-border shadow-elevated overflow-hidden"
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
                    {t(s.form.freeEvalBadge, lang)}
                  </p>
                  <p className="font-display text-[15px] font-semibold text-foreground leading-tight">
                    {t(s.form.formTitle, lang)}
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
            <div className="px-5 sm:px-7 pt-7 pb-4">
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

            {/* FOOTER */}
            <div className="bg-secondary/60 border-t border-border px-5 sm:px-7 py-[16px]">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-[11px] text-foreground font-body font-light shrink-0 whitespace-nowrap leading-snug tracking-wide">
                  <span className="text-gold text-xs">🔒</span>
                  {t(s.form.protected, lang)}
                </div>

                <button
                  type="button"
                  onClick={handleBack}
                  aria-hidden={step === 1}
                  tabIndex={step === 1 ? -1 : 0}
                  className={`ml-auto h-11 px-4 rounded-md border border-border text-muted-foreground text-[13px] font-body hover:border-foreground/30 hover:text-foreground transition inline-flex items-center gap-1.5 ${step === 1 ? "invisible pointer-events-none ml-auto" : ""}`}
                >
                  <ArrowLeft size={14} /> {t(s.form.back, lang)}
                </button>

                <div>
                  {step < 3 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-highlight h-11 px-7 rounded-md bg-gradient-gold text-green-deep font-body font-semibold text-[13px] tracking-[0.02em] hover:opacity-90 active:scale-[0.98] transition inline-flex items-center gap-2 min-w-[200px] justify-center shadow-[0_8px_24px_-8px_hsl(var(--gold)/0.55)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50"
                    >
                      {t(s.form.continue, lang)} <ArrowRight size={15} />
                    </button>
                  )}
                </div>
              </div>

              <p className="mt-6 mb-2 text-[11px] text-muted-foreground font-body font-light leading-[1.6]">
                {t(s.form.legalNotice, lang)}{" "}
                <a href="#" className="text-foreground font-medium underline hover:opacity-80">{t(translations.footer.privacy, lang)}</a>{" "}
                {t(s.form.and, lang)} <a href="#" className="text-foreground font-medium underline hover:opacity-80">{t(s.form.termsOfUse, lang)}</a>.
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
