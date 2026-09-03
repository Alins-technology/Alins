/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#ffffff',
          soft: '#f8f8fd',
          surface: '#f2f3fb',
          card: '#ffffff',
          border: '#e7e7f4',
        },
        primary: {
          DEFAULT: '#3b6dfb',
          50: '#eef3ff',
          100: '#dbe6ff',
          200: '#b3caff',
          300: '#8aa6ff',
          400: '#5c81ff',
          500: '#3b6dfb',
          600: '#2650e0',
          700: '#1d3fb8',
          800: '#1b358f',
          900: '#1b3070',
        },
        nebula: {
          DEFAULT: '#8b5cf6',
          soft: '#c084fc',
          deep: '#5b21b6',
          pink: '#d946a8',
        },
        flame: {
          DEFAULT: '#ff7a30',
          hot: '#e8630f',
          core: '#fff2c9',
          deep: '#c23a12',
        },
        accent: {
          DEFAULT: '#0891a8',
          50: '#eafcff',
          100: '#cef7fd',
          200: '#9cecf9',
          300: '#5fdaf2',
          400: '#22d3ee',
          500: '#0891a8',
          600: '#0b7285',
          700: '#0e5c6c',
          soft: '#00c2d6',
          deep: '#0b7285',
        },
        ink: {
          DEFAULT: '#15162e',
          muted: '#5c5e7d',
          faint: '#9294b3',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', '"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      // Fluid, clamp()-based type scale — every heading/body size in the
      // site should pull from here instead of ad-hoc `text-4xl sm:text-5xl
      // lg:text-6xl` combos. Clamp interpolates smoothly between the two
      // ends instead of jumping at Tailwind's fixed breakpoints.
      //
      // Sizes are deliberately restrained — only the real page hero (Hero.jsx)
      // uses `fluid-display`. Everything else that reads as "a section's big
      // statement" (AgencyIntro, StoryMorph, PageHeader, ServiceSection, ...)
      // shares `fluid-h1`, capped well under the old 60-68px range, so the
      // page has ONE clear largest element instead of six equally shouting
      // ones stacked on top of each other.
      fontSize: {
        'fluid-xs': ['clamp(0.75rem, 0.72rem + 0.1vw, 0.8125rem)', { lineHeight: '1.5' }],
        'fluid-sm': ['clamp(0.8125rem, 0.78rem + 0.15vw, 0.9375rem)', { lineHeight: '1.55' }],
        'fluid-base': ['clamp(0.9375rem, 0.9rem + 0.2vw, 1.0625rem)', { lineHeight: '1.65' }],
        'fluid-lg': ['clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)', { lineHeight: '1.6' }],
        'fluid-xl': ['clamp(1.125rem, 1.02rem + 0.5vw, 1.375rem)', { lineHeight: '1.5' }],
        'fluid-stat': ['clamp(1.75rem, 1.45rem + 1.3vw, 2.75rem)', { lineHeight: '1.05' }],
        'fluid-h3': ['clamp(1.375rem, 1.2rem + 0.8vw, 2rem)', { lineHeight: '1.25' }],
        'fluid-h2': ['clamp(1.625rem, 1.35rem + 1.2vw, 2.5rem)', { lineHeight: '1.15' }],
        'fluid-h1': ['clamp(1.875rem, 1.5rem + 1.6vw, 3.25rem)', { lineHeight: '1.1' }],
        'fluid-display': ['clamp(2.25rem, 1.6rem + 2.5vw, 3.75rem)', { lineHeight: '1.05' }],
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(ellipse 70% 50% at 15% 0%, rgba(8,145,168,0.09), transparent 55%), radial-gradient(ellipse 60% 50% at 85% 15%, rgba(59,109,251,0.10), transparent 50%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(255,122,48,0.06), transparent 55%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: '0 0 40px rgba(59,109,251,0.22)',
        'glow-cyan': '0 0 40px rgba(8,145,168,0.2)',
        'glow-accent': '0 0 36px rgba(34,211,238,0.35)',
        'glow-nebula': '0 0 50px rgba(139,92,246,0.22)',
        'glow-flame': '0 0 45px rgba(255,122,48,0.25)',
        card: '0 10px 40px -12px rgba(20,20,50,0.12)',
        nav: '0 8px 30px -12px rgba(8,145,168,0.16)',
        'nav-scrolled': '0 16px 44px -14px rgba(8,145,168,0.26)',
      },
      animation: {
        'spin-slow': 'spin 14s linear infinite',
        'spin-slower': 'spin 26s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delay': 'float 7s ease-in-out 1.5s infinite',
        marquee: 'marquee 28s linear infinite',
        'float-soft': 'floatSoft 5s ease-in-out infinite',
        'float-soft-delay': 'floatSoft 5s ease-in-out 1.4s infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        gradient: 'gradientShift 8s ease infinite',
        twinkle: 'twinkle 2.4s ease-in-out infinite',
        flicker: 'flicker 0.4s ease-in-out infinite',
        // Preloader liquid-wave drift — same seamless-tile technique as
        // `marquee` above, but a fixed -1000px shift (matching the SVG
        // wordmark's WAVE_TILE/viewBox width in Preloader.jsx) instead of a
        // percentage, since percentage-based transforms don't resolve
        // consistently against an SVG child element's box across browsers.
        'wave-drift-back': 'waveDrift 10s linear infinite',
        'wave-drift-front': 'waveDrift 6.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floatSoft: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.08)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.25 },
          '50%': { opacity: 1 },
        },
        flicker: {
          '0%, 100%': { transform: 'scaleY(1) scaleX(1)', opacity: 1 },
          '50%': { transform: 'scaleY(0.85) scaleX(1.08)', opacity: 0.85 },
        },
        waveDrift: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-1000px)' },
        },
      },
    },
  },
  plugins: [],
}
