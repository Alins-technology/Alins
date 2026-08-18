import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import MagneticButton from '../common/MagneticButton'
import Spacecraft from '../common/Spacecraft'
import { gsap, ScrollTrigger } from '../../lib/gsap'

export default function CTA({
  eyebrow = "Let's Build Together",
  title = 'Got a project in mind?',
  highlight = "Let's talk.",
  description = "Tell us about your goals and we'll get back to you within 24 hours with a free strategy consultation.",
  cta = 'Get a Free Quote',
  showCraft = false,
}) {
  const craftRef = useRef(null)

  useEffect(() => {
    if (!showCraft || !craftRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // The rocket completing its journey — a calm, one-time arrival as the
      // final CTA scrolls into view, not a permanently-floating decoration.
      gsap.set(craftRef.current, { opacity: 0, y: prefersReduced ? 0 : 34, x: prefersReduced ? 0 : 18, rotate: -4 })
      gsap.to(craftRef.current, {
        opacity: 0.5,
        y: 0,
        x: 0,
        rotate: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: craftRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, craftRef)

    return () => ctx.revert()
  }, [showCraft])

  return (
    <section className="container-x pb-24 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2.5rem] border border-primary-500/20 bg-gradient-to-br from-bg-card via-bg-surface to-bg-card px-8 py-16 text-center sm:px-16 sm:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,109,251,0.35) 0%, rgba(59,109,251,0) 70%)' }}
        />

        {showCraft && (
          <div ref={craftRef} aria-hidden className="pointer-events-none absolute right-10 top-8 hidden sm:block">
            <Spacecraft size={48} tone="nebula" />
          </div>
        )}

        <div className="relative">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mx-auto mt-6 max-w-2xl text-4xl font-bold text-white sm:text-5xl">
            {title} <span className="gradient-text">{highlight}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-ink-muted sm:text-lg">{description}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton as={Link} to="/contact" className="btn-primary">
              {cta} <ArrowUpRight size={16} />
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
