import React from 'react';

/*
  GovAssist — Reference-Exact Living Indian Landscape & Farmer Character
  ────────────────────────────────────────────────────────────────────────
  Design & Palette (100% Faithful to Reference Image):
  - Background: #F7F5EC (warm ivory)
  - Primary Linework: #1A1916 (crisp charcoal)
  - Secondary Linework: #7D7A6E (warm gray stroke)
  - Muted Sage Green: #6B7A6E (tree foliage & bushes)
  - Warm Roof/Wall Tan: #C4C1B5 (roof tiles & secondary fills)
  - Focal Accent Yellow: #F2B544 (farmer's bag, panchayat door, foreground lollipop tree)

  Vector Character Specs (Extracted directly from Reference Crop):
  - Skin Tone: #69685B (solid warm charcoal-gray fill)
  - Topi Cap: #E2DDD0 off-white with thick rolled band
  - Shirt: Solid #FFFFFF half-sleeved short kurta with elbow cuffed sleeves and side slit
  - Trousers: #C2BCAD (front leg) & #9E988A (rear leg shadow) straight-cut pyjamas
  - Yellow Bag: #F2B544 pouch with a white document (#FFFFFF) sticking out of the top
  - Feet: Barefoot profile touching ground line
*/

const P_LINE = '#1A1916';
const S_LINE = '#7D7A6E';
const F_LINE = '#D9D5C8';
const SAGE_GREEN = '#6B7A6E';
const ROOF_TAN = '#C4C1B5';
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
        {/* Converging perspective field boundary lines */}
        <line x1="30" y1="92" x2="0" y2="112" strokeWidth="1" />
        <line x1="140" y1="92" x2="40" y2="112" />
        <line x1="250" y1="92" x2="190" y2="112" />
        <line x1="340" y1="92" x2="310" y2="112" />

        {/* Horizontal field ridge lines */}
        <line x1="22" y1="97" x2="330" y2="97" stroke={S_LINE} strokeWidth="0.5" />
        <line x1="15" y1="102" x2="322" y2="102" stroke={S_LINE} strokeWidth="0.5" />
        <line x1="8" y1="107" x2="315" y2="107" stroke={S_LINE} strokeWidth="0.5" />

        {/* Crop rows (hatch inside perspective plots) */}
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
        {/* Background Capsule Trees */}
        <g stroke={P_LINE} strokeWidth="0.9">
          {/* Tree 1 */}
          <ellipse cx="360" cy="62" rx="11" ry="17" fill={SAGE_GREEN} />
          <line x1="360" y1="45" x2="360" y2="92" />
          {/* Tree 2 */}
          <ellipse cx="380" cy="56" rx="13" ry="20" fill="rgba(196,193,181,0.6)" />
          <line x1="380" y1="36" x2="380" y2="92" />
          {/* Tree 3 */}
          <ellipse cx="500" cy="48" rx="14" ry="22" fill={SAGE_GREEN} />
          <line x1="500" y1="26" x2="500" y2="92" />
          {/* Tree 4 */}
          <ellipse cx="525" cy="58" rx="10" ry="16" fill="rgba(196,193,181,0.7)" />
          <line x1="525" y1="42" x2="525" y2="92" />
        </g>

        {/* House 1 (Double Pitched Roof) */}
        <rect x="400" y="72" width="60" height="20" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />
        <path d="M 392 72 L 430 55 L 468 72 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1" />
        <rect x="445" y="70" width="65" height="22" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />
        <path d="M 440 70 L 477 56 L 514 70 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1" />
        {/* Doors & Windows */}
        <rect x="420" y="78" width="12" height="14" fill={S_LINE} stroke={P_LINE} strokeWidth="0.8" />
        <rect x="475" y="78" width="12" height="14" fill={S_LINE} stroke={P_LINE} strokeWidth="0.8" />
        <rect x="495" y="76" width="10" height="8" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.7" />
        {/* Bush at base */}
        <path d="M 390 92 Q 400 84 410 92 Q 420 84 430 92" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="0.8" />
      </g>

      {/* ══ 3. VILLAGE HOMESTEAD 2 (x: 580 - 710) ══ */}
      <g>
        {/* Tree behind house */}
        <ellipse cx="660" cy="50" rx="14" ry="20" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="0.9" />
        <line x1="660" y1="30" x2="660" y2="92" stroke={P_LINE} strokeWidth="0.9" />

        {/* House 2 with awning window */}
        <rect x="600" y="68" width="85" height="24" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />
        <path d="M 592 68 L 642 52 L 692 68 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1" />
        <rect x="625" y="76" width="14" height="16" fill={S_LINE} stroke={P_LINE} strokeWidth="0.8" />
        {/* Window with awning shadow */}
        <rect x="655" y="75" width="16" height="10" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />
        <path d="M 652 75 L 674 75 L 671 72 L 655 72 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.7" />
      </g>

      {/* ══ 4. PANCHAYAT / GOVERNMENT OFFICE (x: 740 - 930) ══ */}
      <g>
        {/* Tree behind office */}
        <ellipse cx="765" cy="52" rx="15" ry="22" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1" />
        <line x1="765" y1="30" x2="765" y2="92" stroke={P_LINE} strokeWidth="1" />

        {/* Building Steps / Plinth */}
        <rect x="750" y="87" width="150" height="5" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.9" />

        {/* Main Flat Building Body */}
        <rect x="760" y="52" width="130" height="35" fill="rgba(243,241,230,0.95)" stroke={P_LINE} strokeWidth="1.2" />

        {/* Roof Overhang / Parapet */}
        <rect x="754" y="46" width="142" height="6" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.1" />

        {/* Yellow Accent Door */}
        <rect x="808" y="64" width="16" height="23" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="1" />
        <rect x="824" y="64" width="16" height="23" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />

        {/* Office Windows */}
        <rect x="775" y="62" width="18" height="14" fill={ACCENT_YELLOW} opacity="0.85" stroke={P_LINE} strokeWidth="0.8" />
        <rect x="852" y="62" width="18" height="14" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />

        {/* Bush right of building */}
        <path d="M 890 92 Q 902 82 915 92 Q 925 84 935 92 Z" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="0.9" />
      </g>

      {/* ══ 5. UTILITY POLE & OVERHEAD SAGGING POWER WIRES (x: 960) ══ */}
      <g stroke={P_LINE}>
        {/* Pole */}
        <line x1="960" y1="32" x2="960" y2="112" strokeWidth="1.2" />
        <line x1="948" y1="38" x2="972" y2="38" strokeWidth="1" />
        <line x1="950" y1="44" x2="970" y2="44" strokeWidth="0.8" />

        {/* Sagging Overhead Wires connecting Pole to Panchayat Roof */}
        <path d="M 960 38 Q 870 55 754 48" fill="none" stroke={P_LINE} strokeWidth="0.6" />
        <path d="M 960 44 Q 870 60 754 52" fill="none" stroke={S_LINE} strokeWidth="0.5" />

        {/* Sagging Wires continuing to Right background */}
        <path d="M 960 38 Q 1060 52 1160 42" fill="none" stroke={P_LINE} strokeWidth="0.6" />
        <path d="M 960 44 Q 1060 58 1160 48" fill="none" stroke={S_LINE} strokeWidth="0.5" />
      </g>

      {/* ══ 6. VINTAGE BICYCLE (x: 1010) ══ */}
      <g stroke={P_LINE} strokeWidth="0.8" fill="none">
        {/* Wheels */}
        <circle cx="1000" cy="104" r="8" />
        <circle cx="1024" cy="104" r="8" />
        {/* Frame */}
        <line x1="1000" y1="104" x2="1012" y2="95" />
        <line x1="1012" y1="95" x2="1024" y2="104" />
        <line x1="1000" y1="104" x2="1010" y2="104" />
        <line x1="1010" y1="104" x2="1012" y2="95" />
        {/* Handlebars & Seat */}
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
      {/* Main Road Line with Dip at Panchayat Entrance (x: 740 - 930) */}
      <path
        d="M 0 112 L 730 112 Q 815 116 900 112 L 1600 112"
        fill="none"
        stroke={P_LINE}
        strokeWidth="1.5"
      />

      {/* Foreground Lollipop Trees (x: 440 - 520) */}
      <g stroke={P_LINE} strokeWidth="0.8">
        {/* Yellow Accent Lollipop Tree */}
        <circle cx="450" cy="102" r="7" fill={ACCENT_YELLOW} />
        <line x1="450" y1="109" x2="450" y2="118" />

        {/* Sage Green Lollipop Tree */}
        <circle cx="468" cy="99" r="8.5" fill={SAGE_GREEN} />
        <line x1="468" y1="107.5" x2="468" y2="118" />

        {/* Larger Yellow Lollipop Tree */}
        <circle cx="490" cy="94" r="11" fill={ACCENT_YELLOW} />
        <line x1="490" y1="105" x2="490" y2="118" />

        {/* Sage Green Lollipop Tree */}
        <circle cx="514" cy="100" r="8" fill={SAGE_GREEN} />
        <line x1="514" y1="108" x2="514" y2="118" />
      </g>

      {/* Roadside Dash Markers */}
      <line x1="600" y1="115" x2="630" y2="115" stroke={S_LINE} strokeWidth="0.6" strokeDasharray="4 4" />
      <line x1="1020" y1="115" x2="1060" y2="115" stroke={S_LINE} strokeWidth="0.6" strokeDasharray="4 4" />
    </>
  );
}

