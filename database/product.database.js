const fs = require('fs');
const path = require('path');

const databasePath = path.join(__dirname, '..', 'db.json');

function readProducts() {
  const rawData = fs.readFileSync(databasePath, 'utf8');

  if (!rawData.trim()) {
    return [];
  }

  return JSON.parse(rawData);
}

function writeProducts(products) {
  fs.writeFileSync(databasePath, JSON.stringify(products, null, 2));
}

function findAll() {
  return readProducts();
}

function findById(id) {
  return readProducts().find((product) => product.id === id);
}

function create(productData) {
  const products = readProducts();
  const nextId = products.length > 0 ? Math.max(...products.map((product) => product.id)) + 1 : 1;
  const product = {
    id: nextId,
    ...productData
  };

  products.push(product);
  writeProducts(products);

  return product;
}

function replace(id, productData) {
  const products = readProducts();
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return null;
  }

  const product = {
    id,
    ...productData
  };

  products[productIndex] = product;
  writeProducts(products);

  return product;
}

function update(id, productData) {
  const products = readProducts();
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return null;
  }

  const product = {
    ...products[productIndex],
    ...productData
  };

  products[productIndex] = product;
  writeProducts(products);

  return product;
}

function remove(id) {
  const products = readProducts();
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return null;
  }

  const [deletedProduct] = products.splice(productIndex, 1);
  writeProducts(products);

  return deletedProduct;
}

module.exports = {
  findAll,
  findById,
  create,
  replace,
  update,
  remove
};
