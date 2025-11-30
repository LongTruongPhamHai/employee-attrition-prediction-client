"use client";

import { TextAlignJustify } from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <div className="h-[70px] w-full border-b-2 bg-white text-black p-3 flex items-center">
      <button className="me-auto border">
        <TextAlignJustify className="min-w-10 min-h-10" />
      </button>
    </div>
  );
}
