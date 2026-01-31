export default function ProductShowcase() {
  return (
    <section className="py-10 bg-white">
      <h2 className="text-3xl font-bold text-center text-green-800">
        Fresh Produce Available
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8 px-4">
        
        {/* Product 1 */}
        <div className="border rounded-xl shadow p-4 bg-green-50">
          <img
            src="https://via.placeholder.com/300x200"
            className="rounded-lg"
          />
          <h3 className="mt-4 font-bold text-xl">Organic Tomatoes</h3>
          <p className="text-gray-600">Fresh from local farms.</p>
          <span className="text-green-700 font-bold">₹45 / kg</span>
        </div>

        {/* Product 2 */}
        <div className="border rounded-xl shadow p-4 bg-green-50">
          <img
            src="https://via.placeholder.com/300x200"
            className="rounded-lg"
          />
          <h3 className="mt-4 font-bold text-xl">Premium Rice</h3>
          <p className="text-gray-600">Directly from farmers.</p>
          <span className="text-green-700 font-bold">₹60 / kg</span>
        </div>

        {/* Product 3 */}
        <div className="border rounded-xl shadow p-4 bg-green-50">
          <img
            src="https://via.placeholder.com/300x200"
            className="rounded-lg"
          />
          <h3 className="mt-4 font-bold text-xl">Fresh Carrots</h3>
          <p className="text-gray-600">Rich in nutrients.</p>
          <span className="text-green-700 font-bold">₹30 / kg</span>
        </div>
      </div>
    </section>
  );
}
