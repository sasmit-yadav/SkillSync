import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../api/axios";
import logo from "../assets/logo.png";

const FindCollaborators = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [filters, setFilters] = useState({
    query: "",
    skill: "",
  });
  const [activeSkill, setActiveSkill] = useState("");

  const suggestedSkills = [
    "React",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "Python",
    "PostgreSQL",
    "Docker",
    "AWS",
  ];

  const fetchCollaborators = async (params = {}) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login");
      return;
    }

    setSearching(true);
    setErrorMessage("");
    try {
      const response = await axios.get("/auth/collaborators", {
        params: {
          ...params,
          excludeUserId: userData.id,
          currentUserId: userData.id,
          limit: 100,
        },
      });
      setCollaborators(response.data.collaborators || []);
    } catch (error) {
      console.error("Error searching collaborators:", error);
      setErrorMessage("Unable to load collaborators right now. Please try again.");
    } finally {
      setSearching(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login");
      return;
    }
    setCurrentUser(userData);
    fetchCollaborators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchCollaborators(filters);
  };

  const applySkillFilter = (skill) => {
    setActiveSkill(skill);
    const nextFilters = { ...filters, skill };
    setFilters(nextFilters);
    fetchCollaborators(nextFilters);
  };

  const clearFilters = () => {
    const nextFilters = { query: "", skill: "" };
    setFilters(nextFilters);
    setActiveSkill("");
    fetchCollaborators(nextFilters);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#10101a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#18181b] border border-blue-500/40 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-2xl">
            <img src={logo} alt="SkillSync Logo" className="w-12 h-12 object-contain animate-pulse" />
          </div>
          <p className="text-blue-400 text-lg">Loading collaborators...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#10101a] text-white">
      <nav className="w-full bg-[#18122B]/80 backdrop-blur-xl border-b border-blue-500/20 sticky top-0 z-50">
        <div className="w-full px-4 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="w-10 h-10 bg-[#18181b] border border-blue-500/40 rounded-xl flex items-center justify-center shadow-lg">
                <img src={logo} alt="SkillSync Logo" className="w-8 h-8 object-contain" />
              </Link>
              <span className="text-xl font-bold text-blue-400">Find Collaborators</span>
            </div>
            <Link to="/dashboard" className="px-4 py-2 text-blue-400 hover:text-white transition-colors duration-300">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="w-full px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/10"
          >
            <h2 className="text-2xl font-bold mb-4">Search People</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={filters.query}
                onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
                placeholder="Name, bio or skill"
                className="w-full p-3 rounded-xl bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <input
                type="text"
                value={filters.skill}
                onChange={(e) => setFilters((prev) => ({ ...prev, skill: e.target.value }))}
                placeholder="Skill filter (React, Node, etc.)"
                className="w-full p-3 rounded-xl bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button
                type="submit"
                className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 font-semibold"
              >
                {searching ? "Searching..." : "Search"}
              </button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-400">Quick skills:</span>
              {suggestedSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => applySkillFilter(skill)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                    activeSkill === skill
                      ? "bg-blue-600/30 text-blue-200 border-blue-400/50"
                      : "bg-gray-700/30 text-gray-300 border-gray-600/50 hover:bg-blue-600/20"
                  }`}
                >
                  {skill}
                </button>
              ))}
              <button
                type="button"
                onClick={clearFilters}
                className="ml-auto text-sm text-gray-300 hover:text-white underline underline-offset-2"
              >
                Reset filters
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="space-y-4"
          >
            {errorMessage ? (
              <div className="bg-red-600/10 border border-red-500/30 rounded-2xl p-4 text-red-200">
                {errorMessage}
              </div>
            ) : null}

            <div className="text-sm text-gray-300">
              {searching ? "Updating results..." : `${collaborators.length} collaborators found`}
            </div>

            {collaborators.length === 0 ? (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/10 text-center text-gray-300">
                No collaborators match this filter yet. Try a different skill or clear filters.
              </div>
            ) : (
              collaborators.map((person) => {
                const sharedSkills = person.sharedSkills || person.skills.filter((skill) => currentUser?.skills?.includes(skill));
                return (
                  <div
                    key={person.id}
                    className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/10 hover:border-blue-500/40 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold">{person.fullName}</h3>
                        <p className="text-gray-400">{person.email}</p>
                        {person.bio ? <p className="text-gray-300 mt-2">{person.bio}</p> : null}
                      </div>
                      <div className="text-sm text-right text-gray-300">
                        <p className="text-cyan-300 font-semibold">Match: {person.matchScore ?? 0}%</p>
                        <p>Endorsements: {person.endorsementsCount}</p>
                        <p>Skills: {person.skills.length}</p>
                      </div>
                    </div>

                    {sharedSkills.length > 0 ? (
                      <div className="mt-3 text-xs text-green-300">
                        Shared skills: {sharedSkills.join(", ")}
                      </div>
                    ) : (
                      <div className="mt-3 text-xs text-gray-500">No shared skills yet</div>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {person.skills.map((skill) => (
                        <span
                          key={`${person.id}-${skill}`}
                          className={`px-3 py-1 rounded-full text-xs border ${
                            sharedSkills.includes(skill)
                              ? "bg-green-600/20 text-green-300 border-green-500/40"
                              : "bg-blue-600/20 text-blue-300 border-blue-500/30"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                      {person.skills.length === 0 ? (
                        <span className="text-xs text-gray-500">No skills added yet</span>
                      ) : null}
                    </div>
                  </div>
                );
              })
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FindCollaborators;
