import React from 'react';

/*
  GovAssist — Living Indian Landscape & Walking Character
  ────────────────────────────────────────────────────────
  Design & Architecture:
  1. Character: Articulated editorial silhouette of an everyday Indian citizen
     walking in side-profile. Anatomically natural, with head, torso, shoulder-joint arms,
     hip-joint legs, knee flex, and a small shoulder bag filled with yellow accent (#F2B544).
     Uses CSS keyframe animations (walk-body, walk-leg-near, walk-leg-far, etc.) for a 
     seamless 1.1s human gait cycle with vertical bounce and cross-body arm swing.

  2. Parallax Environment:
     - Background (75s): Faint rolling horizon, distant tree silhouette line.
     - Midground (42s): Panchayat Kendra, CSC center, neem/banyan trees, electric poles,
       sloped roof homes, agricultural fields, leaning bicycle.
     - Foreground (26s): Ground road line, passing roadside grass & wheat tufts.

  3. Color Palette:
     - Background: #F7F5EC (warm ivory)
     - Primary linework: #1A1916 (charcoal black)
     - Secondary linework: #8A877D (warm gray)
     - Faint lines: #D9D5C8
     - Accent: #F2B544 (used sparingly on bag, door, flag)
*/

const P_LINE = '#1A1916';
const S_LINE = '#8A877D';
const F_LINE = '#D9D5C8';
const ACCENT = '#F2B544';

// ── Background Parallax Artwork (Faint horizon & trees) ──
function BackgroundArtwork() {
  return (
    <>
      {/* Low rolling horizon line */}
      <path
        d="M 0 92 Q 200 86 400 90 T 800 88 T 1200 92 T 1600 88"
        fill="none"
        stroke={F_LINE}
        strokeWidth="0.8"
        opacity="0.7"
      />
      {/* Faint distant tree line shapes */}
      <path
        d="M 120 91 Q 140 76 160 91 M 150 91 Q 170 78 190 91 M 480 89 Q 505 72 530 89 M 860 88 Q 885 74 910 88 M 1280 91 Q 1305 75 1330 91"
        fill="none"
        stroke={F_LINE}
        strokeWidth="0.7"
        opacity="0.6"
      />
    </>
  );
}

