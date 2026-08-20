/**
 * A friendly, illustrated take on the brand's rocket — a "character" for
 * the places on the site that can afford some personality: the 404 page,
 * empty states. Face + wobble make it read as a mascot, not a diagram.
 * Pure inline SVG, no external assets.
 */
export default function RocketBuddy({ className = '', size = 160 }) {
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className={`${reducedMotion ? '' : 'animate-float'} ${className}`} style={{ width: size, height: size * 1.25 }}>
      <svg viewBox="0 0 160 200" fill="none" className="h-full w-full" role="img" aria-label="A friendly little rocket, waving">
        {/* engine flame */}
        <path
          d="M80 172C74 180 70 188 80 198C90 188 86 180 80 172Z"
          fill="#ff7a30"
          className={`origin-bottom ${reducedMotion ? '' : 'animate-pulse-glow'}`}
        />
        <path d="M66 168C61 176 60 184 66 190C70 184 68 176 66 168Z" fill="#ffb84d" opacity="0.85" />
        <path d="M94 168C99 176 100 184 94 190C90 184 92 176 94 168Z" fill="#ffb84d" opacity="0.85" />

        {/* fins */}
        <path d="M52 118L28 150C26 158 32 164 40 160L58 144" fill="#8b5cf6" />
        <path d="M108 118L132 150C134 158 128 164 120 160L102 144" fill="#3b6dfb" />

        {/* body */}
        <path
          d="M80 8C102 34 112 78 108 128C107 148 96 168 80 176C64 168 53 148 52 128C48 78 58 34 80 8Z"
          fill="#f7f8fd"
          stroke="#3b6dfb"
          strokeWidth="3"
        />

        {/* body trim stripe */}
        <path d="M80 20V150" stroke="#e7e7f4" strokeWidth="2" strokeDasharray="2 6" />

        {/* window / face */}
        <circle cx="80" cy="88" r="30" fill="#eaf6f8" stroke="#0891a8" strokeWidth="3" />
        {/* eyes */}
        <circle cx="70" cy="86" r="4.5" fill="#15162e" />
        <circle cx="90" cy="86" r="4.5" fill="#15162e" />
        {/* blush */}
        <circle cx="61" cy="96" r="4" fill="#ff7a30" opacity="0.35" />
        <circle cx="99" cy="96" r="4" fill="#ff7a30" opacity="0.35" />
        {/* smile */}
        <path d="M70 100C74 105 86 105 90 100" stroke="#15162e" strokeWidth="2.5" strokeLinecap="round" />

        {/* little waving arm */}
        <path
          d="M108 128C120 122 130 108 128 96"
          stroke="#3b6dfb"
          strokeWidth="4"
          strokeLinecap="round"
          className="origin-[108px_128px]"
        >
          {!reducedMotion && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 108 128; -14 108 128; 0 108 128"
              dur="1.6s"
              repeatCount="indefinite"
            />
          )}
        </path>
      </svg>
    </div>
  )
}
