/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
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
      },
      fontSize: {
        clamp: "clamp(30px, 4vw, 50px)",
      },
      // 스켈레톤
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200%" },
          "100%": { backgroundPosition: "-200%" },
        },
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
