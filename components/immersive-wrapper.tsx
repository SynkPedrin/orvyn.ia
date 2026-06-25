'use client'

import dynamic from 'next/dynamic'

const ImmersiveCanvas = dynamic(
  () => import('@/components/immersive-canvas').then((m) => ({ default: m.ImmersiveCanvas })),
  { ssr: false }
)

export function ImmersiveWrapper() {
  return <ImmersiveCanvas />
}
