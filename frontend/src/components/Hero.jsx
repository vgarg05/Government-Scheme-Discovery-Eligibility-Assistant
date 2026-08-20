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
        paddingTop: '60px',
        paddingBottom: '52px',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* 2-Column Asymmetric Grid (Pleurat.com Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* Left Column: Eyebrow + Large Editorial Headline */}
          <div className="lg:col-span-7">
            {/* Eyebrow meta label */}
            <p
              className="label-meta mb-6"
              style={{ color: 'var(--text-muted)' }}
            >
              01 GOVASSIST &middot; AI WELFARE ENGINE
            </p>

            {/* Huge Pleurat-Style Editorial Headline */}
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

          {/* Right Column: Sub-copy Paragraph + Preset Query Cards */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            {/* Editorial Sub-copy */}
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                marginBottom: '28px',
              }}
            >
              Describe your situation in plain language. The AI engine checks indexed scheme documents and live government sources to evaluate your eligibility.
            </p>

            {/* Sample Preset Queries Grid */}
            <div>
              <p
                className="label-meta mb-3"
                style={{ color: 'var(--text-muted)', fontSize: '10px' }}
              >
                SAMPLE PRESET QUERIES
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SAMPLE_QUERIES.map(({ label, query }) => (
                  <button
                    key={label}
                    onClick={() => onPresetClick(query)}
                    className="group flex items-start justify-between gap-2.5 text-left transition-all duration-150"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '10px 12px',
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
                          fontSize: '11.5px',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          marginBottom: '2px',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: 'var(--text-muted)',
                          lineHeight: 1.4,
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
                      style={{ width: '12px', height: '12px', color: 'var(--accent)' }}
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
