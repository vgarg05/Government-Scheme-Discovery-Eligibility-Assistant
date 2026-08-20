import React, { useState, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';

const LANG_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  bn: 'bn-IN',
  mr: 'mr-IN',
  pa: 'pa-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  gu: 'gu-IN',
};

export default function VoiceInput({ selectedLang = 'en', onSpeechRecognized }) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please type your query.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    // Use selected language tag (e.g. hi-IN for Hindi)
    recognition.lang = LANG_MAP[selectedLang] || 'en-IN';
    recognition.continuous = true;
    recognition.interimResults = false;

    let finalTranscript = '';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptChunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptChunk + ' ';
        }
      }
      if (finalTranscript.trim()) {
        onSpeechRecognized(finalTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      title={isListening ? 'Click to stop listening' : 'Click to speak query'}
      className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150 focus:outline-none"
      style={{
        background: isListening ? 'rgba(248,113,113,0.15)' : '#18181f',
        border: `1px solid ${isListening ? 'rgba(248,113,113,0.4)' : '#26262e'}`,
        color: isListening ? '#f87171' : '#55556a',
        boxShadow: isListening ? '0 0 10px rgba(248,113,113,0.3)' : 'none',
      }}
    >
      {isListening ? (
        <MicOff className="h-4 w-4 animate-pulse" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </button>
  );
}
