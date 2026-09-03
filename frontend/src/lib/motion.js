/**
 * Shared Framer Motion primitives — centralizing durations/eases/variant
 * shapes that were already the site's de facto convention (hand-copied
 * `{opacity:0,y:...}` objects in SectionHeading, Stats, AboutPreview,
 * ServicesPreview, Team, Values, CTA, ContactForm, PageHeader, NotFound...)
 * so new/touched work reads from one source instead of another slightly
 * different copy. Not a mandate to migrate every existing file — already
 *-good components keep their own inline variants untouched.
 */

// Duration tiers.
export const DURATION = {
  micro: 0.2, // button/hover/tap feedback
  reveal: 0.6, // standard content entrance
  cinematic: 1.1, // page-level / hero-scale moments
}

// Custom eases — no generic easeInOut for anything content-facing.
export const EASE = {
  standard: [0.65, 0, 0.35, 1],
  final: [0.83, 0, 0.17, 1],
  reveal: [0.76, 0, 0.24, 1],
}

/**
 * Fade + rise entrance that plays as soon as the element mounts (not
 * scroll-gated) — the pattern used for above-the-fold heroes/headers.
 * Spread the result directly onto a `motion.*` element.
 */
export function fadeUp({ delay = 0, y = 20, duration = DURATION.reveal } = {}) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: EASE.standard },
  }
}

/**
 * Same shape, gated to when the element scrolls into view (fires once) —
 * the pattern used for below-the-fold section reveals.
 */
export function fadeUpInView({ delay = 0, y = 20, duration = DURATION.reveal, margin = '-60px' } = {}) {
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin },
    transition: { duration, delay, ease: EASE.standard },
  }
}

/**
 * Parent/child variant pair for staggered lists. Usage:
 *   <motion.div variants={staggerContainer()} initial="hidden" whileInView="show" viewport={{ once: true }}>
 *     {items.map((it) => <motion.div key={it.id} variants={fadeUpChild()}>...</motion.div>)}
 *   </motion.div>
 */
export function staggerContainer(staggerChildren = 0.08, delayChildren = 0) {
  return {
    hidden: {},
    show: { transition: { staggerChildren, delayChildren } },
  }
}

export function fadeUpChild(y = 20, duration = DURATION.reveal) {
  return {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration, ease: EASE.standard } },
  }
}

// Shared spring for tactile hover/tap feedback (matches Navbar's existing feel).
export const springTap = { type: 'spring', stiffness: 400, damping: 26 }
