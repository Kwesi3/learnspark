// LearnSpark offline cache: serve from cache, refresh in the background.
const CACHE='/*@cache*/';
const FILES=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png',/*@assets*/,
  /*@audio*/];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&k!=='learnspark-videos').map(k=>caches.delete(k)))));self.clients.claim();});
// Videos: play from the offline cache when saved (with range support); otherwise stream from the network.
async function videoResp(req){
  const hit=await (await caches.open('learnspark-videos')).match(req.url);
  if(!hit)return fetch(req);
  const range=req.headers.get('range');if(!range)return hit;
  const buf=await hit.arrayBuffer(),n=buf.byteLength,m=/bytes=(\d*)-(\d*)/.exec(range)||[];
  const a=m[1]?+m[1]:0,b=m[2]?Math.min(+m[2],n-1):n-1;
  return new Response(buf.slice(a,b+1),{status:206,headers:{'Content-Type':'video/mp4','Content-Range':`bytes ${a}-${b}/${n}`,'Content-Length':String(b-a+1),'Accept-Ranges':'bytes'}});
}
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  if(/\.mp4$/.test(new URL(e.request.url).pathname)){e.respondWith(videoResp(e.request));return;}
  if(e.request.headers.has('range'))return;
  e.respondWith(caches.open(CACHE).then(async c=>{
    const hit=await c.match(e.request,{ignoreSearch:true});
    const net=fetch(e.request).then(r=>{if(r.status===200)c.put(e.request,r.clone()).catch(()=>{});return r;}).catch(()=>hit);
    return hit||net;
  }));
});
