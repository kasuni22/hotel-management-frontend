import { useState } from "react";

export default function UsersList() {
    
    const [users, setUsers] = useState([
        {
            id: 1,
            email: "john@example.com",
            password: "********",
            firstName: "John",
            lastName: "Smith",
            type: "customer",
            whatsApp: "1234567890",
            phone: "1234567890",
            disabled: false,
            emailVerified: true,
            createdAt: "2024-12-15",
            updatedAt: "2024-12-15"
        },
        {
            id: 2,
            email: "sarah@example.com",
            password: "********",
            firstName: "Sarah",
            lastName: "Wilson",
            type: "admin",
            whatsApp: "9876543210",
            phone: "9876543210",
            disabled: false,
            emailVerified: true,
            createdAt: "2024-12-10",
            updatedAt: "2024-12-10"
        }
    ]);

    const [selectedRow, setSelectedRow] = useState(null);

    const handleEdit = () => {
        if (selectedRow !== null) {
            alert(`Editing user: ${users[selectedRow].firstName} ${users[selectedRow].lastName}`);
        } else {
            alert("Please select a row to edit.");
        }
    };

    const handleDelete = () => {
        if (selectedRow !== null) {
            alert(`Deleting user: ${users[selectedRow].firstName} ${users[selectedRow].lastName}`);
        } else {
            alert("Please select a row to delete.");
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Users List</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                    Add New User
                </button>
            </div>

            <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">First Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Last Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">WhatsApp</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Phone</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email Verified</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Disabled</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Created At</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user, index) => (
                            <tr
                                key={user.id}
                                className={`hover:bg-gray-50 cursor-pointer ${selectedRow === index ? "bg-blue-100" : ""}`}
                                onClick={() => setSelectedRow(index)}
                            >
                                <td className="px-6 py-4 text-sm text-gray-800">{user.firstName}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.lastName}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.type}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.whatsApp}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.phone}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        user.emailVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {user.emailVerified ? 'Verified' : 'Not Verified'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        user.disabled ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                    }`}>
                                        {user.disabled ? 'Disabled' : 'Active'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded mr-2 hover:bg-blue-700"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
