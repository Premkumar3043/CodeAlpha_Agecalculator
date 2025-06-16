import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  onCalculate: () => void;
  error: string;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange, onCalculate, error }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 pl-12 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm [color-scheme:dark]"
          />
          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
        </div>
        
        <motion.button
          onClick={onCalculate}
          disabled={!value}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate Age
        </motion.button>
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm flex items-center space-x-2"
        >
          <span>⚠️</span>
          <span>{error}</span>
        </motion.p>
      )}
    </div>
  );
};

export default DateInput;