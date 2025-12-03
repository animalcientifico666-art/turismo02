export const AboutSection=()=> {
  return (
    <section className="w-full bg-yellow-50 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">

        <div>
          <h3 className="text-2xl font-bold text-gray-800">¿Porque elegirnos?</h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Nos especializamos en tours espirituales y de aventura que te conectan con los Andes sagrados, ofreciendo experiencias inolvidables basadas en la tradición ancestral.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800">
Lo que nos hace diferentes</h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Auténticas ceremonias andinas, grupos reducidos, guías certificados y una profunda inmersión cultural. Diseñamos viajes para el alma.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800">Quienes somos</h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Un equipo liderado por mujeres apasionadas por proteger las tradiciones y ofrecer aventuras que cambian la vida.
          </p>

          <button className="mt-6 px-6 py-3 bg-yellow-600 text-white font-semibold rounded-full hover:bg-yellow-700 shadow-lg transition">
            Conócenos
          </button>
        </div>
      </div>
    </section>
  );
}
