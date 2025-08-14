"use client";

import { useEffect, useState } from "react";
import Storyblok from "@/lib/ClientStoryblok";

interface ColorSelectorProps {
  slug: string;
  onSelectColor?: (color: string) => void; // callback to parent
}

// Base color styles
const colorStyles: Record<string, { bg: string; text: string; selectedBg?: string }> = {
  red: { bg: "bg-red-500", text: "text-white", selectedBg: "bg-red-700" },
  green: { bg: "bg-green-600", text: "text-neutral-50", selectedBg: "bg-green-800" },
  yellow: { bg: "bg-yellow-500", text: "text-stone-50", selectedBg: "bg-yellow-600" },
  blue: { bg: "bg-blue-500", text: "text-white", selectedBg: "bg-blue-700" },
  black: { bg: "bg-black", text: "text-white", selectedBg: "bg-gray-900" },
  white: { bg: "bg-white", text: "text-black border border-gray-300", selectedBg: "bg-gray-200" },
};

export default function ColorSelector({ slug, onSelectColor }: ColorSelectorProps) {
  const [colors, setColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const { data } = await Storyblok.get(`cdn/stories/products/${slug}`, {
          version: "published",
        });

        const storyColors = data.story.content.colors || [];
        setColors(storyColors);
      } catch (err) {
        console.error("Failed to fetch product colors from Storyblok", err);
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, [slug]);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    if (onSelectColor) onSelectColor(color); // pass selected color to parent
  };

  if (loading) return <p>Loading colors...</p>;
  if (!colors || colors.length === 0) return null;

  return (
    <div>
      <h2 className="text-3xl font-poppins font-normal text-black leading-tight tracking-tight mb-2">
        Color
      </h2>
      <div className="flex gap-2.5 flex-wrap">
        {colors.map((color) => {
          const style = colorStyles[color.toLowerCase()] || {
            bg: "bg-gray-300",
            text: "text-black",
            selectedBg: "bg-gray-400",
          };

          const isSelected = selectedColor === color;

          return (
            <div
              key={color}
              onClick={() => handleColorClick(color)}
              className={`
                px-4 py-2.5 rounded cursor-pointer flex justify-center items-center
                transition-all duration-200 ease-in-out
                ${isSelected ? style.selectedBg : style.bg}
                ${isSelected ? "ring-2 ring-offset-2 ring-black scale-105 shadow-lg" : "hover:scale-105 hover:shadow-md"}
              `}
            >
              <span className={`text-xl font-poppins ${style.text} capitalize`}>
                {color}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
