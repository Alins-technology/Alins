import { motion } from 'framer-motion'

export default function Difference() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="hairline" />
        <div className="grid grid-cols-1 gap-10 pt-14 lg:grid-cols-[0.6fr_1fr] lg:gap-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="eyebrow w-fit"
          >
            Why Alins?
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="max-w-2xl text-3xl font-medium leading-snug text-white sm:text-4xl lg:text-5xl"
          >
            We don&apos;t treat design, development and marketing as separate pieces.{' '}
            <span className="text-ink-muted">
              We build the entire digital experience as one connected system.
            </span>
          </motion.p>
        </div>
      </div>
    </section>
  )
}
