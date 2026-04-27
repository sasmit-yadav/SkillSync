import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import axios from "../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    skills: 0,
    endorsements: 0,
    projects: 0,
    connections: 0
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData) {
          navigate("/login");
          return;
        }
        
        // Fetch updated user data from backend
        const response = await axios.get(`/auth/profile/${userData.id}`);
        setUser(response.data);
        
        // Calculate stats
        setStats({
          skills: response.data.skills?.length || 0,
          endorsements: response.data.endorsements?.length || 0,
          projects: 0, // Will be implemented later
          connections: 0 // Will be implemented later
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#10101a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#18181b] border border-blue-500/40 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-2xl">
            <img src={logo} alt="SkillSync Logo" className="w-12 h-12 object-contain animate-pulse" />
          </div>
          <p className="text-blue-400 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#10101a] text-white">
      {/* Navigation Header */}
      <nav className="w-full bg-[#18122B]/80 backdrop-blur-xl border-b border-blue-500/20 sticky top-0 z-50">
        <div className="w-full px-4 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#18181b] border border-blue-500/40 rounded-xl flex items-center justify-center shadow-lg hover:border-blue-400/80 hover:shadow-blue-500/20 hover:scale-110 transition-all duration-300 cursor-pointer group">
                <img src={logo} alt="SkillSync Logo" className="w-8 h-8 object-contain group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-xl font-bold text-blue-400">SkillSync</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-blue-400 hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="px-4 py-2 text-blue-400 hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="w-full px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="text-white">{getGreeting()}, </span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {user?.fullName?.split(' ')[0]}!
              </span>
            </h1>
            <p className="text-gray-300 text-lg">Ready to connect, collaborate, and create today?</p>
          </motion.div>

          {/* Quick Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {/* Skills Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/10 hover:border-blue-500/40 transition-all duration-300 shadow-xl hover:shadow-blue-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-blue-400">{stats.skills}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Skills</h3>
              <p className="text-gray-400 text-sm">Technologies you've mastered</p>
            </div>

            {/* Endorsements Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/10 hover:border-blue-500/40 transition-all duration-300 shadow-xl hover:shadow-blue-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-green-400">{stats.endorsements}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Endorsements</h3>
              <p className="text-gray-400 text-sm">Community recognition</p>
            </div>

            {/* Projects Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/10 hover:border-blue-500/40 transition-all duration-300 shadow-xl hover:shadow-blue-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-purple-400">{stats.projects}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Projects</h3>
              <p className="text-gray-400 text-sm">Active collaborations</p>
            </div>

            {/* Connections Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/10 hover:border-blue-500/40 transition-all duration-300 shadow-xl hover:shadow-blue-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-orange-400">{stats.connections}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Connections</h3>
              <p className="text-gray-400 text-sm">Network size</p>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {/* Edit Profile */}
            <Link to="/profile/edit" className="group">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/10 hover:border-blue-500/40 transition-all duration-300 shadow-xl hover:shadow-blue-500/10 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Edit Profile</h3>
                <p className="text-gray-400 text-sm mb-4">Update your skills, bio, and social links</p>
                <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                  <span className="text-sm font-medium">Get started</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Find Collaborators */}
            <Link to="/collaborators" className="group">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/10 hover:border-blue-500/40 transition-all duration-300 shadow-xl hover:shadow-blue-500/10 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Find Collaborators</h3>
                <p className="text-gray-400 text-sm mb-4">Discover developers with matching skills</p>
                <div className="flex items-center text-green-400 group-hover:text-green-300 transition-colors duration-300">
                  <span className="text-sm font-medium">Explore now</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Create Project */}
            <div className="group">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/10 hover:border-blue-500/40 transition-all duration-300 shadow-xl hover:shadow-blue-500/10 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Create Project</h3>
                <p className="text-gray-400 text-sm mb-4">Start a new collaboration</p>
                <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                  <span className="text-sm font-medium">Coming soon</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/10"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
            
            {user?.endorsements?.length > 0 ? (
              <div className="space-y-4">
                {user.endorsements.slice(0, 3).map((endorsement, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-blue-500/10">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">New endorsement for <span className="text-blue-400">{endorsement.skill}</span></p>
                      <p className="text-gray-400 text-sm">{new Date(endorsement.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-400 mb-2">No recent activity</p>
                <p className="text-gray-500 text-sm">Start by updating your profile or connecting with others</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 