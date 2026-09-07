import { motion } from 'framer-motion'
import { testimonials } from '../../data/content'
import SectionHeading from '../common/SectionHeading'
import TiltCard from '../common/TiltCard'
import { staggerContainer, fadeUpChild } from '../../lib/motion'

/**
 * A grid of liquid-glass testimonial cards — every real quote visible at
 * once instead of a one-at-a-time carousel, matching the reference design's
 * testimonial figures (quote, then a border-top byline).
 */
export default function Testimonials() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.14) 0%, rgba(34,211,238,0) 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 bottom-0 h-64 w-64 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0) 70%)' }}
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Testimonials"
          title="Clients who came back"
          highlight="with the next project."
          description="We'd rather you heard it from them than from us — a few words from people we've built with."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeUpChild(20)}>
              <TiltCard maxTilt={4} className="h-full">
                <figure className="liquid-glass h-full rounded-2xl p-7 sm:p-8">
                  <blockquote className="text-fluid-base leading-[1.6] text-ink-muted">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-nebula text-xs font-bold text-white">
                      {t.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{t.name}</p>
                      <p className="text-xs text-ink-faint">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
