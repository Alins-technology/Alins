import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap, ScrollTrigger } from './gsap'

// Module-level handle so code outside the hook (route-change scroll resets,
// anchor links, etc.) can defer to Lenis's own scrollTo instead of calling
// the native window.scrollTo directly — mixing the two desyncs Lenis's
// internal target position and causes the next wheel event to jump.
let activeLenis = null

/**
 * Scrolls to the top of the page, going through the active Lenis instance
 * when smooth scroll is running (reduced-motion / pre-mount falls back to
 * native scrollTo).
 */
export function scrollToTop() {
  if (activeLenis) {
    activeLenis.scrollTo(0, { immediate: true })
    return
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
}

/**
 * Site-wide inertial smooth scroll, wired directly into GSAP's own ticker so
 * Lenis and every ScrollTrigger instance in the app share one clock instead
 * of fighting over rAF — this is the integration pattern Lenis's own docs
 * recommend for GSAP. Mounted once from `Layout`, never per-page.
 *
 * Skipped entirely under prefers-reduced-motion: native scroll behaves
 * exactly like it always did, and ScrollTrigger still works fine driven by
 * the browser's own scroll events.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    activeLenis = lenis

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      activeLenis = null
    }
  }, [])
}
