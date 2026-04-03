import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaHotel, FaUser } from "react-icons/fa";
import { MdCategory, MdOutlineRoomPreferences, MdAddBox, MdPhotoLibrary } from "react-icons/md";

export default function DashboardOverview() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        bookings: 0,
        rooms: 0,
        categories: 0,
        users: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");
                const configAuth = { headers: { Authorization: `Bearer ${token}` } };
                const backendUrl = import.meta.env.VITE_BACKEND_URL;

                const [bookingsRes, roomsRes, categoriesRes, usersRes] = await Promise.all([
                    axios.get(`${backendUrl}/api/bookings`, configAuth).catch(() => ({ data: { list: [] } })),
                    axios.get(`${backendUrl}/api/rooms`).catch(() => ({ data: { list: [] } })),
                    axios.get(`${backendUrl}/api/category`).catch(() => ({ data: { categories: [] } })),
                    axios.get(`${backendUrl}/api/users`, configAuth).catch(() => ({ data: { users: [] } }))
                ]);

                setStats({
                    bookings: bookingsRes.data?.data?.totalBookings || bookingsRes.data?.data?.bookings?.length || 0,
                    rooms: roomsRes.data?.rooms?.length || 0,
                    categories: categoriesRes.data?.categories?.length || categoriesRes.data?.length || 0,
                    users: usersRes.data?.users?.length || usersRes.data?.length || 0,
                });
            } catch (error) {
                console.error("Error fetching dashboard statistics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString(undefined, dateOptions);

    const statCards = [
        { title: "Total Bookings", value: stats.bookings, icon: <FaBookmark size={24} className="text-[#C9A86C]" /> },
        { title: "Total Rooms", value: stats.rooms, icon: <FaHotel size={24} className="text-[#C9A86C]" /> },
        { title: "Total Categories", value: stats.categories, icon: <MdCategory size={24} className="text-[#C9A86C]" /> },
        { title: "Total Users", value: stats.users, icon: <FaUser size={24} className="text-[#C9A86C]" /> },
    ];

    const quickActions = [
        { label: "Add New Room", path: "/admin/add-room", icon: <MdOutlineRoomPreferences size={20} /> },
        { label: "Add Category", path: "/admin/add-category", icon: <MdAddBox size={20} /> },
        { label: "View Bookings", path: "/admin/booking", icon: <FaBookmark size={20} /> },
        { label: "Manage Gallery", path: "/admin/gallery", icon: <MdPhotoLibrary size={20} /> },
    ];

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-[#C9A86C] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full p-6 animation-fade-in">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-[#3D1C3A] mb-2">Welcome Back, Admin</h1>
                <p className="text-[#C9A86C] font-semibold text-lg">{currentDate}</p>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statCards.map((card, index) => (
                    <div 
                        key={index} 
                        className="bg-white border-b-4 border-[#C9A86C] rounded-lg shadow-md p-6 flex items-center justify-between hover:-translate-y-1 transition duration-300"
                    >
                        <div>
                            <p className="text-gray-500 font-medium text-sm mb-1 uppercase tracking-wider">{card.title}</p>
                            <h2 className="text-3xl font-bold text-[#3D1C3A]">{card.value}</h2>
                        </div>
                        <div className="bg-[#FAF7F2] p-4 rounded-full">
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions Row */}
            <div>
                <h2 className="text-2xl font-bold text-[#3D1C3A] mb-6 border-l-4 border-[#C9A86C] pl-3">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                        <button
                            key={index}
                            onClick={() => navigate(action.path)}
                            className="bg-[#3D1C3A] text-[#C9A86C] flex items-center justify-center gap-3 py-4 rounded-lg font-bold text-lg hover:opacity-80 transition duration-300 shadow-lg"
                        >
                            {action.icon}
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
