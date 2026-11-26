// Scenes for "Your birth number (1–9) and the gift it carries".
var NY = 610;   // medallion height on screen
function numMedal(n, x, y, r, op = 1) {
  y -= LIFT;
  return `<g opacity="${op}" transform="translate(${x} ${y}) scale(${POP}) translate(${-x} ${-y})">
    <circle cx="${x}" cy="${y}" r="${r * 2}" fill="${C.gold}" opacity=".16" filter="url(#blur20)"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="${C.sky1}" stroke="${C.gold}" stroke-width="${r * .06}" filter="url(#ppr)"/>
    <circle cx="${x}" cy="${y}" r="${r * .82}" fill="none" stroke="${C.rose}" stroke-width="2" stroke-dasharray="2 7" opacity=".8"/>
    <text x="${x}" y="${y + r * .04}" text-anchor="middle" dominant-baseline="central" font-family="Cinzel" font-weight="600" font-size="${r * 1.15}" fill="${C.gold2}" filter="url(#glow)">${n}</text></g>`;
}
var digit = (x, y, n, s, op) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Cinzel" font-weight="600" font-size="${s}" fill="${C.gold2}" opacity="${op}" filter="url(#glow)">${n}</text>`;

var SCENES = {
  hook(u, D, t) { // nine numbers float up around her like lanterns
    let s = '';
    for (let k = 1; k <= 9; k++) { const a = Math.PI * (1.1 + (k - 1) / 8 * .8), p = eb((u - .2 - k * .16) / .45);
      s += numMedal(k, 540 + Math.cos(a) * 340, 1270 + Math.sin(a) * 340 - Math.sin(u * 1.5 + k) * 10, 40, cl((u - .2 - k * .16) / .15) * (p > 0 ? 1 : 0)); }
    return s + woman(GX, GY, SC, { look: eo(u / 1.2) * 16, la: 30, ra: 30 }, t);
  },
  how(u, D, t) { // 28 -> 2 + 8 = 10 -> 1 + 0 = 1, written on a big calendar page
    let s = `<g filter="url(#ppr)"><rect x="300" y="${470 - LIFT}" width="480" height="420" rx="22" fill="#fff6ea"/><rect x="300" y="${470 - LIFT}" width="480" height="90" rx="22" fill="${C.rose}"/><rect x="300" y="${530 - LIFT}" width="480" height="30" fill="${C.rose}"/></g>`;
    s += `<text x="540" y="${532 - LIFT}" text-anchor="middle" font-family="Jost" font-size="38" letter-spacing="8" fill="#fff6ea">BIRTH DAY</text>`;
    const st = [[0, '28'], [1.4, '2 + 8'], [2.4, '10'], [3.4, '1 + 0'], [4.4, '1']];
    let cur = st[0]; for (const x of st) if (u >= x[0]) cur = x;
    const p = eb((u - cur[0]) / .35);
    s += `<text x="540" y="${790 - LIFT}" text-anchor="middle" font-family="Cinzel" font-weight="600" font-size="${cur[1].length > 2 ? 120 : 190}" fill="${C.sky2}" transform="translate(540 ${720 - LIFT}) scale(${.6 + .4 * p}) translate(-540 ${-(720 - LIFT)})">${cur[1]}</text>`;
    if (u > 4.4) s += `<circle cx="540" cy="${720 - LIFT}" r="${190 * eo((u - 4.4) / .5)}" fill="none" stroke="${C.gold}" stroke-width="6" opacity="${1 - eo((u - 4.6) / .8)}"/>`;
    return s + woman(GX + 250, GY, SC * .9, { la: 110, ra: 10, look: 6 }, t);
  },
  n1(u, D, t) { // you begin what others only dream about: she lights the first star, a path of stars follows
    let s = numMedal(1, 540, NY, 92);
    const p = eio((u - .3) / 1.6);
    const pts = [[620, 1040], [700, 900], [800, 820], [900, 760]];
    pts.forEach((q, i) => { const on = cl(p * 4 - i); if (on > 0) s += star(q[0], q[1] - LIFT, 10 + i * 3, C.gold2, on); });
    s += `<path d="M${GX + 40},${GY + 60} L${pts.map(q => `${q[0]},${q[1] - LIFT}`).join(' L')}" fill="none" stroke="${C.gold}" stroke-width="3" stroke-dasharray="${900 * p} 900" opacity=".8"/>`;
    for (let k = 0; k < 3; k++) s += `<g opacity=".55">${man(GX - 300 + k * 90, GY + 60, SC * .7, { la: 6, ra: 6, look: 14 }, t + k)}</g>`;
    return s + woman(GX + 20, GY, SC, { la: 150, ra: 15, look: 14, lean: -4 }, t);
  },
  n2(u, D, t) { // you bring peace into every room: two figures turn toward each other, soft rings calm the air
    let s = numMedal(2, 540, NY, 92);
    for (let k = 0; k < 4; k++) { const r = ((u * 150 + k * 100) % 400); s += `<circle cx="${GX}" cy="${GY + 120}" r="${r}" fill="none" stroke="#c4ccf4" stroke-width="3" opacity="${(1 - r / 400) * .6}"/>`; }
    const turn = eo((u - .5) / .6);
    s += `<path d="M${GX - 250},${GY + 60} Q${GX},${GY - 40} ${GX + 250},${GY + 60}" fill="none" stroke="${C.gold}" stroke-width="4" stroke-dasharray="6 10" opacity="${turn}"/>`;
    return s + man(GX - 250, GY, SC, { la: 10, ra: 30 + 30 * turn, look: 4 }, t) + woman(GX, GY, SC, { la: 70, ra: 70, look: 6 }, t) + man(GX + 250, GY, SC, { la: 30 + 30 * turn, ra: 10, look: 4 }, t, { flip: true });
  },
  n3(u, D, t) { // your joy is contagious: notes and sparkles burst, others start to dance
    let s = numMedal(3, 540, NY, 92);
    for (let k = 0; k < 10; k++) { const ph = (u * .8 + k * .1) % 1, a = k / 10 * Math.PI * 2;
      const x = GX + Math.cos(a) * 80 * (1 + ph * 3), y = GY + 60 + Math.sin(a) * 50 * (1 + ph * 3) - ph * 160;
      s += k % 2 ? star(x, y, 10, C.gold2, 1 - ph) : `<text x="${x}" y="${y}" font-family="DejaVu Sans" font-size="40" fill="${C.rose}" opacity="${1 - ph}">♪</text>`; }
    const sw = Math.sin(u * 6);
    return s + woman(GX - 260, GY, SC * .9, { la: 90 + sw * 40, ra: 90 - sw * 40, lean: -sw * 5 }, t) + woman(GX, GY, SC, { la: 150 + sw * 15, ra: 150 - sw * 15, lean: sw * 6, look: 10 }, t) + man(GX + 260, GY, SC * .95, { la: 90 - sw * 40, ra: 90 + sw * 40, lean: sw * 5 }, t, { flip: true });
  },
  n4(u, D, t) { // people build their lives on your loyalty: blocks stack, others stand on them
    let s = numMedal(4, 540, NY, 92);
    for (let k = 0; k < 4; k++) { const p = eb((u - .2 - k * .3) / .4); if (p <= 0) continue;
      s += `<g transform="translate(0,${(1 - p) * -200})" opacity="${cl(p)}" filter="url(#ppr)"><rect x="${330 + (k % 2) * 210}" y="${GY + 255 - (Math.floor(k / 2) + 1) * 70}" width="200" height="66" rx="6" fill="#4a3368" stroke="${C.gold}" stroke-width="2"/></g>`; }
    const up = eo((u - 1.6) / .6);
    return s + woman(GX - 330, GY, SC, { la: 60, ra: 10, look: 6 }, t) + man(GX, GY - 140 * up, SC * .9, { la: 120 * up, ra: 120 * up, look: 10 }, t, { op: up > 0 ? 1 : 0 });
  },
  n5(u, D, t) { // you were born to be free: the cage opens, birds fly
    let s = numMedal(5, 540, NY, 92);
    const open = eb((u - .3) / .5);
    s += `<g filter="url(#ppr)"><path d="M${GX + 160},${GY + 40} q70,-90 140,0 v160 h-140z" fill="none" stroke="${C.gold}" stroke-width="5"/>`;
    for (let k = 1; k < 5; k++) s += `<line x1="${GX + 160 + k * 28}" y1="${GY + 0}" x2="${GX + 160 + k * 28}" y2="${GY + 200}" stroke="${C.gold}" stroke-width="3"/>`;
    s += `<rect x="${GX + 160}" y="${GY + 60}" width="${140 * (1 - open)}" height="140" fill="none" stroke="${C.gold2}" stroke-width="4"/></g>`;
    for (let k = 0; k < 5; k++) { const f = cl((u - .5 - k * .12) / 1.4); if (f <= 0) continue; const x = GX + 230 + f * (200 + k * 60) * (k % 2 ? 1 : -.6), y = GY + 120 - f * (500 + k * 40), w = Math.sin(u * 20 + k) * 10;
      s += `<path d="M${x - 16},${y - w} Q${x},${y + 6} ${x + 16},${y - w}" stroke="#fff6ea" stroke-width="5" fill="none" stroke-linecap="round"/>`; }
    return s + woman(GX - 120, GY, SC, { la: 160 * eo((u - .5) / .5), ra: 160 * eo((u - .5) / .5), look: 16 }, t);
  },
  n6(u, D, t) { // you love like a home: a glowing house, a hug
    let s = numMedal(6, 540, NY, 92);
    s += `<g filter="url(#ppr)"><path d="M380,${GY + 250} L380,${GY + 60} L540,${GY - 50} L700,${GY + 60} L700,${GY + 250}Z" fill="#5a3a62"/>
      <rect x="420" y="${GY + 100}" width="70" height="60" fill="${C.gold2}" opacity="${.5 + .5 * eo(u / .6)}"/><rect x="590" y="${GY + 100}" width="70" height="60" fill="${C.gold2}" opacity="${.5 + .5 * eo((u - .3) / .6)}"/></g>`;
    for (let k = 0; k < 3; k++) { const ph = (u * .6 + k * .33) % 1; s += heart(620, GY - 60 - ph * 200, .8 + ph * .5, C.rose, 1 - ph); }
    const hug = eo((u - .2) / .7);
    return s + woman(GX - 330 + 60 * hug, GY, SC, { la: 20 + 80 * hug, ra: 10, look: 4 }, t) + man(GX - 160 - 40 * hug, GY, SC, { la: 10, ra: 20 + 80 * hug, look: 4 }, t, { flip: true });
  },
  n7(u, D, t) { // you see what others miss: a hidden constellation appears through her lens
    let s = numMedal(7, 540, NY - 40, 82);
    const p = eio((u - .3) / 1.3);
    const pts = [[700, 900], [780, 860], [860, 900], [830, 980], [740, 990], [700, 900]];
    s += `<polyline points="${pts.map(q => `${q[0]},${q[1] - LIFT}`).join(' ')}" fill="none" stroke="${C.gold2}" stroke-width="3" stroke-dasharray="${500 * p} 500" filter="url(#glow)"/>`;
    pts.slice(0, 5).forEach((q, i) => s += star(q[0], q[1] - LIFT, 9, C.gold2, cl(p * 5 - i)));
    s += `<g transform="translate(${GX - 10},${GY + 30}) rotate(-35)" filter="url(#ppr)"><circle r="34" fill="none" stroke="${C.gold}" stroke-width="8"/><circle r="30" fill="#c4ccf4" opacity=".25"/><rect x="-6" y="34" width="12" height="70" rx="5" fill="${C.gold}"/></g>`;
    return s + woman(GX - 80, GY, SC, { la: 100, ra: 10, look: 18 }, t);
  },
  n8(u, D, t) { // you turn effort into abundance: a rising line of light, stars pile into her hands
    let s = numMedal(8, 540, NY, 92);
    const p = eio((u - .2) / 1.4);
    const pts = [[160, 1250], [300, 1180], [420, 1200], [560, 1060], [700, 1000], [860, 820]];
    s += `<polyline points="${pts.map(q => `${q[0]},${q[1] - LIFT}`).join(' ')}" fill="none" stroke="${C.gold}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${1000 * p} 1000" filter="url(#glow)"/>`;
    if (p > .95) s += `<path transform="translate(860,${820 - LIFT}) rotate(-50)" d="M-18,-14 L18,0 L-18,14Z" fill="${C.gold}"/>`;
    for (let k = 0; k < 8; k++) { const ph = (u * .9 + k * .125) % 1; s += star(GX + 150 + Math.sin(k * 2) * 60, GY - 200 + ph * 300, 8, C.gold2, 1 - ph); }
    return s + woman(GX + 150, GY, SC, { la: 65, ra: 65, look: 10 }, t);
  },
  n9(u, D, t) { // an old soul, here to heal: a wilted flower blooms in her light
    let s = numMedal(9, 540, NY, 92);
    const b = eio((u - .3) / 1.2), x = GX + 170, y = GY + 255;
    s += `<circle cx="${x}" cy="${y - 80}" r="${120 * b}" fill="${C.gold2}" opacity="${.22 * b}" filter="url(#blur8)"/>`;
    s += `<g filter="url(#ppr)"><path d="M${x},${y} Q${x - 10 + 30 * (1 - b)},${y - 60} ${x + 40 * (1 - b)},${y - 110 + 40 * (1 - b)}" stroke="#8a9a6a" stroke-width="6" fill="none"/>`;
    for (let j = 0; j < 6; j++) s += `<ellipse cx="${x + 40 * (1 - b)}" cy="${y - 128 + 40 * (1 - b)}" rx="${7 + 9 * b}" ry="${12 + 16 * b}" transform="rotate(${j * 60 + (1 - b) * 40} ${x + 40 * (1 - b)} ${y - 110 + 40 * (1 - b)})" fill="${C.rose}" opacity="${.5 + .5 * b}"/>`;
    s += `<circle cx="${x + 40 * (1 - b)}" cy="${y - 110 + 40 * (1 - b)}" r="${6 + 6 * b}" fill="${C.gold}"/></g>`;
    return s + woman(GX - 60, GY, SC, { la: 85, ra: 20, look: -2, lean: 6 }, t);
  },
  cta(u, D, t) {
    let s = '';
    for (let k = 1; k <= 9; k++) { const a = -Math.PI / 2 + (k - 1) / 9 * Math.PI * 2; s += numMedal(k, 540 + Math.cos(a) * 290, 720 + Math.sin(a) * 290, 40, cl((u - k * .06) / .2)); }
    s += `<g transform="translate(540,${720 - LIFT})" opacity="${eo((u - .7) / .5)}"><rect x="-130" y="-62" width="260" height="124" rx="28" fill="#fff6ea"/><path d="M-30,60 L-58,98 L4,60Z" fill="#fff6ea"/><text x="0" y="22" text-anchor="middle" font-family="Cinzel" font-weight="600" font-size="60" fill="${C.sky2}">3 · 7 · 9</text></g>`;
    return s + woman(GX - 170, GY, SC, { la: 12, ra: 12, look: 10 }, t) + man(GX + 170, GY, SC, { la: 8, ra: 30, look: 8 }, t, { flip: true });
  },
};
