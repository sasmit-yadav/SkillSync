import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import Navbar from "../components/Navbar";

const features = [
  {
    icon: "⚡",
    title: "Instant Skill Matching",
    desc: "AI-driven matching connects you with the right collaborators in seconds."
  },
  {
    icon: "💬",
    title: "Real-Time Collaboration",
    desc: "Chat, share, and build together with live project tools."
  },
  {
    icon: "🧠",
    title: "Smart Profiles",
    desc: "Showcase your skills, goals, and endorsements in a beautiful profile."
  },
  {
    icon: "🤝",
    title: "Project Boards",
    desc: "Organize, assign, and track tasks with your team in-app."
  },
  {
    icon: "⭐",
    title: "Skill Endorsements",
    desc: "Earn credibility with community-backed endorsements."
  },
  {
    icon: "🚀",
    title: "Event & Hackathon Mode",
    desc: "Instantly match and collaborate during live events."
  }
];

const Homepage = () => {
  // Contact form state
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState('');
  const handleContactChange = e => setContact({ ...contact, [e.target.name]: e.target.value });
  const handleContactSubmit = e => {
    e.preventDefault();
    setContactStatus('Thank you! We will get back to you soon.');
    setContact({ name: '', email: '', message: '' });
    setTimeout(() => setContactStatus(''), 3000);
  };
  return (
    <div className="w-full min-h-screen text-white bg-[#10101a]">
      <Navbar />
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] overflow-hidden bg-gradient-to-b from-[#18122B] to-[#10101a] pt-24 pb-16 px-4">
        {/* Subtle background gradient and grid */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#18122B] via-[#1F1B2E] to-[#0F0C1D] opacity-90" />
        <svg className="absolute inset-0 w-full h-full opacity-10 -z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-[#18181b] border border-blue-500/40 rounded-2xl flex items-center justify-center shadow-2xl hover:border-blue-400/80 hover:shadow-blue-500/20 hover:scale-110 transition-all duration-300 cursor-pointer group">
            <img src={logo} alt="SkillSync Logo" className="w-24 h-24 object-contain group-hover:scale-105 transition-transform duration-300" />
          </div>
          {/* Tagline below logo */}
          <span className="mt-3 text-blue-400 text-base font-semibold tracking-wide uppercase">Where skills find synergy</span>
        </div>
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-center bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-xl mb-4">
          Connect. Collaborate. Create.
        </h1>
        {/* Tagline */}
        <p className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mx-auto mb-8">
          The future of tech collaboration. Find your perfect team, match for projects, and build your skills—together.
        </p>
        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2">
          <Link
            to="/register"
            className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-10 py-4 rounded-full text-lg font-bold border border-[#1cb0f6] shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 border border-blue-500/40 hover:border-blue-500/80 rounded-full text-lg font-semibold text-blue-300 hover:text-white transition-all duration-300 backdrop-blur-sm hover:bg-blue-500/10"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#18122B] to-[#10101a] py-20">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#18122B] via-[#1F1B2E] to-[#0F0C1D] opacity-90 z-0" />
        <div className="relative z-10 w-full px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">Key Features</h2>
          <p className="text-center text-blue-300 text-lg mb-12 font-medium">Everything you need to connect, collaborate, and grow—smarter and faster.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="group bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-blue-500/10 hover:border-blue-500/40 transition-all duration-300 shadow-xl hover:shadow-blue-500/10 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Icon with vibrant gradient background */}
                <div className="w-14 h-14 flex items-center justify-center rounded-xl mb-5 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 text-white text-3xl shadow-lg">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-gray-300 text-base font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SkillSync Section */}
      <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#18122B] to-[#10101a] py-20">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#18122B] via-[#1F1B2E] to-[#0F0C1D] opacity-90 z-0" />
        <div className="relative z-10 w-full px-4">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-16 border border-blue-500/10 flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* Left: Value statement with accent icon */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left mb-6 md:mb-0">
              <div className="w-16 h-16 bg-[#18181b] border border-blue-500/40 rounded-2xl flex items-center justify-center shadow-lg mb-4 hover:border-blue-400/80 hover:shadow-blue-500/20 hover:scale-110 transition-all duration-300 cursor-pointer group">
                <img src={logo} alt="SkillSync Logo" className="w-14 h-14 object-contain group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-blue-300">Why SkillSync?</h2>
              <p className="text-gray-200 text-lg font-semibold">The synergy engine for tech learners, builders, and creators.</p>
            </div>
            {/* Right: Bulleted list of unique benefits */}
            <ul className="flex-1 space-y-4 text-left text-gray-300 text-base md:text-lg font-medium pl-2">
              <li className="flex items-start gap-2"><span className="text-blue-400 text-lg mt-1">✔</span> AI-powered skill and goal matching</li>
              <li className="flex items-start gap-2"><span className="text-blue-400 text-lg mt-1">✔</span> Real-time chat, project boards, and collaboration tools</li>
              <li className="flex items-start gap-2"><span className="text-blue-400 text-lg mt-1">✔</span> Smart, customizable profiles and endorsements</li>
              <li className="flex items-start gap-2"><span className="text-blue-400 text-lg mt-1">✔</span> Event & hackathon mode for instant team formation</li>
              <li className="flex items-start gap-2"><span className="text-blue-400 text-lg mt-1">✔</span> Built for students, professionals, and lifelong learners</li>
            </ul>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#18122B] to-[#10101a] py-20">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-[#0a0e17] via-[#0e1b2c]/80 to-cyan-900/60 z-0" style={{clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)'}}></div>
        <div className="relative z-10 w-full px-4">
          <div className="w-full">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                  About
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent animate-navbar-shimmer">
                  SkillSync
                </span>
              </h2>
              <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
                The next-gen platform for tech collaboration, learning, and growth.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Mission & Features */}
              <div>
                <h3 className="text-3xl font-semibold text-cyan-200 mb-6">Our Mission</h3>
                <p className="text-cyan-100 text-lg leading-relaxed mb-6">
                  SkillSync empowers developers, students, and professionals to connect, collaborate, and create. We blend AI-powered matching, project-based learning, and a vibrant community to help you grow your skills and network.
                </p>
                {/* Unique Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                  {/* Feature 1 */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-400/20 shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mb-4 shadow-md">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg>
                    </div>
                    <h4 className="text-cyan-100 font-semibold mb-1">Real-Time Collaboration</h4>
                    <p className="text-cyan-200 text-sm text-center">Work with peers on live projects and hackathons.</p>
                  </div>
                  {/* Feature 2 */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-400/20 shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 mb-4 shadow-md">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 01-8 0" /></svg>
                    </div>
                    <h4 className="text-cyan-100 font-semibold mb-1">AI-Powered Matching</h4>
                    <p className="text-cyan-200 text-sm text-center">Find the best teammates, mentors, and opportunities.</p>
                  </div>
                  {/* Feature 3 */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-400/20 shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 mb-4 shadow-md">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </div>
                    <h4 className="text-cyan-100 font-semibold mb-1">Portfolio Growth</h4>
                    <p className="text-cyan-200 text-sm text-center">Showcase your work and track your progress.</p>
                  </div>
                  {/* Feature 4 */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-400/20 shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 mb-4 shadow-md">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a5 5 0 00-10 0v2a5 5 0 0010 0z" /></svg>
                    </div>
                    <h4 className="text-cyan-100 font-semibold mb-1">Inclusive Community</h4>
                    <p className="text-cyan-200 text-sm text-center">Diverse, supportive, and always open to new ideas.</p>
                  </div>
                </div>
              </div>
              {/* Right Column - Animated Stats */}
              <div className="space-y-8 flex flex-col items-center">
                <div className="grid grid-cols-2 gap-6">
                  {/* Animated Counter Example (replace with a library for real animation) */}
                  <div className="relative bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-cyan-400/20 text-center hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 group overflow-hidden">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">1+</div>
                    <div className="text-cyan-200 text-sm">Year Experience</div>
                  </div>
                  <div className="relative bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-cyan-400/20 text-center hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 group overflow-hidden">
                    <div className="text-3xl font-bold text-blue-400 mb-2">5+</div>
                    <div className="text-cyan-200 text-sm">Core Features</div>
                  </div>
                  <div className="relative bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-cyan-400/20 text-center hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 group overflow-hidden">
                    <div className="text-3xl font-bold text-violet-400 mb-2">100+</div>
                    <div className="text-cyan-200 text-sm">Active Users</div>
                  </div>
                  <div className="relative bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-cyan-400/20 text-center hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 group overflow-hidden">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
                    <div className="text-cyan-200 text-sm">Support</div>
                  </div>
                </div>
                {/* Values */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-cyan-400/20">
                  <h4 className="text-2xl font-semibold text-cyan-100 mb-6">Our Values</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-cyan-200">Quality Collaboration</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-cyan-200">Growth Mindset</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                      <span className="text-cyan-200">Practical Learning</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-cyan-200">Inclusive Community</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#18122B] to-[#10101a] py-20">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0a0e17] via-[#0e1b2c]/80 to-cyan-900/60 z-0" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)'}}></div>
        <div className="relative z-10 w-full px-4">
          <div className="w-full">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                  Get in
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent animate-navbar-shimmer">
                  Touch
                </span>
              </h2>
              <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
                Ready to join the future of tech collaboration? Let's connect.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Contact Form */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-cyan-400/20 shadow-2xl">
                <h3 className="text-2xl font-semibold text-cyan-200 mb-6">Send us a message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className="block text-cyan-100 text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={contact.name}
                      onChange={handleContactChange}
                      className="w-full p-4 rounded-xl bg-white/10 border border-cyan-400/20 text-cyan-100 placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-300"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-100 text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={contact.email}
                      onChange={handleContactChange}
                      className="w-full p-4 rounded-xl bg-white/10 border border-cyan-400/20 text-cyan-100 placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-100 text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={contact.message}
                      onChange={handleContactChange}
                      rows={4}
                      className="w-full p-4 rounded-xl bg-white/10 border border-cyan-400/20 text-cyan-100 placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-300 resize-none"
                      placeholder="Tell us about your project or collaboration ideas..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                  >
                    Send Message
                  </button>
                  {contactStatus && (
                    <div className="mt-4 text-center">
                      <p className="text-cyan-300 text-sm">{contactStatus}</p>
                    </div>
                  )}
                </form>
              </div>
              {/* Right Column - Contact Info */}
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-cyan-400/20 shadow-2xl">
                  <h3 className="text-2xl font-semibold text-cyan-200 mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-cyan-100 font-semibold">Email</h4>
                        <p className="text-cyan-200">info@skillsync.com</p>
                        <p className="text-cyan-300 text-sm">support@skillsync.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-cyan-100 font-semibold">Location</h4>
                        <p className="text-cyan-200">Global Community</p>
                        <p className="text-cyan-300 text-sm">Available worldwide</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-cyan-100 font-semibold">Website</h4>
                        <p className="text-cyan-200">www.skillsync.com</p>
                        <p className="text-cyan-300 text-sm">Always online</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Social Links */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-cyan-400/20 shadow-2xl">
                  <h3 className="text-2xl font-semibold text-cyan-200 mb-6">Follow Us</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <a href="#" className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 group">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-cyan-100 font-semibold">Twitter</h4>
                        <p className="text-cyan-300 text-sm">@SkillSync</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 group">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-cyan-100 font-semibold">LinkedIn</h4>
                        <p className="text-cyan-300 text-sm">SkillSync</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 group">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-cyan-100 font-semibold">Pinterest</h4>
                        <p className="text-cyan-300 text-sm">SkillSync</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 group">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-cyan-100 font-semibold">YouTube</h4>
                        <p className="text-cyan-300 text-sm">SkillSync</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative w-full bg-gradient-to-b from-[#0a0e17] to-[#050709] py-12 border-t border-cyan-400/20">
        <div className="w-full px-4">
          <div className="w-full text-center">
            <div className="flex justify-center mb-8">
              <Link to="/register" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
                Join SkillSync Now
              </Link>
            </div>
            <div className="border-t border-cyan-400/20 pt-8">
              <p className="text-cyan-300 text-sm">
                © {new Date().getFullYear()} SkillSync. Built for the future of collaboration.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
