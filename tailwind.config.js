/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5e67e6",
        background: "#ffffff",
        text: "#303030",
        input: "#f5f5f5",

        "primary-50": "#eff1fe",
        "primary-100": "#e2e5fd",
        "primary-200": "#cbcefa",
        "primary-300": "#a9aef6",
        "primary-400": "#8788ef",
        "primary-500": "#5e67e6",
        "primary-600": "#4d4ddb",
        "primary-700": "#413ec9",
        "primary-800": "#3634a3",
        "primary-900": "#302f81",
        "primary-950": "#1e1c4b",
      },
    },
  },
  plugins: [],
};
