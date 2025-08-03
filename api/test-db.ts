import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  try {
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({
        error: 'DATABASE_URL not set',
        message: 'Please set DATABASE_URL environment variable in Vercel'
      });
    }

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    // Test connection
    const result = await pool.query('SELECT NOW() as current_time');
    await pool.end();

    res.status(200).json({
      message: 'Database connection successful',
      timestamp: result.rows[0].current_time,
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set'
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Database connection failed. Check your DATABASE_URL.'
    });
  }
} 