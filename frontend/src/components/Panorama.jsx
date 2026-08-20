import React from 'react';

/*
  GovAssist — Spacious Living Indian Public Services Streetscape
  ──────────────────────────────────────────────────────────────
  Concept:
  - 2400px Wide ViewBox: Gives generous, natural breathing space between each public landmark.
  - Landmarks:
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
        d="M 0 92 Q 300 86 600 90 T 1200 88 T 1800 92 T 2400 88"
        fill="none"
        stroke={F_LINE}
        strokeWidth="0.8"
        opacity="0.8"
      />

      {/* Distant Grain Silos & Water Tower (Far Left) */}
      <g opacity="0.45" fill="none" stroke={S_LINE} strokeWidth="0.6">
        <path d="M 50 92 L 50 76 A 6 6 0 0 1 62 76 L 62 92 Z" />
        <path d="M 66 92 L 66 74 A 6 6 0 0 1 78 74 L 78 92 Z" />
        <rect x="84" y="80" width="18" height="12" />
        <path d="M 82 80 L 93 72 L 104 80 Z" />
        <line x1="56" y1="70" x2="56" y2="64" />
        <line x1="72" y1="68" x2="72" y2="60" />
      </g>

      {/* Distant Windmill & Solar Farm Silhouettes (Mid Horizon) */}
      <g opacity="0.35" fill="none" stroke={S_LINE} strokeWidth="0.5">
        <line x1="1120" y1="92" x2="1120" y2="70" />
        <circle cx="1120" cy="70" r="1.5" />
        <line x1="1120" y1="70" x2="1112" y2="62" />
        <line x1="1120" y1="70" x2="1128" y2="62" />

        <line x1="1150" y1="92" x2="1150" y2="73" />
        <circle cx="1150" cy="73" r="1.5" />
        <line x1="1150" y1="73" x2="1144" y2="66" />
        <line x1="1150" y1="73" x2="1156" y2="66" />
      </g>

      {/* Distant Tree Line & Solar Array (Far Right) */}
      <g opacity="0.4" fill="none" stroke={S_LINE} strokeWidth="0.6">
        <rect x="2220" y="82" width="28" height="10" transform="rotate(-5 2220 82)" />
        <rect x="2255" y="82" width="28" height="10" transform="rotate(-5 2255 82)" />
        <circle cx="2320" cy="76" r="11" />
        <line x1="2320" y1="87" x2="2320" y2="92" />
      </g>
    </>
  );
}

