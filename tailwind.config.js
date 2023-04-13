/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'blueColor': '#2A68FF',
        'greyIsh': '#9333ea',
        'cardShadow': '#aac3bd',
        'textColor': '#252b36',
        'yellowColor' : '#ffff00'
      }
    },
  },
  plugins: [],
}

