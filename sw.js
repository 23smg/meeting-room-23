// Service Worker minimalis agar syarat PWA Android terpenuhi
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // Biarkan request lewat langsung ke internet
  event.respondWith(fetch(event.request));
});
