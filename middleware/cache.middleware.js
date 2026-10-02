const CACHE_TTL_MS = 60 * 1000;
const cache = new Map();

function createCacheKey(req) {
  return `${req.method}:${req.originalUrl}`;
}

function isExpired(entry) {
  return Date.now() - entry.createdAt > CACHE_TTL_MS;
}

function cacheMiddleware(req, res, next) {
  const cacheKey = createCacheKey(req);
  const cachedEntry = cache.get(cacheKey);

  if (cachedEntry && !isExpired(cachedEntry)) {
    res.set('X-Cache', 'HIT');
    res.set('X-Cache-Created-At', new Date(cachedEntry.createdAt).toISOString());
    return res.status(cachedEntry.statusCode).json(cachedEntry.data);
  }

  if (cachedEntry) {
    cache.delete(cacheKey);
  }

  res.set('X-Cache', 'MISS');

  const originalJson = res.json.bind(res);
  res.json = (data) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache.set(cacheKey, {
        data,
        statusCode: res.statusCode,
        createdAt: Date.now()
      });
    }

    return originalJson(data);
  };

  return next();
}

function clearCache() {
  cache.clear();
}

function getCacheSize() {
  return cache.size;
}

module.exports = {
  cacheMiddleware,
  clearCache,
  getCacheSize
};
