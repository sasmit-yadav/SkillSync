// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImg from "../assets/hero.jpg";
import logo from "../assets/logo.png";
import axios from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", formData);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen text-white flex overflow-hidden bg-[#10101a]">
      {/* Left Panel with Hero Image */}
      <div className="relative hidden md:block w-1/2 h-full">
        <img
          src={heroImg}
          alt="SkillSync Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-[#111111]/80 to-black/70" />
        <div className="absolute top-10 left-10 z-10">
          <div className="bg-gradient-to-br from-[#1a1a1a]/90 to-[#23272f]/90 backdrop-blur-xl rounded-2xl px-8 py-6 shadow-2xl border border-blue-500/30 hover:border-blue-400/60 hover:shadow-blue-500/20 transition-all duration-300">
            <h1 className="text-white text-3xl font-bold tracking-wide drop-shadow-md">
              Welcome to <span className="text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer">SkillSync</span>
            </h1>
            <h2 className="text-gray-200 text-lg mt-1 italic">
              Where <span className="text-blue-400">skills</span> meet <span className="text-blue-400">synergy</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-[#18181b] border border-blue-500/40 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl p-2 hover:border-blue-400/80 hover:shadow-blue-500/20 hover:scale-110 transition-all duration-300 cursor-pointer group">
              <img src={logo} alt="SkillSync Logo" className="w-20 h-20 object-contain group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-white">Sign in to SkillSync</h2>
            <p className="text-gray-400 mb-8">Connect, collaborate, and unlock your next opportunity.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-300">
                <input type="checkbox" className="form-checkbox accent-blue-500" />
                <span>Remember me</span>
              </label>
              <Link to="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0064d2] to-[#1cb0f6] text-white font-bold border border-[#1cb0f6] shadow-lg transition-all duration-300 transform hover:from-[#1cb0f6] hover:to-[#63d0ff] hover:border-[#fa71cd] hover:ring-2 hover:ring-[#1cb0f6]/40 hover:shadow-xl active:scale-95"
            >
              Sign In
            </button>

            <div className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                Sign up
              </Link>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#111111] text-gray-400">or continue with</span>
            </div>
          </div>

          <div className="text-center">
            <a
              href="http://localhost:5000/auth/google"
              className="inline-flex items-center justify-center w-full py-4 rounded-xl border border-gray-700 text-white hover:bg-[#1a1a1a] transition-all duration-300 hover:border-blue-500/50"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M533.5 278.4c0-17.7-1.6-35.2-4.7-52H272v98.7h146.9c-6.4 34.7-25.1 64.1-53.6 83.8v69.4h86.7c50.7-46.7 81.5-115.5 81.5-199.9z"
                  fill="#4285f4"
                />
                <path
                  d="M272 544.3c72.6 0 133.6-23.8 178.2-64.6l-86.7-69.4c-24 16.1-54.7 25.6-91.5 25.6-70.4 0-130.2-47.6-151.5-111.4H29.7v70.3C74.2 474.1 167.7 544.3 272 544.3z"
                  fill="#34a853"
                />
                <path
                  d="M120.5 324.5c-10-29.4-10-61.1 0-90.5V163.7H29.7c-39.7 78.9-39.7 172.5 0 251.3l90.8-70.5z"
                  fill="#fbbc04"
                />
                <path
                  d="M272 107.1c39.4-.6 77.2 13.7 106 39.6l79.4-79.4C409.3 25 342.2-.2 272 0 167.7 0 74.2 70.2 29.7 163.7l90.8 70.3c21.3-63.8 81.1-111.4 151.5-111.4z"
                  fill="#ea4335"
                />
              </svg>
              Continue with Google
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
