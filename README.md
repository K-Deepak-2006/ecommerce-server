# Ecommerce API (minimal)

Basic Express server providing CRUD for users, products and orders.

Quick start

1. Install dependencies

```bash
cd ecommerce
npm install
```

2. Start server

```bash
npm start
# or for development with nodemon (install nodemon globally or as devDep)
npm run dev
```

API endpoints (base `/api`)

- `GET /api/users` — list users
- `POST /api/users` — create user { name, email }
- `GET /api/users/:id` — get user
- `PUT /api/users/:id` — update user
- `DELETE /api/users/:id` — delete user

- `GET /api/products` — list products
- `POST /api/products` — create product { name, price, description }
- `GET /api/products/:id` — get product
- `PUT /api/products/:id` — update product
- `DELETE /api/products/:id` — delete product

- `GET /api/orders` — list orders
- `POST /api/orders` — create order { userId, items: [{ productId, quantity }] }
- `GET /api/orders/:id` — get order
- `DELETE /api/orders/:id` — delete order

# Users

curl.exe -s -X POST -H "Content-Type: application/json" -d "{\"name\":\"Alice\",\"email\":\"alice@example.com\"}" http://localhost:3000/api/users
curl -s http://localhost:3000/api/users
curl -s http://localhost:3000/api/users/1
curl.exe -s -X PUT -H "Content-Type: application/json" -d "{\"name\":\"Alice A.\"}" http://localhost:3000/api/users/1
curl -s -X DELETE http://localhost:3000/api/users/1

# Products

curl.exe -s -X POST -H "Content-Type: application/json" -d "{\"name\":\"T-Shirt\",\"price\":19.99,\"description\":\"Blue tee\"}" http://localhost:3000/api/products
curl -s http://localhost:3000/api/products
curl -s http://localhost:3000/api/products/1
curl.exe -s -X PUT -H "Content-Type: application/json" -d "{\"price\":17.5}" http://localhost:3000/api/products/1
curl -s -X DELETE http://localhost:3000/api/products/1

# Orders (assumes userId=1 and productId=1 exist)

curl.exe -s -X POST -H "Content-Type: application/json" -d "{\"userId\":1,\"items\":[{\"productId\":1,\"quantity\":2}]}" http://localhost:3000/api/orders
curl -s http://localhost:3000/api/orders
curl -s http://localhost:3000/api/orders/1
curl -s -X DELETE http://localhost:3000/api/orders/1
"# ecommerce-server" 