// ── Midground Parallax Artwork (Seamless 1600px segment) ──
function MidgroundArtwork() {
  return (
    <>
      {/* ── Segment 1: Open Agricultural Fields (0 - 320) ── */}
      <g opacity="0.85">
        <rect x="30" y="88" width="160" height="24" fill="rgba(217,213,200,0.18)" stroke={S_LINE} strokeWidth="0.7" />
        {/* Field rows */}
        <line x1="30" y1="96" x2="190" y2="96" stroke={S_LINE} strokeWidth="0.5" opacity="0.5" />
        <line x1="30" y1="104" x2="190" y2="104" stroke={S_LINE} strokeWidth="0.5" opacity="0.5" />
        {/* Boundary stones / fence posts */}
        <line x1="30" y1="84" x2="30" y2="112" stroke={S_LINE} strokeWidth="0.8" />
        <line x1="190" y1="84" x2="190" y2="112" stroke={S_LINE} strokeWidth="0.8" />
        {/* Electric pole with thin crossbar */}
        <line x1="240" y1="52" x2="240" y2="112" stroke={P_LINE} strokeWidth="0.9" />
        <line x1="232" y1="58" x2="248" y2="58" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="230" y1="56" x2="250" y2="56" stroke={S_LINE} strokeWidth="0.4" />
      </g>

      {/* ── Segment 2: Panchayat & CSC Center (350 - 640) ── */}
      <g>
        {/* Plinth */}
        <rect x="370" y="107" width="220" height="5" fill="rgba(217,213,200,0.4)" stroke={P_LINE} strokeWidth="0.8" />
        {/* Main Panchayat Building */}
        <rect x="390" y="68" width="180" height="39" fill="rgba(243,241,230,0.85)" stroke={P_LINE} strokeWidth="1.2" />
        {/* Roof Gable */}
        <path d="M 380 68 L 480 44 L 580 68 Z" fill="rgba(237,234,224,0.6)" stroke={P_LINE} strokeWidth="1.2" />
        {/* Columns */}
        <line x1="415" y1="68" x2="415" y2="107" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="445" y1="68" x2="445" y2="107" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="515" y1="68" x2="515" y2="107" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="545" y1="68" x2="545" y2="107" stroke={P_LINE} strokeWidth="0.8" />
        {/* Accent Yellow Door */}
        <rect x="468" y="82" width="24" height="25" fill={ACCENT} stroke={P_LINE} strokeWidth="1" />
        {/* Signboard */}
        <rect x="440" y="52" width="80" height="11" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="448" y1="57.5" x2="512" y2="57.5" stroke={S_LINE} strokeWidth="0.8" strokeDasharray="3 2" />
        {/* Flag Pole + Small Accent Flag */}
        <line x1="480" y1="44" x2="480" y2="28" stroke={P_LINE} strokeWidth="0.9" />
        <path d="M 480 28 L 493 32 L 480 36 Z" fill={ACCENT} stroke={P_LINE} strokeWidth="0.6" />

        {/* Leaning Bicycle next to wall */}
        <g opacity="0.85">
          <circle cx="602" cy="106" r="6" fill="none" stroke={P_LINE} strokeWidth="0.7" />
          <circle cx="618" cy="106" r="6" fill="none" stroke={P_LINE} strokeWidth="0.7" />
          <line x1="602" y1="106" x2="610" y2="99" stroke={P_LINE} strokeWidth="0.7" />
          <line x1="610" y1="99" x2="618" y2="106" stroke={P_LINE} strokeWidth="0.7" />
          <line x1="610" y1="99" x2="607" y2="93" stroke={P_LINE} strokeWidth="0.7" />
          <line x1="604" y1="93" x2="610" y2="93" stroke={P_LINE} strokeWidth="0.8" />
        </g>
      </g>

      {/* ── Segment 3: Trees & Rural Home (680 - 950) ── */}
      <g>
        {/* Banyan / Neem tree silhouette */}
        <path d="M 690 112 L 690 75 Q 675 60 660 55 M 690 75 Q 705 58 720 52 M 690 70 Q 695 50 690 40" fill="none" stroke={P_LINE} strokeWidth="1.1" />
        <path d="M 650 55 Q 690 25 730 52 Q 740 75 690 75 Q 640 75 650 55 Z" fill="rgba(217,213,200,0.22)" stroke={S_LINE} strokeWidth="0.8" />

        {/* Rural Home with Sloped Roof */}
        <rect x="760" y="80" width="110" height="32" fill="rgba(243,241,230,0.7)" stroke={P_LINE} strokeWidth="1" />
        <path d="M 752 80 L 815 64 L 878 80 Z" fill="rgba(228,220,204,0.5)" stroke={P_LINE} strokeWidth="1" />
        <rect x="800" y="92" width="16" height="20" fill="rgba(138,135,125,0.2)" stroke={P_LINE} strokeWidth="0.8" />
        <rect x="772" y="88" width="14" height="12" fill="#F7F5EC" stroke={S_LINE} strokeWidth="0.7" />
      </g>

      {/* ── Segment 4: Agricultural Boundary & Handpump (1000 - 1280) ── */}
      <g>
        {/* Handpump outline */}
        <line x1="1010" y1="112" x2="1010" y2="96" stroke={P_LINE} strokeWidth="1.2" />
        <line x1="1006" y1="96" x2="1014" y2="96" stroke={P_LINE} strokeWidth="1.2" />
        <line x1="1010" y1="99" x2="1022" y2="103" stroke={P_LINE} strokeWidth="0.9" />

        {/* Diagonal hatched crops */}
        <rect x="1050" y="86" width="180" height="26" fill="rgba(217,213,200,0.18)" stroke={S_LINE} strokeWidth="0.7" />
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={i}
            x1={1050 + i * 22}
            y1="86"
            x2={1040 + i * 22}
            y2="112"
            stroke={S_LINE}
            strokeWidth="0.5"
            opacity="0.4"
          />
        ))}

        {/* Electric pole 2 */}
        <line x1="1310" y1="52" x2="1310" y2="112" stroke={P_LINE} strokeWidth="0.9" />
        <line x1="1302" y1="58" x2="1318" y2="58" stroke={P_LINE} strokeWidth="0.8" />
      </g>

      {/* ── Segment 5: Small Homestead & Tree (1340 - 1600) ── */}
      <g>
        <rect x="1370" y="84" width="95" height="28" fill="rgba(243,241,230,0.7)" stroke={P_LINE} strokeWidth="0.9" />
        <path d="M 1362 84 L 1417 70 L 1472 84 Z" fill="rgba(228,220,204,0.5)" stroke={P_LINE} strokeWidth="0.9" />
        
        {/* Tree cluster */}
        <path d="M 1520 112 L 1520 72 M 1520 72 L 1505 58 M 1520 72 L 1535 56" stroke={P_LINE} strokeWidth="1" />
        <circle cx="1505" cy="54" r="12" fill="rgba(217,213,200,0.25)" stroke={S_LINE} strokeWidth="0.7" />
        <circle cx="1535" cy="52" r="14" fill="rgba(217,213,200,0.25)" stroke={S_LINE} strokeWidth="0.7" />
      </g>
    </>
  );
}

