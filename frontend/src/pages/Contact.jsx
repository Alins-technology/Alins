import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import PageHeader from '../components/sections/PageHeader'
import ContactForm from '../components/sections/ContactForm'
import { Sparkle, ScribbleCircle, Squiggle } from '../components/common/Doodles'
import { fadeUpChild } from '../lib/motion'

const info = [
  { icon: Mail, label: 'Email Us', value: 'contact@alins.in' },
  { icon: Phone, label: 'Call Us', value: '+91 93540 80179' },
  { icon: MapPin, label: 'Location', value: 'Shop no 220 Rajhans Plaza, Indrapuram 201014' },
  { icon: Clock, label: 'Working Hours', value: 'Mon – Sat, 9:00 AM – 7:00 PM' },
]

// The panel's own entrance (slide in from the left) also declares the
// stagger timing for its children below — one variant doing both jobs.
const panelVariants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, staggerChildren: 0.09, delayChildren: 0.1 } },
}

// Same rotate+fade shape NotFound.jsx already uses for its floating doodles —
// alternating rotate direction per icon for a little visual variety.
const doodleVariants = (rotate) => ({
  hidden: { opacity: 0, scale: 0.6, rotate },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5 } },
})

export default function Contact() {
  return (
    <PageTransition>
      <PageHeader
        crumb="Contact"
        eyebrow="Get In Touch"
        title="Tell us where"
        highlight="you're headed."
        description="Share a few details about the project and we'll reply within 24 hours with a free strategy consultation."
      />

      {/* Split-diagonal: a colorful info panel on one side, the form taking
          the larger share on the other — asymmetric, not centered/stacked. */}
      <section className="relative overflow-hidden pb-24 pt-0 md:pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-12%] top-[6%] h-[40vh] w-[40vh] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,109,251,0.14) 0%, rgba(59,109,251,0) 70%)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[-6%] bottom-[4%] h-[32vh] w-[32vh] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(8,145,168,0.14) 0%, rgba(8,145,168,0) 70%)' }}
        />

        <div className="container-x relative z-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <motion.div
            variants={panelVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative flex flex-col overflow-hidden rounded-[2rem] p-8 sm:p-10"
            style={{
              background: 'linear-gradient(160deg, rgba(59,109,251,0.10), rgba(139,92,246,0.08) 55%, rgba(8,145,168,0.08))',
              border: '1px solid rgba(59,109,251,0.15)',
            }}
          >
            <span aria-hidden className="pointer-events-none absolute right-6 top-6 text-accent-deep/70">
              <Sparkle className="h-6 w-6 animate-pulse-glow" />
            </span>

            <motion.div variants={fadeUpChild(12)}>
              <span className="eyebrow">Direct Lines</span>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
                Prefer to skip the form? Here&apos;s every way to reach us directly — pick whichever&apos;s
                fastest for you.
              </p>
            </motion.div>

            <div className="mt-8 space-y-4">
              {info.map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  variants={fadeUpChild(12)}
                  className="flex items-start gap-4 rounded-2xl border border-bg-border bg-white p-4 shadow-card transition-colors duration-300 hover:border-primary-500/40"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{ background: ['#3b6dfb', '#8b5cf6', '#ff7a30', '#0891a8'][i % 4] }}
                  >
                    <Icon size={17} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-ink-faint">{label}</p>
                    <p className="mt-1 font-medium text-ink">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* colorful doodle cluster instead of the old orbit-ring graphic —
                now animates in the same rotate+fade way NotFound's doodles do,
                instead of sitting fully static. */}
            <div aria-hidden className="relative mt-10 flex flex-1 items-end justify-center gap-6 pb-2">
              <motion.div variants={doodleVariants(-16)}>
                <ScribbleCircle className="h-16 w-16 text-primary-400/70" />
              </motion.div>
              <motion.div variants={doodleVariants(10)} className="self-center">
                <Squiggle className="h-8 w-20 text-nebula/70" />
              </motion.div>
              <motion.div variants={doodleVariants(-10)} className="self-start">
                <Sparkle className="h-9 w-9 text-accent" />
              </motion.div>
            </div>
          </motion.div>

          <ContactForm />
        </div>
      </section>
    </PageTransition>
  )
}
