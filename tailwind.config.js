/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
        extraBold: 800,
      },
      boxShadow: {
        'default': '0px 8px 18px 0px rgba(168, 178, 198, 0.45)',
        'backblue': '0px 4px 10px 0px rgba(49, 78, 141, 0.25);',
        'blue': '0px 4px 10px 0px rgba(180, 184, 201, 0.40)',
        'nav': '0px -6px 10px 0px rgba(168, 178, 198, 0.45);',
        'strong': '0px 8px 20px 0px rgba(132, 150, 185, 0.45)',
        'blurback': '0px 20px 10px 0px rgba(216, 231, 249, 0.25)',
      },
      colors: {
        gray: '#7d848d',
        black: '#2e2e2e',
        graylight: '#D7D7D7',
        input: '#FEFEFE',
      }
    },
    screens: {
      xs: "420px",
      // => @media (min-width: 640px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
