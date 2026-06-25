import * as THREE from 'three'
import type { Core } from './core'

interface Shard {
  mesh: THREE.Mesh
  vx: number; vy: number; vz: number
  rx: number; ry: number; rz: number
  life: number; maxLife: number
}

// Sphere shards — triangular curved pieces using SphereGeometry subdivision
function buildShardGeo(radius: number): THREE.BufferGeometry {
  // Pick 3 random adjacent points on a sphere surface → flat triangle shard
  const theta1 = Math.random() * Math.PI * 2
  const theta2 = theta1 + 0.3 + Math.random() * 0.4
  const phi = Math.random() * Math.PI
  const dphi = 0.25 + Math.random() * 0.3

  const pts = [
    [radius * Math.sin(phi) * Math.cos(theta1), radius * Math.cos(phi),             radius * Math.sin(phi) * Math.sin(theta1)],
    [radius * Math.sin(phi+dphi) * Math.cos(theta2), radius * Math.cos(phi+dphi),   radius * Math.sin(phi+dphi) * Math.sin(theta2)],
    [radius * Math.sin(phi) * Math.cos(theta2), radius * Math.cos(phi),             radius * Math.sin(phi) * Math.sin(theta2)],
  ]

  const pos = new Float32Array([...pts[0], ...pts[1], ...pts[2]])
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.computeVertexNormals()
  return geo
}

export function createShatter({ scene, onTick, isMobile }: Core) {
  const count = isMobile ? 22 : 40
  const shards: Shard[] = []

  const loader = new THREE.TextureLoader()
  const glowTex = (() => {
    const c = document.createElement('canvas'); c.width = 64; c.height = 64
    const ctx = c.getContext('2d')!
    const g = ctx.createRadialGradient(32,32,0,32,32,32)
    g.addColorStop(0, 'rgba(200,196,255,0.9)'); g.addColorStop(1, 'rgba(168,34,221,0)')
    ctx.fillStyle = g; ctx.fillRect(0,0,64,64)
    return new THREE.CanvasTexture(c)
  })()

  for (let i = 0; i < count; i++) {
    const geo = buildShardGeo(1.5)
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xA09EF5).lerp(new THREE.Color(0xE8E6FF), Math.random()),
      transmission: 0.75,
      roughness: 0.02,
      thickness: 0.1,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      envMapIntensity: 1.5,
    })

    const mesh = new THREE.Mesh(geo, mat)
    mesh.visible = false
    scene.add(mesh)

    // Start each shard near the sphere surface
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 1.4
    mesh.position.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    )

    const dir = mesh.position.clone().normalize()
    const speed = 1.8 + Math.random() * 4
    const life = 1.0 + Math.random() * 1.2

    shards.push({
      mesh,
      vx: dir.x * speed + (Math.random()-.5) * 0.8,
      vy: dir.y * speed + 0.5 + Math.random() * 1.5,
      vz: dir.z * speed + (Math.random()-.5) * 0.8,
      rx: (Math.random()-.5) * 8,
      ry: (Math.random()-.5) * 8,
      rz: (Math.random()-.5) * 8,
      life,
      maxLife: life,
    })
  }

  let active = false

  const offTick = onTick((dt) => {
    if (!active) return
    for (const s of shards) {
      if (!s.mesh.visible) continue
      const mat = s.mesh.material as THREE.MeshPhysicalMaterial

      s.vy -= 3.5 * dt
      s.vx *= 1 - dt * 0.6
      s.vy *= 1 - dt * 0.3
      s.vz *= 1 - dt * 0.6

      s.mesh.position.x += s.vx * dt
      s.mesh.position.y += s.vy * dt
      s.mesh.position.z += s.vz * dt
      s.mesh.rotation.x += s.rx * dt
      s.mesh.rotation.y += s.ry * dt
      s.mesh.rotation.z += s.rz * dt

      s.life -= dt
      mat.opacity = Math.max(0, s.life / s.maxLife * 0.92)

      if (s.life <= 0) {
        s.mesh.visible = false
        scene.remove(s.mesh)
      }
    }
  })

  function explode(onDone?: () => void) {
    active = true
    for (const s of shards) {
      s.mesh.visible = true
      ;(s.mesh.material as THREE.MeshPhysicalMaterial).opacity = 0.92
      s.life = s.maxLife
    }
    setTimeout(() => {
      active = false
      onDone?.()
    }, 2500)
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
      glowTex.dispose()
    },
  }
}
