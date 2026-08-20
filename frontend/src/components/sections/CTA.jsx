import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import MagneticButton from '../common/MagneticButton'
import { PlusCluster, Sparkle, ScribbleCircle, Squiggle } from '../common/Doodles'

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
        className="relative overflow-hidden rounded-[2.5rem] px-8 py-20 text-center sm:px-16 sm:py-24"
        style={{
          background:
            'linear-gradient(135deg, rgba(59,109,251,0.16), rgba(139,92,246,0.14) 50%, rgba(8,145,168,0.14) 100%)',
        }}
      >
        <div className="pointer-events-none absolute inset-0 border border-primary-500/15" style={{ borderRadius: 'inherit' }} />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,109,251,0.28) 0%, rgba(59,109,251,0) 70%)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 right-[-4rem] h-72 w-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(8,145,168,0.22) 0%, rgba(8,145,168,0) 70%)' }}
        />

        {/* colorful hand-sketched doodles instead of the old orbit-ring motif */}
        <span aria-hidden className="pointer-events-none absolute left-10 top-10 hidden text-primary-500 sm:block">
          <PlusCluster className="h-9 w-9 animate-pulse-glow" />
        </span>
        <span aria-hidden className="pointer-events-none absolute right-12 top-14 hidden text-accent-deep sm:block">
          <Sparkle className="h-7 w-7" />
        </span>
        <span aria-hidden className="pointer-events-none absolute bottom-10 right-16 hidden text-nebula/70 sm:block">
          <ScribbleCircle className="h-12 w-12" />
        </span>
        <span aria-hidden className="pointer-events-none absolute bottom-12 left-14 hidden text-accent sm:block">
          <Sparkle className="h-5 w-5 animate-pulse-glow" />
        </span>

        <div className="relative">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="relative mx-auto mt-6 max-w-2xl text-3xl font-bold leading-[1.15] text-ink sm:text-4xl lg:text-5xl">
            {title}{' '}
            <span className="relative inline-block">
              <span className="gradient-text">{highlight}</span>
              <Squiggle className="pointer-events-none absolute -bottom-2 left-0 h-2.5 w-full text-accent/60" />
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-ink-muted sm:text-lg">{description}</p>
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
