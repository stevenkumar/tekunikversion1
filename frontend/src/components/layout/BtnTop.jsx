"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const BtnTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px (standard UX threshold)
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-8 right-8 z-50 
        flex items-center justify-center 
        w-12 h-12 rounded-full shadow-lg 
        bg-linear-to-br from-brand-green to-brand-cyan text-white
        transition-all duration-500 ease-in-out transform
        hover:scale-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
      `}
    >
      <ArrowUp className="w-6 h-6" strokeWidth={2.5} />
    </button>
  );
};

export default BtnTop;