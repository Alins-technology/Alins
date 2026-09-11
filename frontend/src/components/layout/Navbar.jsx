import { useEffect, useRef, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react'
import Logo from '../common/Logo'
import MagneticButton from '../common/MagneticButton'
import { navLinks } from '../../data/content'
import { services } from '../../data/services'
import { gsap, ScrollTrigger } from '../../lib/gsap'

// Framer can animate a Link straight up — this is what gives nav items their
// tactile press/hover feel without wiring individual mouse handlers.
const MotionNavLink = motion(NavLink)

// One brand gradient (logo cyan → site blue), not five unrelated hues, so
// the bar reads as the same brand as the mark sitting inside it. The dot
// beside each mobile link alternates the two ends of that same gradient
// instead of cycling through purple/orange accents that don't appear in
// the logo at all.
const railDots = ['#22d3ee', '#3b6dfb']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const headerRef = useRef(null)
  const barRef = useRef(null)
  const closeTimer = useRef(null)

  useEffect(() => {
    // A binary "scrolled past 24px" UI state doesn't need React re-renders —
    // GSAP tweens the two elements directly off a ScrollTrigger toggle. The
    // bar is a floating pill from the very first frame (not transparent-
    // until-scroll like a plain header); scrolling tightens it, deepens the
    // shadow and warms the glass so it reads as "lifted" off the page.
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -24',
        onEnter: () => {
          gsap.to(headerRef.current, { paddingTop: '0.6rem', paddingBottom: '0.6rem', duration: 0.35, ease: 'power2.out' })
          gsap.to(barRef.current, {
            boxShadow: '0 16px 44px -14px rgba(0,0,0,0.6)',
            borderColor: 'rgba(34,211,238,0.3)',
            backgroundColor: 'rgba(12,12,14,0.75)',
            duration: 0.35,
            ease: 'power2.out',
          })
        },
        onLeaveBack: () => {
          gsap.to(headerRef.current, { paddingTop: '1.25rem', paddingBottom: '1.25rem', duration: 0.35, ease: 'power2.out' })
          gsap.to(barRef.current, {
            boxShadow: '0 8px 30px -12px rgba(0,0,0,0.45)',
            borderColor: 'rgba(255,255,255,0.10)',
            backgroundColor: 'rgba(12,12,14,0.55)',
            duration: 0.35,
            ease: 'power2.out',
          })
        },
      })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) setMobileServicesOpen(false)
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Small close delay so moving the pointer from the "Services" pill down
  // into the dropdown panel (across the little gap between them) doesn't
  // close it mid-move — cleared immediately if the pointer re-enters either.
  const openServicesMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setServicesOpen(true)
  }
  const closeServicesMenu = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150)
  }
  useEffect(() => () => closeTimer.current && clearTimeout(closeTimer.current), [])

  return (
    <>
      <header ref={headerRef} className="fixed top-0 z-[100] w-full py-5">
        <div className="container-x">
          <div
            ref={barRef}
            className="flex items-center justify-between gap-4 rounded-[1.75rem] border bg-black/55 px-5 py-2.5 shadow-nav backdrop-blur-xl transition-colors"
            style={{ borderColor: 'rgba(255,255,255,0.10)' }}
          >
            {/* No decorative blur/glow behind the mark — a crisp logo reads
                more premium than a hazy halo, and it's the one thing on
                the page that should never look soft. */}
            <Logo />

            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) =>
                link.path === '/services' ? (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={openServicesMenu}
                    onMouseLeave={closeServicesMenu}
                    onFocus={openServicesMenu}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget)) setServicesOpen(false)
                    }}
                  >
                    <MotionNavLink
                      to={link.path}
                      whileHover={{ scale: 1.045 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                      className={({ isActive }) =>
                        `group relative rounded-full px-4 py-2 text-fluid-sm font-medium ${
                          isActive ? 'text-white' : 'text-ink-muted hover:text-ink'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive ? (
                            <motion.span
                              layoutId="nav-active-pill"
                              className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent-400 via-primary-500 to-nebula shadow-glow-accent"
                              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            />
                          ) : (
                            <span className="absolute inset-0 -z-10 scale-90 rounded-full bg-accent-400/0 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:bg-accent-400/[0.09] group-hover:opacity-100" />
                          )}
                          <span className="relative inline-flex items-center gap-1">
                            {link.label}
                            <ChevronDown
                              size={13}
                              className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                            />
                          </span>
                        </>
                      )}
                    </MotionNavLink>

                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.97 }}
                          transition={{ duration: 0.22, ease: [0.65, 0, 0.35, 1] }}
                          className="absolute left-1/2 top-full z-50 mt-3 w-[28rem] -translate-x-1/2 rounded-3xl border bg-black/80 p-3 shadow-nav-scrolled backdrop-blur-xl"
                          style={{ borderColor: 'rgba(255,255,255,0.10)' }}
                        >
                          <div className="grid grid-cols-2 gap-1">
                            {services.map((service) => (
                              <Link
                                key={service.id}
                                to={`/services/${service.id}`}
                                onClick={() => setServicesOpen(false)}
                                className="group/item flex items-start gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-white/[0.06]"
                              >
                                <div
                                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                                  style={{ color: service.accent, background: `${service.accent}1a` }}
                                >
                                  <service.icon size={16} strokeWidth={1.75} />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-ink transition-colors group-hover/item:text-white">
                                    {service.title}
                                  </p>
                                  <p className="mt-0.5 truncate text-xs text-ink-faint">{service.short}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-1 border-t border-white/10 pt-1">
                            <Link
                              to="/services"
                              onClick={() => setServicesOpen(false)}
                              className="flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm font-semibold text-primary-300 transition-colors hover:bg-white/[0.06] hover:text-accent-300"
                            >
                              All Services
                              <ArrowUpRight size={14} />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <MotionNavLink
                    key={link.path}
                    to={link.path}
                    whileHover={{ scale: 1.045 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                    className={({ isActive }) =>
                      `group relative rounded-full px-4 py-2 text-fluid-sm font-medium ${
                        isActive ? 'text-white' : 'text-ink-muted hover:text-ink'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? (
                          <motion.span
                            layoutId="nav-active-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent-400 via-primary-500 to-nebula shadow-glow-accent"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        ) : (
                          <span className="absolute inset-0 -z-10 scale-90 rounded-full bg-accent-400/0 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:bg-accent-400/[0.09] group-hover:opacity-100" />
                        )}
                        <span className="relative">{link.label}</span>
                      </>
                    )}
                  </MotionNavLink>
                ),
              )}
            </nav>

            <div className="hidden lg:block">
              <MagneticButton
                as={Link}
                to="/contact"
                className="btn-primary !py-2.5 !px-5 text-fluid-xs"
              >
                Start a Project
                <ArrowUpRight size={15} />
              </MagneticButton>
            </div>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-transform duration-200 active:scale-90 lg:hidden"
              style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.16), rgba(59,109,251,0.14))' }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'close' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {open ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] overflow-hidden backdrop-blur-2xl lg:hidden"
            style={{ background: 'linear-gradient(160deg, #0c0c0c 0%, #10111d 55%, #0c0c0c 100%)' }}
          >
            <div className="relative flex h-full flex-col items-center justify-center gap-7 overflow-y-auto py-16">
              {navLinks.map((link, i) =>
                link.path === '/services' ? (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.07 * i, duration: 0.4 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: railDots[i % railDots.length] }}
                      />
                      <NavLink
                        to={link.path}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `font-display text-fluid-h3 font-semibold ${isActive ? 'gradient-text' : 'text-ink'}`
                        }
                      >
                        {link.label}
                      </NavLink>
                      <button
                        type="button"
                        aria-label="Toggle services submenu"
                        aria-expanded={mobileServicesOpen}
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted"
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col items-center gap-3 overflow-hidden pt-1"
                        >
                          {services.map((service) => (
                            <Link
                              key={service.id}
                              to={`/services/${service.id}`}
                              onClick={() => setOpen(false)}
                              className="text-fluid-base font-medium text-ink-muted transition-colors hover:text-ink"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.07 * i, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: railDots[i % railDots.length] }}
                    />
                    <NavLink
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `font-display text-fluid-h3 font-semibold ${isActive ? 'gradient-text' : 'text-ink'}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ),
              )}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07 * navLinks.length, duration: 0.4 }}
              >
                <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-4">
                  Start a Project
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
