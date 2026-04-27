import { motion } from 'framer-motion';

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] overflow-hidden">
      
      {/* Blurred blobs */}
      <div className="absolute w-[600px] h-[600px] bg-pink-300 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-blob -top-52 -left-40"></div>
      <div className="absolute w-[500px] h-[500px] bg-blue-400 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000 -bottom-40 -right-20"></div>

      {/* Sexy glass card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white/30 backdrop-blur-2xl shadow-2xl border border-white/20 p-10 rounded-3xl"
      >
        <h1 className="text-4xl font-bold text-center text-white drop-shadow-md">{title}</h1>
        <p className="text-md text-center text-white/90 mb-6">{subtitle}</p>
        {children}
      </motion.div>
    </div>
  );
}

export default AuthLayout;


