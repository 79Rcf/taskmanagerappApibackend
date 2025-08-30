import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';

const app = express();
const port = process.env.PORT || 5000;

// ----------------- Middleware -----------------
app.use(cors());
app.use(express.json());

// ----------------- Rate Limiting -----------------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter); // apply globally

// ----------------- Routes -----------------
import todoRoutes from './routes/todoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { authMiddleware } from './controllers/authController.js';

app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

/**
 * @swagger
 * /api/protected:
 *   get:
 *     summary: Access protected route
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authorized
 *       401:
 *         description: Unauthorized, invalid or missing token
 */
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You are authorized', userId: req.user.id });
});

// ----------------- Root Route -----------------
app.get('/', (req, res) => res.send('Server is running'));

// ----------------- Swagger Setup -----------------
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API documentation for Task Manager app',
    },
    servers: [{ url: `http://localhost:${port}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'], // your routes with swagger comments
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ----------------- Start Server -----------------
app.listen(port, () => console.log(`Server running on port ${port}`));
