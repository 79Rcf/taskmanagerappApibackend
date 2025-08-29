import pool from '../db/pool.js'; // Note the .js file extension

let lastTodos = [];

const fetchTodos = async () => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
    const todos = result.rows;

    // Compare with last fetched todos
    if (JSON.stringify(todos) !== JSON.stringify(lastTodos)) {
      console.clear();
      console.log('📋 Current Todos:');
      todos.forEach(todo => {
        console.log(`ID: ${todo.id}, Text: ${todo.text}, Completed: ${todo.completed}`);
      });
      lastTodos = todos;
    }
  } catch (err) {
    console.error('Error fetching todos:', err.message);
  }
};

// Fetch every 2 seconds
setInterval(fetchTodos, 2000);