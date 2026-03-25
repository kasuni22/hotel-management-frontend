import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditRoom() {
    const { roomId } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        category: "",
        maxGuests: 1,
        available: true,
        photos: "",
        specialDescription: "",
        notes: ""
    });

    useEffect(() => {
        const fetchInitialData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Authentication token missing.");
                setLoading(false);
                return;
            }

            try {
                // Fetch categories
                const catRes = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/category");
                setCategories(catRes.data.categories || []);

                // Fetch existing room details
                const roomRes = await axios.get(import.meta.env.VITE_BACKEND_URL + `/api/rooms/${roomId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const room = roomRes.data.room || roomRes.data;
                if (room) {
                    setFormData({
                        category: room.category || "",
                        maxGuests: room.maxGuests || 1,
                        available: room.available !== undefined ? room.available : true,
                        photos: room.photos ? (Array.isArray(room.photos) ? room.photos[0] : room.photos) : "",
                        specialDescription: room.specialDescription || "",
                        notes: room.notes || ""
                    });
                }
                setLoading(false);
            } catch (err) {
                console.error("Initialization Error:", err);
                setError("Failed to fetch room configuration mapping.");
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [roomId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Administrative authentication missing.");
            return;
        }

        setIsSubmitting(true);
        const payload = {
            ...formData,
            photos: formData.photos ? [formData.photos] : []
        };

        try {
            await axios.put(import.meta.env.VITE_BACKEND_URL + `/api/rooms/${roomId}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Room metrics officially updated.");
            navigate("/admin/rooms");
        } catch (err) {
            console.error(err);
            alert("Failed to update remote document securely.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center font-bold text-gray-700">Loading Configuration Interface...</div>;
    }

    if (error) {
        return <div className="p-8 text-center font-bold text-red-600">{error}</div>;
    }

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow mt-8">
            <h2 className="text-2xl font-bold mb-6 text-[#3D1C3A] border-b pb-2">Edit Room Pipeline: {roomId}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Room ID / Name</label>
                        <input 
                            disabled 
                            type="text" 
                            value={roomId} 
                            className="w-full border p-2 rounded outline-none bg-gray-100 text-gray-500 cursor-not-allowed" 
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Category Linkage</label>
                        <select 
                            required
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-[#C9A86C] outline-none bg-white"
                        >
                            <option value="">-- Select Category --</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Max Guests Limit</label>
                        <input 
                            required 
                            type="number" 
                            min="1"
                            name="maxGuests" 
                            value={formData.maxGuests} 
                            onChange={handleChange} 
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-[#C9A86C] outline-none" 
                        />
                    </div>
                    
                    <div className="flex items-center mt-6">
                        <input 
                            type="checkbox" 
                            name="available" 
                            checked={formData.available} 
                            onChange={handleChange} 
                            className="w-5 h-5 cursor-pointer text-blue-600 rounded border-gray-300 focus:ring-[#C9A86C]" 
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
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-[#C9A86C] outline-none" 
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
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-[#C9A86C] outline-none" 
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
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-[#C9A86C] outline-none" 
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
                        className={`px-6 py-2 rounded font-bold transition shadow ${isSubmitting ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#3D1C3A] text-[#C9A86C] hover:opacity-80'}`}
                    >
                        {isSubmitting ? "Committing Entry..." : "Update Room Data"}
                    </button>
                </div>
            </form>
        </div>
    );
}
