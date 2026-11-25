// Softly Rising — shared drawing helpers (SVG strings), deterministic.

function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

// Four-point sparkle star path centered at 0,0
function sparkle(r) {
  const k = r * 0.18;
  return `M0,${-r} C${k},${-k} ${k},${-k} ${r},0 C${k},${k} ${k},${k} 0,${r} C${-k},${k} ${-k},${k} ${-r},0 C${-k},${-k} ${-k},${-k} 0,${-r}Z`;
}

// Star field as SVG circles. twinkle: 0..1 phase for animation.
function starfield({ w, h, count = 200, seed = 7, maxY = h, twinkle = 0, sizeScale = 1, colors = ["#ffffff", "#f6e2ae", "#e3a1b4"], opScale = 1 }) {
  const r = rng(seed);
  let out = "";
  for (let i = 0; i < count; i++) {
    const x = r() * w, y = r() * maxY;
    const big = r() < 0.06;
    const rad = (big ? 1.6 + r() * 1.4 : 0.4 + r() * 1.0) * sizeScale;
    const ph = r() * Math.PI * 2, sp = 0.6 + r() * 1.6;
    const fade = 1 - (y / maxY) * 0.65;               // fainter near horizon
    const tw = 0.55 + 0.45 * Math.sin(ph + twinkle * Math.PI * 2 * sp);
    const op = Math.max(0, (0.35 + r() * 0.65) * fade * tw * opScale);
    const col = r() < 0.15 ? colors[1] : (r() < 0.2 ? colors[2] : colors[0]);
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(2)}" fill="${col}" opacity="${op.toFixed(3)}"/>`;
    if (big && rad > 2.2 * sizeScale)
      out += `<path d="${sparkle(rad * 3.2)}" transform="translate(${x.toFixed(1)},${y.toFixed(1)})" fill="${col}" opacity="${(op * 0.8).toFixed(3)}"/>`;
  }
  return out;
}

// Default palette = original night/gold look. Themes override any key.
const DEFAULT_P = { glowA:"#f6e2ae", glowB:"#e3a1b4", moonHi:"#fffaf0", moonMid:"#f5efe3", moonLo:"#e6cfa8",
  crater:"#d9c3a0", line:"#e8c47a", lineHi:"#f6e2ae", refl:"#f6e2ae", spark1:"#f6e2ae", spark2:"#ffffff",
  dot:"#f6e2ae", style:"soft", glowOp:1, lineW:1.1 };

