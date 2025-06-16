import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Mic, MicOff, Sparkles, Heart, Clock, Gift, Zap, Brain } from 'lucide-react';
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, parseISO, isValid } from 'date-fns';
import Confetti from 'react-confetti';
import DateInput from './DateInput';
import AgeResult from './AgeResult';
import VoiceInput from './VoiceInput';
import AIInsights from './AIInsights';
import LoadingAnimation from './LoadingAnimation';

interface AgeData {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  totalDays: number;
  birthDate: Date;
}

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('');
  const [ageData, setAgeData] = useState<AgeData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [naturalInput, setNaturalInput] = useState<string>('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'date' | 'natural' | 'voice'>('date');

  const calculateAge = (inputDate: string) => {
    if (!inputDate) return;
    
    const birth = new Date(inputDate);
    const now = new Date();
    
    if (birth > now) {
      setError('Birth date cannot be in the future');
      return;
    }
    
    if (!isValid(birth)) {
      setError('Please enter a valid date');
      return;
    }

    setError('');
    setIsCalculating(true);
    
    setTimeout(() => {
      const years = differenceInYears(now, birth);
      const months = differenceInMonths(now, birth) % 12;
      const days = differenceInDays(now, birth) % 30;
      const hours = differenceInHours(now, birth) % 24;
      const minutes = differenceInMinutes(now, birth) % 60;
      const totalDays = differenceInDays(now, birth);
      
      setAgeData({
        years,
        months,
        days,
        hours,
        minutes,
        totalDays,
        birthDate: birth
      });
      
      setIsCalculating(false);
      setShowConfetti(true);
      
      setTimeout(() => setShowConfetti(false), 4000);
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(
          `Congratulations! You are ${years} years, ${months} months, and ${days} days old. That's ${totalDays.toLocaleString()} days of incredible life experiences!`
        );
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        speechSynthesis.speak(utterance);
      }
    }, 2000);
  };

  const parseNaturalLanguage = (input: string): string | null => {
    const patterns = [
      /(?:born|birth)\s+(?:on\s+)?(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/i,
      /(?:born|birth)\s+(?:on\s+)?(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})[,\s]+(\d{4})/i,
      /(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/,
      /(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})/
    ];

    const months = {
      january: '01', february: '02', march: '03', april: '04',
      may: '05', june: '06', july: '07', august: '08',
      september: '09', october: '10', november: '11', december: '12'
    };

    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) {
        if (pattern.source.includes('january|february')) {
          const month = months[match[1].toLowerCase() as keyof typeof months];
          const day = match[2].padStart(2, '0');
          const year = match[3];
          return `${year}-${month}-${day}`;
        } else if (match[1].length === 4) {
          return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
        } else {
          return `${match[3]}-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`;
        }
      }
    }
    return null;
  };

  const handleNaturalInput = () => {
    const parsed = parseNaturalLanguage(naturalInput);
    if (parsed) {
      setBirthDate(parsed);
      calculateAge(parsed);
    } else {
      setError('Could not understand the date format. Try: "I was born on March 5, 1998"');
    }
  };

  const tabs = [
    { id: 'date', label: 'Date Picker', icon: Calendar },
    { id: 'natural', label: 'Natural Language', icon: Brain },
    { id: 'voice', label: 'Voice Input', icon: Mic },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
          gravity={0.2}
          colors={['#60A5FA', '#A78BFA', '#F472B6', '#34D399', '#FBBF24']}
        />
      )}
      
      <motion.div
        className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
        initial={{ scale: 0.95, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
      >
        {/* Premium Header */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="text-yellow-400" size={32} />
              </motion.div>
              <h2 className="text-3xl font-bold text-white">AI Age Analysis</h2>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="text-blue-400" size={32} />
              </motion.div>
            </div>
            <p className="text-slate-300 text-lg">Choose your preferred input method below</p>
          </motion.div>
        </div>

        <div className="p-8 md:p-12">
          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mb-8 p-2 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Input Sections */}
          <AnimatePresence mode="wait">
            {activeTab === 'date' && (
              <motion.div
                key="date"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <Calendar className="text-blue-400 mx-auto mb-3" size={32} />
                  <h3 className="text-2xl font-bold text-white mb-2">Select Your Birth Date</h3>
                  <p className="text-slate-400">Use the date picker for precise input</p>
                </div>
                <DateInput
                  value={birthDate}
                  onChange={setBirthDate}
                  onCalculate={() => calculateAge(birthDate)}
                  error={error}
                />
              </motion.div>
            )}

            {activeTab === 'natural' && (
              <motion.div
                key="natural"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <Brain className="text-purple-400 mx-auto mb-3" size={32} />
                  <h3 className="text-2xl font-bold text-white mb-2">Natural Language Input</h3>
                  <p className="text-slate-400">Type naturally - our AI will understand</p>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={naturalInput}
                      onChange={(e) => setNaturalInput(e.target.value)}
                      placeholder="I was born on March 5, 1998..."
                      className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm text-lg"
                      onKeyPress={(e) => e.key === 'Enter' && handleNaturalInput()}
                    />
                    <motion.button
                      onClick={handleNaturalInput}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
                    >
                      Parse
                    </motion.button>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['I was born on January 15, 1995', 'Born March 22, 2000', '05/10/1988'].map((example) => (
                      <motion.button
                        key={example}
                        onClick={() => setNaturalInput(example)}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-white/5 border border-white/20 rounded-full text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                      >
                        {example}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'voice' && (
              <motion.div
                key="voice"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-6">
                  <Mic className="text-green-400 mx-auto mb-3" size={32} />
                  <h3 className="text-2xl font-bold text-white mb-2">Voice Recognition</h3>
                  <p className="text-slate-400">Speak your birth date naturally</p>
                </div>
                <VoiceInput
                  onResult={(result) => {
                    setNaturalInput(result);
                    const parsed = parseNaturalLanguage(result);
                    if (parsed) {
                      setBirthDate(parsed);
                      calculateAge(parsed);
                    }
                  }}
                  isActive={isVoiceActive}
                  setIsActive={setIsVoiceActive}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm"
              >
                <p className="text-red-300 text-center flex items-center justify-center space-x-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          <AnimatePresence>
            {isCalculating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12"
              >
                <LoadingAnimation />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {ageData && !isCalculating && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
                className="mt-12 space-y-8"
              >
                <AgeResult ageData={ageData} />
                <AIInsights ageData={ageData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AgeCalculator;