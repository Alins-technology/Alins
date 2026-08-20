import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { Sparkle, ScribbleCircle } from '../common/Doodles'

const lines = ['Design.', 'Build.', 'Grow.']
const lineColors = ['text-primary-600', 'text-nebula', 'text-accent-deep']

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
        style={{ background: 'radial-gradient(circle, rgba(8,145,168,0.12) 0%, rgba(8,145,168,0) 70%)' }}
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
              className={`${indents[i]} ${lineColors[i]} text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl`}
            >
              {line}
            </h2>
          ))}
        </div>

        {/* Right column: a colorful doodle cluster behind a card carrying
            the supporting line — asymmetric weight, not a mirrored hero. */}
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute -right-4 -top-8 hidden gap-3 lg:flex">
            <ScribbleCircle className="h-12 w-12 text-primary-400/70" />
            <Sparkle className="h-6 w-6 self-end text-accent-deep animate-pulse-glow" />
          </div>

          <div
            className="relative overflow-hidden rounded-3xl p-8 shadow-card lg:p-10"
            style={{
              background: 'linear-gradient(150deg, rgba(59,109,251,0.10), rgba(139,92,246,0.10) 60%, rgba(8,145,168,0.09))',
              border: '1px solid rgba(139,92,246,0.18)',
            }}
          >
            <div className="relative">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
              <p
                ref={subRef}
                className="mt-4 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl"
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
