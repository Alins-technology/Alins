import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

// AnimatePresence's popLayout mode (used on the Portfolio page) attaches a
// ref to each direct child to measure it during exit animations — plain
// function components can't receive that, hence forwardRef here.
const PortfolioCard = forwardRef(function PortfolioCard({ project, index }, ref) {
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
      className="group relative overflow-hidden rounded-3xl border border-bg-border bg-bg-card"
      data-cursor-hover
    >
      <div className={`relative flex h-72 items-center justify-center overflow-hidden bg-gradient-to-br ${project.color} sm:h-80`}>
        <div className="absolute inset-0 bg-bg/45 transition-opacity duration-500 group-hover:opacity-25" />
        <div className="noise-overlay opacity-20" />
        <span className="font-display text-7xl font-bold text-white/15 transition-transform duration-700 ease-out group-hover:scale-105">
          {String(project.id).padStart(2, '0')}
        </span>
        <div className="absolute right-6 top-6 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </div>
      </div>

      <div className="p-7 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-300">
            {project.category}
          </span>
          <span className="index-num">{String(project.id).padStart(2, '0')}</span>
        </div>
        <h3 className="mt-3 text-2xl font-semibold text-white">{project.title}</h3>
        {project.description && (
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">{project.description}</p>
        )}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-bg-border bg-white/[0.02] px-3 py-1 text-xs text-ink-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
})

export default PortfolioCard
