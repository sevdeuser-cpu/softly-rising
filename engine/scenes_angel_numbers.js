// Scenes for "Angel numbers 111–999" — each number appears where people really notice it.
var NUMC = { a111: "#ffd27a", a222: "#c4ccf4", a333: "#ff8f7a", a444: "#9fd6e8", a555: "#e7c98e", a666: "#f5c3ba", a777: "#fff1c9", a888: "#f6d49a", a999: "#c9a8ff" };
function numPlaque(txt, x, y, col, op = 1) {
  y -= LIFT;
  return `<g opacity="${op}" transform="translate(${x} ${y}) scale(${POP}) translate(${-x} ${-y})">
    <ellipse cx="${x}" cy="${y}" rx="230" ry="110" fill="${col}" opacity=".14" filter="url(#blur20)"/>
    <rect x="${x - 150}" y="${y - 62}" width="300" height="124" rx="62" fill="${C.sky1}" stroke="${C.gold}" stroke-width="5" filter="url(#ppr)"/>
    <text x="${x}" y="${y + 4}" text-anchor="middle" dominant-baseline="central" font-family="Cinzel" font-weight="600" font-size="78" letter-spacing="10" fill="${col}" filter="url(#glow)">${txt}</text></g>`;
}
var PY = 610;
var lcd = (x, y, txt, s = 1) => `<g transform="translate(${x},${y}) scale(${s})" filter="url(#ppr)"><rect x="-110" y="-50" width="220" height="100" rx="16" fill="#2a1f3a"/></g><text x="${x}" y="${y + 18 * s}" text-anchor="middle" font-family="Jost" font-size="${62 * s}" fill="#ff8f7a" filter="url(#glow)">${txt}</text>`;

