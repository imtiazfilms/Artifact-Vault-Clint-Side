/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';
import filters from 'tailwindcss-filters';
import flowbitePlugin from 'flowbite/plugin';

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
    filters,
    flowbitePlugin
  ],
  daisyui: {
    themes: ["light", "dark", "retro", "forest", "black", "dim", "dracula", "abyss", "synthwave", "coffee", "lemonade"],
  },
}