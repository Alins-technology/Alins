import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { testimonials } from '../../data/content'
import SectionHeading from '../common/SectionHeading'

export default function Testimonials() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(56,223,255,0.2) 0%, rgba(56,223,255,0) 70%)' }}
      />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by teams who"
          highlight="demand results."
          description="Don't just take our word for it — here's what our clients have to say."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.12 }}
              className="glass-card p-8"
            >
              <Quote className="text-primary-500/50" size={30} />
              <p className="mt-5 text-base leading-relaxed text-ink-muted">{t.quote}</p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-ink-faint">{t.role}</p>
                </div>
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
