// Scenes for "The Winter Solstice" (2026-12-21 20:49 UTC — verified with tools/sky_events.py)
function sunDisk(x, y, r, op = 1) { y -= LIFT;
  return `<g opacity="${op}"><circle cx="${x}" cy="${y}" r="${r * 2.4}" fill="#ffb36a" opacity=".18" filter="url(#blur20)"/><circle cx="${x}" cy="${y}" r="${r}" fill="#ffc94a"/><circle cx="${x}" cy="${y}" r="${r * .72}" fill="#ffe7a0"/></g>`; }
function stepMedal(n, x, y, r) { y -= LIFT;
  return `<g transform="translate(${x} ${y}) scale(${POP}) translate(${-x} ${-y})"><circle cx="${x}" cy="${y}" r="${r * 1.9}" fill="${C.gold}" opacity=".15" filter="url(#blur20)"/><circle cx="${x}" cy="${y}" r="${r}" fill="${C.sky1}" stroke="${C.gold}" stroke-width="${r * .06}" filter="url(#ppr)"/>
    <text x="${x}" y="${y + 4}" text-anchor="middle" dominant-baseline="central" font-family="Cinzel" font-weight="600" font-size="${r * 1.1}" fill="${C.gold2}" filter="url(#glow)">${n}</text></g>`; }
var candle = (x, y, lit, u) => `<g filter="url(#ppr)"><rect x="${x - 20}" y="${y - 90}" width="40" height="90" rx="6" fill="#f5e0c8"/></g>` + (lit > 0 ? `<circle cx="${x}" cy="${y - 120}" r="${110 * lit}" fill="#ffd27a" opacity="${.18 * lit}" filter="url(#blur8)"/><path transform="translate(${x},${y - 96}) scale(${lit * (1 + .1 * Math.sin(u * 12))})" d="M0,-36 C10,-20 14,-6 8,4 C4,10 -4,10 -8,4 C-14,-6 -10,-20 0,-36Z" fill="#ffd27a" filter="url(#glow)"/>` : '');

