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
export default function ServiceSection({ service, index, total, reverse, isLast, registerRef }) {
  const sectionRef = useRef(null)
  const bigNumRef = useRef(null)
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
          [bigNumRef.current, numRef.current, titleRef.current, shortRef.current, descRef.current, ...featureItems, ctaRef.current, visualRef.current],
          { opacity: 0, duration: 0.6, stagger: 0.04 },
        )
      } else {
        tl.from(bigNumRef.current, { opacity: 0, scale: 1.12, duration: 1.3, ease: 'power2.out' }, 0)
          .from(numRef.current, { opacity: 0, x: textFrom * 0.5, duration: 0.8 }, 0.05)
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
      className={`relative overflow-hidden py-24 md:py-32 lg:min-h-screen lg:flex lg:items-center lg:py-0 ${
        isLast ? '' : 'border-b border-bg-border/70'
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse 70% 55% at ${reverse ? '20%' : '80%'} 50%, ${service.glowFrom}14, transparent 60%), radial-gradient(ellipse 60% 45% at ${reverse ? '75%' : '25%'} 60%, ${service.glowTo}10, transparent 60%)`,
        }}
      />

      {/* Oversized index numeral — a graphic element in its own right, not
          just a label. Anchored to whichever edge the VISUAL mockup sits on
          (the opposite side from the text column), so it never bleeds
          through the readable heading — it used to sit on the same edge as
          the text and the two would collide on the "reverse" sections. */}
      <span
        ref={bigNumRef}
        aria-hidden
        className={`pointer-events-none absolute top-6 select-none font-display text-[6rem] font-bold leading-none sm:text-[8.5rem] lg:top-10 lg:text-[10rem] ${
          reverse ? 'left-1 sm:left-4 lg:left-8' : 'right-1 sm:right-4 lg:right-8'
        }`}
        style={{ color: `${service.accent}14` }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="container-x relative w-full">
        <div
          className={`grid items-center gap-16 lg:gap-20 xl:gap-28 ${
            reverse ? 'lg:grid-cols-[1.05fr_0.95fr]' : 'lg:grid-cols-[0.95fr_1.05fr]'
          }`}
        >
          {reverse && (
            <div ref={visualRef} className="lg:order-1 lg:-ml-4 xl:-ml-10">
              <ServiceVisual service={service} />
            </div>
          )}

          <div className={`relative max-w-xl ${reverse ? 'lg:order-2 lg:justify-self-end' : ''}`}>
            <span
              ref={numRef}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-ink-faint"
            >
              <Icon size={13} className="text-primary-400" />
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            <h2
              ref={titleRef}
              className="text-h1 mt-5 uppercase leading-[1.05] text-ink"
            >
              <Link
                to={`/services/${service.id}`}
                className="transition-colors duration-300 hover:text-accent-300"
              >
                {service.title}
              </Link>
            </h2>

            <p ref={shortRef} className="text-fluid-lg mt-5 font-medium text-accent-300">
              {service.short}
            </p>

            <p ref={descRef} className="text-fluid-sm mt-4 leading-relaxed text-ink-muted">
              {service.description}
            </p>

            <ul ref={featuresRef} className="text-fluid-xs mt-7 flex flex-wrap items-center gap-x-6 gap-y-2.5 uppercase tracking-wide text-ink">
              {service.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent-400" />
                  {f}
                </li>
              ))}
            </ul>

            <div ref={ctaRef} className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                to={`/services/${service.id}`}
                className="group mt-9 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-accent-300"
              >
                View full details
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/contact"
                className="group mt-9 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-400 transition-colors hover:text-accent-300"
              >
                Talk to the team
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {!reverse && (
            <div ref={visualRef} className="lg:-mr-4 xl:-mr-10">
              <ServiceVisual service={service} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
