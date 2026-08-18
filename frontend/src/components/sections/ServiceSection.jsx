import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import ServiceVisual from './ServiceVisual'

/**
 * One real, full-screen service section. No pin, no scrub — the browser
 * scrolls it into view natively and a single GSAP timeline plays once
 * (and reverses on re-entry) via ScrollTrigger's toggleActions. Text
 * slides in from alternating sides; the visual settles in alongside it.
 */
export default function ServiceSection({ service, index, total, reverse, registerRef }) {
  const sectionRef = useRef(null)
  const numRef = useRef(null)
  const titleRef = useRef(null)
  const shortRef = useRef(null)
  const descRef = useRef(null)
  const featuresRef = useRef(null)
  const ctaRef = useRef(null)
  const visualRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Text enters from the side the visual is NOT on — alternates per section.
    const textFrom = reverse ? 80 : -80
    const visualFrom = reverse ? -60 : 60
    const featureItems = featuresRef.current ? Array.from(featuresRef.current.children) : []

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none reverse none',
        },
      })

      if (prefersReduced) {
        tl.from(
          [numRef.current, titleRef.current, shortRef.current, descRef.current, ...featureItems, ctaRef.current, visualRef.current],
          { opacity: 0, duration: 0.6, stagger: 0.04 },
        )
      } else {
        tl.from(numRef.current, { opacity: 0, x: textFrom * 0.5, duration: 0.8 }, 0)
          .from(titleRef.current, { opacity: 0, x: textFrom, duration: 1.05 }, 0.08)
          .from(shortRef.current, { opacity: 0, x: textFrom * 0.6, duration: 0.9 }, 0.16)
          .from(descRef.current, { opacity: 0, x: textFrom * 0.5, duration: 0.9 }, 0.18)
          .from(featureItems, { opacity: 0, x: textFrom * 0.35, duration: 0.7, stagger: 0.05 }, 0.28)
          .from(ctaRef.current, { opacity: 0, x: textFrom * 0.35, duration: 0.7 }, 0.4)
          .from(visualRef.current, { opacity: 0, x: visualFrom, scale: 0.94, duration: 1.15 }, 0.05)
      }
    }, section)

    return () => ctx.revert()
  }, [reverse])

  const Icon = service.icon

  return (
    <section
      ref={(el) => {
        sectionRef.current = el
        registerRef?.(el)
      }}
      className="relative flex min-h-[92vh] items-center overflow-hidden py-20 lg:min-h-screen"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse 70% 55% at ${reverse ? '20%' : '80%'} 50%, ${service.glowFrom}14, transparent 60%), radial-gradient(ellipse 60% 45% at ${reverse ? '75%' : '25%'} 60%, ${service.glowTo}10, transparent 60%)`,
        }}
      />

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {reverse && (
            <div ref={visualRef} className="lg:order-1">
              <ServiceVisual service={service} />
            </div>
          )}

          <div className={`max-w-xl ${reverse ? 'lg:order-2' : ''}`}>
            <span
              ref={numRef}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-ink-faint"
            >
              <Icon size={13} className="text-primary-300" />
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            <h2
              ref={titleRef}
              className="mt-5 text-4xl font-bold uppercase leading-[1.03] text-white sm:text-5xl lg:text-6xl"
            >
              {service.title}
            </h2>

            <p ref={shortRef} className="mt-5 text-base font-medium text-primary-300 sm:text-lg">
              {service.short}
            </p>

            <p ref={descRef} className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
              {service.description}
            </p>

            <ul ref={featuresRef} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs uppercase tracking-wide text-ink sm:text-sm">
              {service.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary-300" />
                  {f}
                </li>
              ))}
            </ul>

            <div ref={ctaRef}>
              <Link
                to="/contact"
                className="group mt-9 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-300 transition-colors hover:text-accent"
              >
                Learn More
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {!reverse && (
            <div ref={visualRef}>
              <ServiceVisual service={service} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
