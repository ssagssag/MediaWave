/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        title: ['PartialSansKR-Regular', 'ui-sans-serif', 'system-ui'],
        noto: ['"Noto Sans"', 'sans-serif'],
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
        'custom-light': '0 10px 10px rgba(255, 255, 255, 0.1)',
        'custom-heavy': '0 10px 10px rgba(0, 0, 0, 0.3)',
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
