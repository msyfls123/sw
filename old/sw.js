const req = new Request('https://day.ebichu.cc/api/1', { mode: 'cors' })

self.addEventListener('install', (ev) => {
  ev.waitUntil(
    caches.open('v2').then((cache) => {
      return cache.addAll([
        req,
        '/sw/app.js',
        '/sw/index.html'])
    })
  )
})

self.addEventListener('fetch', (ev) => {
  ev.respondWith(
    caches.match(ev.request).then(res => {
      return res || fetch(ev.request).then(newRes => {
        return caches.open('v2').then(cache => {
          cache.put(ev.request, newRes.clone())
          return newRes
        })
      })
    })
  )
})

self.addEventListener('activate', (ev) => {
  const whiteList = ['v2']
  ev.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (whiteList.indexOf(key) === -1) {
          return caches.delete(key)
        }
      }))
    })
  )
})
