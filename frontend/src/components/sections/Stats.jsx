import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { stats } from '../../data/content'
import AnimatedCounter from '../common/AnimatedCounter'

// Two brand tones alternating (logo cyan, site blue) instead of four
// unrelated hues — the row reads as one coordinated set, not a rainbow.
const numColors = ['text-accent-400', 'text-primary-400']

export default function Stats() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const glowX = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.15, 0.9])

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-y border-white/5 bg-black/20 py-16 md:py-20">
      <motion.div
        aria-hidden
        style={{ x: glowX, scale: glowScale }}
        className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-5xl -translate-x-1/2"
      >
        <div
          className="h-full w-full"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 40%, rgba(59,109,251,0.10) 0%, rgba(59,109,251,0) 70%)' }}
        />
      </motion.div>
      <div className="container-x relative">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4 sm:divide-x sm:divide-bg-border">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className={`text-center sm:px-6 sm:text-left ${i === 0 ? 'sm:pl-0' : ''}`}
            >
              <p className={`text-stat ${numColors[i % numColors.length]}`}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-4 text-fluid-xs uppercase tracking-widest text-ink-faint">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
