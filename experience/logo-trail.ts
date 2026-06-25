import * as THREE from 'three'
import type { Core } from './core'

const TRAIL_LENGTH = 90

export function createLogoTrail({ scene, camera, onTick }: Core) {
  // ── Logo sprite — always faces camera (billboard) ────────────
  const loader = new THREE.TextureLoader()
  const spriteMat = new THREE.SpriteMaterial({
    transparent: true,
    opacity: 0,
    depthTest: false,
    blending: THREE.NormalBlending,
  })
  loader.load('/images/orvyn-gem.png', (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace
    spriteMat.map = tex
    spriteMat.needsUpdate = true
    fadeIn()
  })

  const sprite = new THREE.Sprite(spriteMat)
  sprite.scale.set(0.55, 0.55, 1)
  sprite.visible = false
  scene.add(sprite)

  // Glow halo behind the sprite
  const glowMat = new THREE.SpriteMaterial({
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthTest: false,
  })
  const glowCanvas = document.createElement('canvas')
  glowCanvas.width = 128; glowCanvas.height = 128
  const gc = glowCanvas.getContext('2d')!
  const gr = gc.createRadialGradient(64, 64, 0, 64, 64, 64)
  gr.addColorStop(0, 'rgba(160,158,245,0.8)')
  gr.addColorStop(0.35, 'rgba(83,74,183,0.4)')
  gr.addColorStop(1, 'rgba(83,74,183,0)')
  gc.fillStyle = gr
  gc.fillRect(0, 0, 128, 128)
  glowMat.map = new THREE.CanvasTexture(glowCanvas)

  const glow = new THREE.Sprite(glowMat)
  glow.scale.set(1.4, 1.4, 1)
  glow.visible = false
  scene.add(glow)

  // ── Trail points ─────────────────────────────────────────────
  const trailPositions = new Float32Array(TRAIL_LENGTH * 3)
  const trailGeo = new THREE.BufferGeometry()
  trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3))
  trailGeo.setDrawRange(0, 0)

  const trailCanvas = document.createElement('canvas')
  trailCanvas.width = 32; trailCanvas.height = 32
  const tc = trailCanvas.getContext('2d')!
  const tg = tc.createRadialGradient(16, 16, 0, 16, 16, 16)
  tg.addColorStop(0, 'rgba(160,158,245,1)')
  tg.addColorStop(0.5, 'rgba(83,74,183,0.6)')
  tg.addColorStop(1, 'rgba(83,74,183,0)')
  tc.fillStyle = tg
  tc.fillRect(0, 0, 32, 32)

  const trailMat = new THREE.PointsMaterial({
    size: 0.055,
    map: new THREE.CanvasTexture(trailCanvas),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  })
  const trailPoints = new THREE.Points(trailGeo, trailMat)
  trailPoints.visible = false
  scene.add(trailPoints)

  // ── State ────────────────────────────────────────────────────
  let active = false
  let opacity = 0
  const gemPos = new THREE.Vector3()
  const gemTarget = new THREE.Vector3()
  const camDir = new THREE.Vector3()
  const camRight = new THREE.Vector3()
  let trailCount = 0
  let frameCount = 0

  function fadeIn() {
    sprite.visible = true
    glow.visible = true
    trailPoints.visible = true
  }

  // Call this after shatter — starts the logo trail system
  function activate(scrollProgress: () => number) {
    active = true
    fadeIn()

    const offTick = onTick((dt) => {
      const t = scrollProgress()
      opacity = Math.min(opacity + dt * 1.5, 1)
      spriteMat.opacity = opacity * 0.95
      glowMat.opacity = opacity * 0.45

      // Logo gem: stays in front of camera, drifts sideways with scroll
      camera.getWorldDirection(camDir)
      camera.getWorldDirection(camRight)
      camRight.cross(camera.up).normalize()

      gemTarget
        .copy(camera.position)
        .addScaledVector(camDir, 1.8)
        .addScaledVector(camRight, Math.sin(t * Math.PI * 2.5) * 0.45)

      const up = new THREE.Vector3(0, 1, 0)
      gemTarget.addScaledVector(up, Math.cos(t * Math.PI * 1.8) * 0.25)

      gemPos.lerp(gemTarget, dt * 2.5)
      sprite.position.copy(gemPos)
      glow.position.copy(gemPos)
      glow.scale.setScalar(1.3 + Math.sin(t * 10) * 0.1)

      // Emit trail point every 2 frames
      frameCount++
      if (frameCount % 2 === 0) {
        // Shift trail backward (prepend current pos)
        trailPositions.copyWithin(3, 0)
        trailPositions[0] = gemPos.x
        trailPositions[1] = gemPos.y
        trailPositions[2] = gemPos.z
        trailCount = Math.min(trailCount + 1, TRAIL_LENGTH)
        trailGeo.attributes.position.needsUpdate = true
        trailGeo.setDrawRange(0, trailCount)
        // Fade trail: back of trail is more transparent
        trailMat.opacity = 0.7 * opacity
      }
    })

    return offTick
  }

  return {
    activate,
    dispose: () => {
      scene.remove(sprite)
      scene.remove(glow)
      scene.remove(trailPoints)
      trailGeo.dispose()
      trailMat.dispose()
      glowMat.dispose()
    },
  }
}
