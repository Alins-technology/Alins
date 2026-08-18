import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const words = ['Idea.', 'Design.', 'Technology.', 'Growth.']

// Purely time-based — ~1s hold per word, ~0.55s crossfade into the next.
// Nothing here reads scroll position; the section is a normal flowing
// block and the page scrolls natively while this plays on its own clock.
const HOLD = 0.7
const TRANSITION = 0.55

export default function StoryMorph() {
  const sectionRef = useRef(null)
  const wordRefs = useRef([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = wordRefs.current

    if (prefersReduced) {
      gsap.set(els, { opacity: 0 })
      gsap.set(els[els.length - 1], { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(els, { opacity: 0, y: 20, scale: 0.98 })
      gsap.set(els[0], { opacity: 1, y: 0, scale: 1 })

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
    <section ref={sectionRef} className="relative flex min-h-[60vh] items-center justify-center overflow-hidden py-24">
      <div className="container-x text-center">
        <p className="eyebrow mx-auto w-fit">How We Think</p>
        <div className="relative mt-8 flex h-[10rem] items-center justify-center sm:h-[8rem]">
          {words.map((word, i) => (
            <h2
              key={word}
              ref={(el) => (wordRefs.current[i] = el)}
              className="absolute font-display text-6xl font-bold uppercase tracking-tight text-white sm:text-7xl lg:text-8xl"
            >
              {word}
            </h2>
          ))}
        </div>
      </div>
    </section>
  )
}
