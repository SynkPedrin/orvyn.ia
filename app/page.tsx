import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { FloatingIconMarquee } from '@/components/floating-icon-marquee'
import { TextMarquee } from '@/components/text-marquee'
import { Pillars } from '@/components/pillars'
import { Products } from '@/components/products'
import { HowItWorks } from '@/components/how-it-works'
import { WhyOrvyn } from '@/components/why-orvyn'
import { Testimonials } from '@/components/testimonials'
import { FinalCTA } from '@/components/final-cta'
import { Footer } from '@/components/footer'
import { BackgroundAnimation } from '@/components/background-animation'

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden page-bg">
      <BackgroundAnimation />
      <Navbar />
      <Hero />
      <FloatingIconMarquee />
      <TextMarquee />
      <Pillars />
      <Products />
      <HowItWorks />
      <WhyOrvyn />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}
