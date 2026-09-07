import { motion } from 'framer-motion'
import { EASE, usePrefersReducedMotion } from '../../lib/motion'

// A depth-based route transition — a slight forward tilt + scale + blur on
// the way in/out, not just a fade/slide — so navigating between pages
// reads as moving through a 3D space instead of a flat crossfade. Needs a
// `perspective`d parent for the rotateX to actually read as depth rather
// than a plain skew.
const variants = {
  initial: { opacity: 0, y: 26, scale: 0.975, rotateX: 5, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: EASE.reveal },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.99,
    rotateX: -3,
    filter: 'blur(4px)',
    transition: { duration: 0.35, ease: EASE.final },
  },
}

const reducedVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE.standard } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export default function PageTransition({ children }) {
  const reduced = usePrefersReducedMotion()

  return (
    <div style={{ perspective: reduced ? 'none' : 1400 }}>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={reduced ? reducedVariants : variants}
        style={{ transformStyle: 'preserve-3d', transformOrigin: 'center top' }}
      >
        {children}
      </motion.div>
    </div>
  )
}
