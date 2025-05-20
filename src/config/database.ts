import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create a SQL template literal tag
export const sql = neon(process.env.DATABASE_URL);

// Test the connection
sql`SELECT version()`
  .then(([result]) => {
    console.log('Successfully connected to Neon DB:', result.version);
  })
  .catch((error: Error) => {
    console.error('Database connection error:', error);
    process.exit(1);
  });

export default sql; 