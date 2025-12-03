"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
];

export const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[95vh] w-full overflow-hidden">
      {/* SLIDER DE IMÁGENES */}
      <AnimatePresence>
        <motion.img
          key={images[index]}
          src={images[index]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* CONTENIDO */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10">
        <h1 className="text-6xl font-bold drop-shadow-lg">Místico ancestral</h1>
        <button className="mt-6 px-8 py-3 bg-yellow-400 text-black font-semibold rounded-full shadow-lg hover:scale-105 transition">
          DESCUBRIR AHORA
        </button>
      </div>

      {/* OLA + BLUR ELEGANTE */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        {/* Blur suave debajo de la ola */}
        <div className="absolute bottom-0 left-0 w-full h-24 backdrop-blur-[6px] bg-white/5"></div>

        {/* Ola SVG */}
        <svg viewBox="0 0 1440 320" className="w-full">
          <path
            fill="white"
            fillOpacity="0.75"
            d="M0,256L60,245.3C120,235,240,213,360,186.7C480,160,600,128,720,138.7C840,149,960,203,1080,197.3C1200,192,1320,128,1380,96L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
};
