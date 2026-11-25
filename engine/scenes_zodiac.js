// Scenes for "How each zodiac sign says I love you" — each sign acts out its love language.
var EL = { fire: ["#ffd2a8", "#ff8f6a", "#c4462e"], earth: ["#fff0cc", "#e7c98e", "#9c7a44"],
           air: ["#f2f4ff", "#c4ccf4", "#7a84c4"], water: ["#e8fbff", "#9fd6e8", "#4f8fb0"] };
var SIGNS = ["aries","taurus","gemini","cancer","leo","virgo","libra","scorpio","sagittarius","capricorn","aquarius","pisces"];
var SG = {aries:"♈",taurus:"♉",gemini:"♊",cancer:"♋",leo:"♌",virgo:"♍",libra:"♎",scorpio:"♏",sagittarius:"♐",capricorn:"♑",aquarius:"♒",pisces:"♓"};
var ELOF = {aries:"fire",leo:"fire",sagittarius:"fire",taurus:"earth",virgo:"earth",capricorn:"earth",gemini:"air",libra:"air",aquarius:"air",cancer:"water",scorpio:"water",pisces:"water"};

// glowing zodiac emblem (screen coords, LIFT-compensated like planets)
function emblem(sign, x, y, r, op = 1) {
  y -= LIFT; const [a, b, c] = EL[ELOF[sign]];
  return `<g opacity="${op}" transform="translate(${x} ${y}) scale(${POP}) translate(${-x} ${-y})">
    <circle cx="${x}" cy="${y}" r="${r * 2}" fill="${b}" opacity=".2" filter="url(#blur20)"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="${C.sky1}" stroke="${C.gold}" stroke-width="${r * .06}" filter="url(#ppr)"/>
    <circle cx="${x}" cy="${y}" r="${r * .84}" fill="none" stroke="${b}" stroke-width="2" opacity=".6"/>
    <text x="${x}" y="${y + r * .06}" text-anchor="middle" dominant-baseline="central" font-family="DejaVu Sans" font-size="${r * 1.05}" fill="${a}" filter="url(#glow)">${SG[sign]}</text></g>`;
}
var EY = 610;  // emblem height on screen
var bubble = (x, y, s, txt, op) => `<g transform="translate(${x},${y}) scale(${s})" opacity="${op}"><rect x="-60" y="-38" width="120" height="76" rx="22" fill="#fff6ea"/><path d="M-12,36 L-30,62 L10,36Z" fill="#fff6ea"/><text x="0" y="12" text-anchor="middle" font-family="Cinzel" font-size="34" fill="${C.sky2}">${txt}</text></g>`;

