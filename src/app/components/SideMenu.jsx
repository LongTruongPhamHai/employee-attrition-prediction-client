"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sideMenuBtn } from "@/lib/menu";

export default function SideMenu({ menuOpen, setMenuOpen }) {
  const variants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <>
      <div className="hidden sm:flex fixed top-0 bottom-0 left-0 sm:min-w-[250px] flex-col gap-2 py-4 bg-white border-r-2 border-black z-10">
        {sideMenuBtn.map(({ label, path }) => (
          <button
            key={path}
            className="p-2 w-full border-b border-t cursor-pointer text-black hover:bg-black hover:text-white hover:w-[99%] hover:rounded-2xl hover:font-semibold transition-all duration-300 ease-in-out"
            onClick={() => (window.location.href = path)}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 bottom-0 left-0 right-0 flex flex-col gap-2 items-center py-4 bg-white border-r-2 border-black z-20 sm:hidden"
          >
            {sideMenuBtn.map(({ label, path }) => (
              <button
                key={path}
                className="p-2 w-full border-b border-t cursor-pointer text-black hover:bg-black hover:text-white hover:w-[99%] hover:rounded-2xl hover:font-semibold transition-all duration-300 ease-in-out"
                onClick={() => {
                  window.location.href = path;
                  setMenuOpen(false);
                }}
              >
                {label}
              </button>
            ))}

            <button
              className="mt-auto justify-center p-2 w-full border-b border-t cursor-pointer text-black hover:bg-black hover:text-white hover:w-[99%] hover:rounded-2xl hover:font-semibold transition-all duration-300 ease-in-out"
              onClick={() => setMenuOpen(false)}
            >
              Quay lại
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
