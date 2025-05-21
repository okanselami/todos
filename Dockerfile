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

# Set default environment variables
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
