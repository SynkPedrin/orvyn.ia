import { Navbar } from '@/components/navbar'
import { ThreeScene } from '@/components/three-scene'
import { HorizontalExperience } from '@/components/horizontal-experience'

export default function HomePage() {
  return (
    <>
      {/* Three.js liquid metal scene — fixed background */}
      <ThreeScene />
      <Navbar />
      <HorizontalExperience />
    </>
  )
}
