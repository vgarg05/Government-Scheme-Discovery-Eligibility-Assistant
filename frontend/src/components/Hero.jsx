import React from 'react';
import { ArrowRight } from 'lucide-react';

const SAMPLE_QUERIES = [
  { label: 'Farmer support', query: 'I am a 45 year old farmer from Uttar Pradesh with annual income of Rs 80,000' },
  { label: 'Senior health cover', query: 'Ayushman Bharat health insurance for senior citizens aged 70+' },
  { label: 'Solar scheme', query: 'PM Surya Ghar free electricity rooftop solar panel scheme' },
  { label: 'Student scholarship', query: 'Post-Matric Scholarship for SC/ST students in college' },
];

export default function Hero({ onPresetClick }) {
  return (
    <section
      className="pt-16 pb-12 px-4 sm:px-6"
      style={{ borderBottom: '1px solid #1e1e26' }}
    >
      <div className="max-w-2xl mx-auto text-center">

        {/* Eyebrow */}
        <p
          className="text-xs font-medium tracking-widest uppercase mb-6"
          style={{ color: '#55556a', letterSpacing: '0.12em' }}
        >
          India's AI-Powered Scheme Engine
        </p>

        {/* Headline */}
        <h1
          className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4"
          style={{ color: '#f0f0f5', letterSpacing: '-0.02em' }}
        >
          Find the welfare schemes
          <br />
          <span style={{ color: '#8888a0', fontWeight: 400 }}>you actually qualify for.</span>
        </h1>

        {/* Sub-copy */}
        <p className="text-sm leading-relaxed mb-10 max-w-lg mx-auto" style={{ color: '#55556a' }}>
          Describe your situation in plain language. The AI engine checks 100+ indexed scheme documents and live government sources to evaluate your eligibility.
        </p>

        {/* Sample queries */}
        <div className="text-left">
          <p className="text-xs font-medium mb-3" style={{ color: '#55556a' }}>
            Try a sample query
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SAMPLE_QUERIES.map(({ label, query }) => (
              <button
                key={label}
                onClick={() => onPresetClick(query)}
                className="group flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-left text-sm transition-all duration-150"
                style={{
                  background: '#111118',
                  border: '1px solid #26262e',
                  color: '#8888a0',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#3a3a48';
                  e.currentTarget.style.color = '#f0f0f5';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#26262e';
                  e.currentTarget.style.color = '#8888a0';
                }}
              >
                <div>
                  <div className="text-xs font-medium mb-0.5" style={{ color: '#f0f0f5' }}>
                    {label}
                  </div>
                  <div className="text-xs leading-relaxed line-clamp-1" style={{ color: '#55556a' }}>
                    {query}
                  </div>
                </div>
                <ArrowRight
                  className="h-3.5 w-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: '#5b8ef0' }}
                />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
