import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import { Pool } from '@neondatabase/serverless';
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'DATABASE_URL not set' });
    }

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool);
    
    // Run migrations
    await migrate(db, { migrationsFolder: './migrations' });
    await pool.end();
    
    res.status(200).json({ message: 'Database migrated successfully' });
  } catch (error) {
    console.error('Migration error:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
} 