/**
 * A macOS-style title bar — three traffic-light dots + a centered label —
 * used to frame "real product" mockups (currently: DashboardShowcase) so
 * they read as an actual application window instead of a floating card.
 */
export default function WindowChrome({ label }) {
  return (
    <div className="relative flex h-10 shrink-0 items-center justify-center border-b border-white/10 bg-black/30 px-4">
      <div className="absolute left-4 flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full" style={{ background: '#ff5f57' }} />
        <span className="h-3 w-3 rounded-full" style={{ background: '#febc2e' }} />
        <span className="h-3 w-3 rounded-full" style={{ background: '#28c840' }} />
      </div>
      <span className="text-xs text-white/50">{label}</span>
    </div>
  )
}
