/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        gray: {
          775: '#253041',
          750: '#2B384B',
        },
        yellow: {
          550: '#FBB159',
        },
      },
      height: {
        100: '30rem',
        150: '44rem',
        200: '200px',
        500: '500px',
      },
      spacing: {
        120: '120px',
      },
    },
  },
  plugins: [require('autoprefixer')],
};
