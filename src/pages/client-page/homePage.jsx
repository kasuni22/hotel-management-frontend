import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BedDouble, UtensilsCrossed, Sparkles, Waves, Wifi, Car, ChevronDown } from "lucide-react";
import Header from "../../components/header/header";
import hero1 from "../../assets/hero (1).jpg";
import hero2 from "../../assets/hero (2).jpg";
import hero3 from "../../assets/hero (3).jpg";
import aboutImg from "../../assets/about (1).jpg";
import room1 from "../../assets/room (1).jpg";
import room2 from "../../assets/room (2).jpg";
import room3 from "../../assets/room (3).jpg";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [hero1, hero2, hero3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catRes, galleryRes] = await Promise.all([
          axios.get(import.meta.env.VITE_BACKEND_URL + "/api/category"),
          axios.get(import.meta.env.VITE_BACKEND_URL + "/api/gallery")
        ]);
        setCategories(catRes.data.categories || []);
        setGallery(galleryRes.data.list || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching homepage data:", err);
        setError("Failed to load some content. Please check back later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <div className="w-full min-h-screen flex justify-center items-center flex-col relative text-center overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
          >
            <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[rgba(61,28,58,0.55)]"></div>
          </div>
        ))}

        <div className="relative z-10 flex flex-col items-center px-4 w-full mt-10">
          <span className="text-[#C9A86C] tracking-widest text-sm uppercase font-semibold mb-4">
            KAELURA GRAND HOTEL · EST. 2020
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-2 leading-tight">
            Where Luxury
          </h1>
          <h1 className="text-5xl lg:text-7xl font-bold text-[#C9A86C] italic font-serif mb-6 leading-tight">
            Finds its Home
          </h1>
          <p className="text-[#F0E6D3] max-w-xl text-center mb-10 text-lg">
            An exclusive sanctuary crafted for those who seek more than accommodation — a complete, unforgettable experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              to="/rooms"
              className="bg-[#C9A86C] text-[#3D1C3A] font-semibold px-8 py-3 rounded-none hover:bg-[#b09156] transition-colors"
            >
              Explore Rooms
            </Link>
            <Link
              to="/about"
              className="border border-[#F0E6D3] text-[#F0E6D3] px-8 py-3 rounded-none hover:bg-[#F0E6D3] hover:text-[#3D1C3A] font-semibold transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Slideshow dot indicators */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center items-center gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-[#C9A86C] w-8 h-2" : "bg-[#F0E6D3] opacity-50 w-2 h-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll down arrow */}
        <div 
          className="absolute bottom-8 left-0 right-0 flex justify-center z-10 cursor-pointer text-[#C9A86C] animate-bounce"
          onClick={() => {
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
          }}
        >
          <ChevronDown size={36} />
        </div>
      </div>

      {/* Section 1: Quick Stats Bar */}
      <section className="w-full bg-[#3D1C3A] py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#6B3F68]">
          <div className="flex flex-col items-center py-4 sm:py-0">
            <span className="text-[#C9A86C] text-3xl font-bold mb-1">50+</span>
            <span className="text-[#F0E6D3] text-sm font-medium uppercase tracking-wider">Luxury Rooms</span>
          </div>
          <div className="flex flex-col items-center py-4 sm:py-0">
            <span className="text-[#C9A86C] text-3xl font-bold mb-1">5000+</span>
            <span className="text-[#F0E6D3] text-sm font-medium uppercase tracking-wider">Happy Guests</span>
          </div>
          <div className="flex flex-col items-center py-4 sm:py-0">
            <span className="text-[#C9A86C] text-3xl font-bold mb-1">4.9</span>
            <span className="text-[#F0E6D3] text-sm font-medium uppercase tracking-wider">Average Rating</span>
          </div>
          <div className="flex flex-col items-center py-4 sm:py-0">
            <span className="text-[#C9A86C] text-3xl font-bold mb-1">15+</span>
            <span className="text-[#F0E6D3] text-sm font-medium uppercase tracking-wider">Years of Excellence</span>
          </div>
        </div>
      </section>

      {/* Section 2: Welcome/About Snippet */}
      <section className="w-full bg-[#FAF7F2] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT column - text */}
          <div className="flex flex-col items-start space-y-6">
            <span className="tracking-widest text-sm text-[#C9A86C] font-semibold uppercase">
              OUR STORY
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3D1C3A] leading-tight">
              A Legacy of <br className="hidden md:block"/>
              <span className="italic font-serif text-[#C9A86C]">Luxury & Comfort</span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Kaelura Grand Hotel has been a beacon of luxury and elegance since its inception. Inspired by classical grandeur and modern sophistication, our hotel promises a transformative experience where every detail is meticulously planned to exceed your expectations.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Whether you are here for a romantic getaway, a corporate retreat, or simply a well-deserved escape, our world-class amenities and dedicated staff ensure your stay is absolutely unforgettable.
            </p>
            <Link 
              to="/about"
              className="border-2 border-[#C9A86C] text-[#3D1C3A] px-8 py-3 rounded-none hover:bg-[#C9A86C] hover:text-[#3D1C3A] font-semibold transition-colors mt-4 inline-block shadow-sm"
            >
              Discover Our Story
            </Link>
          </div>
          
          {/* RIGHT column - image */}
          <div className="relative w-full h-96">
            <div className="absolute inset-0 bg-[#C9A86C] translate-x-4 translate-y-4"></div>
            <img 
              src={aboutImg} 
              alt="About Kaelura Grand Hotel" 
              className="relative w-full h-full object-cover border-4 border-[#C9A86C] shadow-xl z-10"
            />
          </div>
        </div>
      </section>

      {/* Section 3: Features/Amenities */}
      <section className="w-full bg-[#3D1C3A] py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl font-bold text-[#F0E6D3] text-center">Our Amenities</h2>
          <div className="w-16 h-0.5 bg-[#C9A86C] mx-auto mt-2 mb-10"></div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 w-full">
            {[
              { icon: <BedDouble size={36}/>, name: "Luxury Rooms" },
              { icon: <UtensilsCrossed size={36}/>, name: "Fine Dining" },
              { icon: <Sparkles size={36}/>, name: "Spa & Wellness" },
              { icon: <Waves size={36}/>, name: "Infinity Pool" },
              { icon: <Wifi size={36}/>, name: "Free Wi-Fi" },
              { icon: <Car size={36}/>, name: "Valet Parking" }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-[#6B3F68] bg-opacity-40 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-transform hover:scale-105 duration-300"
              >
                <div className="text-[#C9A86C] mb-4">
                  {feature.icon}
                </div>
                <span className="text-[#F0E6D3] font-medium text-sm sm:text-base">
                  {feature.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Featured Rooms Preview */}
      <section className="w-full bg-[#FAF7F2] py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl font-bold text-[#3D1C3A] text-center">Our Finest Rooms</h2>
          <div className="w-16 h-0.5 bg-[#C9A86C] mx-auto mt-2 mb-4"></div>
          <p className="text-gray-500 text-center mb-12">
            Each room is thoughtfully curated to deliver a distinct atmosphere
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full mb-8">
            {[
              { title: "Deluxe Room", img: room1, price: "8,500", desc: "A spacious retreat featuring elegant decor, a premium bed, and panoramic city views for ultimate relaxation." },
              { title: "Executive Suite", img: room2, price: "15,000", desc: "Our signature suite offering a separate living area, luxurious bathroom amenities, and exclusive lounge access." },
              { title: "Presidential Villa", img: room3, price: "35,000", desc: "The epitome of grandeur. Expansive living spaces, a private terrace, and personalized butler service." }
            ].map((room, idx) => (
              <div key={idx} className="bg-white shadow-xl rounded-none flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <img src={room.img} alt={room.title} className="w-full h-52 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-[#3D1C3A] mb-2">{room.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{room.desc}</p>
                  <p className="text-[#C9A86C] font-semibold mb-6">From Rs. {room.price} / night</p>
                  <Link 
                    to="/rooms"
                    className="w-full bg-[#3D1C3A] text-[#C9A86C] py-3 text-center font-bold hover:bg-[#6B3F68] transition-colors mt-auto block"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-end">
            <Link to="/rooms" className="text-[#C9A86C] font-semibold hover:text-[#3D1C3A] transition-colors text-lg flex items-center">
              View All Rooms <span className="ml-2 font-bold">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Form Preserved separately */}
      <div className="w-full flex justify-center px-4 -mt-10 relative z-20 mb-16">
        <div className="border border-white/20 bg-[#FAF7F2] shadow-2xl h-auto w-full max-w-xl rounded-2xl p-8 flex flex-col space-y-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-[#3D1C3A] text-center">Plan Your Perfect Stay</h2>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="w-full text-left">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Check-in</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-[#C9A86C] rounded-xl focus:ring-2 focus:ring-[#C9A86C] focus:outline-none bg-gray-50"
              />
            </div>
            <div className="w-full text-left">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Check-out</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-[#C9A86C] rounded-xl focus:ring-2 focus:ring-[#C9A86C] focus:outline-none bg-gray-50"
              />
            </div>
          </div>
          <div className="w-full text-left">
             <label className="text-xs font-bold text-gray-500 uppercase ml-1">Category</label>
            <select
              className="w-full px-4 py-2 border border-[#C9A86C] rounded-xl focus:ring-2 focus:ring-[#C9A86C] focus:outline-none bg-gray-50 appearance-none"
            >
              <option value="">Any Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => navigate('/categories')}
            className="w-full bg-[#C9A86C] text-[#3D1C3A] py-3 px-4 rounded-xl font-bold hover:bg-[#b09156] shadow-lg shadow-[#C9A86C]/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            Search Available Rooms
          </button>
        </div>
      </div>

      {/* Featured Room Types */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl font-black text-[#3D1C3A] mb-4">Our Luxurious Spaces</h2>
            <div className="w-20 h-1.5 bg-[#C9A86C] rounded-full"></div>
            <p className="text-gray-600 mt-6 text-center max-w-2xl">
                Experience the height of comfort and elegance. Each of our room categories is designed to offer a unique blend of style and functional luxury.
            </p>
        </div>

        {loading ? (
                 <div className="w-full flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-[#C9A86C] border-t-transparent rounded-full animate-spin"></div>
            </div>
        ) : error ? (
            <div className="text-center text-red-600 font-semibold p-8 bg-red-50 rounded-2xl">{error}</div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {categories.slice(0, 3).map((cat) => (
                    <div key={cat._id} className="group bg-[#FAF7F2] rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-500 transform hover:-translate-y-2 border border-gray-100">
                        <div className="relative h-64 overflow-hidden">
                            <img src={cat.image} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt={cat.name} />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full shadow-sm font-bold text-[#3D1C3A] text-sm">
                                From Rs. {cat.price}
                            </div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-[#3D1C3A] mb-3">{cat.name}</h3>
                            <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">{cat.description}</p>
                            <button 
                                onClick={() => navigate('/rooms/' + cat.name)}
                                className="w-full py-3 bg-[#C9A86C] text-[#3D1C3A] rounded-xl font-bold hover:bg-[#3D1C3A] hover:text-[#C9A86C] transition duration-300"
                            >
                                Exploring Rooms
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </section>

      {/* Media Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col items-center mb-16">
                <h2 className="text-4xl font-black text-[#3D1C3A] mb-4">Visual Tour</h2>
                <div className="w-20 h-1.5 bg-[#C9A86C] rounded-full"></div>
            </div>

            {loading ? (
                 <div className="w-full flex justify-center items-center py-20">
                    <div className="w-12 h-12 border-4 border-[#C9A86C] border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                    {gallery.map((item) => (
                        <div key={item._id} className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-md">
                            <img src={item.image} alt={item.name} className="w-full h-auto object-cover transition duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                                <div>
                                    <h4 className="text-white font-bold text-lg">{item.name}</h4>
                                    <p className="text-white/80 text-xs mt-1">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </section>

      {/* Footer Placeholder for visual completeness */}
      <footer className="bg-[#3D1C3A] text-white py-12 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
              <div className="mb-8 md:mb-0">
                  <h2 className="text-2xl font-bold text-[#C9A86C]"> Kaelura Grand Hotel</h2>
                  <p className="text-[#F0E6D3] mt-2 text-sm">Luxury redefined at every step.</p>
              </div>
              <div className="flex space-x-6 text-sm font-medium text-[#F0E6D3]">
                  <a href="#" className="hover:text-[#C9A86C] transition">About</a>
                  <a href="#" className="hover:text-[#C9A86C] transition">Contact</a>
                  <a href="#" className="hover:text-[#C9A86C] transition">Booking Terms</a>
              </div>
          </div>
          <div className="max-w-7xl mx-auto border-t border-[#6B3F68] mt-8 pt-8 text-center text-[#F0E6D3] opacity-60 text-xs">
              &copy; 2024 Kaelura Grand Hotel. All rights reserved.
          </div>
      </footer>
    </div>
  );
}
