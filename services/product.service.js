const productDatabase = require('../database/product.database');

function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function normalizeId(id) {
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw createHttpError(400, 'Product id must be a positive integer');
  }

  return numericId;
}

function validateProductPayload(product, { partial = false } = {}) {
  if (!product || typeof product !== 'object' || Array.isArray(product)) {
    throw createHttpError(400, 'Request body must be a product object');
  }

  const allowedFields = ['name', 'price', 'category'];
  const invalidFields = Object.keys(product).filter((field) => !allowedFields.includes(field));

  if (invalidFields.length > 0) {
    throw createHttpError(400, `Invalid field(s): ${invalidFields.join(', ')}`);
  }

  if (!partial || Object.prototype.hasOwnProperty.call(product, 'name')) {
    if (typeof product.name !== 'string' || product.name.trim().length === 0) {
      throw createHttpError(400, 'Product name is required');
    }
  }

  if (!partial || Object.prototype.hasOwnProperty.call(product, 'price')) {
    if (typeof product.price !== 'number' || product.price < 0) {
      throw createHttpError(400, 'Product price must be a non-negative number');
    }
  }

  if (Object.prototype.hasOwnProperty.call(product, 'category')) {
    if (typeof product.category !== 'string' || product.category.trim().length === 0) {
      throw createHttpError(400, 'Product category must be a non-empty string');
    }
  }
}

function getAllProducts() {
  return productDatabase.findAll();
}

function getProductById(id) {
  const numericId = normalizeId(id);
  const product = productDatabase.findById(numericId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  return product;
}

function createProduct(productData) {
  validateProductPayload(productData);

  return productDatabase.create({
    name: productData.name.trim(),
    price: productData.price,
    category: productData.category ? productData.category.trim() : 'General'
  });
}

function replaceProduct(id, productData) {
  const numericId = normalizeId(id);
  validateProductPayload(productData);

  const updatedProduct = productDatabase.replace(numericId, {
    name: productData.name.trim(),
    price: productData.price,
    category: productData.category ? productData.category.trim() : 'General'
  });

  if (!updatedProduct) {
    throw createHttpError(404, 'Product not found');
  }

  return updatedProduct;
}

function updateProduct(id, productData) {
  const numericId = normalizeId(id);
  validateProductPayload(productData, { partial: true });

  const changes = {};

  if (Object.prototype.hasOwnProperty.call(productData, 'name')) {
    changes.name = productData.name.trim();
  }

  if (Object.prototype.hasOwnProperty.call(productData, 'price')) {
    changes.price = productData.price;
  }

  if (Object.prototype.hasOwnProperty.call(productData, 'category')) {
    changes.category = productData.category.trim();
  }

  const updatedProduct = productDatabase.update(numericId, changes);

  if (!updatedProduct) {
    throw createHttpError(404, 'Product not found');
  }

  return updatedProduct;
}

function deleteProduct(id) {
  const numericId = normalizeId(id);
  const deletedProduct = productDatabase.remove(numericId);

  if (!deletedProduct) {
    throw createHttpError(404, 'Product not found');
  }

  return deletedProduct;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct
};
