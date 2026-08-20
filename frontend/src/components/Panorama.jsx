import React from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import farmerWalkData from '../assets/farmer-walk.json';

/*
  GovAssist — Living Indian Landscape & Lottie Option A Character
  ─────────────────────────────────────────────────────────────────
  Architecture:
  - Uses DotLottiePlayer (Option A) for smooth 60fps skeletal vector animation.
  - Character is rendered via Lottie JSON player anchored on the left side above ground.
  - Background, Midground, and Foreground parallax layers remain untouched.
*/

const P_LINE = '#1A1916';
const S_LINE = '#858178';
const F_LINE = '#D9D5C8';
const SAGE_GREEN = '#6B7A6E';
const ROOF_TAN = '#C2BCAD';
const ACCENT_YELLOW = '#F2B544';

// ── LAYER 1: Background Horizon & Distant Structures ──
function BackgroundArtwork() {
  return (
    <>
      {/* Horizon Line */}
      <line x1="0" y1="92" x2="1600" y2="92" stroke={F_LINE} strokeWidth="0.8" opacity="0.8" />

      {/* Far Left: Distant Grain Silos & Factory/Mill Outlines */}
      <g opacity="0.45" fill="none" stroke={S_LINE} strokeWidth="0.6">
        <path d="M 40 92 L 40 76 A 6 6 0 0 1 52 76 L 52 92 Z" />
        <path d="M 56 92 L 56 74 A 6 6 0 0 1 68 74 L 68 92 Z" />
        <rect x="74" y="80" width="18" height="12" />
        <path d="M 72 80 L 83 72 L 94 80 Z" />
        <line x1="46" y1="70" x2="46" y2="64" />
        <line x1="62" y1="68" x2="62" y2="60" />
      </g>

      {/* Far Right Distant Village Silhouette */}
      <g opacity="0.4" fill="none" stroke={S_LINE} strokeWidth="0.6">
        <rect x="1450" y="78" width="22" height="14" />
        <path d="M 1446 78 L 1461 70 L 1476 78 Z" />
        <circle cx="1510" cy="74" r="10" />
        <line x1="1510" y1="84" x2="1510" y2="92" />
      </g>
    </>
  );
}

