import { motion } from 'framer-motion'
import { values } from '../../data/content'
import SectionHeading from '../common/SectionHeading'
import { Loop, Zigzag } from '../common/Doodles'

export default function Values() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Values"
          title="What we won't"
          highlight="compromise on."
        />
        {/* Bento grid: the first value ("Think Bold") is promoted into a
            2x2 feature cell — tinted, larger type — the remaining four sit
            around it as flat, compact cells rather than five identical
            rows. */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5">
          {values.map((value, i) => {
            const featured = i === 0
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={
                  featured
                    ? 'group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-primary-500/20 p-8 shadow-card sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:p-10'
                    : 'group relative flex flex-col justify-between rounded-2xl border border-bg-border bg-white p-6 shadow-card transition-colors duration-300 hover:border-primary-500/30'
                }
                style={
                  featured
                    ? { background: 'linear-gradient(150deg, rgba(59,109,251,0.12), rgba(139,92,246,0.10) 60%, rgba(8,145,168,0.09))' }
                    : undefined
                }
              >
                {featured && (
                  <>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-primary-500/25 to-accent/25 blur-2xl"
                    />
                    <Loop aria-hidden className="pointer-events-none absolute bottom-6 right-6 h-10 w-14 text-accent-deep/50" />
                  </>
                )}
                {!featured && i === 1 && (
                  <Zigzag aria-hidden className="pointer-events-none absolute right-5 top-5 h-4 w-9 text-nebula/50" />
                )}
                <span className={featured ? 'index-num relative text-base' : 'index-num relative'}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className={featured ? 'relative mt-10' : 'relative mt-6'}>
                  <h3
                    className={
                      featured
                        ? 'font-display text-fluid-h3 font-bold text-ink'
                        : 'text-lg font-semibold text-ink'
                    }
                  >
                    {value.title}
                  </h3>
                  <p
                    className={
                      featured
                        ? 'mt-4 max-w-sm text-base leading-relaxed text-ink-muted'
                        : 'mt-2 text-sm leading-relaxed text-ink-muted'
                    }
                  >
                    {value.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
