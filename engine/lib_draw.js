// ---------- palette (channel colours: plum night, rose horizon, gold) ----------
var C={ // SOFTLY RISING signature palette: "the rising hour" — aubergine sky melting into coral dawn
  sky0:"#2a1633",sky1:"#4a2445",sky2:"#8c3f5e",hz:"#e9786a",hz2:"#ffc79a",m1:"#8e5272",m2:"#6c3c5e",m3:"#52304d",gnd:"#3b2139",
  gold:"#f6d49a",gold2:"#fff3dc",rose:"#ff8f7a",skin:"#f6d2bd",skin2:"#e6b8a0",
  hair:"#e9c27f",hairS:"#c99a5c",bow:"#f49f86",dress:"#f6e3c6",dress2:"#e4c59e",
  hair2:"#3a2230",shirt:"#5e3560",pants:"#3a2140",cream:"#fff6ea"};
const GLYPH={sun:"☉",moon:"☽",mars:"♂",mercury:"☿",jupiter:"♃",venus:"♀",saturn:"♄"};
const ORDER=["sun","moon","mars","mercury","jupiter","venus","saturn"];
const ABBR=["SUN","MON","TUE","WED","THU","FRI","SAT"];
const PL={sun:["#fff6c8","#ffc94a","#ff8a2a"],moon:["#fffdf4","#efe6d4","#c4b8a3"],mars:["#ffc2a0","#d8603a","#8a3018"],
  mercury:["#f2f2fa","#aab2c8","#5a6280"],jupiter:["#fbe7c2","#e0a86e","#9a6238"],venus:["#fff3ee","#f5c3ba","#c98a95"],saturn:["#fff1d2","#e4c690","#9a7444"]};
let TL,SND,groups=[];
const cl=(x)=>Math.min(1,Math.max(0,x)), eo=x=>1-Math.pow(1-cl(x),3), eio=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const lerp=(a,b,t)=>a+(b-a)*t;
function rnd(i){const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)}

