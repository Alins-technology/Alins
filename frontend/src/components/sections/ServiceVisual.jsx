import TiltCard from '../common/TiltCard'
import ServiceMotif from './ServiceMotif'

/**
 * One sophisticated abstract composition per service — glass panels,
 * glowing linework and gradient atmosphere. No literal 3D objects, no
 * cartoon iconography. Pure CSS + SVG, GPU-friendly (transform/opacity
 * only for the ambient float), no per-frame JS beyond `TiltCard`'s
 * pointer-tracking tilt, which only writes on `pointermove`/`pointerleave`.
 */
export default function ServiceVisual({ service }) {
  const { motif, accent, glowFrom, glowTo } = service

  return (
    <TiltCard maxTilt={5} className="mx-auto aspect-[4/3] w-full max-w-xl rounded-[3rem] lg:max-w-2xl">
      {/* ambient atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-14 -z-10 rounded-[3rem] blur-3xl"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 50% 45%, ${glowFrom}2c, transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] blur-2xl opacity-70"
        style={{
          background: `radial-gradient(ellipse 40% 40% at 70% 65%, ${glowTo}26, transparent 70%)`,
        }}
      />

      {motif === 'wireframe' && <WebDesignVisual accent={accent} />}
      {motif === 'nodes' && <WebDevVisual accent={accent} glowTo={glowTo} />}
      {motif === 'device' && <AppDevVisual accent={accent} glowTo={glowTo} />}
      {motif === 'graph' && <MarketingVisual accent={accent} glowTo={glowTo} />}
      {motif === 'shards' && <GraphicVisual accent={accent} glowTo={glowTo} />}
      {motif === 'path' && <SeoVisual accent={accent} glowTo={glowTo} />}
    </TiltCard>
  )
}

// These panels stay deliberately light regardless of the site's own theme —
// they represent a literal browser/app UI mockup floating in the dark
// atmosphere, so their "text line" fills are pinned to black/ tints rather
// than the `ink` token (which is white on this dark site and would vanish
// against a light panel).
function GlassPanel({ className = '', style, children }) {
  return (
    <div
      className={`absolute rounded-2xl border border-black/10 bg-white/85 backdrop-blur-xl shadow-card ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

/* ---------------------------------------------------------------------- */
/* 01 — Web Design: floating browser / interface glass panels             */
/* ---------------------------------------------------------------------- */
function WebDesignVisual({ accent }) {
  return (
    <div className="relative h-full w-full">
      <GlassPanel
        className="left-[8%] top-[10%] h-[62%] w-[72%] animate-float"
        style={{ boxShadow: `0 30px 80px -30px ${accent}40` }}
      >
        <div className="flex items-center gap-1.5 border-b border-black/10 px-4 py-3">
          <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        </div>
        <div className="space-y-3 p-5">
          <div className="h-2.5 w-2/3 rounded-full" style={{ background: `${accent}55` }} />
          <div className="h-2 w-5/6 rounded-full bg-black/10" />
          <div className="h-2 w-3/5 rounded-full bg-black/10" />
          <div className="mt-4 h-14 w-full rounded-lg" style={{ background: `${accent}18`, border: `1px solid ${accent}30` }} />
        </div>
      </GlassPanel>

      <GlassPanel
        className="bottom-[8%] right-[4%] h-[38%] w-[46%] animate-float-delay"
        style={{ boxShadow: `0 25px 60px -25px ${accent}35` }}
      >
        <div className="space-y-2.5 p-4">
          <div className="h-2 w-1/2 rounded-full bg-black/10" />
          <div className="h-8 w-8 rounded-full" style={{ background: `${accent}40` }} />
          <div className="h-2 w-3/4 rounded-full bg-black/10" />
        </div>
      </GlassPanel>

      <span
        aria-hidden
        className="absolute right-[16%] top-[6%] h-2.5 w-2.5 rounded-full animate-pulse-glow"
        style={{ background: accent, boxShadow: `0 0 16px 2px ${accent}` }}
      />
    </div>
  )
}

/* ---------------------------------------------------------------------- */
/* 02 — Web Development: node graph + code fragments                      */
/* ---------------------------------------------------------------------- */
function WebDevVisual({ accent, glowTo }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-[6%] opacity-90">
        <ServiceMotif type="nodes" color={accent} />
      </div>

      <GlassPanel className="left-[2%] top-[12%] w-[34%] animate-float px-3 py-2.5">
        <div className="space-y-1.5">
          <div className="h-1.5 w-3/5 rounded-full" style={{ background: `${accent}60` }} />
          <div className="h-1.5 w-2/5 rounded-full bg-black/10" />
          <div className="h-1.5 w-4/5 rounded-full" style={{ background: `${glowTo}40` }} />
        </div>
      </GlassPanel>

      <GlassPanel className="bottom-[10%] right-[6%] w-[32%] animate-float-delay px-3 py-2.5">
        <div className="space-y-1.5">
          <div className="h-1.5 w-2/3 rounded-full bg-black/10" />
          <div className="h-1.5 w-1/2 rounded-full" style={{ background: `${glowTo}55` }} />
        </div>
      </GlassPanel>
    </div>
  )
}

/* ---------------------------------------------------------------------- */
/* 03 — App Development: layered glass screens                            */
/* ---------------------------------------------------------------------- */
function AppDevVisual({ accent, glowTo }) {
  return (
    <div className="relative h-full w-full">
      {/* Phone 1 — a real "screen" with a notch, a hero card, two content
          rows and a bottom tab bar, instead of a couple of empty bars. */}
      <GlassPanel
        className="left-[24%] top-[5%] h-[82%] w-[32%] animate-float"
        style={{ transform: 'rotate(-6deg)', boxShadow: `0 30px 70px -25px ${accent}35` }}
      >
        <div className="flex h-full flex-col gap-2.5 p-3">
          <div className="mx-auto h-1 w-8 rounded-full bg-black/15" />
          <div
            className="mt-1 flex h-16 shrink-0 flex-col justify-end rounded-lg p-2"
            style={{ background: `${accent}20`, border: `1px solid ${accent}30` }}
          >
            <div className="h-1.5 w-2/3 rounded-full" style={{ background: `${accent}70` }} />
          </div>
          <div className="h-1.5 w-full rounded-full bg-black/10" />
          <div className="h-1.5 w-4/5 rounded-full bg-black/10" />
          <div className="mt-1 grid grid-cols-3 gap-1.5">
            {[accent, glowTo, accent].map((c, i) => (
              <div key={i} className="h-6 rounded-md" style={{ background: `${c}18`, border: `1px solid ${c}28` }} />
            ))}
          </div>
          <div className="mt-auto flex items-center justify-around border-t border-black/10 pt-2">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: i === 0 ? accent : 'rgba(0,0,0,0.15)' }}
              />
            ))}
          </div>
        </div>
      </GlassPanel>

      {/* Phone 2 — an overlapping second screen (a detail/profile view),
          reinforcing "multiple real screens", not one card duplicated. */}
      <GlassPanel
        className="left-[47%] top-[15%] h-[70%] w-[28%] animate-float-delay"
        style={{ transform: 'rotate(5deg)', boxShadow: `0 30px 70px -25px ${glowTo}35` }}
      >
        <div className="flex h-full flex-col gap-2.5 p-3">
          <div className="flex items-center gap-2">
            <span className="h-7 w-7 shrink-0 rounded-full" style={{ background: `${glowTo}55` }} />
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-3/4 rounded-full bg-black/12" />
              <div className="h-1 w-1/2 rounded-full bg-black/8" />
            </div>
          </div>
          <div className="h-1.5 w-full rounded-full bg-black/10" />
          <div className="h-1.5 w-2/3 rounded-full bg-black/10" />
          <div
            className="mt-auto flex h-9 w-full items-center justify-center rounded-full text-[9px] font-semibold"
            style={{ background: `${glowTo}22`, color: glowTo, border: `1px solid ${glowTo}40` }}
          >
            Open App
          </div>
        </div>
      </GlassPanel>

      {/* A small floating rating chip — a bit of real personality instead
          of just a bare pulsing dot. */}
      <div
        aria-hidden
        className="absolute right-[8%] top-[8%] flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold shadow-card animate-float"
        style={{ background: 'rgba(255,255,255,0.9)', borderColor: `${accent}30`, color: '#15162e' }}
      >
        <span aria-hidden style={{ color: accent }}>★</span> 4.9
      </div>

      <span
        aria-hidden
        className="absolute bottom-[8%] left-[14%] h-2 w-2 rounded-full animate-pulse-glow"
        style={{ background: accent, boxShadow: `0 0 14px 2px ${accent}` }}
      />
    </div>
  )
}

