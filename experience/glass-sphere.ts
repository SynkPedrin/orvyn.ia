import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import type { Core } from './core'

export interface GlassSphereSystem {
  group: THREE.Group
  hide: () => void
  dispose: () => void
}

export function createGlassSphere({ scene, renderer, onTick, isMobile }: Core): GlassSphereSystem {
  // Shared env map for glass reflections
  const pmrem = new THREE.PMREMGenerator(renderer)
  pmrem.compileEquirectangularShader()
  const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envMap
  pmrem.dispose()

  const group = new THREE.Group()
  scene.add(group)

  // ── Lights ──────────────────────────────────────────────────
  const ambient = new THREE.AmbientLight(0xffffff, 0.3)
  const dir = new THREE.DirectionalLight(0xffffff, 2.5)
  dir.position.set(4, 6, 5)
  const rim = new THREE.DirectionalLight(0x8B82FF, 1.2)
  rim.position.set(-5, -3, 2)
  const inner = new THREE.PointLight(0x7B74E0, 5, 5)
  scene.add(ambient, dir, rim, inner)

  // ── Outer glass sphere ───────────────────────────────────────
  const sphereGeo = new THREE.SphereGeometry(1.5, isMobile ? 48 : 96, isMobile ? 48 : 96)
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xC8C4FF),
    transmission: isMobile ? 0.82 : 0.96,
    roughness: 0.0,
    thickness: isMobile ? 1.5 : 3.0,
    ior: 1.5,
    transparent: true,
    envMapIntensity: 2.5,
    clearcoat: 1,
    clearcoatRoughness: 0,
    metalness: 0.0,
    side: THREE.FrontSide,
  })
  const sphere = new THREE.Mesh(sphereGeo, glassMat)
  group.add(sphere)

  // ── Inner atmosphere (subtle inner glow) ─────────────────────
  const innerGeo = new THREE.SphereGeometry(1.35, 32, 32)
  const innerMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x534AB7),
    transparent: true,
    opacity: 0.07,
    side: THREE.BackSide,
  })
  group.add(new THREE.Mesh(innerGeo, innerMat))

  // ── ORVYN logo plane inside the sphere ───────────────────────
  const loader = new THREE.TextureLoader()
  const logoPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.1, 1.1),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,            // starts hidden, fades in after texture loads
      depthTest: false,
      side: THREE.DoubleSide,
    })
  )
  loader.load('/images/orvyn-gem.png', (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace
    ;(logoPlane.material as THREE.MeshBasicMaterial).map = tex
    ;(logoPlane.material as THREE.MeshBasicMaterial).opacity = 0.9
    logoPlane.material.needsUpdate = true
  })
  group.add(logoPlane)

  // ── Equatorial ring ──────────────────────────────────────────
  const ringGeo = new THREE.TorusGeometry(2.0, 0.012, 8, 120)
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x9B92FF,
    transparent: true,
    opacity: 0.25,
  })
  const ring = new THREE.Mesh(ringGeo, ringMat)
  ring.rotation.x = Math.PI / 2.5
  group.add(ring)

  // ── Animation ────────────────────────────────────────────────
  let time = 0
  let active = true

  const offTick = onTick((dt) => {
    if (!active) return
    time += dt

    group.rotation.y = time * 0.12
    logoPlane.rotation.y = -group.rotation.y  // counter-rotate to stay upright
    sphere.rotation.y = time * 0.06
    ring.rotation.z = time * 0.04

    inner.position.set(
      Math.sin(time * 0.7) * 0.5,
      Math.cos(time * 0.5) * 0.4,
      Math.cos(time * 0.6) * 0.5
    )
    inner.intensity = 4 + Math.sin(time * 1.5) * 1

    group.position.y = Math.sin(time * 0.4) * 0.1
  })

  return {
    group,
    hide: () => { active = false; group.visible = false },
    dispose: offTick,
  }
}
