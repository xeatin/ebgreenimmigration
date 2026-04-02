export type Language = "pt" | "en" | "es";

export const translations = {
  // Navbar
  nav: {
    topBar: {
      pt: "Escritório nos EUA — Orlando, FL | Miami, FL",
      en: "Office in the USA — Orlando, FL | Miami, FL",
      es: "Oficina en EE.UU. — Orlando, FL | Miami, FL",
    },
    home: { pt: "Início", en: "Home", es: "Inicio" },
    differentials: { pt: "Diferenciais", en: "Why Us", es: "Diferenciales" },
    services: { pt: "Serviços", en: "Services", es: "Servicios" },
    process: { pt: "Como Funciona", en: "How It Works", es: "Cómo Funciona" },
    about: { pt: "Sobre", en: "About", es: "Sobre" },
    contact: { pt: "Contato", en: "Contact", es: "Contacto" },
    cta: { pt: "Consulta Gratuita", en: "Free Consultation", es: "Consulta Gratuita" },
  },

  // Hero
  hero: {
    badge: {
      pt: "+92% de Taxa de Aprovação nos Processos",
      en: "+92% Approval Rate on Cases",
      es: "+92% de Tasa de Aprobación en los Procesos",
    },
    title1: { pt: "Conquiste seu", en: "Get your", es: "Conquista tu" },
    titleHighlight: { pt: "Green Card", en: "Green Card", es: "Green Card" },
    title2: { pt: "com a estratégia certa", en: "with the right strategy", es: "con la estrategia correcta" },
    title3: { pt: "de quem realmente entende.", en: "from those who truly understand.", es: "de quienes realmente entienden." },
    subtitle: {
      pt: "Assessoria completa em EB-1A, EB-2 NIW, Green Cards e Vistos de Trabalho com rigor técnico, estratégia individualizada e histórico consistente de aprovações.",
      en: "Full advisory on EB-1A, EB-2 NIW, Green Cards and Work Visas with technical rigor, individualized strategy, and a consistent track record of approvals.",
      es: "Asesoría completa en EB-1A, EB-2 NIW, Green Cards y Visas de Trabajo con rigor técnico, estrategia individualizada e historial consistente de aprobaciones.",
    },
    ctaPrimary: { pt: "Iniciar Minha Jornada", en: "Start My Journey", es: "Iniciar Mi Camino" },
    ctaSecondary: { pt: "Explorar Serviços", en: "Explore Services", es: "Explorar Servicios" },
    stats: {
      families: { pt: "Foco em Imigração", en: "Immigration Focus", es: "Enfoque en Inmigración" },
      success: { pt: "Taxa de Aprovação", en: "Approval Rate", es: "Tasa de Aprobación" },
      experience: { pt: "Experiência em imigração", en: "Immigration experience", es: "Experiencia en inmigración" },
      offices: { pt: "Presença nos EUA e Brasil", en: "Presence in the USA and Brazil", es: "Presencia en EE.UU. y Brasil" },
      officesSubtitle: { pt: "", en: "", es: "" },
    },
  },

  // Differentials
  diff: {
    sectionLabel: { pt: "Diferenciais", en: "Why Choose Us", es: "Diferenciales" },
    sectionTitle: { pt: "Nossos resultados falam por nós", en: "Our results speak for themselves", es: "Nuestros resultados hablan por nosotros" },
    items: [
      {
        title: { pt: "Taxa de Sucesso", en: "Success Rate", es: "Tasa de Éxito" },
        description: {
          pt: "Uma das maiores taxas de aprovação do mercado de assessoria imigratória para os Estados Unidos.",
          en: "One of the highest approval rates in the US immigration advisory market.",
          es: "Una de las tasas de aprobación más altas del mercado de asesoría migratoria hacia Estados Unidos.",
        },
      },
      {
        title: { pt: "Anos de Experiência Combinada", en: "Years of Combined Experience", es: "Años de Experiencia Combinada" },
        description: {
          pt: "Nossa equipe reúne especialistas com ampla atuação em imigração americana e histórico de aprovações.",
          en: "Our team brings together specialists with extensive experience in American immigration and a proven track record of approvals.",
          es: "Nuestro equipo reúne especialistas con amplia trayectoria en inmigración americana e historial de aprobaciones.",
        },
      },
      {
        title: { pt: "Parceria Jurídica", en: "Legal Partnership", es: "Asociación Jurídica" },
        description: {
          pt: "Trabalhamos em parceria com advogados de imigração credenciados nos Estados Unidos.",
          en: "We work in partnership with accredited immigration attorneys in the United States.",
          es: "Trabajamos en asociación con abogados de inmigración acreditados en Estados Unidos.",
        },
      },
      {
        title: { pt: "Suporte Dedicado", en: "Dedicated Support", es: "Soporte Dedicado" },
        description: {
          pt: "Acompanhamento em tempo real do seu processo, com equipe bilíngue disponível para você.",
          en: "Real-time tracking of your case, with a bilingual team available for you.",
          es: "Seguimiento en tiempo real de tu proceso, con equipo bilingüe disponible para ti.",
        },
      },
    ],
  },

  // Services
  services: {
    sectionLabel: { pt: "Nossos Serviços", en: "Our Services", es: "Nuestros Servicios" },
    sectionTitle: { pt: "Soluções completas para cada perfil", en: "Complete solutions for every profile", es: "Soluciones completas para cada perfil" },
    sectionSubtitle: {
      pt: "Da avaliação inicial à aprovação final, oferecemos acompanhamento em todas as etapas.",
      en: "From initial evaluation to final approval, we provide support at every stage.",
      es: "Desde la evaluación inicial hasta la aprobación final, brindamos acompañamiento en todas las etapas.",
    },
    mostPopular: { pt: "MAIS PROCURADOS", en: "MOST POPULAR", es: "MÁS SOLICITADOS" },
    learnMore: { pt: "Saiba mais", en: "Learn more", es: "Saber más" },
    items: [
      {
        description: {
          pt: "Green Card para profissionais com habilidades extraordinárias reconhecidas nacional ou internacionalmente.",
          en: "Green Card for professionals with extraordinary abilities recognized nationally or internationally.",
          es: "Green Card para profesionales con habilidades extraordinarias reconocidas nacional o internacionalmente.",
        },
      },
      {
        description: {
          pt: "Green Card sem necessidade de oferta de emprego. Ideal para profissionais com habilidades excepcionais ou grau avançado.",
          en: "Green Card without job offer requirement. Ideal for professionals with exceptional abilities or advanced degrees.",
          es: "Green Card sin necesidad de oferta de empleo. Ideal para profesionales con habilidades excepcionales o grado avanzado.",
        },
      },
      {
        title: { pt: "Vistos de Trabalho", en: "Work Visas", es: "Visas de Trabajo" },
        description: {
          pt: "Vistos para profissionais qualificados que desejam trabalhar legalmente nos Estados Unidos.",
          en: "Visas for qualified professionals who want to work legally in the United States.",
          es: "Visas para profesionales calificados que desean trabajar legalmente en Estados Unidos.",
        },
      },
      {
        title: { pt: "Vistos de Investidor", en: "Investor Visas", es: "Visas de Inversionista" },
        description: {
          pt: "Caminhos para empreendedores e investidores que desejam abrir ou adquirir negócios nos EUA.",
          en: "Pathways for entrepreneurs and investors looking to start or acquire businesses in the USA.",
          es: "Caminos para emprendedores e inversionistas que desean abrir o adquirir negocios en EE.UU.",
        },
      },
      {
        title: { pt: "Green Card Familiar", en: "Family Green Card", es: "Green Card Familiar" },
        description: {
          pt: "Petições através de cônjuges, filhos e familiares cidadãos americanos ou residentes permanentes.",
          en: "Petitions through spouses, children, and family members who are US citizens or permanent residents.",
          es: "Peticiones a través de cónyuges, hijos y familiares ciudadanos americanos o residentes permanentes.",
        },
      },
      {
        title: { pt: "Consultoria Completa", en: "Full Consulting", es: "Consultoría Completa" },
        subtitle: { pt: "Avaliação de Perfil", en: "Profile Assessment", es: "Evaluación de Perfil" },
        description: {
          pt: "Análise personalizada para identificar o melhor caminho migratório para o seu caso específico.",
          en: "Personalized analysis to identify the best immigration path for your specific case.",
          es: "Análisis personalizado para identificar el mejor camino migratorio para tu caso específico.",
        },
      },
    ],
  },

  // Process
  process: {
    sectionLabel: { pt: "Processo", en: "Process", es: "Proceso" },
    sectionTitle: { pt: "Como funciona", en: "How it works", es: "Cómo funciona" },
    sectionSubtitle: {
      pt: "Um processo claro, transparente e com acompanhamento em cada etapa.",
      en: "A clear, transparent process with support at every step.",
      es: "Un proceso claro, transparente y con acompañamiento en cada etapa.",
    },
    cta: { pt: "Comece Sua Jornada Agora", en: "Start Your Journey Now", es: "Comienza Tu Camino Ahora" },
    steps: [
      {
        title: { pt: "Avaliação de Perfil", en: "Profile Assessment", es: "Evaluación de Perfil" },
        desc: {
          pt: "Análise completa da sua elegibilidade e melhor estratégia migratória.",
          en: "Complete analysis of your eligibility and best immigration strategy.",
          es: "Análisis completo de tu elegibilidad y mejor estrategia migratoria.",
        },
      },
      {
        title: { pt: "Planejamento Estratégico", en: "Strategic Planning", es: "Planificación Estratégica" },
        desc: {
          pt: "Definição do caminho ideal com cronograma e expectativas claras.",
          en: "Defining the ideal path with clear timeline and expectations.",
          es: "Definición del camino ideal con cronograma y expectativas claras.",
        },
      },
      {
        title: { pt: "Documentação", en: "Documentation", es: "Documentación" },
        desc: {
          pt: "Preparação e revisão criteriosa de toda documentação necessária.",
          en: "Careful preparation and review of all required documentation.",
          es: "Preparación y revisión cuidadosa de toda la documentación necesaria.",
        },
      },
      {
        title: { pt: "Petição & Apresentação", en: "Petition & Filing", es: "Petición & Presentación" },
        desc: {
          pt: "Submissão oficial ao USCIS com acompanhamento dedicado.",
          en: "Official submission to USCIS with dedicated follow-up.",
          es: "Presentación oficial ante USCIS con seguimiento dedicado.",
        },
      },
      {
        title: { pt: "Entrevista Consular", en: "Consular Interview", es: "Entrevista Consular" },
        desc: {
          pt: "Preparação completa para entrevista, incluindo simulações.",
          en: "Complete interview preparation, including mock interviews.",
          es: "Preparación completa para entrevista, incluyendo simulaciones.",
        },
      },
      {
        title: { pt: "Aprovação", en: "Approval", es: "Aprobación" },
        desc: {
          pt: "Visto aprovado! Suporte contínuo na sua chegada aos EUA.",
          en: "Visa approved! Ongoing support upon your arrival in the USA.",
          es: "¡Visa aprobada! Soporte continuo a tu llegada a EE.UU.",
        },
      },
    ],
  },

  // About
  about: {
    sectionLabel: { pt: "Sobre a Ebgreen", en: "About Ebgreen", es: "Sobre Ebgreen" },
    title1: { pt: "Excelência e inovação em", en: "Excellence and innovation in", es: "Excelencia e innovación en" },
    titleHighlight: { pt: "mobilidade global", en: "global mobility", es: "movilidad global" },
    floatingCard: {
      pt: "Anos de experiência em mobilidade global e direito imigratório.",
      en: "Years of experience in global mobility and immigration law.",
      es: "Años de experiencia en movilidad global y derecho migratorio.",
    },
    paragraph1: {
      pt: "A <strong>Ebgreen Immigration</strong> é uma das mais respeitadas firmas de assessoria imigratória. Com anos de experiência, já ajudamos milhares de famílias a conquistarem o sonho de viver nos Estados Unidos.",
      en: "<strong>Ebgreen Immigration</strong> is one of the most respected immigration advisory firms. With years of experience, we have helped thousands of families achieve their dream of living in the United States.",
      es: "<strong>Ebgreen Immigration</strong> es una de las firmas de asesoría migratoria más respetadas. Con años de experiencia, hemos ayudado a miles de familias a cumplir el sueño de vivir en Estados Unidos.",
    },
    paragraph2: {
      pt: "Nossa equipe conta com advogados especializados e consultores dedicados que acompanham cada caso de perto, garantindo a melhor estratégia para o seu perfil.",
      en: "Our team includes specialized attorneys and dedicated consultants who closely follow each case, ensuring the best strategy for your profile.",
      es: "Nuestro equipo cuenta con abogados especializados y consultores dedicados que acompañan cada caso de cerca, garantizando la mejor estrategia para tu perfil.",
    },
    bullets: [
      { pt: "Atendimento bilíngue (Português, Inglês e Espanhol)", en: "Bilingual support (Portuguese, English and Spanish)", es: "Atención bilingüe (Portugués, Inglés y Español)" },
      { pt: "Análise estratégica individual de cada caso", en: "Individual strategic analysis of each case", es: "Análisis estratégico individual de cada caso" },
      { pt: "Acompanhamento completo do início à aprovação", en: "Complete follow-up from start to approval", es: "Acompañamiento completo desde el inicio hasta la aprobación" },
      { pt: "Transparência em todas as etapas do processo", en: "Transparency at every stage of the process", es: "Transparencia en todas las etapas del proceso" },
    ],
    badges: [
      { pt: "Atendimento bilíngue (PT, EN, ES)", en: "Bilingual support (PT, EN, ES)", es: "Atención bilingüe (PT, EN, ES)" },
      { pt: "Presença nos EUA e Brasil", en: "Presence in USA and Brazil", es: "Presencia en EE.UU. y Brasil" },
      { pt: "Compromisso com resultados", en: "Commitment to results", es: "Compromiso con resultados" },
      { pt: "Equipe multidisciplinar dedicada", en: "Dedicated multidisciplinary team", es: "Equipo multidisciplinario dedicado" },
    ],
  },

  // Testimonials
  testimonials: {
    title1: { pt: "Histórias de", en: "Stories from", es: "Historias de" },
    titleHighlight: { pt: "quem realizou o sonho", en: "those who achieved the dream", es: "quienes lograron el sueño" },
    subtitle: {
      pt: "Milhares de famílias já conquistaram seu Green Card e uma nova vida no exterior. Conheça algumas dessas histórias.",
      en: "Thousands of families have already obtained their Green Card and a new life abroad. Discover some of these stories.",
      es: "Miles de familias ya obtuvieron su Green Card y una nueva vida en el exterior. Conoce algunas de estas historias.",
    },
    familiesCount: { pt: "17.000+ famílias beneficiadas", en: "17,000+ families served", es: "17.000+ familias beneficiadas" },
    familiesSubtitle: { pt: "Transformando sonhos em realidade", en: "Turning dreams into reality", es: "Transformando sueños en realidad" },
  },

  // Contact
  contact: {
    sectionLabel: { pt: "Fale Conosco", en: "Contact Us", es: "Contáctenos" },
    sectionTitle1: { pt: "Descubra qual é o seu caminho", en: "Discover your path", es: "Descubra su camino" },
    sectionTitleHighlight: { pt: "Green Card", en: "Green Card", es: "Green Card" },
    sectionTitle2: { pt: "para o", en: "to the", es: "hacia la" },
    sectionSubtitle: {
      pt: "Nossa equipe analisa seu perfil e identifica a melhor estratégia para sua aprovação.",
      en: "Our team analyzes your profile and identifies the best strategy for your approval.",
      es: "Nuestro equipo analiza su perfil e identifica la mejor estrategia para su aprobación.",
    },
    phone: { pt: "Telefone", en: "Phone", es: "Teléfono" },
    email: { pt: "E-mail", en: "Email", es: "Correo" },
    freeConsultation: { pt: "Consulta 100% Gratuita", en: "100% Free Consultation", es: "Consulta 100% Gratuita" },
    freeConsultationBullets: [
      { pt: "Avaliação sem compromisso do seu perfil", en: "No-obligation profile assessment", es: "Evaluación sin compromiso de su perfil" },
      { pt: "Identificamos a melhor rota para o seu caso", en: "We identify the best route for your case", es: "Identificamos la mejor ruta para su caso" },
      { pt: "Resposta em até 24 horas", en: "Response within 24 hours", es: "Respuesta en hasta 24 horas" },
    ],
    firstName: { pt: "Primeiro Nome *", en: "First Name *", es: "Nombre *" },
    lastName: { pt: "Último Nome *", en: "Last Name *", es: "Apellido *" },
    emailLabel: { pt: "Endereço de email *", en: "Email Address *", es: "Correo electrónico *" },
    phoneLabel: { pt: "Telefone *", en: "Phone *", es: "Teléfono *" },
    nationality: { pt: "Qual sua nacionalidade? *", en: "What is your nationality? *", es: "¿Cuál es su nacionalidad? *" },
    migrateTo: { pt: "Migrar para *", en: "Migrate to *", es: "Migrar a *" },
    education: { pt: "Formação Acadêmica *", en: "Education Level *", es: "Formación Académica *" },
    experience: { pt: "Anos de Experiência Profissional *", en: "Years of Professional Experience *", es: "Años de Experiencia Profesional *" },
    visaType: { pt: "Tipo de Visto", en: "Visa Type", es: "Tipo de Visa" },
    resume: { pt: "Envie seu currículo", en: "Upload your resume", es: "Envíe su currículum" },
    selectFile: { pt: "Selecione Arquivo", en: "Select File", es: "Seleccionar Archivo" },
    message: { pt: "Mensagem", en: "Message", es: "Mensaje" },
    messagePlaceholder: { pt: "Fale mais sobre você e seu desejo de imigrar.", en: "Tell us more about yourself and your desire to immigrate.", es: "Cuéntenos más sobre usted y su deseo de inmigrar." },
    privacy: { pt: "Eu concordo com a Política de Privacidade.", en: "I agree with the Privacy Policy.", es: "Acepto la Política de Privacidad." },
    submit: { pt: "Enviar Mensagem", en: "Send Message", es: "Enviar Mensaje" },
    successMsg: {
      pt: "Mensagem enviada com sucesso! Entraremos em contato em até 24 horas.",
      en: "Message sent successfully! We will contact you within 24 hours.",
      es: "¡Mensaje enviado con éxito! Nos pondremos en contacto en 24 horas.",
    },
    select: { pt: "Selecione...", en: "Select...", es: "Seleccione..." },
    educationOptions: {
      "ensino-medio": { pt: "Ensino Médio", en: "High School", es: "Secundaria" },
      tecnico: { pt: "Técnico", en: "Technical", es: "Técnico" },
      tecnologo: { pt: "Tecnólogo", en: "Technologist", es: "Tecnólogo" },
      superior: { pt: "Nível superior/Bacharelado", en: "Bachelor's Degree", es: "Licenciatura" },
      "pos-graduacao": { pt: "Pós Graduação", en: "Postgraduate", es: "Posgrado" },
      mestrado: { pt: "Mestrado", en: "Master's Degree", es: "Maestría" },
      doutorado: { pt: "Doutorado", en: "Doctorate", es: "Doctorado" },
      "pos-doutorado": { pt: "Pós Doutorado", en: "Post-Doctorate", es: "Postdoctorado" },
    },
    experienceOptions: {
      "menos-5": { pt: "Menos de 5 anos", en: "Less than 5 years", es: "Menos de 5 años" },
      "5-10": { pt: "De 5 a 10 anos", en: "5 to 10 years", es: "De 5 a 10 años" },
      "mais-10": { pt: "Mais de 10 anos", en: "More than 10 years", es: "Más de 10 años" },
    },
    migrateOptions: {
      "estados-unidos": { pt: "Estados Unidos", en: "United States", es: "Estados Unidos" },
      canada: { pt: "Canadá", en: "Canada", es: "Canadá" },
      europa: { pt: "Europa", en: "Europe", es: "Europa" },
      outro: { pt: "Outro", en: "Other", es: "Otro" },
    },
  },

  // CTA
  cta: {
    title1: { pt: "A conquista do seu", en: "Your", es: "La conquista de tu" },
    titleHighlight: { pt: "Green Card", en: "Green Card", es: "Green Card" },
    title2: { pt: "começa aqui", en: "journey starts here", es: "comienza aquí" },
    subtitle: {
      pt: "Não espere mais. Agende uma consulta gratuita e descubra qual o melhor caminho para você e sua família nos Estados Unidos.",
      en: "Don't wait any longer. Schedule a free consultation and discover the best path for you and your family in the United States.",
      es: "No espere más. Agende una consulta gratuita y descubra el mejor camino para usted y su familia en Estados Unidos.",
    },
    ctaPrimary: { pt: "Agendar Consulta Gratuita", en: "Schedule Free Consultation", es: "Agendar Consulta Gratuita" },
    ctaSecondary: { pt: "Falar pelo WhatsApp", en: "Chat on WhatsApp", es: "Hablar por WhatsApp" },
  },

  // Footer
  footer: {
    slogan: { pt: "Respeito, Resposta e Resultados", en: "Respect, Response and Results", es: "Respeto, Respuesta y Resultados" },
    contactLabel: { pt: "Contato:", en: "Contact:", es: "Contacto:" },
    privacy: { pt: "Política de Privacidade", en: "Privacy Policy", es: "Política de Privacidad" },
    terms: { pt: "Termos de Uso", en: "Terms of Use", es: "Términos de Uso" },
    rights: { pt: "Todos os direitos reservados.", en: "All rights reserved.", es: "Todos los derechos reservados." },
  },
} as const;

export function t(obj: Record<Language, string>, lang: Language): string {
  return obj[lang] || obj.pt;
}
