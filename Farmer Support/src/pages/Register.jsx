import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "farmer",
        phone: "",
        location: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", formData);
            alert("Registration successful! Please login.");
            navigate("/login");
        } catch (err) {
            alert("Registration failed: " + (err.response?.data || err.message));
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-green-50 py-10">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Register</h2>
                <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
                <select name="role" onChange={handleChange} className="w-full p-2 mb-4 border rounded">
                    <option value="farmer">Farmer</option>
                    <option value="buyer">Buyer</option>
                </select>
                <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
                <input name="location" placeholder="Location" onChange={handleChange} className="w-full p-2 mb-6 border rounded" />
                <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
                    Register
                </button>
            </form>
        </div>
    );
}
