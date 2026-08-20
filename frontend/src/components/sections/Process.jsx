import { useEffect, useRef } from 'react'
import { process } from '../../data/content'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import SectionHeading from '../common/SectionHeading'
import { PlusCluster } from '../common/Doodles'

export default function Process() {
  const sectionRef = useRef(null)
  const stepRefs = useRef([])
  const listRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        // Reduced motion: skip every ScrollTrigger and just land on the
        // fully "revealed" static state — same end result, no scroll-linked
        // movement.
        stepRefs.current.forEach((el) => {
          if (!el) return
          const line = el.querySelector('[data-anim="line"]')
          const title = el.querySelector('[data-anim="step-title"]')
          const num = el.querySelector('[data-anim="step-num"]')
          gsap.set(line, { scaleX: 1 })
          gsap.set([title, num], { color: '#15162e' })
        })
        gsap.set(progressRef.current, { height: '100%' })
        return
      }

      stepRefs.current.forEach((el) => {
        if (!el) return
        const line = el.querySelector('[data-anim="line"]')
        const title = el.querySelector('[data-anim="step-title"]')
        const num = el.querySelector('[data-anim="step-num"]')

        gsap.set(line, { scaleX: 0 })

        ScrollTrigger.create({
          trigger: el,
          start: 'top 65%',
          end: 'bottom 45%',
          onEnter: () => {
            gsap.to(line, { scaleX: 1, duration: 0.6, ease: 'power2.out' })
            gsap.to([title, num], { color: '#15162e', duration: 0.4 })
          },
          onLeaveBack: () => {
            gsap.to(line, { scaleX: 0, duration: 0.4, ease: 'power2.in' })
            gsap.to([title, num], { color: '#9294b3', duration: 0.4 })
          },
        })
      })

      // A single scrub-linked progress rail that fills as the visitor
      // scrolls through the four steps — separate from the per-step
      // highlight above, tied directly to scroll position rather than
      // toggled on enter/leave.
      gsap.set(progressRef.current, { height: '0%' })
      gsap.to(progressRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 75%',
          end: 'bottom 55%',
          scrub: 0.6,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-pad relative overflow-hidden">
      <PlusCluster aria-hidden className="pointer-events-none absolute right-6 top-10 hidden h-9 w-9 text-primary-400 animate-pulse-glow lg:block" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="How We Work"
          title="Four steps, no"
          highlight="guesswork."
          description="Same system on every project, so you always know what's happening and why — never a black box, never a surprise invoice."
        />

        <div ref={listRef} className="relative mt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 top-1 hidden w-px bg-bg-border sm:left-10 sm:block"
            style={{ height: 'calc(100% - 0.5rem)' }}
          />
          <div
            ref={progressRef}
            aria-hidden
            className="pointer-events-none absolute left-6 top-1 hidden w-px origin-top bg-gradient-to-b from-primary-500 via-nebula to-accent sm:left-10 sm:block"
          />

          <div className="flex flex-col">
            {process.map((item, i) => (
              <div key={item.step} ref={(el) => (stepRefs.current[i] = el)}>
                <div className="grid grid-cols-[3rem_1fr] items-baseline gap-6 py-8 sm:grid-cols-[5rem_1fr_2fr] sm:gap-10">
                  <span
                    data-anim="step-num"
                    className="font-display text-2xl font-bold text-ink-faint transition-colors duration-300"
                  >
                    {item.step}
                  </span>
                  <h3
                    data-anim="step-title"
                    className="text-2xl font-semibold text-ink-faint transition-colors duration-300 sm:text-3xl"
                  >
                    {item.title}
                  </h3>
                  <p className="col-span-2 mt-2 max-w-md text-sm leading-relaxed text-ink-muted sm:col-span-1 sm:mt-0">
                    {item.description}
                  </p>
                </div>
                <div className="relative h-px w-full bg-bg-border">
                  <span
                    data-anim="line"
                    aria-hidden
                    className="absolute inset-0 origin-left bg-gradient-to-r from-primary-400 to-nebula-soft"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
