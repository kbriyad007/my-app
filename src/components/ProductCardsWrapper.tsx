"use client";

import React from "react";
import { useCart } from "@/context/cart";
import ProductCards from "./ProductCards";
import { Product } from "./ProductCard";

interface ProductCardsWrapperProps {
  products: Product[];
}

export default function ProductCardsWrapper({ products }: ProductCardsWrapperProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product, size?: string, color?: string) => {
    addToCart({
      id: product.slug || product.name,
      name: product.name,
      price: typeof product.price === "string" ? parseFloat(product.price) : product.price,
      image: product.image,
      size,
      color,
      slug: product.slug,
      quantity: 1,
    });
  };

  return <ProductCards products={products} onAddToCart={handleAddToCart} />;
}
