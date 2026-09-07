import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/common/PageTransition'
import PageHeader from '../components/sections/PageHeader'
import PortfolioCard from '../components/sections/PortfolioCard'
import CTA from '../components/sections/CTA'
import { portfolio, categories } from '../data/portfolio'

export default function Portfolio() {
  const [active, setActive] = useState('All')

  const filtered = useMemo(
    () => (active === 'All' ? portfolio : portfolio.filter((p) => p.category === active)),
    [active],
  )

  return (
    <PageTransition>
      <PageHeader
        crumb="Portfolio"
        eyebrow="Case Studies"
        title="Work that speaks"
        highlight="for itself."
        description="A look at the sites, apps, brands and campaigns we've shipped — and the results they've kept producing after launch."
        orbColor="#ff7a30"
        orbRingColor="#8b5cf6"
      />

      <section className="pb-20 pt-0 md:pb-28">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap justify-center gap-3 md:mb-14">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                className={`relative rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                  active === cat ? 'border-primary-400/60 text-primary-300' : 'border-bg-border text-ink-muted hover:border-primary-500/40 hover:text-ink'
                }`}
              >
                {active === cat && (
                  <motion.span
                    layoutId="portfolio-filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary-500/10 shadow-glow"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{cat}</span>
              </motion.button>
            ))}
          </div>

          {/* Bento grid: the first result reads as the featured project
              (spans two of three columns, larger everything), the rest sit
              in a regular single-column rhythm beside/below it — instead of
              a uniform equal-size grid. */}
          <motion.div layout className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <PortfolioCard
                  key={project.id}
                  project={project}
                  index={i}
                  size={i === 0 ? 'featured' : 'default'}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CTA />
    </PageTransition>
  )
}
