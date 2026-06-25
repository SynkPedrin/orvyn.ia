'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export function BackgroundAnimation() {
  const particles = useMemo(() => {
    const rng = seededRandom(42)
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: rng() * 100,
      top: rng() * 100,
      size: rng() * 3 + 1,
      duration: rng() * 20 + 15,
      delay: -(rng() * 20),
      xDrift: (rng() - 0.5) * 60,
    }))
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      {/* Large gradient orb — top left */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: '-10%',
          top: '-5%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(83,74,183,0.05) 0%, transparent 70%)',
        }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Large gradient orb — bottom right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          right: '-10%',
          bottom: '-5%',
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(83,74,183,0.04) 0%, transparent 70%)',
        }}
        animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: -10 }}
      />

      {/* Subtle particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: 'rgba(83,74,183,0.25)',
            boxShadow: '0 0 8px rgba(83,74,183,0.2)',
          }}
          animate={{ y: [0, -80, 0], x: [0, p.xDrift, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
