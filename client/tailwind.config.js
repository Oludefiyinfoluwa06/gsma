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
  variants: {
    extend: {
      scrollbar: ['rounded']
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
        '.scrollbar-thumb': {
          'scrollbar-color': '#4A5568 #EDF2F7',
        },
        '.scrollbar-thumb-rounded': {
          'scrollbar-color': '#4A5568 #EDF2F7',
          'scrollbar-width': 'thin',
        },
        '.scrollbar-thumb-width': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#4A5568',
            borderRadius: '4px',
          },
        },
      });
    }
  ],
}