import * as THREE from 'three'
import type { Core } from './core'

interface Shard {
  mesh: THREE.Mesh
  vx: number
  vy: number
  vz: number
  rx: number
  ry: number
  rz: number
  life: number
}

// Pure Three.js shatter — no Cannon-es needed for this effect
// Uses simple velocity integration (fast, no physics overhead)
export function createShatter({ scene, onTick, isMobile }: Core) {
  const shards: Shard[] = []
  let active = false
  let elapsed = 0

  const count = isMobile ? 18 : 32

  // Pre-create shard meshes (hidden until explode)
  for (let i = 0; i < count; i++) {
    const w = 0.08 + Math.random() * 0.28
    const h = 0.06 + Math.random() * 0.22
    const d = 0.01 + Math.random() * 0.04

    const geo = new THREE.BoxGeometry(w, h, d)
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x7B74E0).lerp(
        new THREE.Color(0xC0BCFF), Math.random()
      ),
      transmission: 0.8,
      roughness: 0.06,
      thickness: 0.3,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    })

    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(
      (Math.random() - 0.5) * 0.6,
      (Math.random() - 0.5) * 0.6,
      (Math.random() - 0.5) * 0.6
    )
    mesh.visible = false
    scene.add(mesh)

    // Random initial velocities pointing outward from center
    const dir = mesh.position.clone().normalize()
    const speed = 1.5 + Math.random() * 3.5
    shards.push({
      mesh,
      vx: dir.x * speed + (Math.random() - 0.5) * 1,
      vy: dir.y * speed + 1 + Math.random() * 2,
      vz: dir.z * speed + (Math.random() - 0.5) * 1,
      rx: (Math.random() - 0.5) * 6,
      ry: (Math.random() - 0.5) * 6,
      rz: (Math.random() - 0.5) * 6,
      life: 0.6 + Math.random() * 0.8,
    })
  }

  const offTick = onTick((dt) => {
    if (!active) return
    elapsed += dt

    for (const s of shards) {
      if (!s.mesh.visible) continue
      const mat = s.mesh.material as THREE.MeshPhysicalMaterial

      // Gravity
      s.vy -= 4 * dt

      s.mesh.position.x += s.vx * dt
      s.mesh.position.y += s.vy * dt
      s.mesh.position.z += s.vz * dt
      s.mesh.rotation.x += s.rx * dt
      s.mesh.rotation.y += s.ry * dt
      s.mesh.rotation.z += s.rz * dt

      // Air resistance
      s.vx *= 1 - dt * 0.5
      s.vy *= 1 - dt * 0.3
      s.vz *= 1 - dt * 0.5

      s.life -= dt

      // Fade out
      mat.opacity = Math.max(0, Math.min(0.95, s.life * 1.2))

      if (s.life <= 0) {
        s.mesh.visible = false
        scene.remove(s.mesh)
      }
    }
  })

  function explode(callback?: () => void) {
    active = true
    elapsed = 0
    for (const s of shards) {
      s.mesh.visible = true
      ;(s.mesh.material as THREE.MeshPhysicalMaterial).opacity = 0.95
      s.life = 0.8 + Math.random() * 0.8
    }
    setTimeout(() => {
      active = false
      callback?.()
    }, 2200)
  }

  return {
    explode,
    dispose: () => {
      offTick()
      for (const s of shards) {
        s.mesh.geometry.dispose()
        ;(s.mesh.material as THREE.MeshPhysicalMaterial).dispose()
        scene.remove(s.mesh)
      }
    },
  }
}
