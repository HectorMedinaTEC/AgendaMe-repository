declare global {
  interface ServiceWorkerRegistration {
    sync?: SyncManager
  }
}

interface SyncManager {
  register(tag: string): Promise<void>
}

export async function registerServiceWorker() {
  try {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service Workers not supported')
      return
    }

    // Register service worker from public folder
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    })

    if (registration.sync) {
      await registration.sync.register('sync-activities')
    }

    console.log('Service Worker registered successfully')
  } catch (error) {
    console.warn('Service Worker registration failed:', error)
  }
}
