/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-red-100',
    'bg-blue-100',
    'bg-green-100',
    'bg-yellow-100',
    'bg-red-200',
    'bg-blue-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-red-700',
    'bg-blue-700',
    'bg-green-700',
    'bg-yellow-700',
    'bg-yellow-700',
    'text-blue-700',
    'text-green-700',
    'text-yellow-700',
  ],
}
