/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#fdfbf7',
          100: '#f7f2e7',
          200: '#ede2ce',
          300: '#dfcdb0',
          400: '#ccaF8b',
          500: '#b8946b',
          800: '#3a2b1f',
          900: '#231912',
        },
        vintage: {
          ink: '#1c1815',
          faded: '#4a4036',
          chord: '#8b2616', // striking reddish/warm ink for chords or classic dark ink
          badge: '#2d241e',
          sepia: '#e8dcbe',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        book: ['"EB Garamond"', '"Crimson Pro"', 'Garamond', 'Georgia', 'serif'],
        typewriter: ['"Courier Prime"', '"Special Elite"', 'Courier', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'book': '0 4px 20px -2px rgba(45, 30, 15, 0.15), 0 0 4px rgba(45, 30, 15, 0.1)',
        'book-deep': '0 12px 35px -4px rgba(45, 30, 15, 0.25), 0 0 8px rgba(45, 30, 15, 0.15)',
      }
    },
  },
  plugins: [],
}
