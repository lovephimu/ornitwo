/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '400px',
      md: '768px',
    },
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
          725: '#457B9D',
        },
        yellow: {
          550: '#FBB159',
        },
        red: {
          550: '#EF626C',
        },
      },
      height: {
        100: '30rem',
        150: '44rem',
        200: '200px',
        500: '500px',
        600: '55rem',
      },
      width: {
        100: '30rem',
        120: '35rem',
        150: '44rem',
        200: '60rem',
        500: '500px',
      },
      minWidth: {
        50: '15rem',
        120: '35rem',
        150: '180rem',
        '1/2': '50%',
      },
      maxWidth: {
        120: '35rem',
        150: '40rem',
        '8/10': '80%',
        '6/10': '60%',
      },
      spacing: {
        120: '120px',
      },
    },
  },
  plugins: [require('autoprefixer'), require('daisyui')],
};
