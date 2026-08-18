/**
 * One small, abstract line-art motif per service category — deliberately
 * minimal 2D SVG (no 3D, no cartoon iconography). Purely decorative — a
 * faint watermark behind each service's stage content in ServicesJourney.
 */
export default function ServiceMotif({ type, color }) {
  const stroke = { stroke: color }
  switch (type) {
    case 'wireframe':
      return (
        <svg viewBox="0 0 120 90" className="h-full w-full" fill="none">
          <rect x="6" y="6" width="108" height="78" rx="4" stroke={color} strokeOpacity="0.35" />
          <line x1="6" y1="26" x2="114" y2="26" stroke={color} strokeOpacity="0.35" />
          <line x1="40" y1="26" x2="40" y2="84" stroke={color} strokeOpacity="0.25" />
          <rect x="52" y="38" width="50" height="8" rx="2" fill={color} fillOpacity="0.5" />
          <rect x="52" y="52" width="34" height="8" rx="2" fill={color} fillOpacity="0.3" />
          <circle cx="16" cy="16" r="2.5" fill={color} fillOpacity="0.6" />
        </svg>
      )
    case 'nodes': {
      const pts = [
        [22, 20],
        [96, 30],
        [60, 60],
        [24, 72],
        [98, 74],
      ]
      return (
        <svg viewBox="0 0 120 90" className="h-full w-full" fill="none">
          <line x1={pts[0][0]} y1={pts[0][1]} x2={pts[2][0]} y2={pts[2][1]} {...stroke} strokeOpacity="0.4" />
          <line x1={pts[1][0]} y1={pts[1][1]} x2={pts[2][0]} y2={pts[2][1]} {...stroke} strokeOpacity="0.4" />
          <line x1={pts[2][0]} y1={pts[2][1]} x2={pts[3][0]} y2={pts[3][1]} {...stroke} strokeOpacity="0.4" />
          <line x1={pts[2][0]} y1={pts[2][1]} x2={pts[4][0]} y2={pts[4][1]} {...stroke} strokeOpacity="0.4" />
          {pts.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 2 ? 5 : 3.5} fill={color} fillOpacity={i === 2 ? 0.8 : 0.55} />
          ))}
        </svg>
      )
    }
    case 'device':
      return (
        <svg viewBox="0 0 120 90" className="h-full w-full" fill="none">
          <rect x="42" y="6" width="36" height="78" rx="6" stroke={color} strokeOpacity="0.4" />
          <line x1="48" y1="16" x2="72" y2="16" stroke={color} strokeOpacity="0.4" />
          <rect x="48" y="24" width="24" height="46" fill={color} fillOpacity="0.18" />
          <circle cx="60" cy="77" r="2.5" stroke={color} strokeOpacity="0.5" />
        </svg>
      )
    case 'graph': {
      const bars = [22, 38, 30, 52, 44, 60]
      return (
        <svg viewBox="0 0 120 90" className="h-full w-full" fill="none">
          <line x1="8" y1="82" x2="112" y2="82" stroke={color} strokeOpacity="0.25" />
          {bars.map((h, i) => (
            <rect key={i} x={14 + i * 16} y={82 - h} width="9" height={h} fill={color} fillOpacity={0.25 + i * 0.08} />
          ))}
          <polyline
            points={bars.map((h, i) => `${18.5 + i * 16},${82 - h - 6}`).join(' ')}
            {...stroke}
            strokeOpacity="0.7"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      )
    }
    case 'shards':
      return (
        <svg viewBox="0 0 120 90" className="h-full w-full" fill="none">
          <polygon points="30,14 52,26 34,44" fill={color} fillOpacity="0.4" />
          <polygon points="60,10 90,22 68,38" fill={color} fillOpacity="0.25" />
          <polygon points="24,52 50,60 32,80" fill={color} fillOpacity="0.3" />
          <polygon points="66,50 100,58 78,80" fill={color} fillOpacity="0.18" />
        </svg>
      )
    case 'path': {
      const pts = Array.from({ length: 6 }, (_, i) => [10 + i * 20, 78 - Math.pow(i / 5, 1.4) * 62])
      return (
        <svg viewBox="0 0 120 90" className="h-full w-full" fill="none">
          <polyline points={pts.map((p) => p.join(',')).join(' ')} {...stroke} strokeOpacity="0.6" strokeWidth="1.5" fill="none" />
          {pts.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === pts.length - 1 ? 4 : 2.5} fill={color} fillOpacity={i === pts.length - 1 ? 0.85 : 0.5} />
          ))}
        </svg>
      )
    }
    default:
      return null
  }
}
