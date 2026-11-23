// Painted art for games, avatars and award medals (falls back to the drawn SVGs when a picture is missing)
function artSrc(key,small){const p='art/'+(small?'sm/':'')+key+'.webp';const m=window.ASSET_INLINE;
  return (m&&(m[p]||m['art/sm/'+key+'.webp']))||('./assets/'+p);}
function avImg(a,cls){const f=AVATAR_FILE[a];if(!f)return esc(a||'');
  const k='av_'+f;const src=ART_HAVE.has(k)?artSrc(k,true):asset('avatars/'+f+'.svg');
  return `<img class="av-img${ART_HAVE.has(k)?' av-art':''}${cls?' '+cls:''}" src="${src}" alt="${f}" decoding="async">`;}
function gameImg(k){if(!GAMES[k])return '';const g='game_'+k;
  return ART_HAVE.has(g)?`<img class="game-img game-art" src="${artSrc(g,true)}" alt="" decoding="async">`
    :`<img class="game-img" src="${asset('games/'+k+'.svg')}" alt="" decoding="async">`;}
const AWARD_CAT={first:'practice',ten:'practice',fifty:'practice',q250:'practice',test1:'practice',test80:'practice',
  streak5:'streak',streak10:'streak',goal:'streak',days3:'streak',days7:'streak',
  m1:'mastery',m5:'mastery',m10:'mastery',xp500:'mastery',
  gamer:'games',detective:'games',stars3:'games',book1:'reading',book5:'reading',words300:'reading',closet:'fun',family:'fun'};
const _badgeSvg=badge;
// painted medals only once the whole set exists, so the awards grid stays consistent
const AW_ALL=['practice','streak','mastery','games','reading','fun'].every(c=>ART_HAVE.has('aw_'+c));
badge=function(a,got){const k='aw_'+(AWARD_CAT[a.id]||'');
  if(!AW_ALL||!ART_HAVE.has(k))return _badgeSvg(a,got);
  return `<img class="badge badge-art${got?'':' locked-art'}" src="${artSrc(k,true)}" alt="" decoding="async">`;};

