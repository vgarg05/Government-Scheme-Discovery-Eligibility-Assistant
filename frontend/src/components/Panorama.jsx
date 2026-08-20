import React from 'react';

/*
  GovAssist — Public Services & Rural Commerce Streetscape
  ─────────────────────────────────────────────────────────
  Concept:
  - Editorial horizontal panorama illustrating public services & village commerce with crisp, prominent text signboards:
    1. KRISHI SEVA KENDRA (Farmer Material & Fertilizer Shop)
    2. HEALTH CENTRE (Primary Health Centre / Hospital)
    3. PANCHAYAT BHAVAN (Village Administration & CSC Kendra)
    4. Rural Homestead, Vintage Bicycle, Utility Pole with Sagging Wires, Handpump & Fields
  - Pure continuous 3-layer parallax scroll: calm, soothing, and zero mechanical friction.
  - Color Palette: #F7F5EC background, #1A1916 lines, #6B7A6E sage green, #C2BCAD roof tan, #F2B544 yellow accent highlights.
*/

const P_LINE = '#1A1916';
const S_LINE = '#7D7A6E';
const F_LINE = '#D9D5C8';
const SAGE_GREEN = '#6B7A6E';
const ROOF_TAN = '#C2BCAD';
const ACCENT_YELLOW = '#F2B544';

// ── LAYER 1: Background Horizon & Distant Silos ──
function BackgroundArtwork() {
  return (
    <>
      {/* Low rolling horizon line */}
      <path
        d="M 0 92 Q 200 86 400 90 T 800 88 T 1200 92 T 1600 88"
        fill="none"
        stroke={F_LINE}
        strokeWidth="0.8"
        opacity="0.8"
      />

      {/* Distant Grain Silos & Water Tower (Far Left) */}
      <g opacity="0.45" fill="none" stroke={S_LINE} strokeWidth="0.6">
        <path d="M 40 92 L 40 76 A 6 6 0 0 1 52 76 L 52 92 Z" />
        <path d="M 56 92 L 56 74 A 6 6 0 0 1 68 74 L 68 92 Z" />
        <rect x="74" y="80" width="18" height="12" />
        <path d="M 72 80 L 83 72 L 94 80 Z" />
        <line x1="46" y1="70" x2="46" y2="64" />
        <line x1="62" y1="68" x2="62" y2="60" />
      </g>

      {/* Distant Tree Line & Solar Array (Far Right) */}
      <g opacity="0.4" fill="none" stroke={S_LINE} strokeWidth="0.6">
        <rect x="1420" y="82" width="28" height="10" transform="rotate(-5 1420 82)" />
        <rect x="1455" y="82" width="28" height="10" transform="rotate(-5 1455 82)" />
        <circle cx="1520" cy="76" r="11" />
        <line x1="1520" y1="87" x2="1520" y2="92" />
      </g>
    </>
  );
}

