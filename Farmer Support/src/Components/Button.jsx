export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 bg-green-700 text-white font-semibold rounded-lg 
                 hover:bg-green-800 transition-all"
    >
      {text}
    </button>
  );
}
