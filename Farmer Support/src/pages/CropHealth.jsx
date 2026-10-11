import { useState, useEffect } from "react";
import axios from "axios";

export default function CropHealth() {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/api/crop-health")
            .then(res => {
                setTips(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center p-8">Loading...</div>;

    return (
        <div className="p-8 bg-green-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8 text-green-800">Crop Disease Awareness & Solutions</h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
                Identify common crop diseases early and find effective organic and chemical solutions to protect your harvest.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {tips.map(tip => (
                    <div key={tip._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                        {tip.image && <img src={tip.image} alt={tip.diseaseName} className="w-full h-48 object-cover" />}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-green-700 mb-2">{tip.diseaseName}</h3>
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-800">Symptoms:</h4>
                                <p className="text-gray-600 text-sm">{tip.symptoms}</p>
                            </div>
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-800">Description:</h4>
                                <p className="text-gray-600 text-sm">{tip.description}</p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-lg">
                                <h4 className="font-bold text-green-800 mb-1">Recommended Solution:</h4>
                                <p className="text-green-700 text-sm">{tip.solution}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {tips.length === 0 && (
                <div className="text-center text-gray-500 py-20">
                    <p>No crop health information available yet.</p>
                </div>
            )}
        </div>
    );
}
