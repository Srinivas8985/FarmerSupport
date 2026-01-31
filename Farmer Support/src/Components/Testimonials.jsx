export default function Testimonials() {
  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center text-green-700">
        What People Say
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 mt-8">

        <div className="bg-green-50 p-6 rounded-lg shadow">
          <p className="italic">
            “Amazing platform! I bought fresh vegetables at a great price.”
          </p>
          <h4 className="mt-4 font-bold">— Suresh</h4>
        </div>

        <div className="bg-green-50 p-6 rounded-lg shadow">
          <p className="italic">
            “My income increased by 30% after selling directly to buyers!”
          </p>
          <h4 className="mt-4 font-bold">— Lakshmi (Farmer)</h4>
        </div>

        <div className="bg-green-50 p-6 rounded-lg shadow">
          <p className="italic">
            “Very clean UI and easy to use. My favourite app.”
          </p>
          <h4 className="mt-4 font-bold">— Rajesh</h4>
        </div>

      </div>
    </section>
  );
}
