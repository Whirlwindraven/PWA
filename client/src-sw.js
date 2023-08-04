const WorkboxRecipes = require('workbox-recipes');
const WorkboxStrategies = require('workbox-strategies');
const WorkboxRouting = require('workbox-routing');
const WorkboxCacheableResponse = require('workbox-cacheable-response');
const WorkboxExpiration = require('workbox-expiration');
const WorkboxPrecaching = require('workbox-precaching/precacheAndRoute');

// Precache
WorkboxPrecaching.precacheAndRoute(self.__WB_MANIFEST);

// Create Page Cache strategy
let PageCacheStrategy = new WorkboxStrategies.CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new WorkboxCacheableResponse.CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new WorkboxExpiration.ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm Cache for specific routes
WorkboxRecipes.warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: PageCacheStrategy,
});

// Register route for Page Cache
WorkboxRouting.registerRoute(({ request }) => request.mode === 'navigate', PageCacheStrategy);

// Asset caching
WorkboxRouting.registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new WorkboxStrategies.StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new WorkboxCacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
