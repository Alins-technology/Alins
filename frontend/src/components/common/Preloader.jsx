import { useEffect, useMemo, useState } from 'react'
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useTransform,
  useMotionTemplate,
} from 'framer-motion'

/**
 * Cinematic liquid-typography preloader — a single oversized ALINS wordmark
 * fills up like liquid as the site loads, then the loader itself opens up
 * into the homepage (already mounted underneath) instead of just fading out.
 *
 * Design direction: this must read as the SAME brand as the light homepage
 * underneath it, not a separate dark-mode moment. Colors below are all
 * existing homepage tokens — `bg.soft` is the same very-light cool-white
 * already used as a section background elsewhere (Stats, Footer, Marquee,
 * Team); the base wordmark uses `ink`, the site's own deep-navy text color;
 * the liquid is the exact same accent→primary→nebula (cyan → blue → violet)
 * gradient as the homepage's `.gradient-text` utility, just laid out
 * left-to-right the same way that utility does. Wordmark typography is
 * Playfair Display — a genuine editorial serif, loaded in index.html but
 * scoped to just this component via inline `fontFamily` rather than the
 * shared `font-display` token, so it doesn't change any other heading
 * site-wide. The small "loading…" label uses the project's existing Inter
 * (`font-sans`) in the same muted navy (`ink-muted`) as homepage body copy.
 */

// ---- centralized timing / tuning ------------------------------------------
// Total runtime is intro + progress + hold + reveal ≈ 0.5 + 3.7 + 0.15 + 0.7 = ~4.5s.
const INTRO_DURATION = 0.5
const PROGRESS_DURATION = 3.7
const HOLD_DURATION = 0.15
const REVEAL_DURATION = 0.7

// Sophisticated, unhurried curves — different eases for different feels.
const EASE_STANDARD = [0.65, 0, 0.35, 1]
const EASE_FINAL = [0.83, 0, 0.17, 1]
const EASE_REVEAL = [0.76, 0, 0.24, 1]

// 0 -> 10 (slow) -> 75 (steady) -> 90 (slower) -> 100 (deliberate).
const PROGRESS_KEYFRAMES = [0, 10, 75, 90, 100]
const PROGRESS_TIMES = [0, 0.1, 0.75, 0.9, 1]
const PROGRESS_EASE = [EASE_STANDARD, EASE_STANDARD, EASE_FINAL, EASE_FINAL]

// SVG wordmark geometry. WAVE_TILE must stay equal to VIEW_W — the
// `wave-drift-*` keyframes in tailwind.config.js shift by exactly -1000px to
// match this tile width for a seamless horizontal loop.
const VIEW_W = 1000
const VIEW_H = 320
const BASELINE_Y = 224
const FONT_SIZE = 252
const WORDMARK_FONT = "'Playfair Display', Georgia, 'Times New Roman', serif"
const LETTER_TOP_Y = -30
const LETTER_BOTTOM_Y = 270
const WAVE_TILE = VIEW_W
const WAVE_AMPLITUDE_BACK = 8
const WAVE_AMPLITUDE_FRONT = 5

/** Two seamlessly-tileable wavy fill shapes (back = wider/slower, front = tighter/faster). */
function buildWavePath(tileWidth, amplitude, cycles, bottomY) {
  const totalWidth = tileWidth * 2
  const samples = 64
  let d = `M0,${bottomY} `
  for (let i = 0; i <= samples; i++) {
    const x = (totalWidth * i) / samples
    const y = Math.sin((x / tileWidth) * cycles * Math.PI * 2) * amplitude
    d += `L${x.toFixed(1)},${y.toFixed(1)} `
  }
  d += `L${totalWidth},${bottomY} Z`
  return d
}

