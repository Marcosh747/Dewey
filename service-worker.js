const HOSTNAME_WHITELIST = [
    self.location.hostname,
    'fonts.gstatic.com',
    'fonts.googleapis.com',
    'cdn.jsdelivr.net'
]

// Função utilitária para modificar URLs das requisições interceptadas
const getFixedUrl = (req) => {
    var now = Date.now()
    var url = new URL(req.url)

    url.protocol = self.location.protocol

    if (url.hostname === self.location.hostname) {
        url.search += (url.search ? '&' : '?') + 'cache-bust=' + now
    }
    return url.href
}

/**
 *  @Lifecycle Activate
 *  Novo ativado quando o antigo não está mais sendo usado.
 *
 *  waitUntil(): ativando ====> ativado
 */
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim())
})

/**
 * @Functional Fetch
 * 
 */
self.addEventListener('fetch', event => {
    // Ignora algumas das requisições de origem cruzada, como aquelas para o Google Analytics.
    if (HOSTNAME_WHITELIST.indexOf(new URL(event.request.url).hostname) > -1) {
       
        const cached = caches.match(event.request)
        const fixedUrl = getFixedUrl(event.request)
        const fetched = fetch(fixedUrl, { cache: 'no-store' })
        const fetchedCopy = fetched.then(resp => resp.clone())

        event.respondWith(
            Promise.race([fetched.catch(_ => cached), cached])
            .then(resp => resp || fetched)
            .catch(_ => { /* ignora quaisquer erros */ })
        )

        event.waitUntil(
            Promise.all([fetchedCopy, caches.open("pwa-cache")])
            .then(([response, cache]) => response.ok && cache.put(event.request, response))
            .catch(_ => { /* ignora quaisquer erros */ })
        )
    }
})
