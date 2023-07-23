const CACHE_PREFIX = 'bordiple-cache';
const CACHE_KEY = `${CACHE_PREFIX}-{version}`;
const ASSETS = [];

self.addEventListener('install', cacheFreshAssets);
self.addEventListener('activate', flushStaleAssets);
self.addEventListener('fetch', handleFetch);

function cacheFreshAssets(evt){
  evt.waitUntil(caches.open(CACHE_KEY).then(cache => cache.addAll(ASSETS)));
}

function flushStaleAssets(evt){
  evt.waitUntil(
    caches.keys().then(cacheKeys => {
      return Promise.all(cacheKeys.reduce((result, key) => {
        return key.startsWith(CACHE_PREFIX) && key !== CACHE_KEY ? [...result, caches.delete(key)] : result;
      }, []));
    })
  );
}

function handleFetch(evt){
  evt.respondWith(
    fetch(evt.request).catch(() => {
      const requestURL = new URL(evt.request.url);
      if(isRequestingHTML(evt.request)) return caches.match(buildHTMLCacheKey(requestURL.pathname));
      if(ASSETS.includes(requestURL.pathname)) return caches.match(requestURL.pathname);
      return caches.match(evt.request);
    })
  );
}

function isRequestingHTML({ headers }){
  return headers.get('accept').includes('text/html');
}

function buildHTMLCacheKey(pathname){
  return [pathname, 'index.html'].join('/').replace(/\/\//g, '/');
}
