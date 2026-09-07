/**
 * The site's background — a single smooth gradient fixed to the viewport
 * (not the document), so it reads as one cohesive cinematic backdrop behind
 * every page instead of flat black with a few isolated blurred circles
 * scattered around. Pure CSS, no JS, effectively free to render.
 *
 * Dark theme: near-black base with the brand's three glows (blue, violet,
 * cyan) breathing softly at the corners — same "one large soft glow for
 * depth" idea the light theme used, just tuned for a dark ground so the
 * hues read as light sources instead of pastel tints.
 */
export default function GradientBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: 'linear-gradient(160deg, #0c0c0c 0%, #0e0e12 45%, #0a0c10 100%)',
      }}
    >
      <div
        className="absolute left-1/2 top-[-15%] h-[70vh] w-[90vw] max-w-[64rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(ellipse, rgba(59,109,251,0.22) 0%, rgba(59,109,251,0) 70%)' }}
      />
      <div
        className="absolute bottom-[-18%] right-[-10%] h-[55vh] w-[55vw] max-w-[42rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(ellipse, rgba(34,211,238,0.14) 0%, rgba(34,211,238,0) 70%)' }}
      />
      <div
        className="absolute bottom-[10%] left-[-12%] h-[45vh] w-[45vw] max-w-[36rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.14) 0%, rgba(139,92,246,0) 70%)' }}
      />
    </div>
  )
}
