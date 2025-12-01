"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function(){
  return (
    <section className="w-full bg-gradient-to-b from-blue-50 to-white py-20 px-6">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-6 text-blue-800"
        >
          Descubre Quiénes Somos
        </motion.h2>
        <p className="text-lg max-w-3xl mx-auto text-gray-700">
          Creamos experiencias de viaje inolvidables, conectando personas con destinos extraordinarios alrededor del mundo. Somos más que una agencia: somos tus compañeros de aventura.
        </p>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <h3 className="text-3xl font-semibold text-blue-700 mb-4">Viajar es Vivir</h3>
          <p className="text-lg text-gray-700 mb-4">
            Nuestro equipo está comprometido en diseñar viajes auténticos y memorables. Desde playas paradisíacas hasta ciudades históricas, te guiamos para que cada destino sea una experiencia única.
          </p>
          <p className="text-lg text-gray-700">
            Nos enfocamos en turismo responsable, cuidando cada entorno natural y cultural que visitamos.
          </p>
        </motion.div>

        {/* Imagen grande */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-80 lg:h-[420px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="Viaje playa"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* TARJETAS DE VALORES */
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
        {[
          {
            title: "Experiencias Únicas",
            video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            text: "Creamos viajes que cuentan historias y despiertan emociones."
          },
          {
            title: "Turismo Responsable",
            video: "https://www.youtube.com/embed/ScMzIvxBSi4",
            text: "Protegemos la naturaleza y respetamos cada cultura que exploramos."
          },
          {
            title: "Guías Expertos",
            video: "https://www.youtube.com/embed/tgbNymZ7vqY",
            text: "Acompañamiento profesional para garantizar tu seguridad y diversión."
          }
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition p-0"
          >
            <div className="relative w-full h-48 overflow-hidden">
              <iframe
                className="w-full h-full"
                src={card.video}
                title={card.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-2 text-blue-700">{card.title}</h4>
              <p className="text-gray-600">{card.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      /* -------*/}
     
    </section>
  );
}
