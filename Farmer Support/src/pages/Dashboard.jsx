import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { user, token, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState({ name: "", description: "", price: "", category: "", image: "", stock: 1 });
    const [myProducts, setMyProducts] = useState([]);

    useEffect(() => {
        if (!token) navigate("/login");
        else if (user?.role === 'farmer') fetchMyProducts();
    }, [token, user]);

    const fetchMyProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products/my-products", {
                headers: { "auth-token": token }
            });
            setMyProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/products", product, {
                headers: { "auth-token": token }
            });
            alert("Product added!");
            setProduct({ name: "", description: "", price: "", category: "", image: "", stock: 1 });
            fetchMyProducts();
        } catch (err) {
            alert("Failed to add product");
        }
    };

    if (!user) return null;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name} ({user.role})</h1>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
            </div>

            {user.role === 'farmer' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input name="name" placeholder="Product Name" value={product.name} onChange={handleChange} className="w-full border p-2 rounded" required />
                            <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} className="w-full border p-2 rounded" required />
                            <div className="flex gap-4">
                                <input name="price" type="number" placeholder="Price" value={product.price} onChange={handleChange} className="w-full border p-2 rounded" required />
                                <input name="stock" type="number" placeholder="Stock" value={product.stock} onChange={handleChange} className="w-full border p-2 rounded" required />
                            </div>
                            <input name="category" placeholder="Category" value={product.category} onChange={handleChange} className="w-full border p-2 rounded" required />
                            <input name="image" placeholder="Image URL" value={product.image} onChange={handleChange} className="w-full border p-2 rounded" required />
                            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Post Product</button>
                        </form>
                    </div>

                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-xl font-bold mb-4">My Listings</h2>
                        <div className="space-y-4 max-h-[500px] overflow-y-auto">
                            {myProducts.map(p => (
                                <div key={p._id} className="border p-4 rounded flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold">{p.name}</h3>
                                        <p className="text-sm text-gray-600">${p.price} - Stock: {p.stock}</p>
                                    </div>
                                    <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {user.role === 'buyer' && (
                <div className="text-center py-20">
                    <h2 className="text-2xl">Welcome to the Buyer Dashboard</h2>
                    <p className="mt-4">Go to Marketplace to buy fresh products!</p>
                    <button onClick={() => navigate('/marketplace')} className="mt-4 bg-green-600 text-white px-6 py-2 rounded">Go to Marketplace</button>
                </div>
            )}
        </div>
    );
}
