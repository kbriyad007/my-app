// src/components/ProductCards.tsx
"use client";

import ProductCard, { Product } from "./ProductCard";

interface ProductCardsProps {
  products: Product[];
  onAddToCart?: (product: Product, size?: string, color?: string) => void;
}

export default function ProductCards({ products, onAddToCart }: ProductCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.slug}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
