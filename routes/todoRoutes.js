import express from 'express';
const router = express.Router();
import * as todoController from '../controllers/todoController.js';
import { authMiddleware } from '../controllers/authController.js';

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management endpoints
 */

// Protect all routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos for the logged-in user
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   text:
 *                     type: string
 *                   completed:
 *                     type: boolean
 *                   user_id:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 */

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Add a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: Buy groceries
 *     responses:
 *       201:
 *         description: Todo created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 text:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *                 user_id:
 *                   type: integer
 *                 created_at:
 *                   type: string
 *                 updated_at:
 *                   type: string
 */

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo's text
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: Buy milk and bread
 *     responses:
 *       200:
 *         description: Todo updated
 */

/**
 * @swagger
 * /api/todos/{id}/complete:
 *   patch:
 *     summary: Mark a todo as completed
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo marked as completed
 */

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo deleted
 */

router.get('/', todoController.getTodos);
router.post('/', todoController.addTodo);
router.put('/:id', todoController.editTodo);
router.patch('/:id/complete', todoController.markCompleted);
router.delete('/:id', todoController.removeTodo);

export default router;
