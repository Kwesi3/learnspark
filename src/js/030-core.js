// ═══════════════════════════════════════════════════════════════
// LEARNSPARK — VIRGINIA SOL EDITION
// ═══════════════════════════════════════════════════════════════
// ── LEARNER STATE ────────────────────────────────────────────
// ST holds the ACTIVE learner's saved data plus transient session fields.
// All learners live in localStorage under 'lsva_profiles' (see PROFILES below).
const ST={};
const SAVE_FIELDS=['id','name','grade','avatar','xp','stars','streak','bestStreak','totalQ','totalC',
  'subjectN','strandN','achievements','gameHi','skills','days','missed','dailyGoal','settings','lastSkill','created','reading','extras'];
function blankLearner(name,grade,avatar){
  return {id:'p'+Date.now().toString(36)+Math.floor(Math.random()*1e4),name:name||'',grade:grade||4,avatar:avatar||'🦊',
    xp:0,stars:0,streak:0,bestStreak:0,totalQ:0,totalC:0,subjectN:{},strandN:{},achievements:[],gameHi:{},
    skills:{},days:{},missed:[],dailyGoal:20,settings:{readAloud:true},lastSkill:null,created:Date.now(),
    reading:{books:{},words:0,sec:0,tricky:{},swapN:0,swapC:0,qN:0,qC:0,proofN:0,proofC:0}};
}
const PROFILES={active:null,list:{}};
function storeGet(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function storeSet(k,v){try{localStorage.setItem(k,v);}catch(e){}}
function loadProfiles(){
  const raw=storeGet('lsva_profiles');
  if(raw){try{const d=JSON.parse(raw);PROFILES.active=d.active;PROFILES.list=d.list||{};}catch(e){}}
  // one-time migration from the original single-learner save ('lsva')
  if(!Object.keys(PROFILES.list).length){
    const old=storeGet('lsva');
    if(old){try{const o=JSON.parse(old);if(o&&o.name){const p=Object.assign(blankLearner(o.name,o.grade),o);
      p.id=blankLearner().id;PROFILES.list[p.id]=p;PROFILES.active=p.id;}}catch(e){}}
  }
  Object.values(PROFILES.list).forEach(p=>{const b=blankLearner();for(const k of SAVE_FIELDS)if(p[k]===undefined)p[k]=b[k];});
}
function persistProfiles(){storeSet('lsva_profiles',JSON.stringify({active:PROFILES.active,list:PROFILES.list}));}
function activateProfile(id){
  const p=PROFILES.list[id];if(!p)return false;
  for(const k of Object.keys(ST))delete ST[k];
  Object.assign(ST,JSON.parse(JSON.stringify(p)),{tab:'learn'});
  PROFILES.active=id;persistProfiles();return true;
}
function save(){
  if(!ST.id)return;const out={};for(const k of SAVE_FIELDS)out[k]=ST[k];
  PROFILES.list[ST.id]=out;PROFILES.active=ST.id;persistProfiles();
}

function rng(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function shuf(a){return [...a].sort(()=>Math.random()-.5);}
function pick(a){return a[rng(0,a.length-1)];}
function gcd(a,b){return b?gcd(b,a%b):a;}
const NAMES=['Ama','Kofi','Maya','Luca','Zoe','Kwame','Sofia','Ben','Lily','Jamal','Nia','Tom','Aisha','Diego','Ella','Yaw'];
const ITEMS=['apples','books','pencils','stickers','marbles','flowers','cards','shells','crayons','coins'];
const rn=()=>pick(NAMES),ri=()=>pick(ITEMS);

