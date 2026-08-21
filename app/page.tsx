'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, X, ExternalLink, ChevronRight, Server, Mail, ArrowUpRight, Zap } from 'lucide-react';

// Tipagem estrita para a Vercel aprovar o TypeScript
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
    title: 'KS SOFT',
    subtitle: 'Sistema de Frente de Caixa (PDV) de Alta Performance',
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
  const [typedTitle, setTypedTitle] = useState("");
  
  const fullTitle = "Analista de Projetos Júnior.";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= fullTitle.length) {
        setTypedTitle(fullTitle.substring(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedProject]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const terminalContainer = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { delayChildren: 0.6, staggerChildren: 0.4 } }
  };
  const terminalLine = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <main className="min-h-screen relative overflow-hidden font-sans selection:bg-blue-500/30 bg-[#020617]">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px] mix-blend-screen pointer-events-none"></div>

      <motion.div 
        initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-2xl"
      >
        <nav className="flex justify-between items-center px-2 py-2 bg-slate-950/60 backdrop-blur-xl border border-slate-800/60 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <span className="ml-4 text-white font-bold tracking-tighter text-lg">Kaik<span className="text-blue-500">.</span></span>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
            <a href="#inicio" className="hover:text-white transition-colors">Início</a>
            <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
            <a href="#ecossistema" className="hover:text-white transition-colors">Ecossistema</a>
          </div>
          <a href="#contato" className="px-5 py-2 bg-white text-slate-950 rounded-full hover:bg-blue-500 hover:text-white transition-all text-sm font-bold flex items-center gap-1 group">
            Contato <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </nav>
      </motion.div>

      <section id="inicio" className="max-w-5xl mx-auto px-6 pt-48 pb-20 flex flex-col items-center text-center relative z-10 min-h-[90vh] justify-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Sistemas Operacionais e Prontos
        </motion.div>
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="text-6xl md:text-[7rem] font-black mb-6 tracking-tighter leading-none text-white">
          Kaik Sousa<span className="text-blue-500">.</span>
        </motion.h1>
        <motion.h2 initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="text-2xl md:text-4xl font-medium text-slate-400 mb-8 tracking-tight min-h-[48px]">
          {typedTitle}<span className="animate-pulse text-blue-500">_</span>
        </motion.h2>
        <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.4 }} className="max-w-2xl text-lg text-slate-500 leading-relaxed mb-12">
          Construindo arquiteturas eficientes e modelagem avançada de dados. Foco em alta performance, automação e resolução de problemas estruturais.
        </motion.p>
      </section>

      <section id="sobre" className="max-w-5xl mx-auto px-6 py-24 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-12">
          <h3 className="text-4xl font-black text-white tracking-tighter">Sobre o Sistema</h3>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-2 bg-slate-900/40 p-10 rounded-[2rem] border border-slate-800/50 hover:border-slate-700/50 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
            <h4 className="text-2xl font-bold text-white mb-6">Visão de Negócio & Código</h4>
            <div className="space-y-4 text-slate-400 leading-relaxed relative z-10">
              <p>Como <strong className="text-blue-400 font-medium">Analista de Projetos Júnior</strong> e estudante de <strong className="text-slate-200">Análise e Desenvolvimento de Sistemas</strong>, minha atuação se concentra na ponte exata entre a visão estratégica e a execução técnica.</p>
              <p>Mapeio requisitos, compreendo o fluxo de dados em bancos relacionais e automatizo processos para reduzir atritos operacionais. Meu objetivo não é apenas escrever código, mas garantir que a tecnologia sirva à eficiência do negócio.</p>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }} className="bg-[#0A0A0A] p-1 rounded-[2rem] border border-slate-800/80 shadow-2xl relative">
            <div className="bg-[#0A0A0A] rounded-[1.8rem] h-full overflow-hidden flex flex-col">
              <div className="bg-slate-900 px-6 py-4 flex items-center gap-2 border-b border-slate-800">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <motion.div variants={terminalContainer} className="p-6 font-mono text-xs sm:text-sm space-y-3 flex-grow">
                <motion.div variants={terminalLine}><span className="text-blue-400">~</span> $ init_skills</motion.div>
                <div className="text-emerald-400 space-y-2 pl-2">
                  <motion.p variants={terminalLine}>&gt; PostgreSQL carregado.</motion.p>
                  <motion.p variants={terminalLine}>&gt; Node.js ativo.</motion.p>
                  <motion.p variants={terminalLine}>&gt; Automação em 100%.</motion.p>
                </div>
                <motion.div variants={terminalLine} className="pt-2"><span className="text-blue-400">~</span> $ <span className="animate-pulse text-slate-300">_</span></motion.div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.3 }} className="bg-blue-950/20 p-8 rounded-[2rem] border border-blue-900/30 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h4 className="text-sm font-bold text-blue-400 mb-6 uppercase tracking-wider flex items-center gap-2"><Zap size={16}/> Core Stack</h4>
            <div className="flex flex-wrap gap-2 relative z-10">
              {['PostgreSQL', 'Prisma ORM', 'Node.js', 'Fastify', 'SQL', 'JavaScript'].map(tech => (
                <span key={tech} className="px-3 py-2 bg-slate-900/80 border border-slate-800 text-slate-300 text-sm rounded-xl font-medium">{tech}</span>
              ))}
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.4 }} className="md:col-span-2 bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 flex flex-col sm:flex-row items-center gap-6 justify-between hover:border-slate-700/50 transition-colors">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Foco em Alta Performance</h4>
              <p className="text-slate-400 text-sm">Desenvolvimento de sistemas locais e assíncronos focados em resposta imediata, sem dependência de I/O bloqueante.</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30 text-blue-400">
              <Server size={20} />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="ecossistema" className="max-w-5xl mx-auto px-6 py-24 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-12">
          <h3 className="text-4xl font-black text-white tracking-tighter">Ecossistema</h3>
        </motion.div>
        
        <div className="flex flex-col gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => setSelectedProject(projectsData.kssoft)}
            className="cursor-pointer group bg-slate-900/40 backdrop-blur-md border border-blue-900/40 rounded-[2rem] p-6 hover:border-blue-500/80 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(37,99,235,0.15)] flex flex-col md:flex-row gap-8"
          >
            <div className="w-full md:w-1/2 h-64 md:h-auto rounded-3xl overflow-hidden relative border border-slate-700/50">
              <img src={projectsData.kssoft.image} alt="Tela inicial do KS SOFT" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-blue-950/40 group-hover:bg-transparent transition-colors duration-500 mix-blend-overlay"></div>
              <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg">
                <ExternalLink size={18} />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center py-4 pr-4">
              <Code className="text-blue-500 mb-4 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" size={28} />
              <h4 className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{projectsData.kssoft.title}</h4>
              <p className="text-slate-400 text-base mb-6">{projectsData.kssoft.subtitle}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {projectsData.kssoft.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-blue-950/30 text-blue-300 text-xs rounded-xl font-medium border border-blue-900/30">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <motion.div 
              whileHover={{ y: -5 }}
              onClick={() => setSelectedProject(projectsData.landing)}
              className="cursor-pointer group bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-[2rem] p-4 flex flex-col hover:bg-slate-900/60 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative border border-slate-700/50">
                <img src={projectsData.landing.image} alt={projectsData.landing.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-blue-950/40 group-hover:bg-transparent transition-colors duration-500 mix-blend-overlay"></div>
              </div>
              <div className="px-2 pb-2 flex flex-col flex-grow">
                <h4 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-white transition-colors">{projectsData.landing.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-grow">Interfaces otimizadas para velocidade.</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="px-2 py-1 bg-blue-950/30 text-blue-300 text-[10px] rounded-lg font-medium border border-blue-900/30">Next.js</span>
                  <span className="px-2 py-1 bg-blue-950/30 text-blue-300 text-[10px] rounded-lg font-medium border border-blue-900/30">UI/UX</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              onClick={() => setSelectedProject(projectsData.linkbio)}
              className="cursor-pointer group bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-[2rem] p-4 flex flex-col hover:bg-slate-900/60 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative border border-slate-700/50 bg-[#020617]">
                <img src={projectsData.linkbio.image} alt={projectsData.linkbio.title} className="w-full h-full object-contain py-2 transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-blue-950/40 group-hover:bg-transparent transition-colors duration-500 mix-blend-overlay"></div>
              </div>
              <div className="px-2 pb-2 flex flex-col flex-grow">
                <h4 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-white transition-colors">{projectsData.linkbio.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-grow">Agregador para Instagram e vendas.</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="px-2 py-1 bg-blue-950/30 text-blue-300 text-[10px] rounded-lg font-medium border border-blue-900/30">Mobile-First</span>
                  <span className="px-2 py-1 bg-blue-950/30 text-blue-300 text-[10px] rounded-lg font-medium border border-blue-900/30">Conversão</span>
                </div>
              </div>
            </motion.div>

            {[1].map((item) => (
              <motion.div 
                key={item}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedProject(projectsData.future)}
                className="cursor-pointer group bg-slate-900/20 backdrop-blur-sm border border-slate-800/80 rounded-[2rem] p-8 flex flex-col justify-between hover:bg-slate-900/60 hover:border-blue-800/50 transition-all duration-300"
              >
                <div>
                  <Terminal className="text-slate-600 group-hover:text-blue-400 mb-4 transition-colors" size={28} />
                  <h4 className="text-lg font-bold text-slate-300 mb-2 group-hover:text-white transition-colors">Em Breve</h4>
                  <p className="text-xs text-slate-500 font-mono">Processando dados...</p>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-8">
                  <div className="h-full bg-blue-600/50 w-1/3 group-hover:w-full group-hover:bg-blue-500 transition-all duration-1000 ease-in-out"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="max-w-5xl mx-auto px-6 py-32 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-gradient-to-br from-blue-900/20 to-slate-900/40 border border-blue-900/30 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20"></div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter relative z-10">Vamos construir o próximo sistema.</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto relative z-10">
            Aberto para novas conexões, análise de projetos e estruturação de bancos de dados. Conecte-se às minhas redes.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <a href="#" className="px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-all flex items-center gap-2">
              <Mail size={18} /> Enviar E-mail
            </a>
            <a href="#" className="px-8 py-4 bg-slate-900 border border-slate-700 text-white font-bold rounded-full hover:border-blue-500 transition-all flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
              </svg>
              LinkedIn
            </a>
            <a href="#" className="px-8 py-4 bg-slate-900 border border-slate-700 text-white font-bold rounded-full hover:border-slate-500 transition-all flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              GitHub
            </a>
          </div>
        </motion.div>
      </section>

      <footer className="py-8 text-center text-slate-600 text-sm font-medium relative z-10 pb-12">
        Kaik Sousa © 2026. <span className="text-slate-500 font-mono text-xs">ALL_SYSTEMS_GO</span>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 cursor-pointer" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl h-[90vh] md:h-auto md:max-h-[90vh] overflow-y-auto bg-[#020617] border border-slate-800 rounded-3xl shadow-2xl z-50 flex flex-col custom-scrollbar">
              <div className="sticky top-0 bg-[#020617]/90 backdrop-blur-xl p-6 border-b border-slate-800/80 flex justify-between items-start z-20">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{selectedProject.title}</h3>
                  <p className="text-blue-400 text-sm font-medium">{selectedProject.subtitle}</p>
                </div>
                <button onClick={() => setSelectedProject(null)} className="p-2 bg-slate-900 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
              </div>
              {selectedProject.image && (
                <div className="w-full h-64 md:h-80 relative bg-slate-950 border-b border-slate-800/80 shrink-0">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
                </div>
              )}
              <div className="p-6 md:p-10 space-y-8 flex-grow">
                <div className="flex flex-wrap gap-2">{selectedProject.tags.map((tag: string) => (<span key={tag} className="px-3 py-1.5 bg-blue-950/20 border border-blue-900/30 text-blue-300 text-sm rounded-xl font-medium">{tag}</span>))}</div>
                <div className="space-y-4"><h4 className="text-lg font-bold text-white flex items-center gap-2"><ChevronRight className="text-blue-500" size={18} /> O Problema</h4><p className="text-slate-400 leading-relaxed pl-6">{selectedProject.problem}</p></div>
                <div className="space-y-4"><h4 className="text-lg font-bold text-white flex items-center gap-2"><ChevronRight className="text-blue-500" size={18} /> A Solução</h4><p className="text-slate-400 leading-relaxed pl-6">{selectedProject.solution}</p></div>
                <div className="space-y-4 bg-slate-900/40 p-8 rounded-3xl border border-slate-800/50"><h4 className="text-lg font-bold text-white flex items-center gap-2"><Server className="text-blue-500" size={18} /> Detalhes da Arquitetura</h4><ul className="space-y-3 text-slate-400 pl-2">{selectedProject.architecture.map((item: string, idx: number) => (<li key={idx} className="flex items-start gap-3"><span className="text-blue-500 mt-1">▹</span><span>{item}</span></li>))}</ul></div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}