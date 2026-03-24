import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catRes, galleryRes] = await Promise.all([
          axios.get(import.meta.env.VITE_BACKEND_URL + "/api/category"),
          axios.get(import.meta.env.VITE_BACKEND_URL + "/api/gallery")
        ]);
        setCategories(catRes.data.categories || []);
        setGallery(galleryRes.data.list || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching homepage data:", err);
        setError("Failed to load some content. Please check back later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <div className="w-full h-[90vh] bg-blue-900 flex justify-center items-center flex-col relative px-4 text-center">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-blue-600 rounded-full blur-[80px]"></div>
        </div>

        <div className="z-10 w-full flex flex-col items-center">
            <h1 className="text-white text-4xl md:text-6xl font-bold mb-8 animate-fade-in">
              Welcome to the Leonine Villa
            </h1>
            
            <div className="border border-white/20 bg-white shadow-2xl h-auto w-full max-w-xl rounded-2xl p-8 flex flex-col space-y-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-gray-800 text-center">Plan Your Perfect Stay</h2>
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="w-full text-left">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Check-in</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                  />
                </div>
                <div className="w-full text-left">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Check-out</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                  />
                </div>
              </div>
              <div className="w-full text-left">
                 <label className="text-xs font-bold text-gray-500 uppercase ml-1">Category</label>
                <select
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 appearance-none"
                >
                  <option value="">Any Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => navigate('/categories')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                Search Available Rooms
              </button>
            </div>
        </div>
      </div>

      {/* Featured Room Types */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Our Luxurious Spaces</h2>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
            <p className="text-gray-600 mt-6 text-center max-w-2xl">
                Experience the height of comfort and elegance. Each of our room categories is designed to offer a unique blend of style and functional luxury.
            </p>
        </div>

        {loading ? (
             <div className="w-full flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        ) : error ? (
            <div className="text-center text-red-600 font-semibold p-8 bg-red-50 rounded-2xl">{error}</div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {categories.slice(0, 3).map((cat) => (
                    <div key={cat._id} className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-500 transform hover:-translate-y-2 border border-gray-100">
                        <div className="relative h-64 overflow-hidden">
                            <img src={cat.image} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt={cat.name} />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full shadow-sm font-bold text-blue-700 text-sm">
                                From Rs. {cat.price}
                            </div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">{cat.name}</h3>
                            <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">{cat.description}</p>
                            <button 
                                onClick={() => navigate('/rooms/' + cat.name)}
                                className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-blue-600 transition duration-300"
                            >
                                Exploring Rooms
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </section>

      {/* Media Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col items-center mb-16">
                <h2 className="text-4xl font-black text-gray-900 mb-4">Visual Tour</h2>
                <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
            </div>

            {loading ? (
                 <div className="w-full flex justify-center items-center py-20">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                    {gallery.map((item) => (
                        <div key={item._id} className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-md">
                            <img src={item.image} alt={item.name} className="w-full h-auto object-cover transition duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                                <div>
                                    <h4 className="text-white font-bold text-lg">{item.name}</h4>
                                    <p className="text-white/80 text-xs mt-1">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </section>

      {/* Footer Placeholder for visual completeness */}
      <footer className="bg-gray-900 text-white py-12 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
              <div className="mb-8 md:mb-0">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> Leonine Villa</h2>
                  <p className="text-gray-400 mt-2 text-sm">Luxury redefined at every step.</p>
              </div>
              <div className="flex space-x-6 text-sm font-medium text-gray-400">
                  <a href="#" className="hover:text-blue-400 transition">About</a>
                  <a href="#" className="hover:text-blue-400 transition">Contact</a>
                  <a href="#" className="hover:text-blue-400 transition">Booking Terms</a>
              </div>
          </div>
          <div className="max-w-7xl mx-auto border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-xs">
              &copy; 2024 Leonine Villa. All rights reserved.
          </div>
      </footer>
    </div>
  );
}