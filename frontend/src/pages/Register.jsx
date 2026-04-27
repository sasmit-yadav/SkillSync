import React, { useState } from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.jpg";
import logo from "../assets/logo.png";
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", formData);
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert((err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="w-full min-h-screen text-white flex overflow-hidden bg-[#10101a]">
      {/* Left Hero Panel */}
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

      {/* Right Register Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-[#18181b] border border-blue-500/40 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl p-2 hover:border-blue-400/80 hover:shadow-blue-500/20 hover:scale-110 transition-all duration-300 cursor-pointer group">
              <img src={logo} alt="SkillSync Logo" className="w-20 h-20 object-contain group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-white">Create Your Account</h2>
            <p className="text-gray-400 mb-8">Connect with the future of tech collaboration.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
              />
            </div>
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
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0064d2] to-[#1cb0f6] text-white font-bold border border-[#1cb0f6] shadow-lg transition-all duration-300 transform hover:from-[#1cb0f6] hover:to-[#63d0ff] hover:border-[#fa71cd] hover:ring-2 hover:ring-[#1cb0f6]/40 hover:shadow-xl active:scale-95"
            >
              Create Account
            </button>

            <div className="text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

