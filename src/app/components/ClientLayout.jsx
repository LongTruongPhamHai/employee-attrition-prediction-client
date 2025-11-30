"use client";

import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SideMenu from "./SideMenu";
import FloatBtn from "./FloatBtn";

export default function ClientLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* <Header /> */}
      <div className="flex flex-1 w-full">
        <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main className="p-4 w-full">{children}</main>
      </div>

      <FloatBtn setMenuOpen={setMenuOpen} />

      {/* <Footer /> */}
    </div>
  );
}
