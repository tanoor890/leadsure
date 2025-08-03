import express from "express";
import { db } from "../../server/db";

const app = express();

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await db.execute('SELECT NOW() as current_time');
    res.json({ 
      message: 'Database connection successful',
      timestamp: result[0]?.current_time,
      env: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set'
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      env: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set'
    });
  }
});

export default app; 