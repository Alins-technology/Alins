import PageTransition from '../components/common/PageTransition'
import PageHeader from '../components/sections/PageHeader'
import AboutPreview from '../components/sections/AboutPreview'
import StoryMorph from '../components/sections/StoryMorph'
import Stats from '../components/sections/Stats'
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
        title="The agency behind your"
        highlight="next big move."
        description="We're a passionate team of strategists, designers and engineers dedicated to helping ambitious brands build, launch and grow."
      />
      <AboutPreview />
      <StoryMorph />
      <Stats />
      <Values />
      <Difference />
      <Process />
      <Team />
      <CTA />
    </PageTransition>
  )
}
