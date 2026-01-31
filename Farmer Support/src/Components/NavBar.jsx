import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">Farmer Portal</Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg items-center">
          <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
          <li><Link to="/marketplace" className="hover:text-yellow-300">Marketplace</Link></li>

          {user ? (
            <>
              <li><Link to="/dashboard" className="hover:text-yellow-300">Dashboard</Link></li>
              <li className="bg-green-800 px-4 py-1 rounded cursor-default">Hi, {user.name}</li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-yellow-300">Login</Link></li>
              <li><Link to="/register" className="bg-yellow-400 text-green-800 px-4 py-1 rounded hover:bg-yellow-300 font-bold">Register</Link></li>
            </>
          )}
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
          <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/marketplace" onClick={() => setOpen(false)}>Marketplace</Link></li>
          {user ? (
            <li><Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link></li>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setOpen(false)}>Login</Link></li>
              <li><Link to="/register" onClick={() => setOpen(false)}>Register</Link></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}
