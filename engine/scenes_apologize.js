// Scenes for "How each zodiac sign apologizes (without saying sorry)"
var ELX = { fire: "#ff8f6a", earth: "#e7c98e", air: "#c4ccf4", water: "#9fd6e8" };
var ZG = {aries:"♈",taurus:"♉",gemini:"♊",cancer:"♋",leo:"♌",virgo:"♍",libra:"♎",scorpio:"♏",sagittarius:"♐",capricorn:"♑",aquarius:"♒",pisces:"♓"};
var ZE = {aries:"fire",leo:"fire",sagittarius:"fire",taurus:"earth",virgo:"earth",capricorn:"earth",gemini:"air",libra:"air",aquarius:"air",cancer:"water",scorpio:"water",pisces:"water"};
var ZY = 610, SIGNS12 = Object.keys(ZG);
function sigil(sign, x, y, r, op = 1) {
  y -= LIFT; const c = ELX[ZE[sign]];
  return `<g opacity="${op}" transform="translate(${x} ${y}) scale(${POP}) translate(${-x} ${-y})">
    <circle cx="${x}" cy="${y}" r="${r * 1.9}" fill="${c}" opacity=".16" filter="url(#blur20)"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="${C.sky1}" stroke="${C.gold}" stroke-width="${r * .06}" filter="url(#ppr)"/>
    <text x="${x}" y="${y + r * .06}" text-anchor="middle" dominant-baseline="central" font-family="DejaVu Sans" font-size="${r * 1.05}" fill="${c}" filter="url(#glow)">${ZG[sign]}</text></g>`;
}
var tear = (x, y, s = 1, op = 1) => `<path transform="translate(${x},${y}) scale(${s})" d="M0,-12 C7,0 9,7 0,14 C-9,7 -7,0 0,-12Z" fill="#9fd6e8" opacity="${op}"/>`;
// her = left, him = right, slowly turning toward each other as the apology lands
function pair(u, t, o = {}) {
  const w = eo((u - (o.at ?? 1.2)) / .7);
  return woman(GX - 230 + (o.wx ?? 0), GY, SC, { la: o.wla ?? (10 + 20 * w), ra: 10, look: o.wlook ?? 4 }, t) + man(GX + 230 + (o.mx ?? 0), GY, SC, { la: 10, ra: o.mra ?? 40, look: o.mlook ?? 4, lean: o.mlean ?? 0 }, t, { flip: true });
}

