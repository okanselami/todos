import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import todoRoutes from './routes/todo.routes';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3002;
const apiPrefix = process.env.API_PREFIX || '/api/v1';

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'exp://localhost:19000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
  maxAge: 24 * 60 * 60 // 24 hours
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo Service API',
      version: '1.0.0',
      description: 'A microservice for managing todos',
    },
    servers: [
      {
        url: `http://localhost:${port}${apiPrefix}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use(`${apiPrefix}/todos`, todoRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'todo-service' });
});

// Start server
app.listen(port, () => {
  console.log(`Todo service running on port ${port}`);
  console.log(`API Documentation available at http://localhost:${port}/api-docs`);
}); 