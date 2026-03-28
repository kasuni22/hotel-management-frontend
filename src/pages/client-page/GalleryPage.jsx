import { useState, useEffect } from 'react';
import axios from 'axios';
import { ImageIcon, Crown, Sparkles, BedDouble } from 'lucide-react';
import Header from "../../components/header/header.jsx";
import Footer from "../../components/footer/Footer.jsx";
const heroImg = "https://res.cloudinary.com/dgdpuo8og/image/upload/v1774677868/hero1_tbv430.jpg";

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fallbackImage = "https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?q=80&w=1000&auto=format&fit=crop";

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/gallery");
        setGalleryItems(response?.data?.list || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load gallery:", err);
        setError("Failed to load gallery items.");
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans selection:bg-[#C9A86C] selection:text-[#3D1C3A]">
      <Header />

      {/* Hero Banner */}
      <div className="relative h-[55vh] md:h-[65vh] w-full flex flex-col items-center justify-center mt-16 md:mt-0 shadow-2xl">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img src={heroImg} alt="Kaelura Grand Hotel" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#3D1C3A]/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#3D1C3A]/80 via-[#3D1C3A]/40 to-[#FAF7F2]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center px-4 text-center mt-12 md:mt-20">
          <span className="text-[#C9A86C] tracking-[0.3em] text-xs sm:text-sm font-bold mb-4 uppercase drop-shadow-md">OUR GALLERY</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-xl">
            A Journey Through <span className="italic font-serif text-[#C9A86C]">Luxury</span>
          </h1>
          <p className="text-[#F0E6D3] max-w-2xl text-lg md:text-xl font-light mb-10 drop-shadow-md">
            Immerse yourself in the timeless elegance and unparalleled beauty of our world-class estate.
          </p>
          <div className="text-[#C9A86C] text-sm font-medium tracking-widest uppercase flex items-center gap-3">
            <span className="hover:text-white transition-colors cursor-pointer">Home</span>
            <span className="text-[#F0E6D3]/40 text-lg leading-none">&gt;</span>
            <span className="text-white">Gallery</span>
          </div>
        </div>
      </div>

      {/* Featured Highlight Section */}
      <div className="w-full px-6 relative z-20 -mt-16 md:-mt-24 mb-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col items-center text-center transform transition duration-500 hover:-translate-y-2 border border-[#F0E6D3]/60 group">
            <div className="bg-[#FAF7F2] p-4 rounded-full mb-6 group-hover:bg-[#3D1C3A] transition-colors duration-500">
              <Crown className="text-[#C9A86C] w-8 h-8 md:w-10 md:h-10 transition-colors duration-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-[#3D1C3A] text-xl font-bold mb-3 font-serif">Luxury Interiors</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-light">Meticulously designed spaces that blend classical grandeur with contemporary comfort.</p>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col items-center text-center transform transition duration-500 hover:-translate-y-2 border border-[#F0E6D3]/60 group">
            <div className="bg-[#FAF7F2] p-4 rounded-full mb-6 group-hover:bg-[#3D1C3A] transition-colors duration-500">
              <BedDouble className="text-[#C9A86C] w-8 h-8 md:w-10 md:h-10 transition-colors duration-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-[#3D1C3A] text-xl font-bold mb-3 font-serif">Elegant Suites</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-light">Sanctuaries of peace featuring panoramic views and bespoke premium furnishings.</p>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col items-center text-center transform transition duration-500 hover:-translate-y-2 border border-[#F0E6D3]/60 group">
            <div className="bg-[#FAF7F2] p-4 rounded-full mb-6 group-hover:bg-[#3D1C3A] transition-colors duration-500">
              <Sparkles className="text-[#C9A86C] w-8 h-8 md:w-10 md:h-10 transition-colors duration-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-[#3D1C3A] text-xl font-bold mb-3 font-serif">World-Class Ambience</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-light">An atmosphere crafted to inspire awe, relaxation, and unforgettable lasting memories.</p>
          </div>
        </div>
      </div>

      {/* Intro Text Section */}
      <div className="py-12 md:py-20 px-6 text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#C9A86C] to-transparent"></div>
        </div>
        <p className="text-[#6B3F68] text-xl md:text-3xl font-serif italic leading-relaxed px-4 md:px-10">
          "Explore the refined beauty, comfort, and atmosphere of our hotel through a curated visual journey."
        </p>
      </div>

      {/* Gallery Content */}
      <div className="px-6 pb-32 flex-grow max-w-[90rem] mx-auto w-full">
        {loading ? (
          <div className="flex justify-center items-center py-32">
             <div className="w-16 h-16 border-4 border border-[#F0E6D3] border-t-[#C9A86C] rounded-full animate-spin drop-shadow-md"></div>
          </div>
        ) : error ? (
           <div className="text-center py-24 flex flex-col items-center justify-center animate-fade-in bg-white p-12 rounded-3xl shadow-sm border border-[#F0E6D3] max-w-2xl mx-auto">
             <div className="bg-[#FAF7F2] p-6 rounded-full mb-6">
                <ImageIcon size={48} className="text-[#C9A86C]" strokeWidth={1.5} />
             </div>
             <h2 className="text-2xl font-bold text-[#3D1C3A] mb-3 font-serif">Collection Unavailable</h2>
             <p className="text-gray-500 font-light max-w-md mx-auto">{error}</p>
           </div>
        ) : galleryItems.length === 0 ? (
           <div className="text-center py-24 flex flex-col items-center justify-center animate-fade-in bg-white p-12 rounded-3xl shadow-sm border border-[#F0E6D3] max-w-2xl mx-auto">
             <div className="bg-[#FAF7F2] p-6 rounded-full mb-6">
                <ImageIcon size={48} className="text-[#C9A86C]" strokeWidth={1.5} />
             </div>
             <h2 className="text-3xl font-bold text-[#3D1C3A] mb-3 font-serif">Awaiting Elegance</h2>
             <p className="text-gray-500 font-light max-w-md mx-auto text-lg pt-2">Check back soon for a beautiful visual journey documenting our luxury estates.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10 animate-fade-in">
             {galleryItems.map((item, idx) => {
               const imageSrc = item.image || fallbackImage;
               const title = item.name || "Refined Beauty";
               const desc = item.description || "Experience our elegant spaces and unmatched comfort.";

               return (
                 <div 
                   key={item._id || idx}
                   onClick={() => setSelectedImage({imageSrc, title, desc})}
                   className="group relative h-80 sm:h-96 w-full overflow-hidden rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer bg-gray-100 transition-all duration-500 hover:shadow-[0_20px_40px_rgb(61,28,58,0.15)] hover:-translate-y-2"
                 >
                   <img 
                     src={imageSrc}
                     alt={title}
                     onError={(e) => { e.target.src = fallbackImage; }}
                     className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#3D1C3A]/95 via-[#3D1C3A]/40 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500"></div>
                   
                   <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                       <div className="w-10 h-[3px] bg-[#C9A86C] mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 shadow-sm"></div>
                       <h3 className="text-white font-serif font-bold text-2xl mb-2 tracking-wide drop-shadow-md">{title}</h3>
                       <p className="text-[#F0E6D3] text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-2 leading-relaxed">{desc}</p>
                   </div>
                 </div>
               )
             })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3D1C3A]/95 p-4 sm:p-8 animate-fade-in backdrop-blur-xl"
             onClick={() => setSelectedImage(null)}
        >
           <button 
             onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
             className="absolute top-6 right-6 md:top-10 md:right-10 text-[#F0E6D3] hover:text-[#C9A86C] transition-colors duration-300 z-10 bg-[#6B3F68]/40 rounded-full p-2.5 hover:bg-[#6B3F68]/80 shadow-lg"
             aria-label="Close modal"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
           
           <div 
             className="bg-[#FAF7F2] max-w-6xl w-full shadow-2xl relative flex flex-col lg:flex-row overflow-hidden rounded-3xl cursor-default"
             onClick={(e) => e.stopPropagation()}
           >
              <div className="w-full lg:w-3/5 xl:w-2/3 h-[45vh] sm:h-[55vh] lg:h-[80vh] bg-[#1a0c18] relative">
                <img 
                  src={selectedImage.imageSrc} 
                  alt={selectedImage.title}
                  onError={(e) => { e.target.src = fallbackImage; }}
                  className="w-full h-full object-cover lg:object-cover"
                />
              </div>
              <div className="w-full lg:w-2/5 xl:w-1/3 p-8 lg:p-12 xl:p-16 flex flex-col justify-center bg-white border-l border-[#F0E6D3]">
                 <span className="text-[#C9A86C] tracking-[0.2em] text-xs font-bold uppercase mb-4 md:mb-6">Gallery Collection</span>
                 <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#3D1C3A] mb-6 font-serif leading-tight">
                   {selectedImage.title}
                 </h3>
                 <div className="w-12 h-1 bg-[#C9A86C] mb-6 md:mb-8 rounded-full"></div>
                 <p className="text-gray-500 leading-loose text-base md:text-lg font-light">
                   {selectedImage.desc}
                 </p>
                 <div className="mt-12 flex items-center justify-between border-t border-[#F0E6D3] pt-6">
                    <span className="text-[#3D1C3A] font-medium text-sm">Kaelura Grand Hotel</span>
                    <Sparkles className="text-[#C9A86C] w-5 h-5" />
                 </div>
              </div>
           </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
