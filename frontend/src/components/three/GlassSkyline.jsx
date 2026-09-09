import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { ParallaxGroup, SceneLights } from './blobParts'

// Fast start, soft settle — matches the site's `EASE.standard` cubic feel
// (lib/motion.js) closely enough without pulling GSAP into a per-frame loop.
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

// True on small/touch viewports — trims the scene (fewer towers, lower
// pixel ratio) so it stays cheap on phones. Same shape as
// `usePrefersReducedMotion` in lib/motion.js.
function useIsCompact() {
  const [compact, setCompact] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setCompact(mq.matches)
    const onChange = (e) => setCompact(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return compact
}

// The whole scene sits shifted down inside its group (see GROUP_Y below) so
// only the upper portion of the tallest towers reads behind the headline —
// without this, towers sized to feel substantial up close span the full
// canvas height and collide with the navbar above.
const GROUP_Y = -1.55

// Two earlier passes tried to get "glass" out of physically-based
// transparency/reflection (MeshTransmissionMaterial, then a transparent
// physical material) — both depend on either an internal render pass or an
// HDRI environment map to have anything to reflect, and in this setup
// neither ended up visible, so the towers just read as flat dark shapes.
// A real glass tower photo reads mostly as a REFLECTIVE surface, not a
// see-through one anyway — so instead of simulating that physically, this
// paints it directly: a small canvas texture per tower with a sky-to-glass
// gradient, a soft diagonal light streak, and a curtain-wall window grid,
// used as both the color map and the emissive map so it's clearly visible
// regardless of the scene's lighting.
function useGlassTexture(hexColor) {
  return useMemo(() => {
    const w = 256
    const h = 512
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')

    const base = new THREE.Color(hexColor)
    const light = base.clone().lerp(new THREE.Color('#ffffff'), 0.72)
    const dark = base.clone().lerp(new THREE.Color('#050914'), 0.55)

    const grad = ctx.createLinearGradient(0, 0, 0, h)
    grad.addColorStop(0, `#${light.getHexString()}`)
    grad.addColorStop(0.42, `#${base.getHexString()}`)
    grad.addColorStop(1, `#${dark.getHexString()}`)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    // soft diagonal highlight — the glancing sky-light reflection every
    // glass facade photo shows
    ctx.save()
    ctx.globalAlpha = 0.24
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.moveTo(w * 0.04, 0)
    ctx.lineTo(w * 0.34, 0)
    ctx.lineTo(w * 0.02, h)
    ctx.lineTo(w * -0.28, h)
    ctx.closePath()
    ctx.fill()
    ctx.restore()

    // curtain-wall mullion grid
    ctx.strokeStyle = 'rgba(4,8,18,0.55)'
    ctx.lineWidth = 2
    const cols = 6
    const rows = 16
    for (let c = 1; c < cols; c++) {
      const x = (w / cols) * c
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
      ctx.stroke()
    }
    for (let r = 1; r < rows; r++) {
      const y = (h / rows) * r
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 4
    texture.needsUpdate = true
    return texture
  }, [hexColor])
}

// One glass tower. Rises from below the hero's bottom fade into its resting
// height once on mount (staggered per-building via `delay`), then holds a
// near-imperceptible idle bob. All position math runs in useFrame — no
// per-frame React re-render.
function Building({ x, z, width, depth, height, color, rotY = 0, delay = 0, riseDuration = 1.2 }) {
  const group = useRef()
  const start = useRef(null)
  const groundY = -height / 2 - 1.8 // fully hidden under the section's bottom fade
  const targetY = 0
  const texture = useGlassTexture(color)

  useFrame((state) => {
    if (!group.current) return
    if (start.current === null) start.current = state.clock.getElapsedTime()
    const t = state.clock.getElapsedTime() - start.current - delay
    if (t <= 0) {
      group.current.position.y = groundY
      return
    }
    const p = Math.min(t / riseDuration, 1)
    const eased = easeOutCubic(p)
    const risen = groundY + (targetY - groundY) * eased
    const bob = p >= 1 ? Math.sin(state.clock.getElapsedTime() * 0.6 + delay * 4) * 0.035 : 0
    group.current.position.y = risen + bob
  })

  return (
    <group ref={group} position={[x, groundY, z]} rotation={[0, rotY, 0]}>
      <mesh>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.35}
          metalness={0.4}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={0.32}
        />
      </mesh>
    </group>
  )
}

// Brand palette (matches SceneLights/gradient-text elsewhere) — cycled
// across towers so each glass panel picks up a slightly different tint,
// same trick the reference renders use rather than one flat color.
const PALETTE = ['#3b6dfb', '#8b5cf6', '#22d3ee', '#5c81ff', '#8b5cf6', '#3b6dfb']

// Wider gaps between towers than a first pass gets you — packed edge-to-edge
// they read as one solid wall rather than individual buildings with sky
// visible between them.
const LAYOUT = [
  { x: -4.4, z: -1.4, width: 0.75, depth: 0.75, height: 2.4, rotY: 0.08 },
  { x: -2.7, z: 0.4, width: 0.6, depth: 0.6, height: 3.3, rotY: -0.05 },
  { x: -1.0, z: -0.8, width: 0.7, depth: 0.7, height: 4.1, rotY: 0.04 },
  { x: 1.0, z: 0.3, width: 0.65, depth: 0.65, height: 3.6, rotY: -0.06 },
  { x: 2.8, z: -1.0, width: 0.75, depth: 0.75, height: 2.8, rotY: 0.07 },
  { x: 4.3, z: 0.5, width: 0.55, depth: 0.55, height: 2.1, rotY: -0.03 },
]

/**
 * The hero's skyline centerpiece — a small cluster of glass towers (each
 * face painted with a generated sky-reflection + window-grid texture, see
 * `useGlassTexture`) that rise up from the ground once on load (staggered),
 * then settle into a near-still idle state with a light pointer-parallax
 * tilt on the whole group (see `ParallaxGroup`, shared with HeroOrb). Sits
 * behind the headline (see Hero.jsx) — the section's own bottom gradient
 * fade hides each tower's base, so it reads as rising out of the page, and
 * `GROUP_Y` keeps the tops below the navbar rather than spanning the whole
 * section.
 *
 * Mounted lazily + skipped entirely under prefers-reduced-motion, same
 * convention as HeroOrb/PageOrb/AmbientOrb. Trims itself on small/touch
 * viewports (fewer towers, lower dpr) since it's still a WebGL scene.
 */
export default function GlassSkyline() {
  const compact = useIsCompact()

  const buildings = useMemo(() => {
    const layout = compact ? LAYOUT.filter((_, i) => i % 2 === 0) : LAYOUT
    return layout.map((b, i) => ({
      ...b,
      color: PALETTE[i % PALETTE.length],
      delay: i * 0.12 + (i % 2) * 0.05,
      riseDuration: 1.1 + (i % 3) * 0.15,
    }))
  }, [compact])

  return (
    <Canvas
      dpr={compact ? [1, 1] : [1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: compact ? 'low-power' : 'high-performance' }}
      camera={{ position: [0, 0.6, 7.5], fov: 38 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <SceneLights colorA="#3b6dfb" colorB="#8b5cf6" intensity={1} />
        <group position={[0, GROUP_Y, 0]}>
          <ParallaxGroup strength={0.15}>
            {buildings.map((b, i) => (
              <Building key={i} {...b} />
            ))}
          </ParallaxGroup>
        </group>
      </Suspense>
    </Canvas>
  )
}
