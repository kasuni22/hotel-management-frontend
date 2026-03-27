import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight, Globe, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a0c18] border-t-[3px] border-[#C9A86C] text-[#F0E6D3] font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col space-y-6">
            <Link to="/" className="flex items-center gap-3 w-fit group">
              <div className="bg-[#C9A86C] text-[#3D1C3A] font-bold w-12 h-12 rounded-sm flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(201,168,108,0.3)] group-hover:shadow-[0_0_20px_rgba(201,168,108,0.5)] transition-shadow duration-300">
                K
              </div>
              <div className="flex flex-col">
                <span className="text-[#C9A86C] text-2xl font-bold font-serif leading-none tracking-wide">
                  Kaelura
                </span>
                <span className="text-white text-[10px] sm:text-xs tracking-[0.25em] uppercase mt-1">
                  Grand Hotel
                </span>
              </div>
            </Link>
            <p className="text-[#F0E6D3]/60 leading-relaxed font-light text-sm max-w-sm">
              Experience the pinnacle of hospitality. Where classical grandeur meets modern elegance for an unforgettable stay.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full border border-[#6B3F68] flex items-center justify-center text-[#C9A86C] hover:bg-[#C9A86C] hover:text-[#3D1C3A] hover:border-[#C9A86C] transition-all duration-300 shadow-md text-[10px] font-bold">
                <span>FB</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#6B3F68] flex items-center justify-center text-[#C9A86C] hover:bg-[#C9A86C] hover:text-[#3D1C3A] hover:border-[#C9A86C] transition-all duration-300 shadow-md text-[10px] font-bold">
                <span>X</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#6B3F68] flex items-center justify-center text-[#C9A86C] hover:bg-[#C9A86C] hover:text-[#3D1C3A] hover:border-[#C9A86C] transition-all duration-300 shadow-md text-[10px] font-bold">
                <span>IG</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-white font-serif text-lg font-bold mb-8 tracking-wider uppercase relative inline-block after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-10 after:h-[2px] after:bg-[#C9A86C]">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm font-light text-[#F0E6D3]/70">
              <li>
                <Link to="/about" className="hover:text-[#C9A86C] transition-colors flex items-center gap-3 group w-fit">
                  <span className="w-0 h-[1px] bg-[#C9A86C] transition-all duration-300 group-hover:w-4"></span> About Us
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-[#C9A86C] transition-colors flex items-center gap-3 group w-fit">
                  <span className="w-0 h-[1px] bg-[#C9A86C] transition-all duration-300 group-hover:w-4"></span> Our Rooms
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#C9A86C] transition-colors flex items-center gap-3 group w-fit">
                  <span className="w-0 h-[1px] bg-[#C9A86C] transition-all duration-300 group-hover:w-4"></span> Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C9A86C] transition-colors flex items-center gap-3 group w-fit">
                  <span className="w-0 h-[1px] bg-[#C9A86C] transition-all duration-300 group-hover:w-4"></span> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services / Explore */}
          <div className="flex flex-col">
            <h4 className="text-white font-serif text-lg font-bold mb-8 tracking-wider uppercase relative inline-block after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-10 after:h-[2px] after:bg-[#C9A86C]">
              Explore
            </h4>
            <ul className="space-y-4 text-sm font-light text-[#F0E6D3]/70">
              <li>
                <Link to="/rooms" className="hover:text-[#C9A86C] transition-colors flex items-center gap-3 group w-fit">
                  <span className="w-0 h-[1px] bg-[#C9A86C] transition-all duration-300 group-hover:w-4"></span> Luxury Suites
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-[#C9A86C] transition-colors flex items-center gap-3 group w-fit">
                  <span className="w-0 h-[1px] bg-[#C9A86C] transition-all duration-300 group-hover:w-4"></span> Fine Dining
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C9A86C] transition-colors flex items-center gap-3 group w-fit">
                  <span className="w-0 h-[1px] bg-[#C9A86C] transition-all duration-300 group-hover:w-4"></span> Wellness & Spa
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C9A86C] transition-colors flex items-center gap-3 group w-fit">
                  <span className="w-0 h-[1px] bg-[#C9A86C] transition-all duration-300 group-hover:w-4"></span> Private Events
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details & Newsletter */}
          <div className="flex flex-col">
            <h4 className="text-white font-serif text-lg font-bold mb-8 tracking-wider uppercase relative inline-block after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-10 after:h-[2px] after:bg-[#C9A86C]">
              Contact Us
            </h4>
            <ul className="space-y-5 text-sm font-light text-[#F0E6D3]/70 mb-10">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-[#C9A86C] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <span className="leading-relaxed">123 Luxury Avenue, Colombo<br/>Sri Lanka</span>
              </li>
              <li className="flex items-center gap-4 hover:text-[#C9A86C] transition-colors cursor-pointer w-fit">
                <Phone size={20} className="text-[#C9A86C] flex-shrink-0" strokeWidth={1.5} />
                <span className="tracking-wide">+94 112 345 678</span>
              </li>
              <li className="flex items-center gap-4 hover:text-[#C9A86C] transition-colors cursor-pointer w-fit">
                <Mail size={20} className="text-[#C9A86C] flex-shrink-0" strokeWidth={1.5} />
                <span className="tracking-wide">res@kaeluragrand.com</span>
              </li>
            </ul>
            
            {/* Newsletter */}
            <h5 className="text-white font-serif text-sm font-bold mb-4 tracking-wider uppercase">Stay Updated</h5>
            <div className="relative flex shadow-md group">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-[#3D1C3A] border border-[#6B3F68] text-white text-sm px-5 py-3.5 placeholder:text-gray-400 focus:outline-none focus:border-[#C9A86C] focus:bg-[#462142] transition-colors rounded-none"
              />
              <button 
                type="submit" 
                className="absolute right-0 top-0 bottom-0 px-5 bg-[#C9A86C] text-[#3D1C3A] hover:bg-[#b09156] transition-colors flex items-center justify-center border border-[#C9A86C]"
                aria-label="Subscribe"
              >
                <ArrowRight size={20} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#6B3F68]/40 bg-[#3D1C3A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-light text-[#F0E6D3]/50">
          <p className="tracking-wide text-center md:text-left">
            &copy; {new Date().getFullYear()} <span className="text-[#C9A86C]">Kaelura Grand Hotel</span>. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 tracking-wide">
            <Link to="/privacy" className="hover:text-[#C9A86C] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#C9A86C] transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-[#C9A86C] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
