'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { useAnimatedCounter } from '@/hooks/use-animated-counter'

function Metric({
  value,
  label,
  prefix = '',
  suffix = '',
}: {
  value: number
  label: string
  prefix?: string
  suffix?: string
}) {
  const { ref, display } = useAnimatedCounter(value, 1600, prefix, suffix)
  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="font-display font-bold text-3xl sm:text-4xl" style={{ color: '#1a1a2e' }}>
        {display}
      </span>
      <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(26,26,46,0.45)' }}>
        {label}
      </span>
    </div>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: '120px', paddingBottom: '80px' }}
    >
      {/* Top hairline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: 'rgba(26,26,46,0.1)' }}
      />

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center gap-3 mb-10"
        >
          <Image
            src="/images/orvyn-gem.png"
            alt="ORVYN"
            width={28}
            height={28}
            style={{ filter: 'drop-shadow(0 0 12px rgba(83,74,183,0.7))' }}
          />
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase"
            style={{ border: '1px solid rgba(83,74,183,0.35)', color: '#A09EF5' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#534AB7' }}
            />
            ORVYN SISTEMAS — NOVA ERA 2026
          </div>
        </motion.div>

        {/* Main Heading — lines reveal from below */}
        <div className="mb-10">
          {[
            { text: 'Inteligência que', delay: 0.4, accent: false },
            { text: 'automatiza.', delay: 0.5, accent: true },
            { text: 'Estratégia que', delay: 0.6, accent: false },
            { text: 'converte.', delay: 0.7, accent: true },
          ].map(({ text, delay, accent }) => (
            <div key={text} className="overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
                className={`font-display font-bold leading-[0.93] block${accent ? ' text-gradient' : ''}`}
                style={{
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  color: accent ? undefined : '#1a1a2e',
                }}
              >
                {text}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Bottom row: description + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
        >
          <p
            className="text-base sm:text-lg max-w-md leading-relaxed"
            style={{ color: 'rgba(26,26,46,0.6)' }}
          >
            A ORVYN desenvolve soluções de IA, automação e CRM para empresas
            que não têm tempo a perder. Engenharia de prompt de alto nível.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#produtos"
                className="btn-primary inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl font-semibold text-base"
              >
                Ver Produtos
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="mailto:orvynsistemas@outlook.com"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl font-semibold text-base transition-all duration-300"
                style={{
                  border: '1px solid rgba(26,26,46,0.15)',
                  color: '#1a1a2e',
                  background: 'rgba(26,26,46,0.03)',
                }}
              >
                Falar com Especialista
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Metrics row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-8"
          style={{ borderTop: '1px solid rgba(26,26,46,0.1)' }}
        >
          <Metric value={40} label="Clientes Ativos" prefix="+" />
          <Metric value={98} label="Retenção" suffix="%" />
          <Metric value={3} label="Produtos SaaS" />
          <Metric value={5} label="Anos de Mercado" suffix="+" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 sm:right-12 flex items-center gap-3"
        style={{ color: 'rgba(26,26,46,0.35)' }}
      >
        <span className="text-[10px] tracking-widest uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, rgba(83,74,183,0.6), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
