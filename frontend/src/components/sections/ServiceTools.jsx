import { motion } from 'framer-motion'
import { staggerContainer, fadeUpChild } from '../../lib/motion'
import { Zigzag } from '../common/Doodles'

/**
 * A simple, calm "stack" row — the tools/platforms used to deliver one
 * service (`serviceDetails.tools`). Deliberately lightweight next to the
 * heavier bento/process sections: a centered heading, a doodle accent, and
 * one row of pill chips that wraps on small screens. No marquee/scroll
 * trickery here — the list is short enough that a static wrap reads better.
 */
export default function ServiceTools({ service, tools }) {
  return (
    <section className="relative py-16 md:py-20">
      <div className="container-x">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: service.accent }} />
            Tools & Platforms
          </span>
          <Zigzag className="h-4 w-24 opacity-60" style={{ color: service.accent }} />
        </div>

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3"
        >
          {tools.map((tool) => (
            <motion.span
              key={tool}
              variants={fadeUpChild(12)}
              className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-ink-muted transition-colors duration-300 hover:text-ink"
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${service.accent}4d`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
            >
              {tool}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
