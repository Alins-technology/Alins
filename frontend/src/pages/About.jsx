import PageTransition from '../components/common/PageTransition'
import PageHeader from '../components/sections/PageHeader'
import AboutPreview from '../components/sections/AboutPreview'
import StoryMorph from '../components/sections/StoryMorph'
import Values from '../components/sections/Values'
import Difference from '../components/sections/Difference'
import Process from '../components/sections/Process'
import Team from '../components/sections/Team'
import CTA from '../components/sections/CTA'

export default function About() {
  return (
    <PageTransition>
      <PageHeader
        crumb="About"
        eyebrow="About Alins Technologies"
        title="The team behind your"
        highlight="next launch."
        description="Strategists, designers and engineers working as one team — not three vendors you have to keep in sync yourself."
        orbColor="#8b5cf6"
        orbRingColor="#22d3ee"
      />
      <AboutPreview />
      <StoryMorph />
      <Values />
      <Difference />
      <Process />
      <Team />
      <CTA />
    </PageTransition>
  )
}
