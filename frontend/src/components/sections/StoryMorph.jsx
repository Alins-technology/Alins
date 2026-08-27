import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { Sparkle, Loop } from '../common/Doodles'

const steps = [
  { word: 'Idea.', desc: 'We start with your goals and your market, not a template we reuse on everyone.' },
  { word: 'Design.', desc: 'Interfaces and systems built around how people actually use them, not guesses.' },
  { word: 'Code.', desc: 'Production-grade builds from day one — fast, secure, made to hold up under real traffic.' },
  { word: 'Growth.', desc: 'Launch is day one for us too. We keep measuring, testing and improving after it ships.' },
]
const words = steps.map((s) => s.word)

// Purely time-based — ~1s hold per word, ~0.55s crossfade into the next.
// Nothing here reads scroll position; the section is a normal flowing
// block and the page scrolls natively while this plays on its own clock.
const HOLD = 1.4
const TRANSITION = 0.55

export default function StoryMorph() {
  const sectionRef = useRef(null)
  const wordRefs = useRef([])
  const descRefs = useRef([])
  const listRefs = useRef([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = wordRefs.current
    const descs = descRefs.current
    const labels = listRefs.current

    if (prefersReduced) {
      gsap.set(els, { opacity: 0 })
      gsap.set(els[els.length - 1], { opacity: 1 })
      gsap.set(descs, { opacity: 0 })
      gsap.set(descs[descs.length - 1], { opacity: 1 })
      gsap.set(labels, { color: '#9294b3' })
      gsap.set(labels[labels.length - 1], { color: '#15162e' })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(els, { opacity: 0, y: 20, scale: 0.98 })
      gsap.set(els[0], { opacity: 1, y: 0, scale: 1 })
      gsap.set(descs, { opacity: 0, y: 8 })
      gsap.set(descs[0], { opacity: 1, y: 0 })
      gsap.set(labels, { color: '#9294b3' })
      gsap.set(labels[0], { color: '#15162e' })

      const tl = gsap.timeline({ repeat: -1, paused: true })
      words.forEach((_, i) => {
        const next = (i + 1) % words.length
        tl.to({}, { duration: HOLD })
          .to(els[i], { opacity: 0, y: -20, scale: 0.98, duration: TRANSITION, ease: 'power2.inOut' }, '<')
          .to(descs[i], { opacity: 0, y: -8, duration: TRANSITION, ease: 'power2.inOut' }, '<')
          .fromTo(
            els[next],
            { opacity: 0, y: 20, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: TRANSITION, ease: 'power2.inOut' },
            '<',
          )
          .fromTo(
            descs[next],
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: TRANSITION, ease: 'power2.inOut' },
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
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-8%] top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-full lg:block"
        style={{ background: 'radial-gradient(circle, rgba(59,109,251,0.09) 0%, rgba(59,109,251,0) 70%)' }}
      />
      <div className="container-x relative grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:items-center lg:gap-14">
        {/* Left rail: the four words as a static index, the active one
            picked out in ink — a quiet table of contents for the giant
            morph on the right, instead of one centered, context-free word. */}
        <div>
          <p className="eyebrow w-fit">How We Approach It</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
            The same four-stage rhythm on every project, whether it's a landing page or a
            full product rebuild.
          </p>
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

        {/* Right: the morphing word inside a real card, with a synced
            one-line description underneath so the space carries actual
            content instead of one word floating in a lot of whitespace. */}
        <div
          className="relative overflow-hidden rounded-[2rem] px-8 py-12 shadow-card sm:px-12 sm:py-14"
          style={{
            background: 'linear-gradient(150deg, rgba(59,109,251,0.08), rgba(139,92,246,0.08) 60%, rgba(8,145,168,0.07))',
            border: '1px solid rgba(59,109,251,0.14)',
          }}
        >
          <Sparkle aria-hidden className="pointer-events-none absolute right-8 top-8 h-6 w-6 text-accent-deep animate-pulse-glow" />
          <Loop aria-hidden className="pointer-events-none absolute bottom-6 right-10 hidden h-8 w-12 text-nebula/50 sm:block" />

          <div className="relative flex h-[4.5rem] items-center sm:h-[5.5rem] lg:h-[6.25rem]">
            {words.map((word, i) => (
              <h2
                key={word}
                ref={(el) => (wordRefs.current[i] = el)}
                className="text-h1 gradient-text absolute uppercase"
              >
                {word}
              </h2>
            ))}
          </div>

          <div className="relative mt-4 h-10 max-w-md sm:mt-6">
            {steps.map((step, i) => (
              <p
                key={step.word}
                ref={(el) => (descRefs.current[i] = el)}
                className="text-fluid-sm absolute leading-relaxed text-ink-muted"
              >
                {step.desc}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
