import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import * as strategies from 'workbox-strategies'
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