// The brand mark: a moon rising over a horizon. viewBox 200x200.
// style: "soft" (gradients+glow) | "flat" (print: solid moon, no glow) | "line" (outline / eclipse ring)
function moonMark({ rise = 1, glow = 1, id = "m", reflection = true, orbit = 1, spark = 1, orbitDraw = 1, P = {} } = {}) {
  P = Object.assign({}, DEFAULT_P, P);
  const hy = 122, R = 42;
  const cy = hy + R + 4 - rise * (R + 4 + 10);
  const reflOp = Math.max(0, Math.min(1, (rise - 0.2) / 0.8));
  let refl = "";
  if (reflection) {
    const rows = [[6, 62], [14, 44], [22, 30], [31, 18], [41, 9]];
    rows.forEach(([dy, half], i) => {
      const fill = P.style === "soft" ? `url(#rf${id})` : P.refl;
      refl += `<rect x="${100 - half}" y="${hy + dy}" width="${half * 2}" height="${(2.2 - i * 0.25) * (P.style==="soft"?1:1.3)}" rx="1.1" fill="${fill}" opacity="${(P.style==="soft"?0.55 - i * 0.09:0.9 - i*0.14) * reflOp}"/>`;
    });
  }
  const a = 0.72, ox = 100 + 64 * Math.cos(a), oy = hy - 64 * Math.sin(a);
  let moon;
  if (P.style === "line") {
    moon = `<circle cx="100" cy="${cy}" r="${R}" fill="${P.moonLo}" stroke="${P.moonHi}" stroke-width="2.4"/>
      <circle cx="100" cy="${cy}" r="${R - 7}" fill="none" stroke="${P.moonHi}" stroke-width="0.8" opacity="0.5"/>`;
  } else if (P.style === "flat") {
    // solid disc + offset shadow crescent (print feel)
    moon = `<circle cx="100" cy="${cy}" r="${R}" fill="${P.moonMid}"/>
      <path d="M${100 + R * 0.35},${cy - R * 0.94} A${R},${R} 0 0 1 ${100 + R * 0.35},${cy + R * 0.94} A${R * 1.05},${R * 1.05} 0 0 0 ${100 + R * 0.35},${cy - R * 0.94}Z" fill="${P.moonLo}" opacity="0.9"/>
      <circle cx="${100 - 14}" cy="${cy - 10}" r="6" fill="${P.crater}"/>
      <circle cx="${100 - 2}" cy="${cy + 18}" r="4" fill="${P.crater}"/>`;
  } else {
    moon = `<circle cx="100" cy="${cy}" r="${R}" fill="url(#mo${id})"/>
      <circle cx="${100 - 14}" cy="${cy - 10}" r="7" fill="${P.crater}" opacity="0.28"/>
      <circle cx="${100 + 13}" cy="${cy + 6}" r="10" fill="${P.crater}" opacity="0.22"/>
      <circle cx="${100 - 4}" cy="${cy + 20}" r="4.5" fill="${P.crater}" opacity="0.25"/>`;
  }
  const hz = P.style === "soft" ? `<rect x="14" y="${hy - 0.8}" width="172" height="1.6" fill="url(#hz${id})"/>`
                                : `<rect x="22" y="${hy - 1.1}" width="156" height="2.2" fill="${P.line}"/>`;
  return `
  <defs>
    <radialGradient id="g${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${P.glowA}" stop-opacity="${0.55 * glow * P.glowOp}"/>
      <stop offset="0.45" stop-color="${P.glowB}" stop-opacity="${0.18 * glow * P.glowOp}"/>
      <stop offset="1" stop-color="${P.glowB}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="mo${id}" cx="38%" cy="32%" r="75%">
      <stop offset="0" stop-color="${P.moonHi}"/><stop offset="0.6" stop-color="${P.moonMid}"/><stop offset="1" stop-color="${P.moonLo}"/>
    </radialGradient>
    <linearGradient id="hz${id}" x1="0" x2="1">
      <stop offset="0" stop-color="${P.line}" stop-opacity="0"/><stop offset="0.5" stop-color="${P.lineHi}" stop-opacity="1"/><stop offset="1" stop-color="${P.line}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="rf${id}" x1="0" x2="1">
      <stop offset="0" stop-color="${P.refl}" stop-opacity="0"/><stop offset="0.5" stop-color="${P.refl}" stop-opacity="1"/><stop offset="1" stop-color="${P.refl}" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="c${id}"><rect x="0" y="0" width="200" height="${hy}"/></clipPath>
  </defs>
  ${P.glowOp > 0 ? `<circle cx="100" cy="${Math.min(cy, hy)}" r="96" fill="url(#g${id})"/>` : ""}
  <g clip-path="url(#c${id})">
    <path d="M36,${hy} A64,64 0 0 1 164,${hy}" fill="none" stroke="${P.line}" stroke-width="${P.lineW}" opacity="${(P.style==="soft"?0.55:0.95) * orbit}" stroke-dasharray="201.1" stroke-dashoffset="${(201.1 * (1 - orbitDraw)).toFixed(2)}"/>
    ${moon}
  </g>
  <circle cx="${ox}" cy="${oy}" r="${P.style==="soft"?2.6:3.4}" fill="${P.dot}" opacity="${orbit}"/>
  ${hz}
  ${refl}
  <path d="${sparkle(7)}" transform="translate(158,46)" fill="${P.spark1}" opacity="${0.9 * spark}"/>
  <path d="${sparkle(3.6)}" transform="translate(44,58)" fill="${P.spark2}" opacity="${0.7 * spark}"/>`;
}

if (typeof module !== "undefined") module.exports = { rng, sparkle, starfield, moonMark };
