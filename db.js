const { Pool } = require("pg");

const pool = new Pool({
  user: "jzucca",
  host: "localhost",
  database: "todos_db",
  port: 5432,
});

module.exports = pool;
