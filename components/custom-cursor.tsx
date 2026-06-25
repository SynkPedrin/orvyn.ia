'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'click' | 'text'

export function CustomCursor() {
  const [state, setState] = useState<CursorState>('default')
  const [mounted, setMounted] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const springCfg = { damping: 22, stiffness: 380, mass: 0.4 }
  const x = useSpring(mouseX, springCfg)
  const y = useSpring(mouseY, springCfg)

  // Trailing dot — slightly slower spring
  const trailX = useSpring(mouseX, { damping: 35, stiffness: 180, mass: 0.6 })
  const trailY = useSpring(mouseY, { damping: 35, stiffness: 180, mass: 0.6 })

  useEffect(() => {
    setMounted(true)

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onDown = () => setState('click')
    const onUp   = () => setState((s) => (s === 'click' ? 'default' : s))

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const isInteractive =
        t.tagName === 'A' ||
        t.tagName === 'BUTTON' ||
        t.closest('a') ||
        t.closest('button') ||
        t.getAttribute('role') === 'button' ||
        t.closest('[role="button"]') ||
        t.dataset.cursor === 'hover'

      const isText =
        t.tagName === 'INPUT' ||
        t.tagName === 'TEXTAREA' ||
        t.closest('input') ||
        t.closest('textarea')

      if (isText) {
        setState('text')
      } else if (isInteractive) {
        setState('hover')
      }
    }

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null
      if (!related) setState('default')

      const isInteractive =
        related?.tagName === 'A' ||
        related?.tagName === 'BUTTON' ||
        related?.closest?.('a') ||
        related?.closest?.('button')

      if (!isInteractive) setState('default')
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [mouseX, mouseY])

  if (!mounted) return null

  const isHover = state === 'hover'
  const isClick = state === 'click'

  return (
    <>
      {/* Global cursor: none */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Trailing ring — larger, slower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10003] hidden md:block"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width:  isHover ? 52 : isClick ? 28 : 38,
            height: isHover ? 52 : isClick ? 28 : 38,
            opacity: isHover ? 0.45 : 0.2,
            borderColor: isHover
              ? 'rgba(147, 51, 234, 0.8)'
              : 'rgba(147, 51, 234, 0.4)',
          }}
          transition={{ duration: 0.35 }}
          style={{ borderRadius: '50%', border: '1.5px solid rgba(147,51,234,0.4)' }}
        />
      </motion.div>

      {/* Main sphere */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10005] hidden md:block"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width:  isHover ? 28 : isClick ? 10 : 16,
            height: isHover ? 28 : isClick ? 10 : 16,
            scale: isClick ? 0.8 : 1,
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            borderRadius: '50%',
            background: isHover
              ? 'radial-gradient(circle at 35% 35%, rgba(220,180,255,1) 0%, rgba(147,51,234,0.95) 45%, rgba(80,20,140,0.9) 100%)'
              : isClick
              ? 'radial-gradient(circle at 35% 35%, #fff 0%, rgba(200,150,255,0.95) 40%, rgba(147,51,234,0.9) 100%)'
              : 'radial-gradient(circle at 35% 35%, rgba(220,190,255,0.95) 0%, rgba(147,51,234,0.85) 50%, rgba(80,20,140,0.8) 100%)',
            boxShadow: isHover
              ? '0 0 18px 6px rgba(147,51,234,0.45), inset -3px -3px 6px rgba(80,20,140,0.5), inset 2px 2px 4px rgba(255,255,255,0.35)'
              : isClick
              ? '0 0 8px 3px rgba(147,51,234,0.6), inset -1px -1px 3px rgba(80,20,140,0.4), inset 1px 1px 2px rgba(255,255,255,0.5)'
              : '0 0 10px 3px rgba(147,51,234,0.25), inset -2px -2px 4px rgba(80,20,140,0.4), inset 1.5px 1.5px 3px rgba(255,255,255,0.3)',
          }}
        >
          {/* Specular highlight */}
          <motion.div
            animate={{
              width:  isHover ? 8 : 4,
              height: isHover ? 8 : 4,
              opacity: isClick ? 0.4 : 0.85,
            }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              top: '20%',
              left: '22%',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              filter: 'blur(1px)',
            }}
          />
        </motion.div>

        {/* Hover glow ring pulse */}
        {isHover && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0.6 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.7, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1px solid rgba(147,51,234,0.5)',
            }}
          />
        )}
      </motion.div>
    </>
  )
}
