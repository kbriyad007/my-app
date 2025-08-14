// components/AddToCart.tsx
"use client";

import { useState } from "react";
import { useCart } from "@/context/cart"; // make sure you have a cart context

interface AddToCartProps {
  productId: string;
  productName: string;
  productPrice: number;
  productSlug: string;
  productImage: string; // required for cart
  selectedColor: string | null; // selected color from ColorSelector
  selectedSize: string | null; // selected size from SizeSelector
}

export default function AddToCart({
  productId,
  productName,
  productPrice,
  productSlug,
  productImage,
  selectedColor,
  selectedSize,
}: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // your cart context

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (!selectedColor) {
      alert("Please select a color before adding to cart!");
      return;
    }

    if (!selectedSize) {
      alert("Please select a size before adding to cart!");
      return;
    }

    addToCart({
      id: productId,
      name: productName,
      price: productPrice,
      slug: productSlug,
      image: productImage,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });

    alert(`${productName} (${selectedColor}, ${selectedSize}) added to cart!`);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
      <button
        onClick={handleAddToCart}
        disabled={!selectedColor || !selectedSize}
        className="bg-zinc-600 rounded-lg px-10 py-3.5 text-neutral-50 text-2xl font-poppins whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
      >
        Add to cart
      </button>

      <div className="flex items-center gap-2 sm:gap-1 w-48">
        <button
          onClick={increment}
          className="w-12 h-14 bg-stone-200 flex justify-center items-center text-2xl font-poppins"
        >
          +
        </button>
        <div className="w-12 h-14 flex justify-center items-center text-2xl font-poppins">
          {quantity}
        </div>
        <button
          onClick={decrement}
          className="w-12 h-14 bg-stone-200 flex justify-center items-center text-2xl font-poppins"
        >
          _
        </button>
      </div>
    </div>
  );
}
