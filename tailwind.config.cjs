/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-red-700',
    'bg-green-700',
    'bg-blue-700',
    'bg-yellow-700',
  ],
}
