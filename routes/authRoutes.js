import express from 'express';
const router = express.Router();
import { register, login } from '../controllers/authController.js'; // Note the .js file extension

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

export default router;