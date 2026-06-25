'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Scale, FileText, Bell, BarChart2 } from 'lucide-react'
import { useRef } from 'react'
import Image from 'next/image'

export function Products() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const imageRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section id="produtos" ref={ref} className="py-14 sm:py-20 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-20"
        >
          {/* Section label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px" style={{ background: '#534AB7' }} />
            <span
              style={{
                color: '#534AB7',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              NOSSOS PRODUTOS
            </span>
          </div>

          <h2
            className="font-display font-bold leading-[0.93] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: '#1a1a2e' }}
          >
            Produtos construídos
            <br />
            <span className="text-gradient">para nichos específicos.</span>
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: 'rgba(26,26,46,0.55)' }}>
            Não vendemos genérico. Cada produto nasce de uma dor real, validada em campo,
            resolvida com precisão de engenharia.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-12 sm:space-y-20"
        >
          {/* RULLES IA Product */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl p-6 sm:p-8 md:p-12 overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.65)',
              border: '1px solid rgba(26,26,46,0.09)',
              borderRadius: '1rem',
              boxShadow: '0 8px 40px rgba(0,0,0,0.05)',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Product Screenshot with parallax */}
              <div ref={imageRef} className="overflow-hidden rounded-2xl">
                <motion.div
                  style={{ y: imageY, boxShadow: '0 25px 60px rgba(83,74,183,0.2)' }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="shadow-2xl"
                >
                  <Image
                    src="/images/rulles-ia.png"
                    alt="Rulles IA - CRM Jurídico"
                    width={800}
                    height={500}
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>

              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4 sm:mb-6"
                  style={{
                    background: 'rgba(83,74,183,0.15)',
                    color: '#A09EF5',
                    border: '1px solid rgba(83,74,183,0.3)',
                  }}
                >
                  <span>CRM — ADVOCACIA &amp; GESTÃO JURÍDICA</span>
                </div>
                <h3
                  className="font-display text-3xl sm:text-4xl md:text-5xl font-normal mb-3"
                  style={{ color: '#1a1a2e' }}
                >
                  Rulles IA
                </h3>
                <p className="text-lg font-medium mb-4" style={{ color: '#A09EF5' }}>
                  O CRM com IA nichado para advogados.
                </p>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(26,26,46,0.55)' }}>
                  Rulles IA é uma plataforma de gestão jurídica potencializada por inteligência
                  artificial. Automatize atendimento, organize processos e converta leads com
                  precisão. Advocacia 4.0 — do primeiro contato ao fechamento.
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {[
                    { icon: Scale, text: 'Triagem automática de casos via IA conversacional' },
                    { icon: FileText, text: 'Geração assistida de documentos e peças jurídicas' },
                    { icon: Bell, text: 'Alertas de prazos e audiências automatizados' },
                    { icon: BarChart2, text: 'Dashboard de performance do escritório em tempo real' },
                  ].map((feature) => {
                    const Icon = feature.icon
                    return (
                      <div key={feature.text} className="flex gap-3 items-start">
                        <Icon
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: '#7B74E0' }}
                        />
                        <span className="text-sm" style={{ color: 'rgba(26,26,46,0.7)' }}>
                          {feature.text}
                        </span>
                      </div>
                    )
                  })}
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="https://rulles-ia-pn5f.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg font-medium transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #534AB7 0%, #7B74E0 100%)',
                      boxShadow: '0 8px 24px rgba(83,74,183,0.35)',
                    }}
                  >
                    Acessar Rulles IA
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
