import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = process.env.PORT || 5000;

// ----------------- Middleware -----------------
app.use(cors());
app.use(express.json());

// ----------------- Routes -----------------
import todoRoutes from './routes/todoRoutes.js';
app.use('/api/todos', todoRoutes);

import authRoutes from './routes/authRoutes.js';
app.use('/api/auth', authRoutes);

import { authMiddleware } from './controllers/authController.js';

/**
 * @swagger
 * /api/protected:
 * get:
 * summary: Access protected route
 * tags: [Auth]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Authorized
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: You are authorized
 * userId:
 * type: integer
 * 401:
 * description: Unauthorized, invalid or missing token
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
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
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
  // Note the .js extension in the apis array
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ----------------- Start Server -----------------
app.listen(port, () => console.log(`Server running on port ${port}`));