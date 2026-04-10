/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0D0D0D',
        darkCard: '#1A1A1A',
        accent: '#FF6B35',
        accentLight: '#FF8F5E',
      },
    },
  },
  plugins: [],
}
