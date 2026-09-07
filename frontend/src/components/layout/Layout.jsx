import { Suspense, lazy } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CustomCursor from '../common/CustomCursor'
import ScrollToTop from '../common/ScrollToTop'
import Starfield from '../three/Starfield'
import GradientBackdrop from '../common/GradientBackdrop'
import FloatingSocials from '../common/FloatingSocials'
import NoiseFilters from '../common/NoiseFilters'
import GuideLines from '../common/GuideLines'
import { useSmoothScroll } from '../../lib/smoothScroll'
import { usePrefersReducedMotion } from '../../lib/motion'

const AmbientOrb = lazy(() => import('../three/AmbientOrb'))

export default function Layout({ children }) {
  useSmoothScroll()
  const reduced = usePrefersReducedMotion()

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <NoiseFilters />
      <CustomCursor />
      <ScrollToTop />
      <GradientBackdrop />
      {!reduced && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-70">
          <Suspense fallback={null}>
            <AmbientOrb />
          </Suspense>
        </div>
      )}
      <Starfield />
      <GuideLines />
      <div className="noise-overlay fixed inset-0 z-[1]" />
      <Navbar />
      <main className="relative z-[2]">{children}</main>
      <Footer />
      <FloatingSocials />
    </div>
  )
}
