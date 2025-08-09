"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useRouter } from "next/navigation";

export default function FloatingCartButton() {
  const { cart } = useCart(); // make sure your CartContext returns `cart`
  const router = useRouter();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={() => router.push("/cart")}
      className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition"
    >
      <ShoppingCart className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {totalItems}
        </span>
      )}
    </button>
  );
}
