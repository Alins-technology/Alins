import { motion } from 'framer-motion'
import { Sparkle } from '../common/Doodles'

export default function Difference() {
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="max-w-3xl text-fluid-h2 font-medium leading-[1.2] tracking-tight text-ink"
        >
          Design, development and marketing don&apos;t sit in separate departments here.{' '}
          <span className="text-ink-muted">
            One team carries the work from brief to launch to the results that follow it.
          </span>
        </motion.p>
      </div>
    </section>
  )
}
