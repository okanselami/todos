# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist
# Copy source files needed for Swagger documentation
COPY --from=builder /app/src ./src
# Copy drizzle config
COPY --from=builder /app/drizzle.config.ts ./

# Set default environment variables
ENV NODE_ENV=production

# Accept build arguments for database configuration
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Run database migrations
RUN echo "DATABASE_URL=$DATABASE_URL" > .env.production && \
    npx drizzle-kit generate:pg --config=drizzle.config.ts && \
    npx drizzle-kit push:pg --config=drizzle.config.ts

# Start the application
CMD ["npm", "start"]
