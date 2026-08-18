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
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="max-w-2xl text-4xl font-bold text-white sm:text-5xl"
      >
        {title} {highlight && <span className="gradient-text">{highlight}</span>}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-xl text-base text-ink-muted sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
