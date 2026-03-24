import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddRoom() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        roomId: "",
        category: "",
        maxGuests: 1,
        available: true,
        photos: "",
        specialDescription: "",
        notes: ""
    });

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/category")
        .then(res => {
            const fetchedCategories = res.data.categories || [];
            setCategories(fetchedCategories);
            if (fetchedCategories.length > 0) {
                setFormData(prev => ({ ...prev, category: fetchedCategories[0].name }));
            }
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setError("Failed to load categories.");
            setLoading(false);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Administrative authentication missing.");
            return;
        }

        setIsSubmitting(true);
        // Cast photos to array matching schema if necessary
        const payload = {
            ...formData,
            photos: formData.photos ? [formData.photos] : []
        };

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/rooms", payload, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            alert("Room successfully saved into the directory!");
            navigate("/admin/rooms");
        })
        .catch((err) => {
            console.error(err);
            alert("Failed to create room. Ensure Room ID is unique.");
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    if (loading) {
        return <div className="p-8 text-center font-bold text-gray-700">Loading Configuration Interface...</div>;
    }

    if (error) {
        return <div className="p-8 text-center font-bold text-red-600">{error}</div>;
    }

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow mt-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Register New Room Pipeline</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Room ID / Name</label>
                        <input 
                            required 
                            type="text" 
                            name="roomId" 
                            value={formData.roomId} 
                            onChange={handleChange} 
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-600 outline-none" 
                            placeholder="e.g. 101 or A-Zone" 
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Category Linkage</label>
                        <select 
                            required
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-600 outline-none bg-white"
                        >
                            <option value="">-- Select Category --</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Max Guests Limit</label>
                        <input 
                            required 
                            type="number" 
                            min="1"
                            name="maxGuests" 
                            value={formData.maxGuests} 
                            onChange={handleChange} 
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-600 outline-none" 
                        />
                    </div>
                    
                    <div className="flex items-center mt-6">
                        <input 
                            type="checkbox" 
                            name="available" 
                            checked={formData.available} 
                            onChange={handleChange} 
                            className="w-5 h-5 cursor-pointer text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                        />
                        <label className="ml-2 block text-sm font-semibold text-gray-700 cursor-pointer">
                            Mark as Instantly Available online
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Primary Display Photo (URL Input)</label>
                    <input 
                        type="url" 
                        name="photos" 
                        value={formData.photos} 
                        onChange={handleChange} 
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-600 outline-none" 
                        placeholder="https://images.example.com/asset1.jpg" 
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Special Marketing Description</label>
                    <textarea 
                        name="specialDescription" 
                        value={formData.specialDescription} 
                        onChange={handleChange} 
                        rows="3"
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-600 outline-none" 
                        placeholder="Brief aesthetic marketing text for UI display" 
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Internal Admin Notes</label>
                    <textarea 
                        name="notes" 
                        value={formData.notes} 
                        onChange={handleChange} 
                        rows="2"
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-600 outline-none" 
                        placeholder="Hidden maintenance or cleaning warnings" 
                    />
                </div>

                <div className="flex justify-end pt-4 space-x-4">
                    <button 
                        type="button" 
                        onClick={() => navigate("/admin/rooms")}
                        className="px-6 py-2 text-gray-600 border border-gray-300 rounded font-semibold hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`px-6 py-2 rounded text-white font-bold transition shadow ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {isSubmitting ? "Committing Entry..." : "Submit New Room Data"}
                    </button>
                </div>
            </form>
        </div>
    );
}
