import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChatBox from './components/ChatBox';

export default function App() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [activeQuery, setActiveQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0f' }}>
      <Navbar selectedLang={selectedLang} onLangChange={setSelectedLang} />

      <main className="flex-1">
        <Hero onPresetClick={setActiveQuery} />
        <ChatBox initialQuery={activeQuery} selectedLang={selectedLang} />
      </main>

      <footer className="py-5 px-4 text-center" style={{ borderTop: '1px solid #1e1e26' }}>
        <p className="text-xs" style={{ color: '#55556a' }}>
          GovAssist AI — B.Tech Minor Project · MAIT 2023–27 · Team MNP007
        </p>
      </footer>
    </div>
  );
}
