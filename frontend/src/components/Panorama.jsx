import React from 'react';

/*
  GovAssist — Large Prominent Indian Public Services Streetscape
  ──────────────────────────────────────────────────────────────
  Concept:
  - 175px Container Height + 2400px x 70px ViewBox: Makes buildings and text signboards 60% larger.
  - Large High-Visibility Signboards (fontSize 12px - 13px, fontWeight 900):
    1. KRISHI SEVA KENDRA (Farmer Material & Fertilizer Shop / कृषि सेवा केंद्र)
    2. DAK GHAR / POST OFFICE (Postal Savings & Sukanya Yojana / डाक घर)
    3. HEALTH CENTRE (Primary Health Centre / Hospital / स्वास्थ्य केंद्र)
    4. VILLAGE SCHOOL (Government Primary School / सरकारी विद्यालय)
    5. PANCHAYAT BHAVAN (Village Administration & CSC Kendra)
    6. SOLAR PUMP (PM-KUSUM Solar Pump & Well / सोलर पंप)
    7. Rural Homestead, Vintage Bicycle, Utility Poles with Sagging Wires, Handpumps & Neem Trees
  - Palette: #F7F5EC ivory bg, #1A1916 lines, #6B7A6E sage green, #C2BCAD roof tan, #F2B544 yellow accent.
*/

const P_LINE = '#1A1916';
const S_LINE = '#7D7A6E';
const F_LINE = '#D9D5C8';
const SAGE_GREEN = '#6B7A6E';
const ROOF_TAN = '#C2BCAD';
const ACCENT_YELLOW = '#F2B544';

// ── LAYER 1: Background Horizon & Distant Silos (2400px segment) ──
function BackgroundArtwork() {
  return (
    <>
      {/* Low rolling horizon line */}
      <path
        d="M 0 70 Q 300 64 600 68 T 1200 66 T 1800 70 T 2400 66"
        fill="none"
        stroke={F_LINE}
        strokeWidth="0.8"
        opacity="0.8"
      />

      {/* Distant Grain Silos & Water Tower */}
      <g opacity="0.45" fill="none" stroke={S_LINE} strokeWidth="0.6">
        <path d="M 50 70 L 50 50 A 7 7 0 0 1 64 50 L 64 70 Z" />
        <path d="M 68 70 L 68 48 A 7 7 0 0 1 82 48 L 82 70 Z" />
        <rect x="88" y="56" width="22" height="14" />
        <path d="M 86 56 L 99 46 L 112 56 Z" />
      </g>

      {/* Distant Windmill & Solar Farm Silhouettes */}
      <g opacity="0.35" fill="none" stroke={S_LINE} strokeWidth="0.5">
        <line x1="1120" y1="70" x2="1120" y2="43" />
        <circle cx="1120" cy="43" r="2" />
        <line x1="1120" y1="43" x2="1110" y2="33" />
        <line x1="1120" y1="43" x2="1130" y2="33" />
      </g>

      {/* Distant Tree Line & Solar Array */}
      <g opacity="0.4" fill="none" stroke={S_LINE} strokeWidth="0.6">
        <rect x="2220" y="58" width="32" height="12" transform="rotate(-5 2220 58)" />
        <rect x="2260" y="58" width="32" height="12" transform="rotate(-5 2260 58)" />
        <circle cx="2330" cy="52" r="13" />
      </g>
    </>
  );
}

