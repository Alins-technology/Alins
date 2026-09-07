import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Blob, OrbitRing, ParallaxGroup, SceneLights } from './blobParts'

/**
 * The smaller sibling of HeroOrb — one distorted blob + a single orbit
 * ring, used in PageHeader/ServicesIntro/NotFound so every inner page
 * carries the same real-3D visual language as the homepage, not just a
 * flat gradient blob. `color` lets each page read as its own accent while
 * staying part of one system.
 */
export default function PageOrb({ color = '#3b6dfb', ringColor, distort = 0.45 }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5], fov: 40 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <SceneLights colorA={color} colorB={ringColor || color} intensity={0.4} />
        <ParallaxGroup strength={0.22}>
          <Float speed={1.7} rotationIntensity={0.4} floatIntensity={1.1}>
            <Blob color={color} distort={distort} speed={1.6} scale={1.35} detail={5} roughness={0.5} metalness={0.1} opacity={0.7} />
          </Float>
          <OrbitRing radius={1.85} color={ringColor || color} tilt={0.6} opacity={0.35} speed={0.14} />
        </ParallaxGroup>
      </Suspense>
    </Canvas>
  )
}
