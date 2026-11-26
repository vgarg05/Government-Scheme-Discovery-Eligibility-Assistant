import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Panorama from './components/Panorama';
import ChatBox from './components/ChatBox';
import SchemeWizardModal from './components/SchemeWizardModal';

export default function App() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [activeQuery, setActiveQuery] = useState('');
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const handlePresetClick = (query) => {
    setActiveQuery(query);
    const chatEl = document.getElementById('chat-section');
    if (chatEl) {
      chatEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWizardSubmit = (formData) => {
    const parts = ['Find eligible government schemes for'];
    if (formData.age) parts.push(`a ${formData.age} year old`);
    if (formData.gender) parts.push(`${formData.gender}`);
    if (formData.employment_status) parts.push(`${formData.employment_status}`);
    if (formData.residence_area) parts.push(`living in ${formData.residence_area} area`);
    if (formData.state) parts.push(`of ${formData.state}`);
    if (formData.category) parts.push(`category ${formData.category}`);
    if (formData.income) parts.push(`with annual income Rs ${formData.income}`);
    if (formData.is_differently_abled) parts.push('(differently abled)');
    if (formData.is_minority) parts.push('(minority category)');
    if (formData.bpl_status) parts.push('(BPL card holder)');

    const queryStr = parts.join(' ');
    handlePresetClick(queryStr);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
      }}
    >
      <Navbar
        selectedLang={selectedLang}
        onLangChange={setSelectedLang}
        onOpenWizard={() => setIsWizardOpen(true)}
      />

      <main style={{ flex: 1 }}>
        <Hero
          onPresetClick={handlePresetClick}
          onOpenWizard={() => setIsWizardOpen(true)}
        />
        <Panorama />
        <div id="chat-section">
          <ChatBox initialQuery={activeQuery} selectedLang={selectedLang} />
        </div>
      </main>

      <SchemeWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSubmit={handleWizardSubmit}
      />

      <footer
        style={{
          padding: '20px 16px',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          GovAssist &mdash; B.Tech Minor Project &middot; MAIT 2023–27 &middot; Team MNP007
        </p>
      </footer>
    </div>
  );
}
