'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Crosshair, Code2, CheckCircle } from 'lucide-react'

const differentials = [
  {
    number: '01',
    icon: Crosshair,
    title: 'Nichado, não genérico',
    description:
      'Não entregamos templates. Cada solução é construída para o problema específico do seu negócio.',
  },
  {
    number: '02',
    icon: Code2,
    title: 'Prompt Engineering real',
    description:
      'Nossa base é engenharia de prompt estruturada — não IA amadora. Resultado técnico, performance mensurável.',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Automação sem código fantasma',
    description:
      'Fluxos que funcionam meses depois de entregues, documentados e com suporte de evolução.',
  },
]

function DifferentialCard({ item, index }: { item: (typeof differentials)[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = item.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group rounded-2xl p-8 transition-all duration-500 cursor-default"
      style={{
        background: hovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.65)',
        border: '1px solid',
        borderColor: hovered ? 'rgba(83,74,183,0.3)' : 'rgba(26,26,46,0.09)',
        boxShadow: hovered ? '0 0 50px rgba(83,74,183,0.07)' : '0 4px 20px rgba(0,0,0,0.04)',
      }}
    >
      {/* Number */}
      <span
        className="font-display font-bold text-5xl block mb-6 leading-none transition-colors duration-500"
        style={{ color: hovered ? 'rgba(83,74,183,0.5)' : 'rgba(83,74,183,0.15)' }}
      >
        {item.number}
      </span>

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-lg mb-6 flex items-center justify-center transition-all duration-300"
        style={{
          background: hovered ? 'rgba(83,74,183,0.2)' : 'rgba(83,74,183,0.1)',
          border: '1px solid',
          borderColor: hovered ? 'rgba(83,74,183,0.4)' : 'rgba(83,74,183,0.2)',
        }}
      >
        <Icon className="w-7 h-7 transition-colors duration-300" style={{ color: '#7B74E0' }} />
      </div>

      {/* Title */}
      <h3
        className="font-display text-2xl font-normal mb-4 transition-colors duration-300"
        style={{ color: hovered ? '#1a1a2e' : 'rgba(26,26,46,0.9)' }}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-base leading-relaxed" style={{ color: 'rgba(26,26,46,0.55)' }}>
        {item.description}
      </p>
    </motion.div>
  )
}

export function WhyOrvyn() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-14 sm:py-20 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Top divider */}
        <div className="w-full h-px mb-16" style={{ background: 'rgba(26,26,46,0.1)' }} />

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-8 h-px" style={{ background: '#534AB7' }} />
          <span
            className="text-[11px] font-semibold tracking-widest uppercase"
            style={{ color: '#534AB7' }}
          >
            DIFERENCIAIS
          </span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-16"
        >
          <h2
            className="font-display font-bold leading-[0.93] mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#1a1a2e' }}
          >
            Por que Orvyn
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: 'rgba(26,26,46,0.5)' }}>
            Três razões técnicas que definem nossa abordagem.
          </p>
        </motion.div>

        {/* Differentials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {differentials.map((item, index) => (
            <DifferentialCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
