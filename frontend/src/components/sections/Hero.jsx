import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Spacecraft from '../common/Spacecraft'
import MagneticButton from '../common/MagneticButton'
import { gsap } from '../../lib/gsap'

export default function Hero() {
  const craftRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !craftRef.current) return

    // Autonomous idle drift — its own clock (repeat/yoyo), completely
    // independent of scroll position or wheel events. This is the rocket's
    // ONLY animation owner; nothing else touches its transform.
    const ctx = gsap.context(() => {
      gsap.to(craftRef.current, {
        y: -20,
        x: -8,
        rotate: -3,
        duration: 7,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    // The top padding here is real, unconditional space reserved above the
    // content — not part of anything that gets vertically centered — so the
    // heading is guaranteed clear breathing room under the fixed navbar
    // regardless of viewport height or content length.
    <section className="relative flex min-h-screen flex-col overflow-hidden pt-36 pb-16 sm:pt-40 lg:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[8%] h-[65vh] w-[65vh] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,233,247,0.10) 0%, rgba(0,233,247,0) 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-[28%] h-[45vh] w-[45vh] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,109,251,0.12) 0%, rgba(59,109,251,0) 70%)' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/10 via-transparent to-bg" />

      <div className="container-x relative z-10 flex flex-1 items-center">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 xl:gap-16">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              Web · App · Marketing · Design
            </motion.div>

            <div className="mt-6 max-w-xl lg:max-w-none">
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-[13vw] font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-[4.4rem] xl:text-7xl"
              >
                We build brands
                <br />
                that reach
                <br />
                <span className="gradient-text">escape velocity.</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mt-6 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              A full-service digital agency blending striking design, solid engineering and
              data-driven marketing to help ambitious brands launch faster and fly further.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton as={Link} to="/contact" className="btn-primary">
                Start a Project
                <ArrowUpRight size={16} />
              </MagneticButton>
              <MagneticButton as={Link} to="/portfolio" className="btn-outline">
                View Our Work
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-14 flex items-center gap-10 border-t border-bg-border pt-8"
            >
              {[
                ['120+', 'Projects'],
                ['60+', 'Clients'],
                ['8+', 'Years'],
              ].map(([num, label]) => (
                <div key={label}>
                  <p className="font-display text-2xl font-bold text-white">{num}</p>
                  <p className="text-xs uppercase tracking-widest text-ink-faint">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — the rocket's home: an orbit system it belongs
              to, not a stray icon in empty space. Hidden below lg, where
              there isn't room to give it a real composition. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden aspect-square w-full lg:block"
          >
            <HeroOrbit craftRef={craftRef} />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 mx-auto hidden flex-col items-center gap-3 text-ink-faint md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px animate-pulse-glow bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  )
}

/**
 * An abstract orbit composition anchoring the hero's right side — concentric
 * rings, a dashed trajectory arc and a couple of glass UI fragments, with
 * the spacecraft riding the outer ring instead of floating in isolation.
 * Pure CSS/SVG, GPU-only motion, no per-frame JS beyond the craft's own
 * GSAP tween (owned entirely by the parent).
 */
function HeroOrbit({ craftRef }) {
  return (
    <div className="relative h-full w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle at 55% 45%, rgba(0,233,247,0.14), transparent 65%)' }}
      />

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" fill="none">
        <circle cx="200" cy="200" r="176" stroke="#00e9f7" strokeOpacity="0.14" />
        <circle cx="200" cy="200" r="132" stroke="#3b6dfb" strokeOpacity="0.16" />
        <circle
          cx="200"
          cy="200"
          r="176"
          stroke="#00e9f7"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeDasharray="4 10"
          strokeLinecap="round"
          transform="rotate(-30 200 200)"
        />
        <circle cx="200" cy="24" r="3" fill="#00e9f7" fillOpacity="0.8" />
        <circle cx="60" cy="290" r="2" fill="#8aa6ff" fillOpacity="0.6" />
        <circle cx="340" cy="150" r="2" fill="#7df3ff" fillOpacity="0.6" />
      </svg>

      <div
        ref={craftRef}
        className="pointer-events-none absolute left-[54%] top-[10%] -translate-x-1/2"
      >
        <Spacecraft size={92} tone="accent" />
      </div>

      <div className="absolute left-[6%] top-[54%] w-[42%] animate-float rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl shadow-card">
        <div className="space-y-2">
          <div className="h-1.5 w-2/3 rounded-full bg-accent/50" />
          <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
        </div>
      </div>

      <div className="absolute bottom-[10%] right-[8%] w-[34%] animate-float-delay rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl shadow-card">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-300" />
          <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  )
}
