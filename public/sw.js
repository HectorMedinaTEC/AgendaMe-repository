const CACHE_NAME = 'agenda-app-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request)
      })
    )
  }
})

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-activities') {
    event.waitUntil(syncActivities())
  }
})

async function syncActivities() {
  try {
    // Sync logic here
    console.log('Syncing activities...')
  } catch (error) {
    console.error('Sync failed:', error)
  }
}
