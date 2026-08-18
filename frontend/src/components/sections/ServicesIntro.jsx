import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import mark from '../../assets/alins-mark.png'

/**
 * The opening beat of /services — a plain, in-flow hero (not pinned, not
 * scroll-scrubbed). Plays once on mount with a calm, editorial reveal.
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
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative flex min-h-[85vh] items-center overflow-hidden py-24 lg:min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 38%, rgba(139,92,246,0.09), transparent 65%)',
        }}
      />

      <img
        data-anim="mark"
        src={mark}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[46vh] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
      />

      <div className="container-x relative text-center">
        <span
          data-anim="eyebrow"
          className="eyebrow mx-auto"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
          What We Do
        </span>

        <h1
          data-anim="heading"
          className="mx-auto mt-7 text-[3.25rem] font-bold uppercase leading-[0.95] text-white sm:text-7xl lg:text-8xl"
        >
          Services
        </h1>

        <div data-anim="lede" className="mx-auto mt-8 max-w-xl">
          <p className="text-lg font-medium text-primary-300 sm:text-xl">
            Everything your brand needs to grow online.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
            Web design, development, apps, marketing and graphic design — full-stack digital
            services under one roof.
          </p>
        </div>
      </div>
    </section>
  )
}
