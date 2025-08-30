// authRoutes.js
import express from "express";
const router = express.Router();

import { register, login } from "../controllers/authController.js"; 
import { registerSchema, loginSchema, validate } from "../validators/authValidator.js"; 

// Register route with validation
router.post("/register", validate(registerSchema), register);

// Login route with validation
router.post("/login", validate(loginSchema), login);

export default router;