var SCENES = {
  hook(u, D, t) { // repeating numbers keep popping up around her
    let s = '';
    const nums = ['11:11', '222', '3:33', '444', '555', '777', '888', '999', '1:11'];
    nums.forEach((n, i) => { const p = eb((u - .2 - i * .22) / .4); if (p <= 0) return; const a = i * 2.4, r = 260 + (i % 3) * 70;
      s += `<text x="${540 + Math.cos(a) * r}" y="${1120 + Math.sin(a) * r * .55 - LIFT}" text-anchor="middle" font-family="Cinzel" font-weight="600" font-size="${44 * p}" fill="${C.gold2}" opacity="${.85 * cl((u - .2 - i * .22) / .15)}" filter="url(#glow)">${n}</text>`; });
    return s + woman(GX, GY, SC, { look: Math.sin(u * 2) * 10, la: 20, ra: 20 }, t);
  },
  a111(u, D, t) { // 1:11 on the bedside clock, a shooting star: make a wish
    let s = numPlaque('111', 540, PY, NUMC.a111);
    s += `<g filter="url(#ppr)"><rect x="660" y="${GY + 150}" width="230" height="110" rx="8" fill="#6a4466"/></g>` + lcd(775, GY + 100, '1:11', .9);
    const f = cl((u - .8) / .9);
    if (f > 0 && f < 1) s += `<path d="M${880 - f * 700},${720 - LIFT + f * 260} l${120},${-46}" stroke="${C.gold2}" stroke-width="5" stroke-linecap="round" opacity="${1 - f}" filter="url(#glow)"/>` + star(880 - f * 700, 720 - LIFT + f * 260, 12, C.gold2, 1);
    return s + woman(GX - 90, GY, SC, { la: 140 * eo((u - 1.4) / .5), ra: 140 * eo((u - 1.4) / .5), look: 14 }, t);
  },
  a222(u, D, t) { // $2.22 on a receipt; two planets slide into alignment: trust the timing
    let s = numPlaque('222', 540, PY, NUMC.a222);
    s += `<g transform="translate(${GX + 200},${GY + 40}) rotate(6)" filter="url(#ppr)"><path d="M-70,-110 L70,-110 L70,110 L60,100 L50,110 L40,100 L30,110 L20,100 L10,110 L0,100 L-10,110 L-20,100 L-30,110 L-40,100 L-50,110 L-60,100 L-70,110Z" fill="#fff6ea"/>
      <rect x="-50" y="-80" width="100" height="6" fill="#c9b6c6"/><rect x="-50" y="-60" width="70" height="6" fill="#c9b6c6"/><rect x="-50" y="-40" width="90" height="6" fill="#c9b6c6"/>
      <text x="0" y="40" text-anchor="middle" font-family="Jost" font-size="38" fill="${C.sky2}">$2.22</text></g>`;
    const a = eio((u - .4) / 1.6);
    s += planet('mercury', 220 + a * 120, 860, 36, 1, t) + planet('venus', 340 + (1 - a) * 160, 860 - (1 - a) * 120, 40, 1, t);
    if (a > .97) s += `<circle cx="340" cy="${860 - LIFT}" r="90" fill="none" stroke="${C.gold}" stroke-width="3" opacity=".8"/>`;
    return s + woman(GX - 60, GY, SC, { la: 20, ra: 20, look: 10 }, t);
  },
  a333(u, D, t) { // 333 on a front door; three soft lights lift her up: you're supported
    let s = numPlaque('333', 540, PY, NUMC.a333);
    s += `<g filter="url(#ppr)"><rect x="700" y="${GY - 30}" width="170" height="290" rx="8" fill="#6a3b4e"/><rect x="745" y="${GY + 10}" width="80" height="40" rx="6" fill="${C.gold}"/><circle cx="845" cy="${GY + 150}" r="8" fill="${C.gold}"/></g>`;
    s += `<text x="785" y="${GY + 40}" text-anchor="middle" font-family="Cinzel" font-weight="600" font-size="30" fill="${C.sky1}">333</text>`;
    const lift = eo((u - .6) / 1) * 40;
    for (let k = 0; k < 3; k++) { const a = -Math.PI / 2 + (k - 1) * .9 + Math.sin(u * 2 + k) * .1; s += `<circle cx="${GX - 140 + Math.cos(a) * 140}" cy="${GY + 100 - lift + Math.sin(a) * 90 + 120}" r="16" fill="${C.gold2}" opacity=".9" filter="url(#glow)"/>`; }
    return s + woman(GX - 140, GY - lift, SC, { la: 40, ra: 40, look: 8 }, t);
  },
  a444(u, D, t) { // 4:44 on the phone; a dome of light closes around her: you are protected
    let s = numPlaque('444', 540, PY, NUMC.a444);
    const d = eo((u - .5) / .8);
    s += `<path d="M${GX - 230},${GY + 255} A230,${300 * d} 0 0 1 ${GX + 230},${GY + 255}" fill="#9fd6e8" fill-opacity=".1" stroke="#9fd6e8" stroke-width="4" opacity="${d}" filter="url(#glow)"/>`;
    s += `<g transform="translate(${GX + 60},${GY + 70})" filter="url(#ppr)"><rect x="-26" y="-46" width="52" height="92" rx="10" fill="#2a1f3a"/><rect x="-20" y="-38" width="40" height="72" rx="4" fill="#3f4f7a"/></g><text x="${GX + 60}" y="${GY + 74}" text-anchor="middle" font-family="Jost" font-size="20" fill="#e8fbff">4:44</text>`;
    return s + woman(GX - 20, GY, SC, { la: 75, ra: 15, look: 4 }, t);
  },
  a555(u, D, t) { // 555 on a license plate; leaves swirl on a wind of change
    let s = numPlaque('555', 540, PY, NUMC.a555);
    s += `<g filter="url(#ppr)"><rect x="640" y="${GY + 120}" width="300" height="110" rx="40" fill="#c4577f"/><rect x="660" y="${GY + 80}" width="180" height="70" rx="30" fill="#c4577f"/><circle cx="700" cy="${GY + 232}" r="30" fill="#2a1f3a"/><circle cx="880" cy="${GY + 232}" r="30" fill="#2a1f3a"/><rect x="740" y="${GY + 170}" width="110" height="40" rx="6" fill="#fff6ea"/></g>`;
    s += `<text x="795" y="${GY + 200}" text-anchor="middle" font-family="Jost" font-size="30" fill="${C.sky1}">555</text>`;
    for (let k = 0; k < 10; k++) { const ph = (u * .6 + k / 10) % 1, a = ph * Math.PI * 4 + k; s += `<ellipse cx="${GX - 120 + ph * 600 + Math.cos(a) * 40}" cy="${GY + 40 - Math.sin(a) * 60 - ph * 200}" rx="12" ry="6" transform="rotate(${a * 60} ${GX - 120 + ph * 600} ${GY + 40 - ph * 200})" fill="${['#e7c98e', '#ff8f7a', '#c99a5c'][k % 3]}" opacity="${1 - ph}"/>`; }
    return s + woman(GX - 180, GY, SC, { la: 30, ra: 30, look: 6, lean: 6 }, t);
  },
  a666(u, D, t) { // a mug marked 666, a candle, a deep breath: come back to yourself
    let s = numPlaque('666', 540, PY, NUMC.a666);
    s += `<g filter="url(#ppr)"><rect x="650" y="${GY + 190}" width="320" height="16" rx="6" fill="#7a4a5e"/><rect x="690" y="${GY + 110}" width="80" height="84" rx="12" fill="#fff6ea"/><path d="M770,${GY + 125} q30,0 30,22 q0,22 -30,22" stroke="#fff6ea" stroke-width="10" fill="none"/>
      <rect x="860" y="${GY + 100}" width="44" height="94" rx="6" fill="#f5e0c8"/></g>`;
    s += `<text x="730" y="${GY + 160}" text-anchor="middle" font-family="Cinzel" font-weight="600" font-size="26" fill="${C.rose}">666</text>`;
    s += `<path transform="translate(882,${GY + 96}) scale(${1 + .1 * Math.sin(u * 12)})" d="M0,-34 C10,-18 14,-6 8,4 C4,10 -4,10 -8,4 C-14,-6 -10,-18 0,-34Z" fill="#ffd27a" filter="url(#glow)"/>`;
    for (let k = 0; k < 2; k++) { const ph = (u * .7 + k * .5) % 1; s += `<path d="M${715 + k * 30},${GY + 100 - ph * 120} q-10,-18 0,-36 q10,-18 0,-36" stroke="#fff6ea" stroke-width="4" fill="none" opacity="${(1 - ph) * .7}"/>`; }
    const br = .5 + .5 * Math.sin(u * 2.2);
    s += `<circle cx="${GX - 100}" cy="${GY + 80}" r="${120 + br * 30}" fill="${C.rose}" opacity="${.08 + br * .06}" filter="url(#blur8)"/>`;
    return s + woman(GX - 100, GY, SC, { la: 115, ra: 115, look: -6 + br * 6 }, t);
  },
  a777(u, D, t) { // a glowing path of stepping stones lights up ahead of her: right path
    let s = numPlaque('777', 540, PY, NUMC.a777);
    const n = 7, lit = cl(u / (D * .7)) * n;
    for (let k = 0; k < n; k++) { const q = k / (n - 1), x = lerp(GX - 160, 980, q), y = lerp(GY + 255, GY + 90, q), sz = 1 - q * .55, on = cl(lit - k);
      s += `<ellipse cx="${x}" cy="${y}" rx="${60 * sz}" ry="${16 * sz}" fill="${on > 0 ? C.gold2 : '#5a4470'}" opacity="${.5 + .5 * on}" ${on > 0 ? 'filter="url(#glow)"' : ''}/>`; }
    const w = eo(u / D) * 120;
    return s + woman(GX - 160 + w, GY - w * .3, SC * (1 - w / 1200), { la: 25 + Math.sin(u * 6) * 15, ra: 25 - Math.sin(u * 6) * 15, look: 6 }, t);
  },
  a888(u, D, t) { // golden coins and stars fall into a glass jar marked 888
    let s = numPlaque('888', 540, PY, NUMC.a888);
    const fill = cl(u / (D * .85));
    s += `<g filter="url(#ppr)"><rect x="${GX + 110}" y="${GY + 90 + 160 * (1 - fill)}" width="160" height="${160 * fill}" fill="${C.gold}" opacity=".85"/></g>`;
    s += `<rect x="${GX + 100}" y="${GY + 60}" width="180" height="200" rx="26" fill="#e8fbff" fill-opacity=".18" stroke="#e8fbff" stroke-width="5"/><rect x="${GX + 120}" y="${GY + 40}" width="140" height="26" rx="8" fill="#b08a5e"/>`;
    s += `<text x="${GX + 190}" y="${GY + 170}" text-anchor="middle" font-family="Cinzel" font-weight="600" font-size="40" fill="${C.sky1}">888</text>`;
    for (let k = 0; k < 7; k++) { const ph = (u * 1.1 + k / 7) % 1; s += `<circle cx="${GX + 150 + (k % 4) * 25}" cy="${GY - 200 + ph * 300}" r="13" fill="${C.gold}" stroke="#c99a5c" stroke-width="3" opacity="${1 - ph * .6}"/>`; }
    return s + woman(GX - 140, GY, SC, { la: 70, ra: 20, look: 8 }, t);
  },
  a999(u, D, t) { // a book closes on "the end" while a door of light opens: an ending makes room
    let s = numPlaque('999', 540, PY, NUMC.a999);
    const c = eo((u - .3) / .8), o = eo((u - 1.5) / 1.2);
    s += `<g transform="translate(${GX - 230},${GY + 130})" filter="url(#ppr)"><rect x="${-80 + 80 * c}" y="-56" width="${80 - 80 * c}" height="112" fill="#fff6ea"/><rect x="0" y="-56" width="80" height="112" fill="#f2e6d8"/><rect x="-3" y="-56" width="6" height="112" fill="${C.gold}"/></g>`;
    if (c < .6) s += `<text x="${GX - 190}" y="${GY + 140}" text-anchor="middle" font-family="Cormorant" font-style="italic" font-size="22" fill="${C.sky2}">the end</text>`;
    const dx = 800;
    s += `<rect x="${dx - 70}" y="${GY + 20}" width="140" height="238" fill="${C.gold2}" opacity="${o}" filter="url(#glow)"/><path d="M${dx - 70},${GY + 20} L${dx - 70 + 140 * (1 - o * .75)},${GY + 38 * o + 20} L${dx - 70 + 140 * (1 - o * .75)},${GY + 258 - 18 * o} L${dx - 70},${GY + 258}Z" fill="#6a4a7a"/><rect x="${dx - 78}" y="${GY + 12}" width="156" height="250" fill="none" stroke="${C.gold}" stroke-width="6"/>`;
    if (o > 0) s += `<path d="M${dx},${GY + 140} L${GX},${GY + 250} L${dx + 40},${GY + 262}Z" fill="${C.gold2}" opacity="${.18 * o}"/>`;
    return s + woman(GX + 40 + 60 * o, GY, SC, { la: 20 + 40 * o, ra: 15, look: 4 }, t);
  },
  cta(u, D, t) {
    let s = '';
    ['111', '222', '333', '444', '555', '666', '777', '888', '999'].forEach((n, i) => { const a = -Math.PI / 2 + i / 9 * Math.PI * 2, x = 540 + Math.cos(a) * 300, y = 720 + Math.sin(a) * 300 - LIFT, op = cl((u - i * .06) / .2);
      s += `<g opacity="${op}"><rect x="${x - 58}" y="${y - 28}" width="116" height="56" rx="28" fill="${C.sky1}" stroke="${C.gold}" stroke-width="3"/><text x="${x}" y="${y + 12}" text-anchor="middle" font-family="Cinzel" font-weight="600" font-size="32" fill="${C.gold2}">${n}</text></g>`; });
    s += `<g transform="translate(540,${720 - LIFT})" opacity="${eo((u - .6) / .5)}"><rect x="-120" y="-60" width="240" height="120" rx="28" fill="#fff6ea"/><path d="M-30,58 L-58,96 L4,58Z" fill="#fff6ea"/><text x="0" y="20" text-anchor="middle" font-family="Cinzel" font-weight="600" font-size="56" fill="${C.sky2}">11:11</text></g>`;
    return s + woman(GX - 170, GY, SC, { la: 12, ra: 12, look: 10 }, t) + man(GX + 170, GY, SC, { la: 8, ra: 30, look: 8 }, t, { flip: true });
  },
};
