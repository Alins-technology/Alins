import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [isTouch, setIsTouch] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

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

    const onOver = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovering(true)
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovering(false)
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    animate()

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-accent mix-blend-difference hidden transition-opacity duration-300 md:block ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9998] hidden items-center justify-center rounded-full border transition-[width,height,border-color,opacity] duration-200 ease-out md:flex ${
          ready ? 'opacity-100' : 'opacity-0'
        } ${hovering ? 'h-12 w-12 border-accent bg-accent/10' : 'h-8 w-8 border-primary-400/60'}`}
      />
    </>
  )
}
