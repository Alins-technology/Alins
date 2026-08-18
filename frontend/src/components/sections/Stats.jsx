import { motion } from 'framer-motion'
import { stats } from '../../data/content'
import AnimatedCounter from '../common/AnimatedCounter'

export default function Stats() {
  return (
    <section className="section-pad !py-16">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-8 border-y border-bg-border py-10 md:grid-cols-4 md:py-14">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center md:text-left"
            >
              <p className="font-display text-4xl font-bold text-white sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-ink-faint sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
