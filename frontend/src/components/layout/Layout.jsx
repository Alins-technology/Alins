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

// The fixed ambient 3D layer (AmbientOrb — one drifting blob behind every
// page) used to sit here. Dropped: even with its orbit rings already
// removed, the blob mesh's own translucent silhouette still read as a
// stray curved line/circle cutting across content — most visible over the
// services pages' sparser dark sections, but present (just less noticeable)
// on every page since it was fixed full-viewport. GradientBackdrop +
// Starfield stay as the site's ambient backdrop.

export default function Layout({ children }) {
  useSmoothScroll()

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <NoiseFilters />
      <CustomCursor />
      <ScrollToTop />
      <GradientBackdrop />
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
