/**
 * Two fixed vertical hairlines marking the content column's edges (36rem
 * either side of center) — a subtle "print grid" cue that reinforces the
 * page has a deliberate measure, borrowed straight from the cinematic
 * reference design. Desktop-only; a mobile viewport is already narrower
 * than the column so the lines would just sit off-screen or crowd the edge.
 */
export default function GuideLines() {
  return (
    <>
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[1]" />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[1]" />
    </>
  )
}
