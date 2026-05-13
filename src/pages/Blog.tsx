import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

type BlogPost = {
  id: number;
  titulo: string;
  categoria: string;
  data: string;
  leitura: string;
  imagem: string;
  excerpt: string;
};

const blogPosts: BlogPost[] = [
  {id:1, titulo:"EB-2 NIW: Guia Definitivo para Brasileiros em 2026", categoria:"EB-2 NIW", data:"01 mar 2026", leitura:"8 min", imagem:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80&fit=crop", excerpt:"Descubra como o EB-2 NIW pode ser seu caminho mais rapido para a residencia permanente nos EUA sem precisar de um empregador patrocinador."},
  {id:2, titulo:"Como Montar um Dossie EB-2 NIW Irrefutavel", categoria:"EB-2 NIW", data:"02 mar 2026", leitura:"10 min", imagem:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80&fit=crop", excerpt:"Estrategias dos aprovados para documentar impacto nacional de forma convincente e superar os avaliadores do USCIS."},
  {id:3, titulo:"EB-1A: Quando Voce se Qualifica como Talento Extraordinario", categoria:"EB-1A", data:"03 mar 2026", leitura:"9 min", imagem:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop", excerpt:"Conhea os 10 criterios do USCIS para o EB-1A e descubra quais voce ja atende para solicitar a residencia permanente."},
  {id:4, titulo:"Visto O-1: A Rota Express para Talentos nos EUA", categoria:"Visto O-1", data:"04 mar 2026", leitura:"7 min", imagem:"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80&fit=crop", excerpt:"Se voce e reconhecido na sua area, o Visto O-1 pode ser sua porta de entrada para o mercado americano em poucos meses."},
  {id:5, titulo:"Green Card EB-5: Vale a Pena para Brasileiros em 2026?", categoria:"Green Card", data:"05 mar 2026", leitura:"11 min", imagem:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80&fit=crop", excerpt:"Com aportes a partir de USD 800 mil, o EB-5 atrai investidores. Analisamos riscos, vantagens e o cenario atual dos projetos aprovados."},
  {id:6, titulo:"Convalidacao de Diploma nos EUA: Passo a Passo Completo", categoria:"Vida nos EUA", data:"06 mar 2026", leitura:"8 min", imagem:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80&fit=crop", excerpt:"Ter seu diploma reconhecido nos EUA e fundamental para exercer sua profissao. Confira o processo completo por area de atuacao."},
  {id:7, titulo:"10 Melhores Cidades dos EUA para Imigrantes Brasileiros 2026", categoria:"Vida nos EUA", data:"07 mar 2026", leitura:"12 min", imagem:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80&fit=crop", excerpt:"De Miami a Seattle, mapeamos as cidades com melhor custo-beneficio, comunidade brasileira e oportunidades de emprego."},
  {id:8, titulo:"EB-2 NIW para Profissionais de Saude: Guia Completo", categoria:"EB-2 NIW", data:"08 mar 2026", leitura:"9 min", imagem:"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&fit=crop", excerpt:"Medicos, enfermeiros e pesquisadores tem vantagens especificas no processo EB-2 NIW. Saiba como acelerar seu caso."},
  {id:9, titulo:"Como Funcionam as Prioridades de Vistos de Imigracao nos EUA", categoria:"Green Card", data:"09 mar 2026", leitura:"6 min", imagem:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80&fit=crop", excerpt:"O sistema de preferencias EB-1 a EB-5 explicado de forma clara para brasileiros que desejam imigrar legalmente."},
  {id:10, titulo:"Networking Estrategico para Brasileiros nos EUA", categoria:"Vida nos EUA", data:"10 mar 2026", leitura:"7 min", imagem:"https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80&fit=crop", excerpt:"Como construir conexoes genuinas que aceleram sua carreira e fortalecem seu processo imigratório nos Estados Unidos."},
  {id:11, titulo:"EB-2 NIW para Engenheiros: Como Provar Impacto Nacional", categoria:"EB-2 NIW", data:"11 mar 2026", leitura:"10 min", imagem:"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80&fit=crop", excerpt:"Saiba como quantificar suas contribuicoes tecnicas de forma que impressione os avaliadores do USCIS no processo EB-2 NIW."},
  {id:12, titulo:"Viver em Nova York: Guia Real para Imigrantes Brasileiros", categoria:"Vida nos EUA", data:"12 mar 2026", leitura:"13 min", imagem:"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80&fit=crop", excerpt:"Custos reais, melhores bairros, transporte, saude e comunidade: tudo que voce precisa saber antes de chegar em Nova York."},
  {id:13, titulo:"O-1A vs EB-1A: Qual Caminho Escolher para Sua Carreira?", categoria:"EB-1A", data:"13 mar 2026", leitura:"8 min", imagem:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80&fit=crop", excerpt:"Compare os dois vistos de habilidade extraordinaria e descubra qual deles se encaixa melhor no seu perfil profissional."},
  {id:14, titulo:"Como Empreender nos EUA sendo Imigrante Brasileiro", categoria:"Green Card", data:"14 mar 2026", leitura:"11 min", imagem:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80&fit=crop", excerpt:"Estruturas societarias, obrigacoes fiscais e os melhores vistos para brasileiros que desejam abrir empresas nos EUA."},
  {id:15, titulo:"EB-2 NIW para Cientistas: Transforme Pesquisa em Green Card", categoria:"EB-2 NIW", data:"15 mar 2026", leitura:"9 min", imagem:"https://images.unsplash.com/photo-1532094349884-543559371b9b?w=600&q=80&fit=crop", excerpt:"Artigos, citacoes e projetos de pesquisa sao ativos poderosos no EB-2 NIW. Saiba como apresenta-los estrategicamente."},
  {id:16, titulo:"Custo Real de Imigrar para os EUA em 2026", categoria:"Green Card", data:"16 mar 2026", leitura:"8 min", imagem:"https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80&fit=crop", excerpt:"Taxas do USCIS, honorarios advocaticios, mudanca e estabelecimento: mapeamento completo para voce se planejar."},
  {id:17, titulo:"EB-1A para Atletas e Artistas Brasileiros: Cases Reais", categoria:"EB-1A", data:"17 mar 2026", leitura:"9 min", imagem:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&fit=crop", excerpt:"Atletas de alto rendimento e artistas ja conquistaram o EB-1A. Veja como estruturar seu dossie com base nos aprovados."},
  {id:18, titulo:"Saude nos EUA: Como se Proteger como Imigrante", categoria:"Vida nos EUA", data:"18 mar 2026", leitura:"10 min", imagem:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&q=80&fit=crop", excerpt:"O sistema de saude americano e caro e complexo. Entenda os planos disponiveis e os seguros essenciais para imigrantes."},
  {id:19, titulo:"Visto O-1B para Artistas: Reconhecimento que Abre Portas", categoria:"Visto O-1", data:"19 mar 2026", leitura:"8 min", imagem:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80&fit=crop", excerpt:"O O-1B e dedicado a profissionais das artes e entretenimento. Descubra os criterios e como montar um portfolio vencedor."},
  {id:20, titulo:"O Caso Dhanasar e o Futuro do EB-2 NIW", categoria:"EB-2 NIW", data:"20 mar 2026", leitura:"11 min", imagem:"https://images.unsplash.com/photo-1589216532372-1c2a367900d9?w=600&q=80&fit=crop", excerpt:"Como o precedente Dhanasar redefiniu os criterios do EB-2 NIW e como estruturar seu argumento com base nos 3 pilares."},
  {id:21, titulo:"Impostos nos EUA para Imigrantes: O Essencial", categoria:"Vida nos EUA", data:"21 mar 2026", leitura:"9 min", imagem:"https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80&fit=crop", excerpt:"Obrigacoes fiscais, como declarar nos dois paises e como evitar a bitributacao entre Brasil e Estados Unidos."},
  {id:22, titulo:"EB-2 NIW para Professores: Impacto Educacional Vale Green Card", categoria:"EB-2 NIW", data:"22 mar 2026", leitura:"8 min", imagem:"https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80&fit=crop", excerpt:"Professores e pesquisadores educacionais tem perfil ideal para o EB-2 NIW. Saiba como documentar seu impacto no setor."},
  {id:23, titulo:"Ajuste de Status: Do Visto Temporario ao Green Card nos EUA", categoria:"Green Card", data:"23 mar 2026", leitura:"10 min", imagem:"https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=600&q=80&fit=crop", excerpt:"O Adjustment of Status permite mudar para residente permanente sem sair dos EUA. Veja requisitos, prazos e documentacao."},
  {id:24, titulo:"EB-1A para Executivos e Lideres: Construa seu Caso", categoria:"EB-1A", data:"24 mar 2026", leitura:"9 min", imagem:"https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80&fit=crop", excerpt:"Quais evidencias reunir e como apresentar sua trajetoria de lideranca e impacto empresarial no processo EB-1A."},
  {id:25, titulo:"2026: Por que Este e o Melhor Ano para Iniciar seu Processo", categoria:"Green Card", data:"25 mar 2026", leitura:"7 min", imagem:"https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=600&q=80&fit=crop", excerpt:"Mudancas nas politicas imigratórias e novas oportunidades tornam 2026 um momento estrategico para agir e iniciar seu Green Card."},
];

const categorias = ["Todos", "EB-2 NIW", "EB-1A", "Visto O-1", "Green Card", "Vida nos EUA"];

const categoryColors: Record<string, string> = {
  "EB-2 NIW": "bg-green-700 text-white",
  "EB-1A": "bg-blue-700 text-white",
  "Visto O-1": "bg-purple-700 text-white",
  "Green Card": "bg-yellow-600 text-white",
  "Vida nos EUA": "bg-orange-600 text-white",
};

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const { lang } = useLanguage();

  const filteredPosts = useMemo(() => {
    if (activeFilter === "Todos") return blogPosts;
    return blogPosts.filter((p) => p.categoria === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section id="hero" className="relative pt-32 pb-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #0a2e1a 0%, #0f4a2a 50%, #0a2e1a 100%)" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #d4a017 0%, transparent 50%)", backgroundSize: "800px 800px" }} />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Blog Ebgreen Immigration
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-body leading-relaxed">
              Guias, estrategias e insights para sua jornada ao Green Card
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-cream border-b border-green-deep/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium font-body transition-all duration-300 ${
                  activeFilter === cat
                    ? "text-white shadow-lg scale-105"
                    : "bg-white text-green-deep/80 hover:text-green-deep border border-green-deep/15 hover:border-[#d4a017]/50"
                } ${activeFilter === cat ? "bg-[#0a2e1a] border-[#0a2e1a]" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white rounded-xl overflow-hidden border border-transparent hover:border-[#d4a017] transition-all duration-300 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.imagem}
                    alt={post.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-deep/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${categoryColors[post.categoria] || "bg-gray-600 text-white"}`}>
                    {post.categoria}
                  </span>

                  {/* Title */}
                  <h2 className="font-display text-lg font-bold text-green-deep mb-2 leading-snug group-hover:text-[#0a2e1a] transition-colors">
                    {post.titulo}
                  </h2>

                  {/* Excerpt */}
                  <p className="font-body text-green-deep/60 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-green-deep/40 text-xs font-body mb-5">
                    <span>{post.data}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.leitura}
                    </span>
                  </div>

                  {/* CTA */}
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a2e1a] text-white text-sm font-semibold font-body rounded-md hover:bg-[#145c32] transition-colors group/btn">
                    Ler Artigo
                    <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-green-deep/50 text-lg">
                Nenhum artigo encontrado nesta categoria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section id="contato" className="py-20" style={{ background: "linear-gradient(135deg, #0a2e1a 0%, #0f4a2a 100%)" }}>
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Pronto para iniciar sua jornada?
            </h2>
            <p className="text-white/70 font-body text-lg mb-8">
              Agende uma avaliação gratuita e descubra o melhor caminho para o seu Green Card.
            </p>
            <a
              href="/"
              className="btn-highlight inline-flex items-center gap-2 bg-gradient-to-r from-[#d4a017] to-[#e8c766] text-[#0a2e1a] px-8 py-4 rounded-md font-bold text-lg font-body hover:opacity-90 transition-opacity shadow-lg"
            >
              {t(translations.nav.cta, lang)}
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
