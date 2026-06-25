"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MagneticButton } from "./magnetic-button"
import { CharReveal, LineReveal } from "./reveal-text"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY, scale: backgroundScale }}
      >
        <Image
          src="/images/background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </motion.div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,200,200,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,200,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }} />
      </div>
      
      {/* Animated Glow Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] z-[1]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] z-[1]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.3, 0.15],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div 
        className="relative z-10 container mx-auto px-6 py-20"
        style={{ y: contentY, opacity }}
      >
        <div className="flex flex-col items-center text-center max-w-6xl mx-auto">
          {/* Logo with Float Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.25, 0.46, 0.45, 0.94],
              rotateY: { duration: 1.5 }
            }}
            className="mb-8 relative"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotateZ: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Image
                src="/images/orvyn-logo.png"
                alt="Orvyn Sistemas"
                width={140}
                height={140}
                className="drop-shadow-[0_0_40px_rgba(0,200,200,0.3)]"
                priority
              />
            </motion.div>
            {/* Logo Glow Ring */}
            <motion.div
              className="absolute -inset-4 rounded-full border border-accent/20"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground tracking-wide">Atendimento Empresarial | Contratos Mensais | Suporte Continuo</span>
            </div>
          </motion.div>

          {/* Main Title with Character Reveal */}
          <div className="mb-6 overflow-hidden">
            <LineReveal 
              delay={0.5}
              stagger={0.2}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.9]"
              lineClassName="block"
            >
              {[
                "SISTEMAS QUE",
                "AUTOMATIZAM E",
                "GERAM RESULTADO"
              ]}
            </LineReveal>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-1 w-48 mx-auto mt-4 bg-gradient-to-r from-transparent via-accent to-transparent"
            />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
          >
            Desenvolvemos, implantamos e mantemos sistemas sob medida para empresas 
            que precisam escalar com tecnologia confiavel.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton strength={0.3}>
              <Link
                href="mailto:orvynsistemas@outlook.com?subject=Solicitar%20Diagnostico%20Tecnico%20-%20Orvyn%20Sistemas"
                data-cursor-text="Email"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,200,200,0.4)]"
              >
                <span className="relative z-10">Solicitar Diagnostico Tecnico</span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-2" />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-accent via-cyan-400 to-accent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Link>
            </MagneticButton>
            
            <MagneticButton strength={0.3}>
              <Link
                href="#projetos"
                data-cursor-text="Ver"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-border bg-background/30 backdrop-blur-md font-semibold rounded-full transition-all duration-500 hover:border-accent/50 hover:bg-accent/5"
              >
                <span>Ver Solucoes</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-3 bg-accent rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-accent/20 z-10" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-accent/20 z-10" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-accent/20 z-10" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-accent/20 z-10" />
    </section>
  )
}