// ── LAYER 2: Midground Main Public Service Streetscape (1600px segment) ──
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

      {/* ══ 2. KRISHI SEVA KENDRA / FARMER MATERIAL & SEEDS SHOP (x: 350 - 540) ══ */}
      <g>
        {/* Background Trees */}
        <ellipse cx="360" cy="56" rx="13" ry="20" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="0.9" />
        <line x1="360" y1="36" x2="360" y2="92" stroke={P_LINE} strokeWidth="0.9" />

        {/* Shop Main Building */}
        <rect x="385" y="66" width="135" height="26" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.1" />

        {/* Sloped Roof & Awning in Yellow Accent */}
        <path d="M 376 66 L 452 48 L 528 66 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.1" />
        <rect x="382" y="66" width="141" height="7" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="1" />

        {/* Prominent Large Text Signboard: KRISHI SEVA KENDRA */}
        <rect x="385" y="46" width="134" height="17" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" rx="2" />
        <text
          x="452"
          y="58"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="9"
          fontWeight="800"
          fill={P_LINE}
          textAnchor="middle"
          letterSpacing="0.6px"
        >
          KRISHI SEVA KENDRA
        </text>

        {/* Shop Entrance & Shutters */}
        <rect x="430" y="73" width="24" height="19" fill={ACCENT_YELLOW} opacity="0.9" stroke={P_LINE} strokeWidth="0.9" />
        <rect x="398" y="75" width="20" height="14" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />
        <rect x="466" y="75" width="20" height="14" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />

        {/* Seed & Fertilizer Sacks lined up outside shop */}
        <ellipse cx="392" cy="90" rx="5" ry="3" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.7" />
        <ellipse cx="401" cy="90" rx="5" ry="3" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.7" />
        <ellipse cx="512" cy="90" rx="5" ry="3" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.7" />
      </g>

      {/* ══ 3. PRIMARY HEALTH CENTRE / RURAL HOSPITAL (x: 580 - 790) ══ */}
      <g>
        {/* Background Neem/Banyan Tree */}
        <ellipse cx="600" cy="48" rx="16" ry="24" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1" />
        <line x1="600" y1="24" x2="600" y2="92" stroke={P_LINE} strokeWidth="1" />

        {/* Hospital Building Plinth / Ramp */}
        <rect x="610" y="87" width="165" height="5" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1" />

        {/* Modern Clean Hospital Building Body */}
        <rect x="620" y="50" width="145" height="37" fill="rgba(247,245,236,0.95)" stroke={P_LINE} strokeWidth="1.3" />

        {/* Roof Parapet / Overhang */}
        <rect x="614" y="44" width="157" height="6" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.1" />

        {/* Prominent Large Text Signboard: HEALTH CENTRE */}
        <rect x="635" y="26" width="115" height="17" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" rx="2" />
        {/* Medical Cross Emblem (+) */}
        <rect x="643" y="29.5" width="6" height="10" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.7" />
        <rect x="641" y="31.5" width="10" height="6" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.7" />
        <text
          x="698"
          y="38"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="9"
          fontWeight="800"
          fill={P_LINE}
          textAnchor="middle"
          letterSpacing="0.6px"
        >
          HEALTH CENTRE
        </text>

        {/* Main Double Glass Entrance Doors */}
        <rect x="678" y="62" width="14" height="25" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.9" />
        <rect x="693" y="62" width="14" height="25" fill={ACCENT_YELLOW} opacity="0.9" stroke={P_LINE} strokeWidth="0.9" />

        {/* Windows with Glazing Lines */}
        <rect x="635" y="58" width="22" height="16" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="646" y1="58" x2="646" y2="74" stroke={S_LINE} strokeWidth="0.6" />
        <rect x="725" y="58" width="22" height="16" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="736" y1="58" x2="736" y2="74" stroke={S_LINE} strokeWidth="0.6" />
      </g>

      {/* ══ 4. PANCHAYAT BHAVAN & CSC DIGITAL KENDRA (x: 830 - 1040) ══ */}
      <g>
        {/* Background Capsule Trees */}
        <ellipse cx="845" cy="50" rx="14" ry="22" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1" />
        <line x1="845" y1="28" x2="845" y2="92" stroke={P_LINE} strokeWidth="1" />

        {/* Steps */}
        <rect x="850" y="87" width="150" height="5" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.9" />

        {/* Building Body */}
        <rect x="860" y="52" width="130" height="35" fill="rgba(243,241,230,0.95)" stroke={P_LINE} strokeWidth="1.2" />

        {/* Triangular Roof Gable */}
        <path d="M 850 52 L 925 34 L 1000 52 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.2" />

        {/* Prominent Large Text Signboard: PANCHAYAT BHAVAN */}
        <rect x="865" y="38" width="120" height="15" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" rx="2" />
        <text
          x="925"
          y="49"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="8.5"
          fontWeight="800"
          fill={P_LINE}
          textAnchor="middle"
          letterSpacing="0.6px"
        >
          PANCHAYAT BHAVAN
        </text>

        {/* Columns */}
        <line x1="880" y1="52" x2="880" y2="87" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="905" y1="52" x2="905" y2="87" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="945" y1="52" x2="945" y2="87" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="970" y1="52" x2="970" y2="87" stroke={P_LINE} strokeWidth="0.8" />

        {/* Yellow Accent Door */}
        <rect x="918" y="64" width="15" height="23" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="1" />
        <rect x="933" y="64" width="15" height="23" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />

        {/* Flag Pole & Accent Flag */}
        <line x1="925" y1="34" x2="925" y2="18" stroke={P_LINE} strokeWidth="0.9" />
        <path d="M 925 18 L 939 23 L 925 28 Z" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.6" />
      </g>

      {/* ══ 5. UTILITY POLE & SAGGING OVERHEAD WIRES (x: 1070) ══ */}
      <g stroke={P_LINE}>
        <line x1="1070" y1="30" x2="1070" y2="112" strokeWidth="1.2" />
        <line x1="1058" y1="36" x2="1082" y2="36" strokeWidth="1" />
        <line x1="1060" y1="42" x2="1080" y2="42" strokeWidth="0.8" />

        <path d="M 1070 36 Q 920 54 771 44" fill="none" stroke={P_LINE} strokeWidth="0.6" />
        <path d="M 1070 42 Q 920 60 771 50" fill="none" stroke={S_LINE} strokeWidth="0.5" />

        <path d="M 1070 36 Q 1180 50 1290 40" fill="none" stroke={P_LINE} strokeWidth="0.6" />
        <path d="M 1070 42 Q 1180 56 1290 46" fill="none" stroke={S_LINE} strokeWidth="0.5" />
      </g>

      {/* ══ 6. VINTAGE BICYCLE (x: 1110) ══ */}
      <g stroke={P_LINE} strokeWidth="0.8" fill="none">
        <circle cx="1100" cy="104" r="8" />
        <circle cx="1124" cy="104" r="8" />
        <line x1="1100" y1="104" x2="1112" y2="95" />
        <line x1="1112" y1="95" x2="1124" y2="104" />
        <line x1="1100" y1="104" x2="1110" y2="104" />
        <line x1="1110" y1="104" x2="1112" y2="95" />
        <line x1="1124" y1="104" x2="1121" y2="92" />
        <line x1="1118" y1="92" x2="1123" y2="92" />
        <line x1="1108" y1="93" x2="1115" y2="93" />
      </g>

      {/* ══ 7. RURAL HOMESTEAD & WATER PUMP (x: 1160 - 1380) ══ */}
      <g>
        <path d="M 1170 112 L 1170 75 Q 1155 60 1140 55 M 1170 75 Q 1185 58 1200 52" fill="none" stroke={P_LINE} strokeWidth="1.1" />
        <path d="M 1130 55 Q 1170 25 1210 52 Q 1220 75 1170 75 Z" fill="rgba(217,213,200,0.22)" stroke={S_LINE} strokeWidth="0.8" />

        <rect x="1230" y="76" width="95" height="28" fill="rgba(243,241,230,0.8)" stroke={P_LINE} strokeWidth="1" />
        <path d="M 1222 76 L 1277 60 L 1332 76 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1" />

        <line x1="1350" y1="112" x2="1350" y2="96" stroke={P_LINE} strokeWidth="1.2" />
        <line x1="1346" y1="96" x2="1354" y2="96" stroke={P_LINE} strokeWidth="1.2" />
        <line x1="1350" y1="99" x2="1362" y2="103" stroke={P_LINE} strokeWidth="0.9" />
      </g>

      {/* ══ 8. SECONDARY FIELD PLOTS (x: 1420 - 1600) ══ */}
      <g stroke={S_LINE} strokeWidth="0.5" opacity="0.6">
        <line x1="1420" y1="92" x2="1400" y2="112" />
        <line x1="1510" y1="92" x2="1480" y2="112" />
        <line x1="1590" y1="92" x2="1560" y2="112" />
      </g>
    </>
  );
}

