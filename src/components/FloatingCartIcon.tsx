"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart";

interface FloatingCartIconProps {
  onClick: () => void;
}

export default function FloatingCartIcon({ onClick }: FloatingCartIconProps) {
  const { items } = useCart();

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={onClick}
      aria-label="Open cart"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
    >
      <ShoppingCart size={28} />
      {totalQuantity > 0 && (
        <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          {totalQuantity}
        </span>
      )}
    </button>
  );
}
