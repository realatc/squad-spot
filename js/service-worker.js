// This is the service worker for the sign-in page
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
});

self.addEventListener("fetch", (event) => {
    event.respondWith(fetch(event.request));
});

self.addEventListener('notificationclick', event => {
    const url = event.notification.data?.url;
    event.notification.close();
    if (url) {
        event.waitUntil(clients.openWindow(url));
    }
});
