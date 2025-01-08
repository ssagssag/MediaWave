// src/components/ScrollToTop.tsx
import { useEffect, useState } from "react";
import { TopArrow } from "./TopArrow";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-5 right-8 h-[60px] w-[60px] z-[5] rounded-full bg-white/60 shadow-lg transition-all hover:bg-white group"
      aria-label="맨 위로 스크롤"
    >
      <TopArrow className="mx-auto transition-colors text-main-900 group-hover:text-point-500" />
    </button>
  );
}
