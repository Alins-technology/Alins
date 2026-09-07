import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import Logo from '../common/Logo'
import { navLinks } from '../../data/content'
import { services } from '../../data/services'
import { staggerContainer, fadeUpChild, springTap } from '../../lib/motion'

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div
        className="pointer-events-none absolute -left-40 top-0 h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,109,251,0.18) 0%, rgba(59,109,251,0) 70%)' }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.14) 0%, rgba(34,211,238,0) 70%)' }}
      />

      <motion.div
        className="container-x section-pad !py-16"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <motion.div variants={fadeUpChild()}>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              Alins Technologies is a modern digital agency crafting bold websites, apps, brands
              and growth campaigns for ambitious businesses.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  transition={springTap}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-ink-muted transition-colors duration-300 hover:border-transparent hover:bg-gradient-to-br hover:from-accent-400 hover:to-primary-500 hover:text-white hover:shadow-glow-accent"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUpChild()}>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-ink">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="link-underline text-fluid-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUpChild()}>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-ink">
              Services
            </h4>
            <ul className="space-y-3">
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link
                    to="/services"
                    className="link-underline text-fluid-sm"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUpChild()}>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-ink">
              Get in touch
            </h4>
            <ul className="space-y-4">
              <li className="text-fluid-sm flex items-start gap-3 text-ink-muted">
                <Mail size={16} className="mt-0.5 shrink-0 text-accent-400" />
                contact@alins.in
              </li>
              <li className="text-fluid-sm flex items-start gap-3 text-ink-muted">
                <Phone size={16} className="mt-0.5 shrink-0 text-accent-400" />
                +91 93540 80179
              </li>
              <li className="text-fluid-sm flex items-start gap-3 text-ink-muted">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent-400" />
                Shop no 220 Rajhans Plaza, Indrapuram 201014
              </li>
            </ul>
            <Link
              to="/contact"
              className="text-fluid-sm mt-6 inline-flex items-center gap-1.5 font-semibold text-accent-300 transition-colors hover:text-primary-400"
            >
              Let&apos;s start a project <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUpChild()}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-bg-border pt-8 text-xs text-ink-faint sm:flex-row"
        >
          <p>© {new Date().getFullYear()} Alins Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-default transition-colors hover:text-ink-muted">Privacy Policy</span>
            <span className="cursor-default transition-colors hover:text-ink-muted">Terms of Service</span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
