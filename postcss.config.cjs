const tailwindcss = require('@tailwindcss/postcss')

module.exports = {
  plugins: [
    tailwindcss,
    require('autoprefixer'),
  ],
}
// This configuration file is for PostCSS, a tool for transforming CSS with JavaScript.
// It uses the Tailwind CSS plugin and Autoprefixer plugin.
// The Tailwind CSS plugin is used to generate utility classes for styling.
// The Autoprefixer plugin is used to add vendor prefixes to CSS rules.
// The configuration file exports an object with a plugins array.
// The plugins array contains the Tailwind CSS and Autoprefixer plugins.
