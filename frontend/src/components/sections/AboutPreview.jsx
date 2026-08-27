import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { Sparkle, ScribbleCircle, PlusCluster } from '../common/Doodles'

const points = [
  'One team spans design, code and marketing',
  'You see progress as it happens, not at the end',
  'Design systems that outlast the first launch',
  'Marketing decisions backed by actual data',
]

export default function AboutPreview() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="container-x grid grid-cols-1 items-start gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10 xl:gap-16">
        {/* Statement column — wider, leads the section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:pr-6"
        >
          <span className="eyebrow">About Alins</span>
          <h2 className="text-h1 mt-6 max-w-xl leading-[1.05] text-ink">
            One team, <span className="gradient-text">every discipline covered.</span>
          </h2>
          <p className="text-lede mt-6 max-w-md">
            Designers, engineers and strategists working from the same brief instead of
            handing it off between agencies. We partner with startups and established
            companies alike, and we stay accountable for how the work actually performs.
          </p>

          <ul className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-ink-muted">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-primary-400" />
                {point}
              </li>
            ))}
          </ul>

          <Link
            to="/about"
            className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-colors hover:text-accent-deep"
          >
            More about our agency <ArrowUpRight size={15} />
          </Link>
        </motion.div>

        {/* Visual/stat column — narrower, offset down to break the centered feel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative lg:mt-16"
        >
          <div
            className="aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl p-8 shadow-card sm:p-10 lg:ml-auto"
            style={{
              background: 'linear-gradient(160deg, rgba(59,109,251,0.12), rgba(139,92,246,0.10) 55%, rgba(8,145,168,0.09))',
              border: '1px solid rgba(59,109,251,0.18)',
            }}
          >
            <div className="relative flex h-full flex-col justify-between">
              <span className="eyebrow w-fit">Who We Are</span>

              {/* Colorful doodle cluster — keeps the card's center from
                  reading as empty space instead of intentional stillness. */}
              <div aria-hidden className="pointer-events-none relative mx-auto my-6 flex h-36 w-36 items-center justify-center gap-4 sm:h-44 sm:w-44">
                <ScribbleCircle className="h-20 w-20 text-primary-500/60 sm:h-24 sm:w-24" />
                <Sparkle className="absolute -right-2 -top-2 h-8 w-8 text-accent-deep animate-pulse-glow" />
                <PlusCluster className="absolute -bottom-2 -left-2 h-9 w-9 text-accent" />
              </div>

              <div>
                <p className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  Obsessed with the details{' '}
                  <span className="gradient-text">and the outcome.</span>
                </p>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="glass-card absolute -bottom-8 -left-6 hidden w-48 p-5 sm:block"
          >
            <p className="font-display text-3xl font-bold text-ink">8+</p>
            <p className="text-xs uppercase tracking-widest text-ink-faint">Years of Experience</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
