"use client";

import React from "react";
import { sideMenuBtn } from "@/libs/menu";

export default function SideMenu({ menuOpen, setMenuOpen }) {
  return (
    <div
      className={`fixed sm:static z-9 top-0 bottom-0 left-0 right-0 
        flex-col gap-2 items-center sm:min-w-[250px] py-4 
        bg-white border-r-2 border-black
        ${menuOpen ? "flex" : "hidden sm:flex"}`}
    >
      {sideMenuBtn.map(({ label, path }) => (
        <button
          key={path}
          className="p-2 w-full border-b border-t cursor-pointer text-black hover:bg-black hover:text-white hover:w-[99%] hover:rounded-2xl hover:font-semibold transition-all duration-300 ease-in-out"
          onClick={() => (window.location.href = path)}
        >
          {label}
        </button>
      ))}

      <button
        className="flex sm:hidden mt-auto justify-center p-2 w-full border-b border-t cursor-pointer text-black hover:bg-black hover:text-white hover:w-[99%] hover:rounded-2xl hover:font-semibold transition-all duration-300 ease-in-out"
        onClick={() => setMenuOpen(false)}
      >
        Quay lại
      </button>
    </div>
  );
}
