'use client';

import { useState, useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      setSent(true);
      e.target.reset();
    }
  };

  return (
    <div>
      {/* FORMULARIO */}
      <div
        className={`
          max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl border mt-10 
          transition-all duration-700 
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        {/* Encabezado turístico */}
        <div className="flex flex-col items-center mb-6">
          <span className="text-5xl">🌴</span>
          <h2 className="text-3xl font-bold text-center text-gray-800 mt-2">
            Contáctanos
          </h2>
          <p className="text-center text-gray-600 text-sm">
            
          </p>
        </div>

        {sent && (
          <p className="p-3 mb-4 text-green-700 bg-green-100 rounded-lg text-center font-semibold">
            ¡Tu mensaje fue enviado exitosamente!
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-semibold mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="tucorreo@gmail.com"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Teléfono</label>
            <input
              type="text"
              name="phone"
              required
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="+51 999 999 999"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Mensaje</label>
            <textarea
              name="message"
              rows="4"
              required
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Cuéntanos ..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>

        {/* Línea turística */}
        <div className="mt-6 text-center text-sm text-orange-700 bg-orange-100 py-2 rounded-lg">
          Atención personalizada
        </div>
      </div>

      {/* SEPARADOR ONDULADO ENTRE SECCIONES */}
      <div className="mt-6">
        </div> 

      {/* SECCION DE REDES SOCIALES */}
      <section className="bg-blue-800/40 backdrop-blur-xl border border-white/10 
py-12 text-center text-white shadow-2xl shadow-blue-900/40">

        <h2 className="text-3xl font-extrabold mb-3 tracking-wide drop-shadow-lg">
          🌐 Conecta con nosotros
        </h2>

        <p className="text-blue-100 mb-8">
          
          Contactanos a nuestras redes sociales
        </p>

        <div className="flex justify-center gap-8">

          {/* Facebook */}
          <a
            href="#"
            className="bg-white/10 backdrop-blur-md w-16 h-16 flex items-center 
            justify-center rounded-2xl text-4xl shadow-md hover:scale-110 
            hover:bg-white/20 transition-all duration-300"
          >
            <FaFacebook className="w-10 h-10" />
          </a>

          {/* Instagram */}
          <a
          href="#"
          className="bg-gradient-to-br from-pink-500 via-purple-500 to-yellow-400 
          w-16 h-16 flex items-center justify-center rounded-2xl text-4xl 
          shadow-md hover:scale-110 transition-all duration-300"
        >
          <FaInstagram className="w-10 h-10 text-white" />
        </a>

          {/* WhatsApp */}
          <a
            href="#"
            className="bg-green-500 w-16 h-16 flex items-center justify-center 
            rounded-2xl text-4xl shadow-md hover:scale-110 transition-all duration-300"
          >
            💬
          </a>

          {/* TikTok */}
          <a
            href="#"
            className="bg-black w-16 h-16 flex items-center justify-center 
            rounded-2xl text-4xl shadow-md hover:scale-110 transition-all duration-300"
          >
            <FaTiktok className="w-10 h-10 text-white" />
          </a>
        </div>
      </section>
    </div>
  );
}
