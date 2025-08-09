"use client";

import { ShoppingCart } from "lucide-react";
import React from "react";

interface FloatingCartIconProps {
  onClick: () => void;
  count: number;
}

export default function FloatingCartIcon({ onClick, count }: FloatingCartIconProps) {
  return (
    <button
      onClick={onClick}
      className="fixed right-6 bottom-6 z-[9999] bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition relative"
      aria-label="View cart"
      style={{ position: "fixed" /* redundant with tailwind fixed */, top: "auto" }}
    >
      <ShoppingCart className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
    </button>
  );
}
