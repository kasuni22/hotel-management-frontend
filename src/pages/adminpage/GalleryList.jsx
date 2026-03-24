import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaPlus, FaImage } from "react-icons/fa";

export default function GalleryList() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: ""
    });

    const fetchGalleryItems = () => {
        setIsLoading(true);
        setError(null);
        
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication error: No login token found.");
            setIsLoading(false);
            return;
        }

        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/gallery", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            setImages(res.data.list || res.data || []);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching gallery:", err);
            setError("Failed to fetch gallery items.");
            setIsLoading(false);
        });
    };

    useEffect(() => {
        fetchGalleryItems();
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to securely delete this image?")) return;

        const token = localStorage.getItem("token");
        axios.delete(import.meta.env.VITE_BACKEND_URL + `/api/gallery/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            alert("Image deleted successfully");
            fetchGalleryItems();
        })
        .catch((err) => {
            console.error(err);
            alert("Failed to delete image.");
        });
    };

    const handleAddImage = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const token = localStorage.getItem("token");
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/gallery", formData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            alert("Image added successfully");
            setFormData({ name: "", description: "", image: "" });
            setFormVisible(false); // Hide the form after success
            fetchGalleryItems(); // Force backend sync
        })
        .catch((err) => {
            console.error(err);
            alert("Failed to upload new image.");
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-4 flex text-lg font-semibold text-gray-700">Loading Gallery...</span>
            </div>
        );
    }
  
    if (error) {
        return (
            <div className="w-full text-center py-20">
                <div className="text-red-600 font-bold text-xl">{error}</div>
                <button 
                    onClick={fetchGalleryItems}
                    className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded shadow hover:bg-red-200 font-semibold transition"
                >
                    Retry API Request
                </button>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <FaImage className="text-gray-500"/> Media Gallery
                </h2>
                <button 
                    onClick={() => setFormVisible(!formVisible)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow flex items-center gap-2 font-semibold"
                >
                    <FaPlus /> {formVisible ? "Close Drop Form" : "Add New Image"}
                </button>
            </div>

            {/* Inline Add Image Form */}
            {formVisible && (
                <div className="mb-8 bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600 animation-fade-in transition-all">
                    <h3 className="text-lg font-bold mb-4">Upload New Gallery Asset</h3>
                    <form onSubmit={handleAddImage} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Image Title</label>
                            <input 
                                required
                                name="name" 
                                value={formData.name} 
                                onChange={handleInputChange} 
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                                placeholder="Luxury Suite View"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Image URL Address</label>
                            <input 
                                required
                                type="url"
                                name="image" 
                                value={formData.image} 
                                onChange={handleInputChange} 
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                                placeholder="https://..."
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Description (Optional)</label>
                            <textarea 
                                name="description" 
                                value={formData.description} 
                                onChange={handleInputChange} 
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                                placeholder="Describe the image location..."
                                rows="2"
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className={`px-6 py-2 rounded-lg font-semibold text-white transition-colors duration-300 shadow ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                            >
                                {isSubmitting ? "Uploading Element..." : "Save Image to Gallery"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Grid Layout replacing Table */}
            {images.length === 0 ? (
                <div className="w-full py-12 text-center text-gray-500 text-lg bg-gray-50 rounded-lg shadow-inner font-medium">
                    No images are securely loaded in your gallery.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((item) => (
                        <div key={item._id} className="bg-white rounded-xl shadow-lg border overflow-hidden group hover:-translate-y-1 transition duration-300">
                            <div className="relative h-48 w-full bg-gray-200">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image'; }}
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay Deletion Logic */}
                                <button 
                                    onClick={() => handleDelete(item._id)}
                                    className="absolute top-2 right-2 bg-red-600 text-white p-2 text-sm rounded-full shadow hover:bg-red-700 opacity-0 group-hover:opacity-100 transition duration-300"
                                    title="Delete Image"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-800 truncate">{item.name}</h3>
                                {item.description && (
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
