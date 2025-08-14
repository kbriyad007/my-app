"use client";

import { useEffect, useState } from "react";
import Storyblok from "@/lib/ClientStoryblok";

interface SizeSelectorProps {
  slug: string; // e.g., "product-11"
  onSelectSize?: (size: string) => void; // callback to parent
}

export default function SizeSelector({ slug, onSelectSize }: SizeSelectorProps) {
  const [sizes, setSizes] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const { data } = await Storyblok.get(`cdn/stories/products/${slug}`, {
          version: "published",
        });

        const storySizes = data.story.content.sizes || [];
        setSizes(storySizes);
      } catch (err) {
        console.error("Failed to fetch product sizes from Storyblok", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSizes();
  }, [slug]);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    if (onSelectSize) onSelectSize(size); // notify parent
  };

  if (loading) return <p>Loading sizes...</p>;
  if (!sizes || sizes.length === 0) return null;

  return (
    <div>
      <h2 className="text-3xl font-poppins font-normal text-black leading-tight tracking-tight mb-2">
        Size
      </h2>
      <div className="flex gap-2.5 flex-wrap">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <div
              key={size}
              onClick={() => handleSizeClick(size)}
              className={`px-4 py-2.5 rounded cursor-pointer flex justify-center items-center
                text-xl font-poppins capitalize
                ${isSelected ? "bg-black text-white" : "bg-neutral-200 text-black"}
              `}
            >
              {size}
            </div>
          );
        })}
      </div>
    </div>
  );
}
