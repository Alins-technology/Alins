import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

/**
 * Minimal fixed vertical index on the right edge — 01..N beside a hairline
 * rail. The active number is set by a single IntersectionObserver (not
 * scroll position math, not per-frame state), so it costs nothing while
 * scrolling and never touches native scroll behavior. The rail itself gets
 * a second, independent treatment: a gradient fill scrubbed to overall
 * scroll progress through the services list via GSAP + ScrollTrigger.
 */
export default function ServicesProgressNav({ sectionEls, total }) {
  const [active, setActive] = useState(0)
  const fillRef = useRef(null)

  useEffect(() => {
    const els = sectionEls.current.filter(Boolean)
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = els.indexOf(entry.target)
            if (idx !== -1) setActive(idx)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionEls])

  useEffect(() => {
    const els = sectionEls.current.filter(Boolean)
    if (els.length === 0 || !fillRef.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const first = els[0]
    const last = els[els.length - 1]

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: first,
            start: 'top center',
            endTrigger: last,
            end: 'bottom center',
            scrub: true,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [sectionEls])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-6 top-1/2 z-20 hidden -translate-y-1/2 items-stretch gap-4 lg:flex xl:right-10"
    >
      <div className="relative w-px self-stretch rounded-full bg-bg-border">
        <div
          ref={fillRef}
          className="absolute left-0 top-0 h-full w-px origin-top rounded-full"
          style={{ background: 'linear-gradient(180deg, #3b6dfb, #8b5cf6, #ff7a30)' }}
        />
      </div>

      <div className="flex flex-col items-end gap-3">
        {Array.from({ length: total }, (_, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span
              className={`text-[10px] font-semibold tabular-nums tracking-[0.2em] transition-colors duration-300 ${
                active === i ? 'text-ink' : 'text-ink-faint'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className={`h-px rounded-full transition-all duration-300 ${
                active === i
                  ? 'bg-gradient-to-r from-primary-500 to-nebula shadow-[0_0_8px_1px_rgba(59,109,251,0.35)]'
                  : 'bg-bg-border'
              }`}
              style={{ width: active === i ? '22px' : '10px' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
