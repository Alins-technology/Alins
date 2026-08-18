import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { portfolio } from '../../data/portfolio'
import SectionHeading from '../common/SectionHeading'
import PortfolioCard from './PortfolioCard'

export default function PortfolioPreview() {
  return (
    <section className="section-pad bg-bg-soft/40">
      <div className="container-x">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Our Work"
            title="Projects we're"
            highlight="proud of."
            description="A glimpse into the products, brands and campaigns we've helped bring to life."
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

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {portfolio.slice(0, 4).map((project, i) => (
            <PortfolioCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
