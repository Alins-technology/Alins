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

const dotColors = ['bg-primary-400', 'bg-nebula', 'bg-accent-400']

export default function Marquee() {
  const loop = [...words, ...words]
  return (
    <div className="mask-fade-x group relative overflow-hidden border-y border-white/10 bg-black/20 py-7 sm:py-8">
      <div className="flex w-max animate-marquee gap-14 [animation-play-state:running] group-hover:[animation-play-state:paused]">
        {[...loop, ...loop].map((word, i) => (
          <div key={i} className="flex items-center gap-14 whitespace-nowrap">
            <span className="font-display text-2xl font-semibold uppercase tracking-tight text-ink-muted/80 transition-colors duration-300 hover:text-ink sm:text-3xl">
              {word}
            </span>
            <span className={`h-2 w-2 rounded-full ${dotColors[i % dotColors.length]}`} />
          </div>
        ))}
      </div>
    </div>
  )
}
