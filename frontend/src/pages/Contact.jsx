import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import PageHeader from '../components/sections/PageHeader'
import ContactForm from '../components/sections/ContactForm'

const info = [
  { icon: Mail, label: 'Email Us', value: 'contact@alins.in' },
  { icon: Phone, label: 'Call Us', value: '+91 93540 80179' },
  { icon: MapPin, label: 'Location', value: 'Shop no 220 Rajhans Plaza, Indrapuram 201014' },
  { icon: Clock, label: 'Working Hours', value: 'Mon – Sat, 9:00 AM – 7:00 PM' },
]

export default function Contact() {
  return (
    <PageTransition>
      <PageHeader
        crumb="Contact"
        eyebrow="Get In Touch"
        title="Let's build something"
        highlight="great."
        description="Tell us about your goals and we'll get back to you within 24 hours with a free strategy consultation."
      />

      <section className="section-pad !pt-0">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col divide-y divide-bg-border border-y border-bg-border"
          >
            {info.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 py-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-300">
                  <Icon size={17} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-ink-faint">{label}</p>
                  <p className="mt-1 font-medium text-white">{value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <ContactForm />
        </div>
      </section>
    </PageTransition>
  )
}
