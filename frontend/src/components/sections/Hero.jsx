import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import MagneticButton from '../common/MagneticButton'
import { usePrefersReducedMotion } from '../../lib/motion'

/**
 * Centered hero — no floating 3D sphere/ball behind the headline anymore
 * (that read as a stray "bubble" rather than part of the brand). The
 * backdrop is a flat, edge-anchored aurora wash instead — the same
 * `grid-glow` gradient token used elsewhere in the app, so the hero and the
 * rest of the site share one atmosphere instead of the hero having its own
 * one-off circular glow. A fade to the page's dark ground keeps the text
 * fully readable. The heading itself gets a light pointer-tracking 3D tilt
 * for a bit of depth — cheap (CSS transform only), skipped entirely under
 * prefers-reduced-motion or on touch.
 */
export default function Hero() {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Subtle pointer-tracking tilt on the headline block — springs back to
  // flat on pointer-leave/touch. Kept tiny (±3deg) so it reads as depth,
  // not a gimmick.
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 260, damping: 22 })
  const springY = useSpring(rotateY, { stiffness: 260, damping: 22 })

  const handlePointerMove = (e) => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 6)
    rotateX.set((0.5 - py) * 6)
  }
  const handlePointerLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden pt-32 pb-16 text-center sm:pt-36"
    >
      {/* flat aurora wash — soft color bleeding in from the corners, same
          `grid-glow` token the rest of the app uses (doubled up + a slow
          drifting tint on top so the hero reads noticeably more colorful
          than a plain section, without ever resolving into a distinct
          circle/ball shape). Fades to the page's dark ground for legibility. */}
      <motion.div aria-hidden style={{ opacity: bgOpacity }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-glow" />
        <div className="absolute inset-0 bg-grid-glow" />
        <div
          className="absolute inset-0 animate-gradient opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(115deg, rgba(34,211,238,0.16) 0%, rgba(59,109,251,0.14) 30%, rgba(139,92,246,0.16) 60%, rgba(34,211,238,0.14) 100%)',
            backgroundSize: '200% 200%',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/50 to-bg" />
      </motion.div>

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
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={reduced ? undefined : { rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
          className="text-display mt-7 max-w-4xl leading-[0.98] text-ink will-change-transform"
        >
          We craft brands that feel
          <br />
          <span className="gradient-text">unmistakably yours.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 max-w-xl text-lede"
        >
          A full-service digital studio blending sharp design, solid engineering and
          data-backed marketing — so ambitious brands don&apos;t just launch, they stand out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
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
