// Aumente o número da versão (v1 -> v2 ...) a cada atualização do app
const V='v1',EXT=['https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js','https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'],LOCAL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(async c=>{await c.addAll(LOCAL.map(u=>new Request(u,{cache:'reload'})));await Promise.all(EXT.map(u=>c.add(new Request(u,{mode:'no-cors'})).catch(()=>{})))})));
self.addEventListener('message',e=>{if(e.data&&e.data.type=='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V&&x!='mc-ext').map(x=>caches.delete(x))))));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;const u=new URL(r.url);
if(u.origin==location.origin){e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).catch(()=>caches.match('index.html'))))}
else e.respondWith(caches.open('mc-ext').then(async c=>{const m=await caches.match(r);const n=fetch(r).then(x=>{if(x&&(x.ok||x.type=='opaque'))c.put(r,x.clone());return x}).catch(()=>m);return m||n}))});
