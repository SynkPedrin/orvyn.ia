"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ArrowRight, Mail, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MagneticButton } from "./magnetic-button"

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,200,200,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,200,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>
      
      {/* Animated Glow Orbs */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div 
        ref={contentRef}
        className="relative z-10 container mx-auto px-6"
        style={{ scale }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.5, rotateY: -180 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-8 relative inline-block"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/orvyn-logo.png"
                alt="Orvyn"
                width={90}
                height={90}
                className="mx-auto drop-shadow-[0_0_30px_rgba(0,200,200,0.3)]"
              />
            </motion.div>
            {/* Pulsing Ring */}
            <motion.div
              className="absolute -inset-6 rounded-full border border-accent/30"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-md text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-accent" />
              Parceiro Tecnologico de Longo Prazo
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2 
            className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            VAMOS{" "}
            <span className="text-glow bg-gradient-to-r from-accent via-cyan-400 to-accent bg-clip-text text-transparent">
              ESTRUTURAR
            </span>
            <br />A TECNOLOGIA DA SUA EMPRESA?
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Se voce precisa de um parceiro tecnico para desenvolver, manter e evoluir 
            seus sistemas, a Orvyn Sistemas pode ajudar.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <MagneticButton strength={0.3}>
              <Link
                href="mailto:orvynsistemas@outlook.com?subject=Solicitar%20Diagnostico%20Tecnico%20-%20Orvyn%20Sistemas"
                data-cursor-text="Email"
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-accent text-accent-foreground font-semibold rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,200,200,0.5)]"
              >
                <Mail className="w-5 h-5 relative z-10" />
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
                className="group inline-flex items-center justify-center gap-2 px-10 py-5 border border-border bg-background/30 backdrop-blur-md font-semibold rounded-full transition-all duration-500 hover:border-accent/50 hover:bg-accent/5"
              >
                Ver Solucoes Implementadas
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
