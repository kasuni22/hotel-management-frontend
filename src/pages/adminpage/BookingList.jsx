export default function BookingList() {
    // This is sample data 
    const bookings = [
      {
        id: 1,
        guestName: "John Doe",
        checkIn: "2025-01-15",
        checkOut: "2025-01-20",
        roomType: "Luxury",
        status: "Confirmed"
      },
      {
        id: 2,
        guestName: "Jane Smith",
        checkIn: "2025-01-18",
        checkOut: "2025-01-22",
        roomType: "Normal",
        status: "Pending"
      }
    ];
  
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6">Booking List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Guest Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Check In</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Check Out</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Room Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{booking.guestName}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{booking.checkIn}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{booking.checkOut}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{booking.roomType}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }