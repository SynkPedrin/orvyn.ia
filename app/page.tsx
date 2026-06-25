import { Navbar } from '@/components/navbar'
import { BackgroundAnimation } from '@/components/background-animation'
import { HorizontalExperience } from '@/components/horizontal-experience'

export default function HomePage() {
  return (
    <>
      <BackgroundAnimation />
      <Navbar />
      <HorizontalExperience />
    </>
  )
}
