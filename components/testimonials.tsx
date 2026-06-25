'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Rafael Santos',
    title: 'Sócio-fundador, Escritório Jurídico Santos & Associados',
    content:
      'Rulles IA transformou completamente nosso workflow. O que levava 3 horas agora leva 30 minutos. E a qualidade é impecável.',
    rating: 5,
  },
  {
    name: 'Mariana Costa',
    title: 'Diretora de Marketing, E-commerce Growth',
    content:
      'A automação de tráfego da Orvyn transformou nossa captação de leads. Nossas campanhas converteram 45% mais com muito menos trabalho manual.',
    rating: 5,
  },
  {
    name: 'Felipe Oliveira',
    title: 'CTO, Tech Startup',
    content:
      'A Orvyn não vende software, vende entendimento. Eles realmente entendem o problema antes de qualquer linha de código.',
    rating: 5,
  },
]

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0]
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const initials = testimonial.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-8 transition-all duration-400"
      style={{
        background: hovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.65)',
        border: '1px solid',
        borderColor: hovered ? 'rgba(168,34,221,0.3)' : 'rgba(26,26,46,0.09)',
        boxShadow: hovered ? '0 0 40px rgba(168,34,221,0.07)' : '0 4px 20px rgba(0,0,0,0.04)',
      }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Content */}
      <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(26,26,46,0.75)' }}>
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #A822DD 0%, #CC55EC 100%)' }}
        >
          {initials}
        </div>
        <div>
          <div className="font-semibold text-sm" style={{ color: '#1a1a2e' }}>
            {testimonial.name}
          </div>
          <div className="text-xs" style={{ color: 'rgba(26,26,46,0.45)' }}>
            {testimonial.title}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
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
          <div className="w-8 h-px" style={{ background: '#A822DD' }} />
          <span
            className="text-[11px] font-semibold tracking-widest uppercase"
            style={{ color: '#A822DD' }}
          >
            DEPOIMENTOS
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
            className="font-display font-bold leading-[0.93]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#1a1a2e' }}
          >
            O que nossos clientes dizem
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
