import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
  {id:1, titulo:"EB-2 NIW: Guia Definitivo para Brasileiros em 2026", categoria:"EB-2 NIW", data:"01 mar 2026", leitura:"8 min", imagem:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80&fit=crop", excerpt:"Conheça um dos caminhos mais inteligentes para viver permanentemente nos Estados Unidos sem depender de ninguém."},
  {id:2, titulo:"Como Montar um Dossie EB-2 NIW Irrefutavel", categoria:"EB-2 NIW", data:"02 mar 2026", leitura:"10 min", imagem:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80&fit=crop", excerpt:"Veja como organizar sua trajetória de forma clara para mostrar o impacto que você já cria no Brasil."},
  {id:3, titulo:"EB-1A: Quando Voce se Qualifica como Talento Extraordinario", categoria:"EB-1A", data:"03 mar 2026", leitura:"9 min", imagem:"https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80&fit=crop", excerpt:"Explore os dez sinais que mostram que você está pronto para dar o próximo passo na carreira americana."},
  {id:4, titulo:"Visto O-1: A Rota Express para Talentos nos EUA", categoria:"Visto O-1", data:"04 mar 2026", leitura:"7 min", imagem:"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80&fit=crop", excerpt:"Descubra como talentos reconhecidos podem transformar sua carreira em uma vida nova nos Estados Unidos."},
  {id:5, titulo:"EB-5: Green Card por Investimento para Brasileiros em 2026", categoria:"EB-5", data:"05 mar 2026", leitura:"11 min", imagem:"https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&q=80&fit=crop", excerpt:"Veja como investir com segurança pode abrir as portas para uma vida estável para sua família inteira."},
  {id:6, titulo:"EB-3: Green Card para Trabalhadores Qualificados e Nao Qualificados", categoria:"EB-3", data:"06 mar 2026", leitura:"9 min", imagem:"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80&fit=crop", excerpt:"Entenda como brasileiros de diferentes formações estão construindo vida nova nos Estados Unidos hoje."},
  {id:7, titulo:"Visto E-2: Como Brasileiros Podem Investir e Morar nos EUA", categoria:"E-2", data:"07 mar 2026", leitura:"10 min", imagem:"https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=600&q=80&fit=crop", excerpt:"Explore como empreendedores brasileiros transformam ideias em negócios reais vivendo nos Estados Unidos."},
  {id:8, titulo:"EB-3 Unskilled Workers: Como Conseguir Patrocinador nos EUA", categoria:"EB-3", data:"08 mar 2026", leitura:"8 min", imagem:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&fit=crop", excerpt:"Veja como brasileiros estão encontrando empregadores que valorizam trabalho honesto e apoiam o sonho americano."},
  {id:9, titulo:"Visto F-1: Como Estudar nos EUA e Viver a Experiência Universitária", categoria:"F-1", data:"09 mar 2026", leitura:"8 min", imagem:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80&fit=crop", excerpt:"Descubra como é estudar em uma universidade americana e mergulhar em uma experiência acadêmica transformadora."},
  {id:10, titulo:"Visto R-1: Trabalhadores Religiosos e o Caminho para o Green Card", categoria:"R-1", data:"10 mar 2026", leitura:"7 min", imagem:"https://images.unsplash.com/photo-1438032005730-c779502df39b?w=600&q=80&fit=crop", excerpt:"Conheça como líderes de fé estão vivendo sua missão e construindo comunidade nos Estados Unidos hoje."},
  {id:11, titulo:"E-2 vs EB-5: Qual Visto de Investidor é Certo para Você?", categoria:"E-2", data:"11 mar 2026", leitura:"9 min", imagem:"https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80&fit=crop", excerpt:"Veja lado a lado duas formas de investir e descubra qual combina mais com seus planos de futuro."},
  {id:12, titulo:"Viver em Nova York: Guia Real para Imigrantes Brasileiros", categoria:"Vida nos EUA", data:"12 mar 2026", leitura:"13 min", imagem:"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80&fit=crop", excerpt:"Explore custos reais, bairros acolhedores e dicas práticas para começar com pé direito na cidade."},
  {id:13, titulo:"O-1A vs EB-1A: Qual Caminho Escolher para Sua Carreira?", categoria:"EB-1A", data:"13 mar 2026", leitura:"8 min", imagem:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80&fit=crop", excerpt:"Descubra qual caminho valoriza mais seu talento e acelera sua carreira no mercado americano."},
  {id:14, titulo:"Como Empreender nos EUA sendo Imigrante Brasileiro", categoria:"Green Card", data:"14 mar 2026", leitura:"11 min", imagem:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80&fit=crop", excerpt:"Veja como brasileiros criam empresas de sucesso e estruturam a vida financeira em território novo."},
  {id:15, titulo:"OPT e STEM Extension: Ganhe Experiência Profissional nos EUA Após se Formar", categoria:"F-1", data:"15 mar 2026", leitura:"8 min", imagem:"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80&fit=crop", excerpt:"Descubra como ter até 12 meses de experiência profissional nos EUA ainda com seu visto de estudante."},
  {id:16, titulo:"Custo Real de Imigrar para os EUA em 2026", categoria:"Green Card", data:"16 mar 2026", leitura:"8 min", imagem:"https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80&fit=crop", excerpt:"Explore todos os gastos envolvidos e monte um plano realista para sua mudança sem surpresas no caminho."},
  {id:17, titulo:"EB-1A para Atletas e Artistas Brasileiros: Cases Reais", categoria:"EB-1A", data:"17 mar 2026", leitura:"9 min", imagem:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&fit=crop", excerpt:"Veja histórias reais de brasileiros que usaram seu talento para construir vida nova nos Estados Unidos."},
  {id:18, titulo:"Saude nos EUA: Como se Proteger como Imigrante", categoria:"Vida nos EUA", data:"18 mar 2026", leitura:"10 min", imagem:"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&fit=crop", excerpt:"Descubra como se proteger e encontrar planos que fazem sentido para quem está começando do zero."},
  {id:19, titulo:"Visto O-1B para Artistas: Reconhecimento que Abre Portas", categoria:"Visto O-1", data:"19 mar 2026", leitura:"8 min", imagem:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80&fit=crop", excerpt:"Explore como artistas brasileiros mostram seu trabalho ao mundo e conquistam espaço na cena americana."},
  {id:20, titulo:"R-1 para Green Card: O Caminho do Visto Religioso para a Residência", categoria:"R-1", data:"20 mar 2026", leitura:"8 min", imagem:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80&fit=crop", excerpt:"Veja como trabalhadores de fé abrem caminho para residência permanente com propósito e dedicação."},
  {id:21, titulo:"Impostos nos EUA para Imigrantes: O Essencial", categoria:"Vida nos EUA", data:"21 mar 2026", leitura:"9 min", imagem:"https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80&fit=crop", excerpt:"Entenda como organizar sua vida financeira e evitar dores de cabeça entre Brasil e Estados Unidos."},
  {id:22, titulo:"EB-2 NIW para Professores: Impacto Educacional Vale Green Card", categoria:"EB-2 NIW", data:"22 mar 2026", leitura:"8 min", imagem:"https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80&fit=crop", excerpt:"Descubra como educadores estão mostrando que transformar vidas no Brasil vale reconhecimento nos EUA."},
  {id:23, titulo:"Ajuste de Status: Do Visto Temporario ao Green Card nos EUA", categoria:"Green Card", data:"23 mar 2026", leitura:"10 min", imagem:"https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=600&q=80&fit=crop", excerpt:"Veja como mudar de visto temporário para permanente sem precisar sair do país no meio do processo."},
  {id:24, titulo:"EB-1A para Executivos e Lideres: Construa seu Caso", categoria:"EB-1A", data:"24 mar 2026", leitura:"9 min", imagem:"https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80&fit=crop", excerpt:"Explore como líderes empresariais constroem um caso forte baseado em impacto real e trajetória de sucesso."},
  {id:25, titulo:"2026: Por que Este e o Melhor Ano para Iniciar seu Processo", categoria:"Green Card", data:"25 mar 2026", leitura:"7 min", imagem:"https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=600&q=80&fit=crop", excerpt:"Descubra por que este ano é uma janela especial para quem quer transformar o sonho americano em realidade."},
];

const Blog = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-green-deep">
      <Navbar />

      {/* Hero */}
      <section id="hero" className="relative pt-32 pb-6 overflow-hidden bg-gradient-to-b from-green-deep via-green-medium to-green-deep">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, hsl(var(--gold) / 0.4) 0%, transparent 55%)" }} />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="relative flex flex-col md:flex-row items-start md:items-end gap-10 border-b border-gold/30 pb-12">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px w-12 bg-gold"></span>
                  <span className="font-body text-gold text-[11px] tracking-[0.4em] font-semibold uppercase">
                    Estratégias Migratórias
                  </span>
                </div>
                <h1 className="font-display font-medium text-cream leading-[0.95] tracking-tight text-4xl sm:text-5xl md:text-6xl">
                  Caminhos para o
                  <br />
                  <span className="text-gradient-gold">Green Card</span>
                </h1>
              </div>

              <div className="md:w-1/3 flex flex-col gap-6">
                <p className="font-body text-cream/60 text-sm md:text-base leading-relaxed border-l border-gold pl-6">
                  Conteúdos estratégicos para quem deseja entender os caminhos para viver e trabalhar legalmente nos Estados Unidos.
                </p>
              </div>

              <div className="hidden md:block absolute -top-4 -right-4 w-24 h-24 border-t border-r border-gold/20"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pt-8 pb-20 bg-green-deep">
        <div className="container mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[...blogPosts].reverse().map((post, index) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="group bg-green-medium rounded-lg overflow-hidden border border-cream/10 hover:border-eligibility-green/60 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.imagem}
                    alt={post.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-deep via-green-deep/30 to-transparent" />
                  <span className="absolute top-4 left-4 inline-block px-3 py-1 rounded-sm text-[11px] font-semibold font-body bg-gradient-gold text-green-deep shadow-card">
                    {post.categoria}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-display text-xl font-bold text-cream mb-3 leading-snug group-hover:text-gold transition-colors">
                    {post.titulo}
                  </h2>

                  <p className="font-body text-cream/60 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-4 mb-5">
                    <span className="inline-block px-3 py-1 rounded-sm text-[11px] font-semibold font-body bg-green-deep/80 text-cream">
                      {post.data}
                    </span>
                  </div>

                  <button className="btn-highlight inline-flex items-center justify-center gap-2 bg-gradient-gold text-green-deep px-6 py-3 rounded-md font-bold text-sm font-body hover:opacity-90 transition-opacity shadow-card hover:shadow-card-hover w-full group/btn">
                    Ler Artigo
                    <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {blogPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-cream/50 text-lg">
                Nenhum artigo encontrado nesta categoria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-green-deep to-green-medium border-t border-cream/10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
              Seu <span className="text-gradient-gold">Green Card</span> pode começar com uma análise gratuita.
            </h2>
            <p className="text-cream/70 font-body text-lg mb-8">
              Fale agora com um dos nossos especialistas e descubra os caminhos mais adequados para o seu perfil.
            </p>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-whatsapp-lead"))}
              className="btn-highlight inline-flex items-center gap-2 bg-gradient-gold text-green-deep px-8 py-4 rounded-md font-bold text-lg font-body hover:opacity-90 transition-opacity shadow-card hover:shadow-card-hover"
            >
              {t(translations.nav.cta, lang)}
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
