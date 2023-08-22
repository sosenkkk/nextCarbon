/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "dark-theme": "url('/img/blackTheme.jpg')",
        "light-theme": "url('/img/whiteTheme.jpg')",
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
