import express from 'express';
import { db } from './server/db.js';
import { trials } from './shared/db-schema.js';
import 'dotenv/config';

const app = express();
app.use(express.json());

// Test database connection
app.get('/api/test', async (req, res) => {
  try {
    const result = await db.execute('SELECT NOW() as current_time');
    res.json({
      success: true,
      message: 'Database connection successful',
      timestamp: result[0]?.current_time,
      env: process.env.NODE_ENV,
      hasDatabaseUrl: !!process.env.DATABASE_URL
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Test trial insertion
app.post('/api/test-trial', async (req, res) => {
  try {
    const testTrial = {
      fullName: "Test User",
      email: "test@example.com",
      whatsappNumber: "+1234567890",
      apolloFilterLink: "https://example.com",
      businessType: "Test Business"
    };
    
    const [insertedTrial] = await db
      .insert(trials)
      .values(testTrial)
      .returning();
    
    res.json({
      success: true,
      message: 'Test trial inserted successfully',
      trial: insertedTrial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to insert test trial',
      error: error.message
    });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Test server running on http://localhost:${port}`);
}); 