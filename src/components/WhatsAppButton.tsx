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
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_NUMBER = "17712017117";

const leadSchema = z.object({
  fullName: z.string().trim().min(1, "Obrigatório").max(200),
  email: z.string().trim().email("E-mail inválido").max(255),
  visa: z.string().trim().min(1, "Obrigatório").max(80),
  education: z.string().trim().min(1, "Obrigatório").max(120),
  experience: z.string().trim().min(1, "Obrigatório").max(40),
});

const clientSchema = z.object({
  fullName: z.string().trim().min(1, "Obrigatório").max(200),
  phone: z.string().trim().min(6, "Telefone inválido").max(40),
  visa: z.string().trim().min(1, "Obrigatório").max(80),
});

type FormState = z.infer<typeof leadSchema>;
type FormErrors = Partial<Record<keyof FormState, string>>;
type ClientState = z.infer<typeof clientSchema>;
type ClientErrors = Partial<Record<keyof ClientState, string>>;

const copy = {
  pt: {
    title: "Quer descobrir se você é elegível?",
    desc: "Responda 4 perguntas rápidas e a BIA inicia agora a sua análise preliminar de elegibilidade para o visto americano.",
    chooseTitle: "Como podemos te ajudar?",
    chooseDesc: "Selecione uma opção para continuar.",
    isClient: "Sou cliente Ebgreen",
    notClient: "Ainda não sou cliente",
    back: "Voltar",
    clientTitle: "Atendimento ao cliente",
    clientDesc: "Confirme seu nome e telefone para abrirmos seu suporte no WhatsApp.",
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
      { value: "EB-1A", label: "EB-1A" },
      { value: "EB-2 NIW", label: "EB-2 NIW" },
      { value: "EB-3", label: "EB-3" },
      { value: "EB-4", label: "EB-4" },
      { value: "EB-5", label: "EB-5" },
      { value: "CR-1", label: "CR-1" },
      { value: "E-2", label: "E-2" },
      { value: "F-1/F-2", label: "F-1/F-2" },
      { value: "L-1A", label: "L-1A" },
      { value: "K-1", label: "K-1" },
      { value: "O-1", label: "O-1" },
      { value: "R-1", label: "R-1" },
      { value: "Family-Based", label: "Family-Based" },
      { value: "AOS", label: "AOS" },
      { value: "Outros", label: "Outros / Não sei" },
    ],
    eduOptions: [
      { value: "Ensino Médio", label: "Ensino Médio" },
      { value: "Técnico", label: "Curso Técnico" },
      { value: "Graduação", label: "Graduação" },
      { value: "Pós-graduação", label: "Pós-graduação / MBA" },
      { value: "Mestrado", label: "Mestrado" },
      { value: "Doutorado", label: "Doutorado" },
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
    step1Title: "Conte sobre seu perfil",
    step1Desc: "3 perguntas rápidas para uma avaliação preliminar.",
    step2Title: "Quase lá!",
    step2Desc: "Como podemos te enviar a análise?",
    scorePending: "Preencha as 3 respostas para ver sua avaliação preliminar.",
    scoreReady: "Avaliação preliminar do seu perfil",
    scoreCta: "Continue para receber a análise completa no WhatsApp.",
    progress: (n: number, t: number) => `Etapa ${n} de ${t}`,
    greet: (n: string, e: string, v: string, ed: string, ex: string) =>
      `Olá! Tenho interesse em migrar para os Estados Unidos e gostaria de uma avaliação gratuita.\n\nE-mail: ${e}\nTipo de visto: ${v}\nFormação acadêmica: ${ed}\nExperiência profissional: ${ex}`,
    clientGreet: (n: string, p: string, v: string) =>
      `Olá, sou cliente Ebgreen e preciso de suporte com meu processo.\n\nSeguem minhas informações:\nNome: ${n}\nTelefone: ${p}\nTipo de visto: ${v}`,
  },
  en: {
    title: "Curious to know if you qualify?",
    desc: "Answer 4 quick questions and BIA will start your preliminary U.S. visa eligibility analysis right away.",
    chooseTitle: "How can we help you?",
    chooseDesc: "Select an option to continue.",
    isClient: "I'm an Ebgreen client",
    notClient: "I'm not a client yet",
    back: "Back",
    clientTitle: "Client support",
    clientDesc: "Confirm your name and phone to open your support on WhatsApp.",
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
      { value: "EB-1A", label: "EB-1A" },
      { value: "EB-2 NIW", label: "EB-2 NIW" },
      { value: "EB-3", label: "EB-3" },
      { value: "EB-4", label: "EB-4" },
      { value: "EB-5", label: "EB-5" },
      { value: "CR-1", label: "CR-1" },
      { value: "E-2", label: "E-2" },
      { value: "F-1/F-2", label: "F-1/F-2" },
      { value: "L-1A", label: "L-1A" },
      { value: "K-1", label: "K-1" },
      { value: "O-1", label: "O-1" },
      { value: "R-1", label: "R-1" },
      { value: "Family-Based", label: "Family-Based" },
      { value: "AOS", label: "AOS" },
      { value: "Other", label: "Other / Not sure" },
    ],
    eduOptions: [
      { value: "High School", label: "High School" },
      { value: "Technical", label: "Technical Course" },
      { value: "Bachelor's", label: "Bachelor's Degree" },
      { value: "Postgraduate", label: "Postgraduate / MBA" },
      { value: "Master's", label: "Master's Degree" },
      { value: "PhD", label: "PhD" },
    ],
    expOptions: [
      { value: "Less than 5 years", label: "Less than 5 years" },
      { value: "5 to 10 years", label: "5 to 10 years" },
      { value: "More than 10 years", label: "More than 10 years" },
    ],
    submit: "Continue to WhatsApp",
    sending: "Sending...",
    aria: "Chat on WhatsApp",
    greet: (n: string, e: string, v: string, ed: string, ex: string) =>
      `Hello! I'm interested in migrating to the United States and would like a free assessment.\n\nEmail: ${e}\nVisa type: ${v}\nEducation: ${ed}\nProfessional experience: ${ex}`,
    clientGreet: (n: string, p: string, v: string) =>
      `Hello, I'm an Ebgreen client and I need support with my case.\n\nHere is my information:\nName: ${n}\nPhone: ${p}\nVisa type: ${v}`,
  },
  es: {
    title: "¿Quiere descubrir si usted califica?",
    desc: "Responda 4 preguntas rápidas y BIA iniciará ahora su análisis preliminar de elegibilidad para la visa americana.",
    chooseTitle: "¿Cómo podemos ayudarle?",
    chooseDesc: "Seleccione una opción para continuar.",
    isClient: "Soy cliente Ebgreen",
    notClient: "Aún no soy cliente",
    back: "Volver",
    clientTitle: "Atención al cliente",
    clientDesc: "Confirme su nombre y teléfono para abrir su soporte en WhatsApp.",
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
      { value: "EB-1A", label: "EB-1A" },
      { value: "EB-2 NIW", label: "EB-2 NIW" },
      { value: "EB-3", label: "EB-3" },
      { value: "EB-4", label: "EB-4" },
      { value: "EB-5", label: "EB-5" },
      { value: "CR-1", label: "CR-1" },
      { value: "E-2", label: "E-2" },
      { value: "F-1/F-2", label: "F-1/F-2" },
      { value: "L-1A", label: "L-1A" },
      { value: "K-1", label: "K-1" },
      { value: "O-1", label: "O-1" },
      { value: "R-1", label: "R-1" },
      { value: "Family-Based", label: "Family-Based" },
      { value: "AOS", label: "AOS" },
      { value: "Otros", label: "Otros / No sé" },
    ],
    eduOptions: [
      { value: "Secundaria", label: "Secundaria" },
      { value: "Técnico", label: "Curso Técnico" },
      { value: "Pregrado", label: "Pregrado" },
      { value: "Posgrado", label: "Posgrado / MBA" },
      { value: "Maestría", label: "Maestría" },
      { value: "Doctorado", label: "Doctorado" },
    ],
    expOptions: [
      { value: "Menos de 5 años", label: "Menos de 5 años" },
      { value: "De 5 a 10 años", label: "De 5 a 10 años" },
      { value: "Más de 10 años", label: "Más de 10 años" },
    ],
    submit: "Continuar a WhatsApp",
    sending: "Enviando...",
    aria: "Hablar por WhatsApp",
    greet: (n: string, e: string, v: string, ed: string, ex: string) =>
      `¡Hola! Tengo interés en migrar a los Estados Unidos y me gustaría una evaluación gratuita.\n\nCorreo: ${e}\nTipo de visa: ${v}\nFormación académica: ${ed}\nExperiencia profesional: ${ex}`,
    clientGreet: (n: string, p: string, v: string) =>
      `Hola, soy cliente Ebgreen y necesito soporte con mi proceso.\n\nMis datos:\nNombre: ${n}\nTeléfono: ${p}\nTipo de visa: ${v}`,
  },
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  visa: "",
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
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const [client, setClient] = useState<ClientState>(initialClient);
  const [clientErrors, setClientErrors] = useState<ClientErrors>({});

  const resetAll = () => {
    setStep("choose");
    setForm(initialForm);
    setErrors({});
    setClient(initialClient);
    setClientErrors({});
    setSubmitting(false);
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
    const trigger = !!value || hash === "#whatsapp" || hash === "#wa";
    if (!trigger) return;

    setOpen(true);
    if (value === "client" || value === "cliente") setStep("client");
    else if (value === "lead" || value === "form" || value === "formulario") setStep("lead");
    else setStep("lead");
  }, []);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const updateClient = <K extends keyof ClientState>(key: K, value: ClientState[K]) => {
    setClient((prev) => ({ ...prev, [key]: value }));
    if (clientErrors[key]) setClientErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleLeadClick = () => {
    const parsed = leadSchema.safeParse(form);
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors;
      setErrors({
        fullName: fe.fullName?.[0],
        email: fe.email?.[0],
        visa: fe.visa?.[0],
        education: fe.education?.[0],
        experience: fe.experience?.[0],
      });
      return;
    }
    setErrors({});
    setSubmitting(true);

    const { fullName, email, visa, education, experience } = parsed.data;
    const parts = fullName.split(/\s+/);
    const firstName = parts[0] || fullName;
    const lastName = parts.slice(1).join(" ");
    const message = c.greet(fullName, email, visa, education, experience);

    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');

    void supabase.functions.invoke("send-contact-email", {
        body: {
          source: "whatsapp-popup-form",
          firstName,
          lastName,
          email,
          phoneCode: "",
          phone: "",
          visa,
          education,
          experience,
          message: "Lead via botão WhatsApp (pop-up)",
        },
      }).catch(() => undefined);

    setTimeout(() => {
      setSubmitting(false);
      setOpen(false);
      resetAll();
    }, 0);
  };

  const handleClientClick = () => {
    const parsed = clientSchema.safeParse(client);
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
          source: "whatsapp-popup-client",
          firstName,
          lastName,
          email: "",
          phoneCode: "",
          phone,
          visa,
          education: "",
          message: "Cliente Ebgreen solicitou suporte via botão WhatsApp",
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
                  onClick={() => setStep("client")}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-body font-semibold h-12"
                >
                  {c.isClient}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("lead")}
                  className="w-full font-body font-semibold h-12"
                >
                  {c.notClient}
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

          {step === "lead" && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">{c.title}</DialogTitle>
                <DialogDescription className="font-body text-sm">{c.desc}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
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

                <div className="space-y-1.5">
                  <Label htmlFor="wa-visa" className="font-body">{c.visa} {req}</Label>
                  <Select value={form.visa} onValueChange={(v) => update("visa", v)}>
                    <SelectTrigger id="wa-visa" aria-invalid={!!errors.visa}>
                      <SelectValue placeholder={c.visaPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {c.visaOptions.map((o) => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.visa && <p className="text-xs text-destructive">{errors.visa}</p>}
                </div>

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
                    onClick={handleLeadClick}
                    className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-body font-semibold"
                  >
                    {submitting ? c.sending : c.submit}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WhatsAppButton;
