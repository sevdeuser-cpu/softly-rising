// Scenes for "What each zodiac sign does when they're secretly hurt"
var ELX = { fire: "#ff8f6a", earth: "#e7c98e", air: "#c4ccf4", water: "#9fd6e8" };
var ZG = {aries:"♈",taurus:"♉",gemini:"♊",cancer:"♋",leo:"♌",virgo:"♍",libra:"♎",scorpio:"♏",sagittarius:"♐",capricorn:"♑",aquarius:"♒",pisces:"♓"};
var ZE = {aries:"fire",leo:"fire",sagittarius:"fire",taurus:"earth",virgo:"earth",capricorn:"earth",gemini:"air",libra:"air",aquarius:"air",cancer:"water",scorpio:"water",pisces:"water"};
var ZY = 610;
function sigil(sign, x, y, r, op = 1) {
  y -= LIFT; const c = ELX[ZE[sign]];
  return `<g opacity="${op}" transform="translate(${x} ${y}) scale(${POP}) translate(${-x} ${-y})">
    <circle cx="${x}" cy="${y}" r="${r * 1.9}" fill="${c}" opacity=".16" filter="url(#blur20)"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="${C.sky1}" stroke="${C.gold}" stroke-width="${r * .06}" filter="url(#ppr)"/>
    <text x="${x}" y="${y + r * .06}" text-anchor="middle" dominant-baseline="central" font-family="DejaVu Sans" font-size="${r * 1.05}" fill="${c}" filter="url(#glow)">${ZG[sign]}</text></g>`;
}
var cloud = (x, y, s, col, op = 1) => `<g transform="translate(${x},${y}) scale(${s})" opacity="${op}" filter="url(#ppr)"><circle cx="-40" cy="10" r="34" fill="${col}"/><circle cx="0" cy="-8" r="46" fill="${col}"/><circle cx="44" cy="10" r="32" fill="${col}"/><rect x="-74" y="10" width="150" height="34" rx="17" fill="${col}"/></g>`;
var tear = (x, y, s = 1, op = 1) => `<path transform="translate(${x},${y}) scale(${s})" d="M0,-12 C7,0 9,7 0,14 C-9,7 -7,0 0,-12Z" fill="#9fd6e8" opacity="${op}"/>`;
var SIGNS12 = Object.keys(ZG);

