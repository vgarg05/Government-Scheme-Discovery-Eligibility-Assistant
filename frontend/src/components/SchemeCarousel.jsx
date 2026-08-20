import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export default function SchemeCarousel({ cards, onSchemeSelect }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!cards || cards.length === 0) return null;

  const goLeft = () => setActiveIndex(prev => (prev > 0 ? prev - 1 : cards.length - 1));
  const goRight = () => setActiveIndex(prev => (prev < cards.length - 1 ? prev + 1 : 0));

  const card = cards[activeIndex];

  return (
    <div
      className="animate-enter"
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        background: '#FDFBF4',
        marginTop: '10px',
        marginBottom: '8px',
      }}
    >
      {/* ── Card Content ── */}
      <div
        style={{
          padding: '20px 22px 16px',
          cursor: 'pointer',
          transition: 'background 0.15s',
        }}
        onClick={() => onSchemeSelect && onSchemeSelect(card)}
        onMouseEnter={e => { e.currentTarget.style.background = '#F8F5EA'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#FDFBF4'; }}
      >
        {/* Scheme Name */}
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            color: 'var(--text-primary)',
            margin: '0 0 8px 0',
          }}
        >
          {card.name}
        </h3>

        {/* Short Description */}
        <p
          style={{
            fontSize: '13px',
            lineHeight: 1.5,
            color: 'var(--text-muted)',
            margin: '0 0 14px 0',
          }}
        >
          {card.short_desc}
        </p>

        {/* Highlight Chips */}
        {card.highlights && card.highlights.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            }}
          >
            {card.highlights.map((hl, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  background: 'var(--raised)',
                  fontSize: '12px',
                  lineHeight: 1.45,
                  color: 'var(--text-secondary)',
                  fontWeight: 450,
                }}
              >
                {hl}
              </div>
            ))}
          </div>
        )}

        {/* Click hint */}
        <div
          style={{
            marginTop: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
          }}
        >
          <span>Click to view full details</span>
          <ExternalLink style={{ width: '11px', height: '11px' }} />
        </div>
      </div>

      {/* ── Navigation Bar ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 18px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--raised)',
        }}
      >
        {/* Left Arrow */}
        <button
          onClick={goLeft}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-muted)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
          <ChevronLeft style={{ width: '16px', height: '16px', color: 'var(--text-secondary)' }} />
        </button>

        {/* Dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                width: i === activeIndex ? '18px' : '7px',
                height: '7px',
                borderRadius: i === activeIndex ? '4px' : '50%',
                background: i === activeIndex ? 'var(--accent)' : 'var(--border)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.2s',
              }}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={goRight}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-muted)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
          <ChevronRight style={{ width: '16px', height: '16px', color: 'var(--text-secondary)' }} />
        </button>
      </div>
    </div>
  );
}
