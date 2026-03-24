import { useState, useEffect } from "react";
import axios from "axios";

export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookings = () => {
        setIsLoading(true);
        setError(null);
        
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication error: No login token found.");
            setIsLoading(false);
            return;
        }

        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/bookings", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            // The backend returns { data: { bookings: [...] } }
            setBookings(res.data.data.bookings || []);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setError("Failed to fetch bookings from server.");
            setIsLoading(false);
        });
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const updateStatus = (bookingId, newStatus) => {
        const token = localStorage.getItem("token");
        axios.patch(import.meta.env.VITE_BACKEND_URL + `/api/bookings/${bookingId}/status`, 
            { status: newStatus },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
            alert(`Booking ${bookingId} marked as ${newStatus}`);
            fetchBookings(); // Automatically refresh list
        })
        .catch(err => {
            console.error(err);
            alert("Failed to update status. Please try again.");
        });
    };

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-4 flex text-lg font-semibold text-gray-700">Loading Bookings...</span>
            </div>
        );
    }
  
    if (error) {
        return (
            <div className="w-full text-center py-20">
                <div className="text-red-600 font-bold text-xl">{error}</div>
                <button 
                    onClick={fetchBookings}
                    className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded shadow hover:bg-red-200 font-semibold"
                >
                    Retry API Request
                </button>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch((status || "").toLowerCase()) {
            case "approved": return "bg-green-100 text-green-800 border border-green-200";
            case "rejected": 
            case "cancelled": return "bg-red-100 text-red-800 border border-red-200";
            case "completed": return "bg-blue-100 text-blue-800 border border-blue-200";
            case "pending":
            default: return "bg-yellow-100 text-yellow-800 border border-yellow-200";
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6">Booking List</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Booking ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Room ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Dates</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Notes</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-8 text-center text-gray-500 font-medium">
                                    No bookings found in the database.
                                </td>
                            </tr>
                        ) : (
                            bookings.map((booking) => (
                                <tr key={booking.bookingId} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm text-gray-800">{booking.bookingId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{booking.roomId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{booking.email}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                                            {(booking.status || 'Pending').toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {new Date(booking.start).toLocaleDateString()} <br /> to <br /> {new Date(booking.end).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{booking.notes || "-"}</td>
                                    <td className="px-6 py-4 text-sm flex gap-2">
                                        {booking.status !== "approved" && (
                                            <button 
                                                onClick={() => updateStatus(booking.bookingId, "approved")}
                                                className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 font-semibold transition"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {booking.status !== "rejected" && (
                                            <button 
                                                onClick={() => updateStatus(booking.bookingId, "rejected")}
                                                className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 font-semibold transition"
                                            >
                                                Reject
                                            </button>
                                        )}
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