// ── LAYER 2: Midground Main Public Service Streetscape (60% Larger Buildings) ──
function MidgroundArtwork() {
  return (
    <>
      {/* ══ 1. PERSPECTIVE AGRICULTURAL FIELDS (x: 40 - 300) ══ */}
      <g stroke={P_LINE} strokeWidth="0.8">
        <line x1="40" y1="70" x2="0" y2="90" strokeWidth="1" />
        <line x1="140" y1="70" x2="40" y2="90" />
        <line x1="230" y1="70" x2="170" y2="90" />
        <line x1="310" y1="70" x2="280" y2="90" />

        <line x1="30" y1="75" x2="300" y2="75" stroke={S_LINE} strokeWidth="0.5" />
        <line x1="20" y1="80" x2="295" y2="80" stroke={S_LINE} strokeWidth="0.5" />

        {Array.from({ length: 10 }, (_, i) => (
          <line
            key={i}
            x1={50 + i * 24}
            y1="70"
            x2={30 + i * 26}
            y2="90"
            stroke={S_LINE}
            strokeWidth="0.4"
            opacity="0.6"
          />
        ))}
      </g>

      {/* ══ 2. KRISHI SEVA KENDRA (x: 360 - 540) ══ */}
      <g>
        <ellipse cx="370" cy="34" rx="18" ry="26" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1.1" />
        <line x1="370" y1="8" x2="370" y2="70" stroke={P_LINE} strokeWidth="1.1" />

        {/* Large Building Body */}
        <rect x="390" y="36" width="155" height="34" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.4" />
        <path d="M 378 36 L 467 14 L 557 36 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.4" />
        <rect x="385" y="36" width="165" height="9" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="1.2" />

        {/* Huge Prominent Text Signboard */}
        <rect x="380" y="12" width="175" height="22" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.3" rx="3" />
        <text
          x="467"
          y="28"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="12.5"
          fontWeight="900"
          fill={P_LINE}
          textAnchor="middle"
          letterSpacing="1px"
        >
          KRISHI SEVA KENDRA
        </text>

        {/* Entrance Door & Shutters */}
        <rect x="452" y="45" width="30" height="25" fill={ACCENT_YELLOW} opacity="0.9" stroke={P_LINE} strokeWidth="1.1" />
        <rect x="405" y="47" width="24" height="18" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />
        <rect x="502" y="47" width="24" height="18" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />

        <ellipse cx="398" cy="68" rx="7" ry="4" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.9" />
        <ellipse cx="409" cy="68" rx="7" ry="4" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.9" />
      </g>

      {/* ══ SPACIOUS BUFFER 1: Trees & Handpump (x: 560 - 720) ══ */}
      <g>
        <circle cx="620" cy="54" r="18" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1" />
        <line x1="620" y1="70" x2="620" y2="90" stroke={P_LINE} strokeWidth="1.1" />

        <line x1="680" y1="90" x2="680" y2="70" stroke={P_LINE} strokeWidth="1.4" />
        <line x1="674" y1="70" x2="686" y2="70" stroke={P_LINE} strokeWidth="1.4" />
        <line x1="680" y1="73" x2="695" y2="79" stroke={P_LINE} strokeWidth="1.1" />
      </g>

      {/* ══ 3. DAK GHAR / POST OFFICE (x: 740 - 920) ══ */}
      <g>
        <ellipse cx="750" cy="30" rx="16" ry="24" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1.1" />
        <line x1="750" y1="6" x2="750" y2="70" stroke={P_LINE} strokeWidth="1.1" />

        <rect x="765" y="34" width="135" height="36" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.4" />
        <path d="M 755 34 L 832 16 L 910 34 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.4" />

        {/* Huge Prominent Text Signboard: POST OFFICE */}
        <rect x="770" y="12" width="125" height="21" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.3" rx="3" />
        <text
          x="832"
          y="27"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="12"
          fontWeight="900"
          fill={P_LINE}
          textAnchor="middle"
          letterSpacing="1px"
        >
          POST OFFICE
        </text>

        <rect x="818" y="42" width="26" height="28" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="1.1" />
        <rect x="780" y="44" width="20" height="16" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />
        <rect x="860" y="44" width="20" height="16" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />

        {/* Red/Yellow Post Box */}
        <rect x="890" y="52" width="12" height="18" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="1" rx="3" />
        <line x1="896" y1="70" x2="896" y2="74" stroke={P_LINE} strokeWidth="1.2" />
      </g>

      {/* ══ SPACIOUS BUFFER 2: Utility Pole & Wires (x: 940 - 1110) ══ */}
      <g stroke={P_LINE}>
        <line x1="1020" y1="12" x2="1020" y2="90" strokeWidth="1.4" />
        <line x1="1004" y1="18" x2="1036" y2="18" strokeWidth="1.2" />
        <line x1="1006" y1="24" x2="1034" y2="24" strokeWidth="1" />

        <path d="M 1020 18 Q 890 32 770 24" fill="none" stroke={P_LINE} strokeWidth="0.8" />
        <path d="M 1020 24 Q 890 38 770 30" fill="none" stroke={S_LINE} strokeWidth="0.6" />
      </g>

      {/* ══ 4. PRIMARY HEALTH CENTRE / HOSPITAL (x: 1140 - 1360) ══ */}
      <g>
        <ellipse cx="1150" cy="24" rx="20" ry="28" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1.2" />
        <line x1="1150" y1="0" x2="1150" y2="70" stroke={P_LINE} strokeWidth="1.2" />

        <rect x="1160" y="65" width="195" height="5" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.1" />
        <rect x="1170" y="20" width="175" height="45" fill="rgba(247,245,236,0.95)" stroke={P_LINE} strokeWidth="1.5" />
        <rect x="1160" y="12" width="195" height="8" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.3" />

        {/* Huge Prominent Text Signboard: HEALTH CENTRE */}
        <rect x="1180" y="-8" width="155" height="22" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.3" rx="3" />
        <rect x="1192" y="-4" width="8" height="14" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.9" />
        <rect x="1189" y="-1" width="14" height="8" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.9" />
        <text
          x="1264"
          y="8"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="12.5"
          fontWeight="900"
          fill={P_LINE}
          textAnchor="middle"
          letterSpacing="1px"
        >
          HEALTH CENTRE
        </text>

        <rect x="1240" y="34" width="18" height="31" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.1" />
        <rect x="1258" y="34" width="18" height="31" fill={ACCENT_YELLOW} opacity="0.9" stroke={P_LINE} strokeWidth="1.1" />

        <rect x="1188" y="32" width="28" height="20" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />
        <rect x="1298" y="32" width="28" height="20" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />
      </g>

      {/* ══ SPACIOUS BUFFER 3: Neem Tree & Bench (x: 1380 - 1530) ══ */}
      <g>
        <ellipse cx="1440" cy="30" rx="22" ry="30" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1.2" />
        <line x1="1440" y1="0" x2="1440" y2="70" stroke={P_LINE} strokeWidth="1.2" />

        <rect x="1475" y="74" width="30" height="6" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1" />
        <line x1="1480" y1="80" x2="1480" y2="90" stroke={P_LINE} strokeWidth="1.1" />
        <line x1="1498" y1="80" x2="1498" y2="90" stroke={P_LINE} strokeWidth="1.1" />
      </g>

      {/* ══ 5. GOVERNMENT PRIMARY SCHOOL (x: 1560 - 1740) ══ */}
      <g>
        <ellipse cx="1570" cy="28" rx="18" ry="24" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1.1" />
        <line x1="1570" y1="4" x2="1570" y2="70" stroke={P_LINE} strokeWidth="1.1" />

        <rect x="1585" y="32" width="145" height="38" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.4" />
        <path d="M 1573 32 L 1657 12 L 1742 32 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.4" />

        {/* Huge Prominent Text Signboard: VILLAGE SCHOOL */}
        <rect x="1592" y="10" width="130" height="21" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.3" rx="3" />
        <text
          x="1657"
          y="25"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="12"
          fontWeight="900"
          fill={P_LINE}
          textAnchor="middle"
          letterSpacing="1px"
        >
          VILLAGE SCHOOL
        </text>

        <rect x="1643" y="44" width="28" height="26" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="1.1" />
        <rect x="1600" y="46" width="24" height="18" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />
        <rect x="1685" y="46" width="24" height="18" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />
      </g>

      {/* ══ SPACIOUS BUFFER 4: Vintage Bicycle (x: 1760 - 1910) ══ */}
      <g stroke={P_LINE} strokeWidth="1" fill="none">
        <circle cx="1820" cy="80" r="10" />
        <circle cx="1850" cy="80" r="10" />
        <line x1="1820" y1="80" x2="1835" y2="69" />
        <line x1="1835" y1="69" x2="1850" y2="80" />
        <line x1="1820" y1="80" x2="1833" y2="80" />
        <line x1="1833" y1="80" x2="1835" y2="69" />
        <line x1="1850" y1="80" x2="1846" y2="65" />
        <line x1="1841" y1="65" x2="1849" y2="65" />
      </g>

      {/* ══ 6. PANCHAYAT BHAVAN (x: 1940 - 2140) ══ */}
      <g>
        <ellipse cx="1950" cy="28" rx="18" ry="26" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1.2" />
        <line x1="1950" y1="2" x2="1950" y2="70" stroke={P_LINE} strokeWidth="1.2" />

        <rect x="1955" y="65" width="180" height="5" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.1" />
        <rect x="1965" y="22" width="160" height="43" fill="rgba(243,241,230,0.95)" stroke={P_LINE} strokeWidth="1.4" />
        <path d="M 1955 22 L 2045 0 L 2135 22 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.4" />

        {/* Huge Prominent Text Signboard: PANCHAYAT BHAVAN */}
        <rect x="1975" y="4" width="140" height="20" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.2" rx="3" />
        <text
          x="2045"
          y="18"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="12"
          fontWeight="900"
          fill={P_LINE}
          textAnchor="middle"
          letterSpacing="1px"
        >
          PANCHAYAT BHAVAN
        </text>

        <line x1="1990" y1="22" x2="1990" y2="65" stroke={P_LINE} strokeWidth="1" />
        <line x1="2020" y1="22" x2="2020" y2="65" stroke={P_LINE} strokeWidth="1" />
        <line x1="2070" y1="22" x2="2070" y2="65" stroke={P_LINE} strokeWidth="1" />
        <line x1="2100" y1="22" x2="2100" y2="65" stroke={P_LINE} strokeWidth="1" />

        <rect x="2036" y="38" width="18" height="27" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="1.1" />
        <rect x="2054" y="38" width="18" height="27" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.1" />

        <line x1="2045" y1="0" x2="2045" y2="-16" stroke={P_LINE} strokeWidth="1.1" />
        <path d="M 2045 -16 L 2063 -11 L 2045 -6 Z" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.8" />
      </g>

      {/* ══ 7. SOLAR IRRIGATION PUMP & WELL (x: 2160 - 2290) ══ */}
      <g>
        <rect x="2180" y="40" width="36" height="20" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.2" transform="rotate(-15 2180 40)" />
        <line x1="2180" y1="50" x2="2216" y2="40" stroke={S_LINE} strokeWidth="0.8" transform="rotate(-15 2180 40)" />
        <line x1="2198" y1="40" x2="2198" y2="60" stroke={S_LINE} strokeWidth="0.8" transform="rotate(-15 2180 40)" />
        <line x1="2198" y1="60" x2="2198" y2="74" stroke={P_LINE} strokeWidth="1.4" />

        <rect x="2214" y="62" width="14" height="14" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="1" />
        <path d="M 2221 62 L 2221 52 L 2235 52 L 2235 70" fill="none" stroke={P_LINE} strokeWidth="1.2" />

        <ellipse cx="2250" cy="71" rx="16" ry="6" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.2" />
        <line x1="2238" y1="71" x2="2238" y2="52" stroke={P_LINE} strokeWidth="1.1" />
        <line x1="2262" y1="71" x2="2262" y2="52" stroke={P_LINE} strokeWidth="1.1" />
        <line x1="2236" y1="52" x2="2264" y2="52" stroke={P_LINE} strokeWidth="1.2" />

        {/* Text Signboard: SOLAR PUMP */}
        <rect x="2178" y="16" width="96" height="18" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" rx="2" />
        <text
          x="2226"
          y="29"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="9.5"
          fontWeight="900"
          fill={P_LINE}
          textAnchor="middle"
          letterSpacing="0.8px"
        >
          SOLAR PUMP
        </text>
      </g>

      {/* ══ 8. RURAL HOMESTEAD & BANYAN TREE (x: 2310 - 2400) ══ */}
      <g>
        <path d="M 2325 90 L 2325 48 Q 2308 33 2290 28 M 2325 48 Q 2342 30 2360 24" fill="none" stroke={P_LINE} strokeWidth="1.3" />
        <path d="M 2280 28 Q 2325 -2 2370 26 Q 2380 48 2325 48 Z" fill="rgba(217,213,200,0.22)" stroke={S_LINE} strokeWidth="1" />

        <rect x="2350" y="48" width="85" height="38" fill="rgba(243,241,230,0.8)" stroke={P_LINE} strokeWidth="1.2" />
        <path d="M 2342 48 L 2392 28 L 2435 48 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.2" />
      </g>
    </>
  );
}

