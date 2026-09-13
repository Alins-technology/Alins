/**
 * Extended, per-service content for the individual /services/:id detail
 * pages — deliberately kept separate from `services.js` (which stays the
 * source of truth for id/icon/title/color/motif/accent used across the
 * whole site) so the compact "preview" data and this long-form "detail
 * page" data don't fight each other in one file. Keyed by the same
 * `service.id` values as `services.js`.
 */

export const serviceDetails = {
  'web-design': {
    tagline: 'Interfaces people trust in the first three seconds.',
    heroNote: 'First impressions, engineered on purpose',
    featureCards: [
      {
        title: 'UI/UX Design',
        description:
          'Every screen mapped to a real user goal first, styled second — so it looks sharp and actually gets used, not just admired in a deck.',
      },
      {
        title: 'Wireframing & Prototyping',
        description:
          'Clickable Figma prototypes before a line of code is written, so layout and flow decisions get made on the idea itself — not on the invoice.',
      },
      {
        title: 'Design Systems',
        description:
          'Reusable components, tokens and states documented once, so new pages ship fast later and nothing drifts off-brand as the site grows.',
      },
      {
        title: 'Responsive Layouts',
        description:
          'One layout, tuned by hand for phone, tablet and desktop breakpoints — not just a desktop design squeezed into a smaller window.',
      },
    ],
    process: [
      { step: '01', title: 'Discover & Audit', description: 'We study your brand, your users and what your current site is (or isn\'t) doing for both.' },
      { step: '02', title: 'Wireframe', description: 'Low-fidelity flows and layouts get agreed on structure before any visual polish begins.' },
      { step: '03', title: 'Visual Design', description: 'Typography, color and imagery applied inside a real design system, not one-off pages.' },
      { step: '04', title: 'Prototype & Handoff', description: 'A clickable prototype for sign-off, then a clean, documented handoff into development.' },
    ],
    tools: ['Figma', 'Framer', 'Webflow', 'Adobe XD', 'Notion'],
    faqs: [
      {
        q: 'How long does a website redesign take?',
        a: 'Typically 3–5 weeks for a marketing site, depending on page count and revision rounds. We give you an exact timeline after the first discovery call, not a generic range.',
      },
      {
        q: 'Do you design in Figma?',
        a: 'Yes, Figma is our default — you get commented, always-current files you can access anytime, not a static exported image.',
      },
      {
        q: 'Will the new design match our existing brand?',
        a: 'We design from your existing brand guidelines where they exist, and help define a proper system where they don\'t — either way, everything stays recognizably yours.',
      },
      {
        q: 'Can you redesign just one part of our site, not the whole thing?',
        a: 'Yes — single-page and section-level redesigns are scoped just as often as full rebuilds.',
      },
    ],
    locations: [
      {
        city: 'Noida',
        heading: 'Web Design Company in Noida',
        body: 'Noida’s startups, retailers and service brands need more than a template — they need a site that loads fast, reads clean on a phone and turns a visit into an enquiry. As a web design company based in Noida, we design around your business identity from the first sketch, not a stock layout.',
      },
      {
        city: 'Indirapuram',
        heading: 'Web Design Services in Indirapuram',
        body: 'Local businesses across Indirapuram, Ghaziabad and the surrounding NCR need a site that’s easy to find and even easier to trust. Every build is mobile-first and enquiry-ready, designed against your services and audience rather than copy-pasted from the last client.',
      },
    ],
    relatedIds: ['web-development', 'graphic-designing'],
  },

  'web-development': {
    tagline: 'Built once, built right — no rewrite six months later.',
    heroNote: 'Engineering decisions made on day one, not cleaned up later',
    featureCards: [
      {
        title: 'Custom Web Apps',
        description:
          'Bespoke web applications built on modern frameworks, architected around what your product actually needs to do — not a template bent out of shape.',
      },
      {
        title: 'E-commerce',
        description:
          'Storefronts built for checkout conversion and catalog scale from day one, on platforms that fit your team\'s workflow instead of fighting it.',
      },
      {
        title: 'CMS & Headless',
        description:
          'Content your team can actually edit without opening a ticket — headless where you need flexibility, traditional CMS where simplicity wins.',
      },
      {
        title: 'API Integration',
        description:
          'Clean, documented integrations with the payment, CRM and analytics tools you already run, so data moves without manual re-entry.',
      },
    ],
    process: [
      { step: '01', title: 'Architecture & Stack', description: 'We choose the stack around your real requirements — traffic, team, budget — not our favorite framework.' },
      { step: '02', title: 'Build in Sprints', description: 'Work ships in short, reviewable sprints so you see real progress every week, not a black box until launch.' },
      { step: '03', title: 'QA & Performance', description: 'Cross-browser testing, load checks and a Lighthouse pass before anything goes near production.' },
      { step: '04', title: 'Launch & Handover', description: 'Deployed, documented and handed over with everything your team needs to maintain it independently.' },
    ],
    tools: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Shopify', 'WordPress'],
    faqs: [
      {
        q: 'What tech stack do you build with?',
        a: 'Most commonly React/Next.js on the frontend with Node.js or a headless CMS behind it — but the stack is chosen to fit the project, not the other way around.',
      },
      {
        q: 'Who hosts the site after launch?',
        a: 'You do — we deploy to hosting you own (Vercel, your existing server, etc.) and hand over full access, no dependency on us to keep the lights on.',
      },
      {
        q: 'Do you offer ongoing maintenance?',
        a: 'Yes, as an optional retainer — updates, monitoring and small fixes — but nothing is locked behind it; the codebase is yours either way.',
      },
      {
        q: 'Can you work with our existing codebase?',
        a: 'Often, yes. We start with a short technical audit to confirm scope before quoting work on an existing project.',
      },
    ],
    locations: [
      {
        city: 'Noida',
        heading: 'Custom Website Development in Noida',
        body: 'Generic templates rarely fit a growing business. As a website development company in Noida, we architect sites around your actual services, audience and growth plans — corporate sites, service platforms, portfolios or fully custom web applications.',
      },
      {
        city: 'Indirapuram',
        heading: 'Web Development Agency in Indirapuram',
        body: 'From local businesses to specialised platforms, we build for Indirapuram, Ghaziabad and the wider NCR with the same rigor: clean information architecture, responsive layouts and room to add features as the business grows.',
      },
    ],
    relatedIds: ['web-design', 'app-development'],
  },

  'app-development': {
    tagline: 'Apps people actually keep on their home screen.',
    heroNote: 'Speed and stability first — the two things that decide retention',
    featureCards: [
      {
        title: 'iOS & Android',
        description:
          'Native-grade experiences on both platforms, following each one\'s real design conventions instead of one generic UI stretched over both.',
      },
      {
        title: 'React Native',
        description:
          'One shared codebase for iOS and Android where it makes sense — faster to ship, cheaper to maintain, without a compromised feel.',
      },
      {
        title: 'App Store Launch',
        description:
          'Store listings, screenshots and submission handled end-to-end, including the review-guideline details that get first submissions rejected.',
      },
      {
        title: 'Maintenance & Support',
        description:
          'OS updates, crash monitoring and feature iterations after launch, so the app keeps working as devices and platforms move on.',
      },
    ],
    process: [
      { step: '01', title: 'Discovery & Scoping', description: 'We define the core flows that actually matter, before anything gets designed or built.' },
      { step: '02', title: 'Design the Flow', description: 'Screen-by-screen UX built around platform conventions users already know, not reinvented.' },
      { step: '03', title: 'Build & Test', description: 'Iterative builds on real devices, not just a simulator — performance issues surface early.' },
      { step: '04', title: 'Launch & Support', description: 'Store submission handled, then monitored post-launch so day-one bugs get caught fast.' },
    ],
    tools: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'App Store Connect', 'Play Console'],
    faqs: [
      {
        q: 'Native or React Native — which do we need?',
        a: 'React Native covers most business apps well and ships faster; we recommend fully native only when the app leans hard on platform-specific hardware or performance.',
      },
      {
        q: 'Do you handle App Store and Play Store submission?',
        a: 'Yes, end-to-end — listings, screenshots, review responses and the compliance details that most commonly cause rejections.',
      },
      {
        q: 'How long does an MVP take?',
        a: 'A focused MVP typically runs 6–10 weeks depending on scope — we give you a firm estimate after scoping the core flows.',
      },
      {
        q: 'What happens after launch?',
        a: 'We offer an ongoing support retainer for OS updates and fixes, but you own the codebase and can take it anywhere.',
      },
    ],
    locations: [
      {
        city: 'Noida',
        heading: 'App Development Company in Noida',
        body: 'Noida’s startups and service companies lean on digital platforms to reach customers every day. We build Android, iOS and web applications scoped around how your business actually runs, not a generic app shell resold to every client.',
      },
      {
        city: 'Indirapuram',
        heading: 'App Development Company in Indirapuram',
        body: 'Running a business in Indirapuram, Ghaziabad or the nearby NCR? We build functional, business-specific apps across Android, iOS and web — planned around your market and users, not a one-size-fits-all template.',
      },
    ],
    relatedIds: ['web-development', 'digital-marketing'],
  },

  'digital-marketing': {
    tagline: 'Growth you can trace back to a channel, not a hunch.',
    heroNote: 'Full-funnel marketing, measured against numbers that matter',
    featureCards: [
      {
        title: 'SEO Strategy',
        description:
          'Keyword and content strategy built around what your actual customers search, not vanity terms with traffic you can\'t convert.',
      },
      {
        title: 'Paid Ads (PPC)',
        description:
          'Search and social campaigns run against a target cost-per-result, with spend reallocated toward what\'s working every week.',
      },
      {
        title: 'Social Media',
        description:
          'Content calendars and creative built for the platform they run on, not one asset resized five different ways.',
      },
      {
        title: 'Analytics & Reporting',
        description:
          'Dashboards tied to revenue and leads, not just impressions — so you always know what a channel is actually doing for you.',
      },
    ],
    process: [
      { step: '01', title: 'Audit & Benchmark', description: 'We review current channels, spend and results honestly before recommending anything new.' },
      { step: '02', title: 'Strategy & Channel Mix', description: 'A plan built around your budget and audience, not a template applied to every client.' },
      { step: '03', title: 'Run & Optimize', description: 'Campaigns launched, watched closely and adjusted weekly against the numbers you care about.' },
      { step: '04', title: 'Report & Iterate', description: 'Clear reporting on what worked and why, feeding directly into the next cycle\'s strategy.' },
    ],
    tools: ['Google Ads', 'Meta Ads', 'Google Analytics 4', 'Search Console', 'HubSpot'],
    faqs: [
      {
        q: 'What\'s the minimum ad budget you work with?',
        a: 'It depends on the channel and market, but we\'ll tell you upfront if a budget is too thin to produce a meaningful read — we\'d rather say that than take the retainer anyway.',
      },
      {
        q: 'How do you report results?',
        a: 'A recurring report tied to leads/revenue where tracking allows it, walked through live rather than just emailed over.',
      },
      {
        q: 'Do you manage the ad accounts or just advise?',
        a: 'We manage them directly — creative, targeting, budget pacing and daily optimization — inside accounts you own.',
      },
      {
        q: 'How soon do results show up?',
        a: 'Paid channels can show early signal within weeks; organic/SEO work compounds over months. We\'re upfront about which is which.',
      },
    ],
    relatedIds: ['seo-growth', 'graphic-designing'],
  },

  'graphic-designing': {
    tagline: 'A brand that looks like one decision, not fifty.',
    heroNote: 'One coherent system, every touchpoint',
    featureCards: [
      {
        title: 'Brand Identity',
        description:
          'A visual system — color, type, imagery — built to hold up across a website, a pitch deck and a product box alike.',
      },
      {
        title: 'Logo & Guidelines',
        description:
          'A mark designed to work at 16px and on a billboard, documented in guidelines your team (or any agency) can follow later.',
      },
      {
        title: 'Social Creatives',
        description:
          'Templated creative systems so every post looks unmistakably yours, without redesigning from scratch each time.',
      },
      {
        title: 'Motion & Animation',
        description:
          'Logo stings, ad creative and UI micro-animation that carry the same identity into motion, not just static frames.',
      },
    ],
    process: [
      { step: '01', title: 'Brand Discovery', description: 'We dig into your positioning, competitors and audience before touching a single visual.' },
      { step: '02', title: 'Concept & Moodboard', description: 'Two or three genuinely distinct directions explored, not fifty micro-variations of one idea.' },
      { step: '03', title: 'Identity System', description: 'The chosen direction extended into a full color, type and component system.' },
      { step: '04', title: 'Guidelines & Assets', description: 'A documented guideline plus export-ready assets, so the brand stays consistent as it scales.' },
    ],
    tools: ['Illustrator', 'Photoshop', 'After Effects', 'Figma'],
    faqs: [
      {
        q: 'Do you design logos on their own, without a full brand project?',
        a: 'Yes, though we\'ll usually recommend at least a light brand system alongside it so the logo has somewhere consistent to live.',
      },
      {
        q: 'How many logo concepts do we get?',
        a: 'Typically two to three considered directions rather than a wall of ten variations — depth over volume.',
      },
      {
        q: 'Can you refresh our existing brand instead of starting over?',
        a: 'Often that\'s the better move — we\'ll tell you honestly if a refresh serves you better than a full rebuild.',
      },
      {
        q: 'What do we receive at the end?',
        a: 'Full source files, exported assets in every format you need, and a guideline document covering usage rules.',
      },
    ],
    locations: [
      {
        city: 'Noida',
        heading: 'Graphic Design Company in Noida',
        body: 'Startups, retailers and established brands across Noida need visual consistency across web, social and print. We build design systems, not one-off graphics, so every touchpoint stays unmistakably yours.',
      },
      {
        city: 'Indirapuram',
        heading: 'Graphic Design Company in Indirapuram',
        body: 'Every brand across Indirapuram, Ghaziabad and the wider NCR needs its own visual language. From social creatives to full brand identities, designs are built around your business and audience, not a generic stock template.',
      },
    ],
    relatedIds: ['web-design', 'digital-marketing'],
  },

  'seo-growth': {
    tagline: 'Rank on merit, then keep the spot.',
    heroNote: 'Technical SEO, content and CRO working as one loop',
    featureCards: [
      {
        title: 'Technical SEO',
        description:
          'Site speed, crawlability and structured data fixed at the root, so content has a technically sound site to rank on top of.',
      },
      {
        title: 'Content Strategy',
        description:
          'Topics mapped to real search intent and your actual funnel, not a content calendar chasing keyword volume alone.',
      },
      {
        title: 'CRO & A/B Testing',
        description:
          'Traffic that converts is worth more than traffic that doesn\'t — we test page changes against real conversion data.',
      },
      {
        title: 'Local SEO',
        description:
          'Google Business Profile, citations and local content tuned for the searches that actually walk through your door.',
      },
    ],
    process: [
      { step: '01', title: 'Technical Audit', description: 'A full crawl and speed/structure review to find what\'s actively holding rankings back.' },
      { step: '02', title: 'Content & Keyword Map', description: 'A prioritized content plan built around intent and current competitive gaps.' },
      { step: '03', title: 'On-Page & CRO', description: 'Pages optimized for both search engines and the humans who land on them.' },
      { step: '04', title: 'Track & Compound', description: 'Ongoing measurement so wins compound instead of resetting to zero every quarter.' },
    ],
    tools: ['Search Console', 'Ahrefs', 'Google Analytics 4', 'Google Business Profile'],
    faqs: [
      {
        q: 'How long until we see SEO results?',
        a: 'Meaningful movement usually starts in 2–4 months and compounds from there — anyone promising overnight rankings isn\'t being straight with you.',
      },
      {
        q: 'Do you write the content yourselves?',
        a: 'Yes, in-house, briefed against real keyword and competitor research rather than outsourced to a generic content mill.',
      },
      {
        q: 'Is SEO a one-time project or ongoing?',
        a: 'Technical fixes are largely one-time; content and authority-building are ongoing — we\'re upfront about which budget line covers which.',
      },
      {
        q: 'Do you also handle local/Google Business Profile SEO?',
        a: 'Yes — profile optimization, citations and review strategy are part of the same engagement where relevant.',
      },
    ],
    relatedIds: ['digital-marketing', 'web-development'],
  },
}
