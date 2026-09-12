import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { EASE } from '../../lib/motion'

function FAQItem({ item, isOpen, onToggle, accent }) {
  return (
    <div className="liquid-glass overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-semibold text-ink sm:text-lg">{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE.standard }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ background: `${accent}1a`, color: accent }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE.standard }}
            className="overflow-hidden"
          >
            <p className="text-fluid-sm px-6 pb-6 leading-relaxed text-ink-muted">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * A single-open accordion of service-specific questions. Kept simple on
 * purpose — real height animation via framer-motion (no GSAP needed here),
 * one item open at a time, all state local to this component.
 */
export default function ServiceFAQ({ service, faqs }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section-pad relative">
      <div className="container-x max-w-3xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: service.accent }} />
            Frequently Asked
          </span>
          <h2 className="text-h2 text-ink">
            Questions about <span className="gradient-text">{service.title.toLowerCase()}.</span>
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <FAQItem
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                accent={service.accent}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
