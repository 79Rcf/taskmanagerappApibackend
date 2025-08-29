import Todo from '../models/todoModel.js'; // Note the .js file extension

// Get all todos for the logged-in user
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.getAllTodosByUser(req.user.id);
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new todo for the logged-in user
const addTodo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Todo text is required' });

    const newTodo = await Todo.createTodoForUser(text, req.user.id);
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a todo (text only)
const editTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Todo text is required' });

    const updatedTodo = await Todo.updateTodoByUser(id, text, req.user.id);

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found or not yours' });
    }

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark a todo as completed
const markCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.markTodoCompletedByUser(id, req.user.id);

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found or not yours' });
    }

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a todo
const removeTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.deleteTodoByUser(id, req.user.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Todo not found or not yours' });
    }

    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getTodos, addTodo, editTodo, markCompleted, removeTodo };