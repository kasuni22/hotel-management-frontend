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

            const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

            await axios.post(`${backendUrl}/api/users/register`, formData);

            setSuccess("Registration successful! Please log in.");
        } catch (err) {
            console.error("Registration error:", err);
            setError("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-900 via-black to-purple-900 flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-white/10 rounded-2xl shadow-2xl p-8 space-y-6 transform transition duration-500 hover:scale-[1.02]">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-gray-300">Sign up to get started</p>
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
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Enter your first name"
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Enter your last name"
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">WhatsApp</label>
                        <input
                            type="text"
                            name="whatsApp"
                            placeholder="Enter your WhatsApp number"
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                            value={formData.whatsApp}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        className={`w-full py-4 rounded-lg font-bold text-white transition-all duration-300 ${
                            isLoading
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transform hover:-translate-y-0.5"
                        }`}
                        onClick={handleRegister}
                        disabled={isLoading}
                    >
                        {isLoading ? "Registering..." : "Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
}
