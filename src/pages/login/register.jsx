import { useState } from "react";
import axios from "axios";
import "./login.css";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        whatsApp: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function handleRegister() {
        try {
            setIsLoading(true);
            setError("");
            setSuccess("");

            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            await axios.post(`${backendUrl}/api/users/`, formData);

            setSuccess("Registration successful! Please log in.");
        } catch (err) {
            console.error("Registration error:", err);
            setError("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex w-full min-h-screen">
            {/* Left side - Hidden on mobile, takes 1/2 of screen on desktop */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#3D1C3A] flex-col justify-center items-center overflow-hidden">
                {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://res.cloudinary.com/dgdpuo8og/image/upload/v1774677886/hero2_uavntd.jpg')" }}
                ></div>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60"></div>
                
                {/* Content */}
                <div className="relative z-10 text-center p-8">
                    <h1 className="text-5xl font-bold text-[#C9A86C] mb-4 drop-shadow-lg">Kaelura Grand Hotel</h1>
                    <p className="text-xl text-gray-200 tracking-wide font-light">A Sanctuary of Timeless Elegance</p>
                </div>
            </div>

            {/* Right side - Register Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-[#FAF7F2] px-6 py-12 lg:px-24">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-[#3D1C3A] mb-2">Join Our Family</h2>
                        <p className="text-gray-500">Sign up to experience luxury</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-center">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg text-center">
                            {success}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className="block text-[#3D1C3A] mb-1 text-sm font-semibold">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A86C] focus:border-transparent transition duration-300"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-[#3D1C3A] mb-1 text-sm font-semibold">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A86C] focus:border-transparent transition duration-300"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[#3D1C3A] mb-1 text-sm font-semibold">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A86C] focus:border-transparent transition duration-300"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-[#3D1C3A] mb-1 text-sm font-semibold">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A86C] focus:border-transparent transition duration-300"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className="block text-[#3D1C3A] mb-1 text-sm font-semibold">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A86C] focus:border-transparent transition duration-300"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-[#3D1C3A] mb-1 text-sm font-semibold">WhatsApp</label>
                                <input
                                    type="text"
                                    name="whatsApp"
                                    placeholder="WhatsApp"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A86C] focus:border-transparent transition duration-300"
                                    value={formData.whatsApp}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            className={`w-full py-4 rounded-lg font-bold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg ${
                                isLoading
                                    ? "bg-gray-400 cursor-not-allowed text-white"
                                    : "bg-[#3D1C3A] text-[#C9A86C] hover:bg-[#2A1328] transform hover:-translate-y-0.5"
                            }`}
                            onClick={handleRegister}
                            disabled={isLoading}
                        >
                            {isLoading ? "Registering..." : "Sign Up"}
                        </button>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Already have an account? <a href="/login" className="text-[#C9A86C] font-semibold hover:underline">Sign In</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
