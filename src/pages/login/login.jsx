import { useState, useEffect } from "react";
import axios from "axios";
import "./login.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("Environment variables:", import.meta.env);
    }, []);

    async function handleLogin() {
        try {
            setIsLoading(true);
            setError("");
            
            const backendUrl = import.meta.env.VITE_BACKEND_URL ;
            console.log("Using backend URL:", backendUrl);

            const response = await axios.post(`${backendUrl}/api/users/login`, {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);

            
            const redirectPath = response.data.user.type === "admin" ? "/admin" : "/";
            window.location.href = redirectPath;

        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid email or password");
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

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-[#FAF7F2] px-6 py-12 lg:px-24">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-[#3D1C3A] mb-2">Welcome Back</h2>
                        <p className="text-gray-500">Please sign in to continue</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        <div>
                            <label className="block text-[#3D1C3A] mb-2 text-sm font-semibold">Email Address</label>
                            <input 
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A86C] focus:border-transparent transition duration-300"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-[#3D1C3A] mb-2 text-sm font-semibold">Password</label>
                            <input 
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A86C] focus:border-transparent transition duration-300"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button 
                            className={`w-full py-4 rounded-lg font-bold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg
                                ${isLoading 
                                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                                    : 'bg-[#3D1C3A] text-[#C9A86C] hover:bg-[#2A1328] transform hover:-translate-y-0.5'
                                }`}
                            onClick={handleLogin}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>

                    <div className="text-center mt-6 space-y-4">
                        <p className="text-sm text-gray-600">
                            Don't have an account? <a href="/register" className="text-[#C9A86C] font-semibold hover:underline">Register</a>
                        </p>
                        <p className="text-sm text-gray-400">
                            Please contact reception to reset your password.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}