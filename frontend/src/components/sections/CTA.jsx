import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import MagneticButton from '../common/MagneticButton'

/**
 * The site's closing panel — a liquid-glass card with a soft radial glow at
 * the top, matching the reference design's "FinalCTA" treatment. Copy stays
 * fully prop-driven (unchanged), only the chrome around it changed.
 */
export default function CTA({
  eyebrow = "Let's Build Together",
  title = 'Have a project worth doing right?',
  highlight = "Tell us about it.",
  description = "Share your goals and timeline and we'll respond within 24 hours with a free strategy consultation.",
  cta = 'Get a Free Quote',
}) {
  return (
    <section className="container-x pb-24 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="liquid-glass relative px-8 py-20 text-center sm:px-16 sm:py-24"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,109,251,0.3) 0%, rgba(59,109,251,0) 70%)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 right-[-4rem] h-72 w-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.22) 0%, rgba(34,211,238,0) 70%)' }}
        />

        <div className="relative">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="text-h2 mx-auto mt-6 max-w-2xl leading-[1.15] text-ink">
            {title} <span className="gradient-text">{highlight}</span>
          </h2>
          <p className="text-lede mx-auto mt-5 max-w-lg">{description}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton as={Link} to="/contact" className="btn-primary">
              {cta} <ArrowUpRight size={16} />
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