// ── LAYER 2: Midground Main Public Service Streetscape (Spacious 2400px Segment) ──
function MidgroundArtwork() {
  return (
    <>
      {/* ══ 1. PERSPECTIVE AGRICULTURAL FIELDS (x: 40 - 300) ══ */}
      <g stroke={P_LINE} strokeWidth="0.8">
        <line x1="40" y1="92" x2="0" y2="112" strokeWidth="1" />
        <line x1="140" y1="92" x2="40" y2="112" />
        <line x1="230" y1="92" x2="170" y2="112" />
        <line x1="310" y1="92" x2="280" y2="112" />

        <line x1="30" y1="97" x2="300" y2="97" stroke={S_LINE} strokeWidth="0.5" />
        <line x1="20" y1="102" x2="295" y2="102" stroke={S_LINE} strokeWidth="0.5" />

        {Array.from({ length: 10 }, (_, i) => (
          <line
            key={i}
            x1={50 + i * 24}
            y1="92"
            x2={30 + i * 26}
            y2="112"
            stroke={S_LINE}
            strokeWidth="0.4"
            opacity="0.6"
          />
        ))}
      </g>

      {/* ══ 2. KRISHI SEVA KENDRA (x: 360 - 520) ══ */}
      <g>
        <ellipse cx="370" cy="56" rx="13" ry="20" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="0.9" />
        <line x1="370" y1="36" x2="370" y2="92" stroke={P_LINE} strokeWidth="0.9" />

        <rect x="395" y="66" width="125" height="26" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.1" />
        <path d="M 387 66 L 457 48 L 527 66 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.1" />
        <rect x="392" y="66" width="131" height="7" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="1" />

        {/* Text Signboard */}
        <rect x="391" y="46" width="134" height="17" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" rx="2" />
        <text
          x="458"
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

        <rect x="444" y="73" width="22" height="19" fill={ACCENT_YELLOW} opacity="0.9" stroke={P_LINE} strokeWidth="0.9" />
        <rect x="408" y="75" width="18" height="14" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />
        <rect x="480" y="75" width="18" height="14" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />

        <ellipse cx="402" cy="90" rx="5" ry="3" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.7" />
        <ellipse cx="411" cy="90" rx="5" ry="3" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.7" />
      </g>

      {/* ══ SPACIOUS BUFFER 1: Trees & Handpump (x: 540 - 700) ══ */}
      <g>
        <circle cx="580" cy="80" r="14" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="0.8" />
        <line x1="580" y1="94" x2="580" y2="112" stroke={P_LINE} strokeWidth="0.9" />

        <line x1="640" y1="112" x2="640" y2="96" stroke={P_LINE} strokeWidth="1.2" />
        <line x1="636" y1="96" x2="644" y2="96" stroke={P_LINE} strokeWidth="1.2" />
        <line x1="640" y1="99" x2="652" y2="103" stroke={P_LINE} strokeWidth="0.9" />
      </g>

      {/* ══ 3. DAK GHAR / POST OFFICE (x: 740 - 880) ══ */}
      <g>
        <ellipse cx="750" cy="52" rx="11" ry="18" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="0.9" />
        <line x1="750" y1="34" x2="750" y2="92" stroke={P_LINE} strokeWidth="0.9" />

        <rect x="765" y="64" width="105" height="28" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.1" />
        <path d="M 758 64 L 817 50 L 877 64 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.1" />

        {/* Text Signboard: POST OFFICE */}
        <rect x="772" y="47" width="90" height="16" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" rx="2" />
        <text
          x="817"
          y="58"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="8.5"
          fontWeight="800"
          fill={P_LINE}
          textAnchor="middle"
          letterSpacing="0.6px"
        >
          POST OFFICE
        </text>

        <rect x="807" y="72" width="18" height="20" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.9" />
        <rect x="778" y="73" width="16" height="12" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />
        <rect x="838" y="73" width="16" height="12" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />

        {/* Red/Yellow Post Box */}
        <rect x="866" y="80" width="8" height="12" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.8" rx="3" />
        <line x1="870" y1="92" x2="870" y2="95" stroke={P_LINE} strokeWidth="1" />
      </g>

      {/* ══ SPACIOUS BUFFER 2: Utility Pole & Sagging Wires (x: 900 - 1080) ══ */}
      <g stroke={P_LINE}>
        <line x1="980" y1="30" x2="980" y2="112" strokeWidth="1.2" />
        <line x1="968" y1="36" x2="992" y2="36" strokeWidth="1" />
        <line x1="970" y1="42" x2="990" y2="42" strokeWidth="0.8" />

        <path d="M 980 36 Q 860 52 760 44" fill="none" stroke={P_LINE} strokeWidth="0.6" />
        <path d="M 980 42 Q 860 58 760 50" fill="none" stroke={S_LINE} strokeWidth="0.5" />
      </g>

      {/* ══ 4. PRIMARY HEALTH CENTRE / HOSPITAL (x: 1120 - 1310) ══ */}
      <g>
        <ellipse cx="1130" cy="46" rx="16" ry="24" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1" />
        <line x1="1130" y1="22" x2="1130" y2="92" stroke={P_LINE} strokeWidth="1" />

        <rect x="1140" y="87" width="165" height="5" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1" />
        <rect x="1150" y="50" width="145" height="37" fill="rgba(247,245,236,0.95)" stroke={P_LINE} strokeWidth="1.3" />
        <rect x="1144" y="44" width="157" height="6" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.1" />

        {/* Text Signboard: HEALTH CENTRE */}
        <rect x="1165" y="26" width="115" height="17" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" rx="2" />
        <rect x="1173" y="29.5" width="6" height="10" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.7" />
        <rect x="1171" y="31.5" width="10" height="6" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.7" />
        <text
          x="1227"
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

        <rect x="1208" y="62" width="14" height="25" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.9" />
        <rect x="1223" y="62" width="14" height="25" fill={ACCENT_YELLOW} opacity="0.9" stroke={P_LINE} strokeWidth="0.9" />

        <rect x="1165" y="58" width="22" height="16" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />
        <rect x="1255" y="58" width="22" height="16" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />
      </g>

      {/* ══ SPACIOUS BUFFER 3: Neem Tree & Bench (x: 1330 - 1480) ══ */}
      <g>
        <ellipse cx="1400" cy="52" rx="18" ry="26" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1" />
        <line x1="1400" y1="26" x2="1400" y2="92" stroke={P_LINE} strokeWidth="1" />

        {/* Wooden Bench under tree */}
        <rect x="1430" y="98" width="24" height="4" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.8" />
        <line x1="1434" y1="102" x2="1434" y2="112" stroke={P_LINE} strokeWidth="0.9" />
        <line x1="1450" y1="102" x2="1450" y2="112" stroke={P_LINE} strokeWidth="0.9" />
      </g>

      {/* ══ 5. GOVERNMENT PRIMARY SCHOOL (x: 1520 - 1670) ══ */}
      <g>
        <ellipse cx="1530" cy="50" rx="14" ry="20" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1" />
        <line x1="1530" y1="30" x2="1530" y2="92" stroke={P_LINE} strokeWidth="1" />

        <rect x="1545" y="62" width="115" height="30" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.2" />
        <path d="M 1537 62 L 1602 46 L 1667 62 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.2" />

        {/* Text Signboard: VILLAGE SCHOOL */}
        <rect x="1552" y="44" width="100" height="16" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" rx="2" />
        <text
          x="1602"
          y="55"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="8.5"
          fontWeight="800"
          fill={P_LINE}
          textAnchor="middle"
          letterSpacing="0.6px"
        >
          VILLAGE SCHOOL
        </text>

        <rect x="1592" y="70" width="20" height="22" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.9" />
        <rect x="1560" y="72" width="18" height="14" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />
        <rect x="1624" y="72" width="18" height="14" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />
      </g>

      {/* ══ SPACIOUS BUFFER 4: Vintage Bicycle (x: 1690 - 1840) ══ */}
      <g stroke={P_LINE} strokeWidth="0.8" fill="none">
        <circle cx="1740" cy="104" r="8" />
        <circle cx="1764" cy="104" r="8" />
        <line x1="1740" y1="104" x2="1752" y2="95" />
        <line x1="1752" y1="95" x2="1764" y2="104" />
        <line x1="1740" y1="104" x2="1750" y2="104" />
        <line x1="1750" y1="104" x2="1752" y2="95" />
        <line x1="1764" y1="104" x2="1761" y2="92" />
        <line x1="1758" y1="92" x2="1763" y2="92" />
      </g>

      {/* ══ 6. PANCHAYAT BHAVAN & CSC DIGITAL KENDRA (x: 1880 - 2060) ══ */}
      <g>
        <ellipse cx="1890" cy="50" rx="14" ry="22" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1" />
        <line x1="1890" y1="28" x2="1890" y2="92" stroke={P_LINE} strokeWidth="1" />

        <rect x="1895" y="87" width="150" height="5" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.9" />
        <rect x="1905" y="52" width="130" height="35" fill="rgba(243,241,230,0.95)" stroke={P_LINE} strokeWidth="1.2" />
        <path d="M 1895 52 L 1970 34 L 2045 52 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.2" />

        {/* Text Signboard: PANCHAYAT BHAVAN */}
        <rect x="1910" y="38" width="120" height="15" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" rx="2" />
        <text
          x="1970"
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

        <line x1="1925" y1="52" x2="1925" y2="87" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="1950" y1="52" x2="1950" y2="87" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="1990" y1="52" x2="1990" y2="87" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="2015" y1="52" x2="2015" y2="87" stroke={P_LINE} strokeWidth="0.8" />

        <rect x="1963" y="64" width="15" height="23" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="1" />
        <rect x="1978" y="64" width="15" height="23" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />

        <line x1="1970" y1="34" x2="1970" y2="18" stroke={P_LINE} strokeWidth="0.9" />
        <path d="M 1970 18 L 1984 23 L 1970 28 Z" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.6" />
      </g>

      {/* ══ 7. SOLAR IRRIGATION PUMP & WELL (x: 2080 - 2200) ══ */}
      <g>
        <rect x="2100" y="68" width="28" height="16" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" transform="rotate(-15 2100 68)" />
        <line x1="2100" y1="76" x2="2128" y2="68" stroke={S_LINE} strokeWidth="0.6" transform="rotate(-15 2100 68)" />
        <line x1="2114" y1="68" x2="2114" y2="84" stroke={S_LINE} strokeWidth="0.6" transform="rotate(-15 2100 68)" />
        <line x1="2114" y1="84" x2="2114" y2="96" stroke={P_LINE} strokeWidth="1.2" />

        <rect x="2128" y="86" width="10" height="10" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.8" />
        <path d="M 2133 86 L 2133 78 L 2145 78 L 2145 92" fill="none" stroke={P_LINE} strokeWidth="1" />

        <ellipse cx="2160" cy="91" rx="12" ry="5" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1" />
        <line x1="2152" y1="91" x2="2152" y2="76" stroke={P_LINE} strokeWidth="0.9" />
        <line x1="2168" y1="91" x2="2168" y2="76" stroke={P_LINE} strokeWidth="0.9" />
        <line x1="2150" y1="76" x2="2170" y2="76" stroke={P_LINE} strokeWidth="1" />

        {/* Text Signboard: SOLAR PUMP */}
        <rect x="2102" y="46" width="76" height="14" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" rx="1" />
        <text
          x="2140"
          y="56"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="7"
          fontWeight="800"
          fill={P_LINE}
          textAnchor="middle"
          letterSpacing="0.4px"
        >
          SOLAR PUMP
        </text>
      </g>

      {/* ══ 8. RURAL HOMESTEAD & BANYAN TREE (x: 2240 - 2400) ══ */}
      <g>
        <path d="M 2260 112 L 2260 75 Q 2245 60 2230 55 M 2260 75 Q 2275 58 2290 52" fill="none" stroke={P_LINE} strokeWidth="1.1" />
        <path d="M 2220 55 Q 2260 25 2300 52 Q 2310 75 2260 75 Z" fill="rgba(217,213,200,0.22)" stroke={S_LINE} strokeWidth="0.8" />

        <rect x="2285" y="76" width="85" height="28" fill="rgba(243,241,230,0.8)" stroke={P_LINE} strokeWidth="1" />
        <path d="M 2278 76 L 2327 60 L 2376 76 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1" />
      </g>
    </>
  );
}

