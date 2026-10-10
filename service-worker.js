```javascript
const CACHE_NAME = "business-igcse-pwa-v2";

const APP_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./content.js",
  "./content2.js",
  "./content3.js",
  "./content4.js",
  "./manifest.json",
  "./app-icon.svg"
];

// Install the new service worker and prepare the offline cache.
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      await Promise.all(
        APP_FILES.map(async (file) => {
          try {
            const response = await fetch(file, {
              cache: "no-cache"
            });

            if (response.ok) {
              await cache.put(file, response);
            }
          } catch (error) {
            console.warn("Could not cache:", file);
          }
        })
      );

      await self.skipWaiting();
    })()
  );
});

// Remove outdated caches and activate this version.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );

      await self.clients.claim();
    })()
  );
});

// Prefer fresh online files; use cached files when offline.
self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Do not intercept requests to other websites.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Always check the network first for page navigation.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request, {
            cache: "no-cache"
          });

          if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put("./index.html", response.clone());
          }

          return response;
        } catch (error) {
          const cachedPage = await caches.match("./index.html");

          if (cachedPage) {
            return cachedPage;
          }

          return new Response(
            "You are offline and this page is not cached yet.",
            {
              status: 503,
              headers: {
                "Content-Type": "text/plain; charset=utf-8"
              }
            }
          );
        }
      })()
    );

    return;
  }

  // Only cache files belonging to this website.
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      try {
        const response = await fetch(request, {
          cache: "no-cache"
        });

        if (response.ok && response.type === "basic") {
          await cache.put(request, response.clone());
        }

        return response;
      } catch (error) {
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
          return cachedResponse;
        }

        return new Response("This resource is unavailable offline.", {
          status: 503,
          headers: {
            "Content-Type": "text/plain; charset=utf-8"
          }
        });
      }
    })()
  );
});
```
