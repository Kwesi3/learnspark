// ═══════════════════════════════════════════════════════════════
// IMAGES — real illustration files instead of emoji
// • assets/subjects, assets/games, assets/avatars: SVG picture files
//   (cached for offline use by sw.js). The single-file copy carries them
//   inline in window.ASSET_INLINE so it still works with no folder.
// • Small interface icons are drawn as inline SVG so they stay crisp and
//   take on the colour of the text around them.
// ═══════════════════════════════════════════════════════════════
function asset(p){const m=window.ASSET_INLINE;return (m&&m[p])||('./assets/'+p);}
const SUBJ_ALT={math:'Mathematics picture',read:'Reading picture',sci:'Science picture',write:'Writing picture',hist:'History and Social Science picture'};
function subjArt(subj,w){
  return `<img class="subj-art" src="${asset('subjects/'+subj+'.svg')}" width="${w}" height="${Math.round(w*.75)}" alt="" decoding="async">`;
}
const AVATAR_FILE={'🦊':'fox','🐼':'panda','🦁':'lion','🐯':'tiger','🐸':'frog','🐙':'octopus','🦄':'unicorn','🐢':'turtle',
  '🦉':'owl','🐬':'dolphin','🚀':'rocket','⚽':'soccer','🎨':'palette','🌻':'sunflower','🐝':'bee','🦖':'dino'};
function avImg(a,cls){const f=AVATAR_FILE[a];
  return f?`<img class="av-img${cls?' '+cls:''}" src="${asset('avatars/'+f+'.svg')}" alt="${f}" decoding="async">`:esc(a||'');}
function gameImg(k){return GAMES[k]?`<img class="game-img" src="${asset('games/'+k+'.svg')}" alt="" decoding="async">`:'';}

