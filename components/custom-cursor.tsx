'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import Image from 'next/image'

type CursorState = 'default' | 'hover' | 'click' | 'text'

export function CustomCursor() {
  const [state, setState] = useState<CursorState>('default')
  const [mounted, setMounted] = useState(false)
  const clickSfxRef = useRef<HTMLAudioElement | null>(null)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Main gem: fast spring
  const springCfg = { damping: 20, stiffness: 360, mass: 0.35 }
  const x = useSpring(mouseX, springCfg)
  const y = useSpring(mouseY, springCfg)

  // Trail ring: slower spring
  const trailX = useSpring(mouseX, { damping: 32, stiffness: 140, mass: 0.7 })
  const trailY = useSpring(mouseY, { damping: 32, stiffness: 140, mass: 0.7 })

  useEffect(() => {
    setMounted(true)
    clickSfxRef.current = new Audio('/click.mp3')
    if (clickSfxRef.current) clickSfxRef.current.volume = 0.45
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onDown = () => {
      setState('click')
      // Play click sound on cursor click
      if (clickSfxRef.current) {
        clickSfxRef.current.currentTime = 0
        clickSfxRef.current.play().catch(() => {})
      }
    }
    const onUp = () => setState(s => s === 'click' ? 'default' : s)

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const isInteractive =
        t.tagName === 'A' || t.tagName === 'BUTTON' ||
        t.closest('a') || t.closest('button') ||
        t.getAttribute('role') === 'button' ||
        t.closest('[role="button"]') ||
        t.dataset.cursor === 'hover'

      const isText =
        t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' ||
        t.closest('input') || t.closest('textarea')

      if (isText) setState('text')
      else if (isInteractive) setState('hover')
    }

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null
      if (!related) { setState('default'); return }
      const isInteractive =
        related.tagName === 'A' || related.tagName === 'BUTTON' ||
        related.closest?.('a') || related.closest?.('button')
      if (!isInteractive) setState('default')
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
    }
  }, [mouseX, mouseY])

  if (!mounted) return null

  const isHover = state === 'hover'
  const isClick = state === 'click'

  // Gem size reacts to state
  const gemSize = isHover ? 52 : isClick ? 28 : 36
  const gemScale = isClick ? 0.72 : 1
  const glowSize = isHover ? 80 : isClick ? 40 : 52
  const glowOpacity = isHover ? 0.5 : isClick ? 0.8 : 0.25

  return (
    <>
      {/* Hide native cursor */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Trail ring — orbit behind gem */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10002] hidden md:block"
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{
            width:  isHover ? 70 : 48,
            height: isHover ? 70 : 48,
            opacity: isHover ? 0.4 : 0.15,
            borderColor: isHover
              ? 'rgba(200,80,255,0.7)'
              : 'rgba(168,34,221,0.3)',
          }}
          transition={{ duration: 0.3 }}
          style={{
            borderRadius: '50%',
            border: '1.5px solid rgba(168,34,221,0.3)',
          }}
        />
      </motion.div>

      {/* Glow halo behind gem */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10003] hidden md:block"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{
            width:   glowSize,
            height:  glowSize,
            opacity: glowOpacity,
          }}
          transition={{ duration: 0.25 }}
          style={{
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,34,221,0.6) 0%, rgba(168,34,221,0.2) 50%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Click burst ring — appears on click */}
      {isClick && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[10004] hidden md:block"
          style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0.9 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{
              width: 36, height: 36,
              borderRadius: '50%',
              border: '2px solid rgba(200,80,255,0.8)',
            }}
          />
        </motion.div>
      )}

      {/* Gem logo — main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10005] hidden md:block"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{ width: gemSize, height: gemSize, scale: gemScale }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{ position: 'relative' }}
        >
          {/* Specular ring on hover */}
          {isHover && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.7 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: -4,
                borderRadius: '50%',
                border: '1px solid rgba(200,80,255,0.6)',
              }}
            />
          )}

          <Image
            src="/images/orvyn-gem.png"
            alt=""
            fill
            sizes="64px"
            className="object-contain"
            style={{
              filter: isHover
                ? 'drop-shadow(0 0 14px rgba(200,80,255,0.9)) drop-shadow(0 0 6px rgba(168,34,221,0.6))'
                : isClick
                ? 'drop-shadow(0 0 20px rgba(255,100,255,1)) brightness(1.4)'
                : 'drop-shadow(0 0 8px rgba(168,34,221,0.55))',
              mixBlendMode: 'screen',
              transition: 'filter 0.2s ease',
            }}
            priority
          />
        </motion.div>
      </motion.div>
    </>
  )
}
