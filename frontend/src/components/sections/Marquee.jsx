const words = [
  'Web Design',
  'Web Development',
  'App Development',
  'Digital Marketing',
  'Graphic Designing',
  'SEO & Growth',
  'Brand Strategy',
  'UI/UX Design',
]

export default function Marquee() {
  const loop = [...words, ...words]
  return (
    <div className="relative overflow-hidden border-y border-bg-border bg-bg-soft/60 py-6">
      <div className="flex w-max animate-marquee gap-10">
        {[...loop, ...loop].map((word, i) => (
          <div key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-xl font-medium text-ink-muted/70 sm:text-2xl">
              {word}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500/60" />
          </div>
        ))}
      </div>
    </div>
  )
}
