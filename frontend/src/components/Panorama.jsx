import React from 'react';

/*
  GovAssist — Living Indian Public Services Streetscape
  ─────────────────────────────────────────────────────
  Concept:
  - Rich, continuous editorial panorama showcasing 6 core public service landmarks:
    1. KRISHI SEVA KENDRA (Farmer Material & Fertilizer Shop / कृषि सेवा केंद्र)
    2. POST OFFICE / DAK GHAR (Postal Savings & Sukanya Yojana / डाक घर)
    3. HEALTH CENTRE (Primary Health Centre / Hospital / स्वास्थ्य केंद्र)
    4. VILLAGE SCHOOL (Government Primary School / सरकारी विद्यालय)
    5. PANCHAYAT BHAVAN (Village Administration & CSC Kendra)
    6. SOLAR PUMP (PM-KUSUM Solar Pump & Well / सोलर पंप)
    7. Rural Homestead, Vintage Bicycle, Utility Poles with Sagging Wires, Handpumps & Neem Trees
  - Seamless 3-layer parallax scroll (25s bg, 14s mid, 8s fore).
  - Palette: #F7F5EC ivory bg, #1A1916 lines, #6B7A6E sage green, #C2BCAD roof tan, #F2B544 yellow accent.
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

      {/* Distant Windmill & Solar Farm Silhouettes (Mid Horizon) */}
      <g opacity="0.35" fill="none" stroke={S_LINE} strokeWidth="0.5">
        <line x1="720" y1="92" x2="720" y2="70" />
        <circle cx="720" cy="70" r="1.5" />
        <line x1="720" y1="70" x2="712" y2="62" />
        <line x1="720" y1="70" x2="728" y2="62" />
        <line x1="720" y1="70" x2="720" y2="80" />

        <line x1="750" y1="92" x2="750" y2="73" />
        <circle cx="750" cy="73" r="1.5" />
        <line x1="750" y1="73" x2="744" y2="66" />
        <line x1="750" y1="73" x2="756" y2="66" />
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
      {/* ══ 1. PERSPECTIVE AGRICULTURAL FIELDS (x: 20 - 280) ══ */}
      <g stroke={P_LINE} strokeWidth="0.8">
        <line x1="30" y1="92" x2="0" y2="112" strokeWidth="1" />
        <line x1="120" y1="92" x2="30" y2="112" />
        <line x1="210" y1="92" x2="150" y2="112" />
        <line x1="290" y1="92" x2="260" y2="112" />

        <line x1="22" y1="97" x2="280" y2="97" stroke={S_LINE} strokeWidth="0.5" />
        <line x1="15" y1="102" x2="275" y2="102" stroke={S_LINE} strokeWidth="0.5" />

        {Array.from({ length: 10 }, (_, i) => (
          <line
            key={i}
            x1={35 + i * 22}
            y1="92"
            x2={15 + i * 24}
            y2="112"
            stroke={S_LINE}
            strokeWidth="0.4"
            opacity="0.6"
          />
        ))}
      </g>

      {/* ══ 2. KRISHI SEVA KENDRA / FARMER SEEDS & FERTILIZER SHOP (x: 300 - 470) ══ */}
      <g>
        <ellipse cx="310" cy="56" rx="13" ry="20" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="0.9" />
        <line x1="310" y1="36" x2="310" y2="92" stroke={P_LINE} strokeWidth="0.9" />

        <rect x="335" y="66" width="130" height="26" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.1" />
        <path d="M 326 66 L 400 48 L 474 66 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.1" />
        <rect x="332" y="66" width="136" height="7" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="1" />

        {/* Text Signboard */}
        <rect x="333" y="46" width="134" height="17" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" rx="2" />
        <text
          x="400"
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

        <rect x="385" y="73" width="22" height="19" fill={ACCENT_YELLOW} opacity="0.9" stroke={P_LINE} strokeWidth="0.9" />
        <rect x="348" y="75" width="18" height="14" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />
        <rect x="422" y="75" width="18" height="14" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />

        {/* Sacks lined up outside */}
        <ellipse cx="342" cy="90" rx="5" ry="3" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.7" />
        <ellipse cx="351" cy="90" rx="5" ry="3" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.7" />
        <ellipse cx="460" cy="90" rx="5" ry="3" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.7" />
      </g>

      {/* ══ 3. DAK GHAR / POST OFFICE (x: 500 - 640) ══ */}
      <g>
        <ellipse cx="510" cy="52" rx="11" ry="18" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="0.9" />
        <line x1="510" y1="34" x2="510" y2="92" stroke={P_LINE} strokeWidth="0.9" />

        {/* Building */}
        <rect x="525" y="64" width="105" height="28" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.1" />
        <path d="M 518 64 L 577 50 L 637 64 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.1" />

        {/* Text Signboard: POST OFFICE */}
        <rect x="532" y="47" width="90" height="16" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" rx="2" />
        <text
          x="577"
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

        {/* Entrance Door & Windows */}
        <rect x="567" y="72" width="18" height="20" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.9" />
        <rect x="538" y="73" width="16" height="12" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />
        <rect x="598" y="73" width="16" height="12" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />

        {/* Classic Red/Yellow Post Box (Letterbox) outside */}
        <rect x="626" y="80" width="8" height="12" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.8" rx="3" />
        <line x1="630" y1="92" x2="630" y2="95" stroke={P_LINE} strokeWidth="1" />
        <line x1="627" y1="84" x2="633" y2="84" stroke={P_LINE} strokeWidth="0.7" />
      </g>

      {/* ══ 4. PRIMARY HEALTH CENTRE / HOSPITAL (x: 670 - 870) ══ */}
      <g>
        <ellipse cx="680" cy="46" rx="16" ry="24" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1" />
        <line x1="680" y1="22" x2="680" y2="92" stroke={P_LINE} strokeWidth="1" />

        <rect x="690" y="87" width="165" height="5" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1" />
        <rect x="700" y="50" width="145" height="37" fill="rgba(247,245,236,0.95)" stroke={P_LINE} strokeWidth="1.3" />
        <rect x="694" y="44" width="157" height="6" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.1" />

        {/* Text Signboard: HEALTH CENTRE */}
        <rect x="715" y="26" width="115" height="17" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" rx="2" />
        <rect x="723" y="29.5" width="6" height="10" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.7" />
        <rect x="721" y="31.5" width="10" height="6" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.7" />
        <text
          x="777"
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

        <rect x="758" y="62" width="14" height="25" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.9" />
        <rect x="773" y="62" width="14" height="25" fill={ACCENT_YELLOW} opacity="0.9" stroke={P_LINE} strokeWidth="0.9" />

        <rect x="715" y="58" width="22" height="16" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="726" y1="58" x2="726" y2="74" stroke={S_LINE} strokeWidth="0.6" />
        <rect x="805" y="58" width="22" height="16" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="816" y1="58" x2="816" y2="74" stroke={S_LINE} strokeWidth="0.6" />
      </g>

      {/* ══ 5. GOVERNMENT PRIMARY SCHOOL (x: 900 - 1050) ══ */}
      <g>
        <ellipse cx="910" cy="50" rx="14" ry="20" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1" />
        <line x1="910" y1="30" x2="910" y2="92" stroke={P_LINE} strokeWidth="1" />

        {/* School Building */}
        <rect x="925" y="62" width="115" height="30" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1.2" />
        <path d="M 917 62 L 982 46 L 1047 62 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.2" />

        {/* Text Signboard: VILLAGE SCHOOL */}
        <rect x="932" y="44" width="100" height="16" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" rx="2" />
        <text
          x="982"
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

        {/* Classroom Doors & Windows */}
        <rect x="972" y="70" width="20" height="22" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.9" />
        <rect x="940" y="72" width="18" height="14" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />
        <rect x="1004" y="72" width="18" height="14" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" />

        {/* Playground Swing & Wooden Bench outside */}
        <line x1="1046" y1="78" x2="1046" y2="92" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="1056" y1="78" x2="1056" y2="92" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="1044" y1="78" x2="1058" y2="78" stroke={P_LINE} strokeWidth="1" />
        <line x1="1048" y1="78" x2="1048" y2="87" stroke={S_LINE} strokeWidth="0.5" />
        <line x1="1054" y1="78" x2="1054" y2="87" stroke={S_LINE} strokeWidth="0.5" />
        <rect x="1046" y="87" width="10" height="2" fill={P_LINE} />
      </g>

      {/* ══ 6. PANCHAYAT BHAVAN & CSC DIGITAL KENDRA (x: 1080 - 1260) ══ */}
      <g>
        <ellipse cx="1090" cy="50" rx="14" ry="22" fill={SAGE_GREEN} stroke={P_LINE} strokeWidth="1" />
        <line x1="1090" y1="28" x2="1090" y2="92" stroke={P_LINE} strokeWidth="1" />

        <rect x="1095" y="87" width="150" height="5" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="0.9" />
        <rect x="1105" y="52" width="130" height="35" fill="rgba(243,241,230,0.95)" stroke={P_LINE} strokeWidth="1.2" />
        <path d="M 1095 52 L 1170 34 L 1245 52 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1.2" />

        {/* Text Signboard: PANCHAYAT BHAVAN */}
        <rect x="1110" y="38" width="120" height="15" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" rx="2" />
        <text
          x="1170"
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

        <line x1="1125" y1="52" x2="1125" y2="87" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="1150" y1="52" x2="1150" y2="87" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="1190" y1="52" x2="1190" y2="87" stroke={P_LINE} strokeWidth="0.8" />
        <line x1="1215" y1="52" x2="1215" y2="87" stroke={P_LINE} strokeWidth="0.8" />

        <rect x="1163" y="64" width="15" height="23" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="1" />
        <rect x="1178" y="64" width="15" height="23" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" />

        <line x1="1170" y1="34" x2="1170" y2="18" stroke={P_LINE} strokeWidth="0.9" />
        <path d="M 1170 18 L 1184 23 L 1170 28 Z" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.6" />
      </g>

      {/* ══ 7. SOLAR IRRIGATION PUMP & WELL (x: 1280 - 1380) ══ */}
      <g>
        {/* Solar Panel Array */}
        <rect x="1290" y="68" width="28" height="16" fill="#F7F5EC" stroke={P_LINE} strokeWidth="1" transform="rotate(-15 1290 68)" />
        <line x1="1290" y1="76" x2="1318" y2="68" stroke={S_LINE} strokeWidth="0.6" transform="rotate(-15 1290 68)" />
        <line x1="1304" y1="68" x2="1304" y2="84" stroke={S_LINE} strokeWidth="0.6" transform="rotate(-15 1290 68)" />
        <line x1="1304" y1="84" x2="1304" y2="96" stroke={P_LINE} strokeWidth="1.2" />

        {/* Water Pump Unit & Pipe */}
        <rect x="1318" y="86" width="10" height="10" fill={ACCENT_YELLOW} stroke={P_LINE} strokeWidth="0.8" />
        <path d="M 1323 86 L 1323 78 L 1335 78 L 1335 92" fill="none" stroke={P_LINE} strokeWidth="1" />

        {/* Traditional Village Well with Pulley */}
        <ellipse cx="1350" cy="91" rx="12" ry="5" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1" />
        <line x1="1342" y1="91" x2="1342" y2="76" stroke={P_LINE} strokeWidth="0.9" />
        <line x1="1358" y1="91" x2="1358" y2="76" stroke={P_LINE} strokeWidth="0.9" />
        <line x1="1340" y1="76" x2="1360" y2="76" stroke={P_LINE} strokeWidth="1" />
        <circle cx="1350" cy="80" r="2.5" fill="none" stroke={P_LINE} strokeWidth="0.8" />

        {/* Text Signboard: SOLAR PUMP */}
        <rect x="1292" y="46" width="76" height="14" fill="#F7F5EC" stroke={P_LINE} strokeWidth="0.8" rx="1" />
        <text
          x="1330"
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

      {/* ══ 8. UTILITY POLE & SAGGING OVERHEAD WIRES (x: 1400) ══ */}
      <g stroke={P_LINE}>
        <line x1="1400" y1="30" x2="1400" y2="112" strokeWidth="1.2" />
        <line x1="1388" y1="36" x2="1412" y2="36" strokeWidth="1" />
        <line x1="1390" y1="42" x2="1410" y2="42" strokeWidth="0.8" />

        <path d="M 1400 36 Q 1280 52 1170 44" fill="none" stroke={P_LINE} strokeWidth="0.6" />
        <path d="M 1400 42 Q 1280 58 1170 50" fill="none" stroke={S_LINE} strokeWidth="0.5" />

        <path d="M 1400 36 Q 1480 48 1560 40" fill="none" stroke={P_LINE} strokeWidth="0.6" />
        <path d="M 1400 42 Q 1480 54 1560 46" fill="none" stroke={S_LINE} strokeWidth="0.5" />
      </g>

      {/* ══ 9. VINTAGE BICYCLE & HANDPUMP (x: 1440) ══ */}
      <g stroke={P_LINE} strokeWidth="0.8" fill="none">
        <circle cx="1436" cy="104" r="8" />
        <circle cx="1460" cy="104" r="8" />
        <line x1="1436" y1="104" x2="1448" y2="95" />
        <line x1="1448" y1="95" x2="1460" y2="104" />
        <line x1="1436" y1="104" x2="1446" y2="104" />
        <line x1="1446" y1="104" x2="1448" y2="95" />
        <line x1="1460" y1="104" x2="1457" y2="92" />
        <line x1="1454" y1="92" x2="1459" y2="92" />
        <line x1="1444" y1="93" x2="1451" y2="93" />
      </g>

      {/* ══ 10. RURAL HOMESTEAD & BANYAN TREE (x: 1480 - 1600) ══ */}
      <g>
        <path d="M 1490 112 L 1490 75 Q 1475 60 1460 55 M 1490 75 Q 1505 58 1520 52" fill="none" stroke={P_LINE} strokeWidth="1.1" />
        <path d="M 1450 55 Q 1490 25 1530 52 Q 1540 75 1490 75 Z" fill="rgba(217,213,200,0.22)" stroke={S_LINE} strokeWidth="0.8" />

        <rect x="1515" y="76" width="75" height="28" fill="rgba(243,241,230,0.8)" stroke={P_LINE} strokeWidth="1" />
        <path d="M 1508 76 L 1552 60 L 1596 76 Z" fill={ROOF_TAN} stroke={P_LINE} strokeWidth="1" />
      </g>
    </>
  );
}