// ── 100% REFERENCE-EXACT WALKING FARMER (ANCHORED ON LEFT AT X: 160) ──
function WalkingFarmerOnLeft() {
  const SKIN = '#69685B';
  const SHIRT = '#FFFFFF';
  const PANTS_FRONT = '#C2BCAD';
  const PANTS_BACK = '#9E988A';
  const CAP = '#E2DDD0';
  const ACCENT_BAG = '#F2B544';
  const LINE = '#1A1916';

  return (
    <g className="walk-body" style={{ transformBox: 'fill-box' }}>
      {/* ── 1. REAR ARM (Extending forward) ── */}
      <g className="walk-arm-far">
        {/* Arm skin */}
        <path
          d="M 163 76 L 175 87 C 176 88 177 88 178 86 C 178 84 177 83 175 82 L 165 74 Z"
          fill={SKIN}
          stroke={LINE}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Sleeve */}
        <path
          d="M 161 73 L 168 80 L 165 82 L 159 75 Z"
          fill={SHIRT}
          stroke={LINE}
          strokeWidth="0.8"
        />
        {/* Sleeve cuff */}
        <line x1="165" y1="82" x2="168" y2="80" stroke={LINE} strokeWidth="0.8" />
      </g>

      {/* ── 2. REAR LEG (Angled backward) ── */}
      <g className="walk-leg-far">
        {/* Rear pant leg */}
        <path
          d="M 158 88 L 146 108 L 151 109 L 163 88 Z"
          fill={PANTS_BACK}
          stroke={LINE}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Rear foot (barefoot) */}
        <path
          d="M 146 108 L 140 112 L 146 112 Z"
          fill={SKIN}
          stroke={LINE}
          strokeWidth="0.8"
        />
      </g>

      {/* ── 3. FRONT LEG (Angled forward) ── */}
      <g className="walk-leg-near">
        {/* Front pant leg */}
        <path
          d="M 160 88 L 169 108 L 175 108 L 165 88 Z"
          fill={PANTS_FRONT}
          stroke={LINE}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Front foot (barefoot) */}
        <path
          d="M 170 108 L 178 112 L 168 112 Z"
          fill={SKIN}
          stroke={LINE}
          strokeWidth="0.8"
        />
      </g>

      {/* ── 4. TORSO & WHITE SHIRT ── */}
      <path
        d="M 158 72 L 165 73 L 165 88 L 162 89 L 162 87 L 158 87 Z"
        fill={SHIRT}
        stroke={LINE}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* Side slit */}
      <line x1="162" y1="85" x2="162" y2="89" stroke={LINE} strokeWidth="0.8" />
      {/* Neck line */}
      <path d="M 159 72 C 160 74 163 74 164 73" fill="none" stroke={LINE} strokeWidth="0.8" />

      {/* ── 5. HEAD, NECK & TOPI CAP ── */}
      {/* Neck */}
      <path d="M 160 72 L 160 69 L 163 70 L 163 73 Z" fill={SKIN} stroke={LINE} strokeWidth="0.7" />
      {/* Head profile (Nose, chin, ear) */}
      <path
        d="M 160 69 C 160 66 161 63 164 63 C 166 63 168 64 168 66 C 168 67 167 68 166 69 Z"
        fill={SKIN}
        stroke={LINE}
        strokeWidth="0.8"
      />
      {/* Ear */}
      <circle cx="163" cy="66" r="0.8" fill={SKIN} stroke={LINE} strokeWidth="0.6" />

      {/* Folded Topi Cap */}
      <path
        d="M 158 63 C 158 58 168 58 168 63 Z"
        fill={CAP}
        stroke={LINE}
        strokeWidth="0.8"
      />
      {/* Thick Cap Roll Band */}
      <path
        d="M 157 62 C 157 61 169 61 169 62 C 169 64 157 64 157 62 Z"
        fill={CAP}
        stroke={LINE}
        strokeWidth="0.8"
      />

      {/* ── 6. FRONT ARM (Hanging straight down holding bag) ── */}
      <g className="walk-arm-near">
        {/* Sleeve */}
        <path
          d="M 158 72 L 164 73 L 163 80 L 157 79 Z"
          fill={SHIRT}
          stroke={LINE}
          strokeWidth="0.8"
        />
        <line x1="157" y1="79" x2="163" y2="80" stroke={LINE} strokeWidth="0.8" />

        {/* Forearm skin */}
        <path
          d="M 158 79 L 163 80 L 162 90 L 157 89 Z"
          fill={SKIN}
          stroke={LINE}
          strokeWidth="0.8"
        />
        {/* Hand */}
        <ellipse cx="159.5" cy="91" rx="2.5" ry="2" fill={SKIN} stroke={LINE} strokeWidth="0.7" />

        {/* ── 7. YELLOW BAG WITH WHITE PAPER INSERT ── */}
        {/* Bag strap handle */}
        <path d="M 158 90 Q 159 86 161 90" fill="none" stroke={LINE} strokeWidth="0.8" />
        {/* Mustard Yellow Bag Pouch */}
        <path
          d="M 154 94 C 153 103 166 103 165 94 C 165 92 154 92 154 94 Z"
          fill={ACCENT_BAG}
          stroke={LINE}
          strokeWidth="0.9"
        />
        {/* White document peeking out of bag */}
        <rect x="156.5" y="90" width="6" height="4" fill="#FFFFFF" stroke={LINE} strokeWidth="0.6" />
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
        height: '96px',
        position: 'relative',
        background: 'var(--bg)',
      }}
    >
      {/* ── LAYER 1: Background Horizon & Distant Silos (40s cycle) ── */}
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

      {/* ── LAYER 4: Reference-Exact Farmer Character (ANCHORED ON LEFT) ── */}
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
          <WalkingFarmerOnLeft />
        </svg>
      </div>
    </div>
  );
}
