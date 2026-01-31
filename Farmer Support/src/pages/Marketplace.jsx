import { useState, useEffect } from "react";
import axios from "axios";

export default function Marketplace() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

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
                            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700">
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
