const CACHE = "finconcrol-app-cache";

const FALLBACK_PAGE = "offline.html";

self.addEventListener("install", function (event) {
	// esperamos a que termine de abrir el cache y guardar los archivos
	event.waitUntil(
		caches.open(CACHE).then(function (cache) {
				return cache.add(FALLBACK_PAGE);
			})
		);
});


self.addEventListener("fetch", function (event) {
	// Si no es GET puede ser POST|DELETE|PUT|PATCH
	if (event.request.method !== "GET") return;

	event.respondWith(
		fetch(event.request)
			.then(function (response) {
				// If request was success, add or update it in the cache
				event.waitUntil(updateCache(event.request, response.clone()));

				return response;
			})
			.catch(function (error) {
				return fromCache(event.request);
			})
	);
});

function fromCache(request) {
	// Check to see if you have it in the cache
	// Return response
	// If not in the cache, then return the offline page
	return caches.open(CACHE).then(function (cache) {
		return cache.match(request).then(function (matching) {
			if (!matching || matching.status === 404) {
				// The following validates that the request was for a navigation to a new document
				if (request.destination !== "document" || request.mode !== "navigate") {
					return Promise.reject("no-match");
				}

				return cache.match(offlineFallbackPage);
			}

			return matching;
		});
	});
}

function updateCache(request, response) {
	return caches.open(CACHE).then(function (cache) {
		return cache.put(request, response);
	});
}













