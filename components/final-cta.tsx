'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      id="contato"
      className="relative py-20 sm:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden"
      style={{ background: '#07060f' }}
    >
      {/* Glow blob */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(83,74,183,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top divider */}
        <div className="w-full h-px mb-20" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="w-8 h-px" style={{ background: '#534AB7' }} />
          <span
            className="text-[11px] font-semibold tracking-widest uppercase"
            style={{ color: '#534AB7' }}
          >
            VAMOS COMEÇAR
          </span>
        </motion.div>

        {/* Gem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-10"
        >
          <motion.div
            animate={{
              filter: [
                'drop-shadow(0 0 24px rgba(83,74,183,0.4))',
                'drop-shadow(0 0 64px rgba(83,74,183,0.85))',
                'drop-shadow(0 0 24px rgba(83,74,183,0.4))',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Image src="/images/orvyn-gem.png" alt="ORVYN" width={64} height={64} priority />
          </motion.div>
        </motion.div>

        {/* Oversized heading */}
        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: '110%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold"
            style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', color: '#f2f0fc', lineHeight: 0.93 }}
          >
            Pronto para automatizar
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-12">
          <motion.h2
            initial={{ y: '110%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-gradient"
            style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', lineHeight: 0.93 }}
          >
            o que te trava?
          </motion.h2>
        </div>

        {/* Subtext + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
        >
          <p className="text-base sm:text-lg max-w-sm" style={{ color: 'rgba(242,240,252,0.5)' }}>
            Fale com a ORVYN. Diagnóstico gratuito para novos projetos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="mailto:orvynsistemas@outlook.com?subject=Quero%20falar%20com%20a%20ORVYN"
                className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base"
              >
                Falar com a Equipe
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#produtos"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base transition-all"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#f2f0fc',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                Ver Produtos
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
