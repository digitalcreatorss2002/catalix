/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f5ff',
          100: '#e6e6ff',
          200: '#b3b3ff',
          300: '#8080ff',
          400: '#4d4dff',
          500: '#1a1aff',
          600: '#0d0dd6',
          700: '#0909a3',
          800: '#06066b',
          900: '#04043a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

