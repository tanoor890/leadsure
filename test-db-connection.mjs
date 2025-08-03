import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Configure WebSocket for Neon
neonConfig.webSocketConstructor = ws;

const DATABASE_URL = 'postgresql://neondb_owner:npg_vwk9exJBp5jo@ep-restless-mode-aect6lsm-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function testConnection() {
  try {
    console.log('🔌 Testing database connection...');
    
    const pool = new Pool({ connectionString: DATABASE_URL });
    const db = drizzle(pool);
    
    // Test basic query
    const result = await db.execute('SELECT NOW() as current_time, version() as db_version');
    console.log('✅ Database connection successful!');
    console.log('📅 Current time:', result[0].current_time);
    console.log('🗄️ Database version:', result[0].db_version);
    
    // Test if tables exist
    const tables = await db.execute(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('orders', 'trials')
    `);
    
    console.log('📋 Available tables:', tables.map(t => t.table_name));
    
    await pool.end();
    console.log('✅ Database test completed successfully!');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

testConnection(); 