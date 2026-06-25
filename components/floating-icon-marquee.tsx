'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles, Code, GitBranch, Workflow, Command, Braces,
  CheckCircle, Copy, Network, Cpu, Bot, Zap, Database,
  Webhook, LayoutGrid, MoveRight,
} from 'lucide-react'

const ICONS = [
  Sparkles, Code, GitBranch, Workflow, Command, Braces,
  CheckCircle, Copy, Network, Cpu, Bot, Zap, Database,
  Webhook, LayoutGrid, MoveRight,
]

// Duplicate for seamless loop
const ITEMS = [...ICONS, ...ICONS]

function IconBall({
  Icon,
  index,
  isDesktop,
}: {
  Icon: React.ElementType
  index: number
  isDesktop: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const floatDelay = (index % ICONS.length) * (2 / ICONS.length)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        y: hovered ? -6 : 0,
        scale: hovered ? 1.15 : 1,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="relative flex-shrink-0"
    >
      <div
        className="relative flex items-center justify-center rounded-full transition-all duration-500"
        style={{
          width: isDesktop ? 96 : 72,
          height: isDesktop ? 96 : 72,
          background: hovered ? 'rgba(168,34,221,0.12)' : '#F0EFFA',
          border: hovered ? '1.5px solid rgba(168,34,221,0.5)' : '1.5px solid rgba(26,26,46,0.08)',
          boxShadow: hovered ? '0 0 28px rgba(168,34,221,0.35)' : 'none',
          animation: `float-wave 3.5s ease-in-out ${floatDelay}s infinite`,
        }}
      >
        <Icon
          style={{
            width: isDesktop ? 28 : 22,
            height: isDesktop ? 28 : 22,
            color: hovered ? '#A822DD' : 'rgba(26,26,46,0.5)',
            transition: 'color 0.3s ease',
          }}
          strokeWidth={1.5}
        />
      </div>
    </motion.div>
  )
}

export function FloatingIconMarquee() {
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div
      className="w-full"
      style={{
        borderTop: '1px solid rgba(26,26,46,0.08)',
        borderBottom: '1px solid rgba(26,26,46,0.08)',
      }}
    >
      <div className="relative w-full overflow-hidden py-8 sm:py-12">
        {/* Fade masks on edges — dark bg */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(to right, #f5f3ee 0%, transparent 8%, transparent 92%, #f5f3ee 100%)',
          }}
        />

        {/* Track — constant loop */}
        <div className="marquee-track flex items-center gap-4 sm:gap-6 w-max">
          {ITEMS.map((Icon, i) => (
            <IconBall key={i} Icon={Icon} index={i} isDesktop={isDesktop} />
          ))}
        </div>
      </div>
    </div>
  )
}
