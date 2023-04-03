const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{njs,nts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.fuchsia,
        neutral: {
          1000: '#0E0E0E',
          1100: '#050505',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
