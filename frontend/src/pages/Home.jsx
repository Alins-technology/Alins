import PageTransition from '../components/common/PageTransition'
import Hero from '../components/sections/Hero'
import Marquee from '../components/sections/Marquee'
import AgencyIntro from '../components/sections/AgencyIntro'
import Stats from '../components/sections/Stats'
import AboutPreview from '../components/sections/AboutPreview'
import ServicesPreview from '../components/sections/ServicesPreview'
import Process from '../components/sections/Process'
import PortfolioPreview from '../components/sections/PortfolioPreview'
import Testimonials from '../components/sections/Testimonials'
import CTA from '../components/sections/CTA'

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Marquee />
      <AgencyIntro />
      <Stats />
      <AboutPreview />
      <ServicesPreview />
      <Process />
      <PortfolioPreview />
      <Testimonials />
      <CTA
        eyebrow="Ready When You Are"
        title="Bring us the brief."
        highlight="We'll bring the build."
        cta="Start a Project"
      />
    </PageTransition>
  )
}