var SCENES = {
  hook(u, D, t) { // a small "sorry" note crumples, twelve sigils light around a mending heart
    let s = '';
    SIGNS12.forEach((k, i) => { const a = Math.PI * (1.08 + i / 11 * .84); s += sigil(k, 540 + Math.cos(a) * 370, 1290 + Math.sin(a) * 370, 34, cl((u - .4 - i * .08) / .2)); });
    const c = eo((u - .3) / .8);
    s += `<g transform="translate(540,${1000 - LIFT}) scale(${1 - c * .7}) rotate(${c * 40})" opacity="${1 - c}" filter="url(#ppr)"><rect x="-90" y="-55" width="180" height="110" rx="8" fill="#fff6ea"/><text x="0" y="12" text-anchor="middle" font-family="Cormorant" font-style="italic" font-size="44" fill="${C.sky2}">sorry</text></g>`;
    return s + woman(GX, GY + 30, SC, { la: 20, ra: 20, look: 6 }, t);
  },
  aries(u, D, t) { // brings a snack, acts like nothing happened (whistling)
    let s = sigil('aries', 540, ZY, 92);
    const m = eo(u / 1);
    s += `<g transform="translate(${GX + 120 - 100 * m},${GY + 120})" filter="url(#ppr)"><path d="M-30,-40 L30,-40 L36,40 L-36,40Z" fill="${C.rose}"/><rect x="-30" y="-48" width="60" height="12" fill="#e8475a"/><text x="0" y="12" text-anchor="middle" font-family="Cinzel" font-weight="600" font-size="20" fill="#fff6ea">SNACK</text></g>`;
    for (let k = 0; k < 3; k++) { const ph = (u * .9 + k / 3) % 1; s += `<text x="${GX + 300 + ph * 40}" y="${GY - 20 - ph * 120}" font-family="DejaVu Sans" font-size="34" fill="${C.gold2}" opacity="${1 - ph}">♪</text>`; }
    return s + woman(GX - 250, GY, SC, { la: 10, ra: 10, look: 2 }, t) + man(GX + 230 - 100 * m, GY, SC, { la: 10, ra: 70 * m, look: 12 }, t, { flip: true });
  },
  taurus(u, D, t) { // shows up with your favorite flowers
    let s = sigil('taurus', 540, ZY, 92);
    const m = eo(u / 1.1), bx = GX + 120 - 90 * m, by = GY + 40;
    s += `<g transform="translate(${bx},${by})" filter="url(#ppr)"><path d="M-20,60 L0,10 L20,60Z" fill="#8a9a6a"/>`;
    [[-24, -6, C.rose], [0, -22, '#fff6ea'], [24, -6, C.gold], [-10, 10, '#e8475a'], [14, 8, C.rose]].forEach(([x, y, c]) => { for (let j = 0; j < 5; j++) s += `<ellipse cx="${x}" cy="${y - 8}" rx="6" ry="10" transform="rotate(${j * 72} ${x} ${y})" fill="${c}"/>`; s += `<circle cx="${x}" cy="${y}" r="5" fill="${C.gold}"/>`; });
    s += `</g>`;
    return s + woman(GX - 230, GY, SC, { la: 10 + 50 * eo((u - 1.6) / .5), ra: 10, look: 4 }, t) + man(GX + 230 - 90 * m, GY, SC, { la: 10, ra: 80, look: 4 }, t, { flip: true });
  },
  gemini(u, D, t) { // sends forty memes: little emoji cards stream from his phone to hers
    let s = sigil('gemini', 540, ZY, 92);
    const faces = ['😂', '🥺', '😭', '🙈', '💀', '✨'];
    for (let k = 0; k < 14; k++) { const ph = ((u * 1.3 + k / 14) % 1); if (u < .3) continue; const x = lerp(GX + 190, GX - 190, ph), y = GY + 20 - Math.sin(ph * Math.PI) * 260 - (k % 3) * 18;
      s += `<g transform="translate(${x},${y}) rotate(${(k % 5 - 2) * 8})" opacity="${Math.sin(ph * Math.PI)}"><rect x="-26" y="-26" width="52" height="52" rx="10" fill="#fff6ea"/><text x="0" y="12" text-anchor="middle" font-family="DejaVu Sans" font-size="30">${faces[k % 6]}</text></g>`; }
    const cnt = Math.min(40, Math.floor(u * 18));
    s += `<text x="${GX - 230}" y="${GY - 70}" text-anchor="middle" font-family="Cinzel" font-weight="600" font-size="40" fill="${C.gold2}">${cnt}</text>`;
    return s + pair(u, t, { wla: 70, mra: 75 });
  },
  cancer(u, D, t) { // writes a three page letter: pages slide out one by one
    let s = sigil('cancer', 540, ZY, 92);
    for (let k = 0; k < 3; k++) { const p = eb((u - .2 - k * .4) / .5); if (p <= 0) continue;
      s += `<g transform="translate(${GX - 20 + k * 30},${GY + 30 - k * 20}) rotate(${-8 + k * 8}) scale(${p})" filter="url(#ppr)"><rect x="-60" y="-80" width="120" height="160" rx="6" fill="#fff6ea"/>`;
      for (let j = 0; j < 7; j++) s += `<rect x="-44" y="${-60 + j * 18}" width="${70 + (j * 13) % 20}" height="4" rx="2" fill="#c9b6c6"/>`;
      s += `<text x="40" y="66" font-family="Cormorant" font-size="22" fill="${C.sky2}">${k + 1}/3</text></g>`; }
    s += heart(GX - 20 + 60, GY - 80 - eo((u - 1.6) / .6) * 40, 1.1, C.rose, cl((u - 1.6) / .3));
    return s + pair(u, t, { wla: 20, mra: 30 });
  },
  leo(u, D, t) { // plans a grand surprise: a gift box bursts with balloons and confetti
    let s = sigil('leo', 540, ZY, 92);
    const o = eo((u - .7) / .4);
    s += `<g filter="url(#ppr)"><rect x="${GX - 60}" y="${GY + 150}" width="120" height="100" fill="${C.rose}"/><rect x="${GX - 6}" y="${GY + 150}" width="12" height="100" fill="${C.gold}"/>
      <g transform="translate(${GX},${GY + 150}) rotate(${-40 * o}) translate(${-70},${-20 - 40 * o})"><rect width="140" height="26" fill="#e8475a"/></g></g>`;
    for (let k = 0; k < 4; k++) { const b = eo((u - .8 - k * .1) / 1.2); if (b <= 0) continue; const x = GX - 90 + k * 60, y = GY + 140 - b * (330 + k * 30);
      s += `<line x1="${x}" y1="${y + 46}" x2="${GX}" y2="${GY + 150}" stroke="#fff6ea" stroke-width="2" opacity=".6"/><ellipse cx="${x}" cy="${y}" rx="34" ry="42" fill="${[C.rose, C.gold, '#c4ccf4', '#ff8f6a'][k]}" filter="url(#ppr)"/>`; }
    for (let k = 0; k < 16; k++) { const ph = cl((u - .7) / 1.6), a = k / 16 * Math.PI * 2; if (ph <= 0) continue; s += `<rect x="${GX + Math.cos(a) * 260 * ph}" y="${GY + 150 + Math.sin(a) * 200 * ph - 160 * ph}" width="9" height="15" fill="${[C.gold, C.rose, '#fff6ea'][k % 3]}" opacity="${1 - ph}" transform="rotate(${k * 40 + ph * 300} ${GX + Math.cos(a) * 260 * ph} ${GY + 150 + Math.sin(a) * 200 * ph - 160 * ph})"/>`; }
    return s + woman(GX - 250, GY, SC, { la: 20 + 120 * o, ra: 20 + 120 * o, look: 8 }, t) + man(GX + 250, GY, SC, { la: 10, ra: 100, look: 6 }, t, { flip: true });
  },
  virgo(u, D, t) { // quietly fixes what they broke: a cracked vase seals with gold (kintsugi)
    let s = sigil('virgo', 540, ZY, 92);
    const f = eio((u - .3) / 1.4);
    s += `<g transform="translate(${GX + 60},${GY + 140})" filter="url(#ppr)"><path d="M-40,-80 Q-70,-20 -50,60 L50,60 Q70,-20 40,-80 Q46,-96 30,-100 L-30,-100 Q-46,-96 -40,-80Z" fill="#c4ccf4"/></g>`;
    s += `<path d="M${GX + 40},${GY + 44} l14,30 l-18,26 l22,30 l-10,34" stroke="${f > 0 ? C.gold : C.sky1}" stroke-width="${3 + 3 * f}" fill="none" stroke-dasharray="${150 * f + 2} 200" ${f > .3 ? 'filter="url(#glow)"' : ''}/>`;
    return s + woman(GX - 230, GY, SC, { la: 10, ra: 10, look: 2 }, t) + man(GX + 210, GY, SC, { la: 10, ra: 70 + Math.sin(u * 10) * 8, look: -6, lean: 8 }, t, { flip: true });
  },
  libra(u, D, t) { // makes everything beautiful again: painted flowers bloom along a grey wall
    let s = sigil('libra', 540, ZY, 92);
    s += `<rect x="120" y="${GY - 40}" width="840" height="290" fill="#4a3a5e" opacity=".6" filter="url(#ppr)"/>`;
    for (let k = 0; k < 7; k++) { const p = eb((u - .2 - k * .2) / .45); if (p <= 0) continue; const x = 190 + k * 115, y = GY + 40 + (k % 2) * 70;
      s += `<g transform="translate(${x},${y}) scale(${p})">`; for (let j = 0; j < 6; j++) s += `<ellipse cx="0" cy="-16" rx="11" ry="20" transform="rotate(${j * 60})" fill="${[C.rose, '#fff6ea', C.gold, '#c4ccf4'][k % 4]}"/>`; s += `<circle r="8" fill="${C.gold}"/></g>`; }
    return s + man(GX + 260, GY, SC, { la: 10, ra: 110 + Math.sin(u * 8) * 20, look: 6 }, t, { flip: true }) + woman(GX - 300, GY, SC, { la: 10, ra: 10 + 40 * eo((u - 1.2) / .5), look: 4 }, t);
  },
  scorpio(u, D, t) { // just holds your gaze: the world dims, one golden line connects their eyes
    const d = eo(u / 1);
    let s = sigil('scorpio', 540, ZY, 92);
    s += `<rect x="0" y="-400" width="1080" height="2800" fill="#140a1c" opacity="${.45 * d}"/>`;
    s += `<line x1="${GX - 120}" y1="${GY + 26}" x2="${GX + 120}" y2="${GY + 26}" stroke="${C.gold2}" stroke-width="3" stroke-dasharray="${240 * eo((u - .6) / .8)} 300" filter="url(#glow)"/>`;
    s += heart(540, GY - 30, 1, C.rose, cl((u - 2) / .4));
    return s + woman(GX - 140, GY, SC, { la: 10, ra: 10, look: 0 }, t) + man(GX + 140, GY, SC, { la: 10, ra: 10, look: 0 }, t, { flip: true });
  },
  sagittarius(u, D, t) { // makes you laugh until you forget
    let s = sigil('sagittarius', 540, ZY, 92);
    const b = Math.abs(Math.sin(u * 8));
    for (let k = 0; k < 8; k++) { const ph = (u * .8 + k / 8) % 1; s += `<text x="${GX - 260 + (k % 2) * 60 + Math.sin(ph * 5) * 20}" y="${GY - 20 - ph * 220}" font-family="Cormorant" font-style="italic" font-size="${36 + (k % 3) * 8}" fill="${C.gold2}" opacity="${1 - ph}">ha</text>`; }
    s += `<g transform="translate(${GX + 120},${GY + 80 - b * 30}) rotate(${Math.sin(u * 4) * 20})"><circle r="22" fill="#fff6ea" filter="url(#ppr)"/><circle cx="-7" cy="-4" r="3" fill="${C.sky1}"/><circle cx="7" cy="-4" r="3" fill="${C.sky1}"/><path d="M-9,6 Q0,14 9,6" stroke="${C.sky1}" stroke-width="3" fill="none"/></g>`;
    return s + woman(GX - 230, GY - b * 6, SC, { la: 60 + b * 30, ra: 60 + b * 30, lean: -b * 5, look: 10 }, t) + man(GX + 230, GY, SC, { la: 10, ra: 120 + b * 20, look: 6 }, t, { flip: true });
  },
  capricorn(u, D, t) { // shows up on time, every day after: calendar days get crossed, he arrives each time
    let s = sigil('capricorn', 540, ZY - 30, 84);
    const x0 = 560, y0 = 800 - LIFT;
    s += `<g filter="url(#ppr)"><rect x="${x0}" y="${y0}" width="360" height="300" rx="14" fill="#fff6ea"/><rect x="${x0}" y="${y0}" width="360" height="60" rx="14" fill="${C.rose}"/></g>`;
    for (let k = 0; k < 12; k++) { const cx = x0 + 45 + (k % 4) * 90, cy = y0 + 105 + Math.floor(k / 4) * 70, on = cl((u - .2 - k * .2) / .12);
      s += `<text x="${cx}" y="${cy + 10}" text-anchor="middle" font-family="Jost" font-size="28" fill="${C.sky2}">${k + 1}</text>`;
      if (on > 0) s += `<path d="M${cx - 18},${cy - 6} l12,14 l24,-26" stroke="#3aa37a" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="${50 * on} 60"/>`; }
    return s + woman(GX - 300, GY, SC, { la: 10, ra: 10, look: 4 }, t) + man(GX - 120, GY, SC, { la: 10, ra: 40, look: 4 }, t, { flip: true });
  },
  aquarius(u, D, t) { // explains exactly why it happened: a whiteboard fills with arrows and boxes
    let s = sigil('aquarius', 540, ZY - 30, 84);
    const x0 = 520, y0 = 820 - LIFT, p = cl(u / (D * .8));
    s += `<g filter="url(#ppr)"><rect x="${x0}" y="${y0}" width="420" height="270" rx="10" fill="#fff6ea"/><rect x="${x0 + 40}" y="${y0 + 270}" width="10" height="120" fill="#b08a5e"/><rect x="${x0 + 370}" y="${y0 + 270}" width="10" height="120" fill="#b08a5e"/></g>`;
    const parts = [`<rect x="${x0 + 30}" y="${y0 + 40}" width="100" height="56" rx="8" fill="none" stroke="${C.sky2}" stroke-width="4"/>`, `<path d="M${x0 + 135},${y0 + 68} L${x0 + 205},${y0 + 68} l-12,-10 M${x0 + 205},${y0 + 68} l-12,10" stroke="${C.sky2}" stroke-width="4" fill="none"/>`,
      `<rect x="${x0 + 210}" y="${y0 + 40}" width="100" height="56" rx="8" fill="none" stroke="${C.sky2}" stroke-width="4"/>`, `<path d="M${x0 + 260},${y0 + 100} L${x0 + 260},${y0 + 160} l-10,-12 M${x0 + 260},${y0 + 160} l10,-12" stroke="${C.sky2}" stroke-width="4" fill="none"/>`,
      `<circle cx="${x0 + 260}" cy="${y0 + 205}" r="34" fill="none" stroke="${C.rose}" stroke-width="5"/>`, `<text x="${x0 + 260}" y="${y0 + 218}" text-anchor="middle" font-family="DejaVu Sans" font-size="36" fill="${C.rose}">♡</text>`, `<text x="${x0 + 360}" y="${y0 + 80}" font-family="Cinzel" font-size="40" fill="${C.sky2}">?!</text>`];
    parts.slice(0, Math.ceil(p * parts.length)).forEach(x => s += x);
    return s + man(GX - 120, GY, SC, { la: 10, ra: 100 + Math.sin(u * 7) * 25, look: 2 }, t, { flip: true }) + woman(GX - 330, GY, SC, { la: 10, ra: 60, look: 4, lean: 3 }, t);
  },
  pisces(u, D, t) { // cries before you can
    let s = sigil('pisces', 540, ZY, 92);
    for (let k = 0; k < 4; k++) { const ph = ((u * 1.6 + k / 4) % 1); s += tear(GX + 222 + (k % 2) * 16, GY + 34 + ph * 120, .9, 1 - ph); }
    const h = eo((u - .8) / .6);
    return s + woman(GX - 200 + 80 * h, GY, SC, { la: 10 + 80 * h, ra: 10, look: 4 }, t) + man(GX + 220, GY, SC, { la: 90, ra: 90, look: -8 }, t, { flip: true });
  },
  cta(u, D, t) {
    let s = '';
    SIGNS12.forEach((k, i) => { const a = -Math.PI / 2 + i / 12 * Math.PI * 2; s += sigil(k, 540 + Math.cos(a) * 300, 720 + Math.sin(a) * 300, 36, cl((u - i * .05) / .2)); });
    s += `<g transform="translate(540,${720 - LIFT})" opacity="${eo((u - .7) / .5)}"><rect x="-170" y="-62" width="340" height="124" rx="28" fill="#fff6ea"/><path d="M-30,60 L-58,98 L4,60Z" fill="#fff6ea"/><text x="0" y="16" text-anchor="middle" font-family="Cormorant" font-weight="600" font-size="48" fill="${C.sky2}">forgiven ♡</text></g>`;
    const hug = eo((u - 1.2) / .8);
    return s + woman(GX - 170 + 50 * hug, GY, SC, { la: 12 + 60 * hug, ra: 12, look: 8 }, t) + man(GX + 170 - 50 * hug, GY, SC, { la: 8, ra: 30 + 40 * hug, look: 8 }, t, { flip: true });
  },
};
