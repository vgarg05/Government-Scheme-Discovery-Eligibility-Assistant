import React from 'react';
import { ArrowUpRight } from 'lucide-react';

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
        paddingTop: '48px',
        paddingBottom: '48px',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* 2-Column Asymmetric Grid (Vertically Centered with items-center) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline (Vertically Centered Relative to Right Column) */}
          <div className="lg:col-span-7 self-center">
            <h1
              style={{
                fontSize: 'clamp(32px, 4.8vw, 58px)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: 1.06,
                color: 'var(--text-primary)',
              }}
            >
              Find welfare schemes
              <br />
              <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
                you actually qualify for.
              </span>
            </h1>
          </div>

          {/* Right Column: Sub-copy Paragraph + Preset Query Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Editorial Sub-copy */}
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: '#57534A',
                marginBottom: '20px',
              }}
            >
              Describe your situation in plain language. The AI engine checks indexed scheme documents and live government sources to evaluate your eligibility.
            </p>

            {/* Sample Preset Queries Buttons Grid */}
            <div>
              <p
                className="label-meta mb-3"
                style={{ color: 'var(--text-muted)', fontSize: '10px' }}
              >
                SAMPLE PRESET QUERIES
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SAMPLE_QUERIES.map(({ label, query }) => (
                  <button
                    key={label}
                    onClick={() => onPresetClick(query)}
                    className="group flex items-start justify-between gap-2.5 text-left transition-all duration-150 active:scale-[0.98]"
                    style={{
                      background: 'var(--accent)',
                      color: 'var(--accent-text)',
                      borderRadius: '4px',
                      padding: '12px 14px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.opacity = '0.92';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#171714',
                          marginBottom: '4px',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: 'rgba(23, 23, 20, 0.82)',
                          lineHeight: 1.45,
                          whiteSpace: 'normal',
                          wordBreak: 'break-word',
                        }}
                      >
                        {query}
                      </div>
                    </div>
                    <ArrowUpRight
                      className="flex-shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mt-0.5"
                      style={{ width: '15px', height: '15px', color: '#171714', strokeWidth: 2.2 }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
