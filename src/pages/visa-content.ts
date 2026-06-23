import { Trophy, Award, Rocket, Target, GraduationCap, Sparkles } from "lucide-react";
import type { VisaLPContent } from "@/components/VisaLandingPage";

export const eb1aContent: VisaLPContent = {
  visaId: "EB-1A",
  badge: "Habilidade Extraordinária",
  title: "Green Card EB-1A",
  titleHighlight: "para profissionais de elite",
  subtitle: "Para profissionais com habilidade extraordinária reconhecida internacionalmente. Sem necessidade de oferta de emprego ou patrocínio empresarial.",
  benefits: [
    { icon: Trophy, title: "Sem patrocinador", desc: "Você é o próprio peticionário. Não depende de empresa ou oferta de emprego nos EUA." },
    { icon: Rocket, title: "Processo mais rápido", desc: "Categoria com prioridade alta e fila reduzida em comparação a outras vias do Green Card." },
    { icon: Award, title: "Família incluída", desc: "Cônjuge e filhos menores de 21 anos recebem residência permanente junto com o titular." },
  ],
  socialProof: [
    { stat: "+89%", label: "Taxa de aprovação" },
    { stat: "10+", label: "Anos de experiência" },
    { stat: "100%", label: "Foco em imigração" },
  ],
  testimonial: {
    quote: "A equipe da EBGreen estruturou meu caso EB-1A com profundidade técnica. Cada critério foi documentado de forma estratégica. Aprovado sem RFE.",
    author: "Pesquisador aprovado",
    role: "EB-1A - área de Engenharia",
  },
  ctaTitle: "Descubra se você se enquadra no EB-1A",
  ctaDesc: "Avaliação gratuita do seu currículo, prêmios, publicações e reconhecimentos internacionais.",
  seoTitle: "Visto EB-1A | Green Card por Habilidade Extraordinária | EBGreen",
  seoDescription: "Especialistas em EB-1A. Conquiste o Green Card por habilidade extraordinária sem patrocinador. Avaliação gratuita. +89% aprovação.",
};

export const eb2niwContent: VisaLPContent = {
  visaId: "EB-2 NIW",
  badge: "Interesse Nacional dos EUA",
  title: "Green Card EB-2 NIW",
  titleHighlight: "Interesse Nacional",
  subtitle: "Para profissionais qualificados cujo trabalho beneficia o interesse nacional dos Estados Unidos. Dispensa oferta de emprego e certificação trabalhista.",
  benefits: [
    { icon: Target, title: "Auto-petição", desc: "Você mesmo apresenta o pedido - sem necessidade de empregador ou sponsor americano." },
    { icon: GraduationCap, title: "Para mestres e doutores", desc: "Ideal para profissionais com formação avançada ou habilidade excepcional na área." },
    { icon: Sparkles, title: "Sem PERM", desc: "Pula a etapa de certificação trabalhista, encurtando significativamente o cronograma." },
  ],
  socialProof: [
    { stat: "+89%", label: "Taxa de aprovação" },
    { stat: "3", label: "Continentes atendidos" },
    { stat: "10+", label: "Anos de experiência" },
  ],
  testimonial: {
    quote: "Eu tinha mestrado e experiência sólida, mas não sabia como provar 'interesse nacional'. A EBGreen montou a narrativa perfeita. Green Card aprovado.",
    author: "Profissional de Saúde",
    role: "EB-2 NIW - área de Medicina",
  },
  ctaTitle: "Seu trabalho serve ao interesse nacional dos EUA?",
  ctaDesc: "Receba uma análise personalizada da sua elegibilidade ao EB-2 NIW.",
  seoTitle: "Visto EB-2 NIW | Green Card por Interesse Nacional | EBGreen",
  seoDescription: "EB-2 NIW para profissionais qualificados. Sem oferta de emprego, sem PERM. Avaliação gratuita com especialistas.",
};
