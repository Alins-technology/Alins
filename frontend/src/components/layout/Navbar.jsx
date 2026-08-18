import { useEffect, useRef, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Logo from '../common/Logo'
import { navLinks } from '../../data/content'
import { gsap, ScrollTrigger } from '../../lib/gsap'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    // A binary "scrolled past 24px" UI state doesn't need React re-renders —
    // GSAP tweens the two elements directly off a ScrollTrigger toggle.
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -24',
        onEnter: () => {
          gsap.to(headerRef.current, { paddingTop: '0.75rem', paddingBottom: '0.75rem', duration: 0.3, ease: 'power2.out' })
          gsap.to(barRef.current, {
            backgroundColor: 'rgba(10,8,23,0.8)',
            borderColor: 'rgba(30,26,53,1)',
            boxShadow: '0 10px 40px -12px rgba(0,0,0,0.6)',
            duration: 0.3,
            ease: 'power2.out',
          })
        },
        onLeaveBack: () => {
          gsap.to(headerRef.current, { paddingTop: '1.5rem', paddingBottom: '1.5rem', duration: 0.3, ease: 'power2.out' })
          gsap.to(barRef.current, {
            backgroundColor: 'rgba(10,8,23,0)',
            borderColor: 'rgba(30,26,53,0)',
            boxShadow: '0 0 0 rgba(0,0,0,0)',
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
      <header ref={headerRef} className="fixed top-0 z-[100] w-full py-6">
        <div className="container-x">
          <div
            ref={barRef}
            className="flex items-center justify-between rounded-2xl border border-transparent px-5 py-3"
          >
            <Logo />

            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-ink-muted hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-white/[0.06] ring-1 ring-primary-500/30"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bg-border text-white lg:hidden"
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
            className="fixed inset-0 z-[99] bg-bg/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `font-display text-3xl font-semibold ${
                        isActive ? 'gradient-text' : 'text-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * navLinks.length, duration: 0.4 }}
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
