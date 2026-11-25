// ---------- scenes: (local time u from segment start, seg duration D, t global) ----------
var SCENES={
 hook(u,D,t){ // woman looks up; seven planets appear in an arc
   let s='';ORDER.forEach((id,i)=>{const a=Math.PI*(1.08+i/6*.84),x=540+Math.cos(a)*420,y=820+Math.sin(a)*420;const p=eo((u-.4-i*.3)/.6);
     s+=planet(id,x,y+(1-p)*30,34+(id==='sun'?10:0)+(id==='jupiter'?6:0),p,t)});
   return s+woman(GX,GY,SC,{look:eo(u/1.5)*18,la:10,ra:10},t);
 },
 intro(u,D,t){ // planets -> weekday labels with gold threads
   let s='';ORDER.forEach((id,i)=>{const x=150+i*130,y=560;const p=eo((u-i*.35)/.6);
     s+=planet(id,x,y,30+(id==='sun'||id==='jupiter'?6:0),1,t);
     s+=`<line x1="${x}" y1="${y+50-LIFT}" x2="${x}" y2="${y+50-LIFT+170*p}" stroke="${C.gold}" stroke-width="2" opacity=".75"/>`;
     s+=`<text x="${x}" y="${y+262-LIFT}" text-anchor="middle" font-family="Cinzel" font-weight="600" font-size="34" fill="${C.gold}" opacity="${p}">${ABBR[i]}</text>`;});
   return s+woman(GX,GY+40,SC*.92,{look:6,la:20+eo(u/2)*40,ra:10},t);
 },
 sun(u,D,t){ // spotlight stage: born to be seen
   const p=eo((u-.2)/1.2);
   let s=planet('sun',540,560,90,1,t);
   s+=`<path d="M540,640 L${540-260*p},1480 L${540+260*p},1480Z" fill="${C.gold2}" opacity="${.22*p}" filter="url(#blur8)"/>`;
   s+=`<ellipse cx="540" cy="1478" rx="${230*p}" ry="34" fill="${C.gold}" opacity="${.35*p}"/>`;
   s+=`<rect x="250" y="1478" width="580" height="22" rx="6" fill="#5a3a5e"/><rect x="250" y="1478" width="580" height="6" fill="${C.gold}" opacity=".6"/>`;
   return s+woman(GX,GY,SC,{la:20+110*eo((u-.9)/.8),ra:20+110*eo((u-.9)/.8),look:8},t);
 },
 moon(u,D,t){ // feels everything first: ripples of feeling around her
   let s=planet('moon',780,520,80,1,t);
   for(let k=0;k<4;k++){const r=((u*120+k*110)%440);s+=`<ellipse cx="${GX}" cy="${GY+250}" rx="${r}" ry="${r*.18}" fill="none" stroke="${C.rose}" stroke-width="3" opacity="${(1-r/440)*.7}"/>`}
   s+=heart(GX+32,GY+120,1.6,C.rose,.85*eo((u-.6)/.6));
   return s+woman(GX,GY,SC,{la:150,ra:12,look:10+Math.sin(u)*3},t);
 },
 mars(u,D,t){ // brave even when scared: wind against her, she steps forward with a shield of light
   let s=planet('mars',280,520,78,1,t);
   for(let k=0;k<9;k++){const y=1050+k*55,x=1100-((u*700+k*190)%1250);s+=`<path d="M${x},${y} q40,-12 80,0 q40,12 80,0" stroke="#d9c6e8" stroke-width="3" fill="none" opacity=".35"/>`}
   const p=eo((u-.8)/.7);
   s+=`<circle cx="${GX-110}" cy="${GY+150}" r="${70*p}" fill="#ff9a6a" opacity="${.22*p}"/><circle cx="${GX-110}" cy="${GY+150}" r="${70*p}" fill="none" stroke="${C.gold}" stroke-width="5" opacity="${p}" filter="url(#glow)"/>`;
   return s+woman(GX+20-30*p,GY,SC,{la:12,ra:95*p,lean:-6*p,look:4},t);
 },
 mercury(u,D,t){ // words open doors: paper plane flies to a door that opens with light
   let s=planet('mercury',840,500,64,1,t);
   const dx=820, open=eo((u-1.9)/.8);
   s+=`<rect x="${dx-70}" y="${GY+40}" width="140" height="228" fill="${C.gold2}" opacity="${.9*open}" filter="url(#glow)"/>`;
   s+=`<path d="M${dx-70},${GY+40} L${dx-70+140*(1-open*.75)},${GY+40+18*open} L${dx-70+140*(1-open*.75)},${GY+268-18*open} L${dx-70},${GY+268}Z" fill="#6a4a7a"/>`;
   s+=`<rect x="${dx-78}" y="${GY+32}" width="156" height="240" fill="none" stroke="${C.gold}" stroke-width="6"/>`;
   const f=eio((u-.6)/1.3), px=lerp(GX+90,dx-20,f), py=lerp(GY+70,GY+130,f)-Math.sin(f*Math.PI)*260;
   if(u>.5&&u<2.1) s+=`<path transform="translate(${px},${py}) rotate(${-20+f*40})" d="M-26,0 L26,-8 L-6,10Z M-6,10 L26,-8 L-2,20Z" fill="#fff" opacity=".95"/>`;
   if(open>0) s+=`<path d="M${dx},${GY+150} L${GX+60},${GY+250} L${dx+40},${GY+260}Z" fill="${C.gold2}" opacity="${.18*open}"/>`;
   return s+woman(GX-140,GY,SC,{la:30+120*eo((u-.2)/.4)*(1-eo((u-.7)/.5))+40,ra:10,look:4},t);
 },
 jupiter(u,D,t){ // luck quietly follows: soft stars fall into her hands, a trail of light follows her
   let s=planet('jupiter',540,520,100,1,t);
   for(let k=0;k<14;k++){const sx=GX-120+rnd(k)*240, sy=((u*160+rnd(k+9)*800)%700)+640; s+=star(sx+Math.sin(u+k)*15,sy,6+rnd(k+3)*8,C.gold2,.8*(1-(sy-640)/700))}
   s+=`<path d="M${GX-420},${GY+250} Q${GX-200},${GY+200} ${GX-20},${GY+248}" stroke="${C.gold}" stroke-width="6" fill="none" opacity=".55" stroke-dasharray="4 14" filter="url(#glow)"/>`;
   return s+woman(GX,GY,SC,{la:62,ra:62,look:14},t);
 },
 venus(u,D,t){ // people fall for your softness
   let s=planet('venus',540,500,82,1,t);
   const p=eo((u-.3)/1.4);
   for(let k=0;k<7;k++){const yy=GY+80-((u*90+k*70)%420);s+=heart(GX-10+Math.sin(u*2+k)*60,yy,.9+rnd(k)*.6,C.rose,(1-(GY+80-yy)/420)*.9*p)}
   return s+woman(GX-150+40*p,GY,SC,{la:40+30*p,ra:10,look:6},t)+man(GX+170-40*p,GY,SC,{la:10,ra:40+30*p,look:4},t,{flip:true});
 },
 saturn(u,D,t){ // slow, steady, unbreakable: she climbs steps that build beneath her
   let s=planet('saturn',820,480,76,1,t);
   const steps=7, built=cl(u/(D*.85))*steps;
   for(let k=0;k<steps;k++){const b=cl(built-k);if(b<=0)continue;const x=200+k*95,y=GY+250-(k+1)*52;
     s+=`<rect x="${x}" y="${y+52*(1-b)}" width="96" height="${52+ (k+1)*52*b- 52*(1-b)}" fill="#3e3062" stroke="${C.gold}" stroke-opacity=".5" stroke-width="2" opacity="${b}"/>`;
     s+=`<rect x="${x}" y="${y}" width="96" height="5" fill="${C.gold}" opacity="${.7*b}"/>`}
   const k=Math.max(0,Math.floor(built-1)), bx=200+k*95+48, by=GY+250-(k+1)*52-250*SC*.85;
   return s+woman(bx,by,SC*.85,{la:14,ra:-10,look:8},t);
 },
 cta(u,D,t){ // which day were you born? glyph wheel + both characters
   let s='';ORDER.forEach((id,i)=>{const a=-Math.PI/2+i/7*Math.PI*2,x=540+Math.cos(a)*250,y=700+Math.sin(a)*250,p=eo((u-i*.12)/.5);
     s+=planet(id,x,y,32,p,t)});
   s+=`<circle cx="540" cy="700" r="${250}" fill="none" stroke="${C.gold}" stroke-width="2" opacity=".5" stroke-dasharray="3 10"/>`;
   s+=`<g transform="translate(540,700)" opacity="${eo((u-.8)/.6)}"><rect x="-120" y="-60" width="240" height="120" rx="26" fill="#fff4e6"/><path d="M-30,58 L-58,96 L4,58Z" fill="#fff4e6"/><text x="0" y="16" text-anchor="middle" font-family="DejaVu Sans" font-size="54" fill="#8c3f5e">☉ ☽ ♄</text></g>`;
   return s+woman(GX-160,GY,SC,{la:12,ra:12,look:10},t)+man(GX+170,GY,SC,{la:8,ra:30,look:8},t,{flip:true});
 },
};
