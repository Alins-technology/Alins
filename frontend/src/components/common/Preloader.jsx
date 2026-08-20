import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import mark from '../../assets/alins-mark.png'

const STATUS_MESSAGES = [
  'Initializing Alins...',
  'Loading digital experience...',
  'Preparing creative systems...',
  'Building your experience...',
]
const READY_MESSAGE = 'Welcome to Alins.'

const RING_RADIUS = 46

function useStars(count) {
  // Generated once per mount — a cheap DOM/CSS starfield, not a WebGL scene,
  // since the preloader should stay lightweight.
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 1.6 + 0.6,
        delay: Math.random() * 4,
        duration: Math.random() * 2.5 + 2.8,
      })),
    [count],
  )
}

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const stars = useStars(42)

  // Simulated progress — same increment-until-100 approach as before (no
  // resource-loading signal exists to hook into yet), just re-timed a touch
  // so the new entrance/ring/status choreography has room to read.
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return Math.min(100, p + Math.floor(Math.random() * 7) + 3)
      })
    }, 140)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress < 100) return
    const readyTimer = setTimeout(() => setReady(true), 150)
    const hideTimer = setTimeout(() => setVisible(false), 150 + 480)
    return () => {
      clearTimeout(readyTimer)
      clearTimeout(hideTimer)
    }
  }, [progress])

  const statusIndex = Math.min(
    STATUS_MESSAGES.length - 1,
    Math.floor((progress / 100) * STATUS_MESSAGES.length),
  )
  const statusMessage = progress >= 100 ? READY_MESSAGE : STATUS_MESSAGES[statusIndex]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          role="status"
          aria-live="polite"
          aria-label={`Loading Alins Technologies, ${progress}%`}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-bg"
        >
          {/* ---- ambient space background: stars, haze, faint orbits ---- */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(0,233,247,0.10) 0%, rgba(0,233,247,0) 70%)' }}
            />
            <div
              className="absolute -left-24 -top-24 h-72 w-72 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(59,109,251,0.14) 0%, rgba(59,109,251,0) 70%)' }}
            />
            <div
              className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0) 70%)' }}
            />
            <svg
              className="absolute left-1/2 top-1/2 h-[140vmin] w-[140vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
              viewBox="0 0 800 800"
              fill="none"
            >
              <ellipse cx="400" cy="400" rx="380" ry="220" stroke="#00e9f7" strokeWidth="1" />
              <ellipse cx="400" cy="400" rx="260" ry="340" stroke="#3b6dfb" strokeWidth="1" />
            </svg>
            {stars.map((s) => (
              <span
                key={s.id}
                className="absolute rounded-full bg-primary-300 animate-twinkle"
                style={{
                  left: `${s.left}%`,
                  top: `${s.top}%`,
                  width: s.size,
                  height: s.size,
                  animationDelay: `${s.delay}s`,
                  animationDuration: `${s.duration}s`,
                }}
              />
            ))}
          </div>

          {/* ---------------------------- content ---------------------------- */}
          <div className="relative flex flex-col items-center px-6">
            {/* logo stage: glow + orbital ring + logo + light trace + pulse */}
            <div className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
              <motion.div
                aria-hidden
                className="absolute -inset-4 rounded-full blur-2xl"
                style={{ background: 'radial-gradient(circle, rgba(0,233,247,0.5) 0%, rgba(0,233,247,0) 72%)' }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={
                  ready
                    ? { opacity: 0, scale: 2.4, transition: { duration: 0.7, ease: 'easeOut' } }
                    : {
                        opacity: [0, 0.85, 0.55, 0.75, 0.55],
                        scale: [0.6, 1.05, 1, 1.06, 1],
                        transition: { duration: 3, delay: 0.2, ease: 'easeInOut', repeat: Infinity },
                      }
                }
              />

              <svg aria-hidden viewBox="0 0 100 100" className="absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)]">
                <motion.circle
                  cx="50"
                  cy="50"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="#00e9f7"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeOpacity="0.55"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: ready ? 0.9 : 0.55 }}
                  transition={{ pathLength: { duration: 1.3, delay: 0.15, ease: 'easeInOut' }, opacity: { duration: 0.4 } }}
                />
              </svg>

              <motion.img
                src={mark}
                alt=""
                className="relative h-full w-full object-contain"
                style={{ filter: 'drop-shadow(0 0 16px rgba(0,233,247,0.55))' }}
                initial={{ opacity: 0, scale: 0.88, filter: 'blur(6px) drop-shadow(0 0 0px rgba(0,233,247,0))' }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px) drop-shadow(0 0 16px rgba(0,233,247,0.55))',
                }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />

              {/* thin cyan light tracing the logo's own silhouette */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden"
                style={{
                  WebkitMaskImage: `url(${mark})`,
                  maskImage: `url(${mark})`,
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                }}
              >
                <motion.div
                  className="h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"
                  initial={{ x: '-140%' }}
                  animate={{ x: '220%' }}
                  transition={{ duration: 0.9, delay: 0.4, ease: 'easeInOut' }}
                />
              </div>

              {/* a single light pulse rippling outward once settled */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full border border-accent"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: [0, 0.5, 0], scale: [0.85, 1.35] }}
                transition={{ duration: 0.9, delay: 1.1, ease: 'easeOut' }}
              />
            </div>

            {/* status / progress ↔ ready headline */}
            <div className="mt-8 flex min-h-[6.5rem] flex-col items-center sm:mt-10">
              <AnimatePresence mode="wait">
                {!ready ? (
                  <motion.div
                    key="loading-ui"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.25 } }}
                    className="flex flex-col items-center gap-3"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-ink-faint sm:text-xs">
                      Initializing Experience
                    </span>

                    <div className="relative h-[3px] w-48 overflow-hidden rounded-full bg-bg-border sm:w-64 md:w-72">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary-500 via-accent to-nebula transition-[width] duration-150 ease-out"
                        style={{
                          width: `${progress}%`,
                          boxShadow: '0 0 10px rgba(8,145,168,0.45), 0 0 2px rgba(8,145,168,0.6)',
                        }}
                      />
                      <motion.div
                        aria-hidden
                        className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-white/80 to-transparent mix-blend-screen"
                        animate={{ left: ['-12%', '112%'] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.35 }}
                      />
                    </div>

                    <span className="font-mono text-xs tracking-[0.15em] text-accent tabular-nums sm:text-sm">
                      {progress}%
                    </span>

                    <div className="relative h-4">
                      {/* Overlapping (not mode="wait") so the outgoing line
                          fades under the incoming one — a true crossfade
                          with no blank gap between messages. */}
                      <AnimatePresence>
                        <motion.p
                          key={statusMessage}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.45, ease: 'easeInOut' }}
                          className="absolute inset-x-0 text-[11px] uppercase tracking-[0.2em] text-ink-muted sm:text-xs"
                        >
                          {statusMessage}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ready-ui"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="flex flex-col items-center gap-2"
                  >
                    <span className="text-sm font-semibold uppercase tracking-[0.3em] text-ink sm:text-base">
                      Alins Technologies
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.35em] text-accent sm:text-xs">
                      Ready to launch
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
