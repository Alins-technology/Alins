import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'

/**
 * Shared low-level 3D primitives used by both HeroOrb (big, homepage) and
 * PageOrb (small, inner-page headers) — kept in one file so the two scenes
 * read as the same visual language instead of two different one-off blobs.
 */

// A soft, organic distorted sphere — the site's recurring 3D motif.
// `roughness`/`metalness` are exposed (not just hardcoded) because a glossy
// surface under a strong point light throws a hard specular hotspot — right
// for HeroOrb/PageOrb where the blob IS the focal point, wrong for a fixed
// ambient backdrop sitting low behind every page's content (AmbientOrb passes
// a matte roughness/no metalness so it reads as a soft glow, not a shiny
// ball with a bright white spot burned into one corner of the screen).
export function Blob({
  color,
  distort = 0.4,
  speed = 1.4,
  scale = 1,
  position = [0, 0, 0],
  detail = 5,
  roughness = 0.2,
  metalness = 0.25,
  opacity = 0.92,
}) {
  const mesh = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!mesh.current) return
    mesh.current.rotation.x = t * 0.06
    mesh.current.rotation.y = t * 0.09
  })
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <icosahedronGeometry args={[1, detail]} />
      <MeshDistortMaterial
        color={color}
        distort={distort}
        speed={speed}
        roughness={roughness}
        metalness={metalness}
        transparent
        opacity={opacity}
      />
    </mesh>
  )
}

// A thin wireframe ring slowly orbiting around a blob — the "orbit" accent
// that ties back into the site's rocket/space copy (Preloader, NotFound).
export function OrbitRing({ radius = 1.7, color = '#3b6dfb', tilt = 0.6, thickness = 0.006, opacity = 0.4, speed = 0.12 }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.z += delta * speed
  })
  return (
    <mesh ref={ref} rotation={[tilt, 0.3, 0]}>
      <torusGeometry args={[radius, thickness, 16, 120]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

// Wraps children in a group that gently leans toward the pointer — cheap
// per-frame lerp, no physics — for a subtle "reacting to you" feel.
export function ParallaxGroup({ children, strength = 0.28, damp = 0.06 }) {
  const group = useRef()
  useFrame((state) => {
    if (!group.current) return
    const { x, y } = state.pointer
    group.current.rotation.y += ((x * strength) - group.current.rotation.y) * damp
    group.current.rotation.x += ((-y * strength * 0.6) - group.current.rotation.x) * damp
  })
  return <group ref={group}>{children}</group>
}

// `intensity` scales the whole rig at once — HeroOrb/PageOrb want the
// default (1) so their blob reads as glossy/eye-catching; AmbientOrb passes
// a much smaller value since its point lights would otherwise throw a hard
// specular hotspot straight through every glass card fixed above it.
export const SceneLights = ({ colorA = '#3b6dfb', colorB = '#8b5cf6', intensity = 1 }) => (
  <>
    <ambientLight intensity={0.7 * intensity} />
    <directionalLight position={[3, 4, 5]} intensity={0.8 * intensity} />
    <pointLight position={[-3, -2, 2]} color={colorA} intensity={30 * intensity} distance={12} />
    <pointLight position={[3, 2, -2]} color={colorB} intensity={26 * intensity} distance={12} />
  </>
)
