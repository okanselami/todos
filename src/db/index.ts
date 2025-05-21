import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)
});

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create postgres client
const client = postgres(process.env.DATABASE_URL);

// Create drizzle instance
export const db = drizzle(client, { schema });

// Test the connection
client`SELECT version()`
  .then(([result]) => {
    console.log('Successfully connected to Neon DB:', result.version);
  })
  .catch((error: Error) => {
    console.error('Database connection error:', error);
    process.exit(1);
  }); 