// Service worker sederhana: ambil dari jaringan dulu supaya perubahan di GitHub langsung terpakai.
// Cache hanya cadangan saat offline. Permintaan ke backend (script.google.com) dan CDN tidak disentuh.
const CACHE = 'meeting-room-23-v2';
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys()
    .then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); })
    .then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req, { cache: 'no-cache' })
      .then(function (res) { const copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); return res; })
      .catch(function () { return caches.match(req); })
  );
});
