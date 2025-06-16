import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Sparkles, Calculator } from 'lucide-react';

const LoadingAnimation: React.FC = () => {
  const icons = [Brain, Zap, Sparkles, Calculator];
  
  return (
    <div className="text-center py-12">
      <motion.div
        className="relative mx-auto w-32 h-32 mb-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        {icons.map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            style={{
              transform: `rotate(${index * 90}deg) translateY(-40px)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          >
            <Icon className="text-purple-400" size={24} />
          </motion.div>
        ))}
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="text-white" size={28} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <motion.h3
          className="text-2xl font-bold text-white"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          AI Processing Your Data
        </motion.h3>
        
        <div className="space-y-2">
          {[
            'Analyzing birth date patterns...',
            'Calculating precise age metrics...',
            'Generating personalized insights...',
            'Preparing beautiful visualizations...'
          ].map((text, index) => (
            <motion.p
              key={index}
              className="text-slate-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3, duration: 0.5 }}
            >
              {text}
            </motion.p>
          ))}
        </div>
        
        <motion.div
          className="flex justify-center space-x-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-purple-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;