/* ---------------------------------------------------------------------- */
/* 04 — Digital Marketing: growth chart + signal points                   */
/* ---------------------------------------------------------------------- */
function MarketingVisual({ accent, glowTo }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-[8%] opacity-90">
        <ServiceMotif type="graph" color={accent} />
      </div>

      <GlassPanel className="right-[4%] top-[8%] w-[30%] animate-float px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: glowTo }} />
          <div className="h-1.5 w-2/3 rounded-full bg-black/10" />
        </div>
      </GlassPanel>

      <span
        aria-hidden
        className="absolute bottom-[16%] left-[10%] h-2 w-2 rounded-full animate-pulse-glow"
        style={{ background: accent, boxShadow: `0 0 14px 2px ${accent}` }}
      />
    </div>
  )
}

/* ---------------------------------------------------------------------- */
/* 05 — Graphic Design: typography + gradient shape composition           */
/* ---------------------------------------------------------------------- */
function GraphicVisual({ accent, glowTo }) {
  return (
    <div className="relative h-full w-full">
      <span
        aria-hidden
        className="font-display absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[9rem] font-bold leading-none opacity-[0.09]"
        style={{ color: accent }}
      >
        A
      </span>

      <div className="absolute inset-[10%] opacity-90">
        <ServiceMotif type="shards" color={glowTo} />
      </div>

      <GlassPanel className="bottom-[10%] left-[6%] w-[36%] animate-float px-3 py-2.5">
        <div className="space-y-1.5">
          <div className="h-1.5 w-3/5 rounded-full" style={{ background: `${accent}55` }} />
          <div className="h-1.5 w-2/5 rounded-full bg-black/10" />
        </div>
      </GlassPanel>

      <span
        aria-hidden
        className="absolute right-[10%] top-[14%] h-2.5 w-2.5 rounded-full animate-pulse-glow"
        style={{ background: glowTo, boxShadow: `0 0 16px 2px ${glowTo}` }}
      />
    </div>
  )
}

/* ---------------------------------------------------------------------- */
/* 06 — SEO & Growth: constellation / ascending signal                    */
/* ---------------------------------------------------------------------- */
function SeoVisual({ accent, glowTo }) {
  const stars = [
    [12, 18],
    [30, 8],
    [72, 22],
    [88, 12],
    [20, 60],
    [58, 70],
    [80, 55],
  ]

  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 100 90" className="absolute inset-0 h-full w-full" fill="none">
        {stars.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.9" fill="#ffffff" fillOpacity="0.5" />
        ))}
      </svg>

      <div className="absolute inset-[8%] opacity-90">
        <ServiceMotif type="path" color={accent} />
      </div>

      <GlassPanel className="right-[6%] top-[10%] w-[30%] animate-float-delay px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: glowTo }} />
          <div className="h-1.5 w-2/3 rounded-full bg-black/10" />
        </div>
      </GlassPanel>
    </div>
  )
}
