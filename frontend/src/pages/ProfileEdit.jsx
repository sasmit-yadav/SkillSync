import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../api/axios";
import logo from "../assets/logo.png";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    github: "",
    linkedin: "",
    portfolio: "",
    skills: []
  });
  const [newSkill, setNewSkill] = useState("");
  const [availableSkills] = useState([
    "JavaScript", "Python", "React", "Node.js", "TypeScript", "Java", "C++", "C#", "PHP", "Ruby",
    "Go", "Rust", "Swift", "Kotlin", "Dart", "Flutter", "React Native", "Vue.js", "Angular", "Svelte",
    "Next.js", "Nuxt.js", "Express.js", "Django", "Flask", "FastAPI", "Spring Boot", "Laravel", "ASP.NET",
    "MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes",
    "Git", "CI/CD", "DevOps", "Machine Learning", "Data Science", "AI", "Blockchain", "Web3", "UI/UX", "Graphic Design",
    "Mobile Development", "Game Development", "Cybersecurity", "Cloud Computing", "System Design", "Microservices",
    "REST APIs", "GraphQL", "WebSocket", "Testing", "Agile", "Scrum", "Product Management", "Technical Writing"
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`/auth/profile/${userData.id}`);
        setUser(response.data);
        setFormData({
          fullName: response.data.fullName || "",
          bio: response.data.bio || "",
          github: response.data.github || "",
          linkedin: response.data.linkedin || "",
          portfolio: response.data.portfolio || "",
          skills: response.data.skills || []
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const response = await axios.put(`/auth/profile/${userData.id}`, formData);
      
      // Update localStorage with new user data
      localStorage.setItem("user", JSON.stringify(response.data));
      
      // Show success message
      alert("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#10101a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#18181b] border border-blue-500/40 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-2xl">
            <img src={logo} alt="SkillSync Logo" className="w-12 h-12 object-contain animate-pulse" />
          </div>
          <p className="text-blue-400 text-lg">Loading your profile...</p>
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
              <Link to="/dashboard" className="w-10 h-10 bg-[#18181b] border border-blue-500/40 rounded-xl flex items-center justify-center shadow-lg hover:border-blue-400/80 hover:shadow-blue-500/20 hover:scale-110 transition-all duration-300 cursor-pointer group">
                <img src={logo} alt="SkillSync Logo" className="w-8 h-8 object-contain group-hover:scale-105 transition-transform duration-300" />
              </Link>
              <span className="text-xl font-bold text-blue-400">SkillSync</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="px-4 py-2 text-blue-400 hover:text-white transition-colors duration-300">
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-white">Edit Your </span>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Profile
                </span>
              </h1>
              <p className="text-gray-300 text-lg">Showcase your skills and connect with the community</p>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/10">
                <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-xl bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full p-4 rounded-xl bg-[#1a1a1a] text-gray-500 border border-gray-700 cursor-not-allowed"
                      placeholder="Email (cannot be changed)"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Bio <span className="text-gray-500">({formData.bio.length}/500 characters)</span>
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    maxLength={500}
                    rows={4}
                    className="w-full p-4 rounded-xl bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 resize-none"
                    placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/10">
                <h2 className="text-2xl font-bold text-white mb-6">Social Links</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">GitHub Profile</label>
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-xl bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">LinkedIn Profile</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-xl bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                      placeholder="https://linkedin.com/in/yourusername"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Portfolio Website</label>
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-xl bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/10">
                <h2 className="text-2xl font-bold text-white mb-6">Skills & Technologies</h2>
                
                <div className="space-y-6">
                  {/* Add New Skill */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Add New Skill</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        className="flex-1 p-4 rounded-xl bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                        placeholder="Enter a skill or technology"
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-300"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Current Skills */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Your Skills ({formData.skills.length})
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-blue-600/20 text-blue-300 border border-blue-500/30"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-blue-400 hover:text-red-400 transition-colors duration-300"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {formData.skills.length === 0 && (
                        <p className="text-gray-500 text-sm">No skills added yet. Add your first skill above!</p>
                      )}
                    </div>
                  </div>

                  {/* Popular Skills */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Popular Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {availableSkills.slice(0, 20).map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => {
                            if (!formData.skills.includes(skill)) {
                              setFormData(prev => ({
                                ...prev,
                                skills: [...prev.skills, skill]
                              }));
                            }
                          }}
                          disabled={formData.skills.includes(skill)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            formData.skills.includes(skill)
                              ? 'bg-gray-600/20 text-gray-500 border border-gray-600/30 cursor-not-allowed'
                              : 'bg-gray-600/20 text-gray-300 border border-gray-600/30 hover:bg-blue-600/20 hover:text-blue-300 hover:border-blue-500/30'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit; 