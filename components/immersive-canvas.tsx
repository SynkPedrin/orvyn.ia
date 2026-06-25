'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ExperienceHandle } from '@/experience'

function hasWebGL(): boolean {
  try { return !!document.createElement('canvas').getContext('webgl2') }
  catch { return false }
}

export function ImmersiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const handleRef = useRef<ExperienceHandle | null>(null)
  const holdRef   = useRef<ReturnType<typeof setInterval> | null>(null)
  const arcRef    = useRef<HTMLCanvasElement>(null)
  const progRef   = useRef(0)

  const [loaded,   setLoaded]   = useState(false)
  const [started,  setStarted]  = useState(false)
  const [blooming, setBlooming] = useState(false)
  const [holding,  setHolding]  = useState(false)
  const [progress, setProgress] = useState(0)

  // Mount Three.js
  useEffect(() => {
    if (!hasWebGL()) {
      setLoaded(true) // no 3D but allow hold-to-continue
      return
    }
    const canvas = canvasRef.current
    if (!canvas) return
    let cancelled = false

    import('@/experience')
      .then(({ mountExperience }) => mountExperience(canvas))
      .then((h) => {
        if (cancelled) { h.dispose(); return }
        handleRef.current = h
        setLoaded(true)
      })
      .catch(() => { if (!cancelled) setLoaded(true) })

    return () => {
      cancelled = true
      handleRef.current?.dispose()
      handleRef.current = null
    }
  }, [])

  function doShatter() {
    if (started) return
    setHolding(false)
    progRef.current = 0
    setBlooming(true)
    setTimeout(() => handleRef.current?.triggerShatter(), 300)
    setTimeout(() => setStarted(true), 1000)
  }

  // Hold fires on the ENTIRE overlay — any press anywhere triggers it
  const startHold = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault()
    if (holdRef.current || started || !loaded) return
    setHolding(true)
    progRef.current = 0
    holdRef.current = setInterval(() => {
      progRef.current += 1 / 90   // ~1.5 s to fill
      setProgress(progRef.current)
      if (progRef.current >= 1) {
        clearInterval(holdRef.current!)
        holdRef.current = null
        doShatter()
      }
    }, 16)
  }, [started, loaded]) // eslint-disable-line react-hooks/exhaustive-deps

  const cancelHold = useCallback(() => {
    if (!holdRef.current) return
    clearInterval(holdRef.current)
    holdRef.current = null
    progRef.current = 0
    setHolding(false)
    setProgress(0)
  }, [])

  // Global release cancels hold regardless of where pointer lifts
  useEffect(() => {
    window.addEventListener('mouseup', cancelHold)
    window.addEventListener('touchend', cancelHold)
    window.addEventListener('touchcancel', cancelHold)
    return () => {
      window.removeEventListener('mouseup', cancelHold)
      window.removeEventListener('touchend', cancelHold)
      window.removeEventListener('touchcancel', cancelHold)
    }
  }, [cancelHold])

  // Draw arc progress on 2d canvas
  useEffect(() => {
    const arc = arcRef.current
    if (!arc) return
    const ctx = arc.getContext('2d')!
    const s = arc.width, cx = s / 2, cy = s / 2, r = s / 2 - 4
    ctx.clearRect(0, 0, s, s)
    if (progress <= 0) return

    ctx.beginPath()
    ctx.arc(cx, cy, r, -Math.PI / 2, 1.5 * Math.PI)
    ctx.strokeStyle = 'rgba(160,158,245,0.15)'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress)
    const g = ctx.createLinearGradient(0, 0, s, s)
    g.addColorStop(0, '#A09EF5')
    g.addColorStop(1, '#534AB7')
    ctx.strokeStyle = g
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.stroke()
  }, [progress])

  return (
    <>
      {/*
        Canvas sits at z-9999 — above the LP (z-2) at all times.
        During start screen: scene.background=#07060f (opaque dark, sphere visible).
        After shatter: scene.background=null (transparent), LP shows through canvas.
      */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9999, width: '100vw', height: '100vh' }}
        aria-hidden
      />

      {/* Bloom burst */}
      <AnimatePresence>
        {blooming && !started && (
          <motion.div
            key="bloom"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 5, opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fixed pointer-events-none rounded-full"
            style={{
              zIndex: 10002,
              width: 260, height: 260,
              left: '50%', top: '50%',
              transform: 'translate(-50%,-50%)',
              background: 'radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(160,158,245,0.8) 30%, rgba(83,74,183,0.4) 60%, transparent 75%)',
              filter: 'blur(10px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Start screen — transparent bg so canvas (z-9999) shows as the dark backdrop */}
      <AnimatePresence>
        {!started && (
          <motion.div
            key="hero-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="fixed inset-0 select-none overflow-hidden"
            style={{ zIndex: 10000, background: 'transparent' }}
            onMouseDown={startHold}
            onTouchStart={startHold}
          >
            {/* NAV */}
            <div
              className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-10 lg:px-14"
              style={{ height: 64 }}
            >
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-[11px] font-semibold tracking-widest uppercase"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                ORVYN SISTEMAS
              </motion.span>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex gap-8"
              >
                {['PRODUTOS', 'CONTATO'].map((l) => (
                  <span
                    key={l}
                    className="text-[11px] tracking-widest font-medium uppercase"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    {l}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* ORVYN — top-left */}
            <div className="absolute" style={{ left: 'clamp(24px,4vw,56px)', top: '18vh' }}>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-bold leading-[0.88] tracking-tight"
                  style={{ fontSize: 'clamp(5rem, 14vw, 14rem)', color: '#f2f0fc' }}
                >
                  ORVYN
                </motion.h1>
              </div>
            </div>

            {/* SISTEMAS — bottom-right */}
            <div className="absolute" style={{ right: 'clamp(24px,4vw,56px)', bottom: '16vh' }}>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.65, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-bold leading-[0.88] tracking-tight text-right"
                  style={{ fontSize: 'clamp(5rem, 14vw, 14rem)', color: '#f2f0fc' }}
                >
                  SISTEMAS
                </motion.h1>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 sm:px-10 lg:px-14"
              style={{ paddingBottom: 'clamp(20px,4vh,40px)' }}
            >
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.7 }}
                className="text-xs sm:text-sm max-w-xs leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                VOCÊ ESTÁ PRONTO PARA<br />ENTRAR NO FUTURO?
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0.4 }}
                transition={{ delay: 1.1, duration: 0.7 }}
                className="flex items-center gap-3"
              >
                {/* Progress arc */}
                <div className="relative" style={{ width: 44, height: 44 }}>
                  <canvas ref={arcRef} width={44} height={44} className="absolute inset-0" />
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: 8, height: 8,
                      left: '50%', top: '50%',
                      transform: 'translate(-50%,-50%)',
                      background: holding ? '#A09EF5' : 'rgba(160,158,245,0.5)',
                    }}
                    animate={{ scale: holding ? [1, 1.4, 1] : [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: holding ? 0.4 : 1.8, repeat: Infinity }}
                  />
                </div>

                <div className="text-right">
                  <motion.p
                    className="text-xs sm:text-sm font-semibold tracking-widest uppercase"
                    animate={{ color: holding ? '#A09EF5' : 'rgba(255,255,255,0.55)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {loaded ? 'CLIQUE E SEGURE' : 'CARREGANDO…'}
                  </motion.p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    {loaded ? 'em qualquer lugar' : ''}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Hairline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-0 right-0 h-px origin-left"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(83,74,183,0.35),transparent)' }}
            />

            {/* Loading dots */}
            <AnimatePresence>
              {!loaded && (
                <motion.div
                  className="absolute flex gap-1.5"
                  style={{ bottom: 80, right: 56 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 rounded-full"
                      style={{ background: '#7B74E0' }}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
