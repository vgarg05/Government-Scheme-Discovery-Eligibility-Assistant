import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export default function SchemeCarousel({ cards, onSchemeSelect }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!cards || cards.length === 0) return null;

  const goLeft = (e) => {
    e.stopPropagation();
    setActiveIndex(prev => (prev > 0 ? prev - 1 : cards.length - 1));
  };

  const goRight = (e) => {
    e.stopPropagation();
    setActiveIndex(prev => (prev < cards.length - 1 ? prev + 1 : 0));
  };

  const card = cards[activeIndex];

  return (
    <div
      className="animate-enter"
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        background: '#FDFBF4',
        color: 'var(--text-primary)',
        marginTop: '12px',
        marginBottom: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* ── Card Body (Clickable) ── */}
      <div
        onClick={() => onSchemeSelect && onSchemeSelect(card)}
        style={{
          padding: '20px 22px 16px',
          cursor: 'pointer',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#F8F5EA'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#FDFBF4'; }}
      >
        {/* Scheme Title */}
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
            lineHeight: 1.55,
            color: 'var(--text-muted)',
            margin: '0 0 14px 0',
          }}
        >
          {card.short_desc}
        </p>

        {/* 3 Highlight Chips */}
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
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {hl}
              </div>
            ))}
          </div>
        )}

        {/* Action Prompt */}
        <div
          style={{
            marginTop: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.07em',
            color: 'var(--amber)',
            textTransform: 'uppercase',
          }}
        >
          <span>Click to check full details</span>
          <ExternalLink style={{ width: '12px', height: '12px' }} />
        </div>
      </div>

      {/* ── Navigation Bar (Arrow Buttons + Dot Indicators) ── */}
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
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={goLeft}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--text-muted)';
            e.currentTarget.style.background = '#F0EDDF';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.background = 'var(--surface)';
          }}
        >
          <ChevronLeft style={{ width: '16px', height: '16px', color: 'var(--text-secondary)' }} />
        </button>

        {/* 6 Dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {cards.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(i);
              }}
              style={{
                width: i === activeIndex ? '16px' : '6px',
                height: '6px',
                borderRadius: i === activeIndex ? '3px' : '50%',
                background: i === activeIndex ? 'var(--accent)' : 'var(--border)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.2s',
              }}
            />
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={goRight}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--text-muted)';
            e.currentTarget.style.background = '#F0EDDF';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.background = 'var(--surface)';
          }}
        >
          <ChevronRight style={{ width: '16px', height: '16px', color: 'var(--text-secondary)' }} />
        </button>
      </div>
    </div>
  );
}
