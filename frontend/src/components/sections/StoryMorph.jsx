import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const words = ['Idea.', 'Design.', 'Code.', 'Growth.']

// Purely time-based — ~1s hold per word, ~0.55s crossfade into the next.
// Nothing here reads scroll position; the section is a normal flowing
// block and the page scrolls natively while this plays on its own clock.
const HOLD = 0.7
const TRANSITION = 0.55

export default function StoryMorph() {
  const sectionRef = useRef(null)
  const wordRefs = useRef([])
  const listRefs = useRef([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = wordRefs.current
    const labels = listRefs.current

    if (prefersReduced) {
      gsap.set(els, { opacity: 0 })
      gsap.set(els[els.length - 1], { opacity: 1 })
      gsap.set(labels, { color: '#9294b3' })
      gsap.set(labels[labels.length - 1], { color: '#15162e' })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(els, { opacity: 0, y: 20, scale: 0.98 })
      gsap.set(els[0], { opacity: 1, y: 0, scale: 1 })
      gsap.set(labels, { color: '#9294b3' })
      gsap.set(labels[0], { color: '#15162e' })

      const tl = gsap.timeline({ repeat: -1, paused: true })
      words.forEach((_, i) => {
        const next = (i + 1) % words.length
        tl.to({}, { duration: HOLD })
          .to(els[i], { opacity: 0, y: -20, scale: 0.98, duration: TRANSITION, ease: 'power2.inOut' }, '<')
          .fromTo(
            els[next],
            { opacity: 0, y: 20, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: TRANSITION, ease: 'power2.inOut' },
            '<',
          )
          .to(labels[i], { color: '#9294b3', duration: TRANSITION, ease: 'power2.inOut' }, '<')
          .to(labels[next], { color: '#15162e', duration: TRANSITION, ease: 'power2.inOut' }, '<')
      })

      // A genuine viewport-entrance trigger — starts the clock once, never
      // drives progress. No scrub, no pin: native scroll is untouched.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => tl.play(),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-8%] top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-full lg:block"
        style={{ background: 'radial-gradient(circle, rgba(59,109,251,0.07) 0%, rgba(59,109,251,0) 70%)' }}
      />
      <div className="container-x relative grid gap-10 lg:grid-cols-[0.85fr_1.6fr] lg:items-center lg:gap-16">
        {/* Left rail: the four words as a static index, the active one
            picked out in ink — a quiet table of contents for the giant
            morph on the right, instead of one centered, context-free word. */}
        <div>
          <p className="eyebrow w-fit">How We Approach It</p>
          <ul className="mt-8 hidden flex-col gap-4 sm:flex">
            {words.map((word, i) => (
              <li
                key={word}
                ref={(el) => (listRefs.current[i] = el)}
                className="flex items-baseline gap-3 text-sm font-semibold uppercase tracking-[0.2em] transition-colors duration-300"
              >
                <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
                {word.replace('.', '')}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex h-[4.5rem] items-center justify-center sm:h-[5.5rem] sm:justify-start lg:h-[6.5rem]">
          {words.map((word, i) => (
            <h2
              key={word}
              ref={(el) => (wordRefs.current[i] = el)}
              className="gradient-text absolute font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl lg:text-6xl"
            >
              {word}
            </h2>
          ))}
        </div>
      </div>
    </section>
  )
}
