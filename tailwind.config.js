module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      lato: ["Lato, sans-serif"],
      shizuru: ["Shizuru"],
    },
    extend: {
      colors: {
        pri: {
          100: "#d0d6e1",
          200: "#a0adc4",
          300: "#7184a6",
          400: "#415b89",
          500: "#12326b",
          600: "#0e2856",
          700: "#0b1e40",
          800: "#07142b",
          900: "#040a15",
        },
      },
    },
  },
  plugins: [],
};
