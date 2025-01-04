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
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-900 via-black to-purple-900 flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-white/10 rounded-2xl shadow-2xl p-8 space-y-6 transform transition duration-500 hover:scale-[1.02]">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-300">Please sign in to continue</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Email Address</label>
                        <input 
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 text-sm">Password</label>
                        <input 
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 bg-white/5 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <button 
                        className={`w-full py-4 rounded-lg font-bold text-white transition-all duration-300
                            ${isLoading 
                                ? 'bg-gray-600 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transform hover:-translate-y-0.5'
                            }`}
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </div>

                <div className="text-center mt-6">
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition duration-300">
                        Forgot your password?
                    </a>
                </div>
            </div>
        </div>
    );
}