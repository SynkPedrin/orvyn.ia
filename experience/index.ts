// Orchestrator — lazy-loaded, never runs on the server
import { createCore } from './core'
import { createCrystal } from './crystal'
import { createParticles } from './particles'
import { createShatter } from './shatter'
import { setupScrollCamera } from './scroll-camera'

export interface ExperienceHandle {
  triggerShatter: () => void
  dispose: () => void
}

export async function mountExperience(
  canvas: HTMLCanvasElement
): Promise<ExperienceHandle> {
  const core = createCore(canvas)
  const crystal = createCrystal(core)
  const particles = createParticles(core)
  const shatter = createShatter(core)
  const scrollCam = setupScrollCamera(core)

  let shattered = false

  function triggerShatter() {
    if (shattered) return
    shattered = true
    crystal.hide()
    shatter.explode()
  }

  function dispose() {
    crystal.dispose()
    particles.dispose()
    shatter.dispose()
    scrollCam.dispose()
    core.dispose()
  }

  return { triggerShatter, dispose }
}
