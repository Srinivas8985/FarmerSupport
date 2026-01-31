export default function HeroSection() {
  return (
    <section className="bg-green-100 py-20">
      <div className="max-w-7xl mx-auto text-center px-4">
        
        <h2 className="text-4xl font-extrabold text-green-800">
          Support Local Farmers.
        </h2>

        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Buy fresh produce directly from farmers, reduce middlemen, 
          and support local agriculture.
        </p>

        <div className="mt-6">
          <button className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800">
            Explore Marketplace
          </button>
        </div>

      </div>
    </section>
  );
}
