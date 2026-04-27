import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Features", to: "#features" },
  { name: "About", to: "#about" },
  { name: "Contact", to: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (hash) => {
    if (hash.startsWith("#")) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setOpen(false);
    } else {
      window.location.href = hash;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e17] bg-gradient-to-r from-[#0a0e17] via-[#0e1b2c] to-[#0a0e17] animate-navbar-shimmer backdrop-blur-xl shadow-2xl border-b border-cyan-400/20">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-20 md:h-24 max-w-7xl mx-auto">
          {/* Brand */}
          <div className="flex flex-col group cursor-pointer select-none">
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent animate-pulse-slow drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]">
              SkillSync
            </span>
            <span className="text-xs text-cyan-300 font-medium tracking-wide group-hover:text-cyan-400 transition-colors duration-300">
              Connect. Collaborate. Create.
            </span>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((item) => (
              <button
                key={item.to}
                onClick={() => scrollToSection(item.to)}
                className="relative text-cyan-100 hover:text-cyan-300 transition-all duration-300 font-medium text-sm px-4 py-2 rounded-lg group overflow-hidden"
              >
                <span className="relative z-10">{item.name}</span>
                {/* Neon underline */}
                <span className="absolute left-1/2 -bottom-1 w-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full shadow-[0_0_8px_#22d3ee] transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8 group-focus:w-3/4"></span>
                {/* Animated shimmer on hover */}
                <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-blue-500 group-hover:to-violet-500 transition-all duration-300"></span>
              </button>
            ))}
            <Link to="/login" className="ml-4">
              <button className="relative bg-white/10 backdrop-blur-md px-8 py-3 rounded-full font-bold border border-cyan-400/30 shadow-lg transition-all duration-300 text-sm group overflow-hidden text-cyan-100 hover:bg-cyan-400/20 hover:text-white hover:shadow-[0_0_16px_#22d3ee] focus:ring-2 focus:ring-cyan-400/40">
                <span className="relative z-10">Login / Register</span>
              </button>
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-cyan-200 p-2 hover:bg-cyan-400/10 rounded-lg transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-gradient-to-b from-[#0e1b2c]/95 to-[#0a0e17]/95 backdrop-blur-xl border-t border-cyan-400/20 animate-in slide-in-from-top-2 duration-300">
            <div className="px-6 py-6 space-y-2 max-w-7xl mx-auto">
              {navLinks.map((item) => (
                <button
                  key={item.to}
                  onClick={() => scrollToSection(item.to)}
                  className="block w-full text-left text-cyan-100 hover:text-cyan-300 transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-cyan-400/10"
                >
                  {item.name}
                </button>
              ))}
              <Link to="/login">
                <button className="w-full bg-white/10 backdrop-blur-md text-cyan-100 px-8 py-4 rounded-full font-medium shadow-lg hover:bg-cyan-400/20 hover:text-white hover:shadow-[0_0_16px_#22d3ee] transition-all duration-300 text-sm mt-4">
                  Login / Register
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Custom animation classes (add to your global CSS or Tailwind config)
// .animate-navbar-shimmer { background-size: 200% 200%; animation: navbar-shimmer 6s linear infinite; }
// @keyframes navbar-shimmer { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
// .animate-pulse-slow { animation: pulse 2.5s cubic-bezier(0.4,0,0.6,1) infinite; }

export default Navbar; 