/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'premium-sage': '#8BA888',
        'premium-forest': '#4A5D4B',
        'premium-almond': '#FDFBF7',
        'premium-shell': '#E8E4DE',
        'premium-charcoal': '#3C3B3E',
        'accent-rose': '#D4A5A5',
        'accent-honey': '#E9C46A',
        'accent-azure': '#A2B9C5',
        'near-black': '#3C3B3E',
        'pure-white': '#FDFBF7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Roboto', '"Helvetica Neue"', 'sans-serif'],
        display: ['Quicksand', 'system-ui', 'Roboto', '"Helvetica Neue"', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        'full': '9999px',
      },
      boxShadow: {
        'card': 'rgba(60, 59, 62, 0.05) 0px 10px 25px',
        'hover-card': 'rgba(60, 59, 62, 0.08) 0px 15px 30px',
      },
    },
  },
  plugins: [],
};