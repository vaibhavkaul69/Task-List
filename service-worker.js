const staticCache = "list-v1";
const assets = [
  "/",  
  "/index.html",
  "/app.js",
  "/style.css",
  "/app-icon.png",
  "/bg-body.jpg",
  "/icon-72x72.png",
  "/icon-96x96.png",
  "/icon-128x128.png",
  "/icon-144x144.png",
  "/app-icon-144x144.png",
  "/icon-152x152.png",
  "/icon-192x192.png",
  "/icon-384x384.png",
  "/icon-512x512.png",
  "/pencil.png",
  "/done.png"
  
];
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticCache).then(cache => {
      cache.addAll(assets)
    })
  )
  //Activates on its own
  self.skipWaiting();
});

self.addEventListener('activate',evt=>{
  evt.waitUntil(
    caches.keys()
    .then(arrayRes=>{
      arrayRes.map(element=>{
        if(staticCache!==element){
          caches.delete(element);
        }
      })
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request)
      .then(res => {
        return res || fetch(fetchEvent.request)
      })
    );
  });