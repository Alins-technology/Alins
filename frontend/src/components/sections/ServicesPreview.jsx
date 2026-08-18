import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../../data/services'
import SectionHeading from '../common/SectionHeading'

export default function ServicesPreview() {
  const [active, setActive] = useState(null)

  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="What We Do"
            title="Services engineered for"
            highlight="growth."
            description="From first pixel to first paying customer — everything your brand needs to compete online, under one roof."
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/services" className="btn-outline shrink-0">
              All Services <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>

        <div className="mt-14 border-t border-bg-border">
          {services.map((service, i) => {
            const num = String(i + 1).padStart(2, '0')
            const isActive = active === i
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="group relative flex items-center justify-between gap-6 border-b border-bg-border py-6 transition-colors duration-300 md:py-8"
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r ${service.color} opacity-0 transition-opacity duration-500 ${
                    isActive ? 'opacity-[0.05]' : ''
                  }`}
                />

                <div className="flex items-center gap-6 sm:gap-10">
                  <span
                    className={`index-num shrink-0 transition-colors duration-300 ${
                      isActive ? 'text-primary-300' : ''
                    }`}
                  >
                    {num}
                  </span>
                  <h3
                    className={`font-display text-2xl font-semibold text-white transition-transform duration-300 sm:text-3xl lg:text-4xl ${
                      isActive ? 'translate-x-2' : ''
                    }`}
                  >
                    {service.title}
                  </h3>
                </div>

                <p className="hidden max-w-xs text-sm text-ink-muted transition-opacity duration-300 lg:block">
                  {isActive ? service.short : ''}
                </p>

                <ArrowUpRight
                  size={22}
                  className={`shrink-0 text-ink-faint transition-all duration-300 ${
                    isActive ? '-translate-y-1 translate-x-1 text-primary-300' : ''
                  }`}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
