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
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: rng() * 100,
      top: rng() * 100,
      size: rng() * 4 + 1,
      duration: rng() * 18 + 12,
      delay: -(rng() * 20),
      xDrift: (rng() - 0.5) * 70,
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
          left: '-10%', top: '-5%',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(168,34,221,0.12) 0%, rgba(168,34,221,0.04) 40%, transparent 70%)',
        }}
        animate={{ x: [0, 40, 0], y: [0, 25, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Large gradient orb — bottom right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          right: '-10%', bottom: '-5%',
          width: 800, height: 800,
          background: 'radial-gradient(circle, rgba(168,34,221,0.10) 0%, rgba(100,60,200,0.04) 40%, transparent 70%)',
        }}
        animate={{ x: [0, -25, 0], y: [0, -18, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: -10 }}
      />

      {/* Mid orb — center */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: '30%', top: '25%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(140,60,220,0.07) 0%, transparent 70%)',
        }}
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -15, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut', delay: -8 }}
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
            background: 'rgba(168,34,221,0.55)',
            boxShadow: '0 0 12px rgba(168,34,221,0.4)',
          }}
          animate={{ y: [0, -90, 0], x: [0, p.xDrift, 0], opacity: [0, 0.85, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
