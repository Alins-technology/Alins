import { useEffect, useRef } from 'react'
import { process } from '../../data/content'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import SectionHeading from '../common/SectionHeading'

export default function Process() {
  const sectionRef = useRef(null)
  const stepRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepRefs.current.forEach((el) => {
        if (!el) return
        const line = el.querySelector('[data-anim="line"]')
        const title = el.querySelector('[data-anim="step-title"]')
        const num = el.querySelector('[data-anim="step-num"]')

        gsap.set(line, { scaleX: 0 })

        ScrollTrigger.create({
          trigger: el,
          start: 'top 65%',
          end: 'bottom 45%',
          onEnter: () => {
            gsap.to(line, { scaleX: 1, duration: 0.6, ease: 'power2.out' })
            gsap.to([title, num], { color: '#ffffff', duration: 0.4 })
          },
          onLeaveBack: () => {
            gsap.to(line, { scaleX: 0, duration: 0.4, ease: 'power2.in' })
            gsap.to([title, num], { color: '#928dbd', duration: 0.4 })
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-pad relative overflow-hidden">
      <div className="container-x relative">
        <SectionHeading
          eyebrow="How We Work"
          title="A process built for"
          highlight="clarity."
          description="No black boxes. Just a proven four-step system that keeps every project on time, on budget and on brand."
        />

        <div className="mt-16 flex flex-col">
          {process.map((item, i) => (
            <div key={item.step} ref={(el) => (stepRefs.current[i] = el)}>
              <div className="grid grid-cols-[3rem_1fr] items-baseline gap-6 py-8 sm:grid-cols-[5rem_1fr_2fr] sm:gap-10">
                <span
                  data-anim="step-num"
                  className="font-display text-2xl font-bold text-ink-faint transition-colors duration-300"
                >
                  {item.step}
                </span>
                <h3
                  data-anim="step-title"
                  className="text-2xl font-semibold text-ink-faint transition-colors duration-300 sm:text-3xl"
                >
                  {item.title}
                </h3>
                <p className="col-span-2 mt-2 max-w-md text-sm leading-relaxed text-ink-muted sm:col-span-1 sm:mt-0">
                  {item.description}
                </p>
              </div>
              <div className="relative h-px w-full bg-bg-border">
                <span
                  data-anim="line"
                  aria-hidden
                  className="absolute inset-0 origin-left bg-gradient-to-r from-primary-400 to-nebula-soft"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
