# Alins Technologies — Design System v2 ("Bright Aurora, Editorial")

Internal reference only (not shipped/imported anywhere) — read this before redesigning any
section's layout so every page ends up feeling like one coherent system instead of five
different people's guesses. This is a **layout/composition redesign pass**, not a new color
pass — the Bright Aurora palette, Tailwind tokens (`bg`, `ink`, `primary`, `nebula`, `flame`,
`accent`), utility classes (`.eyebrow`, `.glass-card`, `.gradient-text`, `.btn-*`, `.hairline`,
`.noise-overlay`), fonts (Clash Display / Inter), GSAP/Framer Motion/Lenis infra, and every
fact in the content are already correct and DONE — don't touch colors/tokens/data, touch JSX
structure and Tailwind layout classes.

## The core problem with the current layout

Almost every section is the same recipe: centered `SectionHeading` (eyebrow → h2 → description),
then a uniform equal-size grid underneath. It reads competent but flat and interchangeable —
nothing about the page composition itself signals "premium." Fix that by making each section's
*shape on the page* distinct, while keeping the same content and information.

## Layout pattern library — mix these across a page, don't reuse the same one twice in a row

1. **Split-diagonal** — a big headline/statement on one side (55-65% width), a visual/stat/quote
   block on the other (35-45%), asymmetric not centered. Good for intros (AgencyIntro,
   ServicesIntro, AboutPreview).
2. **Bento grid** — uneven card sizes in a CSS grid (one `col-span-2 row-span-2` feature cell +
   several smaller cells), not a uniform `grid-cols-3` of identical boxes. Good for
   Services/Values/Portfolio grids.
3. **Full-bleed tinted band** — a section that breaks out of the white rhythm with a full-width
   soft background (`bg-bg-surface`, or a very low-opacity brand gradient wash), often paired
   with oversized centered or asymmetric type. Good for Difference, CTA — use sparingly (2-3
   sections sitewide max) so it stays a rhythm accent, not the new default.
3. **Oversized editorial statement** — one big pull-quote/number/line of type as the entire
   visual content of a section, minimal chrome around it. Good for Testimonials, Stats,
   Difference.
4. **Sticky-narrative / zigzag** — alternating left/right visual placement as you move down a
   repeated list (services, process), optionally with a sticky column. Good for ServiceSection
   (already alternate per service using `index % 2`), StoryMorph.
5. **Bold typographic scale** — section headlines allowed to run bigger than before
   (`text-5xl`→`text-6xl/7xl` where the section is the hero moment of the page), oversized
   numerals as graphic elements (Process already does this — extend the idea elsewhere:
   Stats, ServicesProgressNav).

## Spacing rhythm

Stop using `section-pad` (`py-24 md:py-32`) on literally every section. Vary it on purpose:
a big statement section can take `py-32 md:py-44`; a denser grid section can be tighter
(`py-16 md:py-24`). The variation itself is what makes the page feel composed rather than
templated.

## Card styles — use more than one

- `.glass-card` (existing) — the default.
- A flat, non-blurred bordered block (`border border-bg-border bg-white`) for grids where blur
  would be visual noise (denser bento grids especially — cheaper to render too).
- A tinted solid block (e.g. `bg-primary-500/5 border border-primary-500/10`) for one
  "featured" cell inside a bento grid, to make it read as promoted without shouting.

## What NOT to change

- Routes, page files' top-level composition order of sections (don't reorder About/Services/etc.
  sections relative to each other unless it clearly improves the page — ask if unsure by leaving
  a comment, don't silently reorder business-relevant content).
- `ContactForm.jsx` submit logic, `data/*.js` facts, Tailwind config, `index.css`, `lib/*.js`,
  `Hero.jsx`/`HeroScene.jsx` (already redesigned this pass), `Navbar.jsx`/`Footer.jsx` (already
  redesigned), `ServicesProgressNav.jsx`/`Process.jsx` (already got bespoke layout treatment
  last pass — leave their structure, light touch-ups only if genuinely needed for consistency).
- Accessibility: keep semantic headings, keep `prefers-reduced-motion` guards on anything you
  add with GSAP, keep interactive elements keyboard-reachable.
