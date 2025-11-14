"use client";

import { ScrollToTopIcon } from "@/icons/ScrollToTopIcon";

export const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button onClick={scrollToTop} className="rounded-full fixed bottom-6 right-6 cursor-pointer z-50">
      <ScrollToTopIcon />
    </button>
  );
};
