import { motion } from 'framer-motion'
import { Linkedin, Twitter } from 'lucide-react'
import { team } from '../../data/content'
import SectionHeading from '../common/SectionHeading'
import TiltCard from '../common/TiltCard'

const avatarGradients = [
  'from-primary-500 to-nebula',
  'from-nebula to-accent-400',
  'from-accent-400 to-primary-500',
  'from-primary-500 to-accent-400',
  'from-nebula to-primary-500',
]

export default function Team() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <SectionHeading eyebrow="The Team" title="The people doing" highlight="the actual work." />
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {team.map((member, i) => {
            // The first roster entry (the Manager) gets a quietly promoted
            // card — tinted instead of flat white, a larger mark — rather
            // than five visually interchangeable tiles.
            const lead = i === 0
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <TiltCard maxTilt={6}>
                  <div
                    className={
                      lead
                        ? 'group relative overflow-hidden rounded-3xl border border-primary-500/20 p-6 text-center shadow-card transition-shadow duration-300 hover:shadow-glow sm:p-8'
                        : 'group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center shadow-card backdrop-blur-xl transition-shadow duration-300 hover:shadow-glow-cyan sm:p-7'
                    }
                    style={
                      lead
                        ? { background: 'linear-gradient(150deg, rgba(59,109,251,0.14), rgba(139,92,246,0.12))' }
                        : undefined
                    }
                  >
                    <div
                      className={`relative mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-br shadow-glow transition-transform duration-300 group-hover:scale-105 ${
                        avatarGradients[i % avatarGradients.length]
                      } ${lead ? 'h-28 w-28 sm:h-32 sm:w-32' : 'h-20 w-20 sm:h-24 sm:w-24'}`}
                    >
                      <span className={lead ? 'font-display text-3xl font-bold text-white' : 'font-display text-2xl font-bold text-white'}>
                        {member.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className={lead ? 'mt-6 font-display text-lg font-semibold text-ink' : 'mt-5 font-semibold text-ink'}>
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-ink-faint">{member.role}</p>
                    <div className="mt-5 flex justify-center gap-2 opacity-0 transition-all duration-300 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-ink-muted transition-colors hover:border-primary-500/50 hover:text-primary-400">
                        <Linkedin size={13} />
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-ink-muted transition-colors hover:border-primary-500/50 hover:text-primary-400">
                        <Twitter size={13} />
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
