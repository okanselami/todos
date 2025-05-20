import { db } from './index';
import { todos } from './schema';
import { sql } from 'drizzle-orm';

async function dropTable() {
  try {
    // Drop the todos table
    await db.execute(sql`DROP TABLE IF EXISTS todos CASCADE`);
    console.log('Successfully dropped todos table');
    process.exit(0);
  } catch (error) {
    console.error('Error dropping table:', error);
    process.exit(1);
  }
}

dropTable(); 