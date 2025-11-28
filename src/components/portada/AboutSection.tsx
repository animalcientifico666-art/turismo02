export const AboutSection=()=> {
  return (
    <section className="w-full bg-yellow-50 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">

        <div>
          <h3 className="text-2xl font-bold text-gray-800">Why Choose Us?</h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            We specialize in spiritual and adventure tours that connect you to
            the sacred Andes, offering unforgettable experiences grounded in
            ancestral tradition.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800">What Makes Us Different</h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Authentic Andean ceremonies, small groups, certified guides, and deep
            cultural immersion. We design journeys for the soul.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800">Who We Are</h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A women-led team passionate about protecting traditions and offering
            life-changing adventures.
          </p>

          <button className="mt-6 px-6 py-3 bg-yellow-600 text-white font-semibold rounded-full hover:bg-yellow-700 shadow-lg transition">
            Meet the Team
          </button>
        </div>
      </div>
    </section>
  );
}
