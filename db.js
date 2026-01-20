const { Pool } = require("pg");

const prod = process.env.NODE_ENV === "production";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: prod ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
