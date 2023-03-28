/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary
        "blue-moderate": "hsl(238, 40%, 52%)",
        "red-soft": "hsl(358, 79%, 66%)",
        "blue-grayish-light": "hsl(239, 57%, 85%)",
        "red-pale": "hsl(357, 100%, 86%)",
        // Neutral
        "blue-dark": "hsl(212, 24%, 26%)",
        "blue-grayish": "hsl(211, 10%, 45%)",
        "gray-light": "hsl(223, 19%, 93%)",
        "gray-very-light": "hsl(228, 33%, 97%)",
      },
      fontFamily: {
        rubik: ["rubik"],
      },
    },
  },
  plugins: [],
};