// ── LAYER 3: Foreground Road, Driveway Dips & Lollipop Trees (2400px segment) ──
function ForegroundArtwork() {
  return (
    <>
      <path
        d="M 0 112 L 380 112 Q 450 116 520 112 L 720 112 Q 790 116 860 112 L 1100 112 Q 1170 116 1240 112 L 1500 112 Q 1570 116 1640 112 L 1860 112 Q 1930 116 2000 112 L 2400 112"
        fill="none"
        stroke={P_LINE}
        strokeWidth="1.5"
      />

      <g stroke={P_LINE} strokeWidth="0.8">
        <circle cx="320" cy="102" r="7" fill={ACCENT_YELLOW} />
        <line x1="320" y1="109" x2="320" y2="118" />

        <circle cx="338" cy="99" r="8.5" fill={SAGE_GREEN} />
        <line x1="338" y1="107.5" x2="338" y2="118" />

        <circle cx="1040" cy="94" r="10" fill={ACCENT_YELLOW} />
        <line x1="1040" y1="104" x2="1040" y2="118" />

        <circle cx="1060" cy="100" r="7.5" fill={SAGE_GREEN} />
        <line x1="1060" y1="107.5" x2="1060" y2="118" />
      </g>

      <line x1="200" y1="115" x2="240" y2="115" stroke={S_LINE} strokeWidth="0.6" strokeDasharray="4 4" />
      <line x1="1800" y1="115" x2="1840" y2="115" stroke={S_LINE} strokeWidth="0.6" strokeDasharray="4 4" />
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
        height: '128px',
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
        <svg viewBox="0 0 2400 120" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
          <BackgroundArtwork />
        </svg>
        <svg viewBox="0 0 2400 120" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
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
        <svg viewBox="0 0 2400 120" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
          <MidgroundArtwork />
        </svg>
        <svg viewBox="0 0 2400 120" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
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
        <svg viewBox="0 0 2400 120" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
          <ForegroundArtwork />
        </svg>
        <svg viewBox="0 0 2400 120" preserveAspectRatio="xMidYMid meet" style={{ width: '50%', height: '100%' }}>
          <ForegroundArtwork />
        </svg>
      </div>
    </div>
  );
}
