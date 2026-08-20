import React, { useState } from 'react';
import { Check, ExternalLink } from 'lucide-react';

export default function DocumentChecklist({ checklist, applicationSteps, citations }) {
  const [checked, setChecked] = useState({});

  const toggle = (i) => setChecked(prev => ({ ...prev, [i]: !prev[i] }));

  const hasContent = (checklist && checklist.length > 0) ||
    (applicationSteps && applicationSteps.length > 0) ||
    (citations && citations.length > 0);

  if (!hasContent) return null;

  return (
    <div
      className="rounded-xl overflow-hidden my-3 divide-y"
      style={{ border: '1px solid #26262e', background: '#111118', divideColor: '#1e1e26' }}
    >

      {/* Documents */}
      {checklist && checklist.length > 0 && (
        <div className="px-4 py-3">
          <p className="text-xs font-medium mb-3" style={{ color: '#8888a0' }}>
            Documents required
          </p>
          <ul className="space-y-2">
            {checklist.map((doc, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-3 text-left group"
                >
                  <span
                    className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transition-all duration-150"
                    style={{
                      background: checked[i] ? '#5b8ef0' : 'transparent',
                      border: `1px solid ${checked[i] ? '#5b8ef0' : '#3a3a48'}`,
                    }}
                  >
                    {checked[i] && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
                  </span>
                  <span
                    className="text-xs leading-relaxed transition-all"
                    style={{
                      color: checked[i] ? '#55556a' : '#8888a0',
                      textDecoration: checked[i] ? 'line-through' : 'none',
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

      {/* Steps */}
      {applicationSteps && applicationSteps.length > 0 && (
        <div className="px-4 py-3">
          <p className="text-xs font-medium mb-3" style={{ color: '#8888a0' }}>
            How to apply
          </p>
          <ol className="space-y-3">
            {applicationSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{
                    background: 'rgba(91,142,240,0.1)',
                    color: '#5b8ef0',
                    border: '1px solid rgba(91,142,240,0.2)',
                    fontSize: '10px',
                  }}
                >
                  {i + 1}
                </span>
                <span className="text-xs leading-relaxed pt-0.5" style={{ color: '#8888a0' }}>
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Sources */}
      {citations && citations.length > 0 && (
        <div className="px-4 py-3">
          <p className="text-xs font-medium mb-2.5" style={{ color: '#8888a0' }}>
            Sources
          </p>
          <div className="flex flex-wrap gap-2">
            {citations.map((cite, i) => (
              <a
                key={i}
                href={cite.url || '#'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs rounded px-2.5 py-1 transition-all duration-150"
                style={{
                  background: '#18181f',
                  border: '1px solid #26262e',
                  color: '#5b8ef0',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#3a3a48'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#26262e'}
              >
                <span>{cite.title || cite.filename}</span>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
