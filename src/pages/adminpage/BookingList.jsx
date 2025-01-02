import { useState } from "react";

export default function BookingList() {
    
    const [bookings, setBookings] = useState([
        {
            bookingId: 101,
            roomId: 12,
            email: "john.doe@example.com",
            status: "Confirmed",
            reason: "Vacation",
            start: "2025-01-15",
            end: "2025-01-20",
            notes: "Requires early check-in",
            timeStamp: "2025-01-01"
        },
        {
            bookingId: 102,
            roomId: 14,
            email: "jane.smith@example.com",
            status: "Pending",
            reason: "Conference",
            start: "2025-01-18",
            end: "2025-01-22",
            notes: "Late check-out requested",
            timeStamp: "2025-01-02"
        }
    ]);

    const [selectedRow, setSelectedRow] = useState(null);

    const handleEdit = () => {
        if (selectedRow !== null) {
            alert(`Editing row with Booking ID: ${bookings[selectedRow].bookingId}`);
        } else {
            alert("Please select a row to edit.");
        }
    };

    const handleCancel = () => {
        if (selectedRow !== null) {
            alert(`Canceling row with Booking ID: ${bookings[selectedRow].bookingId}`);
        } else {
            alert("Please select a row to cancel.");
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6">Booking List</h2>

            <div className="flex justify-end mb-4">
                <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded mr-2 hover:bg-blue-700 "
                >
                    Edit
                </button>
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Cancel
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Booking ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Room ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Reason</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Start Date</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">End Date</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Notes</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {bookings.map((booking, index) => (
                            <tr
                                key={booking.bookingId}
                                className={`hover:bg-gray-50 cursor-pointer ${
                                    selectedRow === index ? "bg-blue-100" : ""
                                }`}
                                onClick={() => setSelectedRow(index)}
                            >
                                <td className="px-6 py-4 text-sm text-gray-800">{booking.bookingId}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{booking.roomId}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{booking.email}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800">{booking.reason}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{booking.start}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{booking.end}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{booking.notes}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{booking.timeStamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
