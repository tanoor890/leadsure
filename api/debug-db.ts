export default async function handler(req: any, res: any) {
  try {
    // Check environment variables
    const hasDatabaseUrl = !!process.env.DATABASE_URL;
    const databaseUrlLength = process.env.DATABASE_URL?.length || 0;
    const nodeEnv = process.env.NODE_ENV || 'not set';

    // Check if we can access the DATABASE_URL (without exposing the full URL)
    const databaseUrlPreview = process.env.DATABASE_URL
      ? `${process.env.DATABASE_URL.substring(0, 20)}...`
      : 'not set';

    // Test basic environment
    const debugInfo = {
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: nodeEnv,
        hasDatabaseUrl: hasDatabaseUrl,
        databaseUrlLength: databaseUrlLength,
        databaseUrlPreview: databaseUrlPreview
      },
      status: hasDatabaseUrl ? 'ready_to_test' : 'missing_database_url'
    };

    // If DATABASE_URL is not set, return debug info
    if (!hasDatabaseUrl) {
      return res.status(500).json({
        error: 'DATABASE_URL not configured',
        debug: debugInfo,
        instructions: [
          '1. Go to your Vercel dashboard',
          '2. Select your leadsure project',
          '3. Go to Settings → Environment Variables',
          '4. Add DATABASE_URL with your Neon database URL',
          '5. Redeploy your application'
        ]
      });
    }

    // If DATABASE_URL is set, try to connect
    try {
      const { Pool } = await import('@neondatabase/serverless');
      const pool = new Pool({ connectionString: process.env.DATABASE_URL });

      // Test connection
      const result = await pool.query('SELECT NOW() as current_time, version() as db_version');
      await pool.end();

      return res.status(200).json({
        success: true,
        message: 'Database connection successful',
        debug: debugInfo,
        database: {
          timestamp: result.rows[0].current_time,
          version: result.rows[0].db_version
        }
      });
    } catch (dbError) {
      return res.status(500).json({
        error: 'Database connection failed',
        debug: debugInfo,
        databaseError: dbError instanceof Error ? dbError.message : 'Unknown database error',
        instructions: [
          '1. Check your Neon database is active',
          '2. Verify the DATABASE_URL format is correct',
          '3. Ensure your Neon database allows connections from Vercel'
        ]
      });
    }

  } catch (error) {
    console.error('Debug API error:', error);
    return res.status(500).json({
      error: 'Debug API failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
} 