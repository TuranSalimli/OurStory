/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF3EE',
        blush: {
          DEFAULT: '#F3C9C6',
          light: '#F9E4E1',
          dark: '#E3A8A6',
        },
        rose: {
          DEFAULT: '#C5788A',
          dark: '#A65D71',
        },
        plum: {
          DEFAULT: '#4A2E3B',
          light: '#6E4A5C',
        },
        sage: {
          DEFAULT: '#A9B79C',
          light: '#D3DCC9',
        },
        gold: '#CBA46B',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Outfit"', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(74, 46, 59, 0.25)',
        petal: '0 6px 20px -6px rgba(197, 120, 138, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(3deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(0.9)' },
          '50%': { opacity: 1, transform: 'scale(1.15)' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        sparkle: 'sparkle 2.4s ease-in-out infinite',
        pulseSlow: 'pulseSlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
