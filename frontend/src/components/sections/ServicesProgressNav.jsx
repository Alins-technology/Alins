import { useEffect, useState } from 'react'

/**
 * Minimal fixed vertical index on the right edge — 01..N, active one glows.
 * Driven by a single IntersectionObserver (not scroll position math, not
 * per-frame state), so it costs nothing while scrolling and never touches
 * native scroll behavior.
 */
export default function ServicesProgressNav({ sectionEls, total }) {
  const [active, setActive] = useState(0)

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

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex xl:right-10"
    >
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <span
            className="text-[10px] font-semibold tabular-nums tracking-[0.2em] transition-colors duration-300"
            style={{ color: active === i ? '#eceafc' : '#59547f' }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <span
            className="h-px transition-all duration-300"
            style={{
              width: active === i ? '22px' : '10px',
              background: active === i ? '#8aa6ff' : '#3a3560',
              boxShadow: active === i ? '0 0 8px 1px rgba(138,166,255,0.6)' : 'none',
            }}
          />
        </div>
      ))}
    </div>
  )
}
