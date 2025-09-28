
This project is a **microservices-based system** consisting of:

- **API Gateway** – forwards requests to services.
- **Product Service** – manages products.
- **Order Service** – manages orders.
- **MongoDB** – database for products and orders.

---

## 🐳 Running the Project with Docker

Start all services:

# Start all services with Docker Compose
docker-compose up --build


# This will start:

MongoDB on port 27017
Product Service on port 4001
Order Service on port 4002
API Gateway on port 3000

# Stop all services
docker-compose down

# Start API Gateway only (for development)
cd gateway
npm install
npm run start:dev

# Start Product Service only
cd product-service
npm install
npm run start:dev

# Start Order Service only
cd order-service
npm install
npm run start:dev


# API Gateway Base URL
http://localhost:3000


# Products APIs
| Method | Endpoint                   | Body / Params               | Description                  |
| ------ | -------------------------- | --------------------------- | ---------------------------- |
| GET    | /products                  | -                           | Get all products             |
| GET    | /products/:id              | id (path)                   | Get product by ID            |
| POST   | /products                  | JSON body                   | Create a new product         |
| POST   | /products/bulk             | JSON array                  | Create multiple products     |
| PUT    | /products/:id              | JSON body                   | Update a product             |
| DELETE | /products/:id              | id (path)                   | Delete a product             |
| DELETE | /products/deleteByIds/:ids | ids (path, comma-separated) | Delete multiple products     |
| GET    | /products/findByIds/:ids   | ids (path, comma-separated) | Get multiple products by IDs |


# Example Product Payload
{
  "name": "Celestial Chocolate",
  "shortName": "CC",
  "description": "Rich chocolate ice cream",
  "variants": [
    { "qty": "100ml", "price": 50, "sellingPrice": 45, "stock": 100 },
    { "qty": "500ml", "price": 220, "sellingPrice": 200, "stock": 50 }
  ]
}


# Orders APIs
| Method | Endpoint                 | Body / Params               | Description                |
| ------ | ------------------------ | --------------------------- | -------------------------- |
| GET    | /orders                  | -                           | Get all orders             |
| GET    | /orders/:id              | id (path)                   | Get order by ID            |
| POST   | /orders                  | JSON body                   | Create a new order         |
| PUT    | /orders/:id              | JSON body                   | Update an order            |
| DELETE | /orders/:id              | id (path)                   | Delete an order            |
| DELETE | /orders/deleteByIds/:ids | ids (path, comma-separated) | Delete multiple orders     |
| GET    | /orders/findByIds/:ids   | ids (path, comma-separated) | Get multiple orders by IDs |


# Example Order Payload
{
  "customerName": "John Doe",
  "phone": "9876543210",
  "address": "123 Main Street",
  "items": [
    {
      "productId": 1,
      "variant": "100ml",
      "quantity": 2,
    },
    {
      "productId": 2,
      "variant": "500ml",
      "quantity": 1,
    }
  ]
}