// ── LAYER 3: Foreground Road, Driveway Dips & Lollipop Trees ──
function ForegroundArtwork() {
  return (
    <>
      <path
        d="M 0 70 L 380 70 Q 450 74 520 70 L 720 70 Q 790 74 860 70 L 1100 70 Q 1170 74 1240 70 L 1500 70 Q 1570 74 1640 70 L 1860 70 Q 1930 74 2000 70 L 2400 70"
        fill="none"
        stroke={P_LINE}
        strokeWidth="1.6"
      />

      <g stroke={P_LINE} strokeWidth="0.9">
        <circle cx="320" cy="62" r="8" fill={ACCENT_YELLOW} />
        <line x1="320" y1="70" x2="320" y2="78" />

        <circle cx="340" cy="59" r="9.5" fill={SAGE_GREEN} />
        <line x1="340" y1="68.5" x2="340" y2="78" />

        <circle cx="1040" cy="54" r="11" fill={ACCENT_YELLOW} />
        <line x1="1040" y1="65" x2="1040" y2="78" />

        <circle cx="1062" cy="60" r="8.5" fill={SAGE_GREEN} />
        <line x1="1062" y1="68.5" x2="1062" y2="78" />
      </g>

      <line x1="200" y1="75" x2="240" y2="75" stroke={S_LINE} strokeWidth="0.6" strokeDasharray="4 4" />
      <line x1="1800" y1="75" x2="1840" y2="75" stroke={S_LINE} strokeWidth="0.6" strokeDasharray="4 4" />
    </>
  );
}

export default function Panorama() {
  return (
    <div
      aria-hidden="true"
      style={{
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        height: '175px',
        position: 'relative',
        background: 'var(--bg)',
      }}
    >
      {/* ── LAYER 1: Background Horizon (36s cycle) ── */}
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
        <svg viewBox="0 0 2400 70" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
          <BackgroundArtwork />
        </svg>
        <svg viewBox="0 0 2400 70" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
          <BackgroundArtwork />
        </svg>
      </div>

      {/* ── LAYER 2: Midground Main Public Service Streetscape (20s cycle) ── */}
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
        <svg viewBox="0 0 2400 70" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
          <MidgroundArtwork />
        </svg>
        <svg viewBox="0 0 2400 70" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
          <MidgroundArtwork />
        </svg>
      </div>

      {/* ── LAYER 3: Foreground Road, Driveway Dips & Lollipop Trees (12s cycle) ── */}
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
        <svg viewBox="0 0 2400 70" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
          <ForegroundArtwork />
        </svg>
        <svg viewBox="0 0 2400 70" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
          <ForegroundArtwork />
        </svg>
      </div>
    </div>
  );
}
