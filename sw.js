const version = "v7";
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(version).then(function(cache) {
			return cache.addAll([
				'/tahir-tofiq/sw.js',
				'/tahir-tofiq/site/script.js?v5',
				'/tahir-tofiq/site/style.css?v2',
				'/tahir-tofiq/site/image/back.jpg',
				'/tahir-tofiq/site/image/portraits/1.svg',
				'/tahir-tofiq/site/image/portraits/1.jpg',
				'/tahir-tofiq/site/DroidNaskh-Regular.woff2',
			]);
		})
	);
});

self.addEventListener('activate', function(event) {
	var cacheWhitelist = [version];

	event.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (cacheWhitelist.indexOf(key) === -1) {
					return caches.delete(key);
				}
			}));
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(resp) {
			return resp || fetch(event.request).then(function(response) {		
				return response;
			});
		}).catch(function() {
			return caches.match('/tahir-tofiq/index.html');
		})
	);
});
