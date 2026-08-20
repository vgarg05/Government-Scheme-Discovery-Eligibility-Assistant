import React from 'react';

/*
  GovAssist — Indian Rural / Public-Service Panorama
  ────────────────────────────────────────────────────
  Design intent:
  - Editorial architectural line art, not cartoon illustration
  - Warm ivory background, charcoal linework (#2A2720), muted fills
  - Accent (#F2B544) used exactly twice: panchayat flag + door
  - Strip height: 88px — horizontal band between hero and chat
  - Scroll speed: 50s per cycle (set in index.css .panorama-strip)
  - Seamless loop: two identical SVG copies side by side;
    animation moves the container by -50% (= one full copy width)

  SVG viewBox: 0 0 1600 120
  Ground line: y = 110
  Elements sit on y = 110 (ground)
*/

/* ── Stroke / fill constants ─────────────────────────── */
const S  = '#2A2720';     // warm charcoal — all linework
const SW = 1.1;           // default stroke width
const SWb = 1.5;          // bold stroke (building outlines, ground)
const SWf = 0.55;         // fine stroke (hatch, secondary detail)
const Ff  = 'rgba(178,170,150,0.16)';  // field fill — very muted
const Bf  = 'rgba(228,220,204,0.42)';  // building wall fill
const Rf  = 'rgba(220,212,196,0.36)';  // roof fill
const Sf  = 'rgba(215,208,192,0.40)';  // step/plinth fill
const Wf  = 'rgba(247,245,236,0.65)';  // window glazing fill
const ACCENT = '#F2B544';              // used only for flag + main door

