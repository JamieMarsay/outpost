/** @type {import('tailwindcss').Config} */
const { colors } = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
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
