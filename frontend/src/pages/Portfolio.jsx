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
        eyebrow="Our Work"
        title="Selected projects,"
        highlight="real results."
        description="A curated look at the websites, apps, brands and campaigns we've crafted for our clients."
      />

      <section className="section-pad !pt-0">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  active === cat
                    ? 'border-primary-500/60 bg-primary-500/10 text-white shadow-glow'
                    : 'border-bg-border text-ink-muted hover:border-primary-500/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <PortfolioCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CTA />
    </PageTransition>
  )
}
