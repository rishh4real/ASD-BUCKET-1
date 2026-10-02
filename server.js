const express = require('express');
const productRoutes = require('./routes/product.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Caching workshop API',
    endpoints: [
      'GET /products',
      'GET /products/:id',
      'POST /products',
      'PUT /products/:id',
      'PATCH /products/:id',
      'DELETE /products/:id'
    ]
  });
});

app.use('/products', productRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal server error'
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
