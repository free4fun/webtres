/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,css}'],
  theme: {
    extend: {
      colors: {
        "alt": 'var(--alt)',
      },
    },
  },
  plugins: [],
}
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
