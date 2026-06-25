"use client"

import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, type ReactNode } from 'react'

function GSAPSync() {
  // Sync Lenis scroll ticks → ScrollTrigger on every frame
  useLenis(() => {
    if (typeof window === 'undefined') return
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.update()
    })
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        // Disable lag smoothing so scrub feels tight
        gsap.ticker.lagSmoothing(0)
        ScrollTrigger.refresh()
      })
    })
  }, [])

  return null
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.6,
        infinite: false,
        autoResize: true,
      }}
    >
      <GSAPSync />
      {children}
    </ReactLenis>
  )
}
