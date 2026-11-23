// ── Videos: picture-book story videos + lesson explainers, with save-for-offline ──
// window.VIDEOS = {story:{id:{d,kb}}, lesson:{gen:{d,kb}}} comes from part_q_gz_vdata.js (generated).
const VID=window.VIDEOS||{story:{},lesson:{}};
const VID_CACHE='learnspark-videos';
const VID_REMOTE='https://kwesi3.github.io/learnspark/';
function vidBase(){return /github\.io$/.test(location.hostname)||location.protocol==='file:'?'./':VID_REMOTE;}
function vidUrl(kind,id,ext){return vidBase()+'assets/video/'+(kind==='story'?'s_':'l_')+id+'.'+(ext||'mp4');}
function hasVideo(kind,id){return !!(VID[kind]&&VID[kind][id]);}
function vidLen(s){s=Math.round(s);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');}
const vidCan=()=>'caches' in window&&location.protocol==='https:'&&/github\.io$/.test(location.hostname);
async function vidSaved(kind,id){if(!vidCan())return false;try{const c=await caches.open(VID_CACHE);return !!(await c.match(vidUrl(kind,id)));}catch(e){return false;}}

function openVideo(kind,id,title){
  const info=VID[kind][id];if(!info)return;
  try{if(typeof stopAll==='function')stopAll();}catch(e){}
  const ov=document.createElement('div');ov.className='vid-ov';ov.setAttribute('role','dialog');ov.setAttribute('aria-label','Video: '+title);
  ov.innerHTML=`<div class="vid-box">
    <div class="vid-head"><div class="vid-t">${esc(title)}</div><button class="vid-x" aria-label="Close video">✕</button></div>
    <video class="vid-el" controls playsinline preload="metadata" poster="${vidUrl(kind,id,'jpg')}" src="${vidUrl(kind,id)}"></video>
    <div class="vid-foot"><span class="muted">${vidLen(info.d)} · ${(info.kb/1024).toFixed(1)} MB</span>
      <span class="vid-acts"></span></div>
    <div class="vid-err" hidden>This video needs an internet connection the first time. Save it for offline to watch anywhere.</div></div>`;
  document.body.appendChild(ov);
  const v=ov.querySelector('video'),close=()=>{v.pause();ov.remove();document.removeEventListener('keydown',kd);};
  const kd=e=>{if(e.key==='Escape')close();};document.addEventListener('keydown',kd);
  ov.querySelector('.vid-x').onclick=close;ov.addEventListener('click',e=>{if(e.target===ov)close();});
  v.addEventListener('error',()=>{ov.querySelector('.vid-err').hidden=false;});
  v.addEventListener('ended',()=>{try{const x=ST.extras||(ST.extras={});x.vids=x.vids||{};x.vids[kind+':'+id]=1;save();}catch(e){}});
  vidActs(ov.querySelector('.vid-acts'),kind,id);
  v.play().catch(()=>{});
}
async function vidActs(el,kind,id){
  if(!vidCan()){el.innerHTML='';return;}
  const saved=await vidSaved(kind,id);
  el.innerHTML=saved?`<span class="vid-ok">✓ Saved for offline</span> <button class="vid-btn" data-a="rm">Remove</button>`
    :`<button class="vid-btn" data-a="save">⬇ Save for offline</button>`;
  const b=el.querySelector('button');
  b.onclick=async()=>{
    const c=await caches.open(VID_CACHE),u=vidUrl(kind,id);
    if(b.dataset.a==='rm'){await c.delete(u);return vidActs(el,kind,id);}
    b.disabled=true;b.textContent='Saving…';
    try{const r=await fetch(u,{cache:'no-store'});if(!r.ok)throw 0;await c.put(u,r);await c.add(vidUrl(kind,id,'jpg')).catch(()=>{});}
    catch(e){b.disabled=false;b.textContent='Could not save — try again';return;}
    vidActs(el,kind,id);
  };
}

// Watch button helpers
function vidBtn(kind,id,title,label){
  if(!hasVideo(kind,id))return '';
  return `<button class="vid-chip" onclick="event.stopPropagation();openVideo('${kind}','${id}','${esc(title).replace(/'/g,"\\'")}')" aria-label="Watch the video of ${esc(title)}">▶ ${label||'Watch'} <small>${vidLen(VID[kind][id].d)}</small></button>`;
}

// Stories shelf: a "Watch" row of story videos for the chosen level, and a Watch button in the reader.
const _rstVid=renderStoriesTab;
renderStoriesTab=function(c){_rstVid(c);
  const lv=_shelfLevel||myLevel();const vids=STORIES.filter(b=>b.level===lv&&hasVideo('story',b.id));
  if(!vids.length)return;
  const shelf=c.querySelector('.shelf');if(!shelf)return;
  const sec=document.createElement('div');
  sec.innerHTML=`<div class="sec-title">Story videos · watch and listen</div>
    <div class="vid-row">${vids.map(b=>`<button class="vid-card" onclick="openVideo('story','${b.id}','${esc(b.title).replace(/'/g,"\\'")}')">
      <span class="vid-thumb">${scene(b.cover,'')}<span class="vid-play" aria-hidden="true">▶</span><span class="vid-dur">${vidLen(VID.story[b.id].d)}</span></span>
      <span class="vid-n">${esc(b.title)}</span></button>`).join('')}</div>`;
  shelf.after(...sec.childNodes);
};
const _obVid=openBook;
openBook=function(id,page){_obVid(id,page);
  const b=bookById(id);if(!b||!hasVideo('story',id))return;
  const sz=document.querySelector('.rd-size');if(sz)sz.insertAdjacentHTML('beforebegin',vidBtn('story',id,b.title));
};

// Lesson explainers: add a Watch button to the lesson card in practice.
function lessonVidBtn(gen,name){return hasVideo('lesson',gen)?`<div class="les-vid">${vidBtn('lesson',gen,name,'Watch the lesson')}</div>`:'';}
const _olVid=openLesson;
openLesson=function(subj,code,firstTime){_olVid(subj,code,firstTime);
  const st=findSkill(subj,code);if(!st||!hasVideo('lesson',st.gen))return;
  const qc=document.querySelector('.lesson .act-body .qc');if(qc)qc.insertAdjacentHTML('afterbegin',lessonVidBtn(st.gen,st.name));
};
const _srbVid=showReviewBreak;
showReviewBreak=function(){_srbVid();
  const st=findSkill(SESSION.subj,SESSION.code);if(!st||!hasVideo('lesson',st.gen))return;
  const h=document.querySelector('.review-break');if(h)h.insertAdjacentHTML('beforeend',lessonVidBtn(st.gen,st.name));
};

