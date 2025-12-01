"use client";

import { ChevronUp, TextAlignJustify } from "lucide-react";
import React from "react";

export default function FloatBtn({ setMenuOpen }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-5 right-3 sm:right-5 flex flex-col gap-2 z-9">
      <button
        className="flex sm:hidden rounded-full p-2 border-2 border-black bg-black text-white cursor-pointer hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
        onClick={() => setMenuOpen(true)}
      >
        <TextAlignJustify className="w-7 h-7" />
      </button>

      <button
        className="rounded-full p-2 border-2 border-black bg-black text-white cursor-pointer hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
        onClick={scrollToTop}
      >
        <ChevronUp className="w-7 h-7" />
      </button>
    </div>
  );
}
