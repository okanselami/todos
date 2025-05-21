# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY drizzle.config.ts ./

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
COPY drizzle.config.ts ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose the port your app runs on
EXPOSE 3000

# Create a startup script
RUN echo '#!/bin/sh\n\
echo "Running database migrations..."\n\
npm run db:generate\n\
npm run db:push\n\
echo "Starting application..."\n\
npm start' > /app/start.sh && chmod +x /app/start.sh

# Start the application with migrations
CMD ["/app/start.sh"] 