"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface ProductSliderProps {
  images?: string[];
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
    <div className="w-full max-w-7xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={24}
        slidesPerView={1}
        loop
        className="rounded-2xl shadow-xl"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[550px]">
              {/* Image */}
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover rounded-2xl"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl" />

              {/* Content */}
              <div className="absolute bottom-10 left-10 text-white max-w-lg">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {`Featured Product ${index + 1}`}
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  {`Discover our latest arrivals and exclusive collections.`}
                </p>
                <button className="px-6 py-3 bg-white text-black font-medium rounded-full shadow-md hover:bg-gray-200 transition">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
