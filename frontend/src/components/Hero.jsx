import React from 'react';
import { ArrowRight } from 'lucide-react';

const SAMPLE_QUERIES = [
  { label: 'Farmer Support', query: 'I am a 45 year old farmer from Uttar Pradesh with annual income of Rs 80,000' },
  { label: 'Senior Health Cover', query: 'Ayushman Bharat health insurance for senior citizens aged 70+' },
  { label: 'Solar Scheme', query: 'PM Surya Ghar free electricity rooftop solar panel scheme' },
  { label: 'Student Scholarship', query: 'Post-Matric Scholarship for SC/ST students in college' },
];

export default function Hero({ onPresetClick }) {
  return (
    <section
      style={{
        borderBottom: '1px solid var(--border)',
        paddingTop: '64px',
        paddingBottom: '56px',
      }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Eyebrow label */}
        <p
          className="label-meta mb-8"
          style={{ color: 'var(--text-muted)' }}
        >
          India's AI-Powered Scheme Engine
        </p>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 500,
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            marginBottom: '16px',
          }}
        >
          Find the welfare schemes
          <br />
          <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>
            you actually qualify for.
          </span>
        </h1>

        {/* Sub-copy */}
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            maxWidth: '480px',
            marginBottom: '44px',
          }}
        >
          Describe your situation in plain language. The AI engine checks indexed scheme documents and live government sources to evaluate your eligibility.
        </p>

        {/* Sample queries */}
        <div>
          <p
            className="label-meta mb-4"
            style={{ color: 'var(--text-muted)' }}
          >
            Try a sample query
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SAMPLE_QUERIES.map(({ label, query }) => (
              <button
                key={label}
                onClick={() => onPresetClick(query)}
                className="group flex items-start justify-between gap-3 text-left transition-all duration-150"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '12px 14px',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--text-muted)';
                  e.currentTarget.style.background = 'var(--raised)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.background = 'var(--surface)';
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      marginBottom: '3px',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      lineHeight: 1.45,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {query}
                  </div>
                </div>
                <ArrowRight
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5"
                  style={{ width: '13px', height: '13px', color: 'var(--accent)' }}
                />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
