'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    description:
      'Mapeamos seus processos, identificamos os gargalos e definimos onde a IA gera mais impacto.',
  },
  {
    number: '02',
    title: 'Arquitetura',
    description:
      'Desenhamos o fluxo técnico: integrações, triggers, modelos e estrutura de dados.',
  },
  {
    number: '03',
    title: 'Implementação',
    description:
      'Construímos e testamos cada componente — automações, bots, CRM e criativos.',
  },
  {
    number: '04',
    title: 'Escala',
    description:
      'Monitoramos, otimizamos e expandimos. O sistema evolui com o seu negócio.',
  },
]

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!lineRef.current) return
    if (typeof window === 'undefined') return

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
            },
          }
        )
      })
    })
  }, [])

  return (
    <section ref={ref} className="py-20 sm:py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Top divider */}
        <div className="w-full h-px mb-20" style={{ background: 'rgba(26,26,46,0.1)' }} />

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-8 h-px" style={{ background: '#A822DD' }} />
          <span
            className="text-[11px] font-semibold tracking-widest uppercase"
            style={{ color: '#A822DD' }}
          >
            NOSSO PROCESSO
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-bold mb-20"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#1a1a2e', lineHeight: 0.93 }}
        >
          Do problema ao resultado.{' '}
          <span className="text-gradient">Em etapas claras.</span>
        </motion.h2>

        {/* Progress line */}
        <div className="hidden lg:block relative mb-0">
          <div
            ref={lineRef}
            className="h-px origin-left"
            style={{
              background: 'linear-gradient(90deg, #A822DD, #CC55EC, transparent)',
            }}
          />
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 + 0.2 }}
              className="pt-8 pb-8 pr-0 lg:pr-8"
              style={{ borderTop: '1px solid rgba(26,26,46,0.1)' }}
            >
              <span
                className="font-display font-bold text-6xl sm:text-7xl block mb-6 leading-none"
                style={{ color: 'rgba(168,34,221,0.18)' }}
              >
                {step.number}
              </span>
              <h3
                className="font-display text-xl sm:text-2xl mb-3"
                style={{ color: '#1a1a2e' }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(26,26,46,0.5)' }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
