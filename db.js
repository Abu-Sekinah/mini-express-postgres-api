const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool();

pool.connect()
  .then(() => console.log('Connected to PostgreSQL successfully'))
  .catch((err) => console.error('Database connection error:', err));

module.exports = pool;
