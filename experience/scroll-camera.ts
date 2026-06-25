import * as THREE from 'three'
import type { Core } from './core'

// Noomo-style path: camera dives toward scene, orbits, comes close
const CAM_PATH = [
  new THREE.Vector3(0,   1.2,  6.5),   // intro: far, slightly above
  new THREE.Vector3(2.2, 0.8,  5.5),   // drift right
  new THREE.Vector3(1.0, -0.4, 4.2),   // dive in + dip below
  new THREE.Vector3(-2.0, 0.6, 4.8),   // sweep left
  new THREE.Vector3(-0.5, 0.2, 3.5),   // close
  new THREE.Vector3(0.3, -0.3, 3.0),   // final: very close, slight angle
]

const LOOK_PATH = [
  new THREE.Vector3(0,    0,    0),
  new THREE.Vector3(0.15, 0.1,  0),
  new THREE.Vector3(0,   -0.15, 0),
  new THREE.Vector3(-0.1, 0.1,  0),
  new THREE.Vector3(0.05, 0,    0),
  new THREE.Vector3(0,    0,    0),
]

export function setupScrollCamera({ camera, onTick }: Core) {
  const camCurve  = new THREE.CatmullRomCurve3(CAM_PATH,  false, 'catmullrom', 0.5)
  const lookCurve = new THREE.CatmullRomCurve3(LOOK_PATH, false, 'catmullrom', 0.5)

  const mouse  = { x: 0, y: 0 }
  const smooth = { x: 0, y: 0 }

  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / innerWidth  - 0.5) * 2
    mouse.y = -(e.clientY / innerHeight - 0.5) * 2
  })

  let progress = 0

  function updateProgress() {
    const max = document.documentElement.scrollHeight - innerHeight
    progress = max > 0 ? Math.min(document.documentElement.scrollTop / max * 1.6, 1) : 0
  }
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()

  const camPos  = new THREE.Vector3()
  const lookPos = new THREE.Vector3()
  const currentLook = new THREE.Vector3()

  const offTick = onTick((dt) => {
    smooth.x += (mouse.x - smooth.x) * Math.min(dt * 1.8, 1)
    smooth.y += (mouse.y - smooth.y) * Math.min(dt * 1.8, 1)

    camCurve.getPoint(progress,  camPos)
    lookCurve.getPoint(progress, lookPos)

    camPos.x += smooth.x * 0.18
    camPos.y += smooth.y * 0.12

    camera.position.lerp(camPos, Math.min(dt * 2.5, 1))
    currentLook.lerp(lookPos, Math.min(dt * 2.5, 1))
    camera.lookAt(currentLook)
  })

  return {
    getProgress: () => progress,
    dispose: () => {
      offTick()
      window.removeEventListener('scroll', updateProgress)
    },
  }
}
