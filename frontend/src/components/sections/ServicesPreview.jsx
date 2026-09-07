import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../../data/services'
import SectionHeading from '../common/SectionHeading'

export default function ServicesPreview() {
  const [featured, ...rest] = services

  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="What We Do"
            title="Six disciplines, one"
            highlight="accountable team."
            description="From the first wireframe to the customer who actually converts — everything a brand needs to compete online, handled in-house."
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

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[11.5rem]">
          {/* Featured cell — spans two columns and two rows, tinted to read as promoted */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-primary-500/15 p-8 shadow-card transition-shadow duration-300 hover:shadow-glow sm:col-span-2 sm:p-10 lg:row-span-2"
          >
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${featured.color} opacity-[0.10] transition-opacity duration-500 group-hover:opacity-[0.18]`}
            />
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.06] shadow-card"
                  style={{ color: featured.accent }}
                >
                  <featured.icon size={26} strokeWidth={1.75} />
                </div>
                <span className="index-num">01</span>
              </div>

              <div className="mt-8">
                <h3 className="text-h3 text-ink transition-transform duration-300 group-hover:translate-x-1">
                  {featured.title}
                </h3>
                <p className="text-fluid-sm mt-4 max-w-md leading-relaxed text-ink-muted">
                  {featured.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {featured.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-ink-muted"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <ArrowUpRight
                size={22}
                className="mt-6 text-ink-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary-400"
              />
            </div>
          </motion.div>

          {/* Remaining services — flat bordered cells, no blur so the grid stays cheap and calm */}
          {rest.map((service, i) => {
            const num = String(i + 2).padStart(2, '0')
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.06 * (i + 1) }}
                whileHover={{ y: -5 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-card backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-primary-500/30 hover:shadow-glow-cyan"
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${service.color} opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.16]`}
                />
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ color: service.accent, background: `${service.accent}1a` }}
                  >
                    <service.icon size={19} strokeWidth={1.75} />
                  </div>
                  <span className="index-num">{num}</span>
                </div>
                <div className="mt-6">
                  <h3 className="font-display text-lg font-semibold text-ink transition-transform duration-300 group-hover:translate-x-1 sm:text-xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{service.short}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
