# Express.js + PostgreSQL API

## Features
- CRUD operations for users
- PostgreSQL database connection
- Basic error handling

## Setup Instructions

1. Clone the repo
2. Create `.env` file:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_DATABASE=express_api
```

3. Install dependencies:
```
npm install
```

4. Create PostgreSQL database and table:
```sql
CREATE DATABASE express_api;
\c express_api
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  age INTEGER
);
```

5. Start the server:
```
node server.js
```

6. Test API with Postman or curl:
- GET /users
- GET /users/:id
- POST /users
- PUT /users/:id
- DELETE /users/:id
