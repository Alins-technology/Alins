/**
 * Root-mounted, invisible SVG holding the grain filter `.gradient-text`
 * (see styles/index.css) references via `filter: url(#alins-noise)`. Kept
 * as one shared node instead of duplicating the filter per component — any
 * shiny-gradient headline anywhere on the site picks it up for free.
 */
export default function NoiseFilters() {
  return (
    <svg aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      <filter id="alins-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
        <feComposite in2="SourceGraphic" operator="in" result="noise" />
        <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
      </filter>
    </svg>
  )
}
