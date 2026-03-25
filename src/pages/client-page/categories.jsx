import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
  
export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/category")
      .then((res) => {
        setCategories(res.data.categories);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load categories. Please try again later.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading Categories...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-600 font-semibold">{error}</div>;
  }

  return (
    <div className="w-full p-8 bg-[#FAF7F2] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#3D1C3A]">Available Room Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {categories.map((cat) => (
          <div key={cat._id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
            {cat.image ? (
              <img src={cat.image} className="w-full h-48 object-cover" alt={cat.name} />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#3D1C3A]">{cat.name}</h2>
                <span className="text-xl font-bold text-[#6B3F68]">Rs. {cat.price}</span>
              </div>
              <p className="text-gray-600 mb-4 h-16 overflow-hidden">{cat.description}</p>
              
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 text-sm mb-2">Features:</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.features?.map((feature, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/rooms/' + cat.name)}
                className="w-full bg-[#C9A86C] text-[#3D1C3A] py-2 rounded-lg font-semibold hover:bg-[#6B3F68] hover:text-[#F0E6D3] transition"
              >
                View Rooms
              </button>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
            <div className="col-span-full text-center text-gray-500 p-10 bg-white rounded-lg shadow">
                No categories available at the moment.
            </div>
        )}
      </div>
    </div>
  );
}
