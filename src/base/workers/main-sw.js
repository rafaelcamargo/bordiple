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
      return isGETRequest(evt.request) && handleFetchError(evt.request);
    })
  );
}

function isGETRequest(request){
  return request.method == 'GET';
}

function handleFetchError(request){
  const requestURL = new URL(request.url);
  if(isRequestingHTML(request)) return getHTMLFromCache('/index.html');
  if(ASSETS.includes(requestURL.pathname)) return caches.match(requestURL.pathname, { ignoreVary: true });
  return caches.match(request);
}

function isRequestingHTML({ headers }){
  return headers.get('accept').includes('text/html');
}

function getHTMLFromCache(htmlFilepath){
  return caches.match(htmlFilepath, { ignoreVary: true }).then(cachedResponse => {
    if (cachedResponse) return cachedResponse.text();
  }).then(htmlData => {
    return new Response(htmlData, { headers: { 'Content-Type': 'text/html' } });
  });
}
