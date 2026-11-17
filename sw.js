// Keeps the MX page working with no signal: the page itself, and every map tile you've already looked at.
const APP = 'rt-app-v6', TILES = 'mx-tiles-v1', MAX_TILES = 4000;
const SHELL = ['./', './index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', e => { e.waitUntil(caches.open(APP).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });

self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // Map tiles: from the phone if we have them, otherwise fetch and keep.
  if (/arcgisonline\.com|tile\.openstreetmap\.org/.test(u.hostname)) {
    e.respondWith(caches.open(TILES).then(async c => {
      const hit = await c.match(e.request);
      if (hit) return hit;
      const r = await fetch(e.request);
      if (r.ok || r.type === 'opaque') { c.put(e.request, r.clone()); trim(c); }
      return r;
    }));
    return;
  }
  // The page: try the network first (so updates arrive), fall back to the saved copy.
  if (u.origin === location.origin) {
    e.respondWith(fetch(e.request).then(r => { const k = r.clone(); caches.open(APP).then(c => c.put(e.request, k)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
  }
});

let trimming = false;
async function trim(c) {
  if (trimming) return; trimming = true;
  try { const keys = await c.keys(); for (let i = 0; i < keys.length - MAX_TILES; i++) await c.delete(keys[i]); } finally { trimming = false; }
}
