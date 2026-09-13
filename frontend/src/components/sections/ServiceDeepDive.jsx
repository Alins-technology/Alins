import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { fadeUpInView } from '../../lib/motion'

/**
 * The full long-form write-up for one service — every sub-topic (what the
 * service covers, why it's built the way it is, the Noida/Indirapuram local
 * coverage) as its own readable section, not condensed into teaser cards.
 * Sticky-narrative layout per DESIGN_SYSTEM.md: a sticky left column (intro +
 * jump nav) next to a scrolling right column of full sections, separated by
 * hairlines. Renders nothing when a service has no `deepDive` data yet
 * (digital-marketing, seo-growth) rather than an empty band.
 */
export default function ServiceDeepDive({ service, deepDive }) {
  if (!deepDive) return null
  const { intro, sections } = deepDive

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="section-pad relative border-y border-bg-border/70">
      <div className="container-x grid gap-12 lg:grid-cols-[0.32fr_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <motion.div {...fadeUpInView()}>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: service.accent }} />
              The Full Picture
            </span>
            <h2 className="mt-5 text-h2 leading-[1.05] text-ink">
              Everything about <span className="gradient-text">{service.title.toLowerCase()}.</span>
            </h2>
            <p className="text-lede mt-5 max-w-md">{intro}</p>
          </motion.div>

          {/* Jump nav — desktop only; on mobile the sections just read top to
              bottom in order, no scrollspy needed for a linear read. */}
          <nav className="mt-8 hidden max-h-[50vh] flex-col gap-0.5 overflow-y-auto lg:flex" aria-label="Jump to section">
            {sections.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className="rounded-lg px-3 py-2 text-left text-sm text-ink-faint transition-colors duration-200 hover:bg-white/[0.04] hover:text-ink"
              >
                {sec.heading}
              </button>
            ))}
          </nav>
        </div>

        <div>
          {sections.map((sec, i) => (
            <motion.div
              key={sec.id}
              id={sec.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.05 }}
              className="scroll-mt-28"
            >
              <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display mt-3 text-xl font-semibold text-ink sm:text-2xl">
                {sec.heading}
              </h3>
              <div className="mt-4 space-y-4">
                {sec.body.map((p, pi) => (
                  <p key={pi} className="text-fluid-sm leading-relaxed text-ink-muted">
                    {p}
                  </p>
                ))}
              </div>
              {sec.bullets && (
                <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {sec.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-ink-muted">
                      <Check
                        size={15}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0"
                        style={{ color: service.accent }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {sec.note && (
                <p className="mt-4 text-fluid-sm leading-relaxed text-ink-muted">{sec.note}</p>
              )}
              {i < sections.length - 1 && <div className="hairline mt-12" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
