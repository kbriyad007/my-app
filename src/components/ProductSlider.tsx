"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SlideItem {
  image: string;
  title?: string;
  price?: string;
  link?: string;
}

interface ProductSliderProps {
  slides?: SlideItem[];
}

const defaultSlides: SlideItem[] = [
  {
    image: "https://picsum.photos/id/1011/1600/900",
    title: "Summer Collection",
    price: "$39.99",
    link: "/products/summer-collection",
  },
  {
    image: "https://picsum.photos/id/1025/1600/900",
    title: "Classic Sneakers",
    price: "$59.99",
    link: "/products/classic-sneakers",
  },
  {
    image: "https://picsum.photos/id/1035/1600/900",
    title: "Elegant Handbags",
    price: "$89.99",
    link: "/products/elegant-handbags",
  },
];

export default function ProductSlider({ slides = defaultSlides }: ProductSliderProps) {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={30}
        slidesPerView={1}
        loop
        className="rounded-xl overflow-hidden shadow-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[550px]">
              {/* Image */}
              <Image
                src={slide.image}
                alt={slide.title || `Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

              {/* Text Content */}
              <div className="absolute bottom-10 left-10 text-white space-y-4 max-w-lg">
                {slide.title && (
                  <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
                    {slide.title}
                  </h2>
                )}
                {slide.price && (
                  <p className="text-xl md:text-2xl font-semibold drop-shadow-lg">
                    {slide.price}
                  </p>
                )}
                {slide.link && (
                  <Link
                    href={slide.link}
                    className="inline-block bg-white text-black font-medium px-6 py-3 rounded-full shadow-md hover:bg-gray-200 transition"
                  >
                    Shop Now
                  </Link>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
