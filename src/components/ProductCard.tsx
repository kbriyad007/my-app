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
    <div className="group relative bg-white/80 backdrop-blur-2xl rounded-2xl border border-white/30 shadow-2xl shadow-black/8 overflow-hidden hover:bg-white/90 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)]">
      {/* Premium Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/30 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-50/20 to-purple-50/15 pointer-events-none"></div>
      
      {/* Product Image Section */}
      <div className="relative p-5 pb-0">
        <Link href={`/products/${product.slug}`}>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-56 object-cover cursor-pointer"
            />
            {/* Premium Image Border */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-black/5"></div>
            {/* Subtle Corner Accent */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg shadow-blue-500/30"></div>
          </div>
        </Link>
      </div>

      {/* Product Content */}
      <div className="relative z-10 p-5 pt-4 space-y-4">
        {/* Product Title & Category */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <Link href={`/products/${product.slug}`}>
              <h2 className="font-bold text-lg text-gray-900 cursor-pointer hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent line-clamp-2 leading-tight">
                {product.name}
              </h2>
            </Link>
            <span className="ml-2 px-2 py-1 bg-gradient-to-r from-slate-100 to-gray-100 border border-gray-200/60 rounded-lg text-xs font-semibold text-gray-600 whitespace-nowrap">
              {product.Category}
            </span>
          </div>
          
          {/* Premium Price Display */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              ${displayPrice}
            </span>
            <div className="px-3 py-1 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/60 rounded-full">
              <span className="text-xs font-bold text-emerald-700">Premium</span>
            </div>
          </div>
        </div>

        {/* Size Selector */}
        {product.sizes.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-bold text-gray-700">Size:</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    selectedSize === size
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-500/50 shadow-lg shadow-blue-500/20"
                      : "bg-white/70 text-gray-700 border-gray-200/60 hover:bg-white/90 hover:border-gray-300/70 hover:shadow-md shadow-black/5"
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
          <div className="space-y-3">
            <p className="text-sm font-bold text-gray-700">Color:</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border flex items-center space-x-2 ${
                    selectedColor === color
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-500/50 shadow-lg shadow-blue-500/20"
                      : "bg-white/70 text-gray-700 border-gray-200/60 hover:bg-white/90 hover:border-gray-300/70 hover:shadow-md shadow-black/5"
                  }`}
                  type="button"
                >
                  <span
                    className={`w-4 h-4 rounded-full shadow-inner ${
                      selectedColor === color ? "ring-2 ring-white/50" : "ring-1 ring-gray-300/50"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                  <span>{color}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Premium Add to Cart Button */}
        <button
          onClick={handleAddToCartClick}
          className="w-full bg-gradient-to-r from-slate-900 via-gray-900 to-black text-white py-4 px-6 rounded-2xl font-bold text-sm hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 shadow-xl shadow-black/15 hover:shadow-2xl hover:shadow-blue-500/20"
          type="button"
        >
          <div className="flex items-center justify-center space-x-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="tracking-wide">Add to Cart</span>
          </div>
        </button>

        {/* Premium Trust Indicators */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200/30">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Verified Quality</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span className="font-medium">Fast Shipping</span>
          </div>
        </div>
      </div>
    </div>
  );
}
