// Scenes for "The Cold Moon in Cancer" (full moon 2026-12-24 01:28 UTC, Cancer 2° — verified with tools/sky_events.py)
var EYM = 610;
var ELC = { fire: "#ff8f6a", earth: "#e7c98e", air: "#c4ccf4", water: "#9fd6e8" };
function elemSym(el, x, y, r, col) { // classical element triangles
  const up = el === 'fire' || el === 'air', h = r * .87;
  const tri = up ? `M${x},${y - h * .66} L${x + r * .75},${y + h * .5} L${x - r * .75},${y + h * .5}Z` : `M${x},${y + h * .66} L${x + r * .75},${y - h * .5} L${x - r * .75},${y - h * .5}Z`;
  let s = `<path d="${tri}" fill="none" stroke="${col}" stroke-width="${r * .1}" stroke-linejoin="round" filter="url(#glow)"/>`;
  if (el === 'air' || el === 'earth') s += `<line x1="${x - r * .6}" y1="${y + (up ? h * .05 : -h * .05)}" x2="${x + r * .6}" y2="${y + (up ? h * .05 : -h * .05)}" stroke="${col}" stroke-width="${r * .1}" stroke-linecap="round"/>`;
  return s;
}
function elemMedal(el, x, y, r, op = 1) {
  y -= LIFT;
  return `<g opacity="${op}" transform="translate(${x} ${y}) scale(${POP}) translate(${-x} ${-y})">
    <circle cx="${x}" cy="${y}" r="${r * 2}" fill="${ELC[el]}" opacity=".18" filter="url(#blur20)"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="${C.sky1}" stroke="${C.gold}" stroke-width="${r * .06}" filter="url(#ppr)"/>
    ${elemSym(el, x, y + r * .05, r * .7, ELC[el])}</g>`;
}
function snow(t, n = 70) {
  let s = '';
  for (let k = 0; k < n; k++) { const sp = 40 + rnd(k) * 60, x = (rnd(k + 3) * 1100 + Math.sin(t * .8 + k) * 30) % 1100, y = ((rnd(k + 7) * 2000 + t * sp) % 2000) - 100 - LIFT;
    s += `<circle cx="${x}" cy="${y}" r="${2 + rnd(k + 11) * 3.5}" fill="#fff" opacity="${.35 + rnd(k + 5) * .5}"/>`; }
  return s;
}
var cancerTag = (x, y, op) => `<g opacity="${op}"><circle cx="${x}" cy="${y - LIFT}" r="44" fill="${C.sky1}" stroke="${C.gold}" stroke-width="3" filter="url(#ppr)"/><text x="${x}" y="${y - LIFT + 3}" text-anchor="middle" dominant-baseline="central" font-family="DejaVu Sans" font-size="50" fill="#9fd6e8" filter="url(#glow)">♋</text></g>`;

