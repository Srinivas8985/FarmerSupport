export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-green-100">
      <h2 className="text-3xl text-center font-bold text-green-800">
        Why Choose Our Portal?
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10 px-4">

        <div className="p-6 bg-white shadow rounded-xl text-center">
          <h3 className="font-bold text-xl">🚜 Direct From Farmers</h3>
          <p className="mt-2 text-gray-700">No middlemen. Pure benefits.</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl text-center">
          <h3 className="font-bold text-xl">🌦 Weather Insights</h3>
          <p className="mt-2 text-gray-700">Smart farming suggestions.</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl text-center">
          <h3 className="font-bold text-xl">📦 Easy Delivery</h3>
          <p className="mt-2 text-gray-700">Local logistics support.</p>
        </div>

      </div>
    </section>
  );
}
