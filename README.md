# ASD-BUCKET-1

Express application for the caching workshop assignment.

## Features

- Layered structure: `routes -> middleware -> controllers -> services -> database`
- Product endpoints:
  - `GET /products`
  - `GET /products/:id`
  - `POST /products`
  - `PUT /products/:id`
  - `PATCH /products/:id`
  - `DELETE /products/:id`
- GET response caching with:
  - `X-Cache: MISS` on fresh database reads
  - `X-Cache: HIT` on cached responses
  - `X-Cache-Created-At` timestamp for cached entries
- Cache invalidation after successful `POST`, `PUT`, `PATCH`, or `DELETE`
- One-minute TTL for cached data

## Run Locally

```bash
npm install
npm start
```

The API runs at:

```text
http://localhost:3000
```

## Development

```bash
npm run dev
```

## Example Requests

```bash
curl -i http://localhost:3000/products
curl -i http://localhost:3000/products
```

The first request returns `X-Cache: MISS`; the second request returns `X-Cache: HIT`.

```bash
curl -i -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Water Bottle","price":299,"category":"Accessories"}'
```

After a successful write request, cached GET data is cleared.
