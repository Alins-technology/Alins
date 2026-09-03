import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { Sparkle } from '../common/Doodles'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const STATEMENT_MAIN = "Design, development and marketing don't sit in separate departments here."
const STATEMENT_SUB = 'One team carries the work from brief to launch to the results that follow it.'

/**
 * Splits text into per-word spans, dim by default — GSAP below brightens
 * them progressively as the paragraph scrolls through view, so the
 * statement "writes itself in" rather than just fading up as one block.
 * Falls back to plain text under reduced-motion (no split needed at all).
 */
function Words({ text, reducedMotion }) {
  const words = useMemo(() => text.split(' '), [text])
  if (reducedMotion) return text
  return words.map((word, i) => (
    <span key={i} className="difference-word inline-block" style={{ opacity: 0.18 }}>
      {word}
      {i < words.length - 1 ? ' ' : ''}
    </span>
  ))
}

export default function Difference() {
  const pRef = useRef(null)

  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  useEffect(() => {
    if (reducedMotion || !pRef.current) return undefined
    const ctx = gsap.context(() => {
      const words = pRef.current.querySelectorAll('.difference-word')
      gsap.to(words, {
        opacity: 1,
        stagger: 0.03,
        ease: 'none',
        scrollTrigger: {
          trigger: pRef.current,
          start: 'top 85%',
          end: 'top 30%',
          scrub: 0.6,
        },
      })
    }, pRef)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: 'linear-gradient(120deg, rgba(59,109,251,0.10), rgba(139,92,246,0.10) 55%, rgba(8,145,168,0.09))' }}
    >
      {/* Full-bleed decorative wash + oversized ghost mark — the section's
          entire visual weight is typographic, this just keeps the band from
          reading as an empty flat fill */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0) 70%)' }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-4 -top-6 select-none font-display text-[9rem] font-bold leading-none sm:text-[12rem]"
        style={{ color: 'rgba(59,109,251,0.12)' }}
      >
        “
      </span>
      <span aria-hidden className="pointer-events-none absolute bottom-8 right-[14%] hidden text-accent-deep/70 sm:block">
        <Sparkle className="h-8 w-8 animate-pulse-glow" />
      </span>

      <div className="container-x relative grid grid-cols-1 gap-10 lg:grid-cols-[0.32fr_1fr] lg:gap-16">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow h-fit w-fit lg:sticky lg:top-32"
        >
          Why Alins?
        </motion.span>
        <motion.p
          ref={pRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="max-w-3xl text-fluid-h2 font-medium leading-[1.2] tracking-tight text-ink"
        >
          <Words text={STATEMENT_MAIN} reducedMotion={reducedMotion} />{' '}
          <span className="text-ink-muted">
            <Words text={STATEMENT_SUB} reducedMotion={reducedMotion} />
          </span>
        </motion.p>
      </div>
    </section>
  )
}
