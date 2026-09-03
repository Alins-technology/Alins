import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkle } from './Doodles'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [isTouch, setIsTouch] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')
  const [ready, setReady] = useState(false)
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Parked off-screen until the first real mousemove — otherwise both
    // elements paint at a hardcoded viewport-center guess the instant the
    // page mounts, flashing a stray ring in the middle of the hero before
    // the cursor has actually moved anywhere.
    const pos = { x: -100, y: -100 }
    const ring = { x: pos.x, y: pos.y }

    const move = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      }
      setReady((r) => r || true)
    }

    let raf
    const animate = () => {
      ring.x += (pos.x - ring.x) * 0.15
      ring.y += (pos.y - ring.y) * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(animate)
    }

    // Most hoverable elements just expand the ring; a few (like PortfolioCard,
    // via `data-cursor-label="View"`) additionally swap in a short word so
    // the cursor itself hints at what clicking will do.
    const onOver = (e) => {
      const el = e.target.closest('a, button, [data-cursor-hover]')
      if (!el) return
      setHovering(true)
      setLabel(el.getAttribute('data-cursor-label') || '')
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        setHovering(false)
        setLabel('')
      }
    }

    // A tiny playful surprise: a doodle sparkle pops at every click and
    // fades itself out — purely decorative, capped and self-cleaning so it
    // can never accumulate. Skipped under reduced-motion like every other
    // ambient animation in the app.
    const onClick = (e) => {
      if (reducedMotion) return
      const id = Date.now() + Math.random()
      setSparkles((prev) => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setSparkles((prev) => prev.filter((s) => s.id !== id)), 550)
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    window.addEventListener('click', onClick)
    animate()

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-primary-600 mix-blend-difference hidden transition-opacity duration-300 md:block ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9998] hidden items-center justify-center rounded-full border transition-[width,height,border-color,background-color,opacity] duration-200 ease-out md:flex ${
          ready ? 'opacity-100' : 'opacity-0'
        } ${
          label
            ? 'h-16 w-16 border-accent bg-accent text-white'
            : hovering
              ? 'h-12 w-12 border-accent bg-accent/10'
              : 'h-8 w-8 border-primary-500/50'
        }`}
      >
        {label && <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>}
      </div>
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 1, scale: 0.3, rotate: 0 }}
            animate={{ opacity: 0, scale: 1.4, rotate: 25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="pointer-events-none fixed z-[9997] hidden text-accent md:block"
            style={{ left: s.x, top: s.y, transform: 'translate(-50%, -50%)' }}
          >
            <Sparkle className="h-5 w-5" />
          </motion.span>
        ))}
      </AnimatePresence>
    </>
  )
}
