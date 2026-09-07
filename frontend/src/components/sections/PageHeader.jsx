import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { fadeUp, usePrefersReducedMotion } from '../../lib/motion'

const PageOrb = lazy(() => import('../three/PageOrb'))

export default function PageHeader({ eyebrow, title, highlight, description, crumb, orbColor = '#3b6dfb', orbRingColor }) {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="relative overflow-hidden pb-16 pt-40 md:pb-20 md:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-72 w-[36rem] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,109,251,0.10) 0%, rgba(59,109,251,0) 70%)' }}
      />

      {/* the page's own 3D orb — same visual language as the homepage's
          HeroOrb, sized down and tucked behind the headline's right side so
          it reads as a soft floating accent, not a solid ball competing with
          (or blending into) the gradient headline text sitting in front of
          it — kept low-opacity specifically so it never fights legibility. */}
      {!reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-4%] top-4 -z-10 h-[20rem] w-[20rem] opacity-35 sm:h-[24rem] sm:w-[24rem] md:right-[0%] md:h-[28rem] md:w-[28rem]"
        >
          <Suspense fallback={null}>
            <PageOrb color={orbColor} ringColor={orbRingColor} />
          </Suspense>
        </div>
      )}

      <div className="container-x relative z-10 text-center">
        <motion.div
          {...fadeUp({ delay: 0, y: 16 })}
          className="mb-5 flex items-center justify-center gap-2 text-xs text-ink-faint"
        >
          <Link to="/" className="transition-colors hover:text-primary-400">Home</Link>
          <ChevronRight size={12} />
          <span className="text-ink-muted">{crumb}</span>
        </motion.div>

        {eyebrow && (
          <motion.span {...fadeUp({ delay: 0.05, y: 16 })} className="eyebrow">
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          {...fadeUp({ delay: 0.1, y: 24 })}
          className="mx-auto mt-6 max-w-3xl text-h1 text-ink"
        >
          {title} <span className="gradient-text">{highlight}</span>
        </motion.h1>

        {description && (
          <motion.p {...fadeUp({ delay: 0.18, y: 24 })} className="mx-auto mt-6 max-w-xl text-lede">
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
