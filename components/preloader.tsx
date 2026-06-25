'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check if already shown this session
    const shown = sessionStorage.getItem('orvyn-preloader')
    if (shown) {
      onComplete()
      return
    }

    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 18 + 5
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setTimeout(() => {
          setDone(true)
          sessionStorage.setItem('orvyn-preloader', '1')
          setTimeout(onComplete, 700)
        }, 200)
      }
      setProgress(Math.min(Math.round(current), 100))
    }, 60)

    return () => clearInterval(interval)
  }, [onComplete])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#0d0c1a' }}
        >
          {/* Gem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <Image
              src="/images/orvyn-gem.png"
              alt="ORVYN"
              width={80}
              height={80}
              style={{ filter: 'drop-shadow(0 0 32px rgba(83,74,183,0.8))' }}
              priority
            />
          </motion.div>

          {/* Progress bar */}
          <div className="w-56 h-px bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #534AB7, #8B85E8)',
              }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
