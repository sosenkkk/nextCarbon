/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const {nextui} = require("@nextui-org/react")
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      semiblack:"rgb(27,27,27,0.7)",
      semiwhite:"rgb(255,255,255,0.55)"
      
    },
    extend: {
      backgroundImage: {
        "dark-theme": "url('/img/blackTheme1.jpg')",
        "light-theme": "url('/img/whiteTheme.jpg')",
        light: "url('/img/white.jpg')",
        dark: "url('/img/black.jpg')",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
    
  },
  darkMode: "class",

  plugins: [
    require("flowbite/plugin"),
    plugin(function ({ addVariant, e, postcss }) {
      addVariant("firefox", ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: "-moz-document",
          params: "url-prefix()",
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    }),
    nextui()
  ],

};
