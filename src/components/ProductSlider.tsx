"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductSlider() {
  // Using Picsum for reliable royalty-free images
  const images = [
    "https://picsum.photos/id/1011/1600/900",
    "https://picsum.photos/id/1025/1600/900",
    "https://picsum.photos/id/1035/1600/900",
    "https://picsum.photos/id/1041/1600/900",
    "https://picsum.photos/id/1050/1600/900",
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        loop
        className="rounded-lg"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[500px]">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover rounded-lg"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
