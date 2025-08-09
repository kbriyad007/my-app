"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface Product {
  id?: string;
  name: string;
  price: number | string;
  image: string;
  sizes: string[];
  colors: string[];
  Category: string;
  description: string;
  slug: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, size?: string, color?: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);

  const imageUrl = product.image.startsWith("//")
    ? "https:" + product.image
    : product.image;

  // Safe price parsing & formatting
  const priceValue =
    typeof product.price === "string" ? parseFloat(product.price) : product.price;
  const displayPrice = Number.isFinite(priceValue) ? priceValue.toFixed(2) : "0.00";

  const handleAddToCartClick = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size.");
      return;
    }
    if (product.colors.length > 0 && !selectedColor) {
      alert("Please select a color.");
      return;
    }
    onAddToCart?.(product, selectedSize, selectedColor);
  };

  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <Link href={`/products/${product.slug}`}>
        <a>
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover rounded cursor-pointer"
          />
          <h2 className="mt-2 font-semibold text-lg cursor-pointer">{product.name}</h2>
        </a>
      </Link>

      <p className="text-gray-700">${displayPrice}</p>

      {/* Size selector */}
      {product.sizes.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium">Size:</p>
          <div className="flex space-x-2 mt-1">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 border rounded ${
                  selectedSize === size ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color selector */}
      {product.colors.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium">Color:</p>
          <div className="flex space-x-2 mt-1">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1 border rounded flex items-center space-x-2 ${
                  selectedColor === color ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
                type="button"
              >
                <span
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
                <span>{color}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleAddToCartClick}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        type="button"
      >
        Add to Cart
      </button>
    </div>
  );
}
