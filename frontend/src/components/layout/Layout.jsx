import Navbar from './Navbar'
import Footer from './Footer'
import CustomCursor from '../common/CustomCursor'
import ScrollToTop from '../common/ScrollToTop'
import Starfield from '../three/Starfield'
import FloatingSocials from '../common/FloatingSocials'

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <CustomCursor />
      <ScrollToTop />
      <Starfield />
      <div className="noise-overlay fixed inset-0 z-[1]" />
      <Navbar />
      <main className="relative z-[2]">{children}</main>
      <Footer />
      <FloatingSocials />
    </div>
  )
}