// ---------- background ----------
function sky(t){
  let s=`<defs>
   <linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sky0}"/><stop offset=".45" stop-color="${C.sky1}"/><stop offset=".62" stop-color="${C.sky2}"/><stop offset=".7" stop-color="${C.hz}"/><stop offset=".73" stop-color="${C.hz2}"/></linearGradient>
   <radialGradient id="hglow" cx=".5" cy=".7" r=".5"><stop offset="0" stop-color="${C.hz2}" stop-opacity=".45"/><stop offset="1" stop-color="${C.hz2}" stop-opacity="0"/></radialGradient>
   <filter id="blur8"><feGaussianBlur stdDeviation="8"/></filter><filter id="blur20"><feGaussianBlur stdDeviation="20"/></filter>
   <filter id="glow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs><rect width="1080" height="1920" fill="url(#sk)"/><rect width="1080" height="1920" fill="url(#hglow)"/>`;
  for(let i=0;i<170;i++){const x=rnd(i)*1080,y=rnd(i+500)*1250,r=.6+rnd(i+900)*1.8,a=(.3+.7*Math.abs(Math.sin(t*(.5+rnd(i+77))+i)))*Math.max(0,1-y/1050);
    s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="${rnd(i+33)<.15?C.gold2:'#fff'}" opacity="${a.toFixed(2)}"/>`}
  return s;
}
function mountains(t){
  const dx=Math.sin(t*.05)*12;
  const ridge=(y,amp,seed,col,ofs)=>{let d=`M${-40+ofs},2400 L${-40+ofs},${y}`;for(let x=-40;x<=1120;x+=60){d+=` L${x+ofs},${y-amp*(.5+.5*Math.sin(x*.011+seed)+.35*Math.sin(x*.027+seed*2))}`}return `<path d="${d} L${1120+ofs},2400Z" fill="${col}"/>`};
  return ridge(1300,120,1,C.m1,dx*.4)+ridge(1360,90,3,C.m2,dx*.7)+`<path d="M0,1430 Q540,1395 1080,1430 L1080,2400 L0,2400Z" fill="${C.m3}"/>`+
    `<path d="M0,1470 Q540,1450 1080,1470 L1080,2400 L0,2400Z" fill="${C.gnd}"/>`;
}
// ---------- planets ----------
var POP=1;
function planet(id,x,y,r,op=1,t=0){
  y-=LIFT; const [a,b,c]=PL[id];let s=`<g opacity="${op}" transform="translate(${x} ${y}) scale(${POP}) translate(${-x} ${-y})"><defs><radialGradient id="pg${id}${Math.round(x)}" cx=".36" cy=".32" r=".75"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></radialGradient></defs>`;
  s+=`<circle cx="${x}" cy="${y}" r="${r*2.1}" fill="${b}" opacity=".18" filter="url(#blur20)"/>`;
  if(id==='sun') for(let k=0;k<16;k++){const an=k/16*Math.PI*2+t*.2;s+=`<line x1="${x+Math.cos(an)*r*1.2}" y1="${y+Math.sin(an)*r*1.2}" x2="${x+Math.cos(an)*r*1.55}" y2="${y+Math.sin(an)*r*1.55}" stroke="${b}" stroke-width="${r*.08}" stroke-linecap="round" opacity=".7"/>`}
  if(id==='saturn') s+=`<ellipse cx="${x}" cy="${y}" rx="${r*1.9}" ry="${r*.45}" fill="none" stroke="${b}" stroke-width="${r*.14}" opacity=".85" transform="rotate(-16 ${x} ${y})" clip-path="inset(0 0 50% 0)"/>`;
  s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="url(#pg${id}${Math.round(x)})"/>`;
  if(id==='jupiter') for(let k=-2;k<=2;k++) s+=`<ellipse cx="${x}" cy="${y+k*r*.32}" rx="${r*Math.sqrt(1-Math.pow(k*.32,2))*.98}" ry="${r*.05}" fill="${c}" opacity=".45"/>`;
  if(id==='moon') s+=`<circle cx="${x-r*.3}" cy="${y-r*.2}" r="${r*.18}" fill="${c}" opacity=".45"/><circle cx="${x+r*.28}" cy="${y+r*.25}" r="${r*.24}" fill="${c}" opacity=".4"/>`;
  if(id==='mars') s+=`<circle cx="${x+r*.2}" cy="${y-r*.25}" r="${r*.2}" fill="${c}" opacity=".4"/>`;
  if(id==='saturn') s+=`<path d="M${x-r*1.9},${y} A${r*1.9},${r*.45} 0 0 0 ${x+r*1.9},${y}" fill="none" stroke="${b}" stroke-width="${r*.14}" transform="rotate(-16 ${x} ${y})" opacity=".9"/>`;
  s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>`;
  return s+`</g>`;
}
// ---------- characters (flat vector, faceless like the reference style) ----------
// pose: {la, ra} arm angles in degrees (0 = down, 90 = forward/out, 170 = up), lean, look (head tilt up)
function woman(x,y,sc,pose,t,o={}){
  const br=Math.sin(t*2.1)*1.2, sway=Math.sin(t*1.3)*3, op=o.op??1, flip=o.flip?-1:1;
  const arm=(sx,ang,side)=>`<g transform="translate(${sx},62) rotate(${ang*side})"><path d="M-3.8,0 L3.8,0 L3,52 L-3,52Z" fill="${C.skin}"/><path d="M-6,-3 L6,-3 L5.5,13 L-5.5,13Z" fill="${C.dress2}"/><circle cx="0" cy="53" r="4" fill="${C.skin}"/></g>`;
  const wave=(o)=>Math.sin(t*1.6+o)*2.5;
  return `<g transform="translate(${x},${y}) scale(${sc*flip},${sc}) rotate(${pose.lean||0} 0 250)" opacity="${op}">
   <ellipse cx="0" cy="254" rx="38" ry="6" fill="#1a0a18" opacity=".3"/>
   <path d="M-18,22 C-30,52 ${-26+wave(1)},96 ${-20+wave(2)},122 C-10,128 10,128 ${20+wave(3)},122 C${26+wave(1)},96 30,52 18,22Z" fill="${C.hairS}"/>
   <path d="M-14,26 C-22,56 ${-18+wave(2)},98 ${-12+wave(3)},118 L${12+wave(1)},118 C${18+wave(2)},98 22,56 14,26Z" fill="${C.hair}"/>
   ${arm(-13,pose.ra??8,-1)}
   <rect x="-5" y="186" width="4.5" height="62" rx="2" fill="${C.skin2}"/><rect x="1.5" y="186" width="4.5" height="62" rx="2" fill="${C.skin}"/>
   <path d="M-12,54 L12,54 L15,92 L${44+sway},${206+br} C${10+sway},${214+br} ${-20+sway*.6},${214+br} ${-44+sway*.6},${206+br} L-15,92Z" fill="${C.dress}"/>
   <path d="M2,92 L15,92 L${44+sway},${206+br} C${30+sway},${210+br} ${22+sway},${211+br} ${14+sway},${212+br}Z" fill="${C.dress2}" opacity=".7"/>
   <path d="M-15,90 Q0,96 15,90" stroke="${C.dress2}" stroke-width="3" fill="none"/>
   <rect x="-4.5" y="40" width="9" height="16" fill="${C.skin2}"/>
   <g transform="rotate(${-(pose.look||0)} 0 44)"><circle cx="0" cy="28" r="16.5" fill="${C.skin}"/>
     <path d="M-18,32 C-21,6 -6,2 0,2 C11,2 21,8 18,32 C14,16 4,12 -6,14 C-12,16 -15,24 -18,32Z" fill="${C.hair}"/>
     <path d="M-24,14 L-12,20 L-24,27Z M-4,20 L-12,20" fill="${C.bow}"/><circle cx="-12" cy="20" r="3.4" fill="${C.bow}"/>
     <path d="M-12,22 L-16,36 M-12,22 L-8,37" stroke="${C.bow}" stroke-width="2.6" stroke-linecap="round"/></g>
   ${arm(13,pose.la??8,1)}
  </g>`;
}
function man(x,y,sc,pose,t,o={}){
  const op=o.op??1, flip=o.flip?-1:1;
  const arm=(sx,ang,side)=>`<g transform="translate(${sx},60) rotate(${ang*side})"><path d="M-5,0 L5,0 L4,54 L-4,54Z" fill="${C.shirt}"/><circle cx="0" cy="56" r="4.5" fill="${C.skin}"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${sc*flip},${sc}) rotate(${pose.lean||0} 0 250)" opacity="${op}">
   <ellipse cx="0" cy="254" rx="34" ry="6" fill="#000" opacity=".25"/>
   ${arm(-15,pose.ra??6,-1)}
   <rect x="-12" y="132" width="10" height="118" rx="4" fill="${C.pants}"/><rect x="2" y="132" width="10" height="118" rx="4" fill="#2f335a"/>
   <path d="M-16,56 L16,56 L14,138 L-14,138Z" fill="${C.shirt}"/>
   <rect x="-5" y="42" width="10" height="16" fill="${C.skin2}"/>
   <g transform="rotate(${-(pose.look||0)} 0 46)"><circle cx="0" cy="28" r="17" fill="${C.skin}"/>
   <path d="M-17,26 C-18,8 -4,6 2,6 C12,6 19,12 17,24 C10,16 -4,14 -17,26Z" fill="${C.hair2}"/></g>
   ${arm(15,pose.la??6,1)}
  </g>`;
}
// ---------- props ----------
const heart=(x,y,s,col,op=1)=>`<path transform="translate(${x},${y}) scale(${s})" d="M0,8 C-12,-6 -26,4 -14,16 L0,28 L14,16 C26,4 12,-6 0,8Z" fill="${col}" opacity="${op}"/>`;
const star=(x,y,r,col,op=1)=>`<path transform="translate(${x},${y})" d="M0,${-r} C${r*.15},${-r*.15} ${r*.15},${-r*.15} ${r},0 C${r*.15},${r*.15} ${r*.15},${r*.15} 0,${r} C${-r*.15},${r*.15} ${-r*.15},${r*.15} ${-r},0 C${-r*.15},${-r*.15} ${-r*.15},${-r*.15} 0,${-r}Z" fill="${col}" opacity="${op}" filter="url(#glow)"/>`;


var LIFT=0;
