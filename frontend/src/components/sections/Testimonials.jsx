import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react'
import { testimonials } from '../../data/content'
import SectionHeading from '../common/SectionHeading'
import { Sparkle } from '../common/Doodles'

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 6500)
    return () => clearInterval(id)
  }, [])

  const active = testimonials[index]
  const go = (dir) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length)

  return (
    <section className="section-pad relative overflow-hidden">
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(8,145,168,0.14) 0%, rgba(8,145,168,0) 70%)' }}
      />
      <div
        className="pointer-events-none absolute left-0 bottom-0 h-64 w-64 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0) 70%)' }}
      />
      <span aria-hidden className="pointer-events-none absolute right-[14%] top-14 hidden text-accent-deep/70 lg:block">
        <Sparkle className="h-6 w-6 animate-pulse-glow" />
      </span>
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Testimonials"
          title="Clients who came back"
          highlight="with the next project."
          description="We'd rather you heard it from them than from us — a few words from people we've built with."
        />

        {/* One oversized pull-quote at a time, minimal chrome — the quote
            itself is the section's visual content, not a grid of cards. */}
        <div className="relative mx-auto mt-16 max-w-3xl">
          <Quote
            aria-hidden
            size={90}
            className="pointer-events-none absolute -left-4 -top-10 text-primary-500/10 sm:-left-10"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-center"
            >
              <p className="text-2xl font-medium leading-snug text-ink sm:text-3xl lg:text-4xl">
                “{active.quote}”
              </p>

              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={15} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-ink">{active.name}</p>
                  <p className="text-xs text-ink-faint">{active.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bg-border text-ink-muted transition-colors hover:border-primary-500/40 hover:text-primary-600"
            >
              <ArrowLeft size={16} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial from ${t.name}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-primary-500' : 'w-1.5 bg-bg-border hover:bg-primary-500/40'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bg-border text-ink-muted transition-colors hover:border-primary-500/40 hover:text-primary-600"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
