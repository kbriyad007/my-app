"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface ProductSliderProps {
  images?: string[]; // ✅ now optional
}

const defaultImages = [
  "https://picsum.photos/id/1011/1600/900",
  "https://picsum.photos/id/1025/1600/900",
  "https://picsum.photos/id/1035/1600/900",
  "https://picsum.photos/id/1041/1600/900",
  "https://picsum.photos/id/1050/1600/900",
];

export default function ProductSlider({ images = defaultImages }: ProductSliderProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={1}
        loop
        className="rounded-xl shadow-lg"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[500px]">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover rounded-xl"
                priority={index === 0}
              />
              {/* Overlay text (optional for professional look) */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-2xl font-semibold">Featured Product</h3>
                <p className="text-white/80 text-sm">Discover our latest arrivals</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
