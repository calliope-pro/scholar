/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Neo-Academic Bold Palette */

        /* Base colors - Clean & Bright */
        'base-cream': '#FFFBF7',
        'base-white': '#FFFFFF',
        'base-sand': '#F5F0E8',

        /* Primary - Bold Academic Blue */
        'primary-blue': '#1A4D7C',
        'primary-deep': '#0F2D47',
        'primary-light': '#2E6B9F',

        /* Accent - Sunset Orange */
        'accent-sunset': '#FF6B35',
        'accent-coral': '#FF8560',
        'accent-glow': '#FFB347',

        /* Text/Ink colors */
        'ink-dark': '#1A1A2E',
        'ink-medium': '#2D2D44',
        'ink-light': '#6B6B7B',

        /* Semantic */
        'success': '#10B981',
        'warning': '#F59E0B',
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
        display: ['"Noto Sans JP"', 'sans-serif'],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(26, 77, 124, 0.08), 0 8px 24px rgba(26, 77, 124, 0.06), 0 0 0 1px rgba(26, 77, 124, 0.05)',
        'card-hover': '0 4px 6px rgba(26, 77, 124, 0.08), 0 16px 48px rgba(26, 77, 124, 0.1), 0 0 0 1px rgba(26, 77, 124, 0.08)',
        'featured': '0 8px 16px rgba(26, 77, 124, 0.2), 0 24px 48px rgba(26, 77, 124, 0.15)',
        'featured-hover': '0 12px 24px rgba(26, 77, 124, 0.25), 0 32px 64px rgba(26, 77, 124, 0.2)',
        'glow-blue': '0 0 0 4px rgba(26, 77, 124, 0.1)',
      },
      animation: {
        'fade-in': 'fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in-left': 'slide-in-left 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'float-blob': 'float-blob 20s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'fade-in': {
          'from': { opacity: '0', transform: 'translateY(16px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          'from': { opacity: '0', transform: 'translateX(-32px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        'float-blob': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
}
