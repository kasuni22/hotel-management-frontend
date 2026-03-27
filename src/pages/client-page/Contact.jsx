import Header from "../../components/header/header.jsx";
import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus('sending...');
      // Ensure the endpoint hits the actual backend /api/feedback
      await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/feedback', formData);
      setStatus('Feedback sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Failed to send feedback.');
    }
  };

  return (
    <div className="min-h-screen bg-[#3D1C3A] flex flex-col pt-10">
      <Header />
      <div className="flex-grow flex items-center justify-center p-8 mt-10">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#6B3F68] bg-opacity-40 rounded-2xl p-8 lg:p-12 shadow-2xl border border-[#6B3F68]">
          <div className="flex flex-col text-left justify-center">
            <span className="tracking-widest text-sm text-[#C9A86C] font-semibold uppercase">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F0E6D3] leading-tight mt-2 mb-6">
              Contact <span className="italic font-serif text-[#C9A86C]">Us</span>
            </h1>
            <p className="text-[#F0E6D3] opacity-80 leading-relaxed text-lg mb-8">
              Our dedicated team is ready to assist you. Your exceptional experience begins before you even arrive.
            </p>
            <div className="flex flex-col space-y-4 text-left w-full mt-auto">
               <div className="bg-[#FAF7F2] p-4 rounded-xl shadow-lg border-l-4 border-[#C9A86C]">
                   <p className="text-[#3D1C3A] font-bold">Address</p>
                   <p className="text-gray-600 font-medium">123 Luxury Avenue, Colombo</p>
               </div>
               <div className="bg-[#FAF7F2] p-4 rounded-xl shadow-lg border-l-4 border-[#C9A86C]">
                   <p className="text-[#3D1C3A] font-bold">Phone</p>
                   <p className="text-gray-600 font-medium">+94 112 345 678</p>
               </div>
               <div className="bg-[#FAF7F2] p-4 rounded-xl shadow-lg border-l-4 border-[#C9A86C]">
                   <p className="text-[#3D1C3A] font-bold">Email</p>
                   <p className="text-gray-600 font-medium">reservations@kaeluragrand.com</p>
               </div>
            </div>
          </div>
          
          <div className="flex flex-col bg-[#FAF7F2] p-8 rounded-xl shadow-xl">
             <h2 className="text-2xl font-bold text-[#3D1C3A] mb-6">Send Feedback</h2>
             <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div>
                   <label className="text-sm font-bold text-gray-600 uppercase">Name</label>
                   <input 
                     type="text" 
                     className="w-full px-4 py-3 bg-white border border-[#C9A86C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A86C]" 
                     placeholder="Your Name" 
                     required
                     value={formData.name}
                     onChange={(e)=>setFormData({...formData, name: e.target.value})}
                   />
                </div>
                <div>
                   <label className="text-sm font-bold text-gray-600 uppercase">Email</label>
                   <input 
                     type="email" 
                     className="w-full px-4 py-3 bg-white border border-[#C9A86C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A86C]" 
                     placeholder="Your Email" 
                     required
                     value={formData.email}
                     onChange={(e)=>setFormData({...formData, email: e.target.value})}
                   />
                </div>
                <div>
                   <label className="text-sm font-bold text-gray-600 uppercase">Message</label>
                   <textarea 
                     rows="4"
                     className="w-full px-4 py-3 bg-white border border-[#C9A86C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A86C]" 
                     placeholder="Your Feedback or Inquiry" 
                     required
                     value={formData.message}
                     onChange={(e)=>setFormData({...formData, message: e.target.value})}
                   ></textarea>
                </div>
                <button type="submit" className="w-full bg-[#C9A86C] text-[#3D1C3A] font-bold py-3 rounded-xl hover:bg-[#b09156] transition-colors shadow-lg">
                  Submit Feedback
                </button>
                {status && <p className={`mt-2 font-medium ${status.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{status}</p>}
             </form>
          </div>
        </div>
      </div>
    </div>
  );
}
