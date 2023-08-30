/** @type {import('tailwindcss').Config} */
const { colors } = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#efece8",
        ...colors,
      },
      fontSize: {
        "10xl": 150,
      },
    },
  },
  plugins: [],
};
