"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { 
  Code2, 
  Brain, 
  Smartphone, 
  Shield, 
  Zap, 
  Cloud,
  ArrowUpRight,
  Sparkles
} from "lucide-react"
import { MagneticButton } from "./magnetic-button"

const services = [
  {
    icon: Code2,
    title: "Sistemas Web",
    description: "Aplicacoes robustas e escalaveis com tecnologias de ponta.",
    gradient: "from-blue-500/20 to-cyan-500/10",
    iconColor: "#3b82f6",
  },
  {
    icon: Brain,
    title: "IA Integrada",
    description: "Inteligencia artificial para automatizar e otimizar processos.",
    gradient: "from-purple-500/20 to-pink-500/10",
    iconColor: "#a855f7",
  },
  {
    icon: Smartphone,
    title: "Mobile-First",
    description: "Interfaces responsivas que funcionam em qualquer dispositivo.",
    gradient: "from-green-500/20 to-emerald-500/10",
    iconColor: "#22c55e",
  },
  {
    icon: Shield,
    title: "Seguranca",
    description: "Protecao de dados com criptografia de nivel empresarial.",
    gradient: "from-red-500/20 to-orange-500/10",
    iconColor: "#ef4444",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Otimizacao extrema para velocidade e eficiencia maxima.",
    gradient: "from-yellow-500/20 to-amber-500/10",
    iconColor: "#eab308",
  },
  {
    icon: Cloud,
    title: "Cloud Native",
    description: "Infraestrutura em nuvem com escalabilidade automatica.",
    gradient: "from-cyan-500/20 to-teal-500/10",
    iconColor: "#06b6d4",
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  
  const Icon = service.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -10 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group relative"
    >
      <MagneticButton strength={0.15} className="w-full h-full">
        <div 
          className="h-full p-8 rounded-2xl border border-border/50 bg-card/20 backdrop-blur-sm transition-all duration-700 hover:border-accent/40 hover:bg-card/40 hover:shadow-[0_0_60px_rgba(0,200,200,0.08)]"
          data-cursor="pointer"
        >
          {/* Gradient Background */}
          <motion.div 
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
          />
          
          {/* Icon with Float Animation */}
          <motion.div 
            className="relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-background/50 border border-border/50 mb-6 transition-all duration-500 group-hover:border-accent/30 group-hover:shadow-[0_0_30px_rgba(0,200,200,0.15)]"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
          >
            <Icon className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" style={{ color: service.iconColor }} />
          </motion.div>

          {/* Content */}
          <h3 className="relative font-display text-xl font-bold mb-3 transition-colors duration-500 group-hover:text-accent">
            {service.title}
          </h3>
          <p className="relative text-muted-foreground text-sm leading-relaxed">
            {service.description}
          </p>

          {/* Hover Arrow */}
          <motion.div
            className="absolute top-6 right-6"
            initial={{ opacity: 0, x: -10, y: 10 }}
            whileHover={{ x: 0, y: 0 }}
          >
            <ArrowUpRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
          </motion.div>

          {/* Corner Accent */}
          <div 
            className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-0 group-hover:opacity-20 transition-opacity duration-700"
            style={{ background: `radial-gradient(circle at bottom right, ${service.iconColor}, transparent 70%)` }}
          />
        </div>
      </MagneticButton>
    </motion.div>
  )
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section id="servicos" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-card/20 via-background to-card/20" />
      </motion.div>

      {/* Floating Dots */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-accent/20 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
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
            Solucoes
          </motion.span>
          
          <motion.h2 
            className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            NOSSOS{" "}
            <span className="text-glow bg-gradient-to-r from-accent via-cyan-400 to-accent bg-clip-text text-transparent">
              SERVICOS
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tecnologia de ponta para resolver problemas reais do seu negocio.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
