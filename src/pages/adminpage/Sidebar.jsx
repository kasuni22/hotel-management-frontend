import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === `/admin${path}` ? "bg-blue-700" : "";
  };

  const menuItems = [
    { path: '/rooms', label: 'Rooms' },
    { path: '/booking', label: 'Bookings' },
    { path: '/categories', label: 'Categories' },
    { path: '/users', label: 'Users' },
    { path: '/feedback', label: 'Feedback' },
    { path: '/gallery', label: 'Gallery Items' },
  ];

  return (
    <div className="h-screen w-64 bg-blue-600 text-white p-6 flex flex-col">
      <div className="text-2xl font-bold mb-8">Admin Panel</div>
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={`/admin${item.path}`}
            className={`block px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 hover:font-bold ${isActive(item.path)}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}