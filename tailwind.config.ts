import { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      red: "#813338",
      brown: "#905F25",
      olive: "#5C4700",
      yellow: "#EDF171",
      green: "#56AC4D",
      lime: "#A9FF9F",
      blue: "#75CEC8",
      indigo: "#706DE3",
      navy: "#2E2C9B",
      "light-gray": "#B2B2B2",
      "medium-gray": "#7B7B7B",
      "dark-gray": "#4A4A4A",
      black: "#000000",
      white: "#FFFFFF",
    },
  },
  plugins: [],
} satisfies Config;
