import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

const points = [
  'Full-stack team under one roof',
  'Transparent process, real-time updates',
  'Design systems built to scale',
  'Growth-focused marketing strategy',
]

export default function AboutPreview() {
  return (
    <section className="section-pad">
      <div className="container-x grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="glass-card aspect-square w-full max-w-md overflow-hidden p-8 sm:p-10">
            <div className="noise-overlay" />
            <div className="relative flex h-full flex-col justify-between">
              <span className="eyebrow w-fit">Who We Are</span>

              {/* Abstract orbital mark — keeps the card's center from
                  reading as empty space instead of intentional stillness. */}
              <div aria-hidden className="pointer-events-none relative mx-auto my-6 h-40 w-40 sm:h-48 sm:w-48">
                <div
                  className="absolute inset-0 rounded-full blur-2xl"
                  style={{ background: 'radial-gradient(circle, rgba(0,233,247,0.12) 0%, rgba(0,233,247,0) 70%)' }}
                />
                <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
                  <circle cx="100" cy="100" r="86" stroke="#00e9f7" strokeOpacity="0.16" />
                  <circle cx="100" cy="100" r="58" stroke="#3b6dfb" strokeOpacity="0.2" />
                  <circle
                    cx="100"
                    cy="100"
                    r="86"
                    stroke="#00e9f7"
                    strokeOpacity="0.55"
                    strokeWidth="1.5"
                    strokeDasharray="3 9"
                    strokeLinecap="round"
                    transform="rotate(-35 100 100)"
                  />
                  <circle cx="100" cy="14" r="3" fill="#00e9f7" fillOpacity="0.85" />
                  <circle cx="30" cy="145" r="2" fill="#8aa6ff" fillOpacity="0.6" />
                  <circle cx="168" cy="70" r="2" fill="#7df3ff" fillOpacity="0.6" />
                </svg>
              </div>

              <div>
                <p className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                  A team obsessed with{' '}
                  <span className="gradient-text">craft &amp; results.</span>
                </p>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card absolute -bottom-8 -right-6 hidden w-48 p-5 sm:block"
          >
            <p className="font-display text-3xl font-bold text-white">8+</p>
            <p className="text-xs uppercase tracking-widest text-ink-faint">Years of Experience</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">About Alins</span>
          <h2 className="mt-5 text-4xl font-bold text-white sm:text-5xl">
            Digital craftsmanship, <span className="gradient-text">delivered end-to-end.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">
            We&apos;re a multidisciplinary team of designers, engineers and strategists who
            partner with startups and enterprises to build digital products that look
            exceptional and perform even better.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-ink-muted">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-primary-400" />
                {point}
              </li>
            ))}
          </ul>

          <Link
            to="/about"
            className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-primary-300 transition-colors hover:text-accent"
          >
            More about our agency <ArrowUpRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
