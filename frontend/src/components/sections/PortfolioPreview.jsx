import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { portfolio } from '../../data/portfolio'
import SectionHeading from '../common/SectionHeading'
import PortfolioCard from './PortfolioCard'
import { ScribbleCircle } from '../common/Doodles'

// Bento-style column spans applied to the wrapper around each card — wide,
// narrow, narrow, wide — so the grid reads as an uneven composition instead
// of a uniform 2-up layout, without touching PortfolioCard itself.
const spans = ['lg:col-span-2', 'lg:col-span-1', 'lg:col-span-1', 'lg:col-span-2']

export default function PortfolioPreview() {
  return (
    <section className="relative section-pad">
      <ScribbleCircle aria-hidden className="pointer-events-none absolute -left-4 top-8 hidden h-16 w-16 text-primary-400/50 lg:block" />
      <div className="container-x">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Our Work"
            title="A few builds we'd"
            highlight="put our name on."
            description="Products, brands and campaigns we've taken from brief to launch — and kept improving after."
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/portfolio" className="btn-outline shrink-0">
              Full Portfolio <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.slice(0, 4).map((project, i) => (
            <div key={project.id} className={spans[i]}>
              <PortfolioCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
