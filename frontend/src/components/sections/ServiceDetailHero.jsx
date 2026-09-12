import { useEffect, useRef, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import { services } from '../../data/services'
import { usePrefersReducedMotion } from '../../lib/motion'
import ServiceMotif from './ServiceMotif'
import ServiceVisual from './ServiceVisual'

const PageOrb = lazy(() => import('../three/PageOrb'))

/**
 * The opening beat of every /services/:id page — eyebrow → h1 → tagline →
 * description → PageOrb, built specifically for a single service: it also
 * carries the index/total, feature pills and a reused ServiceVisual
 * mockup, and every accent color comes from that service's own
 * `accent`/`glowFrom`/`glowTo` rather than a hand-picked prop, so each of
 * the six pages reads as its own without six separate hero components to
 * maintain. No breadcrumb here — the URL and the navbar's own active state
 * already say where you are, so a repeated "Home / Services / X" row would
 * just be noise above the headline.
 */
export default function ServiceDetailHero({ service, index, tagline, heroNote }) {
  const rootRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const Icon = service.icon

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (prefersReduced) return
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="eyebrow"]', { opacity: 0, y: 14, duration: 0.7 }, 0)
        .from('[data-anim="heading"]', { opacity: 0, y: 28, duration: 1 }, 0.1)
        .from('[data-anim="tagline"]', { opacity: 0, y: 18, duration: 0.8 }, 0.24)
        .from('[data-anim="desc"]', { opacity: 0, y: 16, duration: 0.8 }, 0.3)
        .from('[data-anim="pill"]', { opacity: 0, y: 12, duration: 0.6, stagger: 0.05 }, 0.38)
        .from('[data-anim="cta"]', { opacity: 0, y: 14, duration: 0.7 }, 0.48)
        .from('[data-anim="visual"]', { opacity: 0, x: 50, scale: 0.94, duration: 1.1 }, 0.15)
    }, rootRef)
    return () => ctx.revert()
  }, [service.id])

  return (
    <section ref={rootRef} className="relative overflow-hidden pb-16 pt-40 md:pb-24 md:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 15% 20%, ${service.glowFrom}1c, transparent 60%), radial-gradient(ellipse 50% 45% at 90% 80%, ${service.glowTo}16, transparent 60%)`,
        }}
      />

      {/* Oversized watermark motif behind the whole hero — the same line-art
          used in the compact ServiceVisual mockups, blown up huge and faint
          so this page reads as unmistakably "this one service" even before
          you've read a word. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[8%] top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 opacity-[0.05]"
      >
        <ServiceMotif type={service.motif} color={service.accent} />
      </div>

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-10 xl:gap-16">
          <div>
            <span data-anim="eyebrow" className="eyebrow">
              <Icon size={13} style={{ color: service.accent }} />
              {String(index + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')} — {heroNote || 'What We Offer'}
            </span>

            <h1 data-anim="heading" className="text-h1 mt-6 uppercase leading-[0.98] text-ink">
              {service.title}
            </h1>

            <p
              data-anim="tagline"
              className="text-fluid-xl mt-6 max-w-lg font-medium"
              style={{ color: service.accent }}
            >
              {tagline || service.short}
            </p>

            <p data-anim="desc" className="text-fluid-sm mt-5 max-w-lg leading-relaxed text-ink-muted">
              {service.description}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {service.features.map((f) => (
                <li
                  key={f}
                  data-anim="pill"
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-ink-muted"
                >
                  {f}
                </li>
              ))}
            </ul>

            <div data-anim="cta" className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/contact" className="btn-primary">
                Start a Project <ArrowUpRight size={16} />
              </Link>
              <Link to="/portfolio" className="btn-outline">
                See Our Work
              </Link>
            </div>
          </div>

          <div data-anim="visual" className="relative">
            {!reduced && (
              <div
                aria-hidden
                className="pointer-events-none absolute -right-[10%] -top-[14%] -z-10 h-[22rem] w-[22rem] opacity-40"
              >
                <Suspense fallback={null}>
                  <PageOrb color={service.accent} ringColor={service.glowTo} distort={0.5} />
                </Suspense>
              </div>
            )}
            <ServiceVisual service={service} />
          </div>
        </div>
      </div>
    </section>
  )
}
