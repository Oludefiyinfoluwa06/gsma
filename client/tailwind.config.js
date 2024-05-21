/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textError: '#721c24',
        bgError: '#f8d7da',
        transparentBlack: 'rgba(0, 0, 0, 0.65)',
      }
    },
  },
  plugins: [],
}