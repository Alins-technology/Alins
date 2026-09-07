import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Search, Star, Archive, Share2, Bookmark, MoreHorizontal } from 'lucide-react'
import { services } from '../../data/services'
import { portfolio } from '../../data/portfolio'
import WindowChrome from '../common/WindowChrome'

/**
 * "Studio Dashboard" — the reference design's macOS-bar + inbox mockup,
 * reframed around Alins' own real data instead of an invented product: the
 * sidebar nav is the real services list, the message list is the real
 * portfolio, and the reader pane shows the selected project's real
 * description/services/tags. Nothing here is fabricated — every string
 * comes from `data/services.js` / `data/portfolio.js`.
 */
export default function DashboardShowcase() {
  const [activeId, setActiveId] = useState(portfolio[0].id)
  const active = portfolio.find((p) => p.id === activeId) ?? portfolio[0]

  return (
    <section className="container-x py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="liquid-glass overflow-hidden"
      >
        <WindowChrome label="Alins — Studio" />

        <div className="grid grid-cols-1 md:grid-cols-12 md:h-[520px]">
          {/* Sidebar — real services as nav */}
          <div className="border-b border-white/10 bg-black/20 p-4 md:col-span-3 md:border-b-0 md:border-r">
            <button
              type="button"
              className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black"
            >
              <Sparkles size={14} /> New Project
            </button>
            <nav className="space-y-1">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs text-white/60"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: s.accent }} />
                  {s.title}
                </div>
              ))}
            </nav>
            <p className="mt-6 px-2.5 text-[10px] uppercase tracking-[0.2em] text-white/30">Track record</p>
            <div className="mt-2 space-y-1 px-2.5 text-xs text-white/50">
              <p>120+ projects delivered</p>
              <p>60+ happy clients</p>
            </div>
          </div>

          {/* Message list — real portfolio projects */}
          <div className="border-b border-white/10 md:col-span-4 md:border-b-0 md:border-r md:overflow-y-auto">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-xs text-white/40">
              <Search size={13} /> Search projects
            </div>
            {portfolio.map((p) => {
              const isActive = p.id === active.id
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveId(p.id)}
                  className={`block w-full border-b border-white/[0.06] px-4 py-3.5 text-left transition-colors ${
                    isActive ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-white">{p.title}</span>
                    {isActive && <Star size={12} className="shrink-0 text-accent-300" fill="currentColor" />}
                  </div>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-accent-300/80">
                    {p.category}
                  </p>
                  <p className="mt-1 line-clamp-1 text-xs text-white/45">{p.description}</p>
                </button>
              )
            })}
          </div>

          {/* Reader — selected project's real details */}
          <div className="p-5 md:col-span-5 md:overflow-y-auto">
            <div className="mb-4 flex items-center gap-1 text-white/40">
              <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-white/5">
                <Share2 size={14} />
              </button>
              <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-white/5">
                <Bookmark size={14} />
              </button>
              <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-white/5">
                <Archive size={14} />
              </button>
              <button type="button" className="ml-auto flex h-7 w-7 items-center justify-center rounded-md hover:bg-white/5">
                <MoreHorizontal size={14} />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-white">{active.title}</h3>
            <div className="mt-2 flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${active.color} text-[11px] font-bold text-white`}
              >
                {active.title[0]}
              </div>
              <p className="text-xs text-white/50">{active.category}</p>
              <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/50">
                {active.services[0]}
              </span>
            </div>

            <div className="liquid-glass mt-5 flex gap-3 p-3.5">
              <Sparkles size={16} className="mt-0.5 shrink-0 text-accent-300" />
              <div>
                <p className="text-xs font-semibold text-white">Snapshot</p>
                <p className="mt-1 text-xs leading-relaxed text-white/55">{active.description}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {[...active.services, ...active.tags].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
