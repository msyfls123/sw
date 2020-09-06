import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import * as strategies from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { PrecacheEntry } from 'workbox-precaching/_types'

interface Scope extends ServiceWorkerGlobalScope {
  __precacheManifest: PrecacheEntry[]
}
declare const self: Scope
declare const __WB_MANIFEST: PrecacheEntry[]

self.__precacheManifest = __WB_MANIFEST
precacheAndRoute(self.__precacheManifest || [])

self.addEventListener('install', () => {
  self.skipWaiting();
})

registerRoute(
  new RegExp('https:\\/\\/day\\.ebichu\\.cc\\/api\\/\\d{1,2}$'),
  new strategies.NetworkFirst()
)

registerRoute(
  /\.(?:png|jpg|jpeg|svg)$/,
  new strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        cacheName: 'image-cache',
        // Only cache requests for a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
        // Only cache 10 requests.
        maxEntries: 30,
      }),
    ]
  })
)
