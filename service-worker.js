const CACHE_NAME = "pixel-art-editor-v5";
const APP_ASSETS = [
  "./",
  "index.html",
  "pixel_art_editor.html",
  "manifest.webmanifest",
  "apple-touch-icon.png",
  "apple-touch-icon-precomposed.png",
  "apple-touch-icon-v9.png",
  "mushroom-icon-192.png",
  "mushroom-icon-512.png",
  "mushroom-icon-1024.png",
  "fonts/misaki.css",
  "fonts/misaki/misaki_gothic.ttf",
  "fonts/misaki/misaki_mincho.ttf"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(APP_ASSETS.map((asset) => cache.add(asset).catch(() => null)))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isHtmlRequest = event.request.mode === "navigate" || requestUrl.pathname.endsWith(".html") || requestUrl.pathname.endsWith("/");
  if (isHtmlRequest) {
    event.respondWith(
      fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
