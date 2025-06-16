import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="relative z-20 p-6 mt-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-slate-300">
              <span>Built with</span>
              <Heart className="text-red-400" size={16} />
              <span>using React, TypeScript & AI</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-slate-400">
                <Code size={16} />
                <span className="text-sm">Professional Grade</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Zap size={16} />
                <span className="text-sm">AI-Powered</span>
              </div>
            </div>
            
            <div className="text-slate-400 text-sm">
              © 2025 AgeAI Calculator
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;