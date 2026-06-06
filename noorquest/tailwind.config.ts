import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          50: '#EAF6FF',
          100: '#CFE7FA',
          300: '#7CC4F2',
          600: '#1E88E5',
        },
        sun: {
          100: '#FFF1C2',
          300: '#FFD966',
          500: '#FFC107',
        },
        sage: {
          100: '#D7ECDF',
          300: '#A8D5BA',
          600: '#43A047',
        },
        coral: {
          100: '#FFD7C6',
          300: '#FFAB91',
          600: '#E64A19',
        },
        teal: {
          50: '#E0F2F1',
          100: '#B2DFDB',
          600: '#00897B',
        },
        cream: '#FFF8E7',
        ink: '#1A2A3A',
      },
      fontFamily: {
        kid: ['Nunito', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        bob: 'bob 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
