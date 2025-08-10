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
    <div className="group relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl shadow-black/5 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 hover:scale-[1.02] hover:bg-white/80">
      {/* Gradient Overlay for Premium Feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent pointer-events-none"></div>
      <div className="absolute inset-px bg-gradient-to-br from-blue-400/10 via-purple-400/5 to-pink-400/10 rounded-2xl pointer-events-none opacity-60"></div>
      
      {/* Product Image Section */}
      <div className="relative p-4 pb-0">
        <Link href={`/products/${product.slug}`}>
          <div className="relative overflow-hidden rounded-xl group-hover:rounded-2xl transition-all duration-500">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover cursor-pointer transition-all duration-700 group-hover:scale-110"
            />
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            {/* View Product Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                View Details
              </div>
            </div>
            {/* Corner Accent */}
            <div className="absolute top-3 right-3 w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60 shadow-lg"></div>
          </div>
        </Link>
      </div>

      {/* Product Info Section */}
      <div className="relative z-10 p-4 pt-3">
        <Link href={`/products/${product.slug}`}>
          <h2 className="font-bold text-lg text-gray-900 cursor-pointer group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2">
            {product.name}
          </h2>
        </Link>
        
        {/* Price with Premium Styling */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              ${displayPrice}
            </span>
            <div className="px-2 py-1 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-full">
              <span className="text-xs font-semibold text-green-700">Best Price</span>
            </div>
          </div>
        </div>

        {/* Size Selector */}
        {product.sizes.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Size:</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                    selectedSize === size
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-500 shadow-lg shadow-blue-500/25 scale-105"
                      : "bg-white/60 text-gray-700 border-gray-200/50 hover:bg-white/80 hover:border-gray-300/60 hover:scale-105 hover:shadow-md"
                  }`}
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selector */}
        {product.colors.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Color:</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 border flex items-center space-x-2 ${
                    selectedColor === color
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-500 shadow-lg shadow-blue-500/25 scale-105"
                      : "bg-white/60 text-gray-700 border-gray-200/50 hover:bg-white/80 hover:border-gray-300/60 hover:scale-105 hover:shadow-md"
                  }`}
                  type="button"
                >
                  <span
                    className={`w-4 h-4 rounded-full border-2 shadow-sm ${
                      selectedColor === color ? "border-white/50" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                  <span>{color}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCartClick}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-3 px-6 rounded-2xl font-bold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/20 relative overflow-hidden group/button"
          type="button"
        >
          {/* Button Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-900 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
          
          {/* Button Content */}
          <div className="relative flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Add to Cart</span>
            <svg className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </button>

        {/* Quick Info Tags */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-full text-blue-700 font-medium">
              {product.Category}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span>Quick View</span>
          </div>
        </div>
      </div>
    </div>
  );
}
