// Estrutura central dos artigos do blog EBGreen.
// Os 5 primeiros (lote 1) já vêm com conteúdo completo, otimizado para leitura
// confortável, SEO (H2/H3, meta, links internos e externos) e conversão.
// Os demais ficam como teasers até o próximo lote.

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "ordered"; items: string[] }
  | { type: "quote"; text: string; author?: string }
  | { type: "callout"; title: string; text: string }
  | { type: "cta"; text: string };

export type ExternalLink = { label: string; url: string };

export type BlogPost = {
  id: number;
  slug: string;
  titulo: string;
  categoria: string;
  data: string;
  leitura: string;
  imagem: string;
  excerpt: string;
  metaTitle?: string;
  metaDescription?: string;
  author?: string;
  content?: ArticleBlock[];
  externalLinks?: ExternalLink[];
  related?: string[]; // slugs
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "eb2-niw-guia-definitivo-2026",
    titulo: "EB-2 NIW: Guia Definitivo para Brasileiros em 2026",
    categoria: "EB-2 NIW",
    data: "01 mar 2026",
    leitura: "8 min",
    imagem: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80&fit=crop",
    excerpt:
      "Conheça um dos caminhos mais inteligentes para viver permanentemente nos Estados Unidos sem depender de empregador ou investidor.",
    metaTitle: "EB-2 NIW 2026: Guia Completo para Brasileiros | EBGreen",
    metaDescription:
      "Entenda o EB-2 NIW em 2026: critérios, prazos, custos e estratégia de dossiê para brasileiros conquistarem o Green Card por mérito profissional.",
    author: "Equipe EBGreen",
    content: [
      {
        type: "p",
        text: "O EB-2 NIW (National Interest Waiver) virou, ao longo dos últimos anos, o caminho preferido de profissionais brasileiros que querem morar legalmente nos Estados Unidos sem depender de uma oferta de emprego, de um investimento alto ou de um patrocinador. É um Green Card por mérito profissional — você apresenta sua trajetória, mostra impacto, e o governo americano avalia se sua atuação é de interesse nacional.",
      },
      {
        type: "p",
        text: "Em 2026, com o cenário migratório mais rigoroso e tempos de processamento oscilando, entender as regras com precisão deixou de ser opcional. Este guia reúne, de forma direta, o que muda neste ano e como montar uma estratégia realista para o seu caso.",
      },
      { type: "h2", id: "o-que-e", text: "O que é o EB-2 NIW, na prática" },
      {
        type: "p",
        text: "O EB-2 é uma categoria de Green Card para profissionais com diploma avançado (mestrado, doutorado ou bacharelado + 5 anos de experiência progressiva) ou com habilidade excepcional. O NIW é uma dispensa: ele permite pular as etapas de oferta de emprego e PERM (certificação de trabalho), desde que você prove que sua atuação beneficia os Estados Unidos.",
      },
      {
        type: "p",
        text: "Na prática, isso significa autonomia. Você não fica preso a um empregador. Não precisa ser transferido por uma multinacional. Não precisa investir centenas de milhares de dólares. O que importa é o seu currículo, o impacto do seu trabalho e a forma como tudo é apresentado ao USCIS.",
      },
      { type: "h2", id: "criterios-matter", text: "Os três critérios do caso Matter of Dhanasar" },
      {
        type: "p",
        text: "Desde 2016, o USCIS avalia o EB-2 NIW sob três pilares definidos no caso Matter of Dhanasar. Eles continuam valendo em 2026 e formam a espinha dorsal de qualquer petição séria.",
      },
      {
        type: "ordered",
        items: [
          "Mérito substancial e importância nacional: a sua área de atuação precisa ter relevância para os EUA — saúde, educação, tecnologia, ciência, cultura, economia, segurança, sustentabilidade, entre outras.",
          "Posicionamento para avançar a proposta: você precisa mostrar, com evidências concretas, que tem capacidade real de continuar entregando esse trabalho nos Estados Unidos.",
          "Benefício de dispensar a oferta de emprego: o governo deve entender que faz mais sentido você operar com autonomia do que ficar dependente de um empregador.",
        ],
      },
      {
        type: "callout",
        title: "Erro comum",
        text: "Muita gente foca no critério 1 e esquece o critério 2. Currículo bonito sem evidência de execução nos EUA derruba petições fortes. Cartas de recomendação de líderes americanos da sua área pesam muito aqui.",
      },
      { type: "h2", id: "quem-se-qualifica", text: "Quem realmente se qualifica?" },
      {
        type: "p",
        text: "Não existe lista oficial de profissões. O que existe é um padrão de evidência. Em geral, conseguem montar casos sólidos:",
      },
      {
        type: "list",
        items: [
          "Engenheiros, cientistas e pesquisadores com publicações, patentes ou projetos de impacto.",
          "Profissionais de tecnologia com produtos lançados, equipes lideradas ou contribuições reconhecidas em open source.",
          "Médicos, dentistas e profissionais de saúde com especializações relevantes ou atuação em áreas de alta demanda.",
          "Empreendedores com empresas que geraram receita, empregos ou inovação mensurável.",
          "Educadores, designers, arquitetos e profissionais criativos com prêmios, exposições ou impacto comprovado.",
        ],
      },
      {
        type: "p",
        text: "Se você se enxerga em algum desses perfis, o próximo passo é uma análise de elegibilidade séria — não um quiz online. Veja também o nosso comparativo entre <a href=\"/blog/o1a-vs-eb1a\">O-1A e EB-1A</a> para entender se o NIW é mesmo a melhor rota para o seu momento.",
      },
      { type: "h2", id: "prazos-2026", text: "Prazos e fila em 2026" },
      {
        type: "p",
        text: "O Visa Bulletin do Departamento de Estado, atualizado mensalmente, mostra que brasileiros não estão sujeitos a backlog por país no EB-2 — o que é uma vantagem grande em relação à Índia ou China. Mesmo assim, os tempos de processamento na I-140 variaram entre 8 e 14 meses ao longo de 2025, e a tendência para 2026 é de manutenção desse intervalo.",
      },
      {
        type: "p",
        text: "Quem pede premium processing recebe resposta em até 45 dias corridos. O custo extra (USD 2.805 em 2026) costuma valer a pena para quem quer planejar mudança com horizonte definido.",
      },
      { type: "h2", id: "custos", text: "Quanto custa, de verdade" },
      {
        type: "list",
        items: [
          "Taxas USCIS (I-140 + I-485 ou consular): entre USD 1.700 e 4.500 por pessoa, dependendo do caminho.",
          "Premium processing (opcional): USD 2.805.",
          "Honorários de assessoria especializada: variam conforme complexidade do caso.",
          "Exames médicos, traduções juramentadas e taxas consulares: USD 800 a 1.500 por pessoa.",
        ],
      },
      {
        type: "p",
        text: "Para uma família de 4 pessoas, é realista projetar entre USD 12.000 e 25.000 considerando todo o processo até a entrega do Green Card. Veja a análise completa em <a href=\"/blog/custo-real-imigrar-eua-2026\">Custo Real de Imigrar para os EUA em 2026</a>.",
      },
      { type: "h2", id: "estrategia", text: "Estratégia: como montar um dossiê que convence" },
      {
        type: "p",
        text: "Petição de NIW é narrativa. O oficial do USCIS precisa entender, em poucas páginas, quem você é, por que seu trabalho importa e por que faz sentido você operar nos EUA. Os três blocos que diferenciam casos aprovados de casos negados:",
      },
      {
        type: "h3",
        text: "1. Carta de petição estratégica",
      },
      {
        type: "p",
        text: "É o documento que amarra tudo. Ela conecta sua trajetória aos três critérios do Dhanasar com linguagem clara e evidência objetiva — não promessa.",
      },
      {
        type: "h3",
        text: "2. Cartas de recomendação independentes",
      },
      {
        type: "p",
        text: "O ideal é mesclar cartas de pessoas com quem você trabalhou diretamente e cartas de líderes americanos da sua área que conhecem seu trabalho à distância (independent experts). Esse equilíbrio é o que dá credibilidade.",
      },
      {
        type: "h3",
        text: "3. Plano de continuidade nos EUA",
      },
      {
        type: "p",
        text: "Mostre o que você fará no país: contatos firmados, projetos em andamento, parcerias, demanda pelo seu serviço. Vagueza é o maior inimigo do NIW.",
      },
      {
        type: "quote",
        text: "Casos fortes não são feitos de adjetivos — são feitos de evidência. Métrica, link, recorte de imprensa, resultado mensurável.",
        author: "Equipe EBGreen",
      },
      { type: "h2", id: "armadilhas", text: "Armadilhas que derrubam casos bons" },
      {
        type: "list",
        items: [
          "Dossiê genérico, sem narrativa: muitas evidências jogadas, sem fio condutor.",
          "Cartas de recomendação repetidas, escritas pelo próprio candidato, com mesma estrutura.",
          "Plano de continuidade vago — \"pretendo seguir trabalhando na minha área\".",
          "Subestimar o critério 2: bom currículo, mas sem mostrar capacidade real de execução nos EUA.",
          "Confundir EB-2 NIW com EB-1A. O EB-1A exige reconhecimento extraordinário; o NIW, impacto + interesse nacional.",
        ],
      },
      { type: "h2", id: "passo-a-passo", text: "Passo a passo realista" },
      {
        type: "ordered",
        items: [
          "Avaliação de elegibilidade honesta: você tem material suficiente hoje? Ou precisa fortalecer 6 a 12 meses antes?",
          "Coleta de evidência: artigos, prêmios, métricas, depoimentos, mídia.",
          "Mapeamento de cartas de recomendação (5 a 7 ideal).",
          "Construção da carta de petição.",
          "Submissão da I-140 com ou sem premium processing.",
          "Após aprovação: I-485 (se você já está nos EUA) ou processo consular (se está no Brasil).",
        ],
      },
      { type: "h2", id: "vale-a-pena", text: "Vale a pena começar agora?" },
      {
        type: "p",
        text: "Sim — desde que com leitura realista do seu caso. O NIW continua sendo a rota com melhor relação custo, autonomia e tempo entre as opções de Green Card por mérito. Mas ele não é \"fácil\": é técnico. Quem trata como formulário, perde. Quem trata como projeto, ganha.",
      },
      {
        type: "p",
        text: "Se você quer entender, sem compromisso, se o seu perfil tem caso, a EBGreen oferece análise gratuita conduzida por especialistas que avaliam viabilidade real antes de recomendar qualquer rota.",
      },
      { type: "cta", text: "Quero uma análise gratuita do meu perfil" },
    ],
    externalLinks: [
      {
        label: "USCIS — National Interest Waiver",
        url: "https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-second-preference-eb-2",
      },
      {
        label: "Visa Bulletin atual (Dept. of State)",
        url: "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html",
      },
      {
        label: "Matter of Dhanasar (decisão do AAO)",
        url: "https://www.justice.gov/eoir/page/file/920996/download",
      },
    ],
    related: ["eb1a-talento-extraordinario", "custo-real-imigrar-eua-2026", "o1a-vs-eb1a"],
  },

  {
    id: 3,
    slug: "eb1a-talento-extraordinario",
    titulo: "EB-1A: Quando Você se Qualifica como Talento Extraordinário",
    categoria: "EB-1A",
    data: "03 mar 2026",
    leitura: "9 min",
    imagem: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80&fit=crop",
    excerpt:
      "Os 10 sinais reais de que você está pronto para o Green Card mais prestigiado do sistema americano — sem patrocinador, sem investimento.",
    metaTitle: "EB-1A 2026: Como Saber se Você se Qualifica | EBGreen",
    metaDescription:
      "EB-1A para brasileiros em 2026: os 10 critérios oficiais do USCIS, exemplos reais e como construir um caso forte de talento extraordinário.",
    author: "Equipe EBGreen",
    content: [
      {
        type: "p",
        text: "O EB-1A é o Green Card mais prestigiado da imigração americana baseada em emprego. Ele dispensa oferta de trabalho, dispensa patrocinador e fica em uma fila preferencial — o que, na prática, significa Green Card mais rápido para quem se qualifica.",
      },
      {
        type: "p",
        text: "A fama dele de \"só para gênios\" é exagerada. O EB-1A exige reconhecimento sustentado em uma área de atuação, mas reconhecimento se prova com evidência objetiva. Este artigo destrincha os 10 critérios oficiais do USCIS, mostra como brasileiros estão construindo casos reais e ajuda você a se posicionar com honestidade.",
      },
      { type: "h2", id: "o-que-e-eb1a", text: "O que o EB-1A realmente exige" },
      {
        type: "p",
        text: "A regulamentação pede que você prove uma das duas coisas: (1) reconhecimento de nível internacional unanimemente aclamado — caso de prêmios como Nobel, Oscar, Pulitzer; ou (2) atendimento a pelo menos 3 dos 10 critérios listados pelo USCIS, junto com evidência de que o reconhecimento é sustentado e que você continuará atuando na área nos EUA.",
      },
      {
        type: "p",
        text: "Quase 100% dos casos seguem o segundo caminho. É lá que você precisa montar sua estratégia.",
      },
      { type: "h2", id: "10-criterios", text: "Os 10 critérios — e o que cada um significa" },
      {
        type: "ordered",
        items: [
          "Prêmios nacionais ou internacionais reconhecidos pela excelência.",
          "Filiação a associações que exigem mérito comprovado para entrada.",
          "Material publicado sobre você em mídia profissional ou de grande circulação.",
          "Atuação como julgador do trabalho de outros (juiz de prêmio, revisor científico, banca).",
          "Contribuição original e relevante à sua área (técnica, artística, científica, empresarial).",
          "Autoria de artigos científicos ou profissionais em publicações relevantes.",
          "Exibição do seu trabalho em mostras, exposições ou eventos relevantes (quando aplicável).",
          "Atuação em papel principal ou crítico em organização de destaque.",
          "Salário alto comparado a outros profissionais da mesma área.",
          "Sucesso comercial nas artes performáticas (vendas, bilheteria, streams, etc.).",
        ],
      },
      {
        type: "callout",
        title: "Atenção: qualidade > quantidade",
        text: "Bater 3 critérios no papel não basta. Cada critério precisa vir com evidência forte. O USCIS faz uma análise em duas etapas: primeiro conta os critérios, depois avalia se, no conjunto, você é mesmo reconhecido. Casos com 5 critérios fracos perdem para casos com 3 critérios fortes.",
      },
      { type: "h2", id: "quem-se-qualifica", text: "Perfis brasileiros que vêm sendo aprovados" },
      {
        type: "list",
        items: [
          "Pesquisadores e cientistas com publicações citadas (use o Google Scholar para mapear citações).",
          "Engenheiros e profissionais de tecnologia com patentes, contribuições em projetos open source de larga adoção ou liderança técnica em produtos reconhecidos.",
          "Atletas profissionais com participação em competições internacionais.",
          "Artistas com atuação documentada — exposições, festivais, prêmios, mídia.",
          "Empreendedores com empresas que se tornaram referência ou foram premiadas.",
          "Médicos com publicações, palestras em congressos internacionais e atuação em hospitais de referência.",
        ],
      },
      {
        type: "p",
        text: "Se você se identifica com mais de um perfil ou tem dúvida entre EB-1A e EB-2 NIW, leia o nosso <a href=\"/blog/o1a-vs-eb1a\">comparativo entre O-1A e EB-1A</a> e o <a href=\"/blog/eb2-niw-guia-definitivo-2026\">guia do EB-2 NIW</a>.",
      },
      { type: "h2", id: "estrategia", text: "Como construir um caso de EB-1A forte" },
      {
        type: "h3",
        text: "1. Auditoria honesta dos seus 10 critérios",
      },
      {
        type: "p",
        text: "Olhe os 10 critérios um por um. Em cada um, pergunte: \"que evidência objetiva eu tenho hoje, fora promessa?\" Esse exercício mostra se você tem caso pronto, caso a 6 meses ou caso a 18 meses.",
      },
      {
        type: "h3",
        text: "2. Construção de evidência faltante",
      },
      {
        type: "p",
        text: "Faltam citações? Submeter artigos para revistas indexadas resolve. Falta atuação como julgador? Aceitar convites para revisão de papers, participar de bancas, atuar em comitês resolve. Falta mídia? Trabalhar uma agenda de PR especializada resolve. EB-1A é projeto, não é foto do momento.",
      },
      {
        type: "h3",
        text: "3. Cartas de recomendação que provam — não que elogiam",
      },
      {
        type: "p",
        text: "Cartas eficazes citam fatos: \"o trabalho dela foi citado por X laboratórios\", \"a metodologia que ele desenvolveu foi adotada por Y empresas\". Carta cheia de adjetivo é carta fraca.",
      },
      {
        type: "h3",
        text: "4. Plano de continuidade nos EUA",
      },
      {
        type: "p",
        text: "Você precisa mostrar que continuará atuando na sua área dentro dos Estados Unidos: contratos, convites, demanda. Sem isso, o último critério da regulamentação não fecha.",
      },
      { type: "h2", id: "tempos-2026", text: "Tempos e fila em 2026" },
      {
        type: "p",
        text: "Brasileiros estão em fila aberta no EB-1 — sem backlog por país. A I-140 leva entre 6 e 12 meses sem premium e até 45 dias com premium processing. Aprovada a I-140, o ajuste de status (I-485) ou processo consular costuma rodar em 8 a 14 meses.",
      },
      { type: "h2", id: "armadilhas", text: "Erros que matam casos bons" },
      {
        type: "list",
        items: [
          "Tentar provar tudo, em vez de provar bem 3 a 5 critérios fortes.",
          "Cartas de recomendação genéricas, todas com a mesma estrutura.",
          "Mídia paga ou de baixa relevância contada como \"material publicado\".",
          "Achar que prêmio interno de empresa equivale a prêmio nacional.",
          "Plano de continuidade vago.",
        ],
      },
      { type: "h2", id: "vale-a-pena", text: "EB-1A vs EB-2 NIW: qual escolher?" },
      {
        type: "p",
        text: "Regra prática: se você tem reconhecimento sustentado e evidência forte em 3+ critérios, vá de EB-1A. Tem fila preferencial, prestígio e velocidade. Se sua trajetória ainda está em construção mas o impacto da sua área é claro, o EB-2 NIW é o caminho mais inteligente — e nada impede que você faça o EB-1A depois, com mais maturidade.",
      },
      {
        type: "p",
        text: "Quer saber, sem suposição, em qual rota o seu perfil tem caso real? Faça uma avaliação com a EBGreen.",
      },
      { type: "cta", text: "Avaliar meu perfil para EB-1A" },
    ],
    externalLinks: [
      {
        label: "USCIS — EB-1A Extraordinary Ability",
        url: "https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-first-preference-eb-1",
      },
      {
        label: "USCIS Policy Manual — EB-1A",
        url: "https://www.uscis.gov/policy-manual/volume-6-part-f-chapter-2",
      },
      {
        label: "Visa Bulletin",
        url: "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html",
      },
    ],
    related: ["eb2-niw-guia-definitivo-2026", "visto-o1-rota-express", "o1a-vs-eb1a"],
  },

  {
    id: 4,
    slug: "visto-o1-rota-express",
    titulo: "Visto O-1: A Rota Express para Talentos nos EUA",
    categoria: "Visto O-1",
    data: "04 mar 2026",
    leitura: "7 min",
    imagem: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80&fit=crop",
    excerpt:
      "Quando o O-1 faz mais sentido que um Green Card, como funciona e por que ele é a escolha favorita de quem quer começar a operar nos EUA agora.",
    metaTitle: "Visto O-1 em 2026: Para Quem Vale a Pena | EBGreen",
    metaDescription:
      "O visto O-1 é o caminho mais rápido para profissionais reconhecidos atuarem nos EUA. Critérios, prazos, custo e estratégia para 2026.",
    author: "Equipe EBGreen",
    content: [
      {
        type: "p",
        text: "Quando alguém perguntar \"quero ir para os EUA, o que faço primeiro?\", a resposta honesta nem sempre é Green Card. Muitas vezes é O-1.",
      },
      {
        type: "p",
        text: "O O-1 é um visto de trabalho temporário para profissionais com habilidade extraordinária. Ele não é Green Card — é autorização de trabalho. Mas é, de longe, o visto que mais combina com quem quer começar a operar nos Estados Unidos rápido, com flexibilidade, mantendo o EB-1A ou EB-2 NIW como o passo seguinte.",
      },
      { type: "h2", id: "o-que-e", text: "O que é o O-1" },
      {
        type: "p",
        text: "Existem duas variações principais: O-1A (ciência, educação, negócios, atletismo) e O-1B (artes e indústria audiovisual). Os critérios mudam, mas a lógica é a mesma — o candidato precisa provar habilidade extraordinária e atuar na sua área dentro dos EUA.",
      },
      {
        type: "p",
        text: "Diferente do EB-1A (Green Card), o O-1 é renovável indefinidamente em períodos de até 3 anos, com extensões anuais.",
      },
      { type: "h2", id: "por-que-faz-sentido", text: "Por que o O-1 virou a escolha favorita" },
      {
        type: "list",
        items: [
          "Tempo: petição com premium processing sai em até 15 dias úteis.",
          "Critérios mais flexíveis que o EB-1A: você precisa atender 3 dos 8 (O-1A) ou 3 dos 6 (O-1B).",
          "Permite múltiplos empregadores se a petição for via agente.",
          "Permite trabalhar nos EUA enquanto seu Green Card EB-1A ou EB-2 NIW está em andamento.",
          "Visto para cônjuge (O-3) e filhos solteiros menores de 21 anos.",
        ],
      },
      {
        type: "callout",
        title: "Cuidado",
        text: "O O-1 exige patrocinador (empregador americano ou agente). Você não pode autopatrocinar. Isso difere do EB-1A e do EB-2 NIW, que permitem auto-petição.",
      },
      { type: "h2", id: "criterios-o1a", text: "Critérios do O-1A — atenda 3 dos 8" },
      {
        type: "ordered",
        items: [
          "Prêmios nacionais ou internacionais.",
          "Filiação a associações que exigem mérito.",
          "Material publicado sobre você em mídia profissional.",
          "Atuação como julgador do trabalho de outros.",
          "Contribuição original significativa à sua área.",
          "Autoria de artigos profissionais ou científicos.",
          "Atuação em papel crítico ou essencial em organização de destaque.",
          "Salário alto em relação a outros profissionais da área.",
        ],
      },
      { type: "h2", id: "criterios-o1b", text: "Critérios do O-1B — atenda 3 dos 6" },
      {
        type: "ordered",
        items: [
          "Atuação como protagonista em produções de destaque.",
          "Reviews críticas ou material publicado sobre o seu trabalho.",
          "Participação em produções de organizações com reputação destacada.",
          "Sucesso comercial ou crítico (bilheteria, vendas, streams).",
          "Reconhecimento de governos, organizações ou críticos de prestígio.",
          "Salário alto comparado a outros do setor.",
        ],
      },
      { type: "h2", id: "passo-a-passo", text: "Como funciona o processo" },
      {
        type: "ordered",
        items: [
          "Definição do patrocinador: empregador americano ou agente.",
          "Montagem do dossiê com evidências dos critérios.",
          "Cartas de recomendação independentes (mínimo 6 a 8).",
          "Itinerário de trabalho — onde, quando e fazendo o quê.",
          "Submissão da I-129 ao USCIS, com ou sem premium processing.",
          "Após aprovação: agendamento da entrevista consular ou ajuste de status.",
        ],
      },
      { type: "h2", id: "custos", text: "Custos em 2026" },
      {
        type: "list",
        items: [
          "Taxa USCIS I-129: USD 530.",
          "Asylum Program Fee: USD 600 (empregador padrão) ou reduzido para pequenas empresas.",
          "Premium processing: USD 2.805 (opcional).",
          "Taxa consular MRV: USD 205.",
          "Honorários advocatícios: variam conforme complexidade.",
        ],
      },
      { type: "h2", id: "ponte-greencard", text: "O O-1 como ponte para o Green Card" },
      {
        type: "p",
        text: "O caminho mais comum é: profissional brasileiro entra com O-1, começa a operar nos EUA, fortalece evidência (prêmios, mídia, contribuições) e, em 12 a 24 meses, peticiona EB-1A ou EB-2 NIW. Esse encadeamento reduz risco e acelera o Green Card.",
      },
      {
        type: "p",
        text: "Para entender qual cenário se encaixa no seu momento, leia também o <a href=\"/blog/o1a-vs-eb1a\">comparativo entre O-1A e EB-1A</a> e o <a href=\"/blog/eb1a-talento-extraordinario\">guia do EB-1A</a>.",
      },
      { type: "h2", id: "armadilhas", text: "Erros mais comuns" },
      {
        type: "list",
        items: [
          "Confundir patrocínio com self-petition.",
          "Itinerário de trabalho mal estruturado.",
          "Cartas de recomendação muito parecidas entre si.",
          "Não preparar a transição O-1 → EB-1A desde o início.",
        ],
      },
      {
        type: "p",
        text: "Se você quer entender se o O-1 é a sua melhor primeira jogada, fale com um especialista da EBGreen.",
      },
      { type: "cta", text: "Quero avaliar meu caso para O-1" },
    ],
    externalLinks: [
      {
        label: "USCIS — O-1 Visa",
        url: "https://www.uscis.gov/working-in-the-united-states/temporary-workers/o-1-individuals-with-extraordinary-ability-or-achievement",
      },
      {
        label: "USCIS Policy Manual — O-1",
        url: "https://www.uscis.gov/policy-manual/volume-2-part-m",
      },
    ],
    related: ["eb1a-talento-extraordinario", "o1a-vs-eb1a", "eb2-niw-guia-definitivo-2026"],
  },

  {
    id: 5,
    slug: "eb5-green-card-investimento-2026",
    titulo: "EB-5: Green Card por Investimento para Brasileiros em 2026",
    categoria: "EB-5",
    data: "05 mar 2026",
    leitura: "11 min",
    imagem: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=80&fit=crop",
    excerpt:
      "Como funciona o Green Card por investimento depois da reforma de 2022, riscos reais e quando ele faz mais sentido que EB-1A ou EB-2 NIW.",
    metaTitle: "EB-5 2026: Green Card por Investimento — Guia Completo | EBGreen",
    metaDescription:
      "Tudo sobre o EB-5 em 2026: valores, TEAs, prazos, riscos, projeto direto vs Regional Center e como brasileiros estão investindo com segurança.",
    author: "Equipe EBGreen",
    content: [
      {
        type: "p",
        text: "O EB-5 é o Green Card por investimento. Em troca de um aporte em projeto que gere empregos nos Estados Unidos, o investidor, o cônjuge e os filhos solteiros menores de 21 anos recebem residência permanente. É a rota mais cara, e também uma das mais previsíveis quando bem estruturada.",
      },
      {
        type: "p",
        text: "Depois da reforma de 2022 (RIA — Reform and Integrity Act), o EB-5 ganhou regras mais claras, novas categorias e proteção para investidores. Em 2026, o programa segue ativo, com fila razoável para brasileiros e processos sendo aprovados em ritmo estável.",
      },
      { type: "h2", id: "valores", text: "Quanto custa investir" },
      {
        type: "list",
        items: [
          "Investimento padrão: USD 1.050.000.",
          "Investimento em TEA (Targeted Employment Area — área rural ou de alta desemprego): USD 800.000.",
          "Mínimo de 10 empregos full-time gerados nos EUA.",
        ],
      },
      {
        type: "p",
        text: "A maioria dos casos brasileiros vai por TEA, com aporte de USD 800 mil. Some a isso taxas governamentais, due diligence, honorários e custos do projeto — o orçamento total realista fica entre USD 850 mil e USD 950 mil.",
      },
      { type: "h2", id: "categorias", text: "Visa set-asides: a vantagem da reforma" },
      {
        type: "p",
        text: "A RIA criou três reservas anuais de visto que beneficiam brasileiros:",
      },
      {
        type: "list",
        items: [
          "20% para áreas rurais.",
          "10% para áreas de alta desemprego.",
          "2% para projetos de infraestrutura.",
        ],
      },
      {
        type: "p",
        text: "Quem investe nessas categorias pode receber Green Card mais rápido — em alguns casos, em menos de 24 meses.",
      },
      { type: "h2", id: "direto-vs-rc", text: "Investimento direto vs. Regional Center" },
      {
        type: "h3",
        text: "Regional Center",
      },
      {
        type: "p",
        text: "Modelo mais usado por brasileiros. Você investe em um projeto patrocinado por um centro regional autorizado pelo USCIS. Os empregos podem ser indiretos e induzidos. Menos envolvimento operacional. Risco depende muito do projeto e da reputação do RC.",
      },
      {
        type: "h3",
        text: "Investimento direto",
      },
      {
        type: "p",
        text: "Você abre ou compra um negócio nos EUA e gera os empregos diretamente. Maior controle, maior risco, maior demanda operacional. Faz sentido para empreendedores que pretendem mesmo tocar a operação.",
      },
      {
        type: "callout",
        title: "Diligência é tudo",
        text: "EB-5 mal estruturado é dinheiro perdido. Antes de assinar, audite o histórico do projeto, da gestora, do escrow, da estrutura legal e da geração de empregos. Esse trabalho pesa mais que qualquer planilha de retorno.",
      },
      { type: "h2", id: "prazos-2026", text: "Prazos em 2026" },
      {
        type: "p",
        text: "I-526E (petição de investidor) leva entre 18 e 36 meses no caminho padrão. Quem investe em set-asides reservados (rural, alta desemprego, infraestrutura) costuma ver tempos menores. Após a I-526E aprovada, o investidor processa o Green Card condicional (válido por 2 anos), e depois faz a I-829 para remover a condição.",
      },
      { type: "h2", id: "quando-faz-sentido", text: "Quando o EB-5 faz mais sentido que EB-1A ou EB-2 NIW" },
      {
        type: "list",
        items: [
          "Você não tem perfil profissional para EB-1A nem EB-2 NIW, ou quer evitar o esforço de construir caso.",
          "Tem capital disponível e disposição de imobilizar por 5 a 7 anos.",
          "Quer trazer cônjuge e filhos como dependentes.",
          "Quer flexibilidade total nos EUA — sem amarra com empregador.",
        ],
      },
      {
        type: "p",
        text: "Compare também com o <a href=\"/blog/visto-e2-investir-morar-eua\">visto E-2</a>, que é mais barato mas não dá Green Card.",
      },
      { type: "h2", id: "riscos", text: "Riscos reais que ninguém te conta" },
      {
        type: "list",
        items: [
          "Risco de mercado: o projeto pode não performar como prometido.",
          "Risco de empregos: se o projeto não gerar os 10 empregos exigidos, o Green Card pode ser negado.",
          "Risco de retenção do capital: o aporte fica imobilizado por anos.",
          "Risco regulatório: mudanças no programa podem afetar processos em andamento.",
          "Risco de fraude: já houve casos de Regional Centers fraudulentos. Diligência é obrigatória.",
        ],
      },
      { type: "h2", id: "passo-a-passo", text: "Passo a passo realista" },
      {
        type: "ordered",
        items: [
          "Análise de elegibilidade e definição de orçamento.",
          "Seleção do projeto com due diligence completa.",
          "Source of funds: prova documental da origem lícita dos recursos.",
          "Aporte do investimento em conta escrow.",
          "Submissão da I-526E.",
          "Após aprovação: ajuste de status ou processo consular.",
          "Green Card condicional (2 anos).",
          "I-829 para remoção da condição → Green Card permanente.",
        ],
      },
      {
        type: "quote",
        text: "EB-5 não é compra de Green Card. É investimento condicional, com regras e risco. Quem trata como atalho, sai prejudicado.",
        author: "Equipe EBGreen",
      },
      { type: "h2", id: "vale", text: "Vale a pena em 2026?" },
      {
        type: "p",
        text: "Para quem tem capital, sim. Especialmente nas categorias reservadas. Mas a chave é seleção do projeto e gestão da diligência. Em casos bem montados, é um Green Card previsível, com prazos administráveis e baixo risco operacional para a família. Em casos mal estruturados, é dinheiro queimado.",
      },
      {
        type: "p",
        text: "A EBGreen avalia gratuitamente seu perfil e ajuda a entender se o EB-5 é o caminho ou se outra rota — mais barata ou mais rápida — combina mais com seu objetivo.",
      },
      { type: "cta", text: "Quero avaliar minha estratégia EB-5" },
    ],
    externalLinks: [
      {
        label: "USCIS — EB-5 Immigrant Investor Program",
        url: "https://www.uscis.gov/working-in-the-united-states/permanent-workers/eb-5-immigrant-investor-program",
      },
      {
        label: "EB-5 Reform and Integrity Act of 2022",
        url: "https://www.congress.gov/bill/117th-congress/house-bill/2617",
      },
      {
        label: "Visa Bulletin",
        url: "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html",
      },
    ],
    related: ["custo-real-imigrar-eua-2026", "visto-e2-investir-morar-eua", "eb2-niw-guia-definitivo-2026"],
  },

  {
    id: 16,
    slug: "custo-real-imigrar-eua-2026",
    titulo: "Custo Real de Imigrar para os EUA em 2026",
    categoria: "Green Card",
    data: "16 mar 2026",
    leitura: "8 min",
    imagem: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80&fit=crop",
    excerpt:
      "O orçamento honesto: taxas, advogado, mudança, primeiros 6 meses. Sem maquiagem, sem otimismo barato.",
    metaTitle: "Quanto Custa Imigrar para os EUA em 2026 — Guia Completo | EBGreen",
    metaDescription:
      "O custo real para imigrar para os EUA em 2026: taxas USCIS, honorários, mudança e primeiros meses. Planilha realista para famílias brasileiras.",
    author: "Equipe EBGreen",
    content: [
      {
        type: "p",
        text: "Quase todo brasileiro que pesquisa imigração começa fazendo a pergunta errada: \"quanto custa o Green Card?\". A pergunta certa é: \"quanto custa imigrar de verdade — do primeiro pagamento até estar com a vida montada nos EUA?\".",
      },
      {
        type: "p",
        text: "Esse artigo te entrega um orçamento honesto. Sem maquiagem. Sem otimismo barato. Faixas reais com base em casos que vemos rodar todo mês.",
      },
      { type: "h2", id: "categorias", text: "As 4 grandes categorias de custo" },
      {
        type: "ordered",
        items: [
          "Custos legais (taxas governamentais + honorários).",
          "Custos de mudança e logística.",
          "Custos dos primeiros 3 a 6 meses nos EUA.",
          "Custo de oportunidade (capital imobilizado, perda de renda durante a transição).",
        ],
      },
      { type: "h2", id: "taxas-uscis", text: "Taxas USCIS e Departamento de Estado em 2026" },
      {
        type: "p",
        text: "Para os principais Green Cards baseados em emprego (EB-1A, EB-2 NIW, EB-3):",
      },
      {
        type: "list",
        items: [
          "I-140 (petição): USD 715.",
          "Asylum Program Fee: USD 600 (padrão), USD 300 (pequenos empregadores), USD 0 (auto-petição).",
          "I-485 (ajuste de status, se nos EUA): USD 1.440 por pessoa adulta.",
          "Processo consular DS-260: USD 345 + USD 220 USCIS Immigrant Fee por pessoa.",
          "Premium processing (opcional): USD 2.805.",
          "Exames médicos: USD 200 a 500 por pessoa.",
        ],
      },
      {
        type: "callout",
        title: "Vale a pena premium?",
        text: "Em 95% dos casos, sim. Você antecipa decisão em 6 a 12 meses. Em planejamento familiar, esses meses valem mais que os USD 2.805.",
      },
      { type: "h2", id: "honorarios", text: "Honorários de assessoria" },
      {
        type: "p",
        text: "Honorários variam pelo tipo de visto, complexidade, número de dependentes e estratégia. Faixas realistas:",
      },
      {
        type: "list",
        items: [
          "EB-2 NIW (peticionário principal): USD 6.000 a 12.000.",
          "EB-1A (peticionário principal): USD 8.000 a 15.000.",
          "O-1 (com patrocínio): USD 5.000 a 9.000.",
          "EB-5: USD 25.000 a 50.000 + custos do projeto.",
          "Ajuste de status para dependentes: USD 1.500 a 3.500 por pessoa.",
        ],
      },
      {
        type: "p",
        text: "Cuidado com preço fora da curva — para baixo ou para cima. Honorário muito barato costuma vir de quem trata caso como produto. Honorário muito alto nem sempre vem de quem entrega mais. Compare estratégia, não só número.",
      },
      { type: "h2", id: "logistica", text: "Mudança e logística" },
      {
        type: "list",
        items: [
          "Passagens aéreas (família de 4): USD 2.500 a 5.000.",
          "Mudança internacional (container) ou venda de bens: USD 4.000 a 12.000.",
          "Hospedagem temporária nos primeiros 30 a 60 dias: USD 4.000 a 8.000.",
          "Carro: USD 15.000 a 30.000 (financiado ou à vista).",
          "Setup inicial em casa nova (móveis, eletrodomésticos): USD 8.000 a 20.000.",
          "Tradução juramentada de documentos pessoais: USD 800 a 2.000.",
        ],
      },
      { type: "h2", id: "primeiros-meses", text: "Primeiros 6 meses nos EUA" },
      {
        type: "p",
        text: "É a parte mais subestimada. Famílias brasileiras costumam superdimensionar o custo do processo legal e subdimensionar o custo de viver os primeiros meses sem renda local consolidada.",
      },
      {
        type: "list",
        items: [
          "Aluguel residencial (família de 4, cidades médias): USD 2.500 a 4.500/mês.",
          "Plano de saúde sem subsídio: USD 1.200 a 2.500/mês para uma família.",
          "Escola (pública é gratuita; particular varia muito).",
          "Mercado, transporte, contas: USD 2.000 a 3.500/mês.",
          "Reserva de emergência mínima: 6 meses de despesa fixa.",
        ],
      },
      { type: "h2", id: "totais", text: "Cenários totais — família de 4 pessoas" },
      {
        type: "h3",
        text: "Cenário 1: EB-2 NIW via processo consular",
      },
      {
        type: "p",
        text: "Custo legal completo + mudança + 6 meses de vida nos EUA: USD 80.000 a 130.000.",
      },
      {
        type: "h3",
        text: "Cenário 2: EB-1A com premium processing",
      },
      {
        type: "p",
        text: "Custo legal completo + mudança + 6 meses: USD 95.000 a 150.000.",
      },
      {
        type: "h3",
        text: "Cenário 3: EB-5 em TEA",
      },
      {
        type: "p",
        text: "Investimento + custo legal + mudança + 6 meses: USD 880.000 a 1.020.000.",
      },
      { type: "h2", id: "como-economizar", text: "Onde dá para economizar com inteligência" },
      {
        type: "list",
        items: [
          "Mudança: vender mais no Brasil e comprar nos EUA costuma ser mais barato que container.",
          "Carro: usados de 2 a 4 anos têm relação custo-benefício superior.",
          "Plano de saúde: cotar na Open Enrollment certa pode reduzir 30 a 40%.",
          "Escola: pública americana é referência em muitas regiões — pesquise distritos.",
          "Honorários: prefira escopo bem definido a pacotes \"all inclusive\" inflados.",
        ],
      },
      { type: "h2", id: "armadilhas", text: "Armadilhas mais comuns" },
      {
        type: "list",
        items: [
          "Subestimar reserva de emergência.",
          "Comprar imóvel no primeiro ano (decisão grande, mercado novo).",
          "Confundir custo do processo com custo total do projeto migratório.",
          "Negligenciar planejamento tributário Brasil-EUA.",
        ],
      },
      {
        type: "p",
        text: "Para entender qual rota cabe no seu orçamento e no seu perfil, faça uma análise gratuita com a EBGreen. A primeira conversa já te dá clareza de cenários.",
      },
      { type: "cta", text: "Quero entender meu cenário de custo" },
    ],
    externalLinks: [
      {
        label: "USCIS — Fee Schedule",
        url: "https://www.uscis.gov/g-1055",
      },
      {
        label: "Travel.gov — Fees for Visa Services",
        url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/fees.html",
      },
    ],
    related: ["eb2-niw-guia-definitivo-2026", "eb5-green-card-investimento-2026", "eb1a-talento-extraordinario"],
  },

  // ===== Lote restante (sem conteúdo completo ainda) =====
  {
    id: 2,
    slug: "dossie-eb2-niw-irrefutavel",
    titulo: "Como Montar um Dossiê EB-2 NIW Irrefutável",
    categoria: "EB-2 NIW",
    data: "02 mar 2026",
    leitura: "10 min",
    imagem: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80&fit=crop",
    excerpt:
      "Não é sobre escrever bonito — é sobre evidência amarrada em narrativa. O passo a passo do dossiê que o USCIS aprova.",
    metaTitle: "Dossiê EB-2 NIW: Como Montar um Caso Aprovado | EBGreen",
    metaDescription:
      "Estrutura completa do dossiê EB-2 NIW: evidências por critério Dhanasar, cartas de recomendação, plano nacional e erros que derrubam casos.",
    author: "Equipe EBGreen",
    content: [
      { type: "p", text: "Dossiê de EB-2 NIW não é uma pilha de diplomas. É uma narrativa estruturada em torno de três perguntas que o oficial do USCIS faz no momento que abre o seu processo: o trabalho dela tem mérito e importância nacional? Ela está bem posicionada para continuar entregando isso? Faz sentido o governo dispensar a oferta de emprego no caso dela?" },
      { type: "p", text: "Quem responde essas três perguntas com clareza, evidência e fluxo lógico, é aprovado. Quem entrega diploma, currículo e cartas soltas, recebe RFE — ou negativa." },
      { type: "h2", id: "estrutura", text: "A estrutura de um dossiê que funciona" },
      { type: "p", text: "Existem variações, mas todo dossiê forte tem os mesmos blocos. A diferença está na qualidade de cada um." },
      { type: "ordered", items: [
        "Carta de petição (cover letter): a peça-mestre que conecta tudo.",
        "Tabela de evidência por critério Dhanasar.",
        "Cartas de recomendação (5 a 8, mescla de independentes e diretas).",
        "Plano de continuidade nos EUA (endeavor plan).",
        "Pacote de evidências objetivas — diplomas, prêmios, métricas, mídia.",
        "Currículo profissional formatado para o oficial (não o seu LinkedIn)."
      ] },
      { type: "h2", id: "carta-peticao", text: "1. Carta de petição: a peça-mestre" },
      { type: "p", text: "É o documento mais importante do dossiê. É ela que costura sua trajetória aos três critérios do <a href=\"/blog/eb2-niw-guia-definitivo-2026\">Matter of Dhanasar</a>. Bem feita, ela conduz o leitor à conclusão que você quer." },
      { type: "p", text: "Estrutura recomendada:" },
      { type: "list", items: [
        "Sumário executivo de 1 página.",
        "Quem é o peticionário (formação, trajetória, posição atual).",
        "Critério 1 — mérito substancial e importância nacional, com dados.",
        "Critério 2 — posicionamento, com prova de execução.",
        "Critério 3 — porque dispensar a oferta de emprego beneficia os EUA.",
        "Conclusão objetiva."
      ] },
      { type: "callout", title: "Tom da carta", text: "Profissional, factual, sem adjetivos exagerados. \"Líder reconhecido mundialmente\" enfraquece. \"Citado em 217 publicações revisadas por pares\" fortalece." },
      { type: "h2", id: "tabela-evidencia", text: "2. Tabela de evidência por critério" },
      { type: "p", text: "Esse é o atalho que a maioria não usa. Uma tabela cruzando cada critério Dhanasar com a evidência específica (com referência ao número da exhibit) faz o trabalho do oficial. Quanto mais você facilita a leitura, melhor o resultado." },
      { type: "h2", id: "cartas", text: "3. Cartas de recomendação que provam" },
      { type: "p", text: "O número mágico é entre 5 e 8. Menos parece pouco. Mais cansa o oficial. A composição importa mais que a quantidade." },
      { type: "h3", text: "Cartas independentes (60%)" },
      { type: "p", text: "Vêm de pessoas que não trabalharam diretamente com você, mas conhecem seu impacto. São as mais valiosas, porque mostram alcance fora do seu círculo direto. Idealmente, líderes americanos da sua área." },
      { type: "h3", text: "Cartas diretas (40%)" },
      { type: "p", text: "De ex-chefes, sócios, colaboradores, clientes. Trazem prova operacional do que você entregou." },
      { type: "callout", title: "Erro fatal", text: "Cartas com a mesma estrutura, escritas pelo próprio candidato e só assinadas pelo recomendante. O USCIS percebe — e pune. Cada carta precisa ter voz própria, exemplos próprios e ângulo próprio." },
      { type: "h2", id: "plano-continuidade", text: "4. Plano de continuidade nos EUA" },
      { type: "p", text: "É o documento que mais separa casos aprovados de negados em 2026. Não basta dizer \"pretendo continuar trabalhando na minha área\". O oficial quer ver:" },
      { type: "list", items: [
        "Quais cidades ou empresas você pretende atuar e por quê.",
        "Cartas de interesse de empresas, hospitais, universidades ou clientes americanos.",
        "Projetos já em andamento ou conversas avançadas.",
        "Estrutura jurídica (LLC criada, plano de negócio se aplicável).",
        "Alinhamento com prioridades nacionais americanas — saúde, segurança, tecnologia, sustentabilidade."
      ] },
      { type: "h2", id: "evidencias", text: "5. Pacote de evidências objetivas" },
      { type: "p", text: "Tudo numerado, organizado em exhibits, com índice no início. Inclua:" },
      { type: "list", items: [
        "Diplomas e históricos com tradução juramentada.",
        "Avaliação de equivalência acadêmica (EUA reconhece através de credential evaluators).",
        "Publicações com print da página, link e contagem de citações.",
        "Patentes registradas com número e órgão.",
        "Prêmios com regulamento e relevância explicada.",
        "Mídia: prints, links, datas, alcance estimado.",
        "Métricas de impacto: receita gerada, empregos criados, vidas atendidas, vidas salvas."
      ] },
      { type: "h2", id: "curriculo", text: "6. Currículo no formato certo" },
      { type: "p", text: "O CV do dossiê não é seu currículo de busca de emprego. Ele é técnico, denso, com cabeçalhos por categoria (formação, atuação profissional, publicações, palestras, prêmios, atuação como julgador, mídia). Cada item com data e referência cruzada à exhibit." },
      { type: "h2", id: "submissao", text: "Como submeter" },
      { type: "p", text: "Em 2026, a submissão eletrônica via myUSCIS está disponível para I-140 EB-2 NIW. Independente do canal, mantenha:" },
      { type: "list", items: [
        "Sumário executivo de 1 página no topo.",
        "Índice navegável (exhibits 1, 2, 3...).",
        "PDF único, marcadores funcionais.",
        "Backup completo guardado pelo peticionário."
      ] },
      { type: "h2", id: "rfe", text: "E se vier RFE?" },
      { type: "p", text: "Request for Evidence não é negativa. É uma chance de reforçar pontos específicos que o oficial considerou fracos. Casos bem montados que recebem RFE costumam ser aprovados após a resposta — desde que a resposta seja cirúrgica, não defensiva." },
      { type: "quote", text: "Dossiê forte é dossiê em que cada parágrafo serve a uma decisão. Tudo que não ajuda a aprovar, atrapalha." },
      { type: "h2", id: "erros", text: "Erros que matam dossiês bons" },
      { type: "list", items: [
        "Foco no candidato, não no impacto.",
        "Cartas todas iguais, escritas pelo candidato.",
        "Plano de continuidade vago.",
        "Misturar evidência forte com evidência fraca — a fraca contamina a forte.",
        "Ignorar tradução juramentada de documentos brasileiros.",
        "Não ter equivalência acadêmica formal."
      ] },
      { type: "p", text: "Se você ainda não tem clareza se seu material atual já sustenta um dossiê, a EBGreen faz uma análise gratuita do seu perfil antes de qualquer recomendação." },
      { type: "cta", text: "Quero análise do meu material EB-2 NIW" }
    ],
    externalLinks: [
      { label: "USCIS — Petitioning for EB-2 NIW", url: "https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-second-preference-eb-2" },
      { label: "USCIS Policy Manual — National Interest Waiver", url: "https://www.uscis.gov/policy-manual/volume-6-part-f-chapter-5" },
      { label: "Matter of Dhanasar", url: "https://www.justice.gov/eoir/page/file/920996/download" }
    ],
    related: ["eb2-niw-guia-definitivo-2026", "eb2-niw-professores", "eb1a-talento-extraordinario"]
  },

  {
    id: 6,
    slug: "eb3-trabalhadores-qualificados",
    titulo: "EB-3: Green Card para Trabalhadores Qualificados e Não Qualificados",
    categoria: "EB-3",
    data: "06 mar 2026",
    leitura: "9 min",
    imagem: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80&fit=crop",
    excerpt:
      "A rota mais democrática para o Green Card. Quem se qualifica, como achar patrocinador e qual a fila real em 2026.",
    metaTitle: "EB-3 em 2026: Guia Completo do Green Card por Trabalho | EBGreen",
    metaDescription:
      "EB-3 para brasileiros: subcategorias, PERM, prazos atuais, custos e como encontrar empregador americano que patrocine.",
    author: "Equipe EBGreen",
    content: [
      { type: "p", text: "O EB-3 é a categoria de Green Card baseada em emprego mais usada do mundo. Ela cobre desde profissionais com diploma até trabalhadores sem qualificação formal. Para o brasileiro médio, é o caminho mais democrático — e também o mais demorado. Em 2026, entender a fila e a estratégia faz toda a diferença." },
      { type: "h2", id: "subcategorias", text: "As três subcategorias do EB-3" },
      { type: "ordered", items: [
        "Skilled Workers: vagas que exigem no mínimo 2 anos de experiência ou treinamento.",
        "Professionals: vagas que exigem diploma de graduação americano (ou equivalente brasileiro reconhecido).",
        "Other Workers (unskilled): vagas que exigem menos de 2 anos de experiência."
      ] },
      { type: "p", text: "A subcategoria Other Workers tem fila própria, normalmente mais longa. Veja o detalhamento dela no artigo <a href=\"/blog/eb3-unskilled-patrocinador\">EB-3 Unskilled: como conseguir patrocinador</a>." },
      { type: "h2", id: "como-funciona", text: "Como funciona o processo" },
      { type: "ordered", items: [
        "Empregador americano oferece a vaga e inicia o PERM (Labor Certification) no Department of Labor.",
        "Após PERM aprovado, empregador peticiona I-140.",
        "Após I-140 aprovada, candidato faz ajuste de status (I-485) ou processo consular (DS-260).",
        "Green Card aprovado, validade de 10 anos."
      ] },
      { type: "callout", title: "PERM é a etapa decisiva", text: "O empregador precisa provar ao governo americano que recrutou no mercado local e não encontrou candidatos qualificados. Sem PERM bem feito, não há EB-3." },
      { type: "h2", id: "fila-2026", text: "Como está a fila em 2026" },
      { type: "p", text: "Brasileiros não estão no chargeability India ou China, o que é uma vantagem grande. Mesmo assim, a fila do EB-3 vem se movendo de forma irregular. As datas de prioridade no Visa Bulletin oscilam mensalmente — consulte a versão atualizada antes de planejar." },
      { type: "list", items: [
        "Skilled / Professionals: fila razoável para brasileiros, em torno de 2 a 3 anos do PERM ao Green Card.",
        "Other Workers: fila tipicamente mais longa, podendo passar de 4 a 6 anos."
      ] },
      { type: "h2", id: "perfis", text: "Perfis brasileiros que se qualificam" },
      { type: "list", items: [
        "Enfermeiros, fisioterapeutas, técnicos de saúde com formação reconhecida.",
        "Engenheiros, arquitetos, programadores com diploma de graduação.",
        "Cozinheiros, soldadores, eletricistas, mecânicos com experiência comprovada.",
        "Profissionais de hospitalidade, limpeza pesada, agricultura — em geral via Other Workers."
      ] },
      { type: "h2", id: "patrocinador", text: "Como encontrar empregador patrocinador" },
      { type: "list", items: [
        "Plataformas especializadas em vagas com sponsorship (MyVisaJobs, H1BData).",
        "Agências de recrutamento focadas em healthcare e hospitality.",
        "LinkedIn com filtro por empresas que historicamente patrocinam vistos.",
        "Indicação direta — networking ainda é o caminho mais rápido.",
        "Programas de visto institucional em redes hospitalares e hoteleiras."
      ] },
      { type: "h2", id: "custos", text: "Custos típicos" },
      { type: "list", items: [
        "PERM (custo do empregador, não do candidato): USD 4.000 a 8.000.",
        "I-140 (do empregador): USD 715 + Asylum Program Fee.",
        "I-485 / DS-260 (candidato): USD 1.440 ou USD 345 + USD 220.",
        "Premium processing I-140: USD 2.805 (opcional).",
        "Honorários: variam por estrutura."
      ] },
      { type: "p", text: "Veja o orçamento completo de imigrar em <a href=\"/blog/custo-real-imigrar-eua-2026\">Custo Real de Imigrar para os EUA em 2026</a>." },
      { type: "h2", id: "vantagens", text: "Por que o EB-3 segue relevante" },
      { type: "list", items: [
        "Não exige reconhecimento extraordinário (EB-1A) nem dossiê narrativo (EB-2 NIW).",
        "Cobre profissões manuais e técnicas que outras rotas excluem.",
        "Green Card permanente para o titular, cônjuge e filhos solteiros menores de 21.",
        "Sem necessidade de capital próprio."
      ] },
      { type: "h2", id: "armadilhas", text: "Armadilhas do EB-3" },
      { type: "list", items: [
        "Empregadores fraudulentos cobrando do candidato pelo PERM.",
        "Cartas de oferta vagas, sem salário ou descrição realista.",
        "Não validar credibilidade da empresa antes de assinar.",
        "Acreditar em prazos curtos prometidos por intermediários."
      ] },
      { type: "callout", title: "Sinal de alerta", text: "Empregador legítimo não cobra do candidato pelos custos do PERM. A lei americana proíbe. Se cobrarem, fuja." },
      { type: "p", text: "A EBGreen avalia gratuitamente seu perfil e ajuda a entender qual subcategoria do EB-3 — ou se outra rota — combina mais com você." },
      { type: "cta", text: "Quero avaliar meu caso para EB-3" }
    ],
    externalLinks: [
      { label: "USCIS — EB-3 Employment-Based Third Preference", url: "https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-third-preference-eb-3" },
      { label: "DOL — PERM Labor Certification", url: "https://www.dol.gov/agencies/eta/foreign-labor/programs/permanent" },
      { label: "Visa Bulletin", url: "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html" }
    ],
    related: ["eb3-unskilled-patrocinador", "custo-real-imigrar-eua-2026", "ajuste-status-greencard"]
  },

  {
    id: 7,
    slug: "visto-e2-investir-morar-eua",
    titulo: "Visto E-2: Como Brasileiros Podem Investir e Morar nos EUA",
    categoria: "E-2",
    data: "07 mar 2026",
    leitura: "10 min",
    imagem: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1200&q=80&fit=crop",
    excerpt:
      "O visto de investidor mais flexível do sistema americano. Quanto investir, que tipo de negócio funciona e por que o E-2 não dá Green Card.",
    metaTitle: "Visto E-2 para Brasileiros em 2026: Guia Completo | EBGreen",
    metaDescription:
      "Visto E-2 explicado: regras, valores reais de investimento, melhores tipos de negócio e como brasileiros usam o E-2 como porta de entrada nos EUA.",
    author: "Equipe EBGreen",
    content: [
      { type: "p", text: "O E-2 é o visto de investidor mais usado nos Estados Unidos. Ele é renovável indefinidamente, permite que cônjuge trabalhe livremente em qualquer empresa, e exige investimento bem menor que o EB-5. Em troca, ele tem uma característica que muita gente descobre tarde: <strong>E-2 não é Green Card e não vira Green Card sozinho</strong>." },
      { type: "p", text: "Saber usar o E-2 como porta de entrada — e não como destino final — é o que separa quem se estabelece dos que ficam em loop de renovação para sempre." },
      { type: "h2", id: "tratado", text: "Brasil tem direito ao E-2?" },
      { type: "p", text: "<strong>Sim. Desde 25 de julho de 2019</strong>, brasileiros passaram a poder solicitar o E-2 graças ao tratado de comércio entre Brasil e Estados Unidos. Antes disso, o E-2 estava fora de alcance do passaporte brasileiro." },
      { type: "h2", id: "como-funciona", text: "Como funciona o E-2" },
      { type: "p", text: "O candidato investe um valor substancial em um negócio nos EUA — próprio ou em sociedade — e dirige esse negócio. O visto inicial costuma vir por 2 a 5 anos, renovável." },
      { type: "list", items: [
        "Cônjuge recebe E-2 dependente e pode trabalhar em qualquer empresa.",
        "Filhos solteiros menores de 21 estudam livremente.",
        "Renovação ilimitada enquanto o negócio estiver ativo e lucrando.",
        "Permite morar nos EUA com flexibilidade total."
      ] },
      { type: "h2", id: "quanto-investir", text: "Quanto investir, na prática" },
      { type: "p", text: "Não existe valor mínimo oficial. O USCIS exige que o investimento seja \"substancial\" e \"proporcional ao tipo de negócio\". Na prática:" },
      { type: "list", items: [
        "Negócios de serviço (consultoria, tech, agência): a partir de USD 100.000.",
        "Restaurantes, food service, varejo pequeno: USD 150.000 a 350.000.",
        "Franquia média ou hotelaria: USD 300.000 a 800.000.",
        "Operações industriais: USD 500.000+."
      ] },
      { type: "callout", title: "Regra do bom senso", text: "Investimento muito baixo levanta suspeita; muito alto e mal estruturado também. O segredo é proporcionalidade entre capital, plano de negócio e capacidade de gerar empregos." },
      { type: "h2", id: "negocios", text: "Negócios que funcionam bem para E-2" },
      { type: "list", items: [
        "Franquias estabelecidas (subway, marriott, fitness, automotivo).",
        "Restaurantes e food trucks com plano operacional sólido.",
        "Agências digitais, consultorias, tech.",
        "Pequenos hotéis e pousadas em destinos turísticos.",
        "E-commerce com operação física (warehouse + equipe).",
        "Serviços profissionais — clínicas, escolas, academias."
      ] },
      { type: "h2", id: "passo-a-passo", text: "Passo a passo do processo" },
      { type: "ordered", items: [
        "Definição do negócio e estruturação jurídica (LLC ou Corp nos EUA).",
        "Aporte de capital com fonte lícita comprovada.",
        "Compra de equipamentos, espaço, contratação inicial.",
        "Plano de negócio detalhado com projeção de 5 anos.",
        "Submissão do DS-160 + DS-156E na embaixada americana.",
        "Entrevista consular.",
        "Aprovação e entrada nos EUA com vistos da família."
      ] },
      { type: "h2", id: "e2-vs-eb5", text: "E-2 vs. EB-5: o dilema do investidor" },
      { type: "p", text: "Esse é o ponto crítico. O E-2 é mais barato, rápido e flexível — mas não dá Green Card. O EB-5 custa muito mais, mas dá residência permanente. Veja o comparativo aprofundado em <a href=\"/blog/e2-vs-eb5-investidor\">E-2 vs EB-5</a> e o guia de <a href=\"/blog/eb5-green-card-investimento-2026\">EB-5 em 2026</a>." },
      { type: "h2", id: "ponte-greencard", text: "Como o E-2 vira ponte para o Green Card" },
      { type: "p", text: "Caminhos comuns de transição usados por empreendedores brasileiros:" },
      { type: "list", items: [
        "E-2 → EB-2 NIW: o negócio cresce e gera evidência de impacto.",
        "E-2 → EB-1C: se o empreendedor lidera operação que se expande para multinacional.",
        "E-2 → EB-5: aumentar o investimento e converter em Green Card.",
        "E-2 → EB-3: receber proposta como executivo e entrar via emprego."
      ] },
      { type: "h2", id: "armadilhas", text: "Armadilhas comuns" },
      { type: "list", items: [
        "Comprar negócio sem due diligence financeira.",
        "Subdimensionar capital de giro — operação morre no 2º ano.",
        "Confundir E-2 com Green Card.",
        "Não preparar a transição desde o início.",
        "Aporte feito por terceiros (proibido — o capital tem que ser do investidor)."
      ] },
      { type: "h2", id: "tempos-custos", text: "Tempos e custos típicos" },
      { type: "list", items: [
        "Entrevista consular: agendamento em 1 a 4 meses.",
        "Aprovação: válida por 2 a 5 anos, renovável.",
        "Taxa MRV: USD 315.",
        "Estruturação do negócio + plano: USD 8.000 a 25.000.",
        "Honorários de assessoria de visto: USD 6.000 a 12.000."
      ] },
      { type: "p", text: "A EBGreen ajuda a entender se o E-2 é o caminho certo — ou se outra rota mais aderente ao seu perfil entrega o que você procura." },
      { type: "cta", text: "Quero avaliar meu caso para E-2" }
    ],
    externalLinks: [
      { label: "USCIS — E-2 Treaty Investors", url: "https://www.uscis.gov/working-in-the-united-states/temporary-workers/e-2-treaty-investors" },
      { label: "U.S. Department of State — E-2 Visa", url: "https://travel.state.gov/content/travel/en/us-visas/employment/treaty.html" },
      { label: "Tratado Brasil-EUA E-1/E-2", url: "https://br.usembassy.gov/visas/treaty-trader-e-1-and-treaty-investor-e-2-visas/" }
    ],
    related: ["e2-vs-eb5-investidor", "eb5-green-card-investimento-2026", "empreender-eua-imigrante"]
  },

  {
    id: 8,
    slug: "eb3-unskilled-patrocinador",
    titulo: "EB-3 Unskilled Workers: Como Conseguir Patrocinador nos EUA",
    categoria: "EB-3",
    data: "08 mar 2026",
    leitura: "8 min",
    imagem: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&fit=crop",
    excerpt:
      "O caminho real do EB-3 sem diploma: setores que contratam, como evitar fraude e quanto tempo a fila leva em 2026.",
    metaTitle: "EB-3 Unskilled em 2026: Como Encontrar Patrocinador Legítimo | EBGreen",
    metaDescription:
      "Guia honesto do EB-3 Other Workers: setores que contratam, sinais de fraude, tempo de fila e o passo a passo do processo.",
    author: "Equipe EBGreen",
    content: [
      { type: "p", text: "O EB-3 Other Workers — também conhecido como EB-3 unskilled — é a única rota legítima de Green Card para brasileiros sem diploma de graduação e sem capital de investidor. Em troca, é uma rota longa, com fila historicamente lenta, e infelizmente também é o terreno preferido de intermediários fraudulentos. Este artigo te ajuda a entender o caminho real." },
      { type: "h2", id: "o-que-e", text: "O que é o EB-3 Other Workers" },
      { type: "p", text: "É a subcategoria do EB-3 para vagas que exigem menos de 2 anos de experiência ou treinamento. Foi pensada para preencher posições que o mercado americano não consegue suprir com mão de obra local." },
      { type: "p", text: "Para entender o EB-3 como um todo, leia primeiro <a href=\"/blog/eb3-trabalhadores-qualificados\">EB-3: Green Card para Trabalhadores Qualificados e Não Qualificados</a>." },
      { type: "h2", id: "setores", text: "Setores que de fato contratam via EB-3 unskilled" },
      { type: "list", items: [
        "Hospitalidade: housekeeping, food service, atendimento.",
        "Frigoríficos e processamento de alimentos.",
        "Limpeza pesada comercial e industrial.",
        "Agricultura e horticultura.",
        "Cuidadores em casas de repouso e long-term care.",
        "Jardinagem e landscaping em escala."
      ] },
      { type: "callout", title: "Realidade do mercado", text: "São empregos com salários reais entre USD 14 e USD 22/h em 2026, dependendo da região. O Green Card vem como benefício de longo prazo — a remuneração imediata costuma ser equivalente ao mercado local." },
      { type: "h2", id: "fila", text: "A fila do EB-3 unskilled em 2026" },
      { type: "p", text: "Diferente do EB-3 Skilled e Professionals, o Other Workers tem fila própria e tipicamente mais longa. As datas de prioridade no Visa Bulletin oscilam mensalmente. É realista projetar entre 4 e 7 anos do PERM ao Green Card para brasileiros." },
      { type: "p", text: "Por causa disso, muitos candidatos optam por entrar nos EUA com outro visto válido (turismo, estudante) durante a espera, mas <strong>nunca trabalham</strong> antes da autorização. Trabalhar sem permissão derruba todo o processo." },
      { type: "h2", id: "como-funciona", text: "Como funciona o processo" },
      { type: "ordered", items: [
        "Empregador americano abre vaga e inicia PERM no DOL.",
        "PERM aprovado: empregador peticiona I-140.",
        "I-140 aprovada: candidato aguarda data de prioridade ficar atual.",
        "Data atual: ajuste de status (se nos EUA) ou processo consular (se no Brasil).",
        "Green Card emitido."
      ] },
      { type: "h2", id: "patrocinador-legitimo", text: "Como identificar patrocinador legítimo" },
      { type: "list", items: [
        "Empresa real, com endereço físico verificável e operação comprovada.",
        "Histórico anterior de patrocínios bem-sucedidos (consulte MyVisaJobs).",
        "Contrato de trabalho com salário compatível com o prevailing wage da região.",
        "Não cobra do candidato pelos custos do PERM.",
        "Comunicação direta com RH ou advogado oficial — sem intermediários estranhos."
      ] },
      { type: "callout", title: "Bandeira vermelha", text: "Se cobrarem do candidato pelos custos do PERM, é fraude. A lei americana proíbe expressamente. Empregador legítimo paga essa etapa." },
      { type: "h2", id: "fraudes", text: "As fraudes mais comuns nesse mercado" },
      { type: "list", items: [
        "\"Pacotes\" de USD 30.000 a 80.000 cobrados do candidato como \"taxa de patrocínio\".",
        "Empresas fantasmas criadas só para emitir oferta de trabalho.",
        "Vagas que nunca existirão de verdade.",
        "Promessa de Green Card em prazos impossíveis (\"em 6 meses\").",
        "Documentos falsos de PERM ou I-140."
      ] },
      { type: "p", text: "Toda promessa fora do que está no Visa Bulletin oficial precisa ser tratada como suspeita." },
      { type: "h2", id: "custos-reais", text: "Custos reais do candidato" },
      { type: "list", items: [
        "I-485 / DS-260 (etapa do candidato): USD 1.440 ou USD 345 + USD 220.",
        "Exame médico: USD 200 a 500.",
        "Honorários de assessoria: variáveis.",
        "Tradução juramentada: USD 800 a 1.500.",
        "Mudança e estabelecimento: ver <a href=\"/blog/custo-real-imigrar-eua-2026\">orçamento completo</a>."
      ] },
      { type: "h2", id: "vale-a-pena", text: "Vale a pena?" },
      { type: "p", text: "Vale para quem tem perfil compatível, paciência para a fila e disposição para trabalhar duro nos primeiros anos. Para a maioria das famílias brasileiras que se enquadram, o EB-3 unskilled é a única rota legítima de Green Card sem diploma e sem capital — e por isso continua sendo procurado." },
      { type: "p", text: "A EBGreen avalia gratuitamente seu perfil, identifica patrocinadores legítimos e mostra cenários reais antes de qualquer recomendação." },
      { type: "cta", text: "Quero avaliar meu caso para EB-3 unskilled" }
    ],
    externalLinks: [
      { label: "USCIS — EB-3 Other Workers", url: "https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-third-preference-eb-3" },
      { label: "DOL — PERM Process", url: "https://www.dol.gov/agencies/eta/foreign-labor/programs/permanent" },
      { label: "Visa Bulletin", url: "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html" }
    ],
    related: ["eb3-trabalhadores-qualificados", "custo-real-imigrar-eua-2026", "ajuste-status-greencard"]
  },

  {
    id: 9,
    slug: "visto-f1-estudar-eua",
    titulo: "Visto F-1: Como Estudar nos EUA e Viver a Experiência Universitária",
    categoria: "F-1",
    data: "09 mar 2026",
    leitura: "8 min",
    imagem: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&fit=crop",
    excerpt:
      "Mais que estudar — uma porta inteligente para morar, trabalhar e construir trajetória nos Estados Unidos.",
    metaTitle: "Visto F-1 em 2026: Estudar nos EUA e Construir Carreira | EBGreen",
    metaDescription:
      "Tudo sobre o visto F-1: como aplicar, comprovação financeira, OPT, STEM extension e o caminho do estudante ao Green Card.",
    author: "Equipe EBGreen",
    content: [
      { type: "p", text: "O F-1 é o visto de estudante. Em 2026, ele continua sendo uma das portas mais inteligentes para o sonho americano — não só pelo diploma, mas pelo que vem depois: até 3 anos de autorização de trabalho via OPT/STEM, transição para visto de trabalho ou Green Card, e tempo para construir reputação nos EUA." },
      { type: "h2", id: "como-funciona", text: "Como funciona o F-1" },
      { type: "p", text: "Você precisa ser admitido em uma escola, college ou universidade americana certificada pelo SEVP (Student and Exchange Visitor Program). A escola emite o formulário I-20, que é o que abre seu pedido de visto na embaixada." },
      { type: "list", items: [
        "Cobre cursos acadêmicos, técnicos e de idioma (com regras específicas).",
        "Permite trabalho on-campus de até 20h/semana durante o semestre.",
        "Permite trabalho off-campus via CPT (durante o curso) e OPT (após formado).",
        "Cônjuge e filhos solteiros menores de 21 vêm como F-2 dependentes."
      ] },
      { type: "h2", id: "passo-a-passo", text: "Passo a passo do processo" },
      { type: "ordered", items: [
        "Escolher escola certificada pelo SEVP.",
        "Ser aceito formalmente — receber o I-20.",
        "Pagar a taxa SEVIS (USD 350 em 2026).",
        "Preencher o DS-160 e pagar a taxa MRV (USD 185).",
        "Agendar entrevista no consulado americano.",
        "Comparecer com documentação completa.",
        "Aprovado: viagem aos EUA até 30 dias antes do início do curso."
      ] },
      { type: "h2", id: "documentos", text: "Documentos para a entrevista" },
      { type: "list", items: [
        "I-20 original assinado.",
        "DS-160 confirmado.",
        "Comprovante de pagamento da taxa SEVIS.",
        "Comprovação financeira (próprio, família, sponsor ou bolsa).",
        "Histórico escolar / diplomas anteriores.",
        "Carta da escola, opcional mas recomendada.",
        "Comprovantes de vínculo com o Brasil (intenção de retornar)."
      ] },
      { type: "callout", title: "Comprovação financeira", text: "É o ponto mais subestimado. O consulado quer ver capacidade comprovada de bancar mensalidades + custo de vida pelos primeiros 12 meses, sem necessidade de trabalhar. Estimativa realista: USD 35.000 a 80.000/ano dependendo da instituição." },
      { type: "h2", id: "trabalho", text: "F-1 e trabalho: o que pode e o que não pode" },
      { type: "list", items: [
        "On-campus: liberado até 20h/semana durante o semestre, full-time nas férias.",
        "CPT (Curricular Practical Training): trabalho relacionado ao curso, durante o curso, com autorização da escola.",
        "OPT (Optional Practical Training): até 12 meses após formado, na área de estudo.",
        "STEM Extension: +24 meses para graduados em áreas STEM (total de 36 meses)."
      ] },
      { type: "p", text: "O OPT/STEM é o ponto-chave para quem quer transição. Veja em detalhe no artigo <a href=\"/blog/opt-stem-extension\">OPT e STEM Extension</a>." },
      { type: "h2", id: "transicoes", text: "Do F-1 para visto de trabalho ou Green Card" },
      { type: "p", text: "Caminhos mais comuns:" },
      { type: "list", items: [
        "F-1 → H-1B: empregador patrocina visto de trabalho via lottery.",
        "F-1 → O-1: para perfis com reconhecimento extraordinário (mais comum em pesquisa, arte, esportes).",
        "F-1 → EB-2 NIW: pesquisadores e profissionais com impacto comprovado.",
        "F-1 → EB-1A: para perfis excepcionais.",
        "F-1 → casamento com cidadão americano (caminho legítimo, mas não recomendado como estratégia)."
      ] },
      { type: "h2", id: "custos", text: "Custos típicos do F-1" },
      { type: "list", items: [
        "Mensalidade: varia muito (community college a partir de USD 8.000/ano; universidades privadas USD 50.000+).",
        "Custo de vida: USD 1.200 a 3.500/mês conforme cidade.",
        "Taxa SEVIS: USD 350.",
        "Taxa MRV: USD 185.",
        "Plano de saúde estudantil: USD 1.500 a 4.000/ano."
      ] },
      { type: "h2", id: "armadilhas", text: "Armadilhas mais comuns" },
      { type: "list", items: [
        "Escolher escola sem reputação só pelo preço — desvaloriza diploma e dificulta OPT.",
        "Trabalhar fora das regras (CPT/OPT) — perda imediata do status.",
        "Subestimar a comprovação financeira na entrevista.",
        "Não planejar transição F-1 → trabalho desde o primeiro semestre.",
        "Confundir F-1 com green card — F-1 não dá residência permanente automaticamente."
      ] },
      { type: "h2", id: "vale", text: "Vale a pena em 2026?" },
      { type: "p", text: "Para quem tem perfil acadêmico, jovem ou em transição de carreira, o F-1 ainda é uma das portas mais elegantes para os Estados Unidos. Permite tempo, networking e flexibilidade que outros vistos não oferecem." },
      { type: "p", text: "A EBGreen ajuda a planejar a jornada completa — da escolha da escola à transição para o visto definitivo." },
      { type: "cta", text: "Quero planejar meu F-1 com estratégia" }
    ],
    externalLinks: [
      { label: "USCIS — Students and Exchange Visitors", url: "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors" },
      { label: "Study in the States — DHS", url: "https://studyinthestates.dhs.gov/" },
      { label: "U.S. Department of State — Student Visa", url: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html" }
    ],
    related: ["opt-stem-extension", "visto-o1-rota-express", "eb2-niw-guia-definitivo-2026"]
  },
  {
    id: 10,
    slug: "visto-r1-religiosos",
    titulo: "Visto R-1: Trabalhadores Religiosos e o Caminho para o Green Card",
    categoria: "R-1",
    data: "10 mar 2026",
    leitura: "9 min",
    imagem: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1200&q=80&fit=crop",
    excerpt: "Conheça como líderes de fé estão vivendo sua missão e construindo comunidade nos Estados Unidos hoje.",
    metaTitle: "Visto R-1 em 2026: Guia Completo para Trabalhadores Religiosos | EBGreen",
    metaDescription: "Como funciona o visto R-1: requisitos, organização patrocinadora, prazos, salário e o caminho do R-1 para o Green Card EB-4.",
    author: "Equipe EBGreen",
    content: [
      { type: "p", text: "O visto R-1 é a porta de entrada legítima para pastores, padres, missionários, ministros de música, líderes de juventude e outros trabalhadores religiosos que querem servir nos Estados Unidos com vínculo formal a uma organização de fé. Em 2026, ele continua sendo subutilizado por brasileiros — em parte por desconhecimento, em parte por mitos sobre o processo." },
      { type: "h2", id: "o-que-e", text: "O que é o R-1" },
      { type: "p", text: "O R-1 é um visto temporário de trabalho para indivíduos que vêm aos EUA exercer função religiosa em uma organização sem fins lucrativos reconhecida pelo IRS como religious organization (geralmente sob 501(c)(3)). É concedido inicialmente por até 30 meses, renovável por mais 30 meses — total de 5 anos." },
      { type: "h2", id: "requisitos", text: "Requisitos centrais" },
      { type: "list", items: [
        "Pertencer há pelo menos 2 anos a uma denominação religiosa de boa-fé com presença legítima nos EUA.",
        "Ter oferta concreta de trabalho de organização religiosa americana qualificada.",
        "Trabalhar em função propriamente religiosa (ministro ordenado ou ocupação religiosa tradicional).",
        "Atuar em tempo integral (mínimo 20h/semana segundo o USCIS) com remuneração ou suporte comprovado.",
        "Não pretender residência permanente já no R-1 (intenção dupla limitada)."
      ] },
      { type: "callout", title: "Atenção ao termo \"denominação\"", text: "USCIS exige consistência teológica — não basta ser cristão genérico. A organização nos EUA e a comunidade de origem no Brasil precisam compartilhar credo, governança e prática religiosa comparáveis." },
      { type: "h2", id: "passo-a-passo", text: "Passo a passo do processo" },
      { type: "ordered", items: [
        "Organização americana prepara e protocola o Form I-129 com suplemento R.",
        "USCIS pode realizar visita de verificação no local da organização (site visit).",
        "Aprovado o I-129, o candidato agenda entrevista no consulado (DS-160).",
        "Entrevista com documentação religiosa, pessoal e da organização.",
        "Concedido o R-1, viagem aos EUA e início do trabalho ministerial."
      ] },
      { type: "h2", id: "documentos", text: "Documentos essenciais" },
      { type: "list", items: [
        "Carta de chamado da organização americana detalhando função, salário e duração.",
        "Comprovação de status 501(c)(3) ou equivalente da organização.",
        "Prova dos 2 anos de membership na denominação (cartas pastorais, certidões).",
        "Credenciais ministeriais: ordenação, diploma teológico, histórico ministerial.",
        "Comprovação de capacidade financeira da organização para pagar o trabalhador."
      ] },
      { type: "h2", id: "salario", text: "Salário e sustento" },
      { type: "p", text: "O R-1 admite duas formas de remuneração: salário convencional ou suporte não-monetário (moradia, alimentação, transporte) com valor de mercado documentado. Voluntariado puro não qualifica — precisa haver compensação demonstrável." },
      { type: "h2", id: "para-greencard", text: "Do R-1 para o Green Card (EB-4)" },
      { type: "p", text: "Após pelo menos 2 anos contínuos de trabalho religioso nos EUA (incluindo o tempo no R-1), o trabalhador pode pleitear residência permanente via categoria EB-4 (special immigrant religious worker). É um caminho legítimo, e detalhamos passo a passo no artigo <a href=\"/blog/r1-para-greencard\">R-1 para Green Card</a>." },
      { type: "h2", id: "armadilhas", text: "Armadilhas comuns" },
      { type: "list", items: [
        "Organização patrocinadora pequena demais ou recém-criada — gera site visit problemática.",
        "Função descrita de forma genérica (\"ajudar na igreja\") em vez de específica.",
        "Documentação ministerial fraca do Brasil.",
        "Tentar usar R-1 como atalho para morar nos EUA sem real vocação religiosa."
      ] },
      { type: "h2", id: "vale", text: "Vale a pena em 2026?" },
      { type: "p", text: "Para quem tem chamado real e organização parceira nos EUA, o R-1 é um dos caminhos mais elegantes do sistema imigratório — com transição clara para o Green Card. A EBGreen estrutura tanto o lado da organização patrocinadora quanto a documentação do candidato." },
      { type: "cta", text: "Quero avaliar meu caso R-1" }
    ],
    externalLinks: [
      { label: "USCIS — R-1 Temporary Religious Workers", url: "https://www.uscis.gov/working-in-the-united-states/temporary-workers/r-1-temporary-nonimmigrant-religious-workers" },
      { label: "USCIS — EB-4 Religious Workers", url: "https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-fourth-preference-eb-4/special-immigrant-religious-workers" },
      { label: "U.S. Department of State — Religious Worker Visa", url: "https://travel.state.gov/content/travel/en/us-visas/employment/religious-worker-visa.html" }
    ],
    related: ["r1-para-greencard", "eb2-niw-guia-definitivo-2026", "custo-real-imigrar-eua-2026"]
  },
  {
    id: 11,
    slug: "e2-vs-eb5-investidor",
    titulo: "E-2 vs EB-5: Qual Visto de Investidor é Certo para Você?",
    categoria: "E-2",
    data: "11 mar 2026",
    leitura: "10 min",
    imagem: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80&fit=crop",
    excerpt: "Veja lado a lado duas formas de investir e descubra qual combina mais com seus planos de futuro.",
    metaTitle: "E-2 vs EB-5 em 2026: Comparativo Completo de Vistos de Investidor | EBGreen",
    metaDescription: "Compare E-2 e EB-5 lado a lado: investimento mínimo, prazo, residência permanente, riscos e qual escolher para morar nos EUA.",
    author: "Equipe EBGreen",
    content: [
      { type: "p", text: "Investidor brasileiro que quer morar nos Estados Unidos tem dois caminhos clássicos: o visto E-2 (tratado de comércio) e o EB-5 (Green Card por investimento). Ambos exigem capital, mas resolvem problemas diferentes. Escolher errado custa anos — e às vezes o próprio investimento." },
      { type: "h2", id: "comparativo-rapido", text: "Comparativo rápido" },
      { type: "list", items: [
        "E-2: visto temporário renovável por tempo indeterminado, NÃO dá Green Card.",
        "EB-5: caminho direto para residência permanente para o investidor e família.",
        "E-2: investimento \"substancial\" (sem mínimo legal — prática: USD 100k+).",
        "EB-5: USD 800.000 (TEA) ou USD 1.050.000 (área comum) em 2026.",
        "E-2: aprovação em 2-6 meses; EB-5: 24-60 meses dependendo do consulado."
      ] },
      { type: "h2", id: "e2-detalhe", text: "Visto E-2 em detalhe" },
      { type: "p", text: "O E-2 é baseado em tratado bilateral. O Brasil <strong>não</strong> tem tratado com os EUA — o que significa que brasileiros precisam primeiro obter cidadania de um país elegível (Portugal, Granada, Turquia, etc.) antes de aplicar. Veja detalhes no artigo <a href=\"/blog/visto-e2-investir-morar-eua\">Visto E-2: Como Investir e Morar nos EUA</a>." },
      { type: "list", items: [
        "Investimento ativo em negócio operacional (não passivo).",
        "Negócio precisa gerar empregos para americanos (não pode ser \"marginal\").",
        "Cônjuge recebe autorização de trabalho aberta (EAD).",
        "Filhos até 21 anos como dependentes — perdem status ao completar 21.",
        "Sem caminho automático para Green Card."
      ] },
      { type: "h2", id: "eb5-detalhe", text: "EB-5 em detalhe" },
      { type: "p", text: "O EB-5 é o Green Card por investimento. Reformado em 2022 (RIA), trouxe set-aside visas para áreas rurais e de alto desemprego (TEA), reduzindo fila para brasileiros. Veja no artigo <a href=\"/blog/eb5-green-card-investimento-2026\">EB-5: Green Card por Investimento em 2026</a>." },
      { type: "list", items: [
        "USD 800.000 em projeto Regional Center (TEA) ou USD 1.050.000 em projeto direto.",
        "Investimento precisa criar/preservar 10 empregos full-time.",
        "Green Card condicional por 2 anos, depois removendo condição → permanente.",
        "Aplica-se a investidor, cônjuge e filhos solteiros menores de 21.",
        "Caminho para cidadania americana após 5 anos."
      ] },
      { type: "h2", id: "qual-escolher", text: "Qual escolher?" },
      { type: "callout", title: "Resumo prático", text: "Quer morar nos EUA rapidamente, sem precisar de Green Card agora? E-2 (com cidadania europeia). Quer Green Card de fato, com investimento estruturado e passivo via Regional Center? EB-5." },
      { type: "list", items: [
        "Empreendedor operador, capital USD 150k–500k → E-2 (se elegível).",
        "Investidor passivo, capital USD 800k+, busca Green Card → EB-5.",
        "Família com filhos chegando aos 21 → EB-5 trava o status.",
        "Quer testar mercado americano antes de comprometer Green Card → E-2 primeiro, EB-5 depois."
      ] },
      { type: "h2", id: "riscos", text: "Riscos que ninguém conta" },
      { type: "list", items: [
        "E-2: se o negócio fechar, o visto cai junto — sem rede de proteção.",
        "EB-5: projetos Regional Center variam muito em qualidade; auditoria do projeto é obrigatória.",
        "EB-5: se o projeto não criar os 10 empregos, Green Card permanente é negado.",
        "Ambos: USCIS investiga origem dos fundos — todo dólar precisa ser rastreável e legal."
      ] },
      { type: "h2", id: "ebgreen", text: "Como decidir com a EBGreen" },
      { type: "p", text: "Investidor sério não escolhe visto pelo preço — escolhe pelo objetivo de vida. A EBGreen avalia perfil familiar, horizonte de tempo, tolerância a risco e fontes de capital antes de recomendar uma rota. Em vários casos, a melhor estratégia combina E-2 no curto prazo com EB-5 no médio prazo." },
      { type: "cta", text: "Quero avaliar E-2 ou EB-5 para meu caso" }
    ],
    externalLinks: [
      { label: "USCIS — E-2 Treaty Investors", url: "https://www.uscis.gov/working-in-the-united-states/temporary-workers/e-2-treaty-investors" },
      { label: "USCIS — EB-5 Immigrant Investor Program", url: "https://www.uscis.gov/working-in-the-united-states/permanent-workers/eb-5-immigrant-investor-program" },
      { label: "U.S. Department of State — Treaty Countries", url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/fees/treaty.html" }
    ],
    related: ["visto-e2-investir-morar-eua", "eb5-green-card-investimento-2026", "custo-real-imigrar-eua-2026"]
  },
  {
    id: 12,
    slug: "viver-em-nova-york-imigrantes",
    titulo: "Viver em Nova York: Guia Real para Imigrantes Brasileiros",
    categoria: "Vida nos EUA",
    data: "12 mar 2026",
    leitura: "13 min",
    imagem: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80&fit=crop",
    excerpt: "Explore custos reais, bairros acolhedores e dicas práticas para começar com pé direito na cidade.",
    metaTitle: "Viver em Nova York em 2026: Custos, Bairros e Dicas para Brasileiros | EBGreen",
    metaDescription: "Guia honesto de Nova York para imigrantes brasileiros: aluguel, escolas, transporte, bairros melhores e como começar sem desperdiçar dinheiro.",
    author: "Equipe EBGreen",
    content: [
      { type: "p", text: "Nova York é uma cidade de extremos. É a porta mais cosmopolita dos EUA e, ao mesmo tempo, uma das mais caras do mundo. Para o brasileiro recém-chegado, a diferença entre uma transição tranquila e um pesadelo financeiro está em três decisões: bairro, escola e plano de saúde." },
      { type: "h2", id: "custo-real", text: "Custo real de morar em NY em 2026" },
      { type: "list", items: [
        "Aluguel 1-bedroom em Manhattan: USD 4.000–6.500/mês.",
        "Aluguel 1-bedroom em Brooklyn (Park Slope, Williamsburg): USD 3.200–4.800/mês.",
        "Aluguel 2-bedroom em Astoria/Queens: USD 2.800–3.800/mês.",
        "Aluguel em Newark/Jersey City (commute fácil): USD 2.200–3.500/mês.",
        "Mercado para casal: USD 800–1.200/mês.",
        "MetroCard mensal: USD 132.",
        "Plano de saúde família (mercado privado): USD 1.800–3.500/mês."
      ] },
      { type: "callout", title: "Conta de fim de mês", text: "Família de 4 com vida de classe média em NY consome facilmente USD 12.000–18.000/mês. Salário-alvo realista para ter qualidade de vida: USD 200k+ household, ou estratégia explícita de moradia em New Jersey." },
      { type: "h2", id: "bairros", text: "Bairros mais escolhidos por brasileiros" },
      { type: "list", items: [
        "Astoria (Queens) — diversidade, comida boa, metrô N/W direto para Manhattan.",
        "Long Island City — moderna, vista de Manhattan, prédios novos, preço melhor que Manhattan.",
        "Park Slope (Brooklyn) — famílias, escolas públicas excelentes, vibe de bairro.",
        "Forest Hills (Queens) — silenciosa, casas de fato, escola pública forte.",
        "Hoboken/Jersey City (NJ) — economia de 30-40% no aluguel, PATH train para Manhattan."
      ] },
      { type: "h2", id: "escolas", text: "Escolas: pública, charter ou privada?" },
      { type: "p", text: "NY tem uma das melhores redes públicas dos EUA — mas a qualidade varia drasticamente por escola, não por bairro. Use o site do <a href=\"https://www.schools.nyc.gov\" target=\"_blank\" rel=\"noopener\">NYC DOE</a> e o GreatSchools.org para checar nota da escola específica antes de fechar contrato de aluguel." },
      { type: "list", items: [
        "Pública gratuita: ótimas em Park Slope, Forest Hills, partes de Manhattan.",
        "Charter (pública gratuita por sorteio): Success Academy é referência.",
        "Privada laica: USD 45.000–65.000/ano por filho.",
        "Privada bilíngue (português): poucas opções, lista de espera."
      ] },
      { type: "h2", id: "transporte", text: "Transporte e estilo de vida" },
      { type: "p", text: "NY é a única cidade dos EUA onde NÃO ter carro é vantagem. Metrô (subway) opera 24h, é caótico mas funcional. Carro é estorvo — estacionamento mensal: USD 400–700. Ubers caros: orçamente USD 200–500/mês se for habitual." },
      { type: "h2", id: "saude", text: "Saúde nos EUA — cuidado especial em NY" },
      { type: "p", text: "Hospital em Manhattan sem seguro = falência. Antes de pisar em solo americano, contrate plano. Detalhamos opções no artigo <a href=\"/blog/saude-eua-imigrantes\">Saúde nos EUA para imigrantes</a>." },
      { type: "h2", id: "comunidade", text: "Comunidade brasileira" },
      { type: "list", items: [
        "Astoria e Newark concentram brasileiros há décadas.",
        "Igrejas brasileiras (católicas e evangélicas) em Queens e Newark.",
        "Mercados brasileiros: Brazil Plaza (NJ), Buzios (Astoria).",
        "Consulado-Geral em Manhattan — agende serviços online com antecedência."
      ] },
      { type: "h2", id: "primeiros-90", text: "Os primeiros 90 dias: roteiro" },
      { type: "ordered", items: [
        "Solicitar SSN ao chegar (se elegível pelo visto).",
        "Abrir conta bancária (Chase, Bank of America aceitam passaporte + visto + ITIN).",
        "Tirar driver's license / state ID (mesmo sem dirigir, é ID essencial).",
        "Contratar plano de saúde imediatamente.",
        "Matricular filhos na escola (DOE faz matrícula a qualquer época do ano).",
        "Construir histórico de crédito — secured card é o ponto de partida.",
        "Registrar-se no consulado brasileiro."
      ] },
      { type: "h2", id: "vale", text: "Nova York vale a pena?" },
      { type: "p", text: "Para quem busca carreira em finanças, mídia, arte, tech ou medicina, Nova York continua imbatível. Para famílias com perfil mais conservador ou que valorizam casa própria com quintal, a Flórida, Texas e Carolina do Norte costumam fazer mais sentido. A EBGreen ajuda a alinhar visto com cidade — porque escolher errado custa caro." },
      { type: "cta", text: "Quero planejar minha mudança para os EUA" }
    ],
    externalLinks: [
      { label: "NYC Department of Education", url: "https://www.schools.nyc.gov/" },
      { label: "MTA — Subway and Bus", url: "https://new.mta.info/" },
      { label: "Consulado-Geral do Brasil em Nova York", url: "https://novayork.itamaraty.gov.br/" }
    ],
    related: ["saude-eua-imigrantes", "impostos-eua-imigrantes", "custo-real-imigrar-eua-2026"]
  },
  {
    id: 13,
    slug: "o1a-vs-eb1a",
    titulo: "O-1A vs EB-1A: Qual Caminho Escolher para Sua Carreira?",
    categoria: "EB-1A",
    data: "13 mar 2026",
    leitura: "9 min",
    imagem: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80&fit=crop",
    excerpt: "Descubra qual caminho valoriza mais seu talento e acelera sua carreira no mercado americano.",
    metaTitle: "O-1A vs EB-1A em 2026: Qual Visto Escolher para Talentos Extraordinários | EBGreen",
    metaDescription: "Comparativo entre O-1A (visto temporário) e EB-1A (Green Card): requisitos, prazos, custos e estratégia de transição entre os dois.",
    author: "Equipe EBGreen",
    content: [
      { type: "p", text: "Talento extraordinário tem dois caminhos para os EUA: O-1A (visto temporário) e EB-1A (Green Card direto). Os critérios são parecidos — mas o nível de prova, o prazo e o resultado final são bem diferentes. Escolher o caminho certo pode economizar 2 anos." },
      { type: "h2", id: "comparativo", text: "Comparativo direto" },
      { type: "list", items: [
        "O-1A: visto temporário, 3 anos renováveis indefinidamente.",
        "EB-1A: Green Card permanente, com cidadania após 5 anos.",
        "O-1A: precisa de empregador ou agente patrocinador.",
        "EB-1A: self-petition — você mesmo aplica, sem precisar de empregador.",
        "O-1A: aprovação em 2-4 meses (com Premium Processing, 15 dias).",
        "EB-1A: aprovação em 8-18 meses sem fila para brasileiros em 2026."
      ] },
      { type: "h2", id: "criterios", text: "Os 8 (e 10) critérios" },
      { type: "p", text: "O-1A pede que você atenda 3 dos 8 critérios; EB-1A pede 3 dos 10 critérios. Embora se sobreponham bastante, o EB-1A tem nível de evidência mais alto: USCIS aplica análise em duas etapas (Kazarian) — primeiro confere se você cumpre os critérios, depois faz \"final merits determination\" sobre se de fato você está no topo do seu campo." },
      { type: "h3", id: "criterios-comuns", text: "Critérios que aparecem em ambos" },
      { type: "list", items: [
        "Prêmios reconhecidos nacional ou internacionalmente.",
        "Membership em associações que exigem realizações de destaque.",
        "Material publicado sobre você em mídia profissional ou geral.",
        "Atuação como juiz/avaliador do trabalho de outros.",
        "Contribuições originais de significância no campo.",
        "Autoria de artigos em revistas profissionais.",
        "Salário ou remuneração significativamente acima da média.",
        "Sucesso comercial em artes (quando aplicável)."
      ] },
      { type: "callout", title: "A grande diferença", text: "O-1A é \"você se destaca\". EB-1A é \"você está no top 1% do mundo\". O mesmo dossiê pode ser aprovado no O-1A e negado no EB-1A — não pela falta de critérios, mas pelo \"final merits\"." },
      { type: "h2", id: "estrategia", text: "Estratégia: O-1A primeiro, EB-1A depois?" },
      { type: "p", text: "Sim — para muitos perfis, é a rota mais eficiente. Você entra nos EUA via O-1A em 3-4 meses, começa a construir mais evidências (citações, prêmios americanos, mídia) e aplica EB-1A com dossiê fortalecido 12-24 meses depois. Veja casos reais no artigo <a href=\"/blog/eb1a-talento-extraordinario\">EB-1A: Visto de Talento Extraordinário</a>." },
      { type: "h2", id: "quem-deve", text: "Quem deve aplicar EB-1A direto" },
      { type: "list", items: [
        "Pesquisador com 100+ citações independentes em base como Scopus/Google Scholar.",
        "Executivo C-level com cobertura de mídia (Valor, Forbes Brasil, etc.).",
        "Atleta ou artista com prêmios de relevância nacional/internacional.",
        "Empreendedor com exit comprovado, prêmios setoriais e mídia."
      ] },
      { type: "h2", id: "quem-deve-o1", text: "Quem deve começar pelo O-1A" },
      { type: "list", items: [
        "Profissional sólido mas com mídia/citação limitada.",
        "Quem precisa entrar nos EUA rapidamente (oferta de trabalho, prazo de evento).",
        "Artistas e atletas em começo de carreira nos EUA.",
        "Founder com investimento já feito em startup nos EUA."
      ] },
      { type: "h2", id: "custos", text: "Custos comparados" },
      { type: "list", items: [
        "O-1A: taxas USCIS USD 530 + Premium USD 2.805 (opcional) + advogado USD 6k–15k.",
        "EB-1A: taxas USCIS USD 1.225 + Premium USD 2.805 + advogado USD 12k–25k."
      ] },
      { type: "h2", id: "ebgreen", text: "Como a EBGreen escolhe a rota" },
      { type: "p", text: "Fazemos uma avaliação técnica do dossiê com base nos critérios objetivos e na jurisprudência recente do AAO (Administrative Appeals Office). Se o caso é EB-1A direto, vamos direto. Se faltam 12-18 meses de fortalecimento, começamos no O-1A com plano explícito de migração." },
      { type: "cta", text: "Quero avaliar O-1A ou EB-1A no meu caso" }
    ],
    externalLinks: [
      { label: "USCIS — O-1 Individuals with Extraordinary Ability", url: "https://www.uscis.gov/working-in-the-united-states/temporary-workers/o-1-visa-individuals-with-extraordinary-ability-or-achievement" },
      { label: "USCIS — EB-1 Extraordinary Ability", url: "https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-first-preference-eb-1" },
      { label: "USCIS Policy Manual — EB-1A", url: "https://www.uscis.gov/policy-manual/volume-6-part-f-chapter-2" }
    ],
    related: ["eb1a-talento-extraordinario", "visto-o1-rota-express", "dossie-eb2-niw-irrefutavel"]
  },
  {
    id: 14,
    slug: "empreender-eua-imigrante",
    titulo: "Como Empreender nos EUA sendo Imigrante Brasileiro",
    categoria: "Green Card",
    data: "14 mar 2026",
    leitura: "12 min",
    imagem: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80&fit=crop",
    excerpt: "Veja como brasileiros criam empresas de sucesso e estruturam a vida financeira em território novo.",
    metaTitle: "Como Empreender nos EUA Sendo Brasileiro em 2026 | EBGreen",
    metaDescription: "Guia completo para brasileiros que querem empreender nos EUA: visto certo, tipo de empresa (LLC vs C-Corp), impostos, banco e mitos que custam caro.",
    author: "Equipe EBGreen",
    content: [
      { type: "p", text: "Empreender nos EUA sendo brasileiro é mais simples do que dizem — e mais arriscado do que parece. Abrir uma empresa leva dias. Operar dentro da lei imigratória, ter conta bancária funcional e construir negócio que sustente um visto leva planejamento. Esse guia traz o caminho real, sem mitos." },
      { type: "h2", id: "primeira-pergunta", text: "Primeira pergunta: você precisa morar nos EUA?" },
      { type: "p", text: "Brasileiros podem ser donos 100% de empresa americana (LLC ou C-Corp) sem morar lá. O que NÃO podem é trabalhar fisicamente nessa empresa em solo americano sem visto adequado. Confundir isso é a primeira armadilha." },
      { type: "list", items: [
        "Quero apenas operar negócio remoto (e-commerce, SaaS, consultoria) → não precisa visto.",
        "Quero estar nos EUA participando do dia a dia → precisa visto de trabalho.",
        "Quero abrir empresa para sustentar visto de moradia → precisa estrutura específica."
      ] },
      { type: "h2", id: "vistos", text: "Vistos para empreendedores brasileiros" },
      { type: "list", items: [
        "E-2 (com cidadania de país elegível): investimento ativo, renovável indefinidamente.",
        "L-1A: transferência de executivo de empresa brasileira para subsidiária americana.",
        "O-1A: founder com reconhecimento internacional comprovado.",
        "EB-2 NIW: empreendedor cujo negócio tem mérito nacional substancial.",
        "EB-1A: founder com prêmios, mídia e impacto excepcional.",
        "EB-5: investimento de USD 800k+ em projeto qualificado."
      ] },
      { type: "p", text: "Para os caminhos via L-1A e EB-2 NIW, veja respectivamente os artigos <a href=\"/blog/visto-e2-investir-morar-eua\">Visto E-2</a> e <a href=\"/blog/eb2-niw-guia-definitivo-2026\">EB-2 NIW</a>." },
      { type: "h2", id: "llc-ou-ccorp", text: "LLC ou C-Corp?" },
      { type: "callout", title: "Regra prática", text: "Vai levantar capital de venture capital? C-Corp em Delaware. Negócio próprio, e-commerce, consultoria, imobiliário? LLC. A escolha errada cria dor de cabeça tributária e impede investimento." },
      { type: "list", items: [
        "LLC: simples, tributação pass-through, sem dupla tributação no nível federal.",
        "C-Corp Delaware: padrão para startups com VC, dupla tributação mas estrutura escalável.",
        "S-Corp: NÃO disponível para non-resident aliens.",
        "Sole proprietorship: NÃO recomendado — sem proteção patrimonial."
      ] },
      { type: "h2", id: "passos-praticos", text: "Passos práticos para abrir e operar" },
      { type: "ordered", items: [
        "Escolher estado (Delaware, Wyoming, Florida ou Texas são os mais comuns).",
        "Abrir entidade (custo USD 100–500 + agente registrado USD 100–300/ano).",
        "Solicitar EIN (gratuito direto no IRS — leva 1 dia se aplicar via fax).",
        "Abrir conta bancária americana (Mercury, Relay e Wise para non-residents; Chase exige presença física).",
        "Configurar contabilidade (QuickBooks ou Xero) desde o dia 1.",
        "Contratar CPA brasileiro-americano para evitar erros de IRS e Receita Federal.",
        "Estruturar contratos com foro nos EUA e cláusulas de arbitragem."
      ] },
      { type: "h2", id: "impostos", text: "Impostos: a parte que ninguém te conta" },
      { type: "p", text: "Brasileiro com empresa nos EUA tem obrigações em DOIS países. IRS quer Form 5472 + 1120 anualmente (multa por não entregar: USD 25.000). Receita Federal quer declaração de bens no exterior + DCBE no Banco Central se aplicável. Veja detalhes no artigo <a href=\"/blog/impostos-eua-imigrantes\">Impostos nos EUA para imigrantes</a>." },
      { type: "h2", id: "armadilhas", text: "Armadilhas frequentes" },
      { type: "list", items: [
        "Operar com visto de turista (B1/B2) — é trabalho ilegal e barra futuros vistos.",
        "Esquecer Form 5472 — multa pesada e quase automática.",
        "Misturar contas pessoais e empresariais — quebra proteção da LLC.",
        "Abrir empresa em estado errado pelo benefício tributário e operar em outro — paga em ambos.",
        "Não documentar entrada de capital — gera problema de origem dos fundos no visto."
      ] },
      { type: "h2", id: "ebgreen", text: "Como a EBGreen estrutura empreendedores" },
      { type: "p", text: "Empresa serve estratégia imigratória, não o contrário. Estruturamos a entidade certa, no estado certo, com o visto compatível e com governança que sustenta a aplicação no USCIS. Empresa improvisada vira motivo de RFE (Request for Evidence) e às vezes de negativa." },
      { type: "cta", text: "Quero estruturar minha empresa nos EUA" }
    ],
    externalLinks: [
      { label: "IRS — International Taxpayers", url: "https://www.irs.gov/individuals/international-taxpayers" },
      { label: "U.S. Small Business Administration", url: "https://www.sba.gov/" },
      { label: "Delaware Division of Corporations", url: "https://corp.delaware.gov/" }
    ],
    related: ["visto-e2-investir-morar-eua", "eb5-green-card-investimento-2026", "impostos-eua-imigrantes"]
  },
  { id: 15, slug: "opt-stem-extension", titulo: "OPT e STEM Extension: Ganhe Experiência Profissional nos EUA Após se Formar", categoria: "F-1", data: "15 mar 2026", leitura: "8 min", imagem: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80&fit=crop", excerpt: "Descubra como ter até 12 meses de experiência profissional nos EUA ainda com seu visto de estudante." },
  { id: 17, slug: "eb1a-atletas-artistas", titulo: "EB-1A para Atletas e Artistas Brasileiros: Cases Reais", categoria: "EB-1A", data: "17 mar 2026", leitura: "9 min", imagem: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80&fit=crop", excerpt: "Veja histórias reais de brasileiros que usaram seu talento para construir vida nova nos Estados Unidos." },
  { id: 18, slug: "saude-eua-imigrantes", titulo: "Saúde nos EUA: Como se Proteger como Imigrante", categoria: "Vida nos EUA", data: "18 mar 2026", leitura: "10 min", imagem: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80&fit=crop", excerpt: "Descubra como se proteger e encontrar planos que fazem sentido para quem está começando do zero." },
  { id: 19, slug: "o1b-artistas", titulo: "Visto O-1B para Artistas: Reconhecimento que Abre Portas", categoria: "Visto O-1", data: "19 mar 2026", leitura: "8 min", imagem: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80&fit=crop", excerpt: "Explore como artistas brasileiros mostram seu trabalho ao mundo e conquistam espaço na cena americana." },
  { id: 20, slug: "r1-para-greencard", titulo: "R-1 para Green Card: O Caminho do Visto Religioso para a Residência", categoria: "R-1", data: "20 mar 2026", leitura: "8 min", imagem: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80&fit=crop", excerpt: "Veja como trabalhadores de fé abrem caminho para residência permanente com propósito e dedicação." },
  { id: 21, slug: "impostos-eua-imigrantes", titulo: "Impostos nos EUA para Imigrantes: O Essencial", categoria: "Vida nos EUA", data: "21 mar 2026", leitura: "9 min", imagem: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80&fit=crop", excerpt: "Entenda como organizar sua vida financeira e evitar dores de cabeça entre Brasil e Estados Unidos." },
  { id: 22, slug: "eb2-niw-professores", titulo: "EB-2 NIW para Professores: Impacto Educacional Vale Green Card", categoria: "EB-2 NIW", data: "22 mar 2026", leitura: "8 min", imagem: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80&fit=crop", excerpt: "Descubra como educadores estão mostrando que transformar vidas no Brasil vale reconhecimento nos EUA." },
  { id: 23, slug: "ajuste-status-greencard", titulo: "Ajuste de Status: Do Visto Temporário ao Green Card nos EUA", categoria: "Green Card", data: "23 mar 2026", leitura: "10 min", imagem: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=1200&q=80&fit=crop", excerpt: "Veja como mudar de visto temporário para permanente sem precisar sair do país no meio do processo." },
  { id: 24, slug: "eb1a-executivos-lideres", titulo: "EB-1A para Executivos e Líderes: Construa seu Caso", categoria: "EB-1A", data: "24 mar 2026", leitura: "9 min", imagem: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=80&fit=crop", excerpt: "Explore como líderes empresariais constroem um caso forte baseado em impacto real e trajetória de sucesso." },
  { id: 25, slug: "2026-melhor-ano-iniciar", titulo: "2026: Por que Este é o Melhor Ano para Iniciar seu Processo", categoria: "Green Card", data: "25 mar 2026", leitura: "7 min", imagem: "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=1200&q=80&fit=crop", excerpt: "Descubra por que este ano é uma janela especial para quem quer transformar o sonho americano em realidade." },
];

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
