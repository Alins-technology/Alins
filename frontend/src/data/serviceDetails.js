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
    deepDive: {
      intro:
        'Website design is one of the most important parts of your brand, your customers’ experience and your business’s growth. We combine creative website design, usability, responsive design and business strategy to help your brand make an impression online — every solution shaped around your specific goals and audience.',
      sections: [
        {
          id: 'wd-grow-business',
          heading: 'Web Design Services Which Help You Grow Your Business',
          body: [
            'Our Web Design Services are built to produce professional, easy-to-navigate websites — a corporate website, a service-business site, or a dedicated digital platform, whatever the business needs. The focus stays on a clean, user-friendly experience from end to end.',
            'A professional website communicates your message clearly, promotes your services, generates leads and builds the credibility a visitor needs before they get in touch.',
          ],
        },
        {
          id: 'wd-professional',
          heading: 'Professional Web Design for Your Brand',
          body: [
            'Every part of your site is custom designed around your business’s identity. The goal is a site that genuinely reflects who you are and gives every visitor an enjoyable, frictionless experience.',
          ],
        },
        {
          id: 'wd-custom-solutions',
          heading: 'Custom Web Design Solutions',
          body: [
            'Every brand has its own requirements, and that’s exactly where custom design earns its keep. We shape your site’s design around your services, audience and business goals rather than fitting you into a template.',
            'That means an exclusive structure, a services page built for what you actually sell, and the elements that let you build a genuinely unique online image.',
          ],
        },
        {
          id: 'wd-why-alins',
          heading: 'Why Choose ALINS Technologies as Your Web Design Company?',
          body: [
            'The right web design company is critical to your site’s success. We aim for the balance between technology and creativity that turns into genuinely practical solutions for the businesses we work with.',
          ],
          bullets: [
            'Site designing for business',
            'Modern and neat designs for sites',
            'Mobile-compatible sites',
            'User-friendly navigation',
            'Customization of sites',
            'Performance-based development',
            'Search Engine Optimization',
            'Expandable solutions for growing businesses',
          ],
        },
        {
          id: 'wd-noida',
          heading: 'Website Design Company for Noida Businesses',
          body: [
            'Looking for a Website Design Company in Noida? A good website design is necessary no matter what business you run. Our Professional Websites are designed with an approach that keeps your site consistent with your brand identity while making it easy for visitors to reach you.',
          ],
        },
        {
          id: 'wd-indirapuram',
          heading: 'Web Design Services in Indirapuram',
          body: [
            'For any local business in Indirapuram, a user-friendly, visually appealing, mobile-compatible website is essential for generating enquiries. We design tailor-made websites for local businesses across Indirapuram, Ghaziabad, Noida and the surrounding areas.',
          ],
        },
        {
          id: 'wd-responsive',
          heading: 'Responsive Web Design for Every Device',
          body: [
            'People access websites on mobile phones, tablets, laptops and desktop computers — which is exactly why responsive web design is a non-negotiable part of any modern site. A responsive design adapts to the screen it’s viewed on, so every visitor gets a site that actually works, and that’s the standard every build here is held to.',
          ],
        },
        {
          id: 'wd-build-your-website',
          heading: 'Build Your Website with ALINS Technologies',
          body: [
            'Your website should portray the services your business offers, build trust with visitors and make it easy to get in touch. With Web Design Services, Custom Web Design, Responsive Designs and complete Website Solutions, we help establish an effective digital platform for your business.',
            'Whether it’s a brand-new website or a redesign of an existing one, we’ll help you build a site that fits your objectives. For professional web design services in Noida and Indirapuram, choose ALINS Technologies.',
          ],
        },
      ],
    },
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
    deepDive: {
      intro:
        'Website development plays an important role for businesses that want to establish credibility, attract customers and grow online. We provide customized web development solutions for the specific requirements of startups, small businesses and organizations — from business websites to complex web applications, built to be functional, user-friendly and secure.',
      sections: [
        {
          id: 'wdv-custom-noida',
          heading: 'Custom Website Development in Noida',
          body: [
            'Businesses searching for custom website development in Noida can work with us to build websites tailored to their brand, services, audience and business requirements. Unlike generic templates, custom development produces a website structure designed specifically around what the business needs.',
            'The approach centers on clean layouts, practical functionality, responsive experiences and a structure that supports future improvements — whether you need a corporate website, a service-based website, a portfolio, or a fully custom online platform.',
          ],
        },
        {
          id: 'wdv-developer-noida',
          heading: 'Website Developer in Noida',
          body: [
            'An experienced website developer in Noida keeps the development process organized and effective. We start by understanding the purpose of the website and the functionality it needs to deliver.',
            'Website structure, navigation, user experience, mobile compatibility, performance and future scalability are all considered from day one — so the result is professional to look at and practical to run day to day.',
          ],
        },
        {
          id: 'wdv-agency-noida',
          heading: 'Web Development Agency in Noida',
          body: [
            'As a web development agency in Noida, we provide solutions that support your online presence and your business requirements, tailored across a variety of industries and business models.',
            'From planning and design through to development and testing, the focus stays on a seamless visitor experience and a convenient way for your team to manage its digital presence.',
          ],
        },
        {
          id: 'wdv-company-noida',
          heading: 'Website Development Company in Noida',
          body: [
            'Choosing the right website development company in Noida matters for a business that wants its website to represent the brand and make customer interactions easy. We combine technology, design and business understanding to build websites tailored to your individual requirements.',
            'Sites are developed with real attention to information architecture, intuitive navigation and relevant functionality — with room to plan additional features as your digital requirements evolve.',
          ],
        },
        {
          id: 'wdv-agency-indirapuram',
          heading: 'Web Development Agency in Indirapuram',
          body: [
            'For businesses searching for a web development agency in Indirapuram, we offer professional website development for local businesses, startups, professionals and organizations.',
            'Given how varied digital requirements can be, we take the time to understand your services, audience and objectives before building a website that reflects your identity and stays convenient for users.',
          ],
        },
        {
          id: 'wdv-custom-indirapuram',
          heading: 'Custom Web Development in Indirapuram',
          body: [
            'Custom web development in Indirapuram is the right call when your business needs functionality beyond a basic website. A customized solution can be designed around your specific workflows, features, integrations and customer requirements.',
            'We build customized websites and digital platforms focused on usability, scalability and functionality — an approach that lets your website scale as your business grows.',
          ],
        },
        {
          id: 'wdv-professional',
          heading: 'Professional Website Development',
          body: [
            'A professional website is more than a set of visually appealing pages. A quality website needs a logical structure, clear navigation, useful content, responsive layouts and functionality aligned with your business goals.',
            'We focus on delivering a professional digital experience built around usability and business requirements — suitable for companies that want to showcase their services, generate enquiries, communicate with customers and establish a real online presence.',
          ],
        },
        {
          id: 'wdv-responsive',
          heading: 'Responsive Web Development',
          body: [
            'With users accessing sites via smartphones, tablets, laptops and desktop computers, responsive web development is an essential part of any modern website — one that automatically adapts its layout and content to different screen sizes.',
            'We build websites that offer a consistent browsing experience across every device, with mobile-friendly layouts that keep things convenient for anyone interacting with your business online.',
          ],
        },
        {
          id: 'wdv-business-website',
          heading: 'Business Website Development',
          body: [
            'Business website development is about building an online platform that supports the goals of your organization — a place to showcase services, explain your expertise, generate enquiries, provide contact information and build trust with potential customers.',
            'We develop business websites designed around your organization’s requirements, branding, target audience and desired functionality, aiming for a digital presence that’s both professional and convenient.',
          ],
        },
        {
          id: 'wdv-web-app',
          heading: 'Web Application Development',
          body: [
            'For businesses that need an interactive platform or specialized functionality, web application development offers a more customized solution — dashboards, customer portals, booking systems, management platforms and more.',
            'Development is centered on your intended users and business workflows, with customized functionality, responsive interfaces and scalable structures built for requirements that keep evolving.',
          ],
        },
        {
          id: 'wdv-build-your-website',
          heading: 'Build Your Website with ALINS Technologies',
          body: [
            'A well-developed website is a strong foundation for your digital presence. Whether you need custom website development in Noida, professional website development in Indirapuram, or a customized web application, we build solutions focused on your specific business requirements.',
            'By focusing on functionality, usability, responsive design and scalability, we help businesses build digital platforms that are ready for their current needs and their future growth.',
          ],
        },
      ],
    },
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
    deepDive: {
      intro:
        'As technology moves forward, the role mobile and web applications play in customer interaction and running a business can’t be overstated. Our App Development Services help start-ups and existing businesses turn their ideas into working products — built around usability, efficiency and security, whether you need an Android app, an iOS app, or a web application.',
      sections: [
        {
          id: 'app-mobile-services',
          heading: 'Mobile App Development Services',
          body: [
            'Our Mobile Application Development Services help businesses give customers convenient access to their products, services, information and processes — the kind of access that lifts both user experience and business growth.',
            'We build for proper navigation, a clear interface, real functionality and genuine usability. Before development even starts, we think through your target audience, your business needs, the app’s features and where you want it to go.',
          ],
        },
        {
          id: 'app-android',
          heading: 'Android App Development',
          body: [
            'Android app development matters because it puts your business in front of a huge number of people on the phones they already carry. We build Android applications around what your business actually needs — whether that’s a new customer-facing service or an internal business tool.',
            'The core of every Android build is a usable interface, dependability, performance and scalability. We help plan the app’s features and its ability to scale, from simple tools to sophisticated platforms.',
          ],
        },
        {
          id: 'app-ios',
          heading: 'iOS App Development',
          body: [
            'For businesses that want to reach Apple users, iOS App Development delivers a distinct mobile experience — one that pays attention to usability, interface and performance from the start.',
            'A well-built iOS app strengthens your online presence and gives customers a convenient way to use your service. We work closely with you to understand exactly what the app needs to do, whether you’re building new or adding a feature to something that already exists.',
          ],
        },
        {
          id: 'app-custom',
          heading: 'Custom App Development',
          body: [
            'Every organization has its own goals, workflows and needs. Custom App Development builds an application around how your business actually functions, instead of bending a generic solution to fit.',
            'We help design custom applications around your business model, requirements, target audience and growth plans — customer portals, booking apps, service apps, business management apps and more. The goal is always an app built for your requirement that also happens to be genuinely user-friendly.',
          ],
        },
        {
          id: 'app-dev-company-mobile',
          heading: 'Mobile Application Development Company',
          body: [
            'Choosing the right Mobile Application Development Company matters when the app is meant to serve your customers or your business. That company needs real expertise across programming, user experience, functionality and performance.',
            'We bring technology and innovation to bear on mobile applications built for different business requirements, starting from why the application is needed so the functionality and structure both serve a real purpose.',
          ],
        },
        {
          id: 'app-dev-company',
          heading: 'App Development Company',
          body: [
            'As an App Development company, we focus on building digital products designed around business needs — application design, interface design, development, testing and enhancement, in that order.',
            'The clearest path to a successful app starts with identifying the problem it needs to solve. Defining the target audience and features early gives us a far more purposeful digital product — whether you’re a startup with a new idea or a company looking for a digital upgrade.',
          ],
        },
        {
          id: 'app-web-services',
          heading: 'Web App Development Services',
          body: [
            'An app doesn’t have to live only on a phone. Web App Development Services deliver interactive applications accessible straight from a browser — customer portals, management systems, dashboards, booking systems and other digital service tools.',
            'We build web applications with usability, responsive design and functionality tied directly to your business requirements, so managing your digital services stays convenient for you and your customers alike.',
          ],
        },
        {
          id: 'app-noida',
          heading: 'App Development Company in Noida',
          body: [
            'If you’re looking for an App Development Company in Noida, we handle both web and mobile application needs. Noida’s startup scene is full of service and technology companies that rely on digital platforms to reach their customers — and we tailor every application to the specific business behind it.',
          ],
        },
        {
          id: 'app-indirapuram',
          heading: 'App Development Company in Indirapuram',
          body: [
            'Looking for an App Development Company in Indirapuram? Our team develops digital solutions across Android, iOS and web, based on your market and business requirements — always aiming for an application that’s easy to use, flexible and built around the business, not a generic shell.',
            'Running a business in Indirapuram, Ghaziabad, Noida or a nearby area? We provide custom application solutions matched to your industry.',
          ],
        },
        {
          id: 'app-build-your-application',
          heading: 'Build Your Application with ALINS Technologies',
          body: [
            'An application needs to do more than look good — it needs real functionality, usability, performance and purpose, all working together. That combination is what we build into every App Development Service we deliver.',
            'Whether you need Android App Development, iOS App Development, Custom App Development, Mobile App Development Services or Web App Development Services, we’ll help bring your idea to life as a working digital product — for businesses in Noida, Indirapuram and the surrounding areas.',
          ],
        },
      ],
    },
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
    deepDive: {
      intro:
        'Visual communication plays an important role in how customers identify and remember a business online. We provide Professional Graphic Designing Services that help businesses create visual images that are attractive, cohesive and effective — every service customized to reflect your business’s own identity, balancing visual cohesion with clear communication.',
      sections: [
        {
          id: 'gd-creative-services',
          heading: 'Creative Graphic Design Services for Businesses',
          body: [
            'Our Graphic Design Services cover a wide range of creative requirements for businesses, startups, professionals and organizations. Every design is planned around the purpose of the communication, the target audience and the overall brand style.',
            'Whether you need social media creatives, marketing banners, brochures, business cards, presentations or other promotional materials, we focus on designs that communicate your message clearly while staying professional in appearance.',
          ],
        },
        {
          id: 'gd-represents-brand',
          heading: 'Professional Graphic Design That Represents Your Brand',
          body: [
            'Professional graphic design isn’t just about making something attractive — a good design has to communicate the right message, reflect your brand personality and make important information easy to understand.',
            'We think about typography, layout, imagery, spacing and visual hierarchy in every creative asset we build, which keeps your appearance consistent across every marketing channel — from a single promotional graphic to a complete visual identity.',
          ],
        },
        {
          id: 'gd-digital-marketing-creative',
          heading: 'Professional Graphic Design Creative for Digital Marketing',
          body: [
            'Businesses need a steady stream of fresh visual content for digital marketing — advertisements, social media posts, website banners, promotional graphics and campaign materials that stay engaging over time.',
            'We build digital creatives around your campaign objectives and brand guidelines, adapting designs across platforms and formats while keeping the visual identity consistent — so offers, services, announcements and other important messages land clearly with your audience.',
          ],
        },
        {
          id: 'gd-branding',
          heading: 'Branding and Graphic Design Services',
          body: [
            'Strong branding comes down to consistency. Our Branding and Graphic Design Services help businesses build a recognizable visual identity across every piece of marketing they put out.',
          ],
          bullets: [
            'Logo design',
            'Brand identity elements',
            'Business cards',
            'Brochures and flyers',
            'Social media creatives',
            'Digital advertisements',
            'Website graphics',
            'Marketing banners',
            'Presentation designs',
            'Promotional materials',
          ],
          note: 'Maintaining consistent fonts, layouts, imagery and other visual elements across all of these gives a business a more recognizable, professional presence.',
        },
        {
          id: 'gd-company-growing',
          heading: 'Graphic Design Company for Growing Businesses',
          body: [
            'Choosing the right Graphic Design Company helps a business maintain quality and consistency across its visual communication. We work with businesses to understand their requirements before creating any design concepts.',
            'Our process focuses on understanding the purpose of the design, identifying the intended audience and developing concepts that align with the brand — so the final design is visually appealing and genuinely relevant to the business objective. Whether you need individual creative designs or ongoing graphic design support, we build around your requirements.',
          ],
        },
        {
          id: 'gd-noida-company',
          heading: 'Graphic Design Company in Noida',
          body: [
            'Businesses searching for a Graphic Design Company in Noida can work with us for creative and branding needs. Noida is home to startups, technology companies, service providers, retailers and established businesses that all need professional visual communication for a growing digital presence.',
            'We build customized graphics for businesses in Noida, helping them maintain a consistent visual identity across websites, social media, advertisements and every other marketing channel.',
          ],
        },
        {
          id: 'gd-indirapuram-company',
          heading: 'Graphic Design Company in Indirapuram',
          body: [
            'Looking for a Graphic Design Company in Indirapuram? We provide customized design solutions for businesses and professionals, because different businesses need different visual styles — every design is created around your specific brand requirements.',
            'From social media creatives and promotional banners to logos and branding materials, we support businesses looking to improve their visual communication across Indirapuram, Ghaziabad and the nearby areas.',
          ],
        },
        {
          id: 'gd-noida-services',
          heading: 'Graphic Designing Services in Noida',
          body: [
            'Our Graphic Designing Services in Noida suit businesses that want professional, consistent creative content for their marketing activity — whether you’re launching a new brand, promoting a service, running a digital campaign, or refreshing an existing visual identity.',
            'We focus on designs that balance creativity with clarity, so your message stays easy to understand across every format.',
          ],
        },
        {
          id: 'gd-build-visual-identity',
          heading: 'Build a Strong Visual Identity with ALINS Technologies',
          body: [
            'A strong visual identity helps a business build recognition and communicate its values more effectively. We combine creativity, design principles and business understanding to deliver graphic design solutions for modern brands.',
            'From Graphic Design Services and Professional Graphic Design to Branding and Graphic Design Services, we help businesses create visual content that supports their marketing and communication goals — in Noida, Indirapuram and beyond.',
          ],
        },
      ],
    },
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
