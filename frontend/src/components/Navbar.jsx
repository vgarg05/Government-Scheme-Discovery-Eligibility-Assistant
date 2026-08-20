import React from 'react';
import { Landmark, Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'mr', name: 'मराठी' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'gu', name: 'ગુજરાતી' },
];

export default function Navbar({ selectedLang, onLangChange }) {
  const currentLang = languages.find(l => l.code === selectedLang) || languages[0];

  return (
    <header
      style={{
        background: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1e1e26',
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(91,142,240,0.12)', border: '1px solid rgba(91,142,240,0.2)' }}
          >
            <Landmark className="h-4 w-4" style={{ color: '#5b8ef0' }} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-sm tracking-tight" style={{ color: '#f0f0f5' }}>
              GovAssist
            </span>
            <span
              className="text-xs font-medium px-1.5 py-0.5 rounded"
              style={{
                background: 'rgba(91,142,240,0.1)',
                color: '#5b8ef0',
                border: '1px solid rgba(91,142,240,0.15)',
                fontSize: '10px',
                letterSpacing: '0.04em',
              }}
            >
              AI
            </span>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Language selector */}
          <div className="relative flex items-center">
            <Globe
              className="h-3.5 w-3.5 absolute left-2.5 pointer-events-none"
              style={{ color: '#55556a' }}
            />
            <select
              value={selectedLang}
              onChange={(e) => onLangChange(e.target.value)}
              className="appearance-none pl-7 pr-6 py-1.5 text-xs font-medium rounded-md cursor-pointer focus:outline-none transition-colors"
              style={{
                background: '#18181f',
                border: '1px solid #26262e',
                color: '#8888a0',
              }}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} style={{ background: '#18181f', color: '#f0f0f5' }}>
                  {lang.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="h-3 w-3 absolute right-2 pointer-events-none"
              style={{ color: '#55556a' }}
            />
          </div>

          {/* Status dot */}
          <div className="hidden sm:flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#3ecf8e', boxShadow: '0 0 6px #3ecf8e' }}
            />
            <span className="text-xs" style={{ color: '#55556a' }}>
              gov.in
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}
