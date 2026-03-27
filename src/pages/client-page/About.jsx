import Header from "../../components/header/header.jsx";
import Footer from "../../components/footer/Footer.jsx";

export default function About() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="max-w-3xl text-center bg-white shadow-xl rounded-2xl p-12 border border-gray-100">
          <span className="tracking-widest text-sm text-[#C9A86C] font-semibold uppercase">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#3D1C3A] leading-tight mt-2 mb-6">
            About <span className="italic font-serif text-[#C9A86C]">Kaelura Grand Hotel</span>
          </h1>
          <p className="text-gray-600 leading-relaxed text-lg mb-6">
            Kaelura Grand Hotel has been a beacon of luxury and elegance since its inception. Inspired by classical grandeur and modern sophistication, our hotel promises a transformative experience where every detail is meticulously planned to exceed your expectations.
          </p>
          <div className="w-16 h-0.5 bg-[#C9A86C] mx-auto mt-6 mb-8"></div>
          <p className="text-gray-500 italic">More details coming soon.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
