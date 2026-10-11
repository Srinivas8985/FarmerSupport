import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Marketplace() {
    const [products, setProducts] = useState([]);
    const { token, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleBuy = async (productId) => {
        if (!token) return navigate("/login");
        if (user.role === 'farmer') return alert("Farmers cannot buy products.");

        try {
            await axios.post("http://localhost:5000/api/orders",
                { productId },
                { headers: { "auth-token": token } }
            );
            alert("Order placed successfully! Check your dashboard.");
        } catch (err) {
            alert("Order failed: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8 text-green-800">Fresh Marketplace</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {products.map(product => (
                    <div key={product._id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg">{product.name}</h3>
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{product.category}</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-xl font-bold text-green-700">${product.price}</span>
                                <span className="text-xs text-gray-500">By: {product.seller?.name || 'Unknown'}</span>
                            </div>
                            <button
                                onClick={() => handleBuy(product._id)}
                                className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
