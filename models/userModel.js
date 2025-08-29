import pool from '../db/pool.js'; // Note the .js file extension

const User = {
    async createUser(username, email, hashedPassword) {
      const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, hashedPassword]
      );
      return result.rows[0];
    },
  
    async findByEmail(email) {
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      return result.rows[0];
    },
  
    async findById(id) {
      const result = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
      );
      return result.rows[0];
    }
  };
  
export default User;