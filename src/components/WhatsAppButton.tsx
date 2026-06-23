import { useEffect, useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PhoneCodeSelector from "@/components/PhoneCodeSelector";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_NUMBER = "17712017117";

const errorMessages = {
  pt: {
    required: "Campo obrigatório",
    nameMin: "Informe seu nome completo",
    phoneCode: "Selecione o DDI",
    phoneInvalid: "Telefone inválido",
    emailInvalid: "E-mail inválido",
  },
  en: {
    required: "Required field",
    nameMin: "Enter your full name",
    phoneCode: "Select the country code",
    phoneInvalid: "Invalid phone",
    emailInvalid: "Invalid email",
  },
  es: {
    required: "Campo obligatorio",
    nameMin: "Ingrese su nombre completo",
    phoneCode: "Seleccione el código de país",
    phoneInvalid: "Teléfono inválido",
    emailInvalid: "Correo inválido",
  },
} as const;

const buildLeadSchema = (lang: "pt" | "en" | "es") => {
  const m = errorMessages[lang];
  return z.object({
    fullName: z.string().trim().min(3, m.nameMin).max(200),
    phoneCode: z.string().trim().min(1, m.phoneCode).max(8),
    phone: z.string().trim().min(6, m.phoneInvalid).max(40).regex(/^[\d\s()+\-.]+$/, m.phoneInvalid),
    email: z.string().trim().min(1, m.required).email(m.emailInvalid).max(255),
    education: z.string().trim().min(1, m.required).max(120),
    experience: z.string().trim().min(1, m.required).max(40),
  });
};

const buildClientSchema = (lang: "pt" | "en" | "es") => {
  const m = errorMessages[lang];
  return z.object({
    fullName: z.string().trim().min(3, m.nameMin).max(200),
    phone: z.string().trim().min(6, m.phoneInvalid).max(40).regex(/^[\d\s()+\-.]+$/, m.phoneInvalid),
    visa: z.string().trim().min(1, m.required).max(80),
  });
};

type FormState = {
  fullName: string;
  phoneCode: string;
  phone: string;
  email: string;
  education: string;
  experience: string;
};
type FormErrors = Partial<Record<keyof FormState, string>>;
type ClientState = {
  fullName: string;
  phone: string;
  visa: string;
};
type ClientErrors = Partial<Record<keyof ClientState, string>>;

const normalize = (v: string) =>
  v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

const isLowQualification = (education: string, experience: string) => {
  const ed = normalize(education);
  const ex = normalize(experience);
  const isHighSchool = ed.includes("ensino medio") || ed.includes("high school") || ed.includes("secundaria");
  const isTechnical = ed.includes("tecnico") || ed.includes("tecnologo") || ed.includes("technical") || ed.includes("technologist");
  const lessThan5 = ex.includes("menos de 5") || ex.includes("less than 5");
  return isHighSchool || (isTechnical && lessThan5);
};

const blockCopy = {
  pt: {
    sponsorTitle: "Antes de continuar, precisamos confirmar um ponto importante:",
    sponsorQuestion: "Você já possui um <strong>sponsor</strong> (empregador americano disposto a contratá-lo) ou está em negociação com uma empresa nos EUA?",
    yes: "Sim, tenho sponsor",
    no: "Ainda não tenho",
    declineTitle: "Agradecemos seu interesse 💚",
    declineBody: "Para perfis como o seu, o caminho mais viável é a categoria <strong>EB-3</strong>, que exige uma <strong>oferta de emprego permanente nos EUA</strong> de um empregador disposto a patrociná-lo (sponsor). Sem esse requisito, não conseguimos dar andamento ao processo neste momento.<br/><br/>Assim que você conseguir um sponsor - ou estiver em negociação com uma empresa americana -, retorne aqui e teremos prazer em cuidar de todo o processo para você.",
    review: "Revisar resposta",
    sponsorOk: "Perfeito! Como você já possui um sponsor, podemos avançar.",
  },
  en: {
    sponsorTitle: "Before continuing, we need to confirm one important point:",
    sponsorQuestion: "Do you already have a <strong>sponsor</strong> (a U.S. employer willing to hire you) or are you negotiating with a U.S. company?",
    yes: "Yes, I have a sponsor",
    no: "Not yet",
    declineTitle: "Thank you for your interest 💚",
    declineBody: "For profiles like yours, the most viable path is the <strong>EB-3</strong> category, which requires a <strong>permanent job offer in the U.S.</strong> from an employer willing to sponsor you. Without this requirement, we cannot move the process forward at this time.<br/><br/>As soon as you secure a sponsor - or are negotiating with a U.S. company - come back and we'll be glad to handle the entire process for you.",
    review: "Review my answer",
    sponsorOk: "Great! Since you already have a sponsor, we can move forward.",
  },
  es: {
    sponsorTitle: "Antes de continuar, necesitamos confirmar un punto importante:",
    sponsorQuestion: "¿Ya tiene un <strong>sponsor</strong> (un empleador estadounidense dispuesto a contratarlo) o está negociando con una empresa en EE. UU.?",
    yes: "Sí, tengo sponsor",
    no: "Aún no tengo",
    declineTitle: "Agradecemos su interés 💚",
    declineBody: "Para perfiles como el suyo, el camino más viable es la categoría <strong>EB-3</strong>, que exige una <strong>oferta de empleo permanente en EE. UU.</strong> de un empleador dispuesto a patrocinarlo (sponsor). Sin ese requisito, no podemos dar continuidad al proceso en este momento.<br/><br/>En cuanto consiga un sponsor - o esté negociando con una empresa estadounidense -, vuelva aquí y con gusto cuidaremos de todo el proceso por usted.",
    review: "Revisar respuesta",
    sponsorOk: "¡Perfecto! Como ya tiene un sponsor, podemos avanzar.",
  },
} as const;



const copy = {
  pt: {
    title: "Quer descobrir se você é elegível?",
    desc: "Responda algumas perguntas rápidas e a BIA inicia agora a sua análise preliminar de elegibilidade para o visto americano.",
    chooseTitle: "Como podemos te ajudar?",
    chooseDesc: "Selecione uma opção para continuar.",
    isClient: "Sou cliente Ebgreen",
    notClient: "Quero falar com um especialista",
    back: "Voltar",
    clientTitle: "Atendimento ao cliente",
    clientDesc: "Confirme seu nome e telefone para abrirmos seu suporte no WhatsApp.",
    clientOnlyWarning: "Atenção: este canal é exclusivo para clientes Ebgreen com processo ativo. Se você ainda não é cliente, volte e selecione \"Ainda não sou cliente\".",
    fullName: "Nome completo",
    phone: "Telefone (com DDI/DDD)",
    email: "E-mail",
    visa: "Tipo de visto",
    education: "Formação acadêmica",
    experience: "Experiência profissional",
    visaPlaceholder: "Selecione",
    eduPlaceholder: "Selecione",
    expPlaceholder: "Selecione o tempo",
    visaOptions: [
      { value: "Ainda não sei", label: "Ainda não sei" },
      { value: "EB-1A", label: "EB-1A" },
      { value: "EB-2 NIW", label: "EB-2 NIW" },
      { value: "EB-3", label: "EB-3" },
      { value: "EB-4", label: "EB-4" },
      { value: "EB-5", label: "EB-5" },
      { value: "E-2", label: "E-2" },
      { value: "F-1/F-2", label: "F-1/F-2" },
      { value: "L-1A", label: "L-1A" },
      { value: "O-1", label: "O-1" },
      { value: "R-1", label: "R-1" },
      { value: "Family-Based", label: "Family-Based" },
    ],
    eduOptions: [
      { value: "Ensino Médio", label: "Ensino Médio" },
      { value: "Técnico / Tecnólogo", label: "Técnico / Tecnólogo" },
      { value: "Nível Superior / Bacharelado", label: "Nível Superior / Bacharelado" },
      { value: "Mestrado", label: "Mestrado" },
      { value: "Doutorado", label: "Doutorado" },
      { value: "Pós-Doutorado", label: "Pós-Doutorado" },
    ],
    expOptions: [
      { value: "Menos de 5 anos", label: "Menos de 5 anos" },
      { value: "De 5 a 10 anos", label: "De 5 a 10 anos" },
      { value: "Mais de 10 anos", label: "Mais de 10 anos" },
    ],
    submit: "Continuar para WhatsApp",
    sending: "Enviando...",
    aria: "Falar pelo WhatsApp",
    next: "Continuar",
    step1Title: "Seus dados de contato",
    step1Desc: "Como podemos falar com você?",
    step2Title: "Conte sobre seu perfil",
    step2Desc: "Para uma avaliação preliminar.",
    progress: (n: number, t: number) => `Etapa ${n} de ${t}`,
    greet: (n: string, p: string, e: string, ed: string, ex: string) =>
      `Olá! Vim pelo Instagram e tenho interesse em migrar para os Estados Unidos.\n\nNome: ${n}\nTelefone: ${p}\nE-mail: ${e}\nFormação acadêmica: ${ed}\nExperiência profissional: ${ex}`,
    clientGreet: (n: string, p: string, v: string) =>
      `Olá, sou cliente Ebgreen e preciso de suporte com meu processo.\n\nSeguem minhas informações:\nNome: ${n}\nTelefone: ${p}\nTipo de visto: ${v}`,
  },
  en: {
    title: "Curious to know if you qualify?",
    desc: "Answer a few quick questions and BIA will start your preliminary U.S. visa eligibility analysis right away.",
    chooseTitle: "How can we help you?",
    chooseDesc: "Select an option to continue.",
    isClient: "I'm an Ebgreen client",
    notClient: "I want to talk to a specialist",
    back: "Back",
    clientTitle: "Client support",
    clientDesc: "Confirm your name and phone to open your support on WhatsApp.",
    clientOnlyWarning: "Note: this channel is exclusively for Ebgreen clients with an active case. If you are not a client yet, please go back and choose \"I'm not a client yet\".",
    fullName: "Full name",
    phone: "Phone (with country code)",
    email: "Email",
    visa: "Visa type",
    education: "Education",
    experience: "Professional experience",
    visaPlaceholder: "Select",
    eduPlaceholder: "Select",
    expPlaceholder: "Select years",
    visaOptions: [
      { value: "I don't know yet", label: "I don't know yet" },
      { value: "EB-1A", label: "EB-1A" },
      { value: "EB-2 NIW", label: "EB-2 NIW" },
      { value: "EB-3", label: "EB-3" },
      { value: "EB-4", label: "EB-4" },
      { value: "EB-5", label: "EB-5" },
      { value: "E-2", label: "E-2" },
      { value: "F-1/F-2", label: "F-1/F-2" },
      { value: "L-1A", label: "L-1A" },
      { value: "O-1", label: "O-1" },
      { value: "R-1", label: "R-1" },
      { value: "Family-Based", label: "Family-Based" },
    ],
    eduOptions: [
      { value: "High School", label: "High School" },
      { value: "Technical / Technologist", label: "Technical / Technologist" },
      { value: "Bachelor's Degree", label: "Bachelor's Degree" },
      { value: "Master's Degree", label: "Master's Degree" },
      { value: "PhD", label: "PhD" },
      { value: "Postdoctoral", label: "Postdoctoral" },
    ],
    expOptions: [
      { value: "Less than 5 years", label: "Less than 5 years" },
      { value: "5 to 10 years", label: "5 to 10 years" },
      { value: "More than 10 years", label: "More than 10 years" },
    ],
    submit: "Continue to WhatsApp",
    sending: "Sending...",
    aria: "Chat on WhatsApp",
    next: "Continue",
    step1Title: "Your contact details",
    step1Desc: "How can we reach you?",
    step2Title: "Tell us about your profile",
    step2Desc: "For a preliminary assessment.",
    progress: (n: number, t: number) => `Step ${n} of ${t}`,
    greet: (n: string, p: string, e: string, ed: string, ex: string) =>
      `Hello! I came from Instagram and I'm interested in migrating to the United States.\n\nName: ${n}\nPhone: ${p}\nEmail: ${e}\nEducation: ${ed}\nProfessional experience: ${ex}`,
    clientGreet: (n: string, p: string, v: string) =>
      `Hello, I'm an Ebgreen client and I need support with my case.\n\nHere is my information:\nName: ${n}\nPhone: ${p}\nVisa type: ${v}`,
  },
  es: {
    title: "¿Quiere descubrir si usted califica?",
    desc: "Responda algunas preguntas rápidas y BIA iniciará ahora su análisis preliminar de elegibilidad para la visa americana.",
    chooseTitle: "¿Cómo podemos ayudarle?",
    chooseDesc: "Seleccione una opción para continuar.",
    isClient: "Soy cliente Ebgreen",
    notClient: "Quiero hablar con un especialista",
    back: "Volver",
    clientTitle: "Atención al cliente",
    clientDesc: "Confirme su nombre y teléfono para abrir su soporte en WhatsApp.",
    clientOnlyWarning: "Atención: este canal es exclusivo para clientes Ebgreen con proceso activo. Si aún no es cliente, vuelva y seleccione \"Aún no soy cliente\".",
    fullName: "Nombre completo",
    phone: "Teléfono (con código de país)",
    email: "Correo electrónico",
    visa: "Tipo de visa",
    education: "Formación académica",
    experience: "Experiencia profesional",
    visaPlaceholder: "Seleccione",
    eduPlaceholder: "Seleccione",
    expPlaceholder: "Seleccione el tiempo",
    visaOptions: [
      { value: "Aún no sé", label: "Aún no sé" },
      { value: "EB-1A", label: "EB-1A" },
      { value: "EB-2 NIW", label: "EB-2 NIW" },
      { value: "EB-3", label: "EB-3" },
      { value: "EB-4", label: "EB-4" },
      { value: "EB-5", label: "EB-5" },
      { value: "E-2", label: "E-2" },
      { value: "F-1/F-2", label: "F-1/F-2" },
      { value: "L-1A", label: "L-1A" },
      { value: "O-1", label: "O-1" },
      { value: "R-1", label: "R-1" },
      { value: "Family-Based", label: "Family-Based" },
    ],
    eduOptions: [
      { value: "Secundaria", label: "Secundaria" },
      { value: "Técnico / Tecnólogo", label: "Técnico / Tecnólogo" },
      { value: "Nivel Superior / Bachillerato", label: "Nivel Superior / Bachillerato" },
      { value: "Maestría", label: "Maestría" },
      { value: "Doctorado", label: "Doctorado" },
      { value: "Posdoctorado", label: "Posdoctorado" },
    ],
    expOptions: [
      { value: "Menos de 5 años", label: "Menos de 5 años" },
      { value: "De 5 a 10 años", label: "De 5 a 10 años" },
      { value: "Más de 10 años", label: "Más de 10 años" },
    ],
    submit: "Continuar a WhatsApp",
    sending: "Enviando...",
    aria: "Hablar por WhatsApp",
    next: "Continuar",
    step1Title: "Sus datos de contacto",
    step1Desc: "¿Cómo podemos contactarle?",
    step2Title: "Cuéntanos sobre tu perfil",
    step2Desc: "Para una evaluación preliminar.",
    progress: (n: number, t: number) => `Paso ${n} de ${t}`,
    greet: (n: string, p: string, e: string, ed: string, ex: string) =>
      `¡Hola! Vine por Instagram y tengo interés en migrar a los Estados Unidos.\n\nNombre: ${n}\nTeléfono: ${p}\nCorreo: ${e}\nFormación académica: ${ed}\nExperiencia profesional: ${ex}`,
    clientGreet: (n: string, p: string, v: string) =>
      `Hola, soy cliente Ebgreen y necesito soporte con mi proceso.\n\nMis datos:\nNombre: ${n}\nTeléfono: ${p}\nTipo de visa: ${v}`,
  },
};

const initialForm: FormState = {
  fullName: "",
  phoneCode: "+1",
  phone: "",
  email: "",
  education: "",
  experience: "",
};

const initialClient: ClientState = {
  fullName: "",
  phone: "",
  visa: "",
};

type Step = "choose" | "client" | "lead";

const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const WhatsAppButton = () => {
  const { lang } = useLanguage();
  const c = copy[lang];

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("choose");
  const [leadStep, setLeadStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const [client, setClient] = useState<ClientState>(initialClient);
  const [clientErrors, setClientErrors] = useState<ClientErrors>({});
  const [sponsorAnswer, setSponsorAnswer] = useState<"yes" | "no" | null>(null);

  const resetAll = () => {
    setStep("choose");
    setLeadStep(1);
    setForm(initialForm);
    setErrors({});
    setClient(initialClient);
    setClientErrors({});
    setSubmitting(false);
    setSponsorAnswer(null);
  };


  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) resetAll();
  };

  // Deep-link: open WhatsApp form via URL (?whatsapp=1, ?wa=1, ?wa=lead, ?wa=client, or hash #whatsapp)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const value = (params.get("whatsapp") || params.get("wa") || "").toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    const isLeadPath =
      path === "/quero-migrar-para-os-eua" || path.endsWith("/quero-migrar-para-os-eua");
    const trigger = !!value || hash === "#whatsapp" || hash === "#wa" || isLeadPath;
    if (!trigger) return;

    setOpen(true);
    if (value === "client" || value === "cliente") setStep("client");
    else setStep("lead");
  }, []);

  // Custom event: allow other components to open the WhatsApp lead form directly
  useEffect(() => {
    const openLead = () => {
      setOpen(true);
      setStep("lead");
    };
    window.addEventListener("open-whatsapp-lead", openLead);
    return () => window.removeEventListener("open-whatsapp-lead", openLead);
  }, []);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (key === "education" || key === "experience") setSponsorAnswer(null);
  };


  const updateClient = <K extends keyof ClientState>(key: K, value: ClientState[K]) => {
    setClient((prev) => ({ ...prev, [key]: value }));
    if (clientErrors[key]) setClientErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleLeadClick = () => {
    const parsed = buildLeadSchema(lang).safeParse(form);
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors;
      setErrors({
        fullName: fe.fullName?.[0],
        phoneCode: fe.phoneCode?.[0],
        phone: fe.phone?.[0],
        email: fe.email?.[0],
        education: fe.education?.[0],
        experience: fe.experience?.[0],
      });
      return;
    }
    setErrors({});

    // Block low qualification (Ensino Médio or Técnico + Menos de 5 anos)
    // unless the user confirmed they already have a sponsor.
    if (isLowQualification(form.education, form.experience) && sponsorAnswer !== "yes") {
      return;
    }

    setSubmitting(true);


    const { fullName, phoneCode, phone, email, education, experience } = parsed.data;
    const parts = fullName.split(/\s+/);
    const firstName = parts[0] || fullName;
    const lastName = parts.slice(1).join(" ");
    const fullPhone = `${phoneCode} ${phone}`.trim();
    const message = c.greet(fullName, fullPhone, email, education, experience);

    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');

    void supabase.functions.invoke("send-contact-email", {
        body: {
          source: "whatsapp_new_lead",
          firstName,
          lastName,
          email,
          phoneCode,
          phone,
          visa: "",
          education,
          experience,
          message: "Olá! Tenho interesse em migrar para os Estados Unidos e gostaria de uma avaliação gratuita.",
        },
      })
        .then(({ data }) => {
          console.info('[lead/whatsapp-popup] qualification:', data?.qualification, '| reason:', data?.qualificationReason, '| kommo:', data?.kommo);
        })
        .catch(() => undefined);

    setTimeout(() => {
      setSubmitting(false);
      setOpen(false);
      resetAll();
    }, 0);
  };

  const handleClientClick = () => {
    const parsed = buildClientSchema(lang).safeParse(client);
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors;
      setClientErrors({
        fullName: fe.fullName?.[0],
        phone: fe.phone?.[0],
        visa: fe.visa?.[0],
      });
      return;
    }
    setClientErrors({});
    setSubmitting(true);

    const { fullName, phone, visa } = parsed.data;
    const parts = fullName.split(/\s+/);
    const firstName = parts[0] || fullName;
    const lastName = parts.slice(1).join(" ");

    window.open(buildWhatsAppUrl(c.clientGreet(fullName, phone, visa)), '_blank', 'noopener,noreferrer');

    void supabase.functions.invoke("send-contact-email", {
        body: {
          source: "whatsapp_existing_customer",
          firstName,
          lastName,
          email: "",
          phoneCode: "",
          phone,
          visa,
          education: "",
          message: "Olá, já sou cliente Ebgreen, e gostaria de atendimento.",
        },
      }).catch(() => undefined);

    setTimeout(() => {
      setSubmitting(false);
      setOpen(false);
      resetAll();
    }, 0);
  };

  const req = <span className="text-destructive">*</span>;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full p-3.5 shadow-lg transition-colors animate-bounce-slow"
        aria-label={c.aria}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          {step === "choose" && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">{c.chooseTitle}</DialogTitle>
                <DialogDescription className="font-body text-sm">{c.chooseDesc}</DialogDescription>
              </DialogHeader>

              <div className="grid gap-3 pt-2">
                <Button
                  type="button"
                  onClick={() => setStep("lead")}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-body font-semibold h-12"
                >
                  {c.notClient}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("client")}
                  className="w-full font-body font-semibold h-12"
                >
                  {c.isClient}
                </Button>
              </div>
            </>
          )}

          {step === "client" && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">{c.clientTitle}</DialogTitle>
                <DialogDescription className="font-body text-sm">{c.clientDesc}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div
                  role="alert"
                  className="flex gap-2 rounded-md border border-gold/40 bg-gold/10 p-3 text-xs font-body text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-gold">
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <span>{c.clientOnlyWarning}</span>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="wa-client-name" className="font-body">{c.fullName} {req}</Label>
                  <Input
                    id="wa-client-name"
                    value={client.fullName}
                    onChange={(e) => updateClient("fullName", e.target.value)}
                    maxLength={200}
                    autoComplete="name"
                    required
                    aria-invalid={!!clientErrors.fullName}
                  />
                  {clientErrors.fullName && <p className="text-xs text-destructive">{clientErrors.fullName}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="wa-client-phone" className="font-body">{c.phone} {req}</Label>
                  <Input
                    id="wa-client-phone"
                    type="tel"
                    value={client.phone}
                    onChange={(e) => updateClient("phone", e.target.value)}
                    maxLength={40}
                    autoComplete="tel"
                    required
                    aria-invalid={!!clientErrors.phone}
                  />
                  {clientErrors.phone && <p className="text-xs text-destructive">{clientErrors.phone}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="wa-client-visa" className="font-body">{c.visa} {req}</Label>
                  <Select value={client.visa} onValueChange={(v) => updateClient("visa", v)}>
                    <SelectTrigger id="wa-client-visa" aria-invalid={!!clientErrors.visa}>
                      <SelectValue placeholder={c.visaPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {c.visaOptions.map((o) => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {clientErrors.visa && <p className="text-xs text-destructive">{clientErrors.visa}</p>}
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep("choose")}
                    className="flex-1 font-body"
                  >
                    {c.back}
                  </Button>
                  <Button
                    type="button"
                    disabled={submitting}
                    onClick={handleClientClick}
                    className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-body font-semibold"
                  >
                    {submitting ? c.sending : c.submit}
                  </Button>
                </div>
              </div>
            </>
          )}

          {step === "lead" && (() => {
            const fullName = form.fullName ?? "";
            const phone = form.phone ?? "";
            const email = form.email ?? "";
            const step1Filled = !!fullName.trim() && !!phone.trim() && !!email.trim();
            const handleNext = () => {
              const m = errorMessages[lang];
              const partial: FormErrors = {
                fullName: fullName.trim().length < 3 ? m.nameMin : undefined,
                phone:
                  phone.trim().length < 6 || !/^[\d\s()+\-.]+$/.test(phone.trim())
                    ? m.phoneInvalid
                    : undefined,
                email: !/^\S+@\S+\.\S+$/.test(email.trim()) ? m.emailInvalid : undefined,
              };
              if (partial.fullName || partial.phone || partial.email) {
                setErrors((prev) => ({ ...prev, ...partial }));
                return;
              }
              setErrors({});
              setLeadStep(2);
            };
            return (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">
                  {leadStep === 1 ? c.step1Title : c.step2Title}
                </DialogTitle>
                <DialogDescription className="font-body text-sm">
                  {leadStep === 1 ? c.step1Desc : c.step2Desc}
                </DialogDescription>
              </DialogHeader>

              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-body text-foreground/50">
                    {c.progress(leadStep, 2)}
                  </span>
                  <span className="text-[11px] font-body text-foreground/50">
                    {leadStep === 1 ? "50%" : "100%"}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold transition-all duration-500 ease-out"
                    style={{ width: leadStep === 1 ? "50%" : "100%" }}
                  />
                </div>
              </div>

              {leadStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-1.5">
                    <Label htmlFor="wa-name" className="font-body">{c.fullName} {req}</Label>
                    <Input
                      id="wa-name"
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      maxLength={200}
                      autoComplete="name"
                      required
                      aria-invalid={!!errors.fullName}
                    />
                    {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="wa-phone" className="font-body">{c.phone} {req}</Label>
                    <div className="flex items-stretch rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
                      <PhoneCodeSelector
                        value={form.phoneCode}
                        onChange={(v) => update("phoneCode", v)}
                      />
                      <Input
                        id="wa-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        maxLength={40}
                        autoComplete="tel"
                        required
                        aria-invalid={!!errors.phone}
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-l-none"
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="wa-email" className="font-body">{c.email} {req}</Label>
                    <Input
                      id="wa-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      maxLength={255}
                      autoComplete="email"
                      required
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep("choose")}
                      className="flex-1 font-body"
                    >
                      {c.back}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!step1Filled}
                      className="flex-1 bg-gold hover:bg-gold/90 text-green-deep font-body font-semibold disabled:opacity-50"
                    >
                      {c.next}
                    </Button>
                  </div>
                </div>
              )}

              {leadStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-1.5">
                    <Label htmlFor="wa-edu" className="font-body">{c.education} {req}</Label>
                    <Select value={form.education} onValueChange={(v) => update("education", v)}>
                      <SelectTrigger id="wa-edu" aria-invalid={!!errors.education}>
                        <SelectValue placeholder={c.eduPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {c.eduOptions.map((o) => (
                          <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.education && <p className="text-xs text-destructive">{errors.education}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="wa-exp" className="font-body">{c.experience} {req}</Label>
                    <Select value={form.experience} onValueChange={(v) => update("experience", v)}>
                      <SelectTrigger id="wa-exp" aria-invalid={!!errors.experience}>
                        <SelectValue placeholder={c.expPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {c.expOptions.map((o) => (
                          <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.experience && <p className="text-xs text-destructive">{errors.experience}</p>}
                  </div>

                  {(() => {
                    const blocked = isLowQualification(form.education, form.experience);
                    const bc = blockCopy[lang];
                    if (blocked && form.education && form.experience) {
                      if (sponsorAnswer === null) {
                        return (
                          <div className="rounded-lg border border-gold/40 bg-gold/[0.04] p-4">
                            <p className="text-[13px] font-body font-semibold text-foreground mb-1">
                              {bc.sponsorTitle}
                            </p>
                            <p
                              className="text-[12.5px] text-muted-foreground font-body leading-relaxed mb-3"
                              dangerouslySetInnerHTML={{ __html: bc.sponsorQuestion }}
                            />
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button
                                type="button"
                                onClick={() => setSponsorAnswer("yes")}
                                className="flex-1 bg-brand-green hover:brightness-110 text-cream font-body font-semibold"
                              >
                                {bc.yes}
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setSponsorAnswer("no")}
                                className="flex-1 font-body font-semibold"
                              >
                                {bc.no}
                              </Button>
                            </div>
                          </div>
                        );
                      }
                      if (sponsorAnswer === "no") {
                        return (
                          <div className="rounded-lg border border-border bg-secondary/40 p-4">
                            <p className="font-display text-[15px] font-semibold text-foreground mb-2">
                              {bc.declineTitle}
                            </p>
                            <p
                              className="text-[12.5px] text-muted-foreground font-body leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: bc.declineBody }}
                            />
                            <button
                              type="button"
                              onClick={() => setSponsorAnswer(null)}
                              className="mt-3 text-[12px] text-brand-green font-body font-semibold underline hover:opacity-80"
                            >
                              {bc.review}
                            </button>
                          </div>
                        );
                      }
                      return (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-500/[0.08] border border-emerald-500/25">
                          <span className="text-[12px] text-emerald-700 font-body">{bc.sponsorOk}</span>
                        </div>
                      );
                    }
                    return null;
                  })()}

                  <div className="flex gap-2 pt-1">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setLeadStep(1)}
                      className="flex-1 font-body"
                    >
                      {c.back}
                    </Button>
                    {(() => {
                      const blocked = isLowQualification(form.education, form.experience);
                      const disableSubmit =
                        submitting ||
                        !form.education ||
                        !form.experience ||
                        (blocked && sponsorAnswer !== "yes");
                      return (
                        <Button
                          type="button"
                          disabled={disableSubmit}
                          onClick={handleLeadClick}
                          className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-body font-semibold disabled:opacity-50"
                        >
                          {submitting ? c.sending : c.submit}
                        </Button>
                      );
                    })()}
                  </div>
                </div>
              )}

            </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WhatsAppButton;
