import { Link, useLocation } from "react-router-dom";
import { FaHotel, FaBookmark, FaUser, FaComments } from "react-icons/fa";
import { MdCategory, MdPhotoLibrary } from "react-icons/md";

export default function Sidebar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === `/admin${path}` ? "bg-blue-700" : "";
  };

  const menuItems = [
    
    { path: '/booking', label: 'Bookings', icon: <FaBookmark /> },
    { path: '/categories', label: 'Categories', icon: <MdCategory /> },
    { path: '/rooms', label: 'Rooms', icon: <FaHotel /> },
    { path: '/users', label: 'Users', icon: <FaUser /> },
    { path: '/feedback', label: 'Feedback', icon: <FaComments /> },
    { path: '/gallery', label: 'Gallery Items', icon: <MdPhotoLibrary /> },
  ];

  return (
    <div className="h-screen w-64 bg-blue-600 text-white p-6 flex flex-col">
      <div className="text-2xl font-bold mb-8">Admin Panel</div>
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={`/admin${item.path}`}
            className={`flex items-center px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 hover:font-bold ${isActive(item.path)}`}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
