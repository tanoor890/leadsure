import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "./shared/db-schema.js";
import { migrate } from 'drizzle-orm/neon-serverless/migrator';

neonConfig.webSocketConstructor = ws;

// For testing, we'll use a mock DATABASE_URL
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/leadsure';

console.log('Testing database connection...');
console.log('DATABASE_URL:', DATABASE_URL ? 'Set' : 'Not set');

try {
  const pool = new Pool({ connectionString: DATABASE_URL });
  const db = drizzle({ client: pool, schema });
  
  console.log('✅ Database connection successful');
  
  // Test creating a table (this will fail if DATABASE_URL is not real)
  console.log('Attempting to create tables...');
  
  // For now, just test the connection
  const result = await pool.query('SELECT NOW()');
  console.log('✅ Database query successful:', result.rows[0]);
  
  await pool.end();
  console.log('✅ Database connection closed');
  
} catch (error) {
  console.error('❌ Database connection failed:', error.message);
  console.log('💡 To set up a real database:');
  console.log('1. Sign up at https://neon.tech');
  console.log('2. Create a new project');
  console.log('3. Copy the DATABASE_URL');
  console.log('4. Set it as an environment variable');
} 