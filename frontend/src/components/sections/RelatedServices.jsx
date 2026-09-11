import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../../data/services'

/**
 * A small cross-link block near the bottom of a service detail page — two
 * other services (`serviceDetails.relatedIds`), so a visitor reading about
 * one discipline has an obvious next click instead of a dead end before
 * the closing CTA. Card treatment matches ServicesPreview's flat cells.
 */
export default function RelatedServices({ relatedIds }) {
  const related = relatedIds
    .map((id) => services.find((s) => s.id === id))
    .filter(Boolean)

  if (related.length === 0) return null

  return (
    <section className="relative pb-4 pt-4">
      <div className="container-x">
        <span className="eyebrow">Keep Exploring</span>
        <h2 className="text-h3 mt-4 text-ink">Related services</h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {related.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                to={`/services/${service.id}`}
                className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-card backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:shadow-glow-cyan"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${service.accent}4d`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${service.color} opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.14]`}
                />
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ color: service.accent, background: `${service.accent}1a` }}
                  >
                    <service.icon size={20} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{service.title}</h3>
                    <p className="mt-0.5 text-sm text-ink-muted">{service.short}</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary-400"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
