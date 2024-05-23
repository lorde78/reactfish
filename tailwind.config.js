/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBackground: '#1A202C', // A nice dark gray color
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
