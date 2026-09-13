import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { staggerContainer, fadeUpChild } from '../../lib/motion'

/**
 * Local-presence band for one service — two cards (Noida / Indirapuram
 * today, but built to take any number) pulled from
 * `serviceDetails.locations`. A full-bleed tinted wash (per DESIGN_SYSTEM's
 * "use sparingly" band pattern) so it reads as a deliberate rhythm break
 * between the FAQ and the closing related-services/CTA blocks, not another
 * plain white section. Returns null when a service has no location copy
 * (digital-marketing, seo-growth today) rather than rendering an empty band.
 */
export default function ServiceAreas({ service, locations }) {
  if (!locations || locations.length === 0) return null

  return (
    <section className="relative overflow-hidden border-y border-bg-border/70 py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 12% 10%, ${service.glowFrom}14, transparent 60%), radial-gradient(ellipse 55% 45% at 88% 90%, ${service.glowTo}14, transparent 60%)`,
        }}
      />
      <div className="container-x relative">
        <div className="flex flex-col items-start gap-4">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: service.accent }} />
            Where We Work
          </span>
          <h2 className="max-w-xl text-h2 text-ink">
            {service.title} for businesses across <span className="gradient-text">the NCR.</span>
          </h2>
          <p className="text-lede max-w-lg">
            Based out of Noida, working with startups, retailers and established brands across the
            wider region — every engagement scoped to the local market it actually serves.
          </p>
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {locations.map((loc) => (
            <motion.div
              key={loc.city}
              variants={fadeUpChild(20)}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-card backdrop-blur-xl transition-[border-color,box-shadow] duration-300 sm:p-8"
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${service.accent}4d`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ color: service.accent, background: `${service.accent}1a` }}
              >
                <MapPin size={20} strokeWidth={1.75} />
              </div>
              <h3 className="font-display mt-5 text-lg font-semibold text-ink sm:text-xl">
                {loc.heading}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{loc.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
