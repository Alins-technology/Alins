import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import MagneticButton from '../common/MagneticButton'
import { Sparkle, Squiggle, ScribbleCircle, PlusCluster } from '../common/Doodles'

/**
 * Centered hero — no 3D scene, no rocket. Personality comes from a
 * colorful animated gradient wash + hand-sketched doodles scattered around
 * the centered headline instead of a literal spacecraft illustration.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden pt-32 pb-16 text-center sm:pt-36">
      {/* colorful animated wash — real color, not a faint pastel hint */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-[8%] h-[46rem] w-[46rem] -translate-x-1/2 animate-gradient rounded-full opacity-70 blur-3xl"
          style={{
            background:
              'conic-gradient(from 90deg, rgba(59,109,251,0.24), rgba(139,92,246,0.24), rgba(8,145,168,0.24), rgba(59,109,251,0.24))',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-bg" />
      </div>

      {/* doodles — colorful, scattered around the centered headline */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="pointer-events-none absolute left-[10%] top-[22%] hidden text-primary-500 sm:block md:left-[16%]"
      >
        <Sparkle className="h-8 w-8 animate-pulse-glow md:h-10 md:w-10" />
      </motion.span>
      <motion.span
        aria-hidden
        initial={{ opacity: 0, scale: 0.6, rotate: 12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="pointer-events-none absolute right-[12%] top-[18%] hidden text-nebula sm:block md:right-[18%]"
      >
        <ScribbleCircle className="h-14 w-14 md:h-16 md:w-16" />
      </motion.span>
      <motion.span
        aria-hidden
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="pointer-events-none absolute bottom-[26%] left-[8%] hidden text-accent sm:block md:left-[14%]"
      >
        <PlusCluster className="h-10 w-10 animate-pulse-glow" />
      </motion.span>
      <motion.span
        aria-hidden
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="pointer-events-none absolute bottom-[22%] right-[10%] hidden text-accent-deep sm:block md:right-[16%]"
      >
        <Sparkle className="h-6 w-6" />
      </motion.span>

      <div className="container-x relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow"
        >
          Web · App · Marketing · Design
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-display mt-7 max-w-4xl text-ink"
        >
          We craft brands that feel{' '}
          <span className="relative inline-block">
            <span className="gradient-text">unmistakably yours.</span>
            <Squiggle className="pointer-events-none absolute -bottom-3 left-0 h-3 w-full text-accent/60" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mt-6 max-w-xl text-lede"
        >
          A full-service digital studio blending sharp design, solid engineering and
          data-backed marketing — so ambitious brands don&apos;t just launch, they stand out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton as={Link} to="/contact" className="btn-primary">
            Start a Project
            <ArrowUpRight size={16} />
          </MagneticButton>
          <MagneticButton as={Link} to="/portfolio" className="btn-outline">
            See Our Work
          </MagneticButton>
        </motion.div>
      </div>

      {/* No repeated stats row here — the animated `Stats` section right
          below the hero on the Home page already covers Projects/Clients/
          Years/Team, so this space stays for the scroll cue instead of
          showing the same three numbers twice on one page. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 mx-auto mt-16 hidden flex-col items-center gap-3 text-ink-faint md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px animate-pulse-glow bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  )
}
