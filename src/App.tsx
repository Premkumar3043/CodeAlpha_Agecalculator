import React from 'react';
import { motion } from 'framer-motion';
import AgeCalculator from './components/AgeCalculator';
import ParticleBackground from './components/ParticleBackground';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ParticleBackground />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse" />
      
      <motion.div 
        className="relative z-10 min-h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Header />
        
        <main className="flex-1 flex flex-col items-center justify-center p-4 py-12">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="text-center mb-12 max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6 leading-tight"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              AI Age Calculator
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="space-y-4"
            >
              <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                Experience the future of age calculation with AI-powered insights
              </p>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Natural language processing • Voice recognition • Personalized analytics • Beautiful visualizations
              </p>
            </motion.div>
            
            {/* Feature badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              {['AI-Powered', 'Voice Enabled', 'Real-time Analytics', 'Mobile Optimized'].map((badge, index) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white hover:bg-white/20 transition-all duration-300"
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <AgeCalculator />
        </main>
        
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;