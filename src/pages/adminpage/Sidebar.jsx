import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHotel, FaBookmark, FaUser, FaComments, FaSignOutAlt } from "react-icons/fa";
import { MdCategory, MdPhotoLibrary } from "react-icons/md";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === `/admin${path}` ? "bg-[#6B3F68]" : "";
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
    <div className="h-screen w-64 bg-[#3D1C3A] text-[#F0E6D3] p-6 flex flex-col">
      <div 
        onClick={() => navigate('/admin')} 
        className="text-2xl font-bold mb-8 text-[#C9A86C] cursor-pointer hover:opacity-80 transition"
      >
        Admin Panel
      </div>
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={`/admin${item.path}`}
            className={`flex items-center px-4 py-2 rounded-md hover:bg-[#6B3F68] transition duration-300 hover:text-[#C9A86C] hover:font-bold ${isActive(item.path)}`}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </Link>
        ))}
      </nav>
      <button 
        onClick={handleLogout}
        className="mt-auto w-full bg-[#C9A86C] text-[#3D1C3A] py-2 px-4 rounded-md font-bold transition duration-300 hover:bg-[#3D1C3A] hover:text-[#C9A86C] border border-[#C9A86C] flex items-center justify-center gap-2"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}
