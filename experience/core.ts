import * as THREE from 'three'

export interface Core {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  onTick: (fn: (dt: number) => void) => () => void
  dispose: () => void
  isMobile: boolean
}

export function createCore(canvas: HTMLCanvasElement): Core {
  const isMobile = matchMedia('(max-width: 768px)').matches

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.3

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, 1, 0.01, 100)
  camera.position.set(0, 0, 5)

  const clock = new THREE.Clock()
  const updaters = new Set<(dt: number) => void>()

  const onTick = (fn: (dt: number) => void) => {
    updaters.add(fn)
    return () => updaters.delete(fn)
  }

  let running = true
  function loop() {
    if (!running) return
    const dt = Math.min(clock.getDelta(), 1 / 30)
    updaters.forEach((fn) => fn(dt))
    renderer.render(scene, camera)
    requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden
    if (running) { clock.getDelta(); loop() }
  })

  const ro = new ResizeObserver(() => {
    const w = canvas.clientWidth || innerWidth
    const h = canvas.clientHeight || innerHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h, false)
  })
  ro.observe(canvas)
  const w0 = canvas.clientWidth || innerWidth
  const h0 = canvas.clientHeight || innerHeight
  camera.aspect = w0 / h0
  camera.updateProjectionMatrix()
  renderer.setSize(w0, h0, false)

  return {
    renderer,
    scene,
    camera,
    onTick,
    isMobile,
    dispose: () => {
      running = false
      ro.disconnect()
      renderer.dispose()
    },
  }
}
