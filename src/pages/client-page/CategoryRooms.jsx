import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CategoryRooms() {
  const { category } = useParams();
  const navigate = useNavigate();
  
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    // API Call to fetch filtered rooms
    axios.get(import.meta.env.VITE_BACKEND_URL + `/api/rooms/by-category/${category}`)
      .then((res) => {
        // Assume res.data.rooms contains the array based on previous patterns
        setRooms(res.data.rooms || res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load rooms for this category. The backend endpoint might not exist or failed.");
        setLoading(false);
      });
  }, [category]);

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

    // Validate dates before API execution
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    
    if (checkOutDate <= checkInDate) {
        setBookingError("Check-out must be after check-in");
        return;
    }

    setBookingLoading(true);
    setBookingError(null);

    // Payload maps to model fields
    const payload = {
        roomId: selectedRoom.roomId,
        start: formData.checkIn,
        end: formData.checkOut,
        guests: formData.guests,
        message: formData.message,
        notes: formData.message // Include notes in case the backend Booking model strictly uses 'notes'
    };

    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/bookings", payload, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
        alert("Booking created successfully!");
        setSelectedRoom(null); // Close modal
        setBookingLoading(false);
        // Reset form
        setFormData({ checkIn: "", checkOut: "", guests: 1, message: "" });
    })
    .catch((err) => {
        console.error("Booking Error:", err);
        setBookingError("Failed to complete booking. Please try again or check your token length.");
        setBookingLoading(false);
    });
  };

  if (loading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading available rooms...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-600 font-semibold">{error}</div>;
  }

  return (
    <div className="w-full p-8 bg-gray-50 min-h-screen relative">
      <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">
          Available <span className="text-blue-600">{category}</span> Rooms
        </h1>
        <button 
            onClick={() => navigate('/categories')}
            className="text-blue-600 hover:underline font-semibold"
        >
            &larr; Back to Categories
        </button>
      </div>

      {rooms.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No rooms currently available in this category.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {rooms.map((room) => (
            <div key={room._id || room.roomId} className="bg-white rounded-xl shadow-lg border overflow-hidden">
              <div className="relative h-48 w-full bg-gray-200">
                  {room.photos && room.photos.length > 0 ? (
                      <img 
                          src={Array.isArray(room.photos) ? room.photos[0] : room.photos} 
                          alt={`Room ${room.roomId}`} 
                          className="w-full h-full object-cover" 
                      />
                  ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-bold shadow">
                      Room {room.roomId}
                  </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-2 h-16 line-clamp-3 leading-relaxed">
                    {room.specialDescription || "A beautiful and comfortable space."}
                </p>
                <div className="flex justify-between items-center mt-4">
                    <span className="font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        Max Guests: {room.maxGuests}
                    </span>
                    <button 
                        onClick={() => setSelectedRoom(room)}
                        className="bg-green-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-green-700 shadow-md transition-transform active:scale-95"
                    >
                        Book Now
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal Popup Overlay */}
      {selectedRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 animate-fade-in transition-all">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                  <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
                      <h3 className="font-bold text-lg">Book Room {selectedRoom.roomId}</h3>
                      <button onClick={() => setSelectedRoom(null)} className="text-white hover:text-gray-200 text-2xl leading-none">&times;</button>
                  </div>
                  
                  <form onSubmit={handleBook} className="p-6">
                      {bookingError && <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">{bookingError}</div>}
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-1">Check-in Date</label>
                              <input 
                                  type="date"
                                  required
                                  name="checkIn"
                                  value={formData.checkIn}
                                  onChange={handleInputChange}
                                  className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-600 outline-none"
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-1">Check-out Date</label>
                              <input 
                                  type="date"
                                  required
                                  name="checkOut"
                                  value={formData.checkOut}
                                  onChange={handleInputChange}
                                  className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-600 outline-none"
                              />
                          </div>
                      </div>

                      <div className="mb-4">
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Guests</label>
                          <input 
                              type="number"
                              required
                              min="1"
                              max={selectedRoom.maxGuests || 10}
                              name="guests"
                              value={formData.guests}
                              onChange={handleInputChange}
                              className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-600 outline-none"
                          />
                      </div>

                      <div className="mb-6">
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Special Requests</label>
                          <textarea 
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              rows="3"
                              className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-600 outline-none"
                              placeholder="Any special requests or arrival notes?"
                          />
                      </div>

                      <div className="flex justify-end gap-3">
                          <button 
                              type="button" 
                              onClick={() => setSelectedRoom(null)}
                              className="px-4 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded"
                          >
                              Cancel
                          </button>
                          <button 
                              type="submit" 
                              disabled={bookingLoading}
                              className={`px-6 py-2 rounded text-white font-bold shadow-md transition ${bookingLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                          >
                              {bookingLoading ? "Processing..." : "Confirm Booking"}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
}
