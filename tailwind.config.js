/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'rausch-red': '#ff385c',
        'deep-rausch': '#e00b41',
        'near-black': '#222222',
        'focused-gray': '#3f3f3f',
        'secondary-gray': '#6a6a6a',
        'disabled-text': 'rgba(0,0,0,0.24)',
        'link-disabled': '#929292',
        'legal-blue': '#428bff',
        'border-gray': '#c1c1c1',
        'light-surface': '#f2f2f2',
        'pure-white': '#ffffff',
      },
      fontFamily: {
        sans: ['"Airbnb Cereal VF"', 'Circular', '-apple-system', 'system-ui', 'Roboto', '"Helvetica Neue"', 'sans-serif'],
        display: ['"Airbnb Cereal VF"', 'Circular', '-apple-system', 'system-ui', 'Roboto', '"Helvetica Neue"', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.25rem', // 4px
        'md': '0.5rem', // 8px
        'lg': '0.875rem', // 14px
        'xl': '1.25rem', // 20px
        '2xl': '2rem', // 32px
        'full': '9999px', // 50% for circular elements
      },
      boxShadow: {
        'card': 'rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px',
        'hover-card': 'rgba(0,0,0,0.08) 0px 4px 12px',
      },
    },
  },
  plugins: [],
};