import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Github, ExternalLink } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-20 p-6"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative">
            <Brain className="text-purple-400" size={32} />
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="text-yellow-400" size={16} />
            </motion.div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AgeAI</h2>
            <p className="text-xs text-slate-400">Professional Edition</p>
          </div>
        </motion.div>

        <div className="hidden md:flex items-center space-x-6">
          <motion.a
            href="#features"
            className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            whileHover={{ y: -2 }}
          >
            Features
          </motion.a>
          <motion.a
            href="#demo"
            className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            whileHover={{ y: -2 }}
          >
            Demo
          </motion.a>
          <motion.a
            href="#about"
            className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            whileHover={{ y: -2 }}
          >
            About
          </motion.a>
        </div>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
          >
            <Github size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg flex items-center space-x-2"
          >
            <span>Live Demo</span>
            <ExternalLink size={16} />
          </motion.button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;