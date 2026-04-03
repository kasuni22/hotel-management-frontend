import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userFirstName, setUserFirstName] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserFirstName(decoded.firstName || decoded.name || 'User');
      } catch (error) {
        console.error("Failed to decode token", error);
        localStorage.removeItem('token');
      }
    } else {
      setUserFirstName(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserFirstName(null);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full px-6 lg:px-12 py-4 transition-all duration-300 bg-[#3D1C3A] ${scrolled ? 'shadow-xl' : 'shadow-lg'}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left side — Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-[#C9A86C] text-[#3D1C3A] font-bold w-9 h-9 rounded flex items-center justify-center text-xl">
              K
            </div>
            <span className="text-[#F0E6D3] text-xl font-semibold font-serif whitespace-nowrap">
              Kaelura Grand Hotel
            </span>
          </Link>

          {/* Center — Navigation links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-lg font-medium transition-colors duration-300 ${isActive ? 'text-[#C9A86C] border-b-2 border-[#C9A86C]' : 'text-[#F0E6D3] hover:text-[#C9A86C]'}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right side — Auth buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {userFirstName ? (
              <>
                <span className="text-[#F0E6D3] font-medium mr-2">Welcome, {userFirstName}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-[#C9A86C] text-[#3D1C3A] font-medium rounded-full px-5 py-1.5 hover:bg-[#b09156] transition-colors shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="border border-[#C9A86C] text-[#C9A86C] font-medium rounded-full px-5 py-1.5 hover:bg-[#C9A86C] hover:text-[#3D1C3A] transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="bg-[#C9A86C] text-[#3D1C3A] font-medium rounded-full px-5 py-1.5 hover:bg-[#b09156] transition-colors shadow-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu (hamburger) */}
          <button 
            className="lg:hidden text-[#F0E6D3]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#3D1C3A] shadow-xl border-t border-[#6B3F68]">
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg font-medium transition-colors py-2 ${isActive ? 'text-[#C9A86C]' : 'text-[#F0E6D3] hover:text-[#C9A86C]'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="border-t border-[#6B3F68] my-2 pt-4 flex flex-col gap-3">
                {userFirstName ? (
                  <>
                    <span className="text-[#F0E6D3] font-medium">Welcome, {userFirstName}</span>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="bg-[#C9A86C] text-[#3D1C3A] font-medium rounded-full px-5 py-2 hover:bg-[#b09156] transition-colors text-center shadow-md w-full"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="border border-[#C9A86C] text-[#C9A86C] font-medium rounded-full px-5 py-2 hover:bg-[#C9A86C] hover:text-[#3D1C3A] transition-colors text-center w-full"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="bg-[#C9A86C] text-[#3D1C3A] font-medium rounded-full px-5 py-2 hover:bg-[#b09156] transition-colors text-center shadow-md w-full"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}