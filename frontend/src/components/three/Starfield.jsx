import { useEffect, useRef } from 'react'

/**
 * Fixed, full-viewport ambient starfield — mounted once at the app shell
 * level so it stays put behind every page as you scroll and navigate.
 *
 * Plain canvas2D, deliberately: ~260 static points with a slow twinkle and
 * a tiny pointer-parallax drift is not enough visual payload to justify a
 * WebGL context (and the Three.js bundle weight that comes with it) — this
 * is the one case in the whole app where dropping 3D is the right call.
 * This is the only ambient background layer in the app; the Hero has its
 * own colorful gradient wash instead of a 3D scene.
 *
 * Light-theme note: on a white page a literal "starfield" of white dots
 * would be invisible, so the dots render as soft brand-tinted specks
 * (alternating cool blue / violet) instead of white — same twinkle/parallax
 * behaviour, just visible against a bright background.
 */
export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    let width = window.innerWidth
    let height = window.innerHeight
    let stars = []
    let pointer = { x: 0, y: 0 }
    let raf

    const DOT_COLORS = ['#5c81ff', '#8b5cf6', '#0891a8']

    const buildStars = () => {
      const count = Math.round((width * height) / 9000)
      stars = Array.from({ length: Math.min(count, 260) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.5,
        base: Math.random() * 0.3 + 0.2,
        seed: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.4 + 0.15,
        color: DOT_COLORS[Math.floor(Math.random() * DOT_COLORS.length)],
      }))
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildStars()
    }

    const onPointerMove = (e) => {
      pointer.x = (e.clientX / width - 0.5) * 6
      pointer.y = (e.clientY / height - 0.5) * 4
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height)
      const px = prefersReduced ? 0 : pointer.x
      const py = prefersReduced ? 0 : pointer.y
      for (const s of stars) {
        const twinkle = prefersReduced ? s.base : s.base + Math.sin(t * 0.0006 * s.speed + s.seed) * 0.2
        ctx.globalAlpha = Math.max(twinkle, 0.08)
        ctx.fillStyle = s.color
        ctx.beginPath()
        ctx.arc(s.x + px, s.y + py, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    if (!prefersReduced) window.addEventListener('pointermove', onPointerMove)
    raf = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-40" />
  )
}
