"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password === "admin890123") {
      
      router.push("/admin/dashboard");
    } else {
      alert("Incorrect Password!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-600 via-black to-gray-500">
      <div className="w-full max-w-lg p-8 bg-white shadow-xl rounded-xl transform transition-all duration-300 hover:scale-105">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <div className="absolute right-3 top-3 text-gray-500 cursor-pointer">🔒</div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-gray-400 to-black text-white font-semibold rounded-md hover:bg-black transition-all duration-300"
          >
            Login
          </button>

          <div className="text-center mt-4 text-gray-600">
            <span className="text-sm">Forgot your password?</span>
            <a href="#" className="text-sm font-medium text-blue-500 hover:underline ml-1">
              Reset it
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