var SCENES = {
  hook(u, D, t) { // the Cold Moon rises behind the mountains, Cancer's glyph appears beside it
    const r = eio(u / 2.4);
    let s = planet('moon', 540, 1200 - r * 210, 110, 1, t);
    s += cancerTag(790, 960 - (1 - r) * 60, eo((u - 2.2) / .6));
    return snow(t) + s + woman(GX, GY, SC, { look: 14 * r, la: 20, ra: 20 }, t);
  },
  why(u, D, t) { // the longest nights: a clock races through the dark hours
    let s = planet('moon', 820, 520, 90, 1, t);
    const cx = 380, cy = 620 - LIFT;
    s += `<g filter="url(#ppr)"><circle cx="${cx}" cy="${cy}" r="130" fill="#fff6ea"/><circle cx="${cx}" cy="${cy}" r="118" fill="none" stroke="${C.sky2}" stroke-width="3"/></g>`;
    for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; s += `<line x1="${cx + Math.cos(a) * 100}" y1="${cy + Math.sin(a) * 100}" x2="${cx + Math.cos(a) * 114}" y2="${cy + Math.sin(a) * 114}" stroke="${C.sky2}" stroke-width="${k % 3 ? 3 : 6}"/>`; }
    const h = u * 2.2;
    s += `<line x1="${cx}" y1="${cy}" x2="${cx + Math.sin(h) * 60}" y2="${cy - Math.cos(h) * 60}" stroke="${C.sky1}" stroke-width="10" stroke-linecap="round"/><line x1="${cx}" y1="${cy}" x2="${cx + Math.sin(h * 12) * 92}" y2="${cy - Math.cos(h * 12) * 92}" stroke="${C.rose}" stroke-width="5" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="9" fill="${C.sky1}"/>`;
    return snow(t, 90) + s + woman(GX + 120, GY, SC, { la: 115, ra: 115, look: 8 }, t);
  },
  high(u, D, t) { // the winter full moon rides high: its arc is drawn across the whole sky
    const p = eio(u / (D * .9));
    const L = 1300;
    let s = `<path d="M60,${1180 - LIFT} Q540,${-60 - LIFT} 1020,${1180 - LIFT}" fill="none" stroke="${C.gold}" stroke-width="4" stroke-dasharray="8 14" opacity=".7"/>`;
    const q = .12 + p * .76, bx = (1 - q) * (1 - q) * 60 + 2 * (1 - q) * q * 540 + q * q * 1020, by = (1 - q) * (1 - q) * 1180 + 2 * (1 - q) * q * -60 + q * q * 1180;
    s += planet('moon', bx, by, 70, 1, t);
    for (let k = 1; k <= 3; k++) { const qq = Math.max(.12, q - k * .05), x = (1 - qq) * (1 - qq) * 60 + 2 * (1 - qq) * qq * 540 + qq * qq * 1020, y = (1 - qq) * (1 - qq) * 1180 + 2 * (1 - qq) * qq * -60 + qq * qq * 1180; s += `<circle cx="${x}" cy="${y - LIFT}" r="${30 - k * 7}" fill="#fff6ea" opacity="${.25 - k * .06}"/>`; }
    return snow(t, 50) + s + woman(GX, GY, SC, { la: 20, ra: 20, look: 10 + (q - .5) * -30, lean: (q - .5) * 4 }, t);
  },
  fire(u, D, t) { // fire signs, let your heart rest: warm hands by a small fire, embers drift up
    let s = elemMedal('fire', 540, EYM, 92);
    const fx = GX + 150, fy = GY + 250;
    s += `<g filter="url(#ppr)"><rect x="${fx - 60}" y="${fy - 14}" width="120" height="16" rx="8" fill="#6a3b2e" transform="rotate(12 ${fx} ${fy})"/><rect x="${fx - 60}" y="${fy - 14}" width="120" height="16" rx="8" fill="#7a4532" transform="rotate(-12 ${fx} ${fy})"/></g>`;
    for (let k = 0; k < 3; k++) { const f = 1 + .12 * Math.sin(u * 14 + k * 2); s += `<path transform="translate(${fx},${fy - 10}) scale(${(1 - k * .28) * f},${(1 - k * .25) * (1 + .1 * Math.sin(u * 11 + k))})" d="M0,-90 C30,-50 42,-20 30,0 C20,14 -20,14 -30,0 C-42,-20 -30,-50 0,-90Z" fill="${['#ff8f6a', '#ffb36a', '#ffe1a0'][k]}"/>`; }
    s += `<circle cx="${fx}" cy="${fy - 40}" r="160" fill="#ffb36a" opacity=".16" filter="url(#blur8)"/>`;
    for (let k = 0; k < 8; k++) { const ph = (u * .7 + k / 8) % 1; s += `<circle cx="${fx + Math.sin(k * 3 + u * 2) * 40}" cy="${fy - 100 - ph * 400}" r="3" fill="#ffd27a" opacity="${1 - ph}"/>`; }
    return snow(t, 30) + s + woman(GX - 70, GY, SC, { la: 70, ra: 60, look: -2 }, t);
  },
  earth(u, D, t) { // earth signs, home is calling: two people walk toward a warm, lit house
    let s = elemMedal('earth', 540, EYM, 92);
    s += `<g filter="url(#ppr)"><path d="M620,${GY + 250} L620,${GY + 70} L790,${GY - 40} L960,${GY + 70} L960,${GY + 250}Z" fill="#5a3a62"/><path d="M600,${GY + 80} L790,${GY - 55} L980,${GY + 80}" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round" opacity=".85"/>
      <rect x="660" y="${GY + 110}" width="70" height="60" fill="${C.gold2}"/><rect x="850" y="${GY + 110}" width="70" height="60" fill="${C.gold2}"/><rect x="760" y="${GY + 160}" width="60" height="90" fill="#ffd27a"/></g>`;
    s += `<path d="M760,${GY + 250} L${GX - 200},${GY + 262}" stroke="#ffd27a" stroke-width="40" opacity=".12"/>`;
    const w = eo(u / D) * 110;
    return snow(t, 50) + s + woman(GX - 300 + w, GY, SC, { la: 25 + Math.sin(u * 5) * 10, ra: 40, look: 4 }, t) + man(GX - 160 + w, GY, SC, { la: 40, ra: 25 - Math.sin(u * 5) * 10, look: 4 }, t);
  },
  air(u, D, t) { // air signs, say the soft thing: a heart-shaped balloon floats from her to him
    let s = elemMedal('air', 540, EYM, 92);
    for (let k = 0; k < 6; k++) { const y = 900 + k * 70, x = ((u * 300 + k * 230) % 1300) - 150; s += `<path d="M${x},${y} q40,-12 80,0 q40,12 80,0" stroke="#c4ccf4" stroke-width="3" fill="none" opacity=".35"/>`; }
    const f = eio((u - .3) / (D * .7)), bx = lerp(GX - 160, GX + 200, f), by = lerp(GY + 60, GY - 60, f) - Math.sin(f * Math.PI) * 220;
    s += `<path d="M${GX - 170},${GY + 110} Q${(GX - 170 + bx) / 2},${by + 160} ${bx},${by + 40}" stroke="#fff6ea" stroke-width="2" fill="none" opacity="${1 - f}"/>`;
    s += heart(bx, by - 10, 2.2, C.rose, 1);
    return snow(t, 30) + s + woman(GX - 250, GY, SC, { la: 10, ra: 90 * (1 - f) + 15, look: 8 }, t) + man(GX + 230, GY, SC, { la: 10, ra: 60 * f + 10, look: 8 + 6 * f }, t, { flip: true });
  },
  water(u, D, t) { // water signs, this is your moon: a tear falls into still water, the moon's reflection, a light rises
    let s = elemMedal('water', 540, EYM, 92) + cancerTag(780, 470, 1);
    s += `<g filter="url(#ppr)"><path d="M0,${GY + 250} Q540,${GY + 220} 1080,${GY + 250} L1080,${GY + 400} L0,${GY + 400}Z" fill="#3f4f7a" opacity=".85"/></g>`;
    for (let k = 0; k < 5; k++) s += `<rect x="${540 - (90 - k * 16)}" y="${GY + 262 + k * 16}" width="${(90 - k * 16) * 2}" height="4" rx="2" fill="#fff6ea" opacity="${.6 - k * .1}"/>`;
    const td = cl((u - .3) / 1), ri = cl((u - 1.3) / 1.4);
    if (td < 1) s += `<path transform="translate(${GX - 60},${GY + 40 + td * 220})" d="M0,-12 C7,0 9,7 0,14 C-9,7 -7,0 0,-12Z" fill="#9fd6e8"/>`;
    if (ri > 0) for (let k = 0; k < 3; k++) { const r = ri * 260 - k * 60; if (r > 0) s += `<ellipse cx="${GX - 60}" cy="${GY + 268}" rx="${r}" ry="${r * .15}" fill="none" stroke="#9fd6e8" stroke-width="3" opacity="${(1 - ri) * .9}"/>`; }
    s += star(GX - 60, GY + 220 - eo((u - 2) / 1.4) * 300, 14, C.gold2, cl((u - 2) / .3));
    return snow(t, 30) + s + woman(GX - 60, GY - 20, SC, { la: 12, ra: 12, look: -6 }, t);
  },
  cta(u, D, t) {
    let s = planet('moon', 540, 720, 110, 1, t);
    ['fire', 'earth', 'air', 'water'].forEach((el, i) => { const a = -Math.PI * .75 + i / 3 * Math.PI * 1.5 - Math.PI * .0; s += elemMedal(el, 540 + Math.cos(a - Math.PI / 2) * 290, 720 + Math.sin(a - Math.PI / 2) * 290, 52, cl((u - i * .12) / .25)); });
    return snow(t, 50) + s + woman(GX - 170, GY, SC, { la: 12, ra: 12, look: 10 }, t) + man(GX + 170, GY, SC, { la: 8, ra: 30, look: 8 }, t, { flip: true });
  },
};
