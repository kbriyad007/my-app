"use client";

import { useState } from "react";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";
import AddToCart from "./AddToCart";
import SimilarProducts from "@/components/SimilarProducts";
import { StoryblokProduct } from "@/types/storyblok";

interface Product {
  name: string;
  price: string; // or number
  image: string;
  sizes: string[];
  colors: string[];
  Category: string;
  description: string;
  thumbnails?: string[];
  slug: string;
}

interface ProductDetailLayoutProps {
  product: Product;
  similarProducts: StoryblokProduct[];
}

export default function ProductDetailLayout({
  product,
  similarProducts,
}: ProductDetailLayoutProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="bg-gray-50/30 pt-0">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Images */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100/50 p-4">
            <ProductImages
              mainImage={product.image}
              thumbnails={product.thumbnails}
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            {/* Product Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100/50 p-5">
              <ProductInfo slug={product.slug} />
            </div>

            {/* Size & Color */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100/50 p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Size</h4>
                <SizeSelector
                  slug={product.slug}
                  onSelectSize={setSelectedSize} // ✅ notify parent
                />
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100/50 p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Color</h4>
                <ColorSelector
                  slug={product.slug}
                  onSelectColor={setSelectedColor}
                />
              </div>
            </div>

            {/* Add to Cart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100/50 p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-900">Add to Cart</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">In Stock</span>
                </div>
              </div>

              <AddToCart
                productId={product.slug} 
                productName={product.name}
                productPrice={Number(product.price)}
                productSlug={product.slug}
                productImage={product.image}
                selectedColor={selectedColor}
                selectedSize={selectedSize} // ✅ pass selectedSize
              />

              {/* Quick Info */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Easy returns</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Similar Products</h2>
            <SimilarProducts products={similarProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
