import { useState, useEffect } from "react";
import axios from "axios";

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = () => {
        setIsLoading(true);
        setError(null);
        
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication error: No login token found.");
            setIsLoading(false);
            return;
        }

        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            // Flexible binding depending on Express .json() envelope formatting
            setUsers(res.data.users || res.data || []);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching users:", err);
            setError("Failed to fetch users from server.");
            setIsLoading(false);
        });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-4 flex text-lg font-semibold text-gray-700">Loading Users...</span>
            </div>
        );
    }
  
    if (error) {
        return (
            <div className="w-full text-center py-20">
                <div className="text-red-600 font-bold text-xl">{error}</div>
                <button 
                    onClick={fetchUsers}
                    className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded shadow hover:bg-red-200 font-semibold transition"
                >
                    Retry API Request
                </button>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Users List</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow">
                    Add New User
                </button>
            </div>

            <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Identity</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Phone</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">WhatsApp</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Account Type</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500 font-medium">
                                    No users found in the database.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id || user.email} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-800">{user.firstName} {user.lastName}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{user.phone || "-"}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{user.whatsApp || "-"}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                            (user.type || "").toLowerCase() === 'admin' 
                                                ? 'bg-purple-100 text-purple-800 border-purple-200 shadow-sm' 
                                                : 'bg-blue-100 text-blue-800 border-blue-200'
                                        }`}>
                                            {(user.type || "Customer").toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            user.disabled ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                            {user.disabled ? 'Disabled' : 'Active'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* Purposely omitted Edit/Delete row modifier buttons for architectural safety */}
        </div>
    );
}
