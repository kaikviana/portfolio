'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Terminal, Code, X, ExternalLink, ChevronRight, Server, Mail, ArrowUpRight, Zap, MonitorPlay, Coffee } from 'lucide-react';

type ProjectData = {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  problem: string;
  solution: string;
  architecture: string[];
  image: string;
  highlight: boolean;
};

const projectsData: Record<string, ProjectData> = {
  kssoft: {
    id: 'kssoft',
    title: 'KS SOFT PDV',
    subtitle: 'Sistema de Frente de Caixa de Alta Performance',
    tags: ['Node.js', 'Fastify', 'PostgreSQL', 'Prisma', 'Vanilla JS'],
    problem: 'Pequenos e médios varejistas enfrentam gargalos no checkout devido a sistemas lentos e dependência de nuvem, resultando em perdas de conversão.',
    solution: 'Uma aplicação PDV 100% local e assíncrona. Desenvolvida para garantir resposta em milissegundos e integração com hardware periférico.',
    architecture: [
      'Backend construído com Node.js e Fastify para I/O não bloqueante.',
      'Persistência de dados utilizando PostgreSQL e Prisma ORM (conformidade ACID).',
      'Interface desenvolvida em HTML/CSS/JS Vanilla, utilizando LocalStorage e Chart.js.'
    ],
    image: '/ks-soft.png', 
    highlight: true,
  },
  landing: {
    id: 'landing',
    title: 'Landing Pages',
    subtitle: 'Páginas de Alta Conversão e Velocidade',
    tags: ['Next.js', 'Tailwind', 'UI/UX'],
    problem: 'A perda de engajamento em campanhas ocorre quando o usuário clica em um link de oferta e cai em uma página pesada, confusa ou mal adaptada.',
    solution: 'Desenvolvimento de vitrines digitais e Landing Pages com carregamento instantâneo. Estrutura focada em guiar os olhos do usuário direto para a ação.',
    architecture: [
      'Design responsivo (Mobile-First) garantindo usabilidade em qualquer tela.',
      'Otimização de métricas do Core Web Vitals (carregamento ultrarrápido).',
      'Animações fluidas e arquitetura limpa focada na retenção do usuário.'
    ],
    image: '/meu-portfolio.png', 
    highlight: false,
  },
  linkbio: {
    id: 'linkbio',
    title: 'Hub de Links (Bio)',
    subtitle: 'Agregador de Links para Instagram',
    tags: ['Mobile-First', 'UI/UX', 'Conversão'],
    problem: 'O Instagram permite apenas um link no perfil, o que limita severamente o roteamento de tráfego para múltiplos vídeos de campanhas de afiliados.',
    solution: 'Um agregador de links personalizado (estilo Linktree) construído sob medida. Ele centraliza ofertas de plataformas, redes sociais e contatos em uma única tela ultrarrápida.',
    architecture: [
      'Interface 100% Mobile-First projetada para renderizar instantaneamente no navegador interno do Instagram.',
      'Arquitetura limpa para evitar taxa de rejeição e maximizar o clique (CTR).',
      'Design minimalista com botões de alto contraste focados em direcionar o usuário para a conversão final.'
    ],
    image: '/hub-link.svg', 
    highlight: false,
  },
  catalogo: {
    id: 'catalogo',
    title: 'Catálogo Digital',
    subtitle: 'Vitrine White-label Dinâmica',
    tags: ['Next.js', 'Supabase', 'Prisma', 'NextAuth'],
    problem: 'Plataformas engessadas dificultam a vida de lojistas e afiliados que precisam de gestão rápida de estoque pelo celular e alta taxa de conversão.',
    solution: 'Plataforma web de alta performance atuando como vitrine inteligente. Permite gestão autônoma (CRUD) com busca em tempo real e redirecionamento otimizado.',
    architecture: [
      'Painel de Administração blindado com NextAuth (Google OAuth 2.0) restrito ao administrador.',
      'Backend e Database escaláveis utilizando Supabase (PostgreSQL) e Prisma ORM.',
      'Upload nativo de mídia direto do celular e arquitetura 100% Mobile-First para o consumidor final.'
    ],
    image: 'mockup', 
    highlight: false,
  },
  future: {
    id: 'future',
    title: 'Em Breve',
    subtitle: 'Pipeline de novas integrações',
    tags: ['Automação', 'API'],
    problem: 'Estruturando novas regras de negócio e modelagem de dados.',
    solution: 'Aguarde as próximas atualizações. Os sistemas estão processando novas linhas de código.',
    architecture: ['Definindo arquitetura...', 'Testando queries...', 'Criando interfaces...'],
    image: '', 
    highlight: false,
  }
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  
  const [typedName, setTypedName] = useState("");
  const [typedSub, setTypedSub] = useState("");
  const [typingPhase, setTypingPhase] = useState<"name" | "sub" | "done">("name");
  
  const fullNameStr = "Kaik Sousa";
  const subStr = "Analista de Projetos de TI Jr & Dev web.";

  useEffect(() => {
    let currentName = "";
    const typeNameInterval = setInterval(() => {
      if (currentName.length < fullNameStr.length) {
        currentName = fullNameStr.substring(0, currentName.length + 1);
        setTypedName(currentName);
      } else {
        clearInterval(typeNameInterval);
        setTypingPhase("sub");
        let currentSub = "";
        const typeSubInterval = setInterval(() => {
          if (currentSub.length < subStr.length) {
            currentSub = subStr.substring(0, currentSub.length + 1);
            setTypedSub(currentSub);
          } else {
            clearInterval(typeSubInterval);
            setTypingPhase("done");
          }
        }, 50);
      }
    }, 100);

    return () => clearInterval(typeNameInterval);
  }, []);

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedProject]);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const terminalContainer: Variants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.15 } }
  };
  
  const terminalLine: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        html, body {
          overflow-x: hidden !important;
          max-width: 100% !important;
          width: 100% !important;
        }
      ` }} />

      <main className="w-full max-w-full min-h-screen relative overflow-x-clip font-sans selection:bg-blue-500/30 bg-[#020714]">
        
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f615_1px,transparent_1px),linear-gradient(to_bottom,#3b82f615_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)]"></div>
          
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }} 
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute top-[-5%] left-[-10%] w-[60%] h-[50%] rounded-full bg-blue-600/40 blur-[120px] md:blur-[150px] mix-blend-screen"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }} 
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
            className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/30 blur-[120px] md:blur-[150px] mix-blend-screen"
          />
        </div>

        <motion.div 
          initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl"
        >
          <nav className="flex justify-between items-center px-2 py-2 bg-[#030919]/60 backdrop-blur-xl border border-blue-900/30 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.8)] ring-1 ring-blue-500/10">
            <span className="ml-4 text-slate-100 font-black tracking-tighter text-base md:text-lg">
              Kaik<span className="text-blue-500">.</span>
            </span>
            <div className="hidden md:flex gap-6 text-sm font-bold text-slate-400">
              <a href="#inicio" className="hover:text-white transition-colors">Início</a>
              <a href="#sobre" className="hover:text-white transition-colors">Background</a>
              <a href="#ecossistema" className="hover:text-white transition-colors">Projetos</a>
            </div>
            <a href="#contato" className="px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full hover:from-blue-600 hover:to-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all text-[10px] md:text-xs font-black flex items-center gap-1.5 md:gap-2 group tracking-wider md:tracking-widest uppercase">
              Bora Codar <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </nav>
        </motion.div>

        <section id="inicio" className="max-w-5xl mx-auto px-5 md:px-6 pt-36 md:pt-52 pb-16 md:pb-20 flex flex-col items-center text-center relative z-10 min-h-[85vh] justify-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-blue-950/40 border border-blue-900/50 text-blue-300 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-8 md:mb-10 backdrop-blur-md shadow-xl ring-1 ring-blue-500/20">
            <Code size={14} className="text-blue-400" />
            KS SOFT
          </motion.div>
          
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="text-5xl sm:text-7xl md:text-[8rem] font-black mb-4 md:mb-6 tracking-tighter leading-none text-white drop-shadow-2xl">
            {typedName}
            {typingPhase === "name" && <span className="animate-pulse text-blue-500">_</span>}
            {typingPhase !== "name" && <span className="text-transparent">_</span>}
          </motion.h1>
          
          <motion.h2 initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="text-lg sm:text-2xl md:text-4xl font-medium text-slate-300 mb-6 md:mb-8 tracking-tight min-h-[32px] md:min-h-[48px]">
            {typedSub}
            {typingPhase !== "name" && <span className="animate-pulse text-blue-500">_</span>}
          </motion.h2>
          
          <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.4 }} className="max-w-2xl text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed md:leading-relaxed mb-10 md:mb-12 font-light px-2">
            Transformo ideias e regras de negócio em sistemas web rápidos e escaláveis. <strong className="text-slate-200 font-medium">Do banco de dados à interface do usuário.</strong>
          </motion.p>
        </section>

        <section id="sobre" className="max-w-5xl mx-auto px-5 md:px-6 py-16 md:py-20 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="mb-8 md:mb-12">
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2 md:mb-4">Background</h3>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 auto-rows-fr">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-[#061126]/90 to-[#030919]/90 backdrop-blur-xl p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden group shadow-xl md:shadow-2xl ring-1 ring-blue-500/10 hover:ring-blue-500/20">
              <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-blue-600/10 rounded-full blur-[60px] md:blur-[80px] group-hover:bg-blue-500/20 transition-all duration-500"></div>
              <h4 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
                <Coffee className="text-blue-400" size={20} /> A Mente por Trás do Código
              </h4>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base relative z-10 font-light">
                Tenho 20 anos, estudo Análise e Desenvolvimento de Sistemas e atuo como <strong className="text-slate-200 font-medium">Analista de Projetos de TI Júnior</strong>. A <strong className="text-blue-400 font-medium">KS SOFT</strong> é o meu laboratório e agência, onde aplico engenharia de software para resolver problemas reais. Meu foco é escutar a dor do seu negócio e traduzir isso numa arquitetura que não trava e numa interface excelente.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }} className="md:col-span-1 md:row-span-2 bg-[#020510] p-2 rounded-[1.5rem] md:rounded-[2rem] border border-blue-900/30 relative group flex flex-col hover:border-blue-500/30 transition-all duration-300 ring-1 ring-blue-500/10 shadow-xl md:shadow-2xl">
              <div className="bg-[#030716] rounded-[1.2rem] md:rounded-[1.5rem] h-full overflow-hidden flex flex-col relative z-10 border border-slate-800/50 min-h-[220px]">
                <div className="bg-[#02040c] px-4 py-2.5 md:py-3 flex items-center gap-2 border-b border-blue-900/30 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                </div>
                <motion.div variants={terminalContainer} className="p-4 md:p-5 font-mono text-[11px] md:text-sm space-y-3 md:space-y-4 flex-grow overflow-y-auto custom-scrollbar">
                  <motion.div variants={terminalLine}><span className="text-blue-500">kaik</span> <span className="text-slate-500">~/stack</span> $ ls -a</motion.div>
                  <div className="text-emerald-400/90 space-y-1.5 md:space-y-2 pl-2">
                    <motion.p variants={terminalLine}>.nextjs_ssr</motion.p>
                    <motion.p variants={terminalLine}>.nodejs_fastify</motion.p>
                    <motion.p variants={terminalLine}>.postgresql</motion.p>
                    <motion.p variants={terminalLine}>.prisma_orm</motion.p>
                    <motion.p variants={terminalLine}>.tailwind_css</motion.p>
                  </div>
                  <motion.div variants={terminalLine} className="pt-2"><span className="text-blue-500">kaik</span> <span className="text-slate-500">~/stack</span> $ run dev</motion.div>
                  <motion.div variants={terminalLine} className="text-slate-400 pl-2">Compilando arquitetura...</motion.div>
                  <motion.div variants={terminalLine} className="pt-2"><span className="text-blue-500">kaik</span> <span className="text-slate-500">~/stack</span> $ <span className="animate-pulse text-slate-300">_</span></motion.div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }} className="md:col-span-1 md:row-span-1 bg-[#061126]/60 backdrop-blur-md p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-blue-900/30 flex flex-col justify-center relative overflow-hidden ring-1 ring-blue-500/10 hover:ring-blue-500/30 hover:border-blue-500/50 transition-all duration-300 group">
              <h4 className="text-xs md:text-sm font-bold text-slate-300 mb-4 md:mb-5 uppercase tracking-widest flex items-center gap-2">
                <Zap className="text-blue-500" size={14}/> Arsenal Técnico
              </h4>
              <div className="flex flex-wrap gap-2 relative z-10">
                {['PostgreSQL', 'Prisma', 'Node', 'Fastify', 'TypeScript', 'Next.js'].map(tech => (
                  <span key={tech} className="px-2.5 md:px-3 py-1 md:py-1.5 bg-[#020510] border border-blue-900/40 text-blue-200 text-[10px] md:text-xs rounded-lg md:rounded-xl font-medium shadow-inner group-hover:border-blue-800 transition-colors">{tech}</span>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.3 }} className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-blue-900/30 to-cyan-900/10 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-blue-900/40 flex flex-col justify-center items-start group hover:bg-blue-900/40 transition-all duration-300 ring-1 ring-blue-500/20 hover:ring-blue-500/40">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-400/30 text-blue-300 mb-3 md:mb-5 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Server size={20} />
              </div>
              <h4 className="text-base md:text-lg font-bold text-white mb-1.5 md:mb-2">Performance Bruta</h4>
              <p className="text-blue-200/70 text-[13px] md:text-sm leading-relaxed font-light">Sistemas construídos com lógica assíncrona. Feitos para escalar.</p>
            </motion.div>

          </div>
        </section>

        <section id="ecossistema" className="max-w-6xl mx-auto px-5 md:px-6 py-16 md:py-20 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="mb-8 md:mb-12">
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Projetos & Sistemas</h3>
          </motion.div>
          
          <div className="flex flex-col gap-6 md:gap-8">
            <motion.div 
              whileHover={{ scale: 1.01, y: -4 }}
              onClick={() => setSelectedProject(projectsData.kssoft)}
              className="cursor-pointer group bg-[#061126]/60 backdrop-blur-xl border border-blue-900/40 rounded-[1.5rem] md:rounded-[2.5rem] p-4 sm:p-6 lg:p-8 hover:border-blue-500/60 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.4)] flex flex-col md:flex-row gap-5 lg:gap-10 ring-1 ring-blue-500/10 hover:ring-blue-500/30"
            >
              <div className="w-full md:w-1/2 h-48 sm:h-56 md:h-auto rounded-2xl md:rounded-3xl overflow-hidden relative border border-blue-900/30 bg-[#020510] flex items-center justify-center group-hover:border-blue-500/40 transition-colors shadow-inner">
                <img src={projectsData.kssoft.image} alt="Tela inicial do KS SOFT PDV" className="w-full h-full object-cover md:object-contain p-2 sm:p-4 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-blue-950/20 group-hover:bg-transparent transition-colors duration-500 mix-blend-overlay"></div>
                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-blue-900/90 backdrop-blur-md text-white p-2.5 md:p-3 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 transform md:translate-y-2 group-hover:translate-y-0 border border-blue-700 shadow-lg">
                  <MonitorPlay size={16} />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center py-2 pr-2 lg:pr-4">
                <div className="hidden md:flex w-12 h-12 bg-blue-500/10 rounded-2xl items-center justify-center border border-blue-500/30 mb-5">
                  <Code className="text-blue-400" size={22} />
                </div>
                <h4 className="text-2xl md:text-4xl font-black text-white mb-2 md:mb-3 group-hover:text-blue-300 transition-colors tracking-tight">{projectsData.kssoft.title}</h4>
                <p className="text-slate-400 text-sm md:text-lg mb-4 md:mb-8 leading-relaxed font-light">{projectsData.kssoft.subtitle}</p>
                <div className="flex flex-wrap gap-2 md:gap-2.5 mt-auto">
                  {projectsData.kssoft.tags.map(tag => (
                    <span key={tag} className="px-2.5 md:px-4 py-1 md:py-1.5 bg-[#020510] border border-blue-900/40 text-blue-200 text-[10px] md:text-xs rounded-lg md:rounded-xl font-medium shadow-inner">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
              
              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => setSelectedProject(projectsData.landing)}
                className="cursor-pointer group bg-[#061126]/60 backdrop-blur-md border border-blue-900/30 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-5 flex flex-col hover:bg-[#081836]/80 hover:border-blue-500/50 transition-all duration-300 ring-1 ring-blue-500/10 hover:ring-blue-500/20 shadow-xl"
              >
                <div className="w-full h-40 md:h-48 rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6 relative border border-blue-900/30 bg-[#020510] shadow-inner">
                  <img src={projectsData.landing.image} alt={projectsData.landing.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="px-1 md:px-2 pb-1 md:pb-2 flex flex-col flex-grow">
                  <h4 className="text-lg md:text-xl font-bold text-slate-100 mb-1 md:mb-2 group-hover:text-blue-300 transition-colors tracking-tight">{projectsData.landing.title}</h4>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-4 md:mb-6 flex-grow font-light">Interfaces otimizadas para velocidade.</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="px-2.5 md:px-3 py-1 md:py-1.5 bg-[#020510] border border-blue-900/40 text-blue-200 text-[9px] md:text-[10px] rounded-md md:rounded-lg font-medium">Next.js</span>
                    <span className="px-2.5 md:px-3 py-1 md:py-1.5 bg-[#020510] border border-blue-900/40 text-blue-200 text-[9px] md:text-[10px] rounded-md md:rounded-lg font-medium">UI/UX</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => setSelectedProject(projectsData.linkbio)}
                className="cursor-pointer group bg-[#061126]/60 backdrop-blur-md border border-blue-900/30 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-5 flex flex-col hover:bg-[#081836]/80 hover:border-blue-500/50 transition-all duration-300 ring-1 ring-blue-500/10 hover:ring-blue-500/20 shadow-xl"
              >
                <div className="w-full h-40 md:h-48 rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6 relative border border-blue-900/30 bg-[#020510] shadow-inner">
                  <img src={projectsData.linkbio.image} alt={projectsData.linkbio.title} className="w-full h-full object-contain py-2 md:py-4 transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="px-1 md:px-2 pb-1 md:pb-2 flex flex-col flex-grow">
                  <h4 className="text-lg md:text-xl font-bold text-slate-100 mb-1 md:mb-2 group-hover:text-blue-300 transition-colors tracking-tight">{projectsData.linkbio.title}</h4>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-4 md:mb-6 flex-grow font-light">Agregador para conversão final.</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="px-2.5 md:px-3 py-1 md:py-1.5 bg-[#020510] border border-blue-900/40 text-blue-200 text-[9px] md:text-[10px] rounded-md md:rounded-lg font-medium">Mobile-First</span>
                  </div>
                </div>
              </motion.div>

              {/* CATÁLOGO DIGITAL (MOCKUP FRONTAL PREMIUM 100% NÍTIDO) */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => setSelectedProject(projectsData.catalogo)}
                className="cursor-pointer group bg-[#061126]/60 backdrop-blur-md border border-blue-900/30 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-5 flex flex-col hover:bg-[#081836]/80 hover:border-blue-500/50 transition-all duration-300 ring-1 ring-blue-500/10 hover:ring-blue-500/20 shadow-xl"
              >
                <div className="w-full h-40 md:h-48 rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6 relative border border-blue-900/30 bg-[#020510] shadow-inner flex items-center justify-center p-2">
                  
                  {/* Container dos Aparelhos (Frontais, limpos e realistas) */}
                  <div className="relative w-full max-w-[260px] flex items-end justify-center mt-4 group-hover:-translate-y-1 transition-transform duration-700">
                    
                    {/* MacBook Pro Premium */}
                    <div className="w-[90%] relative flex flex-col items-center">
                      <div className="w-full aspect-[16/10] bg-[#020617] p-1.5 md:p-2 rounded-t-xl md:rounded-t-2xl border-[3px] border-[#1E293B] shadow-2xl relative z-10 overflow-hidden">
                        <img src="/catalogo.png" alt="Desktop" className="w-full h-full object-cover object-top rounded-sm md:rounded-md relative z-10" />
                      </div>
                      {/* Base Elegante MacBook */}
                      <div className="w-[115%] h-2.5 md:h-3 bg-gradient-to-b from-[#94A3B8] to-[#475569] rounded-b-md md:rounded-b-lg relative z-20 shadow-[0_15px_20px_rgba(0,0,0,0.6)] flex justify-center border-t border-white/20">
                        <div className="w-1/5 h-1 bg-[#1E293B] rounded-b-sm opacity-60"></div>
                      </div>
                    </div>

                    {/* iPhone 14/15 Premium */}
                    <div className="absolute -bottom-3 -right-2 w-[26%] aspect-[9/19.5] z-30 bg-[#020617] p-1 md:p-1.5 rounded-[1.2rem] border-[3px] border-[#334155] shadow-[-15px_10px_25px_rgba(0,0,0,0.8)] group-hover:-translate-y-2 transition-transform duration-700 overflow-hidden">
                      {/* Notch Dynamic Island */}
                      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[40%] h-1 md:h-1.5 bg-[#020617] rounded-full z-40"></div>
                      <img 
                        src="/catalogo-mobile.jpeg" 
                        alt="Mobile" 
                        className="w-full h-full object-cover object-top rounded-[0.8rem] relative z-10" 
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          if (t.src.endsWith('.jpeg')) t.src = '/catalogo-mobile.jpg';
                          else if (t.src.endsWith('.jpg')) t.src = '/catalogo-mobile.png';
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="px-1 md:px-2 pb-1 md:pb-2 flex flex-col flex-grow">
                  <h4 className="text-lg md:text-xl font-bold text-slate-100 mb-1 md:mb-2 group-hover:text-blue-300 transition-colors tracking-tight">{projectsData.catalogo.title}</h4>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-4 md:mb-6 flex-grow font-light">Gestão e vitrine inteligente.</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="px-2.5 md:px-3 py-1 md:py-1.5 bg-[#020510] border border-blue-900/40 text-blue-200 text-[9px] md:text-[10px] rounded-md md:rounded-lg font-medium">Supabase</span>
                    <span className="px-2.5 md:px-3 py-1 md:py-1.5 bg-[#020510] border border-blue-900/40 text-blue-200 text-[9px] md:text-[10px] rounded-md md:rounded-lg font-medium">NextAuth</span>
                  </div>
                </div>
              </motion.div>

              {/* CARD: EM BREVE */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => setSelectedProject(projectsData.future)}
                className="cursor-pointer group bg-[#061126]/20 backdrop-blur-sm border border-blue-900/40 border-dashed rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex flex-col justify-between hover:bg-[#061126]/50 hover:border-blue-500/50 transition-all duration-300 shadow-xl"
              >
                <div>
                  <Terminal className="text-blue-900 group-hover:text-blue-500 mb-4 md:mb-6 transition-colors" size={28} />
                  <h4 className="text-lg md:text-xl font-bold text-blue-400/50 mb-1 md:mb-2 group-hover:text-blue-300 transition-colors tracking-tight">Em Breve</h4>
                  <p className="text-[11px] md:text-xs text-slate-500 font-mono">Construindo...</p>
                </div>
                <div className="w-full h-1.5 bg-[#030919] rounded-full overflow-hidden mt-6 md:mt-8 border border-blue-900/20">
                  <div className="h-full bg-blue-600/50 w-1/3 group-hover:w-full transition-all duration-[1500ms] ease-in-out"></div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        <section id="contato" className="max-w-4xl mx-auto px-5 md:px-6 py-20 md:py-32 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-gradient-to-br from-blue-900/30 to-[#030716]/90 border border-blue-900/40 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl ring-1 ring-blue-500/20">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] mix-blend-overlay pointer-events-none"></div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6 tracking-tighter relative z-10">Bora codar sua ideia?</h2>
            <p className="text-slate-400 text-sm md:text-lg mb-8 md:mb-12 max-w-xl mx-auto relative z-10 leading-relaxed font-light">
              Seja para automatizar seu negócio ou criar um sistema do zero. Me chama e vamos conversar.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 relative z-10">
              <a href="https://wa.me/5511932188497?text=Fala%20Kaik!%20Vi%20seu%20portf%C3%B3lio%20e%20queria%20trocar%20uma%20ideia%20sobre%20um%20projeto." target="_blank" rel="noopener noreferrer" className="px-6 md:px-8 py-3.5 md:py-4 bg-blue-600 text-white font-black rounded-xl md:rounded-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] text-[13px] md:text-sm tracking-wide w-full sm:w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                WhatsApp
              </a>
              <a href="#" className="px-6 md:px-8 py-3.5 md:py-4 bg-[#030919] border border-blue-900/40 text-white font-bold rounded-xl md:rounded-2xl hover:bg-[#061126] transition-all flex items-center justify-center gap-2 text-[13px] md:text-sm shadow-inner w-full sm:w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
                </svg>
                LinkedIn
              </a>
              <a href="#" className="px-6 md:px-8 py-3.5 md:py-4 bg-[#030919] border border-blue-900/40 text-white font-bold rounded-xl md:rounded-2xl hover:bg-[#061126] transition-all flex items-center justify-center gap-2 text-[13px] md:text-sm shadow-inner w-full sm:w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                GitHub
              </a>
            </div>
          </motion.div>
        </section>

        <footer className="py-6 md:py-8 text-center text-slate-500 text-[10px] md:text-xs font-medium relative z-10 pb-10 md:pb-12 border-t border-blue-900/20 px-4">
          Kaik Sousa © 2026. <span className="font-mono text-blue-500/50">KS SOFT</span>
        </footer>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="fixed inset-0 bg-[#020510]/90 backdrop-blur-md z-50 cursor-pointer" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed inset-2 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl h-[94vh] md:h-auto md:max-h-[85vh] overflow-y-auto bg-[#030919] border border-blue-900/40 rounded-2xl md:rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9)] z-50 flex flex-col custom-scrollbar ring-1 ring-blue-500/20">
              <div className="sticky top-0 bg-[#030919]/90 backdrop-blur-xl p-4 md:p-8 border-b border-blue-900/40 flex justify-between items-start z-20">
                <div className="pr-4">
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-1 tracking-tight leading-tight">{selectedProject.title}</h3>
                  <p className="text-blue-400 text-[11px] md:text-sm font-medium tracking-wide">{selectedProject.subtitle}</p>
                </div>
                <button onClick={() => setSelectedProject(null)} className="p-2 md:p-2.5 bg-[#061126] hover:bg-blue-900/50 rounded-lg md:rounded-xl text-blue-300 hover:text-white transition-colors ring-1 ring-blue-500/20 shrink-0"><X size={18} /></button>
              </div>
              
              {/* ÁREA DA IMAGEM DO MODAL (MOCKUP FRONTAL PREMIUM GIGANTE) */}
              {selectedProject.id === 'catalogo' ? (
                <div className="w-full h-56 sm:h-72 md:h-[32rem] relative bg-[#020510] border-b border-blue-900/30 shrink-0 p-4 md:p-8 flex items-center justify-center overflow-hidden">
                  
                  {/* Container dos Aparelhos (Frontais) */}
                  <div className="relative w-full max-w-sm md:max-w-xl flex items-end justify-center mt-6 z-10">
                    
                    {/* MacBook Pro Premium Gigante */}
                    <div className="w-[85%] md:w-[80%] relative flex flex-col items-center">
                      <div className="w-full aspect-[16/10] bg-[#020617] p-2 md:p-3 rounded-t-xl md:rounded-t-2xl border-[3px] md:border-[5px] border-[#1E293B] shadow-2xl relative z-20 overflow-hidden">
                        <img src="/catalogo.png" alt="Catalogo Desktop" className="w-full h-full object-cover object-top rounded-md md:rounded-lg relative z-10" />
                      </div>
                      {/* Base Elegante MacBook */}
                      <div className="w-[112%] h-4 md:h-5 bg-gradient-to-b from-[#94A3B8] to-[#475569] rounded-b-lg md:rounded-b-xl relative z-30 shadow-[0_25px_50px_rgba(0,0,0,0.9)] flex justify-center border-t border-white/20">
                        <div className="w-1/5 h-1.5 md:h-2 bg-[#1E293B] rounded-b-md opacity-60"></div>
                      </div>
                    </div>

                    {/* iPhone 14/15 Premium Gigante */}
                    <div className="absolute -bottom-6 right-0 md:-right-2 w-[26%] md:w-[22%] aspect-[9/19.5] z-40 bg-[#020617] p-1.5 md:p-2.5 rounded-[1.2rem] md:rounded-[2rem] border-[3px] md:border-[4px] border-[#334155] shadow-[-20px_15px_40px_rgba(0,0,0,0.9)] overflow-hidden">
                      {/* Notch Dynamic Island */}
                      <div className="absolute top-2.5 md:top-3.5 left-1/2 -translate-x-1/2 w-[40%] h-1.5 md:h-2 bg-[#020617] rounded-full z-40"></div>
                      <img 
                        src="/catalogo-mobile.jpeg" 
                        alt="Catalogo Mobile" 
                        className="w-full h-full object-cover object-top rounded-[0.9rem] md:rounded-[1.6rem] relative z-10" 
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          if (t.src.endsWith('.jpeg')) t.src = '/catalogo-mobile.jpg';
                          else if (t.src.endsWith('.jpg')) t.src = '/catalogo-mobile.png';
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : selectedProject.image && (
                <div className="w-full h-40 sm:h-56 md:h-[22rem] relative bg-[#020510] border-b border-blue-900/30 shrink-0 p-3 md:p-8 flex items-center justify-center">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-contain drop-shadow-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030919] via-transparent to-transparent"></div>
                </div>
              )}

              <div className="p-5 md:p-10 space-y-6 md:space-y-10 flex-grow">
                <div className="flex flex-wrap gap-2">{selectedProject.tags.map((tag: string) => (<span key={tag} className="px-3 md:px-4 py-1.5 bg-[#061126] border border-blue-900/40 text-blue-200 text-[10px] md:text-sm rounded-lg font-medium shadow-inner">{tag}</span>))}</div>
                <div className="space-y-2 md:space-y-3"><h4 className="text-base md:text-xl font-bold text-white flex items-center gap-2"><ChevronRight className="text-blue-500" size={18} /> O Problema</h4><p className="text-slate-400 leading-relaxed pl-6 text-[13px] md:text-base font-light">{selectedProject.problem}</p></div>
                <div className="space-y-2 md:space-y-3"><h4 className="text-base md:text-xl font-bold text-white flex items-center gap-2"><ChevronRight className="text-blue-500" size={18} /> A Solução</h4><p className="text-slate-400 leading-relaxed pl-6 text-[13px] md:text-base font-light">{selectedProject.solution}</p></div>
                <div className="space-y-4 md:space-y-5 bg-[#061126]/40 p-5 md:p-10 rounded-2xl md:rounded-[1.5rem] border border-blue-900/30 mt-4 md:mt-8 ring-1 ring-blue-500/10"><h4 className="text-base md:text-xl font-bold text-white flex items-center gap-2 md:gap-3"><Server className="text-blue-500" size={18} /> Detalhes da Arquitetura</h4><ul className="space-y-3 md:space-y-4 text-slate-400 pl-1 md:pl-2">{selectedProject.architecture.map((item: string, idx: number) => (<li key={idx} className="flex items-start gap-3 md:gap-4"><span className="text-blue-500 mt-0.5 md:mt-1 text-sm md:text-base">▹</span><span className="text-[13px] md:text-base leading-relaxed font-light">{item}</span></li>))}</ul></div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}