// line icons, 24×24, drawn with currentColor
const IC={
  books:'<path d="M4 19V5a2 2 0 0 1 2-2h3v18H6a2 2 0 0 1-2-2z"/><path d="M9 3h4v18H9"/><path d="M15 5l3.6-1 3.4 15.6-3.6 1z"/>',
  book:'<path d="M2 5c3-1.4 7-1.4 10 1 3-2.4 7-2.4 10-1v14c-3-1-7-1-10 1-3-2-7-2-10-1z"/><path d="M12 6v14"/>',
  lesson:'<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11M9 8h6"/>',
  gamepad:'<rect x="2" y="7" width="20" height="11" rx="5.5"/><path d="M7 10.5v4M5 12.5h4"/><circle cx="15.5" cy="11.2" r="1" fill="currentColor"/><circle cx="18" cy="13.8" r="1" fill="currentColor"/>',
  trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 17h6v4H9z"/>',
  chart:'<path d="M3 21h18M6 17v-6M11 17V5M16 17v-9"/>',
  gear:'<path d="M10.3 2h3.4l.5 2.6 1.9.8 2.2-1.5 2.4 2.4-1.5 2.2.8 1.9 2.6.5v3.4l-2.6.5-.8 1.9 1.5 2.2-2.4 2.4-2.2-1.5-1.9.8-.5 2.6h-3.4l-.5-2.6-1.9-.8-2.2 1.5-2.4-2.4 1.5-2.2-.8-1.9L2 13.7v-3.4l2.6-.5.8-1.9-1.5-2.2 2.4-2.4 2.2 1.5 1.9-.8z"/><circle cx="12" cy="12" r="3"/>',
  flame:'<path d="M12 3c1 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-4.5 2-6.5 2 1 3 3 3 5 1-2 1.5-5.5 1-9.5z"/>',
  medal:'<circle cx="12" cy="15" r="6"/><path d="M8 3l4 6 4-6"/><path d="M12 12.2l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3z"/>',
  refresh:'<path d="M20 11a8 8 0 0 0-14.6-4.5M4 3v4h4M4 13a8 8 0 0 0 14.6 4.5M20 21v-4h-4"/>',
  clipboard:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2.5h6V4M9 12.5l2 2 4-4.5"/>',
  people:'<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20c0-4 2.7-6 6-6s6 2 6 6M14.5 20c0-3 1.4-5 3.5-5s4 2 4 5"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  sprout:'<path d="M12 21v-9M12 12C12 8 9 5 4 5c0 4 3 7 8 7zM12 10c0-3 3-6 8-6 0 4-3 6-8 6z"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  checks:'<path d="M2 12.5l4.5 4.5L16 7.5M10 16l1 1 9.5-9.5"/>',
  bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  star:'<path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.4l-5.5 2.9 1-6.2L3 9.7l6.2-.9z"/>',
  crown:'<path d="M3 19h18M4 8l4 5 4-7 4 7 4-5-1.5 9h-13z"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/>',
  hat:'<path d="M7 16V5h10v11M3 16h18v3H3zM7 12h10"/>',
  bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>',
  puzzle:'<path d="M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4H4z"/>',
  question:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6"/><circle cx="12" cy="17" r=".9" fill="currentColor"/>',
  hourglass:'<path d="M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9"/>',
  link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  scale:'<path d="M12 3v18M7 21h10M4 7h16M7 7l-3 7a3 3 0 0 0 6 0zM17 7l-3 7a3 3 0 0 0 6 0z"/>',
  calc:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 12h2M14 12h2M8 16h2M14 16h2"/>',
  flask:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3M7.5 15h9"/>',
  pencil:'<path d="M4 20l1-4L16 5l3 3L8 19zM14 7l3 3"/>',
  columns:'<path d="M3 9l9-5 9 5zM5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 21h18M4 18h16"/>',
};
function ic(name,cls){const p=IC[name];if(!p)return '';
  return `<svg class="ic${cls?' '+cls:''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;}
const SUBJ_IC={math:'calc',read:'book',sci:'flask',write:'pencil',hist:'columns'};
function subjIc(k){return ic(SUBJ_IC[k]||'book');}

// Award medals: a coloured medallion with a white symbol
const BADGE={first:['sprout','#2FB37A'],ten:['check','#4C8DF6'],fifty:['checks','#2F6FE0'],q250:['books','#9B5DE5'],
  streak5:['flame','#FF8A3D'],streak10:['bolt','#F59E0B'],m1:['medal','#E0A100'],m5:['star','#94A3B8'],m10:['trophy','#E0A100'],
  goal:['target','#E8559A'],days3:['calendar','#14A394'],days7:['calendar','#0E8A7E'],xp500:['crown','#E0A100'],
  gamer:['gamepad','#6366F1'],book1:['book','#2FB37A'],book5:['books','#17885A'],words300:['mic','#9B5DE5'],stars3:['search','#6D28D9'],
  test1:['clipboard','#2F6FE0'],test80:['target','#1D4AA8'],detective:['search','#4C1D95'],closet:['hat','#E8559A'],family:['people','#E36B4E']};
function badge(a,got){
  const [g,c]=BADGE[a.id]||['star','#4C8DF6'];const col=got?c:'#CBD6E8';const glyph=IC[got?g:'lock'];
  return `<svg class="badge" viewBox="0 0 64 64" aria-hidden="true">
    <path d="M22 40 16 60 25 56 30 62 33 44Z M42 40 48 60 39 56 34 62 31 44Z" fill="${got?'#E8559A':'#E3E9F3'}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="32" cy="28" r="22" fill="${col}" stroke="${INK}" stroke-width="3"/>
    <circle cx="32" cy="28" r="16.5" fill="none" stroke="#fff" stroke-width="2" opacity=".55"/>
    <g transform="translate(21 17) scale(.92)" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${glyph}</g></svg>`;
}
// Strategy of the day: symbol for each strategy
const EMOJI_IC={'🔎':'search','💡':'bulb','🧩':'puzzle','❓':'question','📊':'chart','⏳':'hourglass','🔗':'link','🕵️':'search','⚖️':'scale'};
function strategyCard(){const s=strategyToday();
  const g=EMOJI_IC[s.ic];
  return `<div class="strategy"><div class="str-ic">${g?ic(g):s.ic}</div><div class="str-b"><div class="str-k">Strategy of the day</div><div class="str-t">${s.t}</div><div class="str-d">${s.d}</div></div>
    <button class="btn btn-sec str-go" onclick="strategyGo()">Practice it</button></div>`;}
// Game start screens and the game title bar show the game's picture
const _introBase=intro;
intro=function(icon,title,desc,onPlay){
  const k=Object.keys(GAMES).find(k=>GAMES[k].title===title);
  return _introBase(k?gameImg(k):icon,title,desc,onPlay);
};



