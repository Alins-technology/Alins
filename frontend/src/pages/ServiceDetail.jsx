import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import PageTransition from '../components/common/PageTransition'
import ServiceDetailHero from '../components/sections/ServiceDetailHero'
import ServiceFeatureGrid from '../components/sections/ServiceFeatureGrid'
import ServiceProcess from '../components/sections/ServiceProcess'
import ServiceTools from '../components/sections/ServiceTools'
import ServiceFAQ from '../components/sections/ServiceFAQ'
import RelatedServices from '../components/sections/RelatedServices'
import CTA from '../components/sections/CTA'
import { services } from '../data/services'
import { serviceDetails } from '../data/serviceDetails'

/**
 * One dynamic route (`/services/:serviceId`) rendering all six service
 * pages — rather than six near-duplicate page files — so every page shares
 * one battle-tested layout and any future fix/tweak applies everywhere at
 * once. Each page still reads as fully its own: the hero visual, motif,
 * accent/glow colors, copy, process, tools and FAQs all come from that
 * service's own data (`services.js` + `serviceDetails.js`), nothing is
 * shared verbatim between two services.
 */
export default function ServiceDetail() {
  const { serviceId } = useParams()
  const index = services.findIndex((s) => s.id === serviceId)
  const service = services[index]
  const details = serviceDetails[serviceId]

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | Alins Technologies`
    }
    return () => {
      document.title = 'Alins Technologies | Design. Develop. Dominate.'
    }
  }, [service])

  if (!service || !details) {
    return <Navigate to="/services" replace />
  }

  return (
    <PageTransition>
      <ServiceDetailHero
        service={service}
        index={index}
        tagline={details.tagline}
        heroNote={details.heroNote}
      />
      <ServiceFeatureGrid service={service} featureCards={details.featureCards} />
      <ServiceProcess service={service} process={details.process} />
      <ServiceTools service={service} tools={details.tools} />
      <ServiceFAQ service={service} faqs={details.faqs} />
      <RelatedServices relatedIds={details.relatedIds} />
      <CTA
        eyebrow="Let's Build Together"
        title={`Ready to start your ${service.title.toLowerCase()} project?`}
        highlight="Let's talk."
        description="Share your goals and timeline and we'll respond within 24 hours with a free strategy consultation."
        cta="Get a Free Quote"
      />
    </PageTransition>
  )
}
