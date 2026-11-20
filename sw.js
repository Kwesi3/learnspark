// LearnSpark offline cache: serve from cache, refresh in the background.
const CACHE='learnspark-v6';
const FILES=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./audio/anansi.mp3','./audio/bees.mp3','./audio/drum.mp3','./audio/kite.mp3','./audio/lessons2.mp3','./audio/moonbase.mp3','./audio/pip.mp3','./audio/school.mp3','./audio/seed.mp3','./audio/swap.mp3','./audio/turtles.mp3'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(caches.open(CACHE).then(async c=>{
    const hit=await c.match(e.request,{ignoreSearch:true});
    const net=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r;}).catch(()=>hit);
    return hit||net;
  }));
});