var SCENES = {
  hook(u, D, t) { // twelve sigils dim one by one as a heart cracks behind her
    let s = '';
    SIGNS12.forEach((k, i) => { const a = Math.PI * (1.08 + i / 11 * .84); const op = cl((u - .2 - i * .08) / .2);
      s += sigil(k, 540 + Math.cos(a) * 370, 1290 + Math.sin(a) * 370, 34, op * (1 - .45 * cl((u - 2.4) / .6))); });
    const c = eo((u - 1.6) / .5);
    s += `<g transform="translate(540,${1140 - LIFT}) scale(2.6)" opacity=".9">${heart(0, 0, 1, C.rose, 1)}<path d="M0,8 L-4,14 L3,18 L-2,26" stroke="${C.sky0}" stroke-width="${2.2 * c}" fill="none"/></g>`;
    return s + woman(GX, GY + 30, SC, { look: -6, la: 12, ra: 12 }, t);
  },
  aries(u, D, t) { // gets louder, picks a fight about nothing: storm cloud, lightning, stomping
    let s = sigil('aries', 540, ZY, 92);
    s += cloud(GX - 20, GY - 90, 1.2, "#5a4a72");
    if (Math.floor(u * 4) % 3 === 0 && u > .5) s += `<path d="M${GX - 10},${GY - 50} l-24,50 h22 l-18,52" stroke="#ffd27a" stroke-width="7" fill="none" filter="url(#glow)"/>`;
    const st = Math.abs(Math.sin(u * 9)) * 10;
    for (let k = 0; k < 3; k++) s += `<text x="${GX + 90 + k * 40}" y="${GY + 40 - k * 30 - (u * 40 % 30)}" font-family="Cinzel" font-weight="600" font-size="${40 + k * 8}" fill="${C.rose}" opacity="${.5 + .5 * Math.sin(u * 6 + k)}">!</text>`;
    return s + woman(GX - 60, GY - st, SC, { la: 40 + st * 3, ra: 40 + st * 3, lean: -4 }, t);
  },
  taurus(u, D, t) { // goes quiet and eats their feelings: a tiny rain cloud over a big slice of cake
    let s = sigil('taurus', 540, ZY, 92);
    s += cloud(GX - 40, GY - 120, .8, "#6a5a82");
    for (let k = 0; k < 6; k++) { const ph = (u * 1.4 + k / 6) % 1; s += `<line x1="${GX - 90 + k * 20}" y1="${GY - 70 + ph * 120}" x2="${GX - 94 + k * 20}" y2="${GY - 50 + ph * 120}" stroke="#9fd6e8" stroke-width="3" opacity="${1 - ph}"/>`; }
    const bite = cl((u - 1) / 1.5);
    s += `<g transform="translate(${GX + 70},${GY + 120})" filter="url(#ppr)"><path d="M-50,30 L50,30 L${50 - 60 * bite},-30 L-50,-10Z" fill="#fff6ea"/><path d="M-50,-10 L${50 - 60 * bite},-30 L${50 - 60 * bite},-18 L-50,2Z" fill="${C.rose}"/><circle cx="-30" cy="-24" r="8" fill="#e8475a"/></g>`;
    return s + woman(GX - 40, GY, SC, { la: 75, ra: 20, look: -4 }, t);
  },
  gemini(u, D, t) { // turns it into a joke: the smiling mask flips to show the sad one behind
    let s = sigil('gemini', 540, ZY, 92);
    const f = Math.cos(cl((u - .9) / .5) * Math.PI);
    const mask = (sad) => `<ellipse cx="0" cy="0" rx="48" ry="58" fill="#fff6ea"/><circle cx="-17" cy="-12" r="7" fill="${C.sky1}"/><circle cx="17" cy="-12" r="7" fill="${C.sky1}"/>
      <path d="${sad ? 'M-20,30 Q0,14 20,30' : 'M-22,16 Q0,38 22,16'}" stroke="${C.sky1}" stroke-width="5" fill="none" stroke-linecap="round"/>${sad ? tear(-17, 12, .9) : ''}`;
    s += `<g transform="translate(${GX + 10},${GY - 30}) scale(${Math.abs(f) + .02},1)" filter="url(#ppr)">${mask(f < 0)}</g>`;
    for (let k = 0; k < 3; k++) s += `<text x="${GX + 130 + k * 36}" y="${GY - 70 - k * 26}" font-family="Cormorant" font-style="italic" font-size="44" fill="${C.gold2}" opacity="${(1 - cl((u - .8) / .3)) * cl((u - .1 - k * .15) / .2)}">ha</text>`;
    return s + woman(GX - 20, GY, SC, { la: 95, ra: 20, look: 0 }, t);
  },
  cancer(u, D, t) { // cleans the whole house at midnight: clock at 12, broom sweeping, sparkles
    let s = sigil('cancer', 540, ZY, 92) + planet('moon', 860, 480, 44, 1, t);
    const cx = 230, cy = 520 - LIFT;
    s += `<g filter="url(#ppr)"><circle cx="${cx}" cy="${cy}" r="70" fill="#fff6ea"/></g><line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 50}" stroke="${C.sky1}" stroke-width="8" stroke-linecap="round"/><line x1="${cx}" y1="${cy}" x2="${cx + 4}" y2="${cy - 34}" stroke="${C.rose}" stroke-width="5" stroke-linecap="round"/>`;
    const sw = Math.sin(u * 7);
    s += `<g transform="translate(${GX + 70},${GY + 120}) rotate(${-20 + sw * 25})" filter="url(#ppr)"><rect x="-4" y="-120" width="8" height="140" fill="#b08a5e"/><path d="M-28,20 L28,20 L36,70 L-36,70Z" fill="${C.gold}"/></g>`;
    for (let k = 0; k < 6; k++) { const ph = (u * 1.5 + k / 6) % 1; s += star(GX + 110 + sw * 40 + k * 12, GY + 240 - ph * 120, 6, C.gold2, 1 - ph); }
    return s + woman(GX - 30, GY, SC, { la: 60 + sw * 25, ra: 50 + sw * 25, lean: 4 }, t);
  },
  leo(u, D, t) { // acts like they don't care — they care: back turned, crown tilted, a hidden tear
    let s = sigil('leo', 540, ZY, 92);
    const dim = cl(u / 1.2);
    s += `<path d="M540,${300 - LIFT} L${540 - 260},${GY + 270} L${540 + 260},${GY + 270}Z" fill="${C.gold2}" opacity="${.18 * (1 - dim * .8)}" filter="url(#blur8)"/>`;
    s += `<path transform="translate(${GX + 6},${GY - 36}) rotate(${18 * dim})" d="M-26,0 L-26,-26 L-13,-12 L0,-32 L13,-12 L26,-26 L26,0Z" fill="${C.gold}" filter="url(#glow)"/>`;
    s += tear(GX - 26, GY + 40 + cl((u - 1.3) / 1) * 60, 1, cl((u - 1.2) / .2));
    return s + woman(GX, GY, SC, { la: 70, ra: 70, look: -8 }, t, { flip: true });
  },
  virgo(u, D, t) { // makes a list and finishes all of it: checkboxes tick in quick succession
    let s = sigil('virgo', 540, ZY - 30, 84);
    const x0 = 560, y0 = 860 - LIFT;
    s += `<g filter="url(#ppr)"><rect x="${x0}" y="${y0}" width="300" height="380" rx="16" fill="#fff6ea"/><rect x="${x0 + 110}" y="${y0 - 16}" width="80" height="32" rx="8" fill="${C.gold}"/></g>`;
    for (let k = 0; k < 6; k++) { const yy = y0 + 60 + k * 54, on = cl((u - .2 - k * .32) / .15);
      s += `<rect x="${x0 + 30}" y="${yy - 16}" width="30" height="30" rx="5" fill="none" stroke="${C.sky2}" stroke-width="3"/><rect x="${x0 + 76}" y="${yy - 4}" width="${150 + (k % 3) * 20}" height="8" rx="4" fill="#c9b6c6"/>`;
      if (on > 0) s += `<path d="M${x0 + 34},${yy} l9,10 l18,-22" stroke="#3aa37a" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="${40 * on} 40"/>`; }
    return s + woman(GX - 200, GY, SC, { la: 85, ra: 15, look: 2 }, t);
  },
  libra(u, D, t) { // says I'm fine, with a perfect smile: the bubble cracks
    let s = sigil('libra', 540, ZY, 92);
    const c = eo((u - 1.4) / .6);
    s += `<g transform="translate(${GX + 120},${GY - 90})" filter="url(#ppr)"><rect x="-120" y="-56" width="240" height="112" rx="30" fill="#fff6ea"/><path d="M-60,54 L-90,92 L-24,54Z" fill="#fff6ea"/></g>`;
    s += `<text x="${GX + 120}" y="${GY - 76}" text-anchor="middle" font-family="Cormorant" font-weight="600" font-size="56" fill="${C.sky2}">I'm fine ♡</text>`;
    s += `<path d="M${GX + 160},${GY - 146} l-18,34 l20,14 l-22,40" stroke="${C.sky1}" stroke-width="${4 * c}" fill="none" opacity="${c}"/>`;
    return s + woman(GX - 40, GY, SC, { la: 20, ra: 20, look: 4 }, t);
  },
  scorpio(u, D, t) { // disappears and watches from a distance: she fades behind a tree, two glints remain
    let s = sigil('scorpio', 540, ZY, 92);
    const tx = 760;
    const f = cl((u - .5) / 1.2);
    s += woman(GX - 120 + f * 300, GY, SC, { la: 10, ra: 10, look: 2 }, t, { op: 1 - f * .95 });
    s += `<g filter="url(#ppr)"><rect x="${tx - 20}" y="${GY - 60}" width="40" height="320" fill="#4a2c44"/><circle cx="${tx}" cy="${GY - 100}" r="110" fill="#3c2a50"/><circle cx="${tx - 70}" cy="${GY - 40}" r="70" fill="#3c2a50"/><circle cx="${tx + 70}" cy="${GY - 50}" r="76" fill="#3c2a50"/></g>`;
    if (u > 1.8) s += `<circle cx="${tx - 42}" cy="${GY + 10}" r="6" fill="${C.gold2}" filter="url(#glow)"/><circle cx="${tx - 20}" cy="${GY + 10}" r="6" fill="${C.gold2}" filter="url(#glow)"/>`;
    return s + man(GX - 280, GY, SC, { la: 10, ra: 40, look: 6 }, t);
  },
  sagittarius(u, D, t) { // books a trip, anywhere but here: suitcase, a plane crossing the sky
    let s = sigil('sagittarius', 540, ZY, 92);
    const f = eio((u - .3) / (D * .8)), px = lerp(-80, 1160, f), py = lerp(980, 700, f) - LIFT;
    s += `<path d="M-80,${980 - LIFT} Q540,${760 - LIFT} ${px},${py}" fill="none" stroke="#fff6ea" stroke-width="4" stroke-dasharray="4 14" opacity=".6"/>`;
    s += `<g transform="translate(${px},${py}) rotate(-12)"><path d="M-44,0 L40,-6 L52,0 L40,6Z M-6,-4 L-22,-34 L-10,-34 L14,-4Z M-6,4 L-22,34 L-10,34 L14,4Z M-40,-2 L-50,-18 L-42,-18 L-30,-2Z" fill="#fff6ea"/></g>`;
    s += `<g transform="translate(${GX + 110},${GY + 160})" filter="url(#ppr)"><rect x="-55" y="-50" width="110" height="100" rx="12" fill="${C.rose}"/><rect x="-20" y="-72" width="40" height="24" rx="8" fill="none" stroke="#7a4532" stroke-width="7"/><rect x="-55" y="-8" width="110" height="10" fill="${C.gold}"/></g>`;
    return s + woman(GX - 30, GY, SC, { la: 30, ra: 60, look: 14 }, t);
  },
  capricorn(u, D, t) { // works until they can't feel it: a desk, a laptop glow, papers stacking, the clock racing
    let s = sigil('capricorn', 540, ZY, 92);
    s += `<g filter="url(#ppr)"><rect x="560" y="${GY + 150}" width="380" height="20" rx="6" fill="#7a4a5e"/><rect x="590" y="${GY + 170}" width="16" height="90" fill="#5e3550"/><rect x="894" y="${GY + 170}" width="16" height="90" fill="#5e3550"/>
      <rect x="620" y="${GY + 64}" width="150" height="88" rx="8" fill="#3a3f6a"/><rect x="630" y="${GY + 74}" width="130" height="68" rx="4" fill="#c4ccf4" opacity="${.7 + .3 * Math.sin(u * 8)}"/></g>`;
    const n = Math.floor(cl(u / (D * .9)) * 9);
    for (let k = 0; k < n; k++) s += `<rect x="${810 + (k % 2) * 6}" y="${GY + 140 - k * 12}" width="100" height="10" fill="#fff6ea" stroke="#c9b6c6"/>`;
    const cx = 300, cy = 560 - LIFT;
    s += `<circle cx="${cx}" cy="${cy}" r="62" fill="#fff6ea" filter="url(#ppr)"/><line x1="${cx}" y1="${cy}" x2="${cx + Math.sin(u * 6) * 46}" y2="${cy - Math.cos(u * 6) * 46}" stroke="${C.sky1}" stroke-width="5" stroke-linecap="round"/>`;
    return s + woman(GX + 110, GY, SC, { la: 80 + Math.sin(u * 20) * 5, ra: 80 - Math.sin(u * 20) * 5, look: -10 }, t);
  },
  aquarius(u, D, t) { // goes cold and calls it logic: ice crystals grow around her, the scene tints blue
    let s = sigil('aquarius', 540, ZY, 92);
    const f = eio(u / (D * .8));
    s += `<rect x="0" y="-400" width="1080" height="2800" fill="#9fd6e8" opacity="${.12 * f}"/>`;
    for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2 + .3, r = 170, x = GX + Math.cos(a) * r, y = GY + 110 + Math.sin(a) * r * .9, sz = 26 * eb((u - .2 - k * .15) / .5);
      if (sz <= 0) continue; let g = ''; for (let j = 0; j < 3; j++) g += `<line x1="${-sz}" y1="0" x2="${sz}" y2="0" transform="rotate(${j * 60})" stroke="#e8fbff" stroke-width="4" stroke-linecap="round"/>`;
      s += `<g transform="translate(${x},${y}) rotate(${u * 20})" filter="url(#glow)">${g}</g>`; }
    s += `<text x="${GX + 170}" y="${GY - 70}" font-family="Cinzel" font-weight="600" font-size="46" fill="#e8fbff" opacity="${cl((u - 1) / .4)}">A + B = ?</text>`;
    return s + woman(GX - 20, GY, SC, { la: 115, ra: 115, look: 0 }, t);
  },
  pisces(u, D, t) { // writes it into a song no one will hear: notes rise from her notebook, the book closes
    let s = sigil('pisces', 540, ZY, 92);
    const close = eo((u - 2.2) / .5);
    s += `<g transform="translate(${GX + 50},${GY + 110})" filter="url(#ppr)"><rect x="${-70 + 70 * close}" y="-46" width="${70 - 70 * close}" height="92" fill="#fff6ea"/><rect x="0" y="-46" width="70" height="92" fill="#f2e6d8"/><rect x="-3" y="-46" width="6" height="92" fill="${C.gold}"/></g>`;
    for (let k = 0; k < 6; k++) { const ph = (u * .8 + k / 6) % 1; if (close > .9) continue; s += `<text x="${GX + 40 + Math.sin(ph * 6 + k) * 40}" y="${GY + 60 - ph * 260}" font-family="DejaVu Sans" font-size="${30 + k % 2 * 10}" fill="${C.gold2}" opacity="${(1 - ph) * (1 - close)}">${k % 2 ? '♪' : '♫'}</text>`; }
    return s + woman(GX - 50, GY, SC, { la: 70, ra: 40, look: -10 }, t);
  },
  cta(u, D, t) {
    let s = '';
    SIGNS12.forEach((k, i) => { const a = -Math.PI / 2 + i / 12 * Math.PI * 2; s += sigil(k, 540 + Math.cos(a) * 300, 720 + Math.sin(a) * 300, 36, cl((u - i * .05) / .2)); });
    s += `<g transform="translate(540,${720 - LIFT})" opacity="${eo((u - .7) / .5)}"><rect x="-175" y="-62" width="350" height="124" rx="28" fill="#fff6ea"/><path d="M-30,60 L-58,98 L4,60Z" fill="#fff6ea"/><text x="0" y="16" text-anchor="middle" font-family="Cormorant" font-weight="600" font-size="48" fill="${C.sky2}">are you okay? ♡</text></g>`;
    const hug = eo((u - 1.2) / .8);
    return s + woman(GX - 170 + 50 * hug, GY, SC, { la: 12 + 60 * hug, ra: 12, look: 8 }, t) + man(GX + 170 - 50 * hug, GY, SC, { la: 8, ra: 30 + 40 * hug, look: 8 }, t, { flip: true });
  },
};
