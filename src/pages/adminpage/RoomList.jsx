import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchRooms = () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    if (!token) {
        setError("Authentication error: No login token found.");
        setIsLoading(false);
        return;
    }

    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/rooms", {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
        setRooms(res.data.rooms || []);
        setIsLoading(false);
    })
    .catch((err) => {
        console.error("Error fetching rooms:", err);
        setError("Failed to fetch rooms from the server.");
        setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = (roomId) => {
      const confirmDelete = window.confirm(`Are you sure you want to delete room ${roomId}?`);
      if (!confirmDelete) return;

      const token = localStorage.getItem("token");
      axios.delete(import.meta.env.VITE_BACKEND_URL + `/api/rooms/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
          alert("Room deleted successfully");
          fetchRooms(); // Dynamically refresh the list
      })
      .catch((err) => {
          console.error("Failed to delete room:", err);
          alert("Failed to delete room. Please try again.");
      });
  };

  if (isLoading) {
      return (
          <div className="w-full flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-[#C9A86C] border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-4 flex text-lg font-semibold text-gray-700">Loading Rooms...</span>
          </div>
      );
  }

  if (error) {
      return (
          <div className="w-full text-center py-20">
              <div className="text-red-600 font-bold text-xl">{error}</div>
              <button 
                  onClick={fetchRooms}
                  className="mt-4 bg-[#C9A86C] text-[#3D1C3A] px-4 py-2 rounded shadow hover:opacity-80 font-semibold"
              >
                  Retry API Request
              </button>
          </div>
      );
  }

  return (
      <div className="w-full">
          <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Room List</h2>
              <button 
                  onClick={() => navigate('/admin/add-room')}
                  className="bg-[#C9A86C] text-[#3D1C3A] font-bold px-4 py-2 rounded-md hover:opacity-80 transition duration-300"
              >
                  Add New Room
              </button>
          </div>

          <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-[#3D1C3A] text-[#F0E6D3]">
                      <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Room ID</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Max Guests</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Available</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Photos</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Special Description</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Notes</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                      {rooms.length === 0 ? (
                          <tr>
                              <td colSpan="8" className="px-6 py-8 text-center text-gray-500 font-medium">
                                  No rooms available in the database.
                              </td>
                          </tr>
                      ) : (
                          rooms.map((room) => (
                              <tr key={room.roomId} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 text-sm text-gray-800">{room.roomId}</td>
                                  <td className="px-6 py-4 text-sm text-gray-800">{room.category}</td>
                                  <td className="px-6 py-4 text-sm text-gray-800">{room.maxGuests}</td>
                                  <td className="px-6 py-4 text-sm">
                                      <span className={`px-2 py-1 rounded-full text-xs ${
                                          room.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                      }`}>
                                          {room.available ? 'Available' : 'Unavailable'}
                                      </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-800">
                                      {room.photos ? (
                                        <img 
                                          src={Array.isArray(room.photos) ? room.photos[0] : room.photos} 
                                          alt="Room" 
                                          className="h-12 w-12 object-cover rounded shadow" 
                                        />
                                      ) : (
                                        <div className="h-12 w-12 bg-gray-200 border flex items-center justify-center text-[10px] text-gray-400 rounded">No Img</div>
                                      )}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-800">{room.specialDescription}</td>
                                  <td className="px-6 py-4 text-sm text-gray-800">{room.notes}</td>
                                  <td className="px-6 py-4 text-sm">
                                      <button 
                                        onClick={() => navigate('/admin/edit-room/' + room.roomId)}
                                        className="bg-[#C9A86C] text-[#3D1C3A] px-3 py-1 rounded mr-2 font-semibold hover:opacity-80"
                                      >
                                        Edit
                                      </button>
                                      <button 
                                        onClick={() => handleDelete(room.roomId)}
                                        className="bg-[#6B3F68] text-[#F0E6D3] px-3 py-1 rounded font-semibold hover:opacity-80"
                                      >
                                        Delete
                                      </button>
                                  </td>
                              </tr>
                          ))
                      )}
                  </tbody>
              </table>
          </div>
      </div>
  );
}
