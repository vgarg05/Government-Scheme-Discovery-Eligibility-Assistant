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
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #2A2A26',
        background: '#1A1A17',
        color: '#FFFFFF',
        marginTop: '12px',
        marginBottom: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* ── Card Body (Clickable) ── */}
      <div
        onClick={() => onSchemeSelect && onSchemeSelect(card)}
        style={{
          padding: '22px 24px 18px',
          cursor: 'pointer',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#22221E'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#1A1A17'; }}
      >
        {/* Scheme Title */}
        <h3
          style={{
            fontSize: '17px',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            color: '#FDFBF4',
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
            color: '#B0B0A8',
            margin: '0 0 16px 0',
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
              gap: '10px',
            }}
          >
            {card.highlights.map((hl, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #33332D',
                  background: '#242420',
                  fontSize: '12px',
                  lineHeight: 1.45,
                  color: '#E2E2DC',
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
            marginTop: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.07em',
            color: '#F2B544',
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
          padding: '12px 20px',
          borderTop: '1px solid #2A2A26',
          background: '#141412',
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
            border: '1px solid #33332D',
            background: '#242420',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#F2B544';
            e.currentTarget.style.background = '#2E2E28';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#33332D';
            e.currentTarget.style.background = '#242420';
          }}
        >
          <ChevronLeft style={{ width: '16px', height: '16px', color: '#E2E2DC' }} />
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
                background: i === activeIndex ? '#F2B544' : '#44443E',
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
            border: '1px solid #33332D',
            background: '#242420',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#F2B544';
            e.currentTarget.style.background = '#2E2E28';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#33332D';
            e.currentTarget.style.background = '#242420';
          }}
        >
          <ChevronRight style={{ width: '16px', height: '16px', color: '#E2E2DC' }} />
        </button>
      </div>
    </div>
  );
}
