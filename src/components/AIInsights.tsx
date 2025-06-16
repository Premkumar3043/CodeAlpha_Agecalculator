import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Star, Zap } from 'lucide-react';

interface AgeData {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  totalDays: number;
  birthDate: Date;
}

interface AIInsightsProps {
  ageData: AgeData;
}

const AIInsights: React.FC<AIInsightsProps> = ({ ageData }) => {
  const [insights, setInsights] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(true);

  const generateInsights = (age: AgeData) => {
    const { years, totalDays, birthDate } = age;
    const insights = [];

    // Life stage insights
    if (years < 18) {
      insights.push("You're in the exciting discovery phase of life! Every day brings new learning opportunities and adventures.");
    } else if (years < 30) {
      insights.push("You're in your prime exploration years! This is the perfect time to chase dreams and build your future.");
    } else if (years < 50) {
      insights.push("You're in your power years! Your experience and energy combine to create amazing possibilities.");
    } else if (years < 70) {
      insights.push("You're in your wisdom years! Your life experience is a treasure trove of knowledge and insights.");
    } else {
      insights.push("You're in your golden years! Your journey has been remarkable and full of incredible stories.");
    }

    // Milestone insights
    if (years % 10 === 0) {
      insights.push(`What a milestone! Entering a new decade at ${years} is a perfect time for reflection and new goals.`);
    }

    // Seasonal insights based on birth month
    const birthMonth = birthDate.getMonth();
    const seasons = ['Winter', 'Winter', 'Spring', 'Spring', 'Spring', 'Summer', 'Summer', 'Summer', 'Fall', 'Fall', 'Fall', 'Winter'];
    const season = seasons[birthMonth];
    insights.push(`Born in ${season}, you likely have the natural rhythm of renewal and growth that defines this beautiful season.`);

    // Generational insights
    if (years >= 75) {
      insights.push("You're part of the Silent Generation or older - your resilience and wisdom have shaped the world we live in today.");
    } else if (years >= 58) {
      insights.push("As a Baby Boomer, you've witnessed incredible technological and social transformations throughout your lifetime.");
    } else if (years >= 42) {
      insights.push("Generation X - you've bridged the analog and digital worlds, adapting to incredible technological changes.");
    } else if (years >= 26) {
      insights.push("As a Millennial, you're part of the first truly digital generation, pioneering new ways of living and working.");
    } else {
      insights.push("Generation Z - you're digital natives who are reshaping how we think about work, relationships, and the future.");
    }

    // Fun mathematical insights
    if (totalDays > 10000) {
      insights.push(`Incredible! You've lived over ${Math.floor(totalDays / 1000)}0,000 days. Each one has been a unique chapter in your story.`);
    }

    // Achievement insights
    insights.push(`In your ${years} years, you've had approximately ${years * 365 * 8} hours of sleep - that's like living an entire extra decade in dreamland!`);

    return insights.slice(0, 4); // Return top 4 insights
  };

  useEffect(() => {
    setIsGenerating(true);
    // Simulate AI processing time
    setTimeout(() => {
      const generatedInsights = generateInsights(ageData);
      setInsights(generatedInsights);
      setIsGenerating(false);
    }, 2000);
  }, [ageData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-6 backdrop-blur-sm border border-white/20"
    >
      <div className="flex items-center justify-center space-x-3 mb-6">
        <Brain className="text-purple-400" size={28} />
        <h3 className="text-2xl font-bold text-white">AI-Powered Life Insights</h3>
        <Sparkles className="text-yellow-400" size={28} />
      </div>

      {isGenerating ? (
        <div className="text-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Zap className="text-purple-400" size={32} />
          </motion.div>
          <p className="text-white/80 mt-4">AI is analyzing your life journey...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-start space-x-3 p-4 bg-white/10 rounded-xl"
            >
              <Star className="text-yellow-400 mt-0.5 flex-shrink-0" size={20} />
              <p className="text-white/90 leading-relaxed">{insight}</p>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl"
          >
            <p className="text-purple-200 font-medium">
              ✨ Your life story is unique and beautiful. Every day adds a new page to your incredible journey! ✨
            </p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default AIInsights;