import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Heart, Gift, Trophy, Star, Zap, Target } from 'lucide-react';

interface AgeData {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  totalDays: number;
  birthDate: Date;
}

interface AgeResultProps {
  ageData: AgeData;
}

const AgeResult: React.FC<AgeResultProps> = ({ ageData }) => {
  const { years, months, days, hours, minutes, totalDays } = ageData;

  const primaryStats = [
    { label: 'Years', value: years, icon: Calendar, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500/20' },
    { label: 'Months', value: months, icon: Calendar, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500/20' },
    { label: 'Days', value: days, icon: Calendar, color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-500/20' },
    { label: 'Total Days', value: totalDays.toLocaleString(), icon: Target, color: 'from-green-500 to-green-600', bgColor: 'bg-green-500/20' },
  ];

  const lifeStats = [
    { label: 'Hours Lived', value: (totalDays * 24).toLocaleString(), icon: Clock, description: 'Every hour counts!' },
    { label: 'Minutes Lived', value: (totalDays * 24 * 60).toLocaleString(), icon: Zap, description: 'Time flies by' },
    { label: 'Heartbeats', value: Math.round(totalDays * 24 * 60 * 70).toLocaleString(), icon: Heart, description: 'Your heart\'s journey' },
    { label: 'Birthdays', value: years, icon: Gift, description: 'Celebrations so far' },
  ];

  const achievements = [
    { milestone: '1,000 Days', achieved: totalDays >= 1000, icon: Star },
    { milestone: '5,000 Days', achieved: totalDays >= 5000, icon: Trophy },
    { milestone: '10,000 Days', achieved: totalDays >= 10000, icon: Target },
    { milestone: '20,000 Days', achieved: totalDays >= 20000, icon: Zap },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Result */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center p-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl backdrop-blur-sm border border-white/20"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
            Your Life Journey
          </h2>
          <div className="text-2xl md:text-3xl text-white font-bold mb-2">
            <span className="text-blue-400">{years}</span> years, {' '}
            <span className="text-purple-400">{months}</span> months, {' '}
            <span className="text-pink-400">{days}</span> days
          </div>
          <p className="text-xl text-slate-300">
            That's <span className="font-bold text-green-400">{totalDays.toLocaleString()}</span> incredible days of life!
          </p>
        </motion.div>
      </motion.div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {primaryStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group relative overflow-hidden"
          >
            <div className={`p-6 rounded-2xl bg-gradient-to-br ${stat.color} shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-xl ${stat.bgColor} backdrop-blur-sm`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className="text-right">
                  <motion.p 
                    className="text-3xl font-black text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-sm text-white/80 font-medium">{stat.label}</p>
                </div>
              </div>
              
              {/* Animated background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Life Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="bg-white/5 rounded-3xl p-8 backdrop-blur-sm border border-white/10"
      >
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-2">Life Statistics</h3>
          <p className="text-slate-400">Amazing numbers from your journey</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lifeStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-4 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl">
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-slate-300 font-medium">{stat.label}</p>
                <p className="text-sm text-slate-400">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievement Badges */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10"
      >
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-2">Life Milestones</h3>
          <p className="text-slate-400">Achievements unlocked on your journey</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.milestone}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                achievement.achieved
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50 text-green-300'
                  : 'bg-white/5 border-white/20 text-slate-400'
              }`}
            >
              <achievement.icon size={24} />
              <span className="font-medium">{achievement.milestone}</span>
              {achievement.achieved && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.1, type: "spring", stiffness: 300 }}
                  className="text-green-400"
                >
                  ✓
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AgeResult;