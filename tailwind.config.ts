import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      colors: {
        green: {
          50: '#f0f5fa',
          100: '#d9e5f0',
          200: '#b3cce1',
          300: '#8db2d2',
          400: '#4d80b0',
          500: '#1a5a8e',
          600: '#0d4775',
          700: '#06355d',
          800: '#042a4a',
          900: '#031c35',
          950: '#011020',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
        },
        secondary: 'var(--secondary)',
      },
      fontFamily: {
        sans: ['var(--font-arvo)', 'serif'],
        arvo: ['var(--font-arvo)', 'serif'],
      },
      spacing: {
        'section': 'var(--section-padding)',
        'grid-gap': 'var(--grid-gap)',
      },
      backgroundColor: {
        'primary': 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        'secondary': 'var(--secondary)',
      },
      textColor: {
        'primary': 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        'light': 'var(--text-light)',
        'dark': 'var(--text-dark)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default config;
