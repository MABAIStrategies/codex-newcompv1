/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#000C1F',
        navy: '#0B1A30',
        gold: '#D4AF37',
        alabaster: '#F8F9FA',
      },
      boxShadow: {
        glow: '0 0 20px rgba(212, 175, 55, 0.4)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};
