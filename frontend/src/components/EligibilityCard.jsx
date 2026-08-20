import React from 'react';
import { CheckCircle2, AlertTriangle, Database, Globe } from 'lucide-react';

const TRANSLATIONS = {
  en: {
    match: "match",
    bestMatch: "Best match",
    qualified: "Qualified",
    verify: "Verify",
    generalAlignment: "General alignment",
    noDisqualifiers: "No disqualifiers found"
  },
  hi: {
    match: "मिलान",
    bestMatch: "सर्वश्रेष्ठ मिलान",
    qualified: "पात्र / योग्य",
    verify: "सत्यापन",
    generalAlignment: "सामान्य जनसांख्यिकीय संरेखण",
    noDisqualifiers: "कोई अयोग्यता मानदंड नहीं मिला"
  },
  bn: {
    match: "মিল",
    bestMatch: "সেরা মিল",
    qualified: "যোগ্য",
    verify: "যাচাই করুন",
    generalAlignment: "সাধারণ জনসংখ্যাগত প্রান্তিককরণ",
    noDisqualifiers: "কোন অযোগ্যতা পাওয়া যায়নি"
  },
  mr: {
    match: "साम्य",
    bestMatch: "सर्वोत्कृष्ट साम्य",
    qualified: "पात्र",
    verify: "पडताळणी",
    generalAlignment: "सामान्य लोकसंख्याशास्त्रीय संरेखन",
    noDisqualifiers: "कोणतीही अपात्रता आढळली नाही"
  },
  pa: {
    match: "ਮੇਲ",
    bestMatch: "ਸਭ ਤੋਂ ਵਧੀਆ ਮੇਲ",
    qualified: "ਯੋਗ",
    verify: "ਪੁਸ਼ਟੀ ਕਰੋ",
    generalAlignment: "ਆਮ ਜਨਸੰਖਿਆਤਮਕ ਅਨੁਕੂਲਤਾ",
    noDisqualifiers: "ਕੋਈ ਅਯੋਗਤਾ ਨਹੀਂ ਮਿਲੀ"
  },
  ta: {
    match: "பொருத்தம்",
    bestMatch: "சிறந்த பொருத்தம்",
    qualified: "தகுதி",
    verify: "சரிபார்",
    generalAlignment: "பொதுவான புள்ளிவிவர சீரமைப்பு",
    noDisqualifiers: "தகுதியின்மை எதுவும் காணப்படவில்லை"
  },
  te: {
    match: "సరిపోలిక",
    bestMatch: "ఉత్తమ సరిపోలిక",
    qualified: "అర్హత",
    verify: "ధృవీకరించు",
    generalAlignment: "సాధారణ జనాభా అమరిక",
    noDisqualifiers: "అనర్హతలు ఏవీ కనుగొనబడలేదు"
  },
  gu: {
    match: "મેળ",
    bestMatch: "શ્રેષ્ઠ મેળ",
    qualified: "યોગ્ય",
    verify: "ચકાસો",
    generalAlignment: "સામાન્ય વસ્તીવિષયક ગોઠવણી",
    noDisqualifiers: "કોઈ ગેરલાયકાત મળી નથી"
  }
};

function ScoreRing({ score, lang = 'en' }) {
  const clamped = Math.max(0, Math.min(100, score || 0));
  const color = clamped >= 80 ? '#3ecf8e' : clamped >= 50 ? '#f59e0b' : '#f87171';
  const labels = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className="text-3xl font-bold tabular-nums"
        style={{ color, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.03em' }}
      >
        {clamped}%
      </div>
      <div className="text-xs font-medium" style={{ color: '#55556a' }}>
        {labels.match}
      </div>
    </div>
  );
}

export default function EligibilityCard({ data }) {
  if (!data) return null;

  const { top_scheme, match_score, matched_criteria, unmatched_criteria, retrieval_mode, language = 'en' } = data;
  const isRag = retrieval_mode === 'rag';
  const labels = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div
      className="rounded-xl overflow-hidden my-3"
      style={{ border: '1px solid #26262e', background: '#111118' }}
    >
      {/* Header row */}
      <div
        className="flex items-center justify-between gap-4 px-4 py-3"
        style={{ borderBottom: '1px solid #1e1e26' }}
      >
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium mb-0.5" style={{ color: '#55556a' }}>
            {labels.bestMatch}
          </p>
          <h3
            className="font-semibold text-sm leading-snug truncate"
            style={{ color: '#f0f0f5' }}
          >
            {top_scheme || 'Government Scheme'}
          </h3>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <ScoreRing score={match_score} lang={language} />
          <div
            className="flex items-center gap-1 text-xs px-2 py-0.5 rounded"
            style={{
              background: isRag ? 'rgba(62,207,142,0.08)' : 'rgba(91,142,240,0.08)',
              color: isRag ? '#3ecf8e' : '#5b8ef0',
              border: `1px solid ${isRag ? 'rgba(62,207,142,0.15)' : 'rgba(91,142,240,0.15)'}`,
            }}
          >
            {isRag ? <Database className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
            <span className="font-medium">{isRag ? 'RAG' : 'Web'}</span>
          </div>
        </div>
      </div>

      {/* Criteria grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Matched */}
        <div className="px-4 py-3" style={{ borderRight: '1px solid #1e1e26' }}>
          <div className="flex items-center gap-1.5 mb-2">
            <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: '#3ecf8e' }} />
            <span className="text-xs font-medium" style={{ color: '#3ecf8e' }}>
              {labels.qualified}
            </span>
          </div>
          <ul className="space-y-1.5">
            {matched_criteria && matched_criteria.length > 0 ? (
              matched_criteria.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#3ecf8e' }} />
                  <span className="text-xs leading-relaxed" style={{ color: '#8888a0' }}>
                    {item}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-xs" style={{ color: '#55556a' }}>
                {labels.generalAlignment}
              </li>
            )}
          </ul>
        </div>

        {/* Verify */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-1.5 mb-2">
            <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: '#f59e0b' }} />
            <span className="text-xs font-medium" style={{ color: '#f59e0b' }}>
              {labels.verify}
            </span>
          </div>
          <ul className="space-y-1.5">
            {unmatched_criteria && unmatched_criteria.length > 0 ? (
              unmatched_criteria.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#f59e0b' }} />
                  <span className="text-xs leading-relaxed" style={{ color: '#8888a0' }}>
                    {item}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-xs" style={{ color: '#3ecf8e' }}>
                {labels.noDisqualifiers}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
