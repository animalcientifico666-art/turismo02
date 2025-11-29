'use client';

import { useState } from "react";

export default function() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

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
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl border mt-10">

      {/* Encabezado turístico */}
      <div className="flex flex-col items-center mb-6">
        <span className="text-5xl">🌴</span>
        <h2 className="text-3xl font-bold text-center text-gray-800 mt-2">
          Contáctanos
        </h2>
        <p className="text-center text-gray-600 text-sm">
          ¡Planifiquemos juntos tu próxima aventura!
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
            placeholder="Cuéntanos sobre tu viaje soñado…"
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

      {/* Línea turística adicional */}
      <div className="mt-6 text-center text-sm text-orange-700 bg-orange-100 py-2 rounded-lg">
        ✈️ Atención personalizada para viajes, tours y experiencias únicas
      </div>
    </div>
  );
};
