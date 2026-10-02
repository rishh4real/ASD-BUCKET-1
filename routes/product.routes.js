const express = require('express');
const productController = require('../controllers/product.controller');
const { cacheMiddleware } = require('../middleware/cache.middleware');
const { invalidateCacheMiddleware } = require('../middleware/cacheInvalidation.middleware');

const router = express.Router();

router.get('/', cacheMiddleware, productController.getProducts);
router.get('/:id', cacheMiddleware, productController.getProductById);
router.post('/', invalidateCacheMiddleware, productController.createProduct);
router.put('/:id', invalidateCacheMiddleware, productController.replaceProduct);
router.patch('/:id', invalidateCacheMiddleware, productController.updateProduct);
router.delete('/:id', invalidateCacheMiddleware, productController.deleteProduct);

module.exports = router;