// ── LAYER 2: Midground Main Scene (Seamless 1600px segment) ──
function MidgroundArtwork() {
  return (
    <>
      {/* ══ 1. PERSPECTIVE AGRICULTURAL FIELDS (x: 20 - 320) ══ */}
      <g stroke={P_LINE} strokeWidth="0.8">
        <line x1="30" y1="92" x2="0" y2="112" strokeWidth="1" />
        <line x1="140" y1="92" x2="40" y2="112" />
        <line x1="250" y1="92" x2="190" y2="112" />
        <line x1="340" y1="92" x2="310" y2="112" />

        <line x1="22" y1="97" x2="330" y2="97" stroke={S_LINE} strokeWidth="0.5" />
        <line x1="15" y1="102" x2="322" y2="102" stroke={S_LINE} strokeWidth="0.5" />
        <line x1="8" y1="107" x2="315" y2="107" stroke={S_LINE} strokeWidth="0.5" />

        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={i}
            x1={45 + i * 22}
            y1="92"
            x2={20 + i * 24}
            y2="112"
            stroke={S_LINE}
            strokeWidth="0.4"
            opacity="0.6"
          />
        ))}
      </g>

      {/* ══ 2. VILLAGE HOMESTEAD 1 (x: 370 - 550) ══ */}
      <g>
        <g stroke={P_LINE} strokeWidth="0.9">
          <ellipse cx="360" cy="62" rx="11" ry="17" fill={SAGE_GREEN} />
          <line x1="360" y1="45" x2="360" y2="92" />
          <ellipse cx="380" cy="56" rx="13" ry="20" fill="rgba(196,193,181,0.6)" />
          <line x1="380" y1="36" x2="380" y2="92" />
          <ellipse cx="500" cy="48" rx="14" ry="22" fill={SAGE_GREEN} />
          <line x1="500" y1="26" x2="500" y2="92" />
          <ellipse cx="525" cy="58" rx="10" ry="16" fill="rgba(196,193,181,0.7)" />
          <line x1="525" y1="42" x2="525" y2="92" />
        </g>

        <rect x="400" y="72" width="60" height="20" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />
        <path d="M 392 72 L 430 55 L 468 72 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1" />
        <rect x="445" y="70" width="65" height="22" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />
        <path d="M 440 70 L 477 56 L 514 70 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1" />
        <rect x="420" y="78" width="12" height="14" fill={S_LINE} stroke={P_LINE} strokeWidth="0.8" />
        <rect x="475" y="78" width="12" height="14" fill={S_LINE} stroke={P_LINE} strokeWidth="0.8" />
        <rect x="495" y="76" width="10" height="8" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.7" />
        <path d="M 390 92 Q 400 84 410 92 Q 420 84 430 92" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="0.8" />
      </g>

      {/* ══ 3. VILLAGE HOMESTEAD 2 (x: 580 - 710) ══ */}
      <g>
        <ellipse cx="660" cy="50" rx="14" ry="20" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="0.9" />
        <line x1="660" y1="30" x2="660" y2="92" stroke={P_LINE} strokeWidth="0.9" />

        <rect x="600" y="68" width="85" height="24" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />
        <path d="M 592 68 L 642 52 L 692 68 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1" />
        <rect x="625" y="76" width="14" height="16" fill={S_LINE} stroke={P_LINE} strokeWidth="0.8" />
        <rect x="655" y="75" width="16" height="10" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />
        <path d="M 652 75 L 674 75 L 671 72 L 655 72 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.7" />
      </g>

      {/* ══ 4. PANCHAYAT / GOVERNMENT OFFICE (x: 740 - 930) ══ */}
      <g>
        <ellipse cx="765" cy="52" rx="15" ry="22" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1" />
        <line x1="765" y1="30" x2="765" y2="92" stroke={P_LINE} strokeWidth="1" />

        <rect x="750" y="87" width="150" height="5" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.9" />
        <rect x="760" y="52" width="130" height="35" fill="rgba(243,241,230,0.95)" stroke={P_LINE} strokeWidth="1.2" />
        <rect x="754" y="46" width="142" height="6" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.1" />

        <rect x="808" y="64" width="16" height="23" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="1" />
        <rect x="824" y="64" width="16" height="23" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />

        <rect x="775" y="62" width="18" height="14" fill={ACCENT_YELLOW} opacity="0.85" stroke={P_LINE} strokeWidth="0.8" />
        <rect x="852" y="62" width="18" height="14" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />

        <path d="M 890 92 Q 902 82 915 92 Q 925 84 935 92 Z" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="0.9" />
      </g>

      {/* ══ 5. UTILITY POLE & OVERHEAD SAGGING POWER WIRES (x: 960) ══ */}
      <g stroke={P_LINE}>
        <line x1="960" y1="32" x2="960" y2="112" strokeWidth="1.2" />
        <line x1="948" y1="38" x2="972" y2="38" strokeWidth="1" />
        <line x1="950" y1="44" x2="970" y2="44" strokeWidth="0.8" />

        <path d="M 960 38 Q 870 55 754 48" fill="none" stroke={P_LINE} strokeWidth="0.6" />
        <path d="M 960 44 Q 870 60 754 52" fill="none" stroke={S_LINE} strokeWidth="0.5" />

        <path d="M 960 38 Q 1060 52 1160 42" fill="none" stroke={P_LINE} strokeWidth="0.6" />
        <path d="M 960 44 Q 1060 58 1160 48" fill="none" stroke={S_LINE} strokeWidth="0.5" />
      </g>

      {/* ══ 6. VINTAGE BICYCLE (x: 1010) ══ */}
      <g stroke={P_LINE} strokeWidth="0.8" fill="none">
        <circle cx="1000" cy="104" r="8" />
        <circle cx="1024" cy="104" r="8" />
        <line x1="1000" y1="104" x2="1012" y2="95" />
        <line x1="1012" y1="95" x2="1024" y2="104" />
        <line x1="1000" y1="104" x2="1010" y2="104" />
        <line x1="1010" y1="104" x2="1012" y2="95" />
        <line x1="1024" y1="104" x2="1021" y2="92" />
        <line x1="1018" y1="92" x2="1023" y2="92" />
        <line x1="1008" y1="93" x2="1015" y2="93" />
      </g>

      {/* ══ 7. RIGHT TREES & BACKGROUND BUILDINGS (x: 1060 - 1300) ══ */}
      <g stroke={P_LINE} strokeWidth="0.9">
        <ellipse cx="1075" cy="58" rx="10" ry="16" fill="rgba(196,193,181,0.7)" />
        <line x1="1075" y1="42" x2="1075" y2="92" />

        <ellipse cx="1100" cy="46" rx="16" ry="24" fill={SAGE_GREEN} />
        <line x1="1100" y1="22" x2="1100" y2="92" />
      </g>

      {/* ══ 8. SECONDARY FIELD PLOTS (x: 1320 - 1600) ══ */}
      <g stroke={S_LINE} strokeWidth="0.5" opacity="0.6">
        <line x1="1320" y1="92" x2="1300" y2="112" />
        <line x1="1440" y1="92" x2="1410" y2="112" />
        <line x1="1560" y1="92" x2="1530" y2="112" />
      </g>
    </>
  );
}

