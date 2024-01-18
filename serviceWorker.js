const staticDevCoffee = "dev-coffee-site-v1";

self.addEventListener("install", installEvent => {
  console.log('Service Worker: Install Event');
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      console.log('Service Worker: Caching Assets');
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", activateEvent => {
  console.log('Service Worker: Activate Event');
  activateEvent.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticDevCoffee)
          .map(key => caches.delete(key)) // Löscht alte Caches
      );
    })
  );
  console.log('Service Worker: Ready to handle fetches');
});

self.addEventListener("fetch", fetchEvent => {
  console.log('Service Worker: Fetch Event');
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
