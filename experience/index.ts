// Orchestrator — lazy-loaded, never runs on the server
import { createCore } from './core'
import { createGlassSphere } from './glass-sphere'
import { createShatter } from './shatter'
import { createLogoTrail } from './logo-trail'
import { setupScrollCamera } from './scroll-camera'

export interface ExperienceHandle {
  triggerShatter: () => void
  dispose: () => void
}

export async function mountExperience(
  canvas: HTMLCanvasElement
): Promise<ExperienceHandle> {
  const core = createCore(canvas)
  const sphere   = createGlassSphere(core)
  const shatter  = createShatter(core)
  const logoTrail = createLogoTrail(core)
  const scrollCam = setupScrollCamera(core)

  let disposed = false

  function triggerShatter() {
    if (disposed) return
    sphere.hide()
    shatter.explode(() => {
      // After shards settle, logo trail takes over
      const off = logoTrail.activate(scrollCam.getProgress)
      // Cleanup trail disposer when experience disposes
    })
  }

  function dispose() {
    disposed = true
    sphere.dispose()
    shatter.dispose()
    logoTrail.dispose()
    scrollCam.dispose()
    core.dispose()
  }

  return { triggerShatter, dispose }
}
