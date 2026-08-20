import Navbar from './Navbar'
import Footer from './Footer'
import CustomCursor from '../common/CustomCursor'
import ScrollToTop from '../common/ScrollToTop'
import Starfield from '../three/Starfield'
import GradientBackdrop from '../common/GradientBackdrop'
import FloatingSocials from '../common/FloatingSocials'
import { useSmoothScroll } from '../../lib/smoothScroll'

export default function Layout({ children }) {
  useSmoothScroll()

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <CustomCursor />
      <ScrollToTop />
      <GradientBackdrop />
      <Starfield />
      <div className="noise-overlay fixed inset-0 z-[1]" />
      <Navbar />
      <main className="relative z-[2]">{children}</main>
      <Footer />
      <FloatingSocials />
    </div>
  )
}