var SCENES = {
  hook(u, D, t) {
    let s = '';
    SIGNS.forEach((k, i) => { const a = -Math.PI / 2 + i / 12 * Math.PI * 2, p = eb((u - .2 - i * .12) / .45);
      s += emblem(k, 540 + Math.cos(a) * 330, 1010 + Math.sin(a) * 330, 38, cl((u - .2 - i * .12) / .15) * (p > 0 ? 1 : 0)); });
    return s + woman(GX, GY, SC, { look: eo(u / 1.2) * 16, la: 20, ra: 20 }, t);
  },
  aries(u, D, t) { // races you there, to hear you laugh
    let s = emblem('aries', 540, EY, 92);
    const run = eio(u / D), x0 = 160 + run * 520, bob = Math.abs(Math.sin(u * 14)) * 10;
    for (let k = 0; k < 6; k++) s += `<line x1="${x0 - 120 - k * 30}" y1="${GY + 90 + k * 26}" x2="${x0 - 40 - k * 30}" y2="${GY + 90 + k * 26}" stroke="${C.gold2}" stroke-width="4" stroke-linecap="round" opacity="${.5 - k * .07}"/>`;
    s += man(x0 + 160, GY - bob * .6, SC, { la: 70 + Math.sin(u * 14) * 40, ra: 70 - Math.sin(u * 14) * 40, lean: 10 }, t);
    s += woman(x0, GY - bob, SC, { la: 70 - Math.sin(u * 14) * 40, ra: 70 + Math.sin(u * 14) * 40, lean: 10, look: 6 }, t);
    for (let k = 0; k < 4; k++) { const q = cl((u - .9 - k * .25) / .9); if (q > 0) s += `<text x="${x0 + 30 + k * 40}" y="${GY - 40 - q * 140}" font-family="Cormorant" font-style="italic" font-size="${46 + k * 6}" fill="${C.gold2}" opacity="${1 - q}">ha</text>`; }
    return s;
  },
  taurus(u, D, t) { // cooks for you
    let s = emblem('taurus', 540, EY, 92);
    s += `<g filter="url(#ppr)"><rect x="330" y="${GY + 190}" width="420" height="22" rx="6" fill="#7a4a5e"/><rect x="360" y="${GY + 212}" width="14" height="150" fill="#5e3550"/><rect x="706" y="${GY + 212}" width="14" height="150" fill="#5e3550"/>
      <path d="M470,${GY + 150} Q540,${GY + 215} 610,${GY + 150}Z" fill="${C.dress}"/><rect x="462" y="${GY + 144}" width="156" height="10" rx="5" fill="${C.dress2}"/></g>`;
    for (let k = 0; k < 3; k++) { const ph = (u * .9 + k * .33) % 1; s += `<path d="M${505 + k * 35},${GY + 130 - ph * 170} q-14,-22 0,-44 q14,-22 0,-44" stroke="#fff6ea" stroke-width="5" fill="none" stroke-linecap="round" opacity="${(1 - ph) * .7}"/>`; }
    s += heart(540, GY - 80 - ((u * 60) % 120), 1.2, C.rose, .8 * eo((u - .6) / .5));
    return s + woman(GX - 230, GY, SC, { la: 20, ra: 10, look: 4 }, t) + man(GX + 230, GY, SC, { la: 10, ra: 75 * eo((u - .1) / .5), look: 4 }, t, { flip: true });
  },
  gemini(u, D, t) { // talks with you until sunrise
    const rise = eio(u / D);
    let s = `<circle cx="540" cy="${1300 - rise * 230}" r="120" fill="#ffd27a" opacity=".9" filter="url(#glow)"/><rect x="0" y="0" width="1080" height="2400" fill="#ffc79a" opacity="${rise * .18}"/>`;
    s += emblem('gemini', 540, EY - 40, 86);
    const sw = Math.floor(u / .45) % 2;
    s += bubble(GX - 230, GY - 70, .9 + .1 * Math.sin(u * 9), sw ? '•••' : '♡', 1);
    s += bubble(GX + 230, GY - 110, .9 + .1 * Math.cos(u * 9), sw ? '✦' : '•••', 1);
    return s + woman(GX - 210, GY, SC, { la: 40 + Math.sin(u * 6) * 20, ra: 10, look: 4 }, t) + man(GX + 210, GY, SC, { la: 10, ra: 40 + Math.cos(u * 6) * 20, look: 4 }, t, { flip: true });
  },
  cancer(u, D, t) { // remembers the smallest thing you said
    let s = emblem('cancer', 540, EY, 92);
    const p = eb((u - .3) / .5);
    s += `<g transform="translate(${GX - 90},${GY + 120}) scale(${p})" filter="url(#ppr)"><rect x="-34" y="-28" width="68" height="56" rx="6" fill="${C.rose}"/><rect x="-6" y="-28" width="12" height="56" fill="${C.gold}"/><rect x="-34" y="-6" width="68" height="12" fill="${C.gold}"/><circle cx="0" cy="-34" r="10" fill="${C.gold}"/></g>`;
    s += `<circle cx="${GX - 90}" cy="${GY + 120}" r="${90 * p}" fill="${C.gold2}" opacity="${.15 * p}"/>`;
    for (let k = 0; k < 3; k++) s += `<circle cx="${GX + 150 - k * 30}" cy="${GY - 40 - k * 40}" r="${8 + k * 6}" fill="#fff6ea" opacity="${eo((u - .2 - k * .12) / .3)}"/>`;
    s += bubble(GX + 60, GY - 210, 1.1 * eb((u - .55) / .4), '✦', 1);
    return s + woman(GX - 150, GY, SC, { la: 70, ra: 70, look: 4 }, t) + man(GX + 190, GY, SC, { la: 10, ra: 10, look: 12 }, t, { flip: true });
  },
  leo(u, D, t) { // shows you off to the whole world
    let s = `<path d="M540,300 L${540 - 300},${GY + 270} L${540 + 300},${GY + 270}Z" fill="${C.gold2}" opacity=".18" filter="url(#blur8)"/>`;
    s += emblem('leo', 540, EY, 92);
    for (let k = 0; k < 18; k++) { const ph = (u * .7 + rnd(k)) % 1; s += `<rect x="${120 + rnd(k + 4) * 840}" y="${300 + ph * 900}" width="10" height="16" fill="${[C.gold, C.rose, '#fff6ea'][k % 3]}" transform="rotate(${ph * 400 + k * 30} ${120 + rnd(k + 4) * 840} ${300 + ph * 900})" opacity="${1 - ph}"/>`; }
    const lift = eb((u - .2) / .5);
    s += `<path transform="translate(${GX - 60},${GY - 40 - lift * 30}) scale(${lift})" d="M-30,0 L-30,-30 L-15,-14 L0,-38 L15,-14 L30,-30 L30,0Z" fill="${C.gold}" filter="url(#glow)"/>`;
    return s + woman(GX - 60, GY, SC, { la: 10, ra: 160 * lift, look: 10 }, t) + man(GX + 130, GY, SC, { la: 150 * lift, ra: 10, look: 6 }, t, { flip: true });
  },
  virgo(u, D, t) { // quietly fixes what's broken
    let s = emblem('virgo', 540, EY, 92);
    const p = eio((u - .2) / (D * .55)), gap = (1 - p) * 70, gl = cl((u - .2 - D * .55) / .4);
    s += `<g transform="translate(540,${GY - 120}) scale(3.2)" filter="url(#ppr)">
      <path transform="translate(${-gap / 3.2},0) rotate(${-(1 - p) * 14})" d="M0,8 C-12,-6 -26,4 -14,16 L0,28 L-4,20 L3,14 L-3,8Z" fill="${C.rose}"/>
      <path transform="translate(${gap / 3.2},0) rotate(${(1 - p) * 14})" d="M0,8 C12,-6 26,4 14,16 L0,28 L-4,20 L3,14 L-3,8Z" fill="${C.rose}"/></g>`;
    s += `<circle cx="540" cy="${GY - 70}" r="${150 * gl}" fill="${C.gold2}" opacity="${.35 * (1 - gl * .6)}" filter="url(#blur8)"/>`;
    return s + woman(GX - 230, GY + 30, SC, { la: 100, ra: 20, look: 6 }, t);
  },
  libra(u, D, t) { // makes your whole world softer
    let s = emblem('libra', 540, EY, 92);
    for (let k = 0; k < 9; k++) { const x = 150 + k * 98, y = GY + 230 - (k % 2) * 30, p = eb((u - .1 - k * .1) / .45); if (p <= 0) continue;
      s += `<g transform="translate(${x},${y}) scale(${p})" filter="url(#ppr)"><rect x="-2" y="0" width="4" height="40" fill="#8a9a6a"/>`;
      for (let j = 0; j < 5; j++) s += `<ellipse cx="0" cy="-12" rx="9" ry="18" transform="rotate(${j * 72})" fill="${[C.rose, '#fff6ea', C.gold][k % 3]}"/>`;
      s += `<circle cx="0" cy="0" r="7" fill="${C.gold}"/></g>`; }
    return s + woman(GX, GY, SC, { la: 50 + Math.sin(u * 3) * 10, ra: 50 + Math.cos(u * 3) * 10, look: 8 }, t);
  },
  scorpio(u, D, t) { // tells you the secret they never tell
    let s = emblem('scorpio', 540, EY, 92);
    const fly = eio((u - .2) / .9), open = eb((u - 1.15) / .4);
    s += `<g transform="translate(540,${GY - 60})" filter="url(#ppr)"><path d="M-34,0 L-34,${-40 - open * 30} A34,34 0 0 1 34,${-40 - open * 30} L34,${-10 - open * 30}" fill="none" stroke="${C.gold}" stroke-width="12"/>
      <rect x="-52" y="-6" width="104" height="86" rx="12" fill="${C.gold}"/><circle cx="0" cy="30" r="10" fill="${C.sky1}"/><rect x="-4" y="30" width="8" height="24" fill="${C.sky1}"/></g>`;
    if (open > 0) s += `<circle cx="540" cy="${GY - 30}" r="${200 * cl(open)}" fill="${C.gold2}" opacity="${.3 * (1 - cl(open) * .5)}" filter="url(#blur8)"/>`;
    const kx = lerp(GX + 230, 540, fly), ky = lerp(GY + 80, GY - 30, fly) - Math.sin(fly * Math.PI) * 120;
    if (open < .2) s += `<g transform="translate(${kx},${ky}) rotate(${fly * 360})"><circle r="14" fill="none" stroke="${C.gold2}" stroke-width="6"/><rect x="12" y="-3" width="44" height="6" fill="${C.gold2}"/><rect x="42" y="3" width="6" height="12" fill="${C.gold2}"/></g>`;
    return s + woman(GX - 250, GY, SC, { la: 20, ra: 10, look: 6 }, t) + man(GX + 250, GY, SC, { la: 10, ra: 60 * (1 - fly) + 10, look: 4 }, t, { flip: true });
  },
  sagittarius(u, D, t) { // takes you somewhere new
    let s = emblem('sagittarius', 540, EY, 92);
    const f = eio(u / (D * .8)), ax = lerp(200, 980, f), ay = lerp(1150, 700, f);
    s += `<path d="M200,1150 Q590,850 ${ax},${ay}" stroke="${C.gold}" stroke-width="4" fill="none" stroke-dasharray="6 14" opacity=".8"/>`;
    s += `<g transform="translate(${ax},${ay}) rotate(-32)" filter="url(#glow)"><rect x="-60" y="-3" width="60" height="6" fill="${C.gold2}"/><path d="M0,-12 L22,0 L0,12Z" fill="${C.gold2}"/><path d="M-60,-10 L-48,0 L-60,10" stroke="${C.gold2}" stroke-width="4" fill="none"/></g>`;
    s += `<path d="M${GX - 40},${GY + 260} Q${GX + 120},${GY + 120} ${GX + 320},${GY + 40}" stroke="#fff6ea" stroke-width="6" fill="none" stroke-dasharray="10 16" opacity=".5"/>`;
    const w = eo(u / D) * 70;
    return s + woman(GX - 140 + w, GY, SC, { la: 25, ra: 50, look: 10, lean: 4 }, t) + man(GX - 10 + w, GY, SC, { la: 80, ra: 15, look: 10, lean: 4 }, t);
  },
  capricorn(u, D, t) { // builds a future with your name in it
    let s = emblem('capricorn', 540, EY, 92);
    const p = eio(u / (D * .75)), L = 1300;
    s += `<path d="M380,${GY + 250} L380,${GY + 60} L540,${GY - 60} L700,${GY + 60} L700,${GY + 250} M500,${GY + 250} L500,${GY + 150} L580,${GY + 150} L580,${GY + 250}" fill="none" stroke="${C.gold}" stroke-width="8" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L * (1 - p)}" filter="url(#glow)"/>`;
    s += heart(540, GY + 60, 1.4, C.rose, eb((u - D * .7) / .4) > 0 ? cl((u - D * .7) / .3) : 0);
    return s + woman(GX - 290, GY, SC, { la: 30, ra: 10, look: 6 }, t) + man(GX + 290, GY, SC, { la: 10, ra: 30, look: 6 }, t, { flip: true });
  },
  aquarius(u, D, t) { // lets you be your strangest self
    let s = emblem('aquarius', 540, EY, 92);
    const fl = eo(u / .8) * 70 + Math.sin(u * 3) * 10;
    for (let k = 0; k < 7; k++) { const a = u * 1.6 + k / 7 * Math.PI * 2, x = GX + Math.cos(a) * 190, y = GY + 80 - fl + Math.sin(a) * 80;
      const sh = k % 3; s += sh === 0 ? star(x, y, 14, C.gold2, .9) : sh === 1 ? `<circle cx="${x}" cy="${y}" r="12" fill="none" stroke="#c4ccf4" stroke-width="4"/>` : `<path d="M${x - 14},${y} q7,-14 14,0 t14,0" stroke="${C.rose}" stroke-width="4" fill="none"/>`; }
    return s + woman(GX - 40, GY - fl, SC, { la: 120 + Math.sin(u * 4) * 20, ra: 120 + Math.cos(u * 4) * 20, look: 12, lean: Math.sin(u * 2) * 6 }, t) + man(GX + 250, GY, SC * .95, { la: 10, ra: 30, look: 14 }, t, { flip: true });
  },
  pisces(u, D, t) { // feels your pain before you say it
    let s = emblem('pisces', 540, EY, 92);
    for (let k = 0; k < 3; k++) { const r = ((u * 140 + k * 120) % 360); s += `<ellipse cx="${GX}" cy="${GY + 255}" rx="${r}" ry="${r * .17}" fill="none" stroke="#9fd6e8" stroke-width="3" opacity="${(1 - r / 360) * .7}"/>`; }
    const td = cl((u - .2) / 1.2);
    s += `<path transform="translate(${GX - 70},${GY + 40 + td * 60})" d="M0,-10 C6,0 8,6 0,12 C-8,6 -6,0 0,-10Z" fill="#9fd6e8" opacity="${1 - td * .5}"/>`;
    return s + woman(GX - 80, GY, SC, { la: 12, ra: 12, look: -4 }, t) + man(GX + 70, GY, SC, { la: 10, ra: 95 * eo((u - .3) / .6), look: 6 }, t, { flip: true });
  },
  cta(u, D, t) {
    let s = '';
    SIGNS.forEach((k, i) => { const a = -Math.PI / 2 + i / 12 * Math.PI * 2; s += emblem(k, 540 + Math.cos(a) * 300, 720 + Math.sin(a) * 300, 36, cl((u - i * .05) / .2)); });
    s += `<g transform="translate(540,${720 - LIFT})" opacity="${eo((u - .7) / .5)}"><rect x="-150" y="-62" width="300" height="124" rx="28" fill="#fff6ea"/><path d="M-30,60 L-58,98 L4,60Z" fill="#fff6ea"/><text x="0" y="18" text-anchor="middle" font-family="DejaVu Sans" font-size="54" fill="${C.sky2}">♋ ♌ ♓</text></g>`;
    return s + woman(GX - 170, GY, SC, { la: 12, ra: 12, look: 10 }, t) + man(GX + 170, GY, SC, { la: 8, ra: 30, look: 8 }, t, { flip: true });
  },
};
