import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { services } from '../../data/services'
import mark from '../../assets/alins-mark.png'

/**
 * The opening beat of /services — a plain, in-flow hero (not pinned, not
 * scroll-scrubbed). Plays once on mount with a calm, editorial reveal.
 *
 * Split-diagonal composition: the headline commands the left ~60%, an
 * asymmetric stat/index panel — built from the real services list, not
 * hardcoded — anchors the right ~40%. Nothing here is centered.
 */
export default function ServicesIntro() {
  const rootRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (prefersReduced) return
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="eyebrow"]', { opacity: 0, y: 14, duration: 0.7 }, 0)
        .from('[data-anim="heading"]', { opacity: 0, y: 26, duration: 1 }, 0.08)
        .from('[data-anim="lede"]', { opacity: 0, y: 18, duration: 0.9 }, 0.22)
        .from('[data-anim="mark"]', { opacity: 0, scale: 0.92, duration: 1.2 }, 0)
        .from('[data-anim="panel"]', { opacity: 0, x: 36, duration: 1, ease: 'power3.out' }, 0.2)
        .from('[data-anim="panel-row"]', { opacity: 0, x: 16, duration: 0.6, stagger: 0.06 }, 0.4)
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative flex min-h-[70vh] items-center overflow-hidden py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 20% 40%, rgba(139,92,246,0.14), transparent 65%), radial-gradient(ellipse 40% 40% at 85% 70%, rgba(8,145,168,0.10), transparent 60%)',
        }}
      />

      <img
        data-anim="mark"
        src={mark}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-[6%] top-1/2 h-[60vh] w-auto -translate-y-1/2 opacity-[0.04]"
      />

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-10 xl:gap-16">
          {/* Left — the statement, left-aligned not centered */}
          <div>
            <span data-anim="eyebrow" className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
              How We Help
            </span>

            <h1
              data-anim="heading"
              className="gradient-text mt-7 text-4xl font-bold uppercase leading-[0.95] sm:text-5xl lg:text-6xl"
            >
              Services
            </h1>

            <div data-anim="lede" className="mt-8 max-w-lg">
              <p className="text-lg font-medium text-primary-600 sm:text-xl">
                Six disciplines. One team that actually talks to itself.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                Design, development, apps, marketing and SEO — each one built to hold up on its
                own, and built better because the same team runs all of them.
              </p>
            </div>
          </div>

          {/* Right — asymmetric stat/index panel, not a mirrored column */}
          <div
            data-anim="panel"
            className="relative ml-auto w-full max-w-sm rounded-3xl px-7 py-8 shadow-card lg:mr-0"
            style={{
              background: 'linear-gradient(150deg, rgba(139,92,246,0.10), rgba(8,145,168,0.08))',
              border: '1px solid rgba(139,92,246,0.18)',
            }}
          >
            <p className="gradient-text font-display text-5xl font-bold leading-none">
              {String(services.length).padStart(2, '0')}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-ink-faint">
              Disciplines, one team
            </p>

            <div className="mt-6 space-y-3 border-t border-bg-border pt-6">
              {services.map((service, i) => (
                <div
                  key={service.id}
                  data-anim="panel-row"
                  className="flex items-center gap-3 text-sm text-ink-muted"
                >
                  <span className="text-[10px] font-semibold tabular-nums text-ink-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    aria-hidden
                    className="h-1 w-1 rounded-full"
                    style={{ background: service.accent }}
                  />
                  <span className="font-medium text-ink">{service.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
