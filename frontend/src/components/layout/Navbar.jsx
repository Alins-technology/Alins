import { useEffect, useRef, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Logo from '../common/Logo'
import { navLinks } from '../../data/content'
import { Sparkle, ScribbleCircle } from '../common/Doodles'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const linkAccents = ['#3b6dfb', '#8b5cf6', '#0891a8', '#8b5cf6', '#3b6dfb']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    // A binary "scrolled past 24px" UI state doesn't need React re-renders —
    // GSAP tweens the two elements directly off a ScrollTrigger toggle. The
    // bar is a colorful floating pill from the very first frame (not
    // transparent-until-scroll like a plain header); scrolling just tightens
    // it and deepens the shadow/border for more presence.
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -24',
        onEnter: () => {
          gsap.to(headerRef.current, { paddingTop: '0.6rem', paddingBottom: '0.6rem', duration: 0.3, ease: 'power2.out' })
          gsap.to(barRef.current, {
            boxShadow: '0 12px 40px -12px rgba(59,109,251,0.22)',
            borderColor: 'rgba(59,109,251,0.22)',
            duration: 0.3,
            ease: 'power2.out',
          })
        },
        onLeaveBack: () => {
          gsap.to(headerRef.current, { paddingTop: '1.25rem', paddingBottom: '1.25rem', duration: 0.3, ease: 'power2.out' })
          gsap.to(barRef.current, {
            boxShadow: '0 8px 30px -14px rgba(59,109,251,0.14)',
            borderColor: 'rgba(59,109,251,0.14)',
            duration: 0.3,
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
            className="flex items-center justify-between gap-4 rounded-[1.75rem] border bg-white/85 px-5 py-2.5 shadow-[0_8px_30px_-14px_rgba(59,109,251,0.14)] backdrop-blur-xl"
            style={{ borderColor: 'rgba(59,109,251,0.14)' }}
          >
            <Logo />

            <nav className="hidden items-center lg:flex">
              {navLinks.map((link, i) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `group relative flex flex-col items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span className="relative h-[3px] w-5 overflow-hidden rounded-full bg-transparent">
                        {isActive ? (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute inset-0 rounded-full"
                            style={{ background: `linear-gradient(90deg, ${linkAccents[i % linkAccents.length]}, #8b5cf6)` }}
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        ) : (
                          <span
                            className="absolute inset-0 scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100"
                            style={{ background: linkAccents[i % linkAccents.length], opacity: 0.4 }}
                          />
                        )}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="hidden lg:block">
              <Link to="/contact" className="btn-primary !py-2.5 !px-5 text-xs">
                Start a Project
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
              style={{ background: 'linear-gradient(135deg, rgba(59,109,251,0.12), rgba(139,92,246,0.12))' }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
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
            className="fixed inset-0 z-[99] overflow-hidden backdrop-blur-2xl lg:hidden"
            style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f3f0ff 55%, #eef8fb 100%)' }}
          >
            <span aria-hidden className="pointer-events-none absolute left-[12%] top-[16%] text-primary-500/70">
              <ScribbleCircle className="h-16 w-16" />
            </span>
            <span aria-hidden className="pointer-events-none absolute right-[14%] bottom-[22%] text-accent-deep/70">
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
                    style={{ background: linkAccents[i % linkAccents.length] }}
                  />
                  <NavLink
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `font-display text-3xl font-semibold ${isActive ? 'gradient-text' : 'text-ink'}`
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
