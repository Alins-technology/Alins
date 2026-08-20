import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Sparkle, WavyUnderline } from '../common/Doodles'

export default function PageHeader({ eyebrow, title, highlight, description, crumb }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-40 md:pb-20 md:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-72 w-[36rem] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,109,251,0.10) 0%, rgba(59,109,251,0) 70%)' }}
      />

      {/* doodle flourish — a little hand-drawn energy near the headline,
          not just another gradient blob */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="pointer-events-none absolute right-[10%] top-28 hidden text-accent/70 sm:block md:top-32"
      >
        <Sparkle className="h-7 w-7 animate-pulse-glow md:h-9 md:w-9" />
      </motion.div>

      <div className="container-x relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 flex items-center justify-center gap-2 text-xs text-ink-faint"
        >
          <Link to="/" className="transition-colors hover:text-primary-600">Home</Link>
          <ChevronRight size={12} />
          <span className="text-ink-muted">{crumb}</span>
        </motion.div>

        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="eyebrow"
          >
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-6 max-w-3xl text-5xl font-bold leading-tight text-ink sm:text-6xl"
        >
          {title}{' '}
          <span className="relative inline-block">
            <span className="gradient-text">{highlight}</span>
            <WavyUnderline className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full text-accent/50 sm:-bottom-3" />
          </span>
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mx-auto mt-6 max-w-xl text-base text-ink-muted sm:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
