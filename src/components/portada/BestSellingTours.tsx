"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import imagen1 from "@/components/images/imagen1.jpg";

export const BestSellingTours = () => {
  const tours = [
    { title: "Ayahuasca Ceremony Retreat With Andean Rituals (3 Days)", img: imagen1.src },
    { title: "Humantay Lake", img: imagen1.src },
    { title: "Rainbow Mountain", img: imagen1.src },
    { title: "Sacred Valley Tour", img: imagen1.src },
    { title: "Machu Picchu Full Day", img: imagen1.src },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl text-center font-extrabold">Best Selling Tours</h2>

      <Swiper
        modules={[EffectCoverflow, Navigation, Pagination]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        navigation
        pagination={{ clickable: true }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 250,      // Más profundidad = efecto 3D más fuerte
          modifier: 1.5,   // Aumenta la escala
          slideShadows: false,
        }}
        className="mt-12"
      >
        {tours.map((tour, i) => (
          <SwiperSlide
            key={i}
            className="w-[260px] md:w-[340px] lg:w-[420px]"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img
                src={tour.img}
                alt={tour.title}
                className="w-full h-72 md:h-80 lg:h-96 object-cover"
              />

              {/* Texto centrado semitransparente */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-xl font-semibold drop-shadow-lg">
                  {tour.title}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
