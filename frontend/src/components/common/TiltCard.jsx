import { useRef } from 'react'

/**
 * Wraps children in a subtle pointer-tracking 3D tilt + glare — the "modern
 * interactive card" touch. CSS-transform only (no per-frame JS loop): a
 * single transform string gets written straight to the element's style on
 * `pointermove`, so there's nothing running while the pointer is idle.
 * Skipped under prefers-reduced-motion and on touch (no hover state to
 * track there anyway).
 */
export default function TiltCard({ children, className = '', maxTilt = 8, glare = true }) {
  const ref = useRef(null)
  const glareRef = useRef(null)

  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  const handleMove = (e) => {
    if (reducedMotion || isTouch || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * maxTilt * 2
    const rotateX = (0.5 - py) * maxTilt * 2
    ref.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.5), transparent 60%)`
      glareRef.current.style.opacity = '1'
    }
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = ''
    if (glareRef.current) glareRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
        />
      )}
    </div>
  )
}