// ── Foreground Parallax Artwork (Ground road line + passing grass) ──
function ForegroundArtwork() {
  return (
    <>
      {/* Continuous main ground road line */}
      <line x1="0" y1="112" x2="1600" y2="112" stroke={P_LINE} strokeWidth="1.4" />

      {/* Sparse roadside grass / wheat tufts */}
      <path
        d="M 80 112 L 78 106 M 83 112 L 85 104 M 310 112 L 307 105 M 312 112 L 315 104 M 670 112 L 667 105 M 980 112 L 977 106 M 983 112 L 986 104 M 1420 112 L 1417 105"
        stroke={S_LINE}
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </>
  );
}

// ── Walking Indian Person Character (Editorial Silhouette) ──
function WalkingCharacter() {
  /*
    Articulated Silhouette Structure:
    Hip joint: (x: 180, y: 92)
    Ground level: y = 112
    Body Height: ~36px
  */
  return (
    <g className="walk-body" style={{ transformBox: 'fill-box' }}>
      {/* 1. FAR ARM (Behind torso) */}
      <g className="walk-arm-far">
        <line x1="180" y1="80" x2="175" y2="94" stroke={P_LINE} strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* 2. FAR LEG (Behind) */}
      <g className="walk-leg-far">
        <line x1="180" y1="92" x2="177" y2="102" stroke={P_LINE} strokeWidth="1.6" strokeLinecap="round" />
        <g className="walk-shin-far">
          <line x1="177" y1="102" x2="175" y2="112" stroke={P_LINE} strokeWidth="1.4" strokeLinecap="round" />
        </g>
      </g>

      {/* 3. TORSO & HEAD */}
      {/* Head */}
      <circle cx="180" cy="71" r="4.2" fill={P_LINE} />
      {/* Neck */}
      <line x1="180" y1="75.2" x2="180" y2="78" stroke={P_LINE} strokeWidth="1.5" />
      {/* Torso (slight forward tilt) */}
      <line x1="180" y1="78" x2="180" y2="92" stroke={P_LINE} strokeWidth="2.4" strokeLinecap="round" />
      
      {/* Shoulder Bag / Document Bag (Accented in Yellow #F2B544) */}
      <path
        d="M 178 79 L 184 91 L 177 94 L 173 82 Z"
        fill={ACCENT}
        stroke={P_LINE}
        strokeWidth="0.8"
      />
      {/* Bag Strap across shoulder */}
      <line x1="177" y1="78" x2="182" y2="91" stroke={P_LINE} strokeWidth="0.9" />

      {/* 4. NEAR LEG (Front) */}
      <g className="walk-leg-near">
        <line x1="180" y1="92" x2="183" y2="102" stroke={P_LINE} strokeWidth="1.8" strokeLinecap="round" />
        <g className="walk-shin-near">
          <line x1="183" y1="102" x2="185" y2="112" stroke={P_LINE} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>

      {/* 5. NEAR ARM (Front, holding walking stick / rolled document) */}
      <g className="walk-arm-near">
        <line x1="180" y1="80" x2="187" y2="93" stroke={P_LINE} strokeWidth="1.6" strokeLinecap="round" />
        {/* Rolled document / stick */}
        <line x1="185" y1="89" x2="191" y2="97" stroke={S_LINE} strokeWidth="1.1" strokeLinecap="round" />
      </g>
    </g>
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
        height: '92px',
        position: 'relative',
        background: 'var(--bg)',
      }}
    >
      {/* ── LAYER 1: Background Parallax (75s cycle) ── */}
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

      {/* ── LAYER 2: Midground Parallax (42s cycle) ── */}
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

      {/* ── LAYER 3: Foreground Parallax (26s cycle) ── */}
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

      {/* ── LAYER 4: Stationary Character (Walk cycle active relative to moving ground) ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <svg viewBox="0 0 1600 120" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
          <WalkingCharacter />
        </svg>
      </div>
    </div>
  );
}
