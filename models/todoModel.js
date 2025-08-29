import pool from '../db/pool.js'; // Note the .js file extension

// Get all todos for a specific user
const getAllTodosByUser = async (userId) => {
  const res = await pool.query(
    'SELECT * FROM todos WHERE user_id=$1 ORDER BY created_at DESC',
    [userId]
  );
  return res.rows;
};

// Create a new todo for a specific user
const createTodoForUser = async (text, userId) => {
  const res = await pool.query(
    'INSERT INTO todos (text, user_id) VALUES ($1, $2) RETURNING *',
    [text, userId]
  );
  return res.rows[0];
};

// Update a todo (only if it belongs to the user)
const updateTodoByUser = async (id, text, userId) => {
  const res = await pool.query(
    'UPDATE todos SET text=$1, updated_at=NOW() WHERE id=$2 AND user_id=$3 RETURNING *',
    [text, id, userId]
  );
  return res.rows[0];
};

// Mark a todo as completed (only if it belongs to the user)
const markTodoCompletedByUser = async (id, userId) => {
  const res = await pool.query(
    'UPDATE todos SET completed=true, updated_at=NOW() WHERE id=$1 AND user_id=$2 RETURNING *',
    [id, userId]
  );
  return res.rows[0];
};

// Delete a todo (only if it belongs to the user)
const deleteTodoByUser = async (id, userId) => {
  const res = await pool.query(
    'DELETE FROM todos WHERE id=$1 AND user_id=$2 RETURNING *',
    [id, userId]
  );
  return res.rows[0];
};

const Todo =  {
  getAllTodosByUser,
  createTodoForUser,
  updateTodoByUser,
  markTodoCompletedByUser,
  deleteTodoByUser
};

export default Todo;