// ── LAYER 3: Foreground Road, Driveway Dips & Lollipop Trees ──
function ForegroundArtwork() {
  return (
    <>
      <path
        d="M 0 112 L 320 112 Q 390 116 460 112 L 520 112 Q 575 116 630 112 L 710 112 Q 780 116 850 112 L 940 112 Q 990 116 1040 112 L 1110 112 Q 1175 116 1240 112 L 1600 112"
        fill="none"
        stroke={P_LINE}
        strokeWidth="1.5"
      />

      <g stroke={P_LINE} strokeWidth="0.8">
        <circle cx="270" cy="102" r="7" fill={ACCENT_YELLOW} />
        <line x1="270" y1="109" x2="270" y2="118" />

        <circle cx="286" cy="99" r="8.5" fill={SAGE_GREEN} />
        <line x1="286" y1="107.5" x2="286" y2="118" />

        <circle cx="875" cy="94" r="10" fill={ACCENT_YELLOW} />
        <line x1="875" y1="104" x2="875" y2="118" />

        <circle cx="895" cy="100" r="7.5" fill={SAGE_GREEN} />
        <line x1="895" y1="107.5" x2="895" y2="118" />
      </g>

      <line x1="180" y1="115" x2="210" y2="115" stroke={S_LINE} strokeWidth="0.6" strokeDasharray="4 4" />
      <line x1="1260" y1="115" x2="1300" y2="115" stroke={S_LINE} strokeWidth="0.6" strokeDasharray="4 4" />
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
