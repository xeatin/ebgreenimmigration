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
  { id: 2, slug: "dossie-eb2-niw-irrefutavel", titulo: "Como Montar um Dossiê EB-2 NIW Irrefutável", categoria: "EB-2 NIW", data: "02 mar 2026", leitura: "10 min", imagem: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80&fit=crop", excerpt: "Veja como organizar sua trajetória de forma clara para mostrar o impacto que você já cria no Brasil." },
  { id: 6, slug: "eb3-trabalhadores-qualificados", titulo: "EB-3: Green Card para Trabalhadores Qualificados e Não Qualificados", categoria: "EB-3", data: "06 mar 2026", leitura: "9 min", imagem: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80&fit=crop", excerpt: "Entenda como brasileiros de diferentes formações estão construindo vida nova nos Estados Unidos hoje." },
  { id: 7, slug: "visto-e2-investir-morar-eua", titulo: "Visto E-2: Como Brasileiros Podem Investir e Morar nos EUA", categoria: "E-2", data: "07 mar 2026", leitura: "10 min", imagem: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1200&q=80&fit=crop", excerpt: "Explore como empreendedores brasileiros transformam ideias em negócios reais vivendo nos Estados Unidos." },
  { id: 8, slug: "eb3-unskilled-patrocinador", titulo: "EB-3 Unskilled Workers: Como Conseguir Patrocinador nos EUA", categoria: "EB-3", data: "08 mar 2026", leitura: "8 min", imagem: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&fit=crop", excerpt: "Veja como brasileiros estão encontrando empregadores que valorizam trabalho honesto e apoiam o sonho americano." },
  { id: 9, slug: "visto-f1-estudar-eua", titulo: "Visto F-1: Como Estudar nos EUA e Viver a Experiência Universitária", categoria: "F-1", data: "09 mar 2026", leitura: "8 min", imagem: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&fit=crop", excerpt: "Descubra como é estudar em uma universidade americana e mergulhar em uma experiência acadêmica transformadora." },
  { id: 10, slug: "visto-r1-religiosos", titulo: "Visto R-1: Trabalhadores Religiosos e o Caminho para o Green Card", categoria: "R-1", data: "10 mar 2026", leitura: "7 min", imagem: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1200&q=80&fit=crop", excerpt: "Conheça como líderes de fé estão vivendo sua missão e construindo comunidade nos Estados Unidos hoje." },
  { id: 11, slug: "e2-vs-eb5-investidor", titulo: "E-2 vs EB-5: Qual Visto de Investidor é Certo para Você?", categoria: "E-2", data: "11 mar 2026", leitura: "9 min", imagem: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80&fit=crop", excerpt: "Veja lado a lado duas formas de investir e descubra qual combina mais com seus planos de futuro." },
  { id: 12, slug: "viver-em-nova-york-imigrantes", titulo: "Viver em Nova York: Guia Real para Imigrantes Brasileiros", categoria: "Vida nos EUA", data: "12 mar 2026", leitura: "13 min", imagem: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80&fit=crop", excerpt: "Explore custos reais, bairros acolhedores e dicas práticas para começar com pé direito na cidade." },
  { id: 13, slug: "o1a-vs-eb1a", titulo: "O-1A vs EB-1A: Qual Caminho Escolher para Sua Carreira?", categoria: "EB-1A", data: "13 mar 2026", leitura: "8 min", imagem: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80&fit=crop", excerpt: "Descubra qual caminho valoriza mais seu talento e acelera sua carreira no mercado americano." },
  { id: 14, slug: "empreender-eua-imigrante", titulo: "Como Empreender nos EUA sendo Imigrante Brasileiro", categoria: "Green Card", data: "14 mar 2026", leitura: "11 min", imagem: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80&fit=crop", excerpt: "Veja como brasileiros criam empresas de sucesso e estruturam a vida financeira em território novo." },
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
