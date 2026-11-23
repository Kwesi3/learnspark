// ═══════════════════════════════════════════════════════════════
// STORY ART — picture-book scenes for Story Time, drawn in SVG so the
// books work offline. A scene is a background plus placed props:
//   ['park', ['dog',120,200,1,{...}], ['ball',230,205,1]]
// Props are drawn standing on (x,y) and scaled by s.
// ═══════════════════════════════════════════════════════════════
const SK={dark:'#6B3F23',brown:'#8D5524',tan:'#C68642',light:'#F1C27D'};
function sw(w){return `stroke="${INK}" stroke-width="${w||3}" stroke-linejoin="round" stroke-linecap="round"`;}
const BG={
  sky:(c1)=>`<rect width="400" height="240" fill="${c1||'#CFE6FF'}"/>`,
  sun:(x,y)=>`<circle cx="${x||340}" cy="${y||48}" r="24" fill="#FFC83D" ${sw(3)}/>`,
  cloud:(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s||1})" fill="#fff" opacity=".95"><circle cx="0" cy="0" r="16"/><circle cx="20" cy="-8" r="20"/><circle cx="42" cy="0" r="15"/><rect x="0" y="0" width="42" height="14"/></g>`,
  park:()=>BG.sky()+BG.sun()+BG.cloud(60,46,1)+BG.cloud(200,30,.8)+
    `<path d="M0 170 Q100 130 200 165 T400 155 V240 H0Z" fill="#8FD18B"/><path d="M0 195 Q120 175 260 195 T400 190 V240 H0Z" fill="#6CC070"/>`,
  windy:()=>BG.sky('#BFE0FF')+BG.cloud(40,50,1.1)+BG.cloud(250,40,.9)+
    `<g fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".9"><path d="M90 95 q30 -14 60 0 t50 -6"/><path d="M230 120 q26 -12 52 0"/><path d="M40 130 q20 -10 40 0"/></g>`+
    `<path d="M0 175 Q100 150 200 172 T400 165 V240 H0Z" fill="#8FD18B"/><path d="M0 200 Q140 185 260 200 T400 196 V240 H0Z" fill="#6CC070"/>`,
  garden:()=>BG.sky()+BG.sun(60,46)+BG.cloud(250,40,.9)+
    `<g fill="#FFF6E0" ${sw(2.5)}>${[0,1,2,3,4,5,6,7,8,9,10].map(i=>`<path d="M${i*40+6} 160 V122 l12 -12 l12 12 V160Z"/>`).join('')}</g><rect y="140" width="400" height="8" fill="#FFF6E0" ${sw(2.5)}/>`+
    `<rect y="160" width="400" height="80" fill="#7CC576"/><path d="M0 200 H400 V240 H0Z" fill="#9A6A3F"/><path d="M0 200 Q200 190 400 200" stroke="#7A5232" stroke-width="3" fill="none"/>`,
  rain:()=>BG.sky('#A9BBD0')+BG.cloud(40,40,1.4)+BG.cloud(180,34,1.6)+BG.cloud(310,44,1.3)+
    `<g stroke="#4C8DF6" stroke-width="3" stroke-linecap="round">${Array.from({length:28},(_,i)=>`<line x1="${(i*37)%400+10}" y1="${70+(i*23)%90}" x2="${(i*37)%400+4}" y2="${84+(i*23)%90}"/>`).join('')}</g>`+
    `<rect y="160" width="400" height="80" fill="#7CC576"/><path d="M0 200 H400 V240 H0Z" fill="#8A5B34"/>`,
  beachNight:()=>BG.sky('#1F2D5C')+`<circle cx="330" cy="50" r="22" fill="#F4F1FF" ${sw(2.5)}/><circle cx="322" cy="44" r="4" fill="#D9D3F3"/>`+
    `<g fill="#FFE9A8">${[[40,30],[90,60],[150,24],[210,52],[260,20],[380,90],[120,96],[20,90]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="2"/>`).join('')}</g>`+
    `<path d="M0 120 H400 V160 H0Z" fill="#2E4C8F"/><path d="M0 128 q20 -5 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#7FA7F0" stroke-width="2" fill="none"/>`+
    `<path d="M0 150 Q200 140 400 150 V240 H0Z" fill="#D8C29A"/><path d="M300 240 Q330 190 400 182 V240Z" fill="#C7AE82"/>`,
  sea:()=>BG.sky('#BFE6FF')+BG.sun(60,46)+`<path d="M0 120 H400 V170 H0Z" fill="#4CA8E0"/><path d="M0 150 Q200 140 400 150 V240 H0Z" fill="#EAD7A8"/>`,
  yard:()=>BG.sky('#FFE2B8')+BG.sun(330,60)+
    `<rect x="0" y="80" width="140" height="90" fill="#F2A65A" ${sw(3)}/><path d="M-10 84 L70 30 L150 84Z" fill="#B5543A" ${sw(3)}/><rect x="50" y="118" width="34" height="52" fill="#7A4A2A" ${sw(2.5)}/>`+
    `<rect y="170" width="400" height="70" fill="#8FD18B"/>`,
  festival:()=>BG.sky('#3E2C6E')+`<g fill="#FFE9A8">${[[30,30],[110,20],[190,40],[280,18],[360,34]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="2"/>`).join('')}</g>`+
    `<path d="M0 60 Q100 90 200 60 T400 60" stroke="${INK}" stroke-width="2" fill="none"/>${[0,1,2,3,4,5,6,7,8,9].map(i=>`<path d="M${i*40+10} ${66+Math.sin(i)*8} l10 22 l10 -22Z" fill="${['#FFC83D','#E8559A','#2FB37A','#4C8DF6'][i%4]}" ${sw(2)}/>`).join('')}`+
    `<rect y="170" width="400" height="70" fill="#C58B4E"/><rect y="166" width="400" height="8" fill="#8B5A2B"/>`+
    `<g fill="#2A1F4A">${[30,60,90,300,330,360].map((x,i)=>`<circle cx="${x}" cy="${178-i%2*6}" r="14"/><rect x="${x-14}" y="${180-i%2*6}" width="28" height="40" rx="10"/>`).join('')}</g>`,
  meadow:()=>BG.sky()+BG.sun()+BG.cloud(70,40,.9)+`<path d="M0 160 Q200 140 400 160 V240 H0Z" fill="#8FD18B"/><path d="M0 200 Q200 186 400 200 V240 H0Z" fill="#6CC070"/>`,
  hive:()=>`<rect width="400" height="240" fill="#FFD27A"/><g fill="#FFC14D" stroke="#E2A33A" stroke-width="3">${(()=>{let s='';for(let r=0;r<7;r++)for(let c=0;c<10;c++){const x=c*44+(r%2)*22-10,y=r*38;s+=`<path d="M${x} ${y+11} l19 -11 l19 11 v22 l-19 11 l-19 -11Z"/>`;}return s;})()}</g>`,
  moonBase:()=>BG.sky('#0F1630')+`<g fill="#fff">${[[30,30],[80,70],[140,20],[200,50],[250,24],[300,64],[370,30],[350,90],[60,110]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="1.8"/>`).join('')}</g>`+
    `<circle cx="330" cy="60" r="26" fill="#4C8DF6" ${sw(2.5)}/><path d="M318 50 q10 -6 18 2 q-4 10 -12 8Z M330 72 q8 -2 10 4" fill="#2FB37A"/>`+
    `<path d="M0 170 Q120 150 220 168 T400 160 V240 H0Z" fill="#B9BFCB"/><g fill="#9CA3B2"><ellipse cx="80" cy="200" rx="22" ry="6"/><ellipse cx="300" cy="215" rx="30" ry="7"/><ellipse cx="200" cy="228" rx="16" ry="4"/></g>`,
  control:()=>`<rect width="400" height="240" fill="#22304F"/><rect x="40" y="26" width="320" height="120" rx="12" fill="#0F1A33" ${sw(4)}/>`+
    `<rect y="180" width="400" height="60" fill="#3B4B70"/><rect x="0" y="176" width="400" height="8" fill="#55678F"/>`,
  dawn:()=>BG.sky('#FFD9B3')+`<circle cx="320" cy="150" r="30" fill="#FFB347" ${sw(2.5)}/><path d="M0 150 H400 V240 H0Z" fill="#A4C89B"/>`+
    `<rect x="20" y="100" width="90" height="60" fill="#FFF3D6" ${sw(3)}/><path d="M10 104 L65 68 L120 104Z" fill="#E36B4E" ${sw(3)}/><rect x="54" y="122" width="22" height="38" fill="#7A4A2A" ${sw(2)}/>`,
  bedroom:()=>`<rect width="400" height="240" fill="#DCE3FF"/><rect x="250" y="30" width="110" height="80" rx="6" fill="#1F2D5C" ${sw(3)}/><circle cx="330" cy="58" r="12" fill="#F4F1FF"/><path d="M305 30 V110 M250 70 H360" stroke="${INK}" stroke-width="3"/>`+
    `<rect y="190" width="400" height="50" fill="#B98B5E"/>`,
  school:()=>BG.sky()+BG.sun(60,44)+`<rect x="180" y="70" width="200" height="110" fill="#E8735A" ${sw(3)}/><path d="M170 74 L280 34 L390 74Z" fill="#B5543A" ${sw(3)}/><circle cx="280" cy="62" r="10" fill="#fff" ${sw(2)}/>`+
    `${[200,240,320,350].map(x=>`<rect x="${x}" y="96" width="22" height="22" fill="#DCE8FF" ${sw(2)}/>`).join('')}<rect x="266" y="130" width="28" height="50" fill="#7A4A2A" ${sw(2.5)}/>`+
    `<rect y="180" width="400" height="60" fill="#9BA3B2"/><path d="M0 206 H400" stroke="#fff" stroke-width="4" stroke-dasharray="24 18"/>`,
  forest:()=>BG.sky('#D5F0D0')+`<g>${[[20,150,1.2],[90,160,1],[300,150,1.3],[370,165,1]].map(t=>`<g transform="translate(${t[0]},${t[1]}) scale(${t[2]})"><rect x="-6" y="-10" width="12" height="40" fill="#7A4A2A"/><circle cy="-34" r="34" fill="#3F9E5B" ${sw(3)}/></g>`).join('')}</g>`+
    `<path d="M0 185 Q200 172 400 185 V240 H0Z" fill="#5BAF6A"/>`,
  windSky:()=>BG.sky('#E6F2FF')+`<path d="M0 190 Q200 176 400 190 V240 H0Z" fill="#5BAF6A"/>`+
    `<g fill="none" stroke="#8FB7F0" stroke-width="4" stroke-linecap="round">${[[30,60],[150,40],[260,80],[90,120],[310,130]].map(p=>`<path d="M${p[0]} ${p[1]} q24 -16 48 0 t44 -4"/>`).join('')}</g>`,
};
// ── props ──
function kid(o){o=o||{};
  const skin=o.skin||SK.brown,shirt=o.shirt||'#4C8DF6',pants=o.pants||'#1F2A44',hair=o.hair||'#1F1A17';
  const arm=o.arm||'down';
  const arms=arm==='up'?`<path d="M-17 -70 L-30 -100 M17 -70 L30 -100" ${sw(5)}/><circle cx="-31" cy="-102" r="5" fill="${skin}" ${sw(2)}/><circle cx="31" cy="-102" r="5" fill="${skin}" ${sw(2)}/>`
    :arm==='point'?`<path d="M-17 -70 L-26 -44 M17 -70 L42 -84" ${sw(5)}/><circle cx="43" cy="-85" r="5" fill="${skin}" ${sw(2)}/>`
    :arm==='hold'?`<path d="M-17 -70 L-8 -52 M17 -70 L8 -52" ${sw(5)}/>`
    :`<path d="M-17 -70 L-24 -42 M17 -70 L24 -42" ${sw(5)}/>`;
  const body=o.girl?`<path d="M-15 -76 H15 L24 -32 H-24Z" fill="${shirt}" ${sw(3)}/>`:`<rect x="-17" y="-76" width="34" height="34" rx="6" fill="${shirt}" ${sw(3)}/><rect x="-15" y="-44" width="30" height="12" fill="${pants}" ${sw(2.5)}/>`;
  const hairSvg=o.girl?`<circle cx="-19" cy="-110" r="9" fill="${hair}" ${sw(2)}/><circle cx="19" cy="-110" r="9" fill="${hair}" ${sw(2)}/><path d="M-20 -98 A20 20 0 0 1 20 -98 Q0 -106 -20 -98Z" fill="${hair}" ${sw(2)}/>`
    :`<path d="M-20 -96 A20 20 0 0 1 20 -96 Q0 -104 -20 -96Z" fill="${hair}" ${sw(2)}/>`;
  const mouth=o.sad?`<path d="M-6 -84 Q0 -89 6 -84" ${sw(2.5)} fill="none"/>`:o.wow?`<circle cx="0" cy="-85" r="3.5" fill="${INK}"/>`:`<path d="M-7 -87 Q0 -80 7 -87" ${sw(2.5)} fill="none"/>`;
  const eyes=o.sleepy?`<path d="M-10 -95 h6 M4 -95 h6" ${sw(2.5)}/>`:`<circle cx="-7" cy="-95" r="2.6" fill="${INK}"/><circle cx="7" cy="-95" r="2.6" fill="${INK}"/>`;
  return `<path d="M-9 -34 V-2 M9 -34 V-2" ${sw(6)}/><path d="M-14 0 h9 M5 0 h9" ${sw(5)}/>${arms}${body}
    <circle cx="0" cy="-94" r="20" fill="${skin}" ${sw(3)}/>${hairSvg}${eyes}${mouth}`;
}
function grown(o){o=o||{};const skin=o.skin||SK.dark;
  const wrap=o.wrap?`<path d="M-24 -132 Q0 -160 24 -132 Q30 -146 18 -150 Q0 -158 -18 -150 Q-30 -146 -24 -132Z" fill="${o.wrap}" ${sw(3)}/>`
    :`<path d="M-21 -122 A21 21 0 0 1 21 -122 Q0 -130 -21 -122Z" fill="${o.hair||'#1F1A17'}" ${sw(2)}/>`;
  const clothes=o.dress?`<path d="M-17 -100 H17 L28 -10 H-28Z" fill="${o.dress}" ${sw(3)}/><path d="M-22 -54 H22 M-25 -34 H25" stroke="${o.trim||'#FFC83D'}" stroke-width="5"/>`
    :`<rect x="-19" y="-100" width="38" height="50" rx="8" fill="${o.shirt||'#2FB37A'}" ${sw(3)}/><path d="M-10 -52 V-2 M10 -52 V-2" ${sw(9)}/>`;
  const arms=o.arm==='out'?`<path d="M-19 -94 L-36 -70 M19 -94 L44 -82" ${sw(6)}/>`:o.arm==='shake'?`<path d="M-19 -94 L-28 -60 M19 -94 L40 -70" ${sw(6)}/>`:`<path d="M-19 -94 L-28 -60 M19 -94 L28 -60" ${sw(6)}/>`;
  return `${o.dress?'':''}${clothes}${arms}<circle cx="0" cy="-118" r="22" fill="${skin}" ${sw(3)}/>${wrap}
    <circle cx="-8" cy="-120" r="2.6" fill="${INK}"/><circle cx="8" cy="-120" r="2.6" fill="${INK}"/><path d="M-8 -110 Q0 -103 8 -110" ${sw(2.5)} fill="none"/>`;
}
const PROPS={
  girl:o=>kid(Object.assign({girl:true},o)),
  boy:o=>kid(o),
  grandma:o=>grown(Object.assign({dress:'#E8559A',trim:'#FFC83D',wrap:'#FFC83D',skin:SK.dark},o)),
  dad:o=>grown(Object.assign({shirt:'#4C8DF6',skin:SK.brown},o)),
  adult:o=>grown(o),
  dog:o=>{o=o||{};const c=o.c||'#C98A4B';return `<path d="M-30 -10 v10 M-18 -10 v10 M14 -10 v10 M26 -10 v10" ${sw(5)}/>
    <ellipse cx="0" cy="-22" rx="34" ry="16" fill="${c}" ${sw(3)}/><path d="M32 -30 q14 -16 6 -26" ${sw(5)} fill="none"/>
    <circle cx="-34" cy="-40" r="16" fill="${c}" ${sw(3)}/><path d="M-44 -50 q-10 4 -8 20 q8 -2 10 -12Z" fill="#8A5A2E" ${sw(2.5)}/>
    <circle cx="-38" cy="-43" r="2.4" fill="${INK}"/><circle cx="-49" cy="-37" r="3" fill="${INK}"/>${o.sad?`<path d="M-42 -30 q4 -3 8 0" ${sw(2)} fill="none"/>`:`<path d="M-44 -31 q4 4 8 0" ${sw(2)} fill="none"/>`}`;},
  cat:o=>{o=o||{};const c=o.c||'#F2A65A';return `<path d="M24 -10 q22 -10 14 -34" ${sw(5)} fill="none"/><ellipse cx="0" cy="-18" rx="24" ry="16" fill="${c}" ${sw(3)}/>
    <circle cx="-20" cy="-38" r="14" fill="${c}" ${sw(3)}/><path d="M-32 -46 l-2 -14 l10 8Z M-14 -50 l6 -12 l4 14Z" fill="${c}" ${sw(2.5)}/>
    <circle cx="-25" cy="-40" r="2.2" fill="${INK}"/><circle cx="-15" cy="-40" r="2.2" fill="${INK}"/><path d="M-23 -33 q3 2 6 0" ${sw(2)} fill="none"/>`;},
  ball:o=>`<circle cx="0" cy="-12" r="12" fill="#E4573D" ${sw(3)}/><path d="M-11 -14 q11 6 22 0" stroke="#fff" stroke-width="3" fill="none"/>`,
  bush:o=>`<g fill="#3F9E5B" ${sw(3)}><circle cx="-26" cy="-20" r="22"/><circle cx="0" cy="-32" r="28"/><circle cx="28" cy="-20" r="22"/></g>${o&&o.ball?`<circle cx="18" cy="-14" r="9" fill="#E4573D" ${sw(2.5)}/>`:''}`,
  log:o=>`<rect x="-46" y="-22" width="92" height="22" rx="11" fill="#9A6A3F" ${sw(3)}/><ellipse cx="46" cy="-11" rx="7" ry="11" fill="#D9B58A" ${sw(2.5)}/>`,
  tree:o=>`<rect x="-9" y="-70" width="18" height="70" fill="#8B5A2B" ${sw(3)}/><g fill="#4FB56A" ${sw(3)}><circle cx="-26" cy="-92" r="28"/><circle cx="24" cy="-92" r="28"/><circle cx="0" cy="-118" r="32"/></g>`,
  tallTree:o=>`<rect x="-12" y="-200" width="24" height="200" fill="#8B5A2B" ${sw(3)}/><path d="M-12 -120 l-26 -20 M12 -80 l24 -18" ${sw(6)}/><g fill="#3F9E5B" ${sw(3)}><circle cx="-30" cy="-210" r="30"/><circle cx="26" cy="-214" r="30"/><circle cx="0" cy="-240" r="32"/></g>`,
  seed:o=>`<ellipse cx="0" cy="-6" rx="7" ry="5" fill="#8B5A2B" ${sw(2.5)}/>`,
  hole:o=>`<ellipse cx="0" cy="-4" rx="22" ry="7" fill="#5C3A1E" ${sw(2.5)}/>`,
  shovel:o=>`<path d="M0 -70 V-20" ${sw(5)}/><path d="M-10 -22 h20 l-4 20 h-12Z" fill="#B9BFCB" ${sw(3)}/><path d="M-8 -74 h16" ${sw(5)}/>`,
  sprout:o=>`<path d="M0 0 V-34" stroke="#2E8B57" stroke-width="5" stroke-linecap="round"/><path d="M0 -26 C-18 -34 -24 -24 -24 -18 C-14 -14 -4 -18 0 -26Z M0 -32 C16 -44 26 -36 26 -28 C14 -24 4 -26 0 -32Z" fill="#4FB56A" ${sw(2.5)}/>`,
  sunflower:o=>{const h=(o&&o.h)||150;let p='';for(let i=0;i<12;i++){const a=i*30*Math.PI/180;p+=`<ellipse cx="${20*Math.cos(a)}" cy="${-h+20*Math.sin(a)}" rx="13" ry="7" transform="rotate(${i*30} ${20*Math.cos(a)} ${-h+20*Math.sin(a)})" fill="#FFC83D" ${sw(2)}/>`;}
    return `<path d="M0 0 V${-h}" stroke="#2E8B57" stroke-width="7" stroke-linecap="round"/><path d="M0 ${-h*.45} C-26 ${-h*.55} -34 ${-h*.4} -30 ${-h*.34} C-16 ${-h*.3} -6 ${-h*.36} 0 ${-h*.45}Z M0 ${-h*.6} C24 ${-h*.72} 34 ${-h*.58} 30 ${-h*.52} C16 ${-h*.48} 6 ${-h*.52} 0 ${-h*.6}Z" fill="#4FB56A" ${sw(2.5)}/>${p}<circle cx="0" cy="${-h}" r="14" fill="#8B5A2B" ${sw(3)}/>`;},
  kite:o=>{o=o||{};const sx=o.sx||0,sy=o.sy||0;return `${o.string?`<path d="M0 0 Q${sx/2+20} ${sy/2} ${sx} ${sy}" stroke="${INK}" stroke-width="1.6" fill="none"/>`:''}
    <path d="M0 -40 L24 0 L0 40 L-24 0Z" transform="translate(0,-40)" fill="#E8559A" ${sw(3)}/><path d="M0 -80 V0 M-24 -40 H24" stroke="${INK}" stroke-width="2"/>
    <path d="M0 0 q-10 14 4 24 q14 10 0 24" stroke="${INK}" stroke-width="2" fill="none"/>${[[-4,14],[4,30],[-2,46]].map(b=>`<path d="M${b[0]-6} ${b[1]} l6 -4 l6 4 l-6 4Z" fill="#FFC83D" ${sw(1.5)}/>`).join('')}`;},
  flashlight:o=>`${o&&o.on?`<path d="M18 -50 L120 -90 L120 -10Z" fill="#FFF3B0" opacity=".55"/>`:''}<rect x="-14" y="-58" width="34" height="16" rx="5" fill="#4C8DF6" ${sw(2.5)}/>`,
  turtle:o=>`<path d="M-14 -4 l-8 6 M14 -4 l8 6 M-12 -18 l-10 -6 M12 -18 l10 -6" ${sw(4)}/><ellipse cx="0" cy="-11" rx="14" ry="10" fill="#3F9E5B" ${sw(2.5)}/><path d="M-6 -16 l6 -4 l6 4 l-2 7 h-8Z" fill="#2E7D47"/><circle cx="0" cy="-27" r="6" fill="#7CC576" ${sw(2.5)}/>`,
  nest:o=>`<ellipse cx="0" cy="-6" rx="34" ry="10" fill="#C7AE82" ${sw(2.5)}/>${[-16,-4,8,18].map(x=>`<ellipse cx="${x}" cy="-12" rx="6" ry="7" fill="#FFF8E7" ${sw(2)}/>`).join('')}`,
  bucket:o=>`<path d="M-22 -40 h44 l-6 40 h-32Z" fill="#E36B4E" ${sw(3)}/><path d="M-20 -30 h40" stroke="#fff" stroke-width="3"/><path d="M-22 -40 q22 -22 44 0" fill="none" ${sw(2.5)}/>`,
  djembe:o=>`<path d="M-22 -70 h44 l-12 34 l8 36 h-36 l8 -36Z" fill="#B5543A" ${sw(3)}/><ellipse cx="0" cy="-70" rx="22" ry="6" fill="#F3E2C0" ${sw(3)}/><path d="M-16 -64 L0 -40 L16 -64 M-12 -30 L0 -6 L12 -30" stroke="#FFC83D" stroke-width="2.5" fill="none"/>`,
  notes:o=>`<g fill="${INK}"><path d="M0 -40 v-26 l18 -6 v26" ${sw(3)} fill="none"/><ellipse cx="-4" cy="-40" rx="6" ry="4.5"/><ellipse cx="14" cy="-46" rx="6" ry="4.5"/><path d="M40 -60 v-20" ${sw(3)}/><ellipse cx="36" cy="-60" rx="6" ry="4.5"/></g>`,
  flower:o=>{o=o||{};const c=o.c||'#E8559A';return `<path d="M0 0 V-40" stroke="#2E8B57" stroke-width="4" stroke-linecap="round"/>${[0,72,144,216,288].map(a=>{const x=9*Math.cos(a*Math.PI/180),y=-46+9*Math.sin(a*Math.PI/180);return `<circle cx="${x}" cy="${y}" r="8" fill="${c}" ${sw(2)}/>`;}).join('')}<circle cx="0" cy="-46" r="6" fill="#FFC83D" ${sw(2)}/>`;},
  bee:o=>`<g transform="rotate(${(o&&o.r)||0})"><ellipse cx="-4" cy="-26" rx="9" ry="7" fill="#fff" opacity=".9" ${sw(2)}/><ellipse cx="6" cy="-26" rx="9" ry="7" fill="#fff" opacity=".9" ${sw(2)}/>
    <ellipse cx="0" cy="-14" rx="16" ry="11" fill="#FFC83D" ${sw(2.5)}/><path d="M-4 -24 v20 M5 -24 v20" stroke="${INK}" stroke-width="4"/><circle cx="-16" cy="-16" r="2" fill="${INK}"/></g>`,
  hiveBox:o=>`<path d="M-40 0 Q-46 -40 -30 -60 Q0 -86 30 -60 Q46 -40 40 0Z" fill="#E2A33A" ${sw(3)}/><path d="M-40 -20 h80 M-36 -40 h72 M-26 -60 h52" stroke="#B9822B" stroke-width="3"/><ellipse cx="0" cy="-10" rx="9" ry="7" fill="${INK}"/>`,
  jar:o=>`<rect x="-20" y="-50" width="40" height="50" rx="10" fill="#F5A623" ${sw(3)}/><rect x="-22" y="-60" width="44" height="12" rx="4" fill="#E36B4E" ${sw(2.5)}/><path d="M-12 -32 h24" stroke="#fff" stroke-width="3"/>`,
  dome:o=>`<path d="M-70 0 A70 70 0 0 1 70 0Z" fill="#DCE8FF" opacity=".9" ${sw(3)}/><path d="M-70 0 A70 70 0 0 1 70 0" fill="none" stroke="#9DB4DA" stroke-width="2"/><path d="M-50 0 V-30 M0 0 V-70 M50 0 V-30 M-62 -30 H62" stroke="#9DB4DA" stroke-width="2"/><rect x="-14" y="-30" width="28" height="30" rx="4" fill="#4C8DF6" ${sw(2.5)}/>`,
  panel:o=>{o=o||{};const dirty=o.dirty;return `<path d="M0 0 V-30" ${sw(4)}/><g transform="rotate(-12 0 -40)"><rect x="-44" y="-56" width="88" height="34" fill="${dirty?'#7B8394':'#2B4FA8'}" ${sw(3)}/>
    <path d="M-44 -39 H44 M-22 -56 V-22 M0 -56 V-22 M22 -56 V-22" stroke="${dirty?'#9AA1AE':'#7FA7F0'}" stroke-width="2"/>${dirty?`<g fill="#C9CED8" opacity=".9"><circle cx="-30" cy="-46" r="7"/><circle cx="8" cy="-34" r="9"/><circle cx="30" cy="-48" r="6"/></g>`:''}</g>`;},
  rover:o=>`<rect x="-36" y="-34" width="64" height="24" rx="6" fill="#FFC83D" ${sw(3)}/><circle cx="-24" cy="-8" r="9" fill="#5B6B85" ${sw(3)}/><circle cx="16" cy="-8" r="9" fill="#5B6B85" ${sw(3)}/>
    <path d="M24 -34 L46 -62 L62 -50" ${sw(4)} fill="none"/><path d="M58 -56 l14 -2 l-2 14Z" fill="#E8559A" ${sw(2.5)}/>`,
  screen:o=>{o=o||{};const v=o.v||33;const col=v>80?'#2FB37A':v>50?'#FFC83D':'#FF6B57';return `<text x="0" y="-70" text-anchor="middle" font-family="Fredoka,Nunito,sans-serif" font-weight="600" font-size="16" fill="#9DB4DA">SOLAR POWER</text>
    <rect x="-120" y="-56" width="240" height="22" rx="11" fill="#22304F" ${sw(2)}/><rect x="-118" y="-54" width="${236*v/100}" height="18" rx="9" fill="${col}"/>
    <text x="0" y="-12" text-anchor="middle" font-family="Fredoka,Nunito,sans-serif" font-weight="600" font-size="26" fill="${col}">${v}%</text>`;},
  astro:o=>{o=o||{};return `${kid(Object.assign({shirt:'#F4F7FC',pants:'#DCE3EE',hair:o.hair||'#1F1A17'},o))}<circle cx="0" cy="-94" r="27" fill="#DCE8FF" opacity=".35" ${sw(2.5)}/>`;},
  clock:o=>`<circle cx="0" cy="-26" r="22" fill="#fff" ${sw(3)}/><path d="M0 -26 V-40 M0 -26 L10 -20" ${sw(3)}/><circle cx="-14" cy="-48" r="6" fill="#E36B4E" ${sw(2)}/><circle cx="14" cy="-48" r="6" fill="#E36B4E" ${sw(2)}/><path d="M-14 -6 l-6 8 M14 -6 l6 8" ${sw(3)}/>`,
  bed:o=>`<rect x="-80" y="-40" width="160" height="30" rx="6" fill="#4C8DF6" ${sw(3)}/><rect x="-84" y="-70" width="16" height="70" rx="4" fill="#8B5A2B" ${sw(3)}/><rect x="-66" y="-56" width="40" height="18" rx="8" fill="#fff" ${sw(2.5)}/>`,
  bus:o=>`<rect x="-80" y="-60" width="160" height="50" rx="10" fill="#FFC83D" ${sw(3)}/>${[-62,-30,2,34].map(x=>`<rect x="${x}" y="-52" width="24" height="18" rx="3" fill="#DCE8FF" ${sw(2)}/>`).join('')}<circle cx="-46" cy="-8" r="11" fill="#5B6B85" ${sw(3)}/><circle cx="46" cy="-8" r="11" fill="#5B6B85" ${sw(3)}/>`,
  zzz:o=>`<text x="0" y="0" font-family="Fredoka,Nunito,sans-serif" font-weight="600" font-size="22" fill="#5B6B85">z z z</text>`,
  spider:o=>{o=o||{};const s=o.small;const c=o.c||'#3B2A20';return `<g ${sw(s?2.5:3.5)} fill="none">${[-1,1].map(d=>[0,1,2,3].map(i=>`<path d="M${d*10} ${-22+i*5} q${d*20} ${-14+i*6} ${d*30} ${6+i*8}"/>`).join('')).join('')}</g>
    <ellipse cx="0" cy="-24" rx="16" ry="14" fill="${c}" ${sw(3)}/><circle cx="0" cy="-44" r="11" fill="${c}" ${sw(3)}/><circle cx="-4" cy="-46" r="3" fill="#fff"/><circle cx="4" cy="-46" r="3" fill="#fff"/><circle cx="-4" cy="-46" r="1.4" fill="${INK}"/><circle cx="4" cy="-46" r="1.4" fill="${INK}"/>${s?'':`<path d="M-6 -38 q6 4 12 0" stroke="#fff" stroke-width="2" fill="none"/>`}`;},
  pot:o=>{o=o||{};return `<path d="M-24 -50 q-14 20 -6 40 q8 12 30 12 q22 0 30 -12 q8 -20 -6 -40Z" fill="#B5543A" ${sw(3)}/><rect x="-16" y="-58" width="32" height="10" rx="4" fill="#8E3F2B" ${sw(2.5)}/><path d="M-22 -30 q22 8 44 0" stroke="#FFC83D" stroke-width="3" fill="none"/>${o.glow?`<g fill="#FFE27A">${[[-10,-70],[6,-80],[18,-66],[-20,-84]].map(p=>`<path d="M${p[0]} ${p[1]} l2.5 6 l6 .5 l-4.5 4 l1.5 6 l-5.5 -3 l-5.5 3 l1.5 -6 l-4.5 -4 l6 -.5Z"/>`).join('')}</g>`:''}`;},
  shards:o=>`<path d="M-30 0 l10 -16 l12 8Z M0 0 l6 -20 l14 14Z M24 0 l12 -10 l8 10Z" fill="#B5543A" ${sw(2.5)}/><g fill="#FFE27A">${[[-40,-40],[-6,-60],[30,-46],[60,-80],[-60,-80],[10,-100],[90,-60],[-90,-50]].map(p=>`<path d="M${p[0]} ${p[1]} l2.5 6 l6 .5 l-4.5 4 l1.5 6 l-5.5 -3 l-5.5 3 l1.5 -6 l-4.5 -4 l6 -.5Z"/>`).join('')}</g>`,
  village:o=>`<g>${[-60,0,60].map((x,i)=>`<g transform="translate(${x},0)"><rect x="-22" y="-40" width="44" height="40" fill="#E9C48A" ${sw(2.5)}/><path d="M-30 -36 L0 -62 L30 -36Z" fill="#B98B5E" ${sw(2.5)}/><rect x="-6" y="-20" width="12" height="20" fill="#7A4A2A"/></g>`).join('')}</g>`,
  stars:o=>`<g fill="#FFC83D" ${sw(2)}>${[[-30,-10],[0,-30],[30,-8]].map(p=>`<path d="M${p[0]} ${p[1]-12} l3.5 8 l8.5 1 l-6.5 6 l2 8.5 l-7.5 -4.5 l-7.5 4.5 l2 -8.5 l-6.5 -6 l8.5 -1Z"/>`).join('')}</g>`,
};
function scene(art,label){
  if(!art)return '';
  const bg=BG[art[0]]?BG[art[0]]():BG.sky();
  const items=art.slice(1).map(p=>{const f=PROPS[p[0]];if(!f)return '';
    const flip=p[4]&&p[4].flip?' scale(-1,1)':'';
    return `<g transform="translate(${p[1]},${p[2]}) scale(${p[3]||1})${flip}">${f(p[4]||{})}</g>`;}).join('');
  return `<svg class="scene" viewBox="0 0 400 240" role="img" aria-label="${esc(label||'Story picture')}" preserveAspectRatio="xMidYMid slice">${bg}${items}</svg>`;
}


