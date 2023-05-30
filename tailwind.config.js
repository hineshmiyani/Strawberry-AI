/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        textPrimary: '#0D111C',
        textSecondary: '#5D6785',
        textDarkBlue: '#0a192f',
        textPink: '#fb118e',
        lightPink: '#fb118e1f',
      },
    },
  },
  plugins: [],
}
