import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Blob, OrbitRing, ParallaxGroup, SceneLights } from './blobParts'

/**
 * The app-shell's ambient 3D layer — stands in for the fixed looping video
 * a purely-CSS reference design would use. One distorted blob + two thin
 * orbit rings, dark-recolored, fixed full-viewport and mounted once (see
 * Layout.jsx) behind every route so it drifts continuously as you navigate
 * instead of restarting per page. Kept deliberately sparse (one mesh, no
 * particles) since this runs underneath the page-specific HeroOrb/PageOrb
 * scenes too — it's a low, slow presence, not the focal point.
 */
export default function AmbientOrb() {
  return (
    <Canvas
      dpr={[1, 1.25]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <SceneLights colorA="#3b6dfb" colorB="#22d3ee" intensity={0.1} />
        <ParallaxGroup strength={0.12}>
          <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.6}>
            <Blob
              color="#2f4380"
              distort={0.35}
              speed={0.9}
              scale={2.6}
              position={[1.6, 0.4, -1]}
              detail={5}
              roughness={1}
              metalness={0}
              opacity={0.55}
            />
          </Float>
          <OrbitRing radius={3.1} color="#3b6dfb" tilt={0.6} opacity={0.16} speed={0.05} />
          <OrbitRing radius={3.6} color="#22d3ee" tilt={-0.4} opacity={0.1} speed={-0.035} thickness={0.004} />
        </ParallaxGroup>
      </Suspense>
    </Canvas>
  )
}
