import { motion } from 'framer-motion'
import { values } from '../../data/content'
import SectionHeading from '../common/SectionHeading'

export default function Values() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Values"
          title="What drives"
          highlight="everything we do."
        />
        <div className="mt-14 flex flex-col divide-y divide-bg-border border-t border-bg-border">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="grid grid-cols-[3rem_1fr] items-baseline gap-6 py-7 sm:grid-cols-[5rem_1fr_2fr] sm:gap-10"
            >
              <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-xl font-semibold text-white sm:text-2xl">{value.title}</h3>
              <p className="col-span-2 mt-1 max-w-md text-sm leading-relaxed text-ink-muted sm:col-span-1 sm:mt-0">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
