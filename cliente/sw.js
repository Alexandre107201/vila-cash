const CACHE='vila-cash-v4-provisorio';
const STATIC=['./manifest.webmanifest','../assets/vila-cash-192.png','../assets/vila-cash-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET') return;
 const url=new URL(e.request.url);
 if(e.request.mode==='navigate' || url.pathname.endsWith('/cliente/') || url.pathname.endsWith('/cliente/index.html')){
   e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('./')));
   return;
 }
 e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request)));
});
