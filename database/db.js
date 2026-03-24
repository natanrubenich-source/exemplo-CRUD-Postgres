import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  port: 5433,
  database: "Clinica",
  user: "natanRubenich",
  password: "123321",
});

export default pool;