var SCENES = {
  hook(u, D, t) { // night deepens, a candle in her hands, then dawn light returns on the horizon
    const dark = eo(u / 2) * (1 - eo((u - 4.4) / 1.6)), dawn = eo((u - 4.4) / 1.6);
    let s = `<rect x="0" y="-400" width="1080" height="2800" fill="#0c0618" opacity="${.5 * dark}"/>`;
    s += `<ellipse cx="540" cy="${1060 - LIFT}" rx="${600 * dawn}" ry="${180 * dawn}" fill="#ffb36a" opacity="${.5 * dawn}" filter="url(#blur20)"/>`;
    s += sunDisk(540, 1110 - dawn * 60, 60, dawn);
    s += candle(GX + 40, GY + 150, eo((u - 1) / .6), u);
    return s + woman(GX - 30, GY, SC, { la: 70, ra: 70, look: 4 }, t);
  },
  low(u, D, t) { // summer's high arc (faint) vs. the solstice's low arc; the Sun crawls along the low one
    let s = `<path d="M80,${1080 - LIFT} Q540,${120 - LIFT} 1000,${1080 - LIFT}" fill="none" stroke="#fff6ea" stroke-width="3" stroke-dasharray="6 14" opacity=".35"/>`;
    s += `<text x="540" y="${560 - LIFT}" text-anchor="middle" font-family="Jost" font-size="30" letter-spacing="8" fill="#fff6ea" opacity=".5">SUMMER</text>`;
    s += `<path d="M160,${1080 - LIFT} Q540,${700 - LIFT} 920,${1080 - LIFT}" fill="none" stroke="${C.gold}" stroke-width="5" opacity=".9"/>`;
    s += `<text x="540" y="${845 - LIFT}" text-anchor="middle" font-family="Jost" font-size="30" letter-spacing="8" fill="${C.gold2}">SOLSTICE</text>`;
    const q = .15 + eio(u / D) * .7, x = (1 - q) * (1 - q) * 160 + 2 * (1 - q) * q * 540 + q * q * 920, y = (1 - q) * (1 - q) * 1080 + 2 * (1 - q) * q * 700 + q * q * 1080;
    s += sunDisk(x, y, 44, 1);
    return s + woman(GX + 260, GY, SC * .9, { la: 20, ra: 20, look: 10 }, t);
  },
  newgrange(u, D, t) { // cross-section of the mound: the sunrise beam runs down the passage and fills the chamber
    const yb = GY + 240, p = eio((u - .6) / 3), fill = eo((u - 3.4) / 1.4);
    let s = sunDisk(130, 1010 - eo(u / 1.5) * 60, 46, 1);
    s += `<g filter="url(#ppr)"><path d="M180,${yb} Q540,${GY - 140} 960,${yb}Z" fill="#6a7a52"/><path d="M200,${yb} Q540,${GY - 110} 940,${yb}Z" fill="#7d8c5e"/></g>`;
    for (let k = 0; k < 14; k++) s += `<rect x="${215 + k * 52}" y="${yb - 18}" width="38" height="18" rx="5" fill="#d8d2c4"/>`;
    s += `<rect x="260" y="${yb - 70}" width="420" height="22" fill="#3a2a2a"/><circle cx="700" cy="${yb - 60}" r="50" fill="#3a2a2a"/>`;
    s += `<rect x="260" y="${yb - 70}" width="${420 * p}" height="22" fill="#ffd27a" opacity=".95" filter="url(#glow)"/>`;
    s += `<circle cx="700" cy="${yb - 60}" r="${50 * fill}" fill="#ffd27a" opacity=".95" filter="url(#glow)"/>`;
    s += `<text x="580" y="${yb + 70}" text-anchor="middle" font-family="Jost" font-size="30" letter-spacing="6" fill="${C.gold2}" opacity="${cl((u - .4) / .5)}">NEWGRANGE · c. 3200 BC</text>`;
    return s;
  },
  stonehenge(u, D, t) { // the solstice sun sets between the great stones
    const sy = 940 + eio(u / D) * 160;
    let s = sunDisk(540, sy, 56, 1);
    s += `<rect x="0" y="${1062 - LIFT}" width="1080" height="200" fill="${C.m3}"/>`;
    const stone = (x, w, h) => `<rect x="${x}" y="${GY + 255 - h}" width="${w}" height="${h}" rx="6" fill="#2a1d30" filter="url(#ppr)"/>`;
    s += stone(300, 90, 330) + stone(480 - 6, 0, 0) + stone(690, 90, 330) + `<rect x="290" y="${GY - 100}" width="500" height="54" rx="6" fill="#2a1d30" filter="url(#ppr)"/>`;
    s += stone(140, 80, 240) + stone(860, 80, 240) + stone(40, 60, 170) + stone(980, 60, 170);
    s += `<text x="540" y="${GY + 330}" text-anchor="middle" font-family="Jost" font-size="30" letter-spacing="6" fill="${C.gold2}" opacity="${cl((u - .3) / .5)}">STONEHENGE</text>`;
    return s;
  },
  capricorn(u, D, t) { // the Sun moves into Capricorn's glyph; stone steps build, slow and steady
    const m = eio(u / 1.6);
    let s = `<g transform="translate(0,0)"><circle cx="760" cy="${560 - LIFT}" r="96" fill="${C.sky1}" stroke="${C.gold}" stroke-width="6" filter="url(#ppr)"/><text x="760" y="${566 - LIFT}" text-anchor="middle" dominant-baseline="central" font-family="DejaVu Sans" font-size="100" fill="#e7c98e" filter="url(#glow)">♑</text></g>`;
    s += sunDisk(lerp(260, 760, m), lerp(760, 560, m), 40 * (1 - .4 * m), 1 - .3 * m);
    const n = Math.floor(cl((u - 1.6) / (D - 2)) * 6);
    for (let k = 0; k < n; k++) s += `<rect x="${200 + k * 90}" y="${GY + 255 - (k + 1) * 46}" width="92" height="${(k + 1) * 46}" fill="#4a3a5e" stroke="${C.gold}" stroke-opacity=".5" stroke-width="2" filter="url(#ppr)"/>`;
    const k = Math.max(0, n - 1);
    return s + woman(200 + k * 90 + 46, GY + 255 - (n ? (k + 1) * 46 : 0) - 250 * SC * .8, SC * .8, { la: 14, ra: -10, look: 6 }, t);
  },
  step1(u, D, t) { // let go: she writes on a slip of paper, it drifts up into the dark and becomes a star
    let s = stepMedal(1, 540, 610, 92);
    const f = eio((u - .8) / 1.2), x = lerp(GX + 80, 820, f), y = lerp(GY + 80, 760 - LIFT, f);
    if (f < .95) s += `<g transform="translate(${x},${y}) rotate(${f * 200}) scale(${1 - f * .6})" filter="url(#ppr)"><rect x="-44" y="-28" width="88" height="56" rx="4" fill="#fff6ea"/><rect x="-30" y="-12" width="60" height="4" fill="#c9b6c6"/><rect x="-30" y="0" width="44" height="4" fill="#c9b6c6"/></g>`;
    else s += star(820, 760 - LIFT, 16, C.gold2, 1);
    return s + woman(GX - 30, GY, SC, { la: 60 + 90 * f, ra: 50, look: 6 + 10 * f }, t);
  },
  step2(u, D, t) { // light: one candle, and the warm circle grows
    let s = stepMedal(2, 540, 610, 92) + candle(GX + 120, GY + 250, eo((u - .4) / .5), u);
    return s + woman(GX - 80, GY, SC, { la: 60, ra: 20, look: -4 }, t);
  },
  step3(u, D, t) { // rest: below the ground, seeds glow and sprout while she rests
    let s = stepMedal(3, 540, 610, 92);
    s += `<rect x="0" y="${GY + 255}" width="1080" height="1400" fill="#2a1730" opacity=".9"/>`;
    for (let k = 0; k < 5; k++) { const x = 220 + k * 160, y = GY + 340 + (k % 2) * 30, g = eo((u - .3 - k * .2) / 1);
      s += `<ellipse cx="${x}" cy="${y}" rx="14" ry="10" fill="#c99a5c"/><circle cx="${x}" cy="${y}" r="${30 * g}" fill="${C.gold2}" opacity="${.25 * g}" filter="url(#blur8)"/><path d="M${x},${y - 8} q${-8},${-30 * g} 0,${-60 * g}" stroke="#8a9a6a" stroke-width="4" fill="none"/>`; }
    const br = .5 + .5 * Math.sin(u * 2);
    return s + woman(GX, GY, SC, { la: 115, ra: 115, look: -10 + br * 4 }, t);
  },
  cta(u, D, t) {
    const dawn = eo(u / 2);
    let s = `<ellipse cx="540" cy="${1060 - LIFT}" rx="${620 * dawn}" ry="${200 * dawn}" fill="#ffb36a" opacity="${.45 * dawn}" filter="url(#blur20)"/>` + sunDisk(540, 1120 - dawn * 80, 70, dawn);
    s += `<g transform="translate(540,${720 - LIFT})" opacity="${eo((u - .7) / .5)}"><rect x="-190" y="-62" width="380" height="124" rx="28" fill="#fff6ea"/><path d="M-30,60 L-58,98 L4,60Z" fill="#fff6ea"/><text x="0" y="16" text-anchor="middle" font-family="Cormorant" font-weight="600" font-size="46" fill="${C.sky2}">I'm calling in…</text></g>`;
    return s + candle(GX, GY + 250, 1, u) + woman(GX - 190, GY, SC, { la: 12, ra: 12, look: 8 }, t) + man(GX + 190, GY, SC, { la: 8, ra: 30, look: 8 }, t, { flip: true });
  },
};
