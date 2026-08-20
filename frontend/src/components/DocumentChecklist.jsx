import React, { useState } from 'react';
import { Check, ExternalLink } from 'lucide-react';

const TRANSLATIONS = {
  en: {
    docsRequired: "Documents required",
    howToApply: "How to apply",
    sources: "Official sources"
  },
  hi: {
    docsRequired: "आवश्यक दस्तावेज़",
    howToApply: "आवेदन कैसे करें",
    sources: "स्रोत संदर्भ"
  },
  bn: {
    docsRequired: "প্রয়োজনীয় নথি",
    howToApply: "কীভাবে আবেদন করবেন",
    sources: "উৎস"
  },
  mr: {
    docsRequired: "आवश्यक कागदपत्रे",
    howToApply: "कसे अर्ज करावे",
    sources: "स्रोत"
  },
  pa: {
    docsRequired: "ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼",
    howToApply: "ਕਿਵੇਂ ਅਪਲਾਈ ਕਰਨਾ ਹੈ",
    sources: "ਸਰੋਤ"
  },
  ta: {
    docsRequired: "தேவையான ஆவணங்கள்",
    howToApply: "எப்படி விண்ணப்பிப்பது",
    sources: "ஆதாரங்கள்"
  },
  te: {
    docsRequired: "అవసరమైన పత్రాలు",
    howToApply: "ఎలా దరఖాస్తు చేయాలి",
    sources: "మూలాధారాలు"
  },
  gu: {
    docsRequired: "જરૂરી દસ્તાવેજો",
    howToApply: "કેવી રીતે અરજી કરવી",
    sources: "સ્ત્રોતો"
  }
};

/* ── Section header with accent left-bar ── */
function SectionHeader({ label }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '14px',
      }}
    >
      {/* Tiny accent marker */}
      <span
        style={{
          width: '2px',
          height: '12px',
          borderRadius: '1px',
          background: 'var(--accent)',
          flexShrink: 0,
          display: 'block',
        }}
      />
      <span
        style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.11em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function DocumentChecklist({ checklist, applicationSteps, citations, language = 'en' }) {
  const [checked, setChecked] = useState({});
  const labels = TRANSLATIONS[language] || TRANSLATIONS.en;

  const toggle = (i) => setChecked(prev => ({ ...prev, [i]: !prev[i] }));

  const hasContent =
    (checklist && checklist.length > 0) ||
    (applicationSteps && applicationSteps.length > 0) ||
    (citations && citations.length > 0);

  if (!hasContent) return null;

  return (
    <div
      className="animate-enter-delayed"
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        background: '#FDFBF4',
        marginBottom: '8px',
      }}
    >

      {/* Documents Required */}
      {checklist && checklist.length > 0 && (
        <div
          style={{
            padding: '16px 18px',
            borderBottom: (applicationSteps?.length > 0 || citations?.length > 0)
              ? '1px solid var(--border-subtle)'
              : 'none',
          }}
        >
          <SectionHeader label={labels.docsRequired} />
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {checklist.map((doc, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {/* Checkbox */}
                  <span
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '3px',
                      border: `1px solid ${checked[i] ? 'var(--accent)' : 'var(--border)'}`,
                      background: checked[i] ? 'var(--accent)' : 'transparent',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '2px',
                      transition: 'all 0.15s',
                    }}
                  >
                    {checked[i] && (
                      <Check
                        style={{ width: '10px', height: '10px', color: '#171714' }}
                        strokeWidth={3}
                      />
                    )}
                  </span>
                  <span
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.55,
                      color: checked[i] ? 'var(--text-muted)' : 'var(--text-secondary)',
                      textDecoration: checked[i] ? 'line-through' : 'none',
                      transition: 'all 0.15s',
                    }}
                  >
                    {doc}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* How to Apply */}
      {applicationSteps && applicationSteps.length > 0 && (() => {
        let currentStepNum = 0;
        return (
          <div
            style={{
              padding: '16px 18px',
              borderBottom: citations?.length > 0 ? '1px solid var(--border-subtle)' : 'none',
            }}
          >
            <SectionHeader label={labels.howToApply} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {applicationSteps.map((step, i) => {
                const isHeader = typeof step === 'string' && (step.includes('METHOD') || step.includes('ONLINE') || step.includes('OFFLINE') || step.startsWith('🌐') || step.startsWith('🏢'));

                if (isHeader) {
                  currentStepNum = 0; // Reset counter for new method section
                  return (
                    <div
                      key={i}
                      style={{
                        fontSize: '12.5px',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        color: 'var(--text-primary)',
                        marginTop: i > 0 ? '12px' : '2px',
                        paddingBottom: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>{step}</span>
                    </div>
                  );
                }

                currentStepNum += 1;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', paddingLeft: '4px' }}>
                    {/* Step number */}
                    <span
                      style={{
                        flexShrink: 0,
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        background: 'var(--raised)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 650,
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.01em',
                        marginTop: '2px',
                      }}
                    >
                      {currentStepNum}
                    </span>
                    <span
                      style={{
                        fontSize: '13px',
                        lineHeight: 1.55,
                        color: 'var(--text-secondary)',
                        paddingTop: '1px',
                      }}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* Official Sources */}
      {citations && citations.length > 0 && (
        <div style={{ padding: '14px 18px' }}>
          <SectionHeader label={labels.sources} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {citations.map((cite, i) => {
              const cleanHref = (cite.url || '#').replace(/;+$/, '').trim();
              return (
                <a
                  key={i}
                  href={cleanHref}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '12px',
                  fontWeight: 500,
                  padding: '5px 10px',
                  borderRadius: '4px',
                  background: 'var(--raised)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--text-muted)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <span style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '220px',
                }}>
                  {cite.title || cite.filename}
                </span>
                  <ExternalLink
                    style={{ width: '11px', height: '11px', opacity: 0.5, flexShrink: 0 }}
                  />
                </a>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
