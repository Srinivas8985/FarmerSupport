import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold">Farmer Portal</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg">
          <li className="cursor-pointer hover:text-yellow-300">Home</li>
          <li className="cursor-pointer hover:text-yellow-300">Marketplace</li>
          <li className="cursor-pointer hover:text-yellow-300">Weather</li>
          <li className="cursor-pointer hover:text-yellow-300">Support</li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <ul className="md:hidden bg-green-800 text-white flex flex-col gap-4 px-4 py-4">
          <li className="cursor-pointer hover:text-yellow-300">Home</li>
          <li className="cursor-pointer hover:text-yellow-300">Marketplace</li>
          <li className="cursor-pointer hover:text-yellow-300">Weather</li>
          <li className="cursor-pointer hover:text-yellow-300">Support</li>
        </ul>
      )}
    </nav>
  );
}
