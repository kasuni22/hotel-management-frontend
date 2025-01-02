import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === `/admin${path}` ? "bg-blue-700" : "";
  };

  return (
    <div className="h-screen w-64 bg-blue-600 text-white p-6 flex flex-col">
      <div className="text-2xl font-bold mb-8">Admin Panel</div>
      <nav className="space-y-4">
        <Link
          to="/admin/rooms"
          className={`block px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ${isActive('/rooms')}`}
        >
          Rooms
        </Link>
        <Link
          to="/admin/booking"
          className={`block px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ${isActive('/booking')}`}
        >
          Bookings
        </Link>
      </nav>
    </div>
  );
}