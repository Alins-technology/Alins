import { useRef } from 'react'
import { services } from '../../data/services'
import ServicesIntro from './ServicesIntro'
import ServiceSection from './ServiceSection'
import ServicesProgressNav from './ServicesProgressNav'
import CTA from './CTA'

/**
 * The Services page, rebuilt as a real, natively-scrolling document —
 * every service is its own full-screen <section>, not a frame in a pinned
 * / scrubbed stage. Each section animates in once via ScrollTrigger's
 * viewport-enter callbacks (see ServiceSection); nothing here holds the
 * scrollbar, listens for wheel events, or drives content off scroll
 * progress. Native scrolling is completely untouched.
 */
export default function ServicesJourney() {
  const sectionEls = useRef([])

  return (
    <div className="relative">
      <ServicesIntro />

      {services.map((service, i) => (
        <ServiceSection
          key={service.id}
          service={service}
          index={i}
          total={services.length}
          reverse={i % 2 === 1}
          isLast={i === services.length - 1}
          registerRef={(el) => (sectionEls.current[i] = el)}
        />
      ))}

      <ServicesProgressNav sectionEls={sectionEls} total={services.length} />

      <CTA />
    </div>
  )
}
