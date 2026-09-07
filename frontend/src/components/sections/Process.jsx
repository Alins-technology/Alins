import { motion } from 'framer-motion'
import { process } from '../../data/content'
import { services } from '../../data/services'
import { staggerContainer, fadeUpChild } from '../../lib/motion'

/**
 * Two-column "how we work" block — the reference design's FeatureTriage
 * layout, carrying the real four-step process (`data/content.js`) instead
 * of a vertical scroll-scrubbed timeline. Shared by Home and About, so this
 * one redesign covers both pages.
 */
export default function Process() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-x relative grid gap-10 md:grid-cols-2 md:gap-16 md:items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
            How We Work
          </span>
          <h2 className="text-h2 mt-5 leading-[1.02] text-ink">
            Four steps, no <span className="gradient-text">guesswork.</span>
          </h2>
          <p className="text-lede mt-6 max-w-md">
            Same system on every project, so you always know what&apos;s happening and why —
            never a black box, never a surprise invoice.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {services.map((s) => (
              <span
                key={s.id}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-ink-muted"
              >
                {s.title}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="liquid-glass p-5"
        >
          <p className="px-2 pb-4 text-xs uppercase tracking-[0.2em] text-ink-faint">
            Our Process · {process.length} Stages
          </p>
          <div className="space-y-3">
            {process.map((item) => (
              <motion.div key={item.step} variants={fadeUpChild(14)} className="liquid-glass flex gap-4 p-4">
                <span className="font-display text-2xl font-bold text-white/25">{item.step}</span>
                <div>
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
