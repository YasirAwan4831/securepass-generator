// Service Worker for Offline Functionality
const CACHE_NAME = 'securepass-generator-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/components/themes.css',
  '/styles/components/header.css',
  '/styles/components/generator.css',
  '/styles/components/settings.css',
  '/styles/responsive.css',
  '/js/script.js',
  '/js/utils/helpers.js',
  '/js/modules/themeManager.js',
  '/js/modules/strengthChecker.js',
  '/js/modules/passwordGenerator.js',
  '/js/modules/clipboard.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});