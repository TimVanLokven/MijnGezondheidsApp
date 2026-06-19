const CACHE_NAAM = 'gezondheid-app-v0.5';

const TE_CACHEN_BESTANDEN = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// opent de cache en slaat bestanden op
self.addEventListener('install', function(event) {
  console.log('SW: installeren...');
  event.waitUntil(
    caches.open(CACHE_NAAM).then(function(cache) {
      return cache.addAll(TE_CACHEN_BESTANDEN);
    })
    .then(function() {
      return self.skipWaiting();
    })
  );
});

// verwijder de oude cache
self.addEventListener('activate', function(event) {
  console.log('SW: actief');
  event.waitUntil(
    caches.keys().then(function(cacheNamen) {
      return Promise.all(
        cacheNamen
          .filter(function(naam) { return naam !== CACHE_NAAM; })
          .map(function(naam) { return caches.delete(naam); })
      );
    })
    .then(function() {
      return self.clients.claim();
    })
  );
});

// cahce fetch
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
      // Als het in de cache is geef het terug
      if (cachedResponse) return cachedResponse;
      // Als het niet in de cache is haal het op van het netwerk
      return fetch(event.request);
    })
  );
});