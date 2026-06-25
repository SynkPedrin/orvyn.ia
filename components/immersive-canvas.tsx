'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import type { ExperienceHandle } from '@/experience'

function canRunExperience(): boolean {
  try {
    const gl = document.createElement('canvas').getContext('webgl2')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    return !!gl && !reduced
  } catch {
    return false
  }
}

export function ImmersiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const handleRef = useRef<ExperienceHandle | null>(null)
  const [started, setStarted] = useState(false)
  const [blooming, setBlooming] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    if (!canRunExperience()) { setSupported(false); return }
    const canvas = canvasRef.current
    if (!canvas) return
    let cancelled = false

    import('@/experience').then(({ mountExperience }) => {
      if (cancelled) return
      mountExperience(canvas).then((handle) => {
        if (cancelled) { handle.dispose(); return }
        handleRef.current = handle
        setLoaded(true)
      })
    })

    return () => {
      cancelled = true
      handleRef.current?.dispose()
    }
  }, [])

  const handleStart = useCallback(() => {
    if (!loaded) return
    setBlooming(true)

    // 1) 350ms: cristal explode junto com o bloom
    setTimeout(() => handleRef.current?.triggerShatter(), 350)

    // 2) 900ms: overlay começa a sair → LP revelada
    setTimeout(() => setStarted(true), 900)
  }, [loaded])

  if (!supported) return null

  return (
    <>
      {/* WebGL canvas — fixed, behind everything */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1, width: '100vw', height: '100vh' }}
        aria-hidden
      />

      {/* Bloom flash — aparece no click, antes do overlay sair */}
      <AnimatePresence>
        {blooming && !started && (
          <motion.div
            key="bloom"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 4, opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="fixed pointer-events-none rounded-full"
            style={{
              zIndex: 10000,
              width: 320,
              height: 320,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              background:
                'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(160,158,245,0.85) 25%, rgba(83,74,183,0.5) 55%, transparent 75%)',
              filter: 'blur(8px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Start gate overlay */}
      <AnimatePresence>
        {!started && (
          <motion.div
            key="gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: blooming ? 0.5 : 0.7, delay: blooming ? 0.45 : 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center"
            style={{ zIndex: 9999, background: 'rgba(7,6,15,0.92)', backdropFilter: 'blur(2px)' }}
          >
            {/* Gem logo — logo real da ORVYN */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-8"
            >
              {/* Glow atrás do logo */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background: 'radial-gradient(circle, rgba(83,74,183,0.6) 0%, transparent 70%)',
                  filter: 'blur(16px)',
                  width: 100,
                  height: 100,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%,-50%)',
                }}
              />
              <Image
                src="/images/orvyn-gem.png"
                alt="ORVYN"
                width={88}
                height={88}
                priority
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(83,74,183,0.9)) drop-shadow(0 0 40px rgba(160,158,245,0.5))',
                  position: 'relative',
                }}
              />
            </motion.div>

            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-[11px] font-semibold tracking-widest uppercase mb-3"
              style={{ color: 'rgba(160,158,245,0.65)' }}
            >
              ORVYN SISTEMAS — 2026
            </motion.p>

            {/* Heading */}
            <div className="overflow-hidden mb-1">
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold text-center"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#f2f0fc', lineHeight: 1.05 }}
              >
                Inteligência que
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.72, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold text-center"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', lineHeight: 1.05 }}
              >
                <span style={{ color: '#A09EF5' }}>transforma.</span>
              </motion.h1>
            </div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="text-sm text-center mb-10 max-w-xs leading-relaxed"
              style={{ color: 'rgba(242,240,252,0.4)' }}
            >
              Experiência interativa com efeitos visuais 3D.
            </motion.p>

            {/* CTA button */}
            <motion.button
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: loaded ? 1 : 0.45, y: 0 }}
              transition={{ delay: 1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={loaded ? { scale: 1.05, y: -3 } : {}}
              whileTap={loaded ? { scale: 0.96 } : {}}
              onClick={handleStart}
              disabled={!loaded}
              className="relative overflow-hidden px-12 py-4 rounded-2xl font-semibold text-base text-white"
              style={{
                background: 'linear-gradient(135deg, #534AB7 0%, #7B74E0 100%)',
                boxShadow: loaded
                  ? '0 0 50px rgba(83,74,183,0.5), 0 8px 28px rgba(83,74,183,0.35)'
                  : 'none',
                cursor: loaded ? 'pointer' : 'wait',
                letterSpacing: '0.02em',
              }}
            >
              {loaded ? 'Iniciar Experiência' : 'Carregando…'}

              {/* Shimmer sweep */}
              {loaded && (
                <motion.span
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: 'linear' }}
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
                  }}
                />
              )}
            </motion.button>

            {/* Loading dots */}
            <AnimatePresence>
              {!loaded && (
                <motion.div
                  className="mt-5 flex gap-1.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: '#7B74E0' }}
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.22 }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hairline bottom */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-0 right-0 h-px origin-left"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(83,74,183,0.4), transparent)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
