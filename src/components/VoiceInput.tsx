import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';

interface VoiceInputProps {
  onResult: (result: string) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onResult, isActive, setIsActive }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  const toggleVoiceInput = () => {
    if (!isSupported) return;

    if (isActive) {
      setIsActive(false);
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsActive(true);
      setTranscript('');
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      
      if (event.results[0].isFinal) {
        onResult(result);
        setIsActive(false);
      }
    };

    recognition.onerror = () => {
      setIsActive(false);
    };

    recognition.onend = () => {
      setIsActive(false);
    };

    recognition.start();
  };

  if (!isSupported) {
    return (
      <div className="text-center text-white/60">
        <p>Voice input is not supported in your browser</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Mic className="text-green-400" size={24} />
        <h2 className="text-xl font-semibold text-white">Or Speak Your Birth Date</h2>
      </div>
      
      <div className="text-center space-y-4">
        <motion.button
          onClick={toggleVoiceInput}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative p-6 rounded-full transition-all duration-300 ${
            isActive 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600'
          } shadow-lg`}
        >
          {isActive ? <MicOff size={32} className="text-white" /> : <Mic size={32} className="text-white" />}
          
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-red-300"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          )}
        </motion.button>
        
        <p className="text-white/80">
          {isActive ? 'Listening... Say your birth date' : 'Click to start voice input'}
        </p>
        
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm"
          >
            <p className="text-white">Heard: "{transcript}"</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VoiceInput;