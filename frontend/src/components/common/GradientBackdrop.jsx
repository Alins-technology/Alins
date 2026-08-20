/**
 * The site's background — a single smooth gradient fixed to the viewport
 * (not the document), so it reads as one cohesive premium backdrop behind
 * every page instead of flat white with a few isolated blurred circles
 * scattered around. Pure CSS, no JS, effectively free to render.
 */
export default function GradientBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          'linear-gradient(160deg, #eef3ff 0%, #f4f1ff 32%, #eef9fb 68%, #ffffff 100%)',
      }}
    >
      {/* one large, soft glow for depth — not a grid of separate blobs */}
      <div
        className="absolute left-1/2 top-[-10%] h-[70vh] w-[90vw] max-w-[64rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(ellipse, rgba(59,109,251,0.16) 0%, rgba(59,109,251,0) 70%)' }}
      />
      <div
        className="absolute bottom-[-15%] right-[-10%] h-[55vh] w-[55vw] max-w-[42rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(ellipse, rgba(8,145,168,0.12) 0%, rgba(8,145,168,0) 70%)' }}
      />
    </div>
  )
}
