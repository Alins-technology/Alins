import { forwardRef } from 'react'

/**
 * A single, restrained spacecraft silhouette used across the site as a
 * storytelling device — never the hero. Pure line-art + one soft gradient
 * fill, no bevels/chrome/cartoon detailing. The parent owns all motion via
 * GSAP acting on the forwarded ref (translate/rotate/opacity/scale only —
 * no spin, no bounce). `glow` renders a restrained blurred engine trail
 * behind the nose using a single gradient div, not a particle system.
 */
const Spacecraft = forwardRef(function Spacecraft(
  { className = '', size = 120, glow = true, tone = 'primary', style },
  ref,
) {
  const glowColor = tone === 'nebula' ? '#8b5cf6' : tone === 'accent' ? '#00e9f7' : '#3b6dfb'

  return (
    <div ref={ref} className={`relative ${className}`} style={{ width: size, height: size * 1.9, ...style }}>
      {glow && (
        <div
          aria-hidden
          className="absolute left-1/2 top-[62%] -z-10 h-[70%] w-[22%] -translate-x-1/2 rounded-full blur-2xl"
          style={{
            background: `linear-gradient(to bottom, ${glowColor}55, transparent 75%)`,
          }}
        />
      )}
      <svg
        viewBox="0 0 100 190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-full w-full"
      >
        <defs>
          <linearGradient id="craft-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f3f1ff" />
            <stop offset="100%" stopColor="#9b96c2" />
          </linearGradient>
          <linearGradient id="craft-trim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Hull — a single elongated, needle-like silhouette */}
        <path
          d="M50 4 C58 30 63 68 61 118 L57 150 C55 158 45 158 43 150 L39 118 C37 68 42 30 50 4 Z"
          fill="url(#craft-body)"
          fillOpacity="0.9"
          stroke="#c9c4de"
          strokeOpacity="0.5"
          strokeWidth="0.75"
        />

        {/* Trim line */}
        <path d="M50 18 L50 140" stroke="url(#craft-trim)" strokeWidth="1.2" strokeLinecap="round" />

        {/* Window */}
        <circle cx="50" cy="46" r="4.5" fill={glowColor} fillOpacity="0.75" />

        {/* Fine swept fins — thin lines, not solid low-poly wedges */}
        <path d="M40 120 L20 150 M22 150 L40 133" stroke="#8f8ab3" strokeWidth="1" strokeLinecap="round" fillOpacity="0" />
        <path d="M60 120 L80 150 M78 150 L60 133" stroke="#8f8ab3" strokeWidth="1" strokeLinecap="round" fillOpacity="0" />

        {/* Engine base */}
        <path d="M43 150 L57 150 L54 162 L46 162 Z" fill="#211d38" />
      </svg>
    </div>
  )
})

export default Spacecraft
