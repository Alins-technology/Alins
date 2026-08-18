import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const lines = ['Design.', 'Engineering.', 'Growth.']

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

  return (
    <section ref={sectionRef} className="section-pad relative overflow-hidden !py-20 md:!py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full lg:block"
        style={{ background: 'radial-gradient(circle, rgba(0,233,247,0.07) 0%, rgba(0,233,247,0) 70%)' }}
      />

      <div className="container-x flex items-center justify-between gap-12">
        <div className="max-w-3xl">
          {lines.map((line, i) => (
            <h2
              key={line}
              ref={(el) => (lineRefs.current[i] = el)}
              className="text-5xl font-bold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              {line}
            </h2>
          ))}
          <p ref={subRef} className="mt-8 max-w-md text-sm uppercase tracking-[0.25em] text-ink-faint">
            One digital partner.
          </p>
        </div>

        {/* A quiet orbital echo of the hero's visual system, not a second
            hero — just enough presence to keep this pause from reading as
            an empty gap between sections. */}
        <div aria-hidden className="relative hidden h-40 w-40 shrink-0 lg:block xl:h-48 xl:w-48">
          <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
            <circle cx="100" cy="100" r="88" stroke="#00e9f7" strokeOpacity="0.16" />
            <circle cx="100" cy="100" r="60" stroke="#3b6dfb" strokeOpacity="0.18" />
            <circle
              cx="100"
              cy="100"
              r="88"
              stroke="#00e9f7"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              strokeDasharray="3 9"
              strokeLinecap="round"
              transform="rotate(20 100 100)"
            />
            <circle cx="100" cy="12" r="2.5" fill="#00e9f7" fillOpacity="0.8" />
          </svg>
        </div>
      </div>
    </section>
  )
}
