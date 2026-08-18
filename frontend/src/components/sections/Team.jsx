import { motion } from 'framer-motion'
import { Linkedin, Twitter } from 'lucide-react'
import { team } from '../../data/content'
import SectionHeading from '../common/SectionHeading'

export default function Team() {
  return (
    <section className="section-pad bg-bg-soft/40">
      <div className="container-x">
        <SectionHeading eyebrow="The Team" title="Meet the minds" highlight="behind Alins." />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group glass-card overflow-hidden p-6 text-center"
            >
              <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/30 to-accent/30">
                <span className="font-display text-2xl font-bold text-white">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <h3 className="mt-5 font-semibold text-white">{member.name}</h3>
              <p className="mt-1 text-xs text-ink-faint">{member.role}</p>
              <div className="mt-4 flex justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-bg-border text-ink-muted">
                  <Linkedin size={13} />
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-bg-border text-ink-muted">
                  <Twitter size={13} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
