export default function FarmerCard() {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <img
        src="https://via.placeholder.com/350x200"
        className="rounded-lg"
      />
      <h3 className="text-2xl font-bold mt-4 text-green-800">Ramesh Kumar</h3>
      <p className="text-gray-600">Farmer from Andhra Pradesh</p>
      <p className="mt-3 text-gray-700">
        Specializes in organic farming and sustainable agriculture practices.
      </p>
    </div>
  );
}
