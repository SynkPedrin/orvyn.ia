"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Code2, Brain, Search, GraduationCap, Sparkles } from "lucide-react"
import { MagneticButton } from "./magnetic-button"
import { RevealText } from "./reveal-text"

const projects = [
  {
    id: "barberflow",
    title: "BarberFlow",
    subtitle: "Captacao e Agendamento Automatico",
    description: "Sistema que aumenta em ate 30% os clientes recorrentes de barbearias atraves de captacao e agendamento automatico.",
    image: "/images/barberflow.png",
    status: "Em Desenvolvimento",
    tags: ["Conversao", "Recorrencia", "Automacao"],
    icon: Code2,
    featured: true,
    color: "from-amber-500/20 to-yellow-600/10",
    accentColor: "#f59e0b",
  },
  {
    id: "orvyn-finance",
    title: "Orvyn Finance",
    subtitle: "Gestao Financeira Inteligente",
    description: "Sistema com inteligencia de dados (ValorIA) para analise, previsoes e controle operacional financeiro.",
    image: "/images/orvyn-finance.png",
    status: "Publico",
    tags: ["IA Integrada", "Previsoes", "Controle"],
    icon: Brain,
    featured: true,
    color: "from-cyan-500/20 to-teal-600/10",
    accentColor: "#06b6d4",
  },
  {
    id: "orvyn-analytics",
    title: "Orvyn Analytics",
    subtitle: "Gestao Academica Inteligente",
    description: "Plataforma que otimiza o desempenho estudantil com pomodoro integrado, calculadora de notas e ferramentas de produtividade.",
    image: "/images/orvyn-analytics.png",
    status: "Publico",
    tags: ["Produtividade", "Pomodoro", "Gestao"],
    icon: GraduationCap,
    featured: false,
    color: "from-slate-500/20 to-gray-600/10",
    accentColor: "#64748b",
  },
  {
    id: "orvyn-search",
    title: "Orvyn Search",
    subtitle: "Plataforma B2B Lead Generation",
    description: "Sistema de busca e captacao de clientes que automatiza a prospeccao e aumenta a conversao comercial.",
    image: "/images/orvyn-search.png",
    status: "Publico",
    tags: ["Leads", "Prospeccao", "Conversao"],
    icon: Search,
    featured: false,
    color: "from-emerald-500/20 to-green-600/10",
    accentColor: "#10b981",
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])
  
  const Icon = project.icon
  const githubUrl = "https://github.com/SynkPedrin"

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`group relative ${project.featured ? "md:col-span-1 md:row-span-2" : ""}`}
    >
      <MagneticButton strength={0.1} className="h-full">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative h-full block rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden transition-all duration-700 hover:border-accent/40 hover:shadow-[0_0_80px_rgba(0,200,200,0.08)]"
          data-cursor="pointer"
          data-cursor-text="GitHub"
        >
          {/* Gradient Overlay */}
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
          />
          
          {/* Animated Border */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${project.accentColor}20 0%, transparent 50%, ${project.accentColor}20 100%)`,
            }}
          />
          
          {/* Image with Parallax */}
          <div className="relative h-56 md:h-64 lg:h-72 overflow-hidden">
            <motion.div 
              className="absolute inset-0"
              style={{ scale: imageScale }}
            >
              {project.image ? (
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted/20">
                  <Icon className="w-24 h-24 text-muted-foreground/20" />
                </div>
              )}
            </motion.div>
            
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
            
            {/* Status Badge */}
            <motion.div 
              className="absolute top-4 right-4"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: index * 0.15 + 0.3 }}
            >
              <span className={`text-xs px-4 py-1.5 rounded-full backdrop-blur-md font-medium ${
                project.status === "Em Desenvolvimento" 
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" 
                  : "bg-accent/20 text-accent border border-accent/30"
              }`}>
                {project.status}
              </span>
            </motion.div>

            {/* Floating Icon */}
            <motion.div
              className="absolute top-4 left-4 p-3 rounded-xl bg-background/50 backdrop-blur-md border border-border/50"
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon className="w-5 h-5" style={{ color: project.accentColor }} />
            </motion.div>
          </div>

          {/* Content */}
          <motion.div 
            className="relative p-6"
            style={{ y }}
          >
            {/* Subtitle */}
            <span className="text-xs font-medium uppercase tracking-widest mb-3 block" style={{ color: project.accentColor }}>
              {project.subtitle}
            </span>

            {/* Title */}
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 transition-colors duration-500 group-hover:text-accent">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 bg-muted/50 rounded-full text-muted-foreground border border-border/50 transition-all duration-300 hover:bg-accent/10 hover:text-accent hover:border-accent/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Hover Arrow */}
            <motion.div 
              className="flex items-center gap-2 text-accent"
              initial={{ opacity: 0, x: -20 }}
              whileHover={{ x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">Ver no GitHub</span>
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1" />
            </motion.div>
          </motion.div>

          {/* Corner Accent */}
          <div 
            className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
            style={{
              background: `radial-gradient(circle at bottom right, ${project.accentColor}, transparent 70%)`
            }}
          />
        </a>
      </MagneticButton>
    </motion.div>
  )
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" })

  return (
    <section id="projetos" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent/30 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.span 
            className="inline-flex items-center gap-2 text-sm font-medium text-accent uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4" />
            Portfolio
          </motion.span>
          
          <motion.h2 
            className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            SOLUCOES{" "}
            <span className="text-glow bg-gradient-to-r from-accent via-cyan-400 to-accent bg-clip-text text-transparent">
              IMPLEMENTADAS
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sistemas que resolvem problemas reais de negocios. Foco em resultado, nao em tecnologia.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
