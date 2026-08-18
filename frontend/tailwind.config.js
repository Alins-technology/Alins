/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#040309',
          soft: '#070511',
          surface: '#0a0817',
          card: '#0c091a',
          border: '#1e1a35',
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
          hot: '#ffb84d',
          core: '#fff2c9',
          deep: '#e0451a',
        },
        accent: {
          DEFAULT: '#00e9f7',
          soft: '#7df3ff',
          deep: '#0b7285',
        },
        ink: {
          DEFAULT: '#eceafc',
          muted: '#928dbd',
          faint: '#59547f',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', '"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(ellipse 70% 50% at 15% 0%, rgba(0,233,247,0.10), transparent 55%), radial-gradient(ellipse 60% 50% at 85% 15%, rgba(59,109,251,0.16), transparent 50%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(255,122,48,0.06), transparent 55%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: '0 0 40px rgba(59,109,251,0.35)',
        'glow-cyan': '0 0 40px rgba(0,233,247,0.3)',
        'glow-nebula': '0 0 50px rgba(139,92,246,0.35)',
        'glow-flame': '0 0 45px rgba(255,122,48,0.4)',
        card: '0 10px 40px -12px rgba(0,0,0,0.6)',
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
      },
    },
  },
  plugins: [],
}
