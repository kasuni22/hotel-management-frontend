
export default function RoomList() {
    // Sample room data 
    const rooms = [
      {
        id: 1,
        roomNumber: "101",
        type: "Luxury",
        capacity: "2 Adults, 1 Child",
        price: "$200",
        status: "Available"
      },
      {
        id: 2,
        roomNumber: "102",
        type: "Normal",
        capacity: "2 Adults",
        price: "$150",
        status: "Occupied"
      },
      {
        id: 3,
        roomNumber: "103",
        type: "Low",
        capacity: "1 Adult",
        price: "$100",
        status: "Maintenance"
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Room Number</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Capacity</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Price/Night</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{room.roomNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{room.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{room.capacity}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{room.price}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      room.status === 'Available' ? 'bg-green-100 text-green-800' :
                      room.status === 'Occupied' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {room.status}
                    </span>
                  </td>
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