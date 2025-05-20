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
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000', 'exp://localhost:19000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
  maxAge: 24 * 60 * 60 // 24 hours
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for Swagger UI
}));
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo Service API',
      version: '1.0.0',
      description: 'A microservice for managing todos',
      contact: {
        name: 'API Support',
        url: baseUrl
      }
    },
    servers: [
      {
        url: `${baseUrl}${apiPrefix}`,
        description: 'API Server'
      }
    ],
    components: {
      schemas: {
        Todo: {
          type: 'object',
          required: ['title'],
          properties: {
            id: {
              type: 'integer',
              description: 'The todo ID'
            },
            title: {
              type: 'string',
              description: 'The todo title'
            },
            description: {
              type: 'string',
              description: 'The todo description'
            },
            completed: {
              type: 'boolean',
              description: 'The todo completion status'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The last update timestamp'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Todo Service API Documentation",
  customfavIcon: "/favicon.ico"
}));

// Routes
app.use(`${apiPrefix}/todos`, todoRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'todo-service',
    docs: `${baseUrl}/docs`
  });
});

// Start server
app.listen(port, () => {
  console.log(`Todo service running on port ${port}`);
  console.log(`API Documentation available at ${baseUrl}/docs`);
}); 