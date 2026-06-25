import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import type { Core } from './core'

export interface CrystalSystem {
  group: THREE.Group
  hide: () => void
  show: () => void
  dispose: () => void
}

export function createCrystal({ scene, renderer, onTick, isMobile }: Core): CrystalSystem {
  // Environment map for glass refraction
  const pmrem = new THREE.PMREMGenerator(renderer)
  pmrem.compileEquirectangularShader()
  const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envMap
  pmrem.dispose()

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.4)
  const dir1 = new THREE.DirectionalLight(0xffffff, 2)
  dir1.position.set(3, 5, 4)
  const dir2 = new THREE.DirectionalLight(0x8B82FF, 1)
  dir2.position.set(-4, -2, 2)
  const pointGlow = new THREE.PointLight(0x7B74E0, 4, 6)
  scene.add(ambient, dir1, dir2, pointGlow)

  const group = new THREE.Group()
  scene.add(group)

  // Outer glass shell — IcosahedronGeometry detail=1 → gem facets
  const outerGeo = new THREE.IcosahedronGeometry(1.3, 1)
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x8B82FF),
    transmission: isMobile ? 0.75 : 0.94,
    roughness: 0.04,
    thickness: isMobile ? 1.2 : 2.5,
    ior: 1.9,
    transparent: true,
    envMapIntensity: 2,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    metalness: 0.05,
    side: THREE.DoubleSide,
  })
  const outerMesh = new THREE.Mesh(outerGeo, glassMat)
  group.add(outerMesh)

  // Inner glowing core
  const innerGeo = new THREE.IcosahedronGeometry(0.65, 1)
  const innerMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x534AB7),
    emissive: new THREE.Color(0x4A42A8),
    emissiveIntensity: 1.2,
    roughness: 0.2,
    metalness: 0.1,
    transparent: true,
    opacity: 0.85,
  })
  const innerMesh = new THREE.Mesh(innerGeo, innerMat)
  group.add(innerMesh)

  // Wireframe accent
  const wireGeo = new THREE.IcosahedronGeometry(1.31, 1)
  const wireMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xA09EF5),
    wireframe: true,
    transparent: true,
    opacity: isMobile ? 0.06 : 0.1,
  })
  const wireMesh = new THREE.Mesh(wireGeo, wireMat)
  group.add(wireMesh)

  // Floating ring
  const ringGeo = new THREE.TorusGeometry(1.9, 0.015, 8, 80)
  const ringMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x7B74E0),
    transparent: true,
    opacity: 0.3,
  })
  const ring = new THREE.Mesh(ringGeo, ringMat)
  ring.rotation.x = Math.PI / 2.8
  group.add(ring)

  // Second ring at different angle
  const ring2 = ring.clone()
  ring2.rotation.set(Math.PI / 5, Math.PI / 4, 0)
  ;(ring2.material as THREE.MeshBasicMaterial).opacity = 0.15
  group.add(ring2)

  let time = 0
  let active = true

  const offTick = onTick((dt) => {
    if (!active) return
    time += dt
    outerMesh.rotation.y = time * 0.18
    outerMesh.rotation.x = Math.sin(time * 0.12) * 0.12
    innerMesh.rotation.y = -time * 0.25
    innerMesh.rotation.z = Math.sin(time * 0.1) * 0.08
    wireMesh.rotation.y = time * 0.18
    ring.rotation.z = time * 0.06
    ring2.rotation.z = -time * 0.04
    pointGlow.position.set(
      Math.sin(time * 0.4) * 0.8,
      Math.cos(time * 0.3) * 0.6,
      1.5
    )
    pointGlow.intensity = 3.5 + Math.sin(time * 1.2) * 0.8
    // Gentle float
    group.position.y = Math.sin(time * 0.5) * 0.08
  })

  return {
    group,
    hide: () => { active = false; group.visible = false },
    show: () => { active = true; group.visible = true },
    dispose: offTick,
  }
}
