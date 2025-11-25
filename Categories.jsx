export default function Categories() {
  return (
    <section className="bg-green-100 py-12">
      <h2 className="text-3xl font-bold text-center text-green-900">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-10 px-4">
        
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <span className="text-4xl">🍅</span>
          <p className="mt-2 font-semibold">Vegetables</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <span className="text-4xl">🍎</span>
          <p className="mt-2 font-semibold">Fruits</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <span className="text-4xl">🌾</span>
          <p className="mt-2 font-semibold">Grains</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <span className="text-4xl">🥛</span>
          <p className="mt-2 font-semibold">Dairy</p>
        </div>

      </div>
    </section>
  );
}
