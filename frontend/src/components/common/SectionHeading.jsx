import { motion } from 'framer-motion'

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
}) {
  const isCenter = align === 'center'
  return (
    <div className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} gap-5`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
          {eyebrow}
        </motion.span>
      )}
      {/* Wipe-reveal instead of a plain fade+slide — the heading uncovers
          itself left-to-right via clip-path, a sharper "this just wrote
          itself in" moment than a fade, and it's the one heading style
          nearly every section on the site shares, so this one change lifts
          the whole site's perceived motion quality. */}
      <motion.h2
        initial={{ opacity: 0, y: 14, clipPath: 'inset(0 100% 0 0)' }}
        whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, delay: 0.05, ease: [0.65, 0, 0.35, 1] }}
        className="max-w-2xl text-h2 text-ink"
      >
        {title} {highlight && <span className="gradient-text">{highlight}</span>}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-xl text-lede"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
