import { useState, useEffect } from "react";
import axios from "axios";
import "./login.css";

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        // Debug: Log all environment variables that start with VITE_
        console.log("Environment variables:", import.meta.env);
    }, []);

    function handleLogin() {
        // Hardcoded fallback URL for development
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
        console.log("Using backend URL:", backendUrl); // Debug log

        axios.post(`${backendUrl}/api/users/login`, {
            email: email,
            password: password
        })
        .then((res) => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token);

            if (res.data.user.type === "admin") {
                window.location.href = "/admin";
            } else {
                window.location.href = "/";
            }
        })
        .catch((err) => {
            console.error("Login error:", err);
            setError("Invalid email or password");
        });
    }

    return (
        <div className="w-full h-[100vh] pic-bg flex justify-center items-center">
            <div className="w-[400px] h-[400px] backdrop-blur-md rounded-lg flex flex-col items-center justify-center relative">
                <h1 className="text-3xl p-[15px] text-white absolute top-[40px] text-center">Login</h1>

                {error && (
                    <div className="text-red-500 mb-4 text-center px-4">
                        {error}
                    </div>
                )}

                <input 
                    type="text" 
                    placeholder="Enter your email address"
                    className="w-[80%] bg-[#00000000] border-[2px] border-[#f7f8e2] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />

                <input 
                    type="password" 
                    placeholder="Enter your password"
                    className="w-[80%] bg-[#00000000] border-[2px] border-[#f7f8e2] text-white placeholder:text-white h-[50px] px-[5px]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <button 
                    className="w-[80%] absolute bottom-[40px] bg-red-500 text-white h-[50px]"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
}