/* ── One 1600-unit artwork period ──────────────────── */
function PanoramaArtwork() {
  return (
    <>
      {/* ─ Ground plane ─ */}
      <line x1="0" y1="110" x2="1600" y2="110" stroke={S} strokeWidth={SWb} />

      {/* ══════════ AGRICULTURAL FIELD 1 (x 24–218) ══════════ */}
      <rect x="24" y="82" width="194" height="28" fill={Ff} stroke={S} strokeWidth={SW} />
      {/* Horizontal hatch — field rows */}
      {[88, 95, 102].map(y => (
        <line key={y} x1="24" y1={y} x2="218" y2={y} stroke={S} strokeWidth={SWf} opacity="0.5" />
      ))}
      {/* Vertical field divider (two plots) */}
      <line x1="118" y1="82" x2="118" y2="110" stroke={S} strokeWidth={SWf} opacity="0.4" />

      {/* ══════════ TREE CLUSTER 1 (x 248–318) ══════════ */}
      {/* Architectural-style trees: trunk + two upper branches + lower lateral branches */}
      {[
        { x: 258, h: 34, b: 13 }, // tall
        { x: 285, h: 38, b: 15 }, // tallest
        { x: 309, h: 28, b: 11 }, // smaller
      ].map(({ x, h, b }) => (
        <g key={x}>
          <line x1={x} y1="110" x2={x} y2={110 - h} stroke={S} strokeWidth={SW} />
          {/* upper fork */}
          <line x1={x} y1={110 - h} x2={x - b} y2={110 - h - b * 0.9} stroke={S} strokeWidth={SWf + 0.1} />
          <line x1={x} y1={110 - h} x2={x + b} y2={110 - h - b * 0.9} stroke={S} strokeWidth={SWf + 0.1} />
          {/* lateral branches ~60% up */}
          <line x1={x} y1={110 - h * 0.6} x2={x - b * 0.7} y2={110 - h * 0.6 - b * 0.5} stroke={S} strokeWidth={SWf} />
          <line x1={x} y1={110 - h * 0.6} x2={x + b * 0.7} y2={110 - h * 0.6 - b * 0.5} stroke={S} strokeWidth={SWf} />
        </g>
      ))}

      {/* ══════════ PANCHAYAT BUILDING (x 354–592, focal element) ══════════ */}
      {/* Base steps / plinth */}
      <rect x="350" y="105" width="240" height="5" fill={Sf} stroke={S} strokeWidth={SWf + 0.2} />
      {/* Main body */}
      <rect x="372" y="62" width="196" height="48" fill={Bf} stroke={S} strokeWidth={SWb} />
      {/* Pediment / triangular gable */}
      <path d={`M 360 62 L 470 36 L 580 62 Z`} fill={Rf} stroke={S} strokeWidth={SWb} />
      {/* Columns — 4 thin, precise */}
      {[390, 428, 506, 544].map(cx => (
        <rect key={cx} x={cx} y="62" width="7" height="48" fill={Sf} stroke={S} strokeWidth={SWf + 0.2} />
      ))}
      {/* Main door — accent yellow (the ONLY accent on building) */}
      <rect x="454" y="80" width="32" height="30" fill={ACCENT} stroke={S} strokeWidth={SW - 0.2} />
      {/* Door arch suggestion — two small lines */}
      <path d={`M 454 80 Q 470 72 486 80`} fill="none" stroke={S} strokeWidth={SWf + 0.1} />
      {/* Flanking windows */}
      {[396, 520].map(wx => (
        <rect key={wx} x={wx} y="70" width="22" height="18" fill={Wf} stroke={S} strokeWidth={SWf + 0.2} />
      ))}
      {/* Flag pole */}
      <line x1="470" y1="36" x2="470" y2="18" stroke={S} strokeWidth={SW - 0.2} />
      {/* Flag — small, accent (second and only other accent use) */}
      <path d="M 470 18 L 484 23 L 470 28 Z" fill={ACCENT} stroke={S} strokeWidth={SWf} />

      {/* ══════════ FARMER SILHOUETTE (x 614–638) ══════════ */}
      {/* Walking figure — minimal, almost abstract */}
      <circle cx="624" cy="91" r="5.5" fill="none" stroke={S} strokeWidth={SW} />
      {/* Body */}
      <line x1="624" y1="96.5" x2="624" y2="107" stroke={S} strokeWidth={SW + 0.2} />
      {/* Arms: one forward, one back (walking pose) */}
      <line x1="624" y1="99" x2="614" y2="104" stroke={S} strokeWidth={SW - 0.1} />
      <line x1="624" y1="99" x2="635" y2="96" stroke={S} strokeWidth={SW - 0.1} />
      {/* Tool / hoe at angle */}
      <line x1="635" y1="96" x2="640" y2="110" stroke={S} strokeWidth={SW} />
      {/* Legs — mid-stride */}
      <line x1="624" y1="107" x2="617" y2="110" stroke={S} strokeWidth={SW - 0.1} />
      <line x1="624" y1="107" x2="630" y2="110" stroke={S} strokeWidth={SW - 0.1} />

      {/* ══════════ FIELD 2 — diagonal hatch (x 664–838) ══════════ */}
      <rect x="664" y="86" width="174" height="24" fill={Ff} stroke={S} strokeWidth={SW - 0.1} />
      {/* Diagonal hatch lines */}
      {Array.from({ length: 9 }, (_, i) => {
        const startX = 664 + i * 22;
        return (
          <line key={i}
            x1={Math.min(startX, 836)} y1="86"
            x2={Math.max(startX - 24, 664)} y2="110"
            stroke={S} strokeWidth={SWf} opacity="0.38"
          />
        );
      })}

      {/* ══════════ TREE CLUSTER 2 (x 870–944) ══════════ */}
      {[
        { x: 878, h: 42, b: 16 },
        { x: 910, h: 36, b: 13 },
        { x: 936, h: 26, b: 10 },
      ].map(({ x, h, b }) => (
        <g key={x}>
          <line x1={x} y1="110" x2={x} y2={110 - h} stroke={S} strokeWidth={SW} />
          <line x1={x} y1={110 - h} x2={x - b} y2={110 - h - b * 0.85} stroke={S} strokeWidth={SWf + 0.15} />
          <line x1={x} y1={110 - h} x2={x + b} y2={110 - h - b * 0.85} stroke={S} strokeWidth={SWf + 0.15} />
          <line x1={x} y1={110 - h * 0.55} x2={x - b * 0.65} y2={110 - h * 0.55 - b * 0.5} stroke={S} strokeWidth={SWf} />
          <line x1={x} y1={110 - h * 0.55} x2={x + b * 0.65} y2={110 - h * 0.55 - b * 0.5} stroke={S} strokeWidth={SWf} />
        </g>
      ))}

      {/* ══════════ SECONDARY STRUCTURE / SCHOOL (x 982–1110) ══════════ */}
      {/* Plinth */}
      <rect x="978" y="106" width="134" height="4" fill={Sf} stroke={S} strokeWidth={SWf + 0.1} />
      {/* Main body */}
      <rect x="990" y="74" width="110" height="36" fill={Bf} stroke={S} strokeWidth={SW + 0.2} />
      {/* Simple sloped roof */}
      <path d={`M 984 74 L 1045 58 L 1106 74 Z`} fill={Rf} stroke={S} strokeWidth={SW + 0.2} />
      {/* Door */}
      <rect x="1033" y="88" width="24" height="22" fill="rgba(242,181,68,0.18)" stroke={S} strokeWidth={SWf + 0.2} />
      {/* Windows */}
      {[998, 1068].map(wx => (
        <rect key={wx} x={wx} y="80" width="18" height="14" fill={Wf} stroke={S} strokeWidth={SWf + 0.1} />
      ))}

      {/* ══════════ FIELD 3 — horizontal hatch (x 1148–1348) ══════════ */}
      <rect x="1148" y="88" width="200" height="22" fill={Ff} stroke={S} strokeWidth={SW - 0.1} />
      {[94, 101, 108].map(y => (
        <line key={y} x1="1148" y1={y} x2="1348" y2={y} stroke={S} strokeWidth={SWf} opacity="0.45" />
      ))}
      {/* Irrigation channel suggestion */}
      <rect x="1248" y="106" width="50" height="4" fill="rgba(160,178,190,0.25)" stroke={S} strokeWidth={SWf} />

      {/* ══════════ TREE CLUSTER 3 (x 1382–1450) ══════════ */}
      {[
        { x: 1390, h: 30, b: 11 },
        { x: 1416, h: 38, b: 14 },
        { x: 1440, h: 26, b: 10 },
      ].map(({ x, h, b }) => (
        <g key={x}>
          <line x1={x} y1="110" x2={x} y2={110 - h} stroke={S} strokeWidth={SW} />
          <line x1={x} y1={110 - h} x2={x - b} y2={110 - h - b * 0.85} stroke={S} strokeWidth={SWf + 0.1} />
          <line x1={x} y1={110 - h} x2={x + b} y2={110 - h - b * 0.85} stroke={S} strokeWidth={SWf + 0.1} />
          <line x1={x} y1={110 - h * 0.58} x2={x - b * 0.6} y2={110 - h * 0.58 - b * 0.45} stroke={S} strokeWidth={SWf} />
          <line x1={x} y1={110 - h * 0.58} x2={x + b * 0.6} y2={110 - h * 0.58 - b * 0.45} stroke={S} strokeWidth={SWf} />
        </g>
      ))}

      {/* ══════════ CLOSING FIELD (x 1480–1600, transitions into next repeat) ══════════ */}
      <rect x="1478" y="86" width="122" height="24" fill={Ff} stroke={S} strokeWidth={SWf + 0.1} />
      {[92, 99, 106].map(y => (
        <line key={y} x1="1478" y1={y} x2="1600" y2={y} stroke={S} strokeWidth={SWf} opacity="0.4" />
      ))}
    </>
  );
}

/* ── Main component ─────────────────────────────────── */
export default function Panorama() {
  return (
    <div
      aria-hidden="true"  /* decorative — screen readers skip */
      style={{
        borderTop:    '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        overflow:     'hidden',
        height:       '88px',
        position:     'relative',
        background:   'var(--bg)',
        /* Strip should be visually secondary — restrained opacity */
        opacity:      0.58,
      }}
    >
      {/*
        Inner container is 200% wide (two SVG copies side by side).
        CSS animates it by translateX(-50%) = one copy width.
        At -50%, copy B is exactly where copy A started → seamless.
      */}
      <div
        className="panorama-strip"
        style={{
          display:  'flex',
          width:    '200%',
          height:   '100%',
        }}
      >
        {/* Copy A */}
        <svg
          viewBox="0 0 1600 120"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '50%', height: '100%', display: 'block', overflow: 'visible' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <PanoramaArtwork />
        </svg>

        {/* Copy B — identical, creates the seamless loop */}
        <svg
          viewBox="0 0 1600 120"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '50%', height: '100%', display: 'block', overflow: 'visible' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <PanoramaArtwork />
        </svg>
      </div>
    </div>
  );
}
