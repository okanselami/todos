# Stage 1: Build the TypeScript code
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only package files first (to leverage Docker cache)
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Run the app with only production dependencies
FROM node:18-alpine

WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built code from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env.production ./.env.production

# If your app loads the env file manually:
# require('dotenv').config({ path: '.env.production' });

# If your app expects process.env vars, set them explicitly or use `--env-file` at runtime

# Expose the port (adjust if needed)
EXPOSE 3000

# Start the app (uses NODE_ENV=production already)
CMD ["node", "dist/index.js"]
