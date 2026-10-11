import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { user, token, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState({ name: "", description: "", price: "", category: "", image: "", stock: 1 });
    const [myProducts, setMyProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [sales, setSales] = useState([]);

    useEffect(() => {
        if (!token) navigate("/login");
        else {
            if (user?.role === 'farmer') {
                fetchMyProducts();
                fetchSales();
            } else {
                fetchMyOrders();
            }
        }
    }, [token, user]);

    const fetchMyProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products/my-products", {
                headers: { "auth-token": token }
            });
            setMyProducts(res.data);
        } catch (err) { console.error(err); }
    };

    const fetchSales = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/orders/sales", {
                headers: { "auth-token": token }
            });
            setSales(res.data);
        } catch (err) { console.error(err); }
    };

    const fetchMyOrders = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/orders/my-orders", {
                headers: { "auth-token": token }
            });
            setOrders(res.data);
        } catch (err) { console.error(err); }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await axios.patch(`http://localhost:5000/api/orders/${orderId}`,
                { status: newStatus },
                { headers: { "auth-token": token } }
            );
            fetchSales(); // Refresh sales
        } catch (err) { alert("Failed to update status"); }
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
        } catch (err) { alert("Failed to add product"); }
    };

    // Helper for status colors
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (!user) return null;

    return (
        <div className="p-8 max-w-6xl mx-auto min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name} ({user.role})</h1>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
            </div>

            {user.role === 'farmer' && (
                <div className="space-y-8">
                    {/* Sales Section */}
                    <div className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
                        <h2 className="text-xl font-bold mb-4">Recent Sales & Logistics</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-3">Product</th>
                                        <th className="p-3">Buyer</th>
                                        <th className="p-3">Date</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sales.map(sale => (
                                        <tr key={sale._id} className="border-b">
                                            <td className="p-3">{sale.product?.name}</td>
                                            <td className="p-3">
                                                <div>{sale.buyer?.name}</div>
                                                <div className="text-xs text-gray-500">{sale.buyer?.location}</div>
                                            </td>
                                            <td className="p-3">{new Date(sale.date).toLocaleDateString()}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(sale.status)}`}>
                                                    {sale.status}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <select
                                                    value={sale.status}
                                                    onChange={(e) => handleUpdateStatus(sale._id, e.target.value)}
                                                    className="border rounded p-1 text-sm"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                    {sales.length === 0 && <tr><td colSpan="5" className="p-4 text-center text-gray-500">No sales yet.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>

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
                </div>
            )}

            {user.role === 'buyer' && (
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded shadow border-l-4 border-green-500">
                        <h2 className="text-xl font-bold mb-4">My Orders</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-3">Product</th>
                                        <th className="p-3">Price</th>
                                        <th className="p-3">Seller</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id} className="border-b">
                                            <td className="p-3 flex items-center gap-3">
                                                <img src={order.product?.image} className="w-10 h-10 rounded object-cover" />
                                                <span>{order.product?.name}</span>
                                            </td>
                                            <td className="p-3 font-bold">${order.product?.price}</td>
                                            <td className="p-3">{order.seller?.name}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-3 text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && <tr><td colSpan="5" className="p-4 text-center text-gray-500">No orders yet.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-green-50 rounded">
                        <h2 className="text-2xl font-bold text-green-800">Want more fresh produce?</h2>
                        <button onClick={() => navigate('/marketplace')} className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                            Go to Marketplace
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
