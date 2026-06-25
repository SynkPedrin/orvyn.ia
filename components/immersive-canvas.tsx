'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import type { ExperienceHandle } from '@/experience'

function canRun(): boolean {
  try {
    return !!document.createElement('canvas').getContext('webgl2') &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch { return false }
}

export function ImmersiveCanvas() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const handleRef  = useRef<ExperienceHandle | null>(null)
  const holdRef    = useRef<ReturnType<typeof setInterval> | null>(null)

  const [supported, setSupported] = useState(true)
  const [loaded,    setLoaded]    = useState(false)
  const [started,   setStarted]   = useState(false)
  const [blooming,  setBlooming]  = useState(false)
  const [holding,   setHolding]   = useState(false)
  const [progress,  setProgress]  = useState(0)     // 0–1 hold progress

  const rawProgress = useMotionValue(0)
  const smoothProg  = useSpring(rawProgress, { stiffness: 80, damping: 20 })

  useEffect(() => {
    if (!canRun()) { setSupported(false); return }
    const canvas = canvasRef.current; if (!canvas) return
    let cancelled = false

    import('@/experience').then(({ mountExperience }) => {
      if (cancelled) return
      mountExperience(canvas).then((h) => {
        if (cancelled) { h.dispose(); return }
        handleRef.current = h
        setLoaded(true)
      })
    })
    return () => { cancelled = true; handleRef.current?.dispose() }
  }, [])

  // ── Hold-to-shatter logic ────────────────────────────────────
  const startHold = useCallback(() => {
    if (!loaded || started) return
    setHolding(true)
    let p = 0
    holdRef.current = setInterval(() => {
      p += 1 / 90          // ~1.5 s at 60fps
      rawProgress.set(p)
      setProgress(p)
      if (p >= 1) {
        clearInterval(holdRef.current!)
        holdRef.current = null
        doShatter()
      }
    }, 16)
  }, [loaded, started])

  const cancelHold = useCallback(() => {
    if (holdRef.current) { clearInterval(holdRef.current); holdRef.current = null }
    setHolding(false)
    setProgress(0)
    rawProgress.set(0)
  }, [])

  function doShatter() {
    setHolding(false)
    setBlooming(true)
    setTimeout(() => handleRef.current?.triggerShatter(), 300)
    setTimeout(() => setStarted(true), 1000)
  }

  // Draw progress arc on canvas2d overlay
  const arcRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const arc = arcRef.current; if (!arc) return
    const ctx = arc.getContext('2d')!
    const size = arc.width
    const cx = size / 2, cy = size / 2, r = size / 2 - 4

    ctx.clearRect(0, 0, size, size)
    if (progress <= 0) return

    // Track
    ctx.beginPath()
    ctx.arc(cx, cy, r, -Math.PI / 2, Math.PI * 2 * 1 - Math.PI / 2)
    ctx.strokeStyle = 'rgba(160,158,245,0.15)'
    ctx.lineWidth = 2
    ctx.stroke()

    // Fill
    ctx.beginPath()
    ctx.arc(cx, cy, r, -Math.PI / 2, Math.PI * 2 * progress - Math.PI / 2)
    const grad = ctx.createLinearGradient(0, 0, size, size)
    grad.addColorStop(0, '#A09EF5')
    grad.addColorStop(1, '#534AB7')
    ctx.strokeStyle = grad
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.stroke()
  }, [progress])

  if (!supported) return null

  return (
    <>
      {/* ── WebGL canvas — fixed, z-1, behind DOM ────────────── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1, width: '100vw', height: '100vh' }}
        aria-hidden
      />

      {/* ── Bloom flash on shatter ───────────────────────────── */}
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

      {/* ── Noomo-style hero screen ──────────────────────────── */}
      <AnimatePresence>
        {!started && (
          <motion.div
            key="hero-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="fixed inset-0 select-none overflow-hidden"
            style={{ zIndex: 10000, background: '#07060f' }}
          >
            {/* NAV strip */}
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
                  <span key={l}
                    className="text-[11px] tracking-widest font-medium uppercase cursor-pointer transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(160,158,245,0.9)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                  >
                    {l}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* ── ORVYN — top-left oversized ──────────────────── */}
            <div className="absolute"
              style={{ left: 'clamp(24px,4vw,56px)', top: '18vh', zIndex: 2 }}>
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

            {/* ── SISTEMAS — bottom-right oversized ───────────── */}
            <div className="absolute"
              style={{ right: 'clamp(24px,4vw,56px)', bottom: '16vh', zIndex: 2 }}>
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

            {/* ── Bottom bar — like Noomo ──────────────────────── */}
            <div
              className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 sm:px-10 lg:px-14"
              style={{ paddingBottom: 'clamp(20px,4vh,40px)', zIndex: 3 }}
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

              {/* CLIQUE E SEGURE + arc progress */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0.4 }}
                transition={{ delay: 1.1, duration: 0.7 }}
                className="flex flex-col items-end gap-3"
              >
                <div className="relative flex items-center gap-3">
                  {/* Progress arc canvas */}
                  <div className="relative" style={{ width: 44, height: 44 }}>
                    <canvas
                      ref={arcRef}
                      width={44} height={44}
                      className="absolute inset-0"
                    />
                    {/* Pulsing center dot */}
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

                  <div
                    className="text-right cursor-pointer"
                    onMouseDown={startHold}
                    onMouseUp={cancelHold}
                    onMouseLeave={cancelHold}
                    onTouchStart={startHold}
                    onTouchEnd={cancelHold}
                  >
                    <motion.p
                      className="text-xs sm:text-sm font-semibold tracking-widest uppercase"
                      style={{ color: holding ? '#A09EF5' : 'rgba(255,255,255,0.55)' }}
                      animate={{ color: holding ? '#A09EF5' : 'rgba(255,255,255,0.55)' }}
                      transition={{ duration: 0.2 }}
                    >
                      {loaded ? 'CLIQUE E SEGURE' : 'CARREGANDO…'}
                    </motion.p>
                    <p className="text-[10px] mt-0.5"
                      style={{ color: 'rgba(255,255,255,0.2)' }}>
                      {loaded ? 'para iniciar' : ''}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── Hairline bottom ──────────────────────────────── */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-0 right-0 h-px origin-left"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(83,74,183,0.35),transparent)' }}
            />

            {/* ── Loading dots ─────────────────────────────────── */}
            <AnimatePresence>
              {!loaded && (
                <motion.div
                  className="absolute flex gap-1.5"
                  style={{ bottom: 80, right: 56 }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                  {[0,1,2].map((i) => (
                    <motion.div key={i} className="w-1 h-1 rounded-full"
                      style={{ background: '#7B74E0' }}
                      animate={{ opacity:[0.2,1,0.2] }}
                      transition={{ duration:1, repeat:Infinity, delay:i*0.2 }}
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
