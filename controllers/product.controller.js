const productService = require('../services/product.service');

function getProducts(req, res, next) {
  try {
    const products = productService.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
}

function getProductById(req, res, next) {
  try {
    const product = productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
}

function createProduct(req, res, next) {
  try {
    const product = productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

function replaceProduct(req, res, next) {
  try {
    const product = productService.replaceProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
}

function updateProduct(req, res, next) {
  try {
    const product = productService.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
}

function deleteProduct(req, res, next) {
  try {
    const deletedProduct = productService.deleteProduct(req.params.id);
    res.json({
      message: 'Product deleted successfully',
      product: deletedProduct
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct
};
