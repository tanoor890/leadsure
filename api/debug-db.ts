import express from "express";

const app = express();

app.get("/api/debug-db", async (req, res) => {
  try {
    // Check environment variables
    const hasDatabaseUrl = !!process.env.DATABASE_URL;
    const nodeEnv = process.env.NODE_ENV;
    
    // Try to import and test database
    let dbTest = null;
    let dbError = null;
    
    try {
      const { db } = await import('../../server/db');
      const result = await db.execute('SELECT NOW() as current_time, version() as pg_version');
      dbTest = {
        success: true,
        timestamp: result[0]?.current_time,
        pgVersion: result[0]?.pg_version
      };
    } catch (error) {
      dbError = error instanceof Error ? error.message : 'Unknown error';
    }
    
    res.json({
      environment: {
        nodeEnv,
        hasDatabaseUrl,
        databaseUrlLength: process.env.DATABASE_URL?.length || 0
      },
      database: {
        test: dbTest,
        error: dbError
      },
      message: dbTest ? 'Database connection successful!' : 'Database connection failed!'
    });
    
  } catch (error) {
    console.error('Debug endpoint error:', error);
    res.status(500).json({ 
      message: 'Debug endpoint failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default app; 