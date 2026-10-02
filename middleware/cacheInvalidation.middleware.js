const { clearCache } = require('./cache.middleware');

function invalidateCacheMiddleware(req, res, next) {
  const originalJson = res.json.bind(res);

  res.json = (data) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      clearCache();
      res.set('X-Cache-Invalidated', 'true');
    }

    return originalJson(data);
  };

  next();
}

module.exports = {
  invalidateCacheMiddleware
};
