import * as THREE from 'three'
import type { Core } from './core'

// Bezier camera path — same scroll→time principle as the Blender baked version
// but defined procedurally (no GLB needed)
const PATH_POINTS = [
  new THREE.Vector3(0, 0.5, 5),       // start: straight ahead
  new THREE.Vector3(1.5, 0.8, 4.5),   // drift right
  new THREE.Vector3(0.5, -0.2, 4),    // come closer
  new THREE.Vector3(-1, 0.3, 4.2),    // drift left
  new THREE.Vector3(0, 0.2, 3.8),     // final: close, centered
]

const LOOK_POINTS = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0.1, 0.1, 0),
  new THREE.Vector3(0, -0.1, 0),
  new THREE.Vector3(-0.1, 0.05, 0),
  new THREE.Vector3(0, 0, 0),
]

export function setupScrollCamera({ camera, onTick }: Core) {
  const camCurve = new THREE.CatmullRomCurve3(PATH_POINTS, false, 'catmullrom', 0.5)
  const lookCurve = new THREE.CatmullRomCurve3(LOOK_POINTS, false, 'catmullrom', 0.5)

  // Mouse parallax (small offset on top of the scroll path)
  const mouse = { x: 0, y: 0 }
  const target = { x: 0, y: 0 }

  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / innerWidth - 0.5) * 2
    mouse.y = -(e.clientY / innerHeight - 0.5) * 2
  })

  let progress = 0 // 0→1, driven by scroll

  const scrollEl = document.documentElement
  function updateProgress() {
    const max = scrollEl.scrollHeight - innerHeight
    progress = max > 0 ? Math.min(scrollEl.scrollTop / max * 1.8, 1) : 0
  }
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()

  const camPos = new THREE.Vector3()
  const lookAt = new THREE.Vector3()

  const offTick = onTick((dt) => {
    // Smooth mouse lag
    target.x += (mouse.x - target.x) * dt * 2
    target.y += (mouse.y - target.y) * dt * 2

    camCurve.getPoint(progress, camPos)
    lookCurve.getPoint(progress, lookAt)

    // Add subtle mouse parallax
    camPos.x += target.x * 0.12
    camPos.y += target.y * 0.08

    camera.position.lerp(camPos, dt * 3)
    camera.lookAt(lookAt)
  })

  return {
    getProgress: () => progress,
    dispose: () => {
      offTick()
      window.removeEventListener('scroll', updateProgress)
    },
  }
}
