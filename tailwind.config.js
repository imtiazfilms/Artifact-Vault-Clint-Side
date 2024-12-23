/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';
import filters from 'tailwindcss-filters';


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
   daisyui,
   filters
  ],
  daisyui: {
    themes: ["retro"],
  },
}