/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Apple Color Emoji",
          "Arial",
          "sans-serif",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Sans KR",
          "Apple SD Gothic Neo",
          "맑은 고딕",
          "Malgun Gothic",
          "galmuri4",
          "galmuri9",
        ],
        title: ["PartialSansKR-Regular", "ui-sans-serif", "system-ui"],
        noto: ['"Noto Sans"', "sans-serif"],
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
        extraBold: 800,
      },
      fontSize: {
        "banner-title": ["3.75rem", { lineHeight: "auto", fontWeight: "700" }], // 6xl | Bold
        "banner-text": ["1.25rem", { lineHeight: "auto", fontWeight: "500" }], // xl | medium
        "banner-tag": ["1rem", { lineHeight: "auto", fontWeight: "600" }], // base | semibold

        "title-3xl": ["1.875rem", { lineHeight: "auto", fontWeight: "700" }], // 3xl | Bold
        "title-2xl": ["1.5rem", { lineHeight: "auto", fontWeight: "700" }], // 2xl | Bold
        "info-lg": ["1.125rem", { lineHeight: "auto", fontWeight: "600" }], // lg | semibold
        "info-base": ["1rem", { lineHeight: "auto", fontWeight: "500" }], // base | medium
        "info-sm": ["0.875rem", { lineHeight: "auto", fontWeight: "500" }], // sm | medium
        "input-base": ["1rem", { lineHeight: "auto", fontWeight: "600" }], // base | semibold

        "title-lg": ["1.875rem", { lineHeight: "auto", fontWeight: "700" }], // 30px
        "title-md": ["1.5rem", { lineHeight: "auto", fontWeight: "500" }], // 24px
        "info-lg": ["1.125rem", { lineHeight: "auto", fontWeight: "600" }], // 18px
        "info-base": ["1rem", { lineHeight: "auto", fontWeight: "500" }], // 16px
        "info-sm": ["0.875rem", { lineHeight: "auto", fontWeight: "500" }], // 14px
        "input-base": ["1rem", { lineHeight: "auto", fontWeight: "600" }], // 16px
      },
      boxShadow: {
        default: "0px 8px 18px 0px rgba(168, 178, 198, 0.45)",
        "custom-light": "0 10px 10px rgba(255, 255, 255, 0.1)",
        "custom-heavy": "0 10px 10px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        gray: "#7d848d",
        black: "#2e2e2e",
        graylight: "#D7D7D7",
        input: "#FEFEFE",
        point: {
          100: "#D1E4F9",
          200: "#A4C9F3",
          300: "#76ADED",
          400: "#4992E6",
          500: "#1B77E0",
          600: "#165FB3",
          700: "#104787",
          800: "#0B305A",
          900: "#05182D",
        },
        main: {
          100: "#D2D2D2",
          200: "#A5A5A5",
          300: "#787878",
          400: "#4B4B4B",
          500: "#1E1E1E",
          600: "#181818",
          700: "#121212",
          800: "#0C0C0C",
          900: "#060606",
        },
        background: "#1E1E1E",
      },
      fontSize: {
        clamp: "clamp(30px, 4vw, 50px)",
      },
      // 스켈레톤
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
        slide: "slide 2s linear infinite",
        movieFlip: 'movieFlip 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) both',
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200%" },
          "100%": { backgroundPosition: "-200%" },
        },
        slide: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        movieFlip: {
          '0%': { 
            transform: 'translateY(0) rotateX(0)',
            transformOrigin: '50% 0'
          },
          '100%': { 
            transform: 'translateY(-100%) rotateX(180deg)',
            transformOrigin: '50% 100%'
          }
        }
      },
      backgroundImage: {
        "gradient-custom": "linear-gradient(to right, #D9D9D9 0%, #EDEEF1 50%, #D9D9D9 100%)",
      },
      backgroundSize: {
        custom: "300% 100%",
      },
      // 스켈레톤
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
