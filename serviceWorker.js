const staticDevCoffee = "dev-coffee-site-v1";

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});

self.addEventListener("activate", activateEvent => {
  console.log('Service Worker: Activate Event');
});

self.addEventListener("install", installEvent => {
  console.log('Service Worker: install Event');
});
