"use client"

import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, type ReactNode } from 'react'

function GSAPSync() {
  useLenis(() => {
    if (typeof window !== 'undefined') {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.update()
      })
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
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
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      <GSAPSync />
      {children}
    </ReactLenis>
  )
}
