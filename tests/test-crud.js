import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/todos';

const testCRUD = async () => {
  try {
    // Note: The original code does not include an Authorization header,
    // which is needed for your protected routes. You would need to add a valid JWT token here.
    // Example:
    // const token = 'your_valid_jwt_token_here';
    // const headers = { Authorization: `Bearer ${token}` };

    // Create a new todo
    const newTodo = await axios.post(BASE_URL, { text: 'Test todo' });
    console.log('POST:', newTodo.data);

    const todoId = newTodo.data.id;

    // Update the todo
    const updatedTodo = await axios.put(`${BASE_URL}/${todoId}`, {
      text: 'Updated test todo',
    });
    console.log('PUT:', updatedTodo.data);

    // Get all todos
    const allTodos = await axios.get(BASE_URL);
    console.log('GET:', allTodos.data);

    // Delete the todo
    await axios.delete(`${BASE_URL}/${todoId}`);
    console.log('DELETE: Todo deleted');

    // Get all todos after deletion
    const finalTodos = await axios.get(BASE_URL);
    console.log('GET after DELETE:', finalTodos.data);
  } catch (err) {
    console.error('Error during CRUD test:', err.response?.data || err.message);
  }
};

testCRUD();