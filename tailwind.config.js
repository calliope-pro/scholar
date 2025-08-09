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
        morphism: {
          light: 'rgba(255, 255, 255, 0.15)',
          lighter: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.2)',
        }
      },
      boxShadow: {
        'morphism': '20px 20px 60px rgba(0, 0, 0, 0.3), -20px -20px 60px rgba(255, 255, 255, 0.1), inset 5px 5px 10px rgba(255, 255, 255, 0.1), inset -5px -5px 10px rgba(0, 0, 0, 0.1)',
        'morphism-hover': '25px 25px 80px rgba(0, 0, 0, 0.35), -25px -25px 80px rgba(255, 255, 255, 0.15), inset 8px 8px 16px rgba(255, 255, 255, 0.15), inset -8px -8px 16px rgba(0, 0, 0, 0.15)',
        'morphism-subtle': '15px 15px 40px rgba(0, 0, 0, 0.2), -15px -15px 40px rgba(255, 255, 255, 0.08), inset 3px 3px 6px rgba(255, 255, 255, 0.08), inset -3px -3px 6px rgba(0, 0, 0, 0.08)',
        'morphism-subtle-hover': '20px 20px 60px rgba(0, 0, 0, 0.25), -20px -20px 60px rgba(255, 255, 255, 0.1), inset 5px 5px 10px rgba(255, 255, 255, 0.1), inset -5px -5px 10px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        'morphism': '20px',
        'morphism-subtle': '15px',
      }
    },
  },
  plugins: [],
}
