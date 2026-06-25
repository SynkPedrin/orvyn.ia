'use client'

import { useState, useCallback } from 'react'
import { Preloader } from './preloader'
import { SmoothScrollProvider } from './smooth-scroll-provider'

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [preloaderDone, setPreloaderDone] = useState(false)

  // useCallback estabiliza a referência — evita re-run do useEffect no Preloader
  const handleComplete = useCallback(() => setPreloaderDone(true), [])

  return (
    <>
      <Preloader onComplete={handleComplete} />
      <SmoothScrollProvider>
        <div
          style={{
            opacity: preloaderDone ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          {children}
        </div>
      </SmoothScrollProvider>
    </>
  )
}
