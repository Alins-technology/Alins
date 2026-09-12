import { motion } from 'framer-motion'
import { staggerContainer, fadeUpChild } from '../../lib/motion'

/**
 * "How we work" for one service — same two-column recipe as the global
 * Process.jsx (left: statement, right: liquid-glass numbered list) but
 * fed the service-specific 4-step process from `serviceDetails`, and
 * accented with the service's own color instead of the generic gradient.
 */
export default function ServiceProcess({ service, process }) {
  return (
    <section className="section-pad relative overflow-hidden border-y border-bg-border/70">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{ background: `radial-gradient(ellipse 55% 45% at 85% 20%, ${service.glowFrom}12, transparent 60%)` }}
      />
      <div className="container-x relative grid gap-10 md:grid-cols-2 md:items-start md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: service.accent }} />
            How We Work
          </span>
          <h2 className="mt-5 text-h2 leading-[1.02] text-ink">
            Four steps for <span className="gradient-text">{service.title.toLowerCase()}.</span>
          </h2>
          <p className="text-lede mt-6 max-w-md">
            The same system on every {service.title.toLowerCase()} engagement, so you always know
            what&apos;s happening next — never a black box, never a surprise scope change.
          </p>
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
                <span className="font-display text-2xl font-bold" style={{ color: `${service.accent}45` }}>
                  {item.step}
                </span>
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
