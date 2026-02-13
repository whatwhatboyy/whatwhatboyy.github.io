// Service Worker for whatwhatboyy.github.io
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `whatwhatboy-${CACHE_VERSION}`;

// Assets to cache on install
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/assets/images/logo.png',
    '/assets/css/site-fixes.css',
    '/assets/css/visual-enhancements.css',
    '/assets/css/dark-theme-enhancements.css',
    '/assets/css/loading-states.css',
    '/assets/js/loading-states.js',
    '/assets/js/dark-mode.js',
    '/assets/js/activity-tracker.js'
];

// Install event - precache assets
self.addEventListener('install', (event) => {
    // console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                // console.log('[Service Worker] Precaching assets');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    // console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        // console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Skip external requests
    if (!event.request.url.startsWith(self.location.origin)) return;
    
    // Skip download links
    if (event.request.url.includes('bstlar.com') || 
        event.request.url.includes('lootdest.org')) return;

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version
                    return cachedResponse;
                }
                
                // Fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }
                        
                        // Clone the response
                        const responseToCache = response.clone();
                        
                        // Cache new resources
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Offline fallback
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Background sync for failed requests
self.addEventListener('sync', (event) => {
    // console.log('[Service Worker] Background sync:', event.tag);
    if (event.tag === 'sync-downloads') {
        event.waitUntil(syncDownloads());
    }
});

function syncDownloads() {
    // Handle background sync for downloads
    return Promise.resolve();
}

// Push notifications (future feature)
self.addEventListener('push', (event) => {
    const data = event.data?.json() ?? {};
    const title = data.title || 'New Update';
    const options = {
        body: data.body || 'Check out the latest content!',
        icon: '/assets/images/logo.png',
        badge: '/assets/images/logo.png',
        data: data.url
    };
    
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.notification.data) {
        event.waitUntil(
            clients.openWindow(event.notification.data)
        );
    }
});

// console.log('[Service Worker] Loaded successfully');
