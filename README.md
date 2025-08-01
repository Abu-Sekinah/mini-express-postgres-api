# Express PostgreSQL API

## Description
This project is a mini REST API built with Express.js and PostgreSQL. It demonstrates basic CRUD operations for a "users" table.

## Setup Instructions

### 1. Install PostgreSQL and create the database:

```sql
CREATE DATABASE your_database;

\c your_database

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  age INTEGER
);
```

### 2. Clone the project and install dependencies

```bash
npm install
```

### 3. Configure `.env` file

```env
PGHOST=localhost
PGUSER=postgres
PGDATABASE=your_database
PGPASSWORD=your_password
PGPORT=5432
PORT=3000
```

### 4. Run the server

```bash
npm start
```

## API Endpoints

- GET `/users` – Fetch all users
- GET `/users/:id` – Fetch a user by ID
- POST `/users` – Create a new user
- PUT `/users/:id` – Update an existing user
- DELETE `/users/:id` – Remove a user

## Sample POST Body

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "age": 30
}
```

## Testing

Use Postman or similar API clients to test all endpoints.