// ── LAYER 3: Foreground Road, Curve Dip & Lollipop Trees ──
function ForegroundArtwork() {
  return (
    <>
      <path
        d="M 0 112 L 730 112 Q 815 116 900 112 L 1600 112"
        fill="none"
        stroke={P_LINE}
        strokeWidth="1.5"
      />

      <g stroke={P_LINE} strokeWidth="0.8">
        <circle cx="450" cy="102" r="7" fill={ACCENT_YELLOW} />
        <line x1="450" y1="109" x2="450" y2="118" />

        <circle cx="468" cy="99" r="8.5" fill={SAGE_GREEN} />
        <line x1="468" y1="107.5" x2="468" y2="118" />

        <circle cx="490" cy="94" r="11" fill={ACCENT_YELLOW} />
        <line x1="490" y1="105" x2="490" y2="118" />

        <circle cx="514" cy="100" r="8" fill={SAGE_GREEN} />
        <line x1="514" y1="108" x2="514" y2="118" />
      </g>

      <line x1="600" y1="115" x2="630" y2="115" stroke={S_LINE} strokeWidth="0.6" strokeDasharray="4 4" />
      <line x1="1020" y1="115" x2="1060" y2="115" stroke={S_LINE} strokeWidth="0.6" strokeDasharray="4 4" />
    </>
  );
}

export default function Panorama() {
  return (
    <div
      aria-hidden="true"
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        height: '96px',
        position: 'relative',
        background: 'var(--bg)',
      }}
    >
      {/* ── LAYER 1: Background Horizon (40s cycle) ── */}
      <div
        className="parallax-layer-bg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200%',
          height: '100%',
          display: 'flex',
        }}
      >
        <svg viewBox="0 0 1600 120" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
          <BackgroundArtwork />
        </svg>
        <svg viewBox="0 0 1600 120" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
          <BackgroundArtwork />
        </svg>
      </div>

      {/* ── LAYER 2: Midground Main Scene (22s cycle) ── */}
      <div
        className="parallax-layer-mid"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200%',
          height: '100%',
          display: 'flex',
        }}
      >
        <svg viewBox="0 0 1600 120" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
          <MidgroundArtwork />
        </svg>
        <svg viewBox="0 0 1600 120" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
          <MidgroundArtwork />
        </svg>
      </div>

      {/* ── LAYER 3: Foreground Road, Dip & Lollipop Trees (14s cycle) ── */}
      <div
        className="parallax-layer-fore"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200%',
          height: '100%',
          display: 'flex',
        }}
      >
        <svg viewBox="0 0 1600 120" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
          <ForegroundArtwork />
        </svg>
        <svg viewBox="0 0 1600 120" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
          <ForegroundArtwork />
        </svg>
      </div>

      {/* ── LAYER 4: Option A — 60fps Lottie Vector Farmer Player ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          left: '12%',
          width: '84px',
          height: '84px',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        <DotLottiePlayer
          src={farmerWalkData}
          autoplay
          loop
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
