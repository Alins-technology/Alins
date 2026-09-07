import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { Blob, OrbitRing, ParallaxGroup, SceneLights } from './blobParts'

/**
 * The homepage hero's centerpiece — a real WebGL scene (not a CSS gradient
 * pretending to be one): a single colorful distorted icosahedron with two
 * thin orbit rings and a drift of particles, leaning gently toward the
 * pointer. Mounted lazily (see Hero.jsx) so the three.js/R3F bundle only
 * loads for visitors who land on the homepage, and skipped entirely under
 * prefers-reduced-motion.
 *
 * Deliberately just ONE core mesh — the two small stray satellite spheres
 * that used to orbit off to the sides read as random floating "bubbles"
 * rather than part of one composed scene, especially before the dark
 * backdrop underneath has painted. Removed so the whole hero reads as one
 * cohesive object instead of several disconnected balls.
 */
export default function HeroOrb() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <SceneLights colorA="#3b6dfb" colorB="#8b5cf6" />
        <ParallaxGroup strength={0.32}>
          <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.9}>
            <Blob color="#5c81ff" distort={0.42} speed={1.5} scale={1.85} detail={6} />
          </Float>
          <OrbitRing radius={2.35} color="#8b5cf6" tilt={0.7} opacity={0.4} speed={0.1} />
          <OrbitRing radius={2.75} color="#22d3ee" tilt={-0.45} opacity={0.28} speed={-0.07} thickness={0.005} />
        </ParallaxGroup>
        <Sparkles count={40} scale={6.5} size={2.2} speed={0.25} color="#8b5cf6" opacity={0.5} />
      </Suspense>
    </Canvas>
  )
}
