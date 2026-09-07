import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const lines = ['Design.', 'Build.', 'Grow.']
// Cyan → blue → violet — same direction as the site's gradient-text instead
// of three disconnected hues, so the sequence still feels like one brand.
const lineColors = ['text-accent-400', 'text-primary-400', 'text-nebula']

export default function AgencyIntro() {
  const sectionRef = useRef(null)
  const lineRefs = useRef([])
  const subRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(lineRefs.current, { opacity: 0, y: 36 })
      gsap.set(subRef.current, { opacity: 0, y: 16 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })
      tl.to(lineRefs.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 })
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.25')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Progressive indent per line — turns the plain vertical stack into a
  // diagonal staircase reading down-and-right, echoing the section's
  // asymmetric split rather than sitting centered.
  const indents = ['ml-0', 'ml-6 sm:ml-10 lg:ml-14', 'ml-12 sm:ml-20 lg:ml-28']

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full lg:block"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, rgba(34,211,238,0) 70%)' }}
      />
      {/* A faint diagonal seam marking the 60/40 split — reinforced, not
          literal: a soft rotated gradient rather than a hard rule. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[62%] hidden w-px lg:block">
        <div className="h-full w-px rotate-[6deg] bg-gradient-to-b from-transparent via-bg-border to-transparent" />
      </div>

      <div className="container-x relative grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
        <div>
          {lines.map((line, i) => (
            <h2
              key={line}
              ref={(el) => (lineRefs.current[i] = el)}
              className={`${indents[i]} ${lineColors[i]} text-h1 uppercase leading-[1.05]`}
            >
              {line}
            </h2>
          ))}
        </div>

        {/* Right column: a liquid-glass card carrying the supporting line —
            asymmetric weight, not a mirrored hero. */}
        <div className="relative">
          <div
            className="liquid-glass relative p-8 lg:p-10"
            style={{
              background: 'linear-gradient(150deg, rgba(59,109,251,0.12), rgba(139,92,246,0.12) 60%, rgba(34,211,238,0.09)), rgba(255,255,255,0.03)',
            }}
          >
            <div className="relative">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
              <p
                ref={subRef}
                className="text-h3 mt-4 leading-snug text-ink"
              >
                One team, start to finish.
              </p>
              <div className="mt-6 h-px w-12 bg-gradient-to-r from-primary-500 to-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
