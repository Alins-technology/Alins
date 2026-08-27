import { forwardRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

// Tilt is driven through framer-motion's own motion values (rotateX/rotateY
// styles), not raw DOM writes — this card's `layout` prop already owns the
// element's transform for filter/reflow FLIP animations, and framer merges
// motion-value styles with that cleanly instead of the two fighting over
// the same `transform` attribute.
function useTilt() {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 300, damping: 28 })
  const springY = useSpring(rotateY, { stiffness: 300, damping: 28 })

  const skip =
    typeof window !== 'undefined' &&
    (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches)

  const onPointerMove = (e) => {
    if (skip) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 8)
    rotateX.set((0.5 - py) * 8)
  }
  const onPointerLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return { rotateX: springX, rotateY: springY, onPointerMove, onPointerLeave }
}

// AnimatePresence's popLayout mode (used on the Portfolio page) attaches a
// ref to each direct child to measure it during exit animations — plain
// function components can't receive that, hence forwardRef here.
//
// `size` is opt-in: it defaults to 'default', which renders byte-identical
// to the original card (same classes/heights), so PortfolioPreview.jsx on
// the home page — which never passes this prop — is unaffected. Only the
// Portfolio page's bento grid opts a card into the 'featured' treatment.
const PortfolioCard = forwardRef(function PortfolioCard({ project, index, size = 'default' }, ref) {
  const featured = size === 'featured'
  const { rotateX, rotateY, onPointerMove, onPointerLeave } = useTilt()

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border shadow-card transition-shadow duration-300 ${
        featured ? 'border-primary-500/15 bg-primary-500/[0.08] lg:col-span-2' : 'border-bg-border bg-bg-card'
      }`}
      data-cursor-hover
    >
      {featured && (
        <span className="absolute left-6 top-6 z-10 rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-700 backdrop-blur">
          Featured
        </span>
      )}

      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${project.color} ${
          featured ? 'h-80 sm:h-[26rem]' : 'h-72 sm:h-80'
        }`}
      >
        <div className="absolute inset-0 bg-bg/45 transition-opacity duration-500 group-hover:opacity-25" />
        <div className="noise-overlay opacity-20" />
        <span
          className={`font-display font-bold text-white/20 transition-transform duration-700 ease-out group-hover:scale-105 ${
            featured ? 'text-7xl sm:text-8xl' : 'text-6xl'
          }`}
        >
          {String(project.id).padStart(2, '0')}
        </span>
        <div className="absolute right-6 top-6 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </div>
      </div>

      <div className={`flex flex-1 flex-col ${featured ? 'p-8 sm:p-10' : 'p-7 sm:p-8'}`}>
        <div className="flex items-center justify-between gap-4">
          <span className="text-fluid-xs font-semibold uppercase tracking-widest text-accent-600">
            {project.category}
          </span>
          <span className="index-num">{String(project.id).padStart(2, '0')}</span>
        </div>
        <h3 className={`mt-3 font-semibold text-ink ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
          {project.title}
        </h3>
        {project.description && (
          <p
            className={`mt-3 leading-relaxed text-ink-muted ${
              featured ? 'max-w-xl text-base' : 'max-w-md text-sm'
            }`}
          >
            {project.description}
          </p>
        )}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-bg-border bg-bg-surface px-3 py-1 text-xs text-ink-muted"
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
