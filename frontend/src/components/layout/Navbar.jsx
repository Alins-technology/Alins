import { useEffect, useRef, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Logo from '../common/Logo'
import MagneticButton from '../common/MagneticButton'
import { navLinks } from '../../data/content'
import { Sparkle, ScribbleCircle } from '../common/Doodles'
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
  const headerRef = useRef(null)
  const barRef = useRef(null)

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
            boxShadow: '0 16px 44px -14px rgba(8,145,168,0.28)',
            borderColor: 'rgba(34,211,238,0.3)',
            backgroundColor: 'rgba(255,255,255,0.92)',
            duration: 0.35,
            ease: 'power2.out',
          })
        },
        onLeaveBack: () => {
          gsap.to(headerRef.current, { paddingTop: '1.25rem', paddingBottom: '1.25rem', duration: 0.35, ease: 'power2.out' })
          gsap.to(barRef.current, {
            boxShadow: '0 8px 30px -12px rgba(8,145,168,0.16)',
            borderColor: 'rgba(8,145,168,0.14)',
            backgroundColor: 'rgba(255,255,255,0.8)',
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
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header ref={headerRef} className="fixed top-0 z-[100] w-full py-5">
        <div className="container-x">
          <div
            ref={barRef}
            className="flex items-center justify-between gap-4 rounded-[1.75rem] border bg-white/80 px-5 py-2.5 shadow-nav backdrop-blur-xl transition-colors"
            style={{ borderColor: 'rgba(8,145,168,0.14)' }}
          >
            {/* No decorative blur/glow behind the mark — a crisp logo reads
                more premium than a hazy halo, and it's the one thing on
                the page that should never look soft. */}
            <Logo />

            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
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
                          className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent-500 via-accent-400 to-primary-500 shadow-glow-accent"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      ) : (
                        <span className="absolute inset-0 -z-10 scale-90 rounded-full bg-accent-400/0 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:bg-accent-400/[0.09] group-hover:opacity-100" />
                      )}
                      <span className="relative">{link.label}</span>
                    </>
                  )}
                </MotionNavLink>
              ))}
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
            style={{ background: 'linear-gradient(160deg, #ffffff 0%, #eafcff 45%, #f3f0ff 100%)' }}
          >
            <span aria-hidden className="pointer-events-none absolute left-[12%] top-[16%] text-accent-400/70">
              <ScribbleCircle className="h-16 w-16" />
            </span>
            <span aria-hidden className="pointer-events-none absolute right-[14%] bottom-[22%] text-primary-500/70">
              <Sparkle className="h-9 w-9 animate-pulse-glow" />
            </span>

            <div className="relative flex h-full flex-col items-center justify-center gap-7">
              {navLinks.map((link, i) => (
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
              ))}
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
