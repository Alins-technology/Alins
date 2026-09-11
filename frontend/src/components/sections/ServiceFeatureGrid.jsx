import { motion } from 'framer-motion'
import { staggerContainer, fadeUpChild } from '../../lib/motion'
import { PlusCluster } from '../common/Doodles'

/**
 * "What's included" for one service — a bento grid (per DESIGN_SYSTEM.md):
 * the first feature card reads as featured (spans two columns, tinted with
 * the service's own gradient), the rest sit as flat bordered cells. Content
 * comes from `serviceDetails.featureCards` (4 per service); the visual
 * treatment is shared so every service page stays one system while the
 * color/copy make each feel distinct.
 */
export default function ServiceFeatureGrid({ service, featureCards }) {
  const [featured, ...rest] = featureCards

  return (
    <section className="section-pad relative">
      <div className="container-x">
        <div className="flex flex-col items-start gap-4">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: service.accent }} />
            What&apos;s Included
          </span>
          <h2 className="text-h2 max-w-xl text-ink">
            Everything <span className="gradient-text">{service.title}</span> covers.
          </h2>
        </div>

        {/* No fixed row height here on purpose — an earlier pass pinned this
            grid to `auto-rows-[10rem]` to force a bento shape, and the
            longer feature copy (real sentences, not a one-line teaser like
            the homepage cards) clipped straight through the bottom of the
            card. Every cell below sizes itself off its own content instead:
            one full-width featured row, then the rest in an even row that
            wraps to one column on mobile. */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid grid-cols-1 gap-5"
        >
          <motion.div
            variants={fadeUpChild(20)}
            className="group relative overflow-hidden rounded-3xl border p-8 shadow-card sm:p-9"
            style={{ borderColor: `${service.accent}26` }}
          >
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${service.color} opacity-[0.10] transition-opacity duration-500 group-hover:opacity-[0.18]`}
            />
            <PlusCluster
              aria-hidden
              className="pointer-events-none absolute right-6 top-6 h-9 w-9 opacity-30"
              style={{ color: service.accent }}
            />
            <span className="index-num">01</span>
            <h3 className="text-h3 mt-6 text-ink">{featured.title}</h3>
            <p className="text-fluid-sm mt-4 max-w-2xl leading-relaxed text-ink-muted">
              {featured.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {rest.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUpChild(20)}
                whileHover={{ y: -5 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-card backdrop-blur-xl transition-[border-color,box-shadow] duration-300"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${service.accent}4d`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
              >
                <span className="index-num">{String(i + 2).padStart(2, '0')}</span>
                <div className="mt-6">
                  <h3 className="font-display text-lg font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
