import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Users, BedDouble } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import Header from '../../components/header/header.jsx';
import Footer from '../../components/footer/Footer.jsx';

const getUserEmail = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.email;
  } catch {
    return null;
  }
};

export default function RoomsPage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Rooms");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  // Booking Modal State
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    message: ""
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [roomsRes, categoriesRes] = await Promise.all([
          axios.get(import.meta.env.VITE_BACKEND_URL + '/api/rooms'),
          axios.get(import.meta.env.VITE_BACKEND_URL + '/api/category')
        ]);
        setRooms(roomsRes.data.rooms || []);
        setCategories(categoriesRes.data.categories || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms or categories:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBook = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    if (!token) {
        alert("Please log in to book");
        navigate("/login");
        return;
    }

    if (!getUserEmail()) {
      alert("Please login to make a booking");
      navigate("/login");
      return;
    }

    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    
    if (checkOutDate <= checkInDate) {
        setBookingError("Check-out must be after check-in");
        return;
    }

    setBookingLoading(true);
    setBookingError(null);

    const bookingData = {
        roomId: selectedRoom.roomId,
        email: getUserEmail(),
        start: formData.checkIn,
        end: formData.checkOut,
        guests: formData.guests,
        message: formData.message,
        notes: formData.message
    };

    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/bookings", bookingData, {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        alert("Booking confirmed successfully!");
        setSelectedRoom(null);
        setBookingLoading(false);
        setFormData({ checkIn: "", checkOut: "", guests: 1, message: "" });
    })
    .catch((err) => {
        console.error("Booking Error:", err);
        setBookingError("Booking failed. Please try again.");
        setBookingLoading(false);
    });
  };

  const categoryMap = {};
  categories.forEach(c => {
    categoryMap[c.name] = c.price;
  });

  const filteredRooms = rooms.filter(room => {
    const categoryMatch = selectedCategory === "All Rooms" || room.category === selectedCategory;
    const isAvailable = room.available !== false; // Base logic for availability, default true if missing
    const availabilityMatch = showAvailableOnly ? isAvailable : true;
    return categoryMatch && availabilityMatch;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans">
      <Header />
      
      {/* 1. Page hero banner */}
      <div className="bg-[#3D1C3A] h-48 w-full flex flex-col items-center justify-center relative">
        <span className="text-[#C9A86C] tracking-widest text-sm font-semibold mb-2 uppercase">OUR ROOMS</span>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
          Explore Our <span className="italic font-serif text-[#C9A86C]">Finest Rooms</span>
        </h1>
        <div className="text-[#F0E6D3] opacity-70 text-sm mt-1">
          Home &gt; Rooms
        </div>
      </div>

      {/* 2. Filter bar below banner */}
      <div className="bg-[#FAF7F2] border-b border-[#C9A86C] sticky top-16 md:top-20 z-40 py-4 px-6 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex overflow-x-auto whitespace-nowrap gap-3 pb-2 lg:pb-0 w-full lg:w-auto scroll-smooth">
            <button 
              onClick={() => setSelectedCategory("All Rooms")}
              className={`px-5 py-2 rounded-none font-medium transition whitespace-nowrap ${selectedCategory === "All Rooms" ? "bg-[#3D1C3A] text-[#C9A86C] shadow-md" : "border border-[#3D1C3A] text-[#3D1C3A] hover:bg-[#6B3F68] hover:text-[#F0E6D3]"}`}
            >
              All Rooms
            </button>
            {categories.map(c => (
              <button 
                key={c._id}
                onClick={() => setSelectedCategory(c.name)}
                className={`px-5 py-2 rounded-none font-medium transition whitespace-nowrap ${selectedCategory === c.name ? "bg-[#3D1C3A] text-[#C9A86C] shadow-md" : "border border-[#3D1C3A] text-[#3D1C3A] hover:bg-[#6B3F68] hover:text-[#F0E6D3]"}`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <div className="flex bg-white rounded-full p-1 border border-[#C9A86C] shadow-sm flex-shrink-0">
            <button 
              onClick={() => setShowAvailableOnly(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${!showAvailableOnly ? "bg-[#3D1C3A] text-[#C9A86C]" : "text-gray-500 hover:text-[#3D1C3A]"}`}
            >
              All
            </button>
            <button 
              onClick={() => setShowAvailableOnly(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${showAvailableOnly ? "bg-[#3D1C3A] text-[#C9A86C]" : "text-gray-500 hover:text-[#3D1C3A]"}`}
            >
              Available Only
            </button>
          </div>
        </div>
      </div>

      {/* 3. Rooms grid */}
      <div className="bg-[#FAF7F2] py-12 px-6 flex-grow">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="w-16 h-16 border-4 border-[#C9A86C] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="text-center py-32 flex flex-col items-center justify-center animate-fade-in">
               <BedDouble size={64} className="text-[#C9A86C] mb-6 drop-shadow-md" />
               <h2 className="text-2xl font-bold text-[#3D1C3A]">No rooms found matching your criteria</h2>
               <p className="text-gray-500 mt-2">Try adjusting your filters to see more available rooms.</p>
            </div>
          ) : (
            <>
              <div className="text-gray-500 text-sm mb-6 font-medium">
                Showing {filteredRooms.length} {filteredRooms.length === 1 ? 'room' : 'rooms'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRooms.map((room) => {
                  const isAvailable = room.available !== false;
                  const price = categoryMap[room.category] || "N/A";
                  
                  return (
                    <div key={room.roomId || room._id} className="bg-white rounded-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden group">
                      <div className="relative h-52 w-full bg-gray-100 overflow-hidden">
                          {room.photos && room.photos.length > 0 ? (
                              <img 
                                  src={Array.isArray(room.photos) ? room.photos[0] : room.photos} 
                                  alt={`Room ${room.roomId}`} 
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                              />
                          ) : (
                              <div className="w-full h-full bg-gradient-to-br from-[#3D1C3A] to-[#6B3F68] flex justify-center items-center">
                                  <span className="text-[#C9A86C] opacity-50 text-2xl font-bold font-serif">Kaelura</span>
                              </div>
                          )}
                          <div className="absolute top-3 right-3 shadow-md">
                            {isAvailable ? (
                              <span className="bg-green-500 text-white text-xs px-3 py-1.5 font-bold uppercase tracking-wide">Available</span>
                            ) : (
                              <span className="bg-red-500 text-white text-xs px-3 py-1.5 font-bold uppercase tracking-wide">Unavailable</span>
                            )}
                          </div>
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow relative">
                        <p className="text-gray-400 text-sm font-semibold mb-1 w-full flex justify-between">
                            <span>Room #{room.roomId}</span>
                        </p>
                        <h3 className="font-bold text-[#3D1C3A] text-2xl mb-4">{room.category}</h3>
                        
                        <div className="flex items-center text-gray-500 text-sm font-medium mb-3">
                            <Users size={16} className="mr-2 text-[#C9A86C]"/>
                            <span>Max {room.maxGuests || 2} Guests</span>
                        </div>
                        
                        <p className="italic text-gray-500 text-sm leading-relaxed line-clamp-2 h-10 mb-4 flex-grow">
                            {room.specialDescription || `Experience unmatched luxury in our premium ${room.category} space.`}
                        </p>
                        
                        <div className="border-t border-[#F0E6D3] my-4 w-full"></div>
                        
                        <div className="mb-6">
                            <span className="text-[#C9A86C] font-bold text-lg">Rs. {price} <span className="text-sm font-normal text-gray-500">/ night</span></span>
                        </div>
                        
                        <button 
                            onClick={() => isAvailable && setSelectedRoom(room)}
                            disabled={!isAvailable}
                            className={`w-full py-3.5 font-bold transition-all mt-auto shadow-md ${isAvailable ? 'bg-[#3D1C3A] text-[#C9A86C] hover:bg-[#6B3F68]' : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'}`}
                        >
                            {isAvailable ? 'Book Now' : 'Not Available'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Booking Modal Popup Overlay */}
      {selectedRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in transition-all">
              <div className="bg-white shadow-2xl w-full max-w-lg overflow-hidden border border-[#C9A86C]">
                  <div className="bg-[#3D1C3A] p-5 text-[#F0E6D3] flex justify-between items-center border-b-[3px] border-[#C9A86C]">
                      <h3 className="font-bold text-xl uppercase tracking-wide">Book Room #{selectedRoom.roomId}</h3>
                      <button onClick={() => setSelectedRoom(null)} className="text-white hover:text-[#C9A86C] text-3xl leading-none transition-colors">&times;</button>
                  </div>
                  
                  <form onSubmit={handleBook} className="p-7">
                      {bookingError && <div className="mb-5 text-sm font-bold text-red-600 bg-red-50 border-l-4 border-red-500 p-3 shadow-sm">{bookingError}</div>}
                      
                      <div className="grid grid-cols-2 gap-5 mb-5">
                          <div>
                              <label className="block text-sm font-bold text-[#3D1C3A] mb-2 uppercase tracking-wide">Check-in</label>
                              <input 
                                  type="date"
                                  required
                                  name="checkIn"
                                  value={formData.checkIn}
                                  onChange={handleInputChange}
                                  className="w-full border-2 border-gray-200 rounded-none p-2.5 focus:border-[#C9A86C] focus:ring-0 outline-none transition-colors bg-gray-50"
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-bold text-[#3D1C3A] mb-2 uppercase tracking-wide">Check-out</label>
                              <input 
                                  type="date"
                                  required
                                  name="checkOut"
                                  value={formData.checkOut}
                                  onChange={handleInputChange}
                                  className="w-full border-2 border-gray-200 rounded-none p-2.5 focus:border-[#C9A86C] focus:ring-0 outline-none transition-colors bg-gray-50"
                              />
                          </div>
                      </div>

                      <div className="mb-5">
                          <label className="block text-sm font-bold text-[#3D1C3A] mb-2 uppercase tracking-wide">Number of Guests</label>
                          <input 
                              type="number"
                              required
                              min="1"
                              max={selectedRoom.maxGuests || 10}
                              name="guests"
                              value={formData.guests}
                              onChange={handleInputChange}
                              className="w-full border-2 border-gray-200 rounded-none p-2.5 focus:border-[#C9A86C] focus:ring-0 outline-none transition-colors bg-gray-50"
                          />
                          <p className="text-xs text-gray-500 mt-1 space-x-1">Maximum allowed: <span className="font-bold">{selectedRoom.maxGuests || 2}</span></p>
                      </div>

                      <div className="mb-8">
                          <label className="block text-sm font-bold text-[#3D1C3A] mb-2 uppercase tracking-wide">Special Requests</label>
                          <textarea 
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              rows="3"
                              className="w-full border-2 border-gray-200 rounded-none p-2.5 focus:border-[#C9A86C] focus:ring-0 outline-none transition-colors bg-gray-50"
                              placeholder="Any special requests or arrival notes?"
                          />
                      </div>

                      <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                          <button 
                              type="button" 
                              onClick={() => setSelectedRoom(null)}
                              className="px-6 py-2.5 text-[#3D1C3A] font-bold border-2 border-gray-300 hover:border-[#3D1C3A] hover:bg-gray-50 transition-colors uppercase tracking-wide text-sm"
                          >
                              Cancel
                          </button>
                          <button 
                              type="submit" 
                              disabled={bookingLoading}
                              className={`px-8 py-2.5 text-white font-bold transition-colors uppercase tracking-wide text-sm ${bookingLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#C9A86C] hover:bg-[#b09156] text-[#3D1C3A] shadow-md'}`}
                          >
                              {bookingLoading ? "Processing..." : "Confirm Booking"}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
      <Footer />
    </div>
  );
}
