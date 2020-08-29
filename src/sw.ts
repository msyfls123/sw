import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import * as strategies from 'workbox-strategies'

self.__precacheManifest = __WB_MANIFEST
precacheAndRoute(self.__precacheManifest || [])

registerRoute(
  new RegExp('https:\\/\\/day\\.ebichu\\.cc\\/api\\/\\d{1,2}$'),
  new strategies.NetworkFirst()
)
