import { useState, useContext } from "react"; // Added useContext import
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext); // Corrected usage
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            login(res.data.user, res.data.token);
            navigate("/dashboard");
        } catch (err) {
            alert("Login failed: " + (err.response?.data || err.message));
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-green-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 border rounded"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-6 border rounded"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
                    Login
                </button>
            </form>
        </div>
    );
}
