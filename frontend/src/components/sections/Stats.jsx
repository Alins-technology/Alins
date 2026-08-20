import { motion } from 'framer-motion'
import { stats } from '../../data/content'
import AnimatedCounter from '../common/AnimatedCounter'

const numColors = ['text-primary-600', 'text-nebula', 'text-accent-deep', 'text-primary-600']

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-bg-soft/60 py-16 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-5xl -translate-x-1/2"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 40%, rgba(59,109,251,0.10) 0%, rgba(59,109,251,0) 70%)' }}
      />
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
              <p
                className={`font-display text-4xl font-bold leading-none tracking-tight sm:text-5xl lg:text-6xl ${numColors[i % numColors.length]}`}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-4 text-xs uppercase tracking-widest text-ink-faint sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
