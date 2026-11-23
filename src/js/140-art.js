// ═══════════════════════════════════════════════════════════════
// ART — original sticker-style SVG illustrations (no image files,
// so everything works offline). Thick navy "ink" outline, flat fills.
// ═══════════════════════════════════════════════════════════════
const INK='#1F2A44';
// Sparky, the LearnSpark rocket. mood: 'happy' | 'cheer' | 'think' | 'wave'
function mascot(size,mood){
  mood=mood||'happy';
  const arms=mood==='cheer'
    ?`<path d="M30 70 L12 46" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M90 70 L108 46" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="11" cy="44" r="6" fill="#FFC83D" stroke="${INK}" stroke-width="3"/><circle cx="109" cy="44" r="6" fill="#FFC83D" stroke="${INK}" stroke-width="3"/>`
    :mood==='wave'
    ?`<path d="M90 70 L108 50" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><circle cx="109" cy="48" r="6" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <path d="M30 74 L16 84" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`
    :`<path d="M30 74 L16 84" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M90 74 L104 84" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
  const mouth=mood==='think'?`<path d="M53 62 Q60 60 67 62" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
    :`<path d="M50 59 Q60 70 70 59" stroke="${INK}" stroke-width="3.5" fill="#fff" stroke-linejoin="round"/>`;
  const eyes=mood==='cheer'?`<path d="M47 50 Q51 45 55 50" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M65 50 Q69 45 73 50" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
    :`<circle cx="51" cy="49" r="4" fill="${INK}"/><circle cx="69" cy="49" r="4" fill="${INK}"/><circle cx="52.5" cy="47.5" r="1.3" fill="#fff"/><circle cx="70.5" cy="47.5" r="1.3" fill="#fff"/>`;
  const hat=typeof mascotHat==='function'?mascotHat():'';const tall=!!hat&&!/A24 24/.test(hat);const body=typeof mascotBody==='function'?mascotBody():'#4C8DF6';
  return `<svg class="mascot m-${mood}" viewBox="0 ${tall?-26:0} 120 ${tall?166:140}" width="${size}" height="${Math.round(size*(tall?166:140)/120)}" aria-hidden="true">
    <path class="m-flame" d="M48 108 Q60 140 72 108 Z" fill="#FF8A3D" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M53 108 Q60 126 67 108 Z" fill="#FFC83D"/>
    <path d="M36 80 L18 106 L40 104 Z" fill="#E8559A" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M84 80 L102 106 L80 104 Z" fill="#E8559A" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    ${arms}
    <path d="M60 6 C90 26 96 72 86 108 L34 108 C24 72 30 26 60 6 Z" fill="${body}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M60 6 C70 13 77 22 82 32 L38 32 C43 22 50 13 60 6 Z" fill="#FFC83D" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="60" cy="54" r="21" fill="#fff" stroke="${INK}" stroke-width="4"/>
    ${eyes}${mouth}
    <circle cx="44" cy="60" r="3.5" fill="#FF9EC4"/><circle cx="76" cy="60" r="3.5" fill="#FF9EC4"/>
    <path d="M44 92 H76" stroke="${INK}" stroke-width="4" stroke-linecap="round" opacity=".35"/>${hat}
  </svg>`;
}
// Subject illustrations (viewBox 160×120)
const SUBJ_ART={
  math:`<g stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
    <path d="M18 100 L18 30 L88 100 Z" fill="#FFC83D"/><path d="M34 84 L34 66 L52 84 Z" fill="#fff"/>
    <circle cx="112" cy="46" r="30" fill="#DCE8FF"/><path d="M112 46 L112 16 A30 30 0 0 1 140 56 Z" fill="#4C8DF6"/>
    <rect x="92" y="82" width="54" height="26" rx="8" fill="#fff"/>
    <path d="M104 95 h10 M109 90 v10 M124 92 h10 M124 98 h10" />
  </g>`,
  read:`<g stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
    <path d="M80 34 C64 24 40 22 18 28 L18 100 C40 94 64 96 80 106 Z" fill="#fff"/>
    <path d="M80 34 C96 24 120 22 142 28 L142 100 C120 94 96 96 80 106 Z" fill="#D7F5E7"/>
    <path d="M80 34 V106"/><path d="M30 46 C44 42 58 42 70 48 M30 60 C44 56 58 56 70 62 M30 74 C44 70 58 70 70 76" stroke-width="3" opacity=".45"/>
    <path d="M118 22 V52 L126 45 L134 52 V22" fill="#2FB37A"/>
    <path d="M100 66 l4 8 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6 l9 -1 Z" fill="#FFC83D" stroke-width="3"/>
  </g>`,
  sci:`<g stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
    <path d="M42 18 H70 M48 18 V50 L22 98 C19 104 23 110 30 110 H82 C89 110 93 104 90 98 L64 50 V18" fill="#fff"/>
    <path d="M33 78 H79 L90 98 C93 104 89 110 82 110 H30 C23 110 19 104 22 98 Z" fill="#FF8A3D"/>
    <circle cx="46" cy="94" r="5" fill="#fff" stroke-width="3"/><circle cx="62" cy="88" r="3.5" fill="#fff" stroke-width="3"/>
    <circle cx="122" cy="52" r="22" fill="#FFC83D"/><ellipse cx="122" cy="52" rx="36" ry="10" fill="none" transform="rotate(-18 122 52)"/>
    <circle cx="132" cy="100" r="6" fill="#DCE8FF" stroke-width="3"/><circle cx="104" cy="16" r="4" fill="#fff" stroke-width="3"/>
  </g>`,
  write:`<g stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
    <rect x="18" y="18" width="88" height="94" rx="8" fill="#fff"/>
    <path d="M32 40 H92 M32 56 H92 M32 72 H80 M32 88 H70" stroke-width="3" opacity=".4"/>
    <path d="M18 30 H106" stroke="#E8559A" stroke-width="3"/>
    <g transform="rotate(35 118 64)"><rect x="108" y="10" width="20" height="82" rx="3" fill="#FFC83D"/>
    <rect x="108" y="10" width="20" height="14" rx="3" fill="#E8559A"/><path d="M108 92 L118 112 L128 92 Z" fill="#FCE3C6"/>
    <path d="M115 105 L118 112 L121 105 Z" fill="${INK}"/></g>
  </g>`,
};
// soft decorative clouds/stars for hero bands
function heroDeco(){
  return `<svg class="hero-deco" viewBox="0 0 400 160" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
    <g fill="#fff" opacity=".22"><circle cx="330" cy="40" r="26"/><circle cx="356" cy="46" r="20"/><circle cx="306" cy="48" r="16"/>
    </g>
    <g fill="#FFC83D"><path d="M250 28 l3 7 l7 1 l-5 5 l1 7 l-6 -3 l-6 3 l1 -7 l-5 -5 l7 -1 Z"/></g>
  </svg>`;
}


