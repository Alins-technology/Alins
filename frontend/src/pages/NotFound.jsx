import { Link } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import RocketBuddy from '../components/common/RocketBuddy'
import { usePrefersReducedMotion } from '../lib/motion'

const PageOrb = lazy(() => import('../components/three/PageOrb'))

export default function NotFound() {
  const reduced = usePrefersReducedMotion()

  return (
    <PageTransition>
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,109,251,0.08) 0%, rgba(59,109,251,0) 70%)' }}
        />

        {/* the rocket is genuinely "lost in orbit" now — a real 3D orbit
            ring drifting behind it, not just the copy saying so. Kept small
            and soft (low opacity + blur) so it reads as an ambient halo
            behind the rocket, not a solid ball fighting the 404 copy for
            attention. */}
        {!reduced && (
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[18%] -z-10 h-[34vh] w-[34vh] -translate-x-1/2 opacity-40 blur-[2px] sm:h-[38vh] sm:w-[38vh]"
          >
            <Suspense fallback={null}>
              <PageOrb color="#3b6dfb" ringColor="#22d3ee" distort={0.38} />
            </Suspense>
          </div>
        )}

        {/* the character — genuinely lost, waving for help */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <RocketBuddy size={130} />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="eyebrow relative z-10 mt-6"
        >
          Lost in Orbit
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="gradient-text relative z-10 mt-4 font-display text-[6rem] font-bold leading-none sm:text-[8rem]"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="relative z-10 mt-6 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg"
        >
          Our rocket drifted off course looking for this page. It doesn&apos;t exist, or it&apos;s
          moved somewhere else — let&apos;s get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="relative z-10"
        >
          <Link to="/" className="btn-primary mt-10">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </motion.div>
      </section>
    </PageTransition>
  )
}
