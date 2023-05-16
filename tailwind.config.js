/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    screens: {
      xs: '330px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
    },
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [],
  },
}