// ── LAYER 3: Foreground Road, Driveway Dips & Lollipop Trees ──
function ForegroundArtwork() {
  return (
    <>
      <path
        d="M 0 112 L 380 112 Q 450 116 520 112 L 610 112 Q 690 116 775 112 L 1600 112"
        fill="none"
        stroke={P_LINE}
        strokeWidth="1.5"
      />

      <g stroke={P_LINE} strokeWidth="0.8">
        <circle cx="280" cy="102" r="7" fill={ACCENT_YELLOW} />
        <line x1="280" y1="109" x2="280" y2="118" />

        <circle cx="298" cy="99" r="8.5" fill={SAGE_GREEN} />
        <line x1="298" y1="107.5" x2="298" y2="118" />

        <circle cx="1030" cy="94" r="11" fill={ACCENT_YELLOW} />
        <line x1="1030" y1="105" x2="1030" y2="118" />

        <circle cx="1054" cy="100" r="8" fill={SAGE_GREEN} />
        <line x1="1054" y1="108" x2="1054" y2="118" />
      </g>

      <line x1="200" y1="115" x2="230" y2="115" stroke={S_LINE} strokeWidth="0.6" strokeDasharray="4 4" />
      <line x1="1140" y1="115" x2="1180" y2="115" stroke={S_LINE} strokeWidth="0.6" strokeDasharray="4 4" />
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
      {/* ── LAYER 1: Background Horizon (25s cycle) ── */}
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

      {/* ── LAYER 2: Midground Main Public Service Streetscape (14s cycle) ── */}
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

      {/* ── LAYER 3: Foreground Road, Driveway Dips & Lollipop Trees (8s cycle) ── */}
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
    </div>
  );
}
