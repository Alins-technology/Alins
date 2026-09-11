/**
 * A small set of hand-sketched decorative marks — the "personality" layer
 * sprinkled near headlines/CTAs to keep the light theme from reading as a
 * plain corporate template. Pure inline SVG, single-color `currentColor`
 * strokes so each usage sets its own brand-token color via `text-*`, sized
 * via the wrapping element. All `aria-hidden` — decoration only, never
 * conveys information on its own.
 *
 * Every component below also spreads `...props` onto the `<svg>` — callers
 * that need a specific accent color pass `style={{ color: '#hex' }}`
 * (`currentColor` then resolves to it) instead of relying on `className`
 * alone, which only every carried Tailwind sizing/positioning, never color.
 */

export function Squiggle({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 120 24" fill="none" aria-hidden className={className} {...props}>
      <path
        d="M2 18C10 6 18 6 26 14C34 22 42 22 50 12C58 2 66 2 74 12C82 22 90 22 98 12C104.667 4.667 111.333 4.667 118 12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Sparkle({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={className} {...props}>
      <path
        d="M20 2C20.8 12 21 20.5 38 20C21 19.5 20.8 28 20 38C19.2 28 19 19.5 2 20C19 20.5 19.2 12 20 2Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ScribbleCircle({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden className={className} {...props}>
      <path
        d="M50 8C71 6 92 22 90 46C92 70 71 92 48 90C25 93 6 74 10 50C5 27 27 9 50 8Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function WavyUnderline({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 200 16" fill="none" aria-hidden className={className} preserveAspectRatio="none" {...props}>
      <path
        d="M2 10C18 2 34 2 50 10C66 18 82 18 98 10C114 2 130 2 146 10C162 18 178 18 198 9"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function PlusCluster({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" aria-hidden className={className} {...props}>
      <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M48 22V32M43 27H53" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 44V56M16 50H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function Blob({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden className={className} {...props}>
      <path
        d="M32 10C50 4 74 12 84 30C94 48 88 68 70 80C52 92 28 90 14 74C0 58 2 34 16 20C21 15 26 12 32 10Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Zigzag({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 100 30" fill="none" aria-hidden className={className} preserveAspectRatio="none" {...props}>
      <path
        d="M2 26L18 6L34 26L50 6L66 26L82 6L98 22"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Loop({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 80 60" fill="none" aria-hidden className={className} {...props}>
      <path
        d="M4 40C10 12 34 4 46 14C58 24 50 42 36 40C22 38 22 20 38 16C54 12 72 22 76 40"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function DashArrow({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 90 60" fill="none" aria-hidden className={className} {...props}>
      <path
        d="M4 50C24 18 46 6 70 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 8"
      />
      <path d="M56 6L72 10L64 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