/** Just the crest line of the front wave — traced separately for a thin light-catching highlight. */
function buildWaveCrest(tileWidth, amplitude, cycles) {
  const totalWidth = tileWidth * 2
  const samples = 64
  let d = ''
  for (let i = 0; i <= samples; i++) {
    const x = (totalWidth * i) / samples
    const y = Math.sin((x / tileWidth) * cycles * Math.PI * 2) * amplitude
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)} `
  }
  return d
}

export default function Preloader() {
  const [phase, setPhase] = useState('intro') // intro -> loading -> revealing -> done
  const [displayProgress, setDisplayProgress] = useState(0)

  const progressMV = useMotionValue(0)
  const clipPercent = useMotionValue(150)
  const clipPath = useMotionTemplate`circle(${clipPercent}% at 50% 50%)`
  const liquidY = useTransform(progressMV, [0, 100], [LETTER_BOTTOM_Y, LETTER_TOP_Y])

  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  const backWave = useMemo(() => buildWavePath(WAVE_TILE, WAVE_AMPLITUDE_BACK, 2, 400), [])
  const frontWave = useMemo(() => buildWavePath(WAVE_TILE, WAVE_AMPLITUDE_FRONT, 3, 400), [])
  const frontCrest = useMemo(() => buildWaveCrest(WAVE_TILE, WAVE_AMPLITUDE_FRONT, 3), [])

  // Lock scroll while the loader is up — the homepage is already mounted
  // underneath, this just keeps it from being scrollable/visible-behind.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    const wait = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000))

    const run = async () => {
      await wait(reducedMotion ? 0.15 : INTRO_DURATION)
      if (cancelled) return
      setPhase('loading')

      await new Promise((resolve) => {
        animate(progressMV, PROGRESS_KEYFRAMES, {
          duration: reducedMotion ? 1.2 : PROGRESS_DURATION,
          times: PROGRESS_TIMES,
          ease: reducedMotion ? 'easeInOut' : PROGRESS_EASE,
          onComplete: resolve,
        })
      })
      if (cancelled) return

      await wait(HOLD_DURATION)
      if (cancelled) return
      setPhase('revealing')

      await new Promise((resolve) => {
        animate(clipPercent, 0, {
          duration: reducedMotion ? 0.4 : REVEAL_DURATION,
          ease: reducedMotion ? 'easeInOut' : EASE_REVEAL,
          onComplete: resolve,
        })
      })
      if (cancelled) return
      setPhase('done')
    }

    run()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Only re-render the percentage label when the rounded integer changes —
  // the SVG liquid itself is driven straight off the motion value below.
  useEffect(() => {
    const unsubscribe = progressMV.on('change', (v) => {
      const rounded = Math.round(v)
      setDisplayProgress((prev) => (prev === rounded ? prev : rounded))
    })
    return unsubscribe
  }, [progressMV])

  const visible = phase !== 'done'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label={`Loading Alins, ${displayProgress}%`}
          className="fixed inset-0 z-[10000] overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {/* light backdrop — same soft cool-white as the homepage's own
              section background, so it wipes open into the homepage below
              with no dark→light jump — wipes open via the circular clip-path
              on reveal */}
          <motion.div aria-hidden className="absolute inset-0 bg-bg-soft" style={{ clipPath }} />

          {/* wordmark, kept as a separate layer so it can scale/fade on its
              own pace instead of getting cut off by the backdrop's clip */}
          <motion.div
            aria-hidden
            className="relative flex h-full w-full items-center justify-center px-6"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 10, scale: reducedMotion ? 1 : 0.97 }}
            animate={{
              // Visible only during 'loading' — faded in from 'intro', then
              // faded back out (alongside the scale-up) into 'revealing' so
              // it doesn't just sit there while the backdrop wipes open.
              opacity: phase === 'loading' ? 1 : 0,
              y: 0,
              scale: phase === 'revealing' && !reducedMotion ? 1.08 : 1,
            }}
            transition={{
              duration: phase === 'revealing' ? REVEAL_DURATION : INTRO_DURATION,
              ease: EASE_STANDARD,
            }}
          >
            <div
              className="relative w-full"
              style={{ maxWidth: 'clamp(280px, 85vw, 1400px)' }}
            >
              <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block w-full" role="presentation">
                <defs>
                  <clipPath id="alinsWordClip">
                    <text
                      x={VIEW_W / 2}
                      y={BASELINE_Y}
                      textAnchor="middle"
                      fontSize={FONT_SIZE}
                      fontWeight="900"
                      letterSpacing={-3}
                      style={{ fontFamily: WORDMARK_FONT }}
                    >
                      ALINS
                    </text>
                  </clipPath>

                  {/* subtle top-lit tonal variation for the unfilled base letters —
                      a deep-navy tint (matching the homepage's own `ink` text
                      color), not flat grey, so they read as translucent
                      material rather than a solid-color font. */}
                  <linearGradient id="alinsBaseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(21,22,46,0.16)" />
                    <stop offset="100%" stopColor="rgba(21,22,46,0.06)" />
                  </linearGradient>

                  {/* cyan → blue → violet liquid — the exact same stops as the
                      homepage's `.gradient-text` utility (Hero's headline),
                      laid out the same left-to-right way, so the loader and
                      the homepage read as one continuous identity. */}
                  <linearGradient id="alinsLiquidGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="52%" stopColor="#3b6dfb" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>

                {/* base (unfilled) wordmark — always visible, muted, subtly graded */}
                <text
                  x={VIEW_W / 2}
                  y={BASELINE_Y}
                  textAnchor="middle"
                  fontSize={FONT_SIZE}
                  fontWeight="900"
                  letterSpacing={-3}
                  style={{ fontFamily: WORDMARK_FONT }}
                  fill="url(#alinsBaseGradient)"
                  stroke="rgba(21,22,46,0.22)"
                  strokeWidth={1}
                >
                  ALINS
                </text>

                {/* liquid — clipped to the exact letter shapes, never behind them */}
                <g clipPath="url(#alinsWordClip)">
                  <motion.g style={{ y: liquidY }}>
                    <g
                      className={reducedMotion ? undefined : 'animate-wave-drift-back'}
                      style={{ opacity: 0.5 }}
                    >
                      <path d={backWave} fill="url(#alinsLiquidGradient)" />
                    </g>
                    <g className={reducedMotion ? undefined : 'animate-wave-drift-front'}>
                      <path d={frontWave} fill="url(#alinsLiquidGradient)" />
                      {/* thin, restrained highlight tracing the crest — a hint
                          of light on the surface, not a glow */}
                      <path
                        d={frontCrest}
                        fill="none"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth={2}
                        strokeLinecap="round"
                      />
                    </g>
                  </motion.g>
                </g>
              </svg>

              <span
                className="absolute bottom-[7%] right-[1%] font-sans text-[clamp(0.6rem,0.48rem+0.55vw,0.85rem)] font-medium uppercase tracking-[0.32em] text-ink-muted tabular-nums"
              >
                loading&hellip; {displayProgress}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
