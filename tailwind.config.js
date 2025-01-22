/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00ff00', // Pepe green
        secondary: '#ff69b4', // Fun pink
        accent: '#ffd700', // Gold
        background: '#0a0a0a',
      },
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
        'comic': ['"Comic Neue"', 'cursive'],
      },
    },
  },
  plugins: [],
}

