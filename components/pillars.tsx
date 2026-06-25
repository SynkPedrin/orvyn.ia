'use client'

import { motion, useInView } from 'framer-motion'
import { TrendingUp, Bot, LayoutDashboard, Globe } from 'lucide-react'
import { useRef, useState } from 'react'

const pillars = [
  {
    number: '01',
    icon: TrendingUp,
    title: 'Gestão de Tráfego e Captação de Leads',
    description:
      'Atraia clientes qualificados todos os dias através de campanhas estratégicas. Criamos, gerenciamos e otimizamos anúncios para gerar mais oportunidades de negócio, fortalecer sua presença digital e aumentar a previsibilidade na aquisição de novos clientes.',
  },
  {
    number: '02',
    icon: Bot,
    title: 'Inteligência Artificial para Atendimento e Vendas',
    description:
      'Automatize atendimentos, qualifique oportunidades e aumente suas conversões 24 horas por dia. Nossa IA atua como um consultor virtual da sua empresa, respondendo dúvidas, captando informações, realizando agendamentos e conduzindo clientes pelo funil de vendas de forma personalizada e eficiente.',
  },
  {
    number: '03',
    icon: LayoutDashboard,
    title: 'Sistema Próprio de Gestão Empresarial',
    description:
      'Centralize toda a operação da sua empresa em uma plataforma desenvolvida para a sua realidade. Tenha controle total sobre clientes, processos, tarefas, documentos, indicadores e fluxos internos, eliminando a dependência de múltiplas ferramentas e aumentando a eficiência operacional do negócio.',
  },
  {
    number: '04',
    icon: Globe,
    title: 'Landing Page e Desenvolvimento de Software e Webdesign',
    description:
      'Desenvolvemos páginas de alta conversão, sistemas sob medida e interfaces que combinam estética premium com performance técnica. Do design ao código, entregamos soluções digitais que representam sua marca e convertem visitantes em clientes.',
  },
]

function PillarCard({ pillar, index }: { pillar: (typeof pillars)[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = pillar.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group p-7 sm:p-8 rounded-2xl transition-all duration-500 cursor-default"
      style={{
        background: hovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.65)',
        border: '1px solid',
        borderColor: hovered ? 'rgba(168,34,221,0.3)' : 'rgba(26,26,46,0.09)',
        boxShadow: hovered ? '0 0 50px rgba(168,34,221,0.07)' : '0 4px 20px rgba(0,0,0,0.04)',
      }}
    >
      {/* Number */}
      <span
        className="font-display font-bold text-5xl sm:text-6xl mb-6 block transition-colors duration-500 leading-none"
        style={{ color: hovered ? 'rgba(168,34,221,0.5)' : 'rgba(168,34,221,0.08)' }}
      >
        {pillar.number}
      </span>

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500"
        style={{
          background: hovered ? 'rgba(168,34,221,0.15)' : 'rgba(26,26,46,0.04)',
          border: '1px solid',
          borderColor: hovered ? 'rgba(168,34,221,0.4)' : 'rgba(26,26,46,0.1)',
        }}
      >
        <Icon
          className="w-6 h-6 transition-colors duration-500"
          style={{ color: hovered ? '#A822DD' : 'rgba(26,26,46,0.55)' }}
        />
      </div>

      {/* Title */}
      <h3
        className="font-display text-xl sm:text-2xl mb-4 transition-colors duration-300 leading-tight"
        style={{ color: hovered ? '#1a1a2e' : 'rgba(26,26,46,0.9)' }}
      >
        {pillar.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(26,26,46,0.5)' }}>
        {pillar.description}
      </p>
    </motion.div>
  )
}

export function Pillars() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 sm:py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-8 h-px" style={{ background: '#A822DD' }} />
          <span
            className="text-[11px] font-semibold tracking-widest uppercase"
            style={{ color: '#A822DD' }}
          >
            SOLUÇÃO COMPLETA
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6"
        >
          <h2
            className="font-display font-bold leading-[0.93]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: '#1a1a2e' }}
          >
            Tecnologia, automação e{' '}
            <span className="text-gradient">inteligência estratégica.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg max-w-2xl mb-16 leading-relaxed"
          style={{ color: 'rgba(26,26,46,0.5)' }}
        >
          Transforme a operação da sua empresa com um ecossistema inteligente e integrado.
          Unimos IA, CRM, automação, gestão e estratégia em uma única plataforma.
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.number} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
