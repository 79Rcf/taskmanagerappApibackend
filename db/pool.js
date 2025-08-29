import pg from 'pg';
const { Pool } = pg;
import 'dotenv/config';

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('DB connection error:', err);
  else console.log('PostgreSQL connected at', res.rows[0].now);
});

export default pool;