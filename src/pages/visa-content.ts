import { Award, Trophy, Globe2, Briefcase, Building2, GraduationCap, Users, DollarSign, Heart, Plane, BookOpen, Target, Sparkles, ShieldCheck, Rocket } from "lucide-react";
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
    role: "EB-1A — área de Engenharia",
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
    { icon: Target, title: "Auto-petição", desc: "Você mesmo apresenta o pedido — sem necessidade de empregador ou sponsor americano." },
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
    role: "EB-2 NIW — área de Medicina",
  },
  ctaTitle: "Seu trabalho serve ao interesse nacional dos EUA?",
  ctaDesc: "Receba uma análise personalizada da sua elegibilidade ao EB-2 NIW.",
  seoTitle: "Visto EB-2 NIW | Green Card por Interesse Nacional | EBGreen",
  seoDescription: "EB-2 NIW para profissionais qualificados. Sem oferta de emprego, sem PERM. Avaliação gratuita com especialistas.",
};

export const eb5Content: VisaLPContent = {
  visaId: "EB-5",
  badge: "Visto de Investidor",
  title: "Green Card EB-5",
  titleHighlight: "via Investimento",
  subtitle: "Residência permanente para investidores que aplicam capital em projetos aprovados nos Estados Unidos e geram empregos para a economia americana.",
  benefits: [
    { icon: DollarSign, title: "Investimento estruturado", desc: "Aplicação a partir de USD 800.000 em projetos qualificados, com retorno previsto." },
    { icon: Building2, title: "Sem necessidade de gestão diária", desc: "Em projetos via Regional Center, o investidor não precisa administrar o negócio." },
    { icon: Users, title: "Família com Green Card", desc: "Cônjuge e filhos menores de 21 anos recebem residência permanente." },
  ],
  socialProof: [
    { stat: "USD 800k", label: "Investimento mínimo" },
    { stat: "10", label: "Empregos gerados" },
    { stat: "+89%", label: "Aprovação EBGreen" },
  ],
  testimonial: {
    quote: "Estruturamos o EB-5 com total segurança jurídica. A EBGreen acompanhou desde a análise do projeto até a aprovação final. Excelência técnica.",
    author: "Investidor brasileiro",
    role: "EB-5 — Regional Center",
  },
  ctaTitle: "Pronto para investir e morar nos EUA?",
  ctaDesc: "Conversamos sobre projetos qualificados, estrutura tributária e o caminho para o Green Card.",
  seoTitle: "Visto EB-5 | Green Card por Investimento nos EUA | EBGreen",
  seoDescription: "EB-5: Green Card via investimento a partir de USD 800k. Assessoria completa do projeto à aprovação. Consulta gratuita.",
};

export const trabalhoContent: VisaLPContent = {
  visaId: "H-1B / L-1",
  badge: "Vistos de Trabalho",
  title: "Vistos de Trabalho",
  titleHighlight: "H-1B, L-1 e O-1",
  subtitle: "Oportunidade de trabalhar legalmente nos EUA com visto patrocinado por empresa americana ou transferência interna de empresa multinacional.",
  benefits: [
    { icon: Briefcase, title: "H-1B para profissionais", desc: "Visto para ocupações especializadas com bacharelado ou superior na área específica." },
    { icon: Building2, title: "L-1 para executivos", desc: "Transferência intracompany para gestores e especialistas com no mínimo 1 ano na empresa." },
    { icon: Trophy, title: "O-1 para talentos", desc: "Para profissionais com habilidade extraordinária — alternativa rápida ao EB-1A." },
  ],
  socialProof: [
    { stat: "+89%", label: "Taxa de aprovação" },
    { stat: "3", label: "Tipos de visto" },
    { stat: "10+", label: "Anos de experiência" },
  ],
  testimonial: {
    quote: "Minha empresa precisava me transferir para o escritório de Miami rapidamente. A EBGreen processou o L-1 em tempo recorde. Excelente.",
    author: "Executiva de Tecnologia",
    role: "L-1A — São Paulo → Miami",
  },
  ctaTitle: "Quer trabalhar legalmente nos EUA?",
  ctaDesc: "Avaliamos qual visto de trabalho melhor se encaixa no seu perfil e empresa.",
  seoTitle: "Visto de Trabalho EUA | H-1B, L-1, O-1 | EBGreen",
  seoDescription: "Vistos de trabalho para os EUA: H-1B, L-1 e O-1. Assessoria completa para profissionais e empresas. Consulta gratuita.",
};

