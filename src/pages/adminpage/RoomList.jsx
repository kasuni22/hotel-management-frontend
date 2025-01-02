export default function RoomList() {
  
  const rooms = [
      {
          roomId: 1,
          category: "Luxury",
          maxGuests: 3,
          available: true,
          photos: "https://example.com/room1.jpg",
          specialDescription: "Ocean view with balcony",
          notes: "Recently renovated"
      },
      {
          roomId: 2,
          category: "Normal",
          maxGuests: 2,
          available: false,
          photos: "https://example.com/room2.jpg",
          specialDescription: "Close to the pool",
          notes: "Under maintenance"
      },
      {
          roomId: 3,
          category: "Low",
          maxGuests: 1,
          available: true,
          photos: "https://example.com/room3.jpg",
          specialDescription: "Economy option",
          notes: "No special features"
      }
  ];

  return (
      <div className="w-full">
          <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Room List</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                  Add New Room
              </button>
          </div>

          <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                      <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Room ID</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Max Guests</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Available</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Photos</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Special Description</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Notes</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                      {rooms.map((room) => (
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
                                  <img src={room.photos} alt="Room" className="h-12 w-12 object-cover rounded" />
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800">{room.specialDescription}</td>
                              <td className="px-6 py-4 text-sm text-gray-800">{room.notes}</td>
                              <td className="px-6 py-4 text-sm">
                                  <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                                  <button className="text-red-600 hover:text-red-800">Delete</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
  );
}
