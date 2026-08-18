import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const WHATSAPP_NUMBER = '919876543210'
const WHATSAPP_MESSAGE = "Hi Alins Technologies! I'd like to know more about your services."
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
const INSTAGRAM_LINK = 'https://instagram.com/alinstechnologies'

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.017 2c-5.506 0-9.983 4.478-9.983 9.983 0 1.762.464 3.484 1.345 5.002l-1.427 5.215 5.338-1.4a9.936 9.936 0 004.727 1.204h.004c5.505 0 9.983-4.478 9.983-9.983 0-2.669-1.04-5.176-2.929-7.065A9.935 9.935 0 0012.017 2zm5.842 14.276c-.242.68-1.4 1.332-1.929 1.4-.494.065-1.12.093-1.808-.113-.417-.125-.953-.31-1.643-.605-2.891-1.248-4.777-4.152-4.92-4.346-.144-.194-1.176-1.564-1.176-2.983 0-1.418.744-2.115 1.008-2.404.264-.29.577-.362.769-.362.192 0 .385.002.553.01.177.008.415-.067.649.496.242.577.822 1.997.895 2.142.072.144.12.313.024.505-.096.192-.144.313-.288.481-.144.168-.302.376-.432.505-.144.144-.294.302-.126.593.168.29.746 1.233 1.605 1.998 1.104.984 2.036 1.288 2.328 1.432.29.144.46.12.629-.072.168-.192.72-.842.913-1.13.192-.29.385-.242.65-.145.264.096 1.68.793 1.968.937.29.144.48.216.553.337.072.12.072.697-.17 1.377z" />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

/**
 * Two persistent brand-contact buttons (WhatsApp + Instagram), pinned to the
 * bottom corners on every page. Rendered once from Layout — never add these
 * inside individual pages.
 */
export default function FloatingSocials() {
  const [footerOverlap, setFooterOverlap] = useState(0)
  const [hiddenByFooter, setHiddenByFooter] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const tickingRef = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = (e) => setReduceMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    // Dodge the footer: as it scrolls into view, lift the buttons by however
    // much of the footer is showing so they never sit on top of the
    // copyright row / legal links instead of just floating over the page.
    const GAP = 16

    const measure = () => {
      tickingRef.current = false
      const footer = document.querySelector('footer')
      if (!footer) return
      const rect = footer.getBoundingClientRect()

      if (rect.top >= window.innerHeight) {
        // Footer isn't visible yet — sit at the normal base offset.
        setFooterOverlap(0)
        setHiddenByFooter(false)
      } else if (rect.top > 0) {
        // Footer is creeping up from the bottom edge — lift the buttons to
        // clear its top edge instead of sitting on top of its content.
        setFooterOverlap(window.innerHeight - rect.top + GAP)
        setHiddenByFooter(false)
      } else {
        // The footer's top edge has scrolled past the top of the viewport,
        // i.e. the footer now fills the entire screen (common on mobile,
        // where its stacked columns run taller than one viewport). There is
        // no longer a non-overlapping spot to push the buttons to, so fade
        // them out rather than mis-place them off-screen or on top of
        // footer links/copyright text.
        setHiddenByFooter(true)
      }
    }

    const onScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true
      requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const bottomStyle = { bottom: `calc(var(--fs-b) + ${footerOverlap}px)` }

  const shellClass =
    'group fixed z-40 grid grid-cols-[auto_0fr] items-stretch overflow-hidden rounded-full border border-white/10 bg-bg-card/70 backdrop-blur-xl transition-[grid-template-columns,box-shadow,opacity] duration-500 ease-out hover:grid-cols-[auto_1fr] focus-visible:grid-cols-[auto_1fr] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

  const visibilityClass = hiddenByFooter
    ? 'pointer-events-none opacity-0'
    : 'pointer-events-auto opacity-100'

  return (
    <>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Alins Technologies on WhatsApp"
        aria-hidden={hiddenByFooter}
        tabIndex={hiddenByFooter ? -1 : 0}
        style={bottomStyle}
        className={`${shellClass} ${visibilityClass} right-4 [--fs-b:1rem] md:right-6 md:[--fs-b:1.5rem] lg:right-7 ${
          reduceMotion ? '' : 'animate-float-soft hover:[animation-play-state:paused]'
        }`}
      >
        <span
          className="shadow-[0_0_0_1px_rgba(0,233,247,0.08),0_8px_28px_-8px_rgba(0,233,247,0.4)] transition-shadow duration-500 group-hover:shadow-[0_0_0_1px_rgba(0,233,247,0.16),0_10px_36px_-6px_rgba(0,233,247,0.6)] flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#31d268] to-[#128c4c] md:h-14 md:w-14"
        >
          <WhatsAppIcon className="h-5 w-5 text-white md:h-[22px] md:w-[22px]" />
        </span>
        <span className="min-w-0 overflow-hidden">
          <span className="flex h-full items-center gap-1.5 whitespace-nowrap pl-3 pr-5 text-sm font-semibold text-white">
            Chat on WhatsApp
            <ArrowUpRight size={14} className="shrink-0 text-accent" />
          </span>
        </span>
      </a>

      <a
        href={INSTAGRAM_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Alins Technologies on Instagram"
        aria-hidden={hiddenByFooter}
        tabIndex={hiddenByFooter ? -1 : 0}
        style={bottomStyle}
        className={`${shellClass} ${visibilityClass} left-4 [--fs-b:1rem] md:left-6 md:[--fs-b:1.5rem] lg:left-7 ${
          reduceMotion ? '' : 'animate-float-soft-delay hover:[animation-play-state:paused]'
        }`}
      >
        <span
          className="shadow-[0_0_0_1px_rgba(0,233,247,0.08),0_8px_28px_-8px_rgba(0,233,247,0.4)] transition-shadow duration-500 group-hover:shadow-[0_0_0_1px_rgba(0,233,247,0.16),0_10px_36px_-6px_rgba(0,233,247,0.6)] flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] md:h-14 md:w-14"
        >
          <InstagramIcon className="h-5 w-5 text-white md:h-[22px] md:w-[22px]" />
        </span>
        <span className="min-w-0 overflow-hidden">
          <span className="flex h-full items-center gap-1.5 whitespace-nowrap pl-3 pr-5 text-sm font-semibold text-white">
            Follow us on Instagram
            <ArrowUpRight size={14} className="shrink-0 text-accent" />
          </span>
        </span>
      </a>
    </>
  )
}
