"use client";

import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";

import imagen1 from "@/components/images/imagen1.jpg";
import imagen2 from "@/components/images/imagen2.jpg";
import imagen3 from "@/components/images/imagen3.jpg";
import imagen4 from "@/components/images/imagen4.jpg";

export const BestSellingTours = () => {
  const options = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames()]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const tours = [
    { title: "Ayahuasca Ceremony", img: imagen3.src },
    { title: "Humantay Lake", img: imagen1.src },
    { title: "Rainbow Mountain", img: imagen1.src },
    { title: "Sacred Valley Tour", img: imagen4.src },
    { title: "Machu Picchu Full Day", img: imagen2.src },
  ];

  return (
    <section className="py-12 mb-16">
      <h2 className="text-3xl text-center font-extrabold text-gray-900 tracking-tight mb-8">
        Que ofrecemos
      </h2>

      <div className="embla max-w-5xl mx-auto">
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          {/* ⭐⭐ ESTA ES LA SOLUCIÓN: padding interno al container, no al viewport ⭐⭐ */}
          <div className="embla__container">
            {tours.map((tour, idx) => (
              <div className="embla__slide" key={idx}>
                <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden shadow-lg group">

                  <img
                    src={tour.img}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

                  <div className="absolute bottom-0 w-full text-center p-3">
                    <h3 className="text-white text-lg font-semibold drop-shadow-md">
                      {tour.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="embla__dots mt-4 flex justify-center gap-3">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`embla__dot w-2.5 h-2.5 rounded-full transition-all ${
                index === selectedIndex ? "bg-gray-900 scale-110" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        /* ⭐ Gap interno más padding lateral PARA QUE NO CHOQUE */
        .embla__container {
          display: flex;
          gap: 16px;
          padding-left: 20px;
          padding-right: 20px;
        }

        /* ⭐ Slides más pequeñas que el viewport */
        .embla__slide {
          flex: 0 0 80%;  /* móvil: 80% → siempre deja borde */
          min-width: 0;
        }

        @media (min-width: 768px) {
          .embla__slide {
            flex: 0 0 45%;
          }
        }

        @media (min-width: 1024px) {
          .embla__slide {
            flex: 0 0 30%;
          }
        }

        .embla__dot {
          border: none;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
};