export const estudanteContent: VisaLPContent = {
  visaId: "F-1",
  badge: "Visto de Estudante",
  title: "Visto F-1",
  titleHighlight: "para estudar nos EUA",
  subtitle: "Estude em universidades, colleges, escolas de idiomas e programas técnicos americanos com o visto F-1, com possibilidade de trabalho pós-formatura.",
  benefits: [
    { icon: BookOpen, title: "Educação de elite", desc: "Acesso às melhores universidades e programas acadêmicos do mundo." },
    { icon: Briefcase, title: "OPT pós-formatura", desc: "Até 3 anos trabalhando legalmente nos EUA após concluir o curso (carreiras STEM)." },
    { icon: Plane, title: "Caminho para o Green Card", desc: "Estratégia de transição F-1 → H-1B → Green Card construída desde o início." },
  ],
  socialProof: [
    { stat: "3 anos", label: "OPT para STEM" },
    { stat: "+89%", label: "Aprovação EBGreen" },
    { stat: "100%", label: "Atendimento personalizado" },
  ],
  testimonial: {
    quote: "Recebi orientação completa: escolha do programa, carta SEVIS, entrevista no consulado e plano para a fase OPT. Aprovado de primeira.",
    author: "Estudante de Engenharia",
    role: "F-1 — Universidade na Flórida",
  },
  ctaTitle: "Comece sua jornada acadêmica nos EUA",
  ctaDesc: "Planejamos seu visto F-1 com visão de longo prazo: estudo, OPT e residência permanente.",
  seoTitle: "Visto F-1 | Estudar nos EUA | OPT e Green Card | EBGreen",
  seoDescription: "Visto F-1 para estudar nos EUA. Assessoria completa do SEVIS ao OPT. Estratégia de longo prazo para Green Card. Consulta gratuita.",
};

export const familiarContent: VisaLPContent = {
  visaId: "Family-Based",
  badge: "Green Card Familiar",
  title: "Green Card Familiar",
  titleHighlight: "Reunificação",
  subtitle: "Para cônjuges, filhos, pais e irmãos de cidadãos americanos ou residentes permanentes legais. Reunifique sua família com segurança jurídica.",
  benefits: [
    { icon: Heart, title: "Cônjuge de americano", desc: "Processo prioritário e mais ágil para casados com cidadãos dos EUA (IR-1/CR-1)." },
    { icon: Users, title: "Pais e filhos", desc: "Familiares imediatos de cidadãos têm fila menor e processo mais simplificado." },
    { icon: ShieldCheck, title: "Suporte completo", desc: "Acompanhamos da petição I-130 até o consulado ou ajuste de status nos EUA." },
  ],
  socialProof: [
    { stat: "+89%", label: "Taxa de aprovação" },
    { stat: "100%", label: "Casos acompanhados" },
    { stat: "10+", label: "Anos de experiência" },
  ],
  testimonial: {
    quote: "A EBGreen cuidou de cada detalhe do processo do meu marido americano. Documentação impecável e entrevista consular tranquila. Recomendo.",
    author: "Cliente aprovada",
    role: "CR-1 — Cônjuge de cidadão americano",
  },
  ctaTitle: "Reúna sua família nos Estados Unidos",
  ctaDesc: "Avaliamos o melhor caminho de petição familiar baseado no seu vínculo e situação atual.",
  seoTitle: "Green Card Familiar | Visto Family-Based | EBGreen",
  seoDescription: "Green Card familiar para cônjuges, filhos, pais e irmãos. Petição I-130 com assessoria completa. Consulta gratuita.",
};
