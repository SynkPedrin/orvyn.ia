import * as THREE from 'three'
import type { Core } from './core'

export function createParticles({ scene, onTick, isMobile }: Core) {
  const count = isMobile ? 60 : 140
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const speeds = new Float32Array(count)
  const offsets = new Float32Array(count)

  // Seed particles in a sphere volume
  for (let i = 0; i < count; i++) {
    const r = 1.8 + Math.random() * 3.5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
    sizes[i] = 0.015 + Math.random() * 0.025
    speeds[i] = 0.2 + Math.random() * 0.6
    offsets[i] = Math.random() * Math.PI * 2
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  // Round particle sprite
  const canvas = document.createElement('canvas')
  canvas.width = 32; canvas.height = 32
  const ctx = canvas.getContext('2d')!
  const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
  grad.addColorStop(0, 'rgba(160,158,245,1)')
  grad.addColorStop(0.4, 'rgba(83,74,183,0.6)')
  grad.addColorStop(1, 'rgba(83,74,183,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 32, 32)
  const sprite = new THREE.CanvasTexture(canvas)

  const mat = new THREE.PointsMaterial({
    size: 0.12,
    map: sprite,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  })

  const points = new THREE.Points(geo, mat)
  scene.add(points)

  let time = 0
  const posArr = geo.attributes.position.array as Float32Array

  const offTick = onTick((dt) => {
    time += dt
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += dt * speeds[i] * 0.3
      // Reset when too high
      if (posArr[i * 3 + 1] > 5) {
        posArr[i * 3 + 1] = -5
      }
      // Gentle swirl
      const angle = time * speeds[i] * 0.1 + offsets[i]
      const r = Math.sqrt(posArr[i * 3] ** 2 + posArr[i * 3 + 2] ** 2) || 1
      posArr[i * 3] += Math.cos(angle) * 0.0015
      posArr[i * 3 + 2] += Math.sin(angle) * 0.0015
    }
    geo.attributes.position.needsUpdate = true
    points.rotation.y = time * 0.02
  })

  return {
    points,
    dispose: () => {
      offTick()
      geo.dispose()
      mat.dispose()
      sprite.dispose()
    },
  }
}
