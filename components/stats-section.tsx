"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { MagneticButton } from "./magnetic-button"

const stats = [
  {
    value: 4,
    suffix: "+",
    label: "Sistemas Desenvolvidos",
    description: "Projetos entregues",
  },
  {
    value: 100,
    suffix: "%",
    label: "Satisfacao",
    description: "Clientes satisfeitos",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Suporte",
    description: "Sempre disponivel",
  },
  {
    value: 99,
    suffix: "%",
    label: "Uptime",
    description: "Alta disponibilidade",
  },
]

const trustBadges = [
  "Sistemas Escalaveis",
  "Design de Elite", 
  "Performance Extrema",
  "Codigo Limpo"
]

function AnimatedCounter({ value, suffix, delay = 0 }: { value: number; suffix: string; delay?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        const duration = 2000
        const steps = 60
        const stepValue = value / steps
        let current = 0
        
        const timer = setInterval(() => {
          current += stepValue
          if (current >= value) {
            setCount(value)
            clearInterval(timer)
          } else {
            setCount(Math.floor(current))
          }
        }, duration / steps)

        return () => clearInterval(timer)
      }, delay * 1000)

      return () => clearTimeout(timeout)
    }
  }, [isInView, value, delay])

  return (
    <motion.span 
      ref={ref} 
      className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-glow bg-gradient-to-r from-accent via-cyan-400 to-accent bg-clip-text text-transparent"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {count}{suffix}
    </motion.span>
  )
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [50, -50])
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
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,200,200,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,200,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div 
        className="relative z-10 container mx-auto px-6"
        style={{ scale }}
      >
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.span 
            className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Resultados
          </motion.span>
          
          <motion.h2 
            className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            NUMEROS QUE{" "}
            <span className="text-glow bg-gradient-to-r from-accent via-cyan-400 to-accent bg-clip-text text-transparent">
              IMPRESSIONAM
            </span>
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center group"
            >
              <div className="relative inline-block">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={index * 0.15} />
                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-4 bg-accent/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <motion.h3 
                className="font-display text-lg font-semibold mt-4 mb-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
              >
                {stat.label}
              </motion.h3>
              <motion.p 
                className="text-muted-foreground text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 + 0.4 }}
              >
                {stat.description}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {trustBadges.map((badge, index) => (
            <MagneticButton key={badge} strength={0.3}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="px-6 py-3 rounded-full border border-border/50 bg-card/20 backdrop-blur-sm text-sm font-medium text-muted-foreground hover:border-accent/30 hover:text-accent hover:bg-accent/5 transition-all duration-500 cursor-pointer"
                data-cursor="pointer"
              >
                {badge}
              </motion.div>
            </MagneticButton>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
