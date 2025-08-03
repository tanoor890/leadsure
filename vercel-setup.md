# Vercel Deployment with Neon Database Setup

## 🗄️ Step 1: Create Neon Database

1. **Go to https://neon.tech**
2. **Sign up for a free account**
3. **Create a new project**
4. **Copy the DATABASE_URL** from the connection details

## 🔧 Step 2: Set Up Environment Variables in Vercel

1. **Go to your Vercel dashboard**
2. **Select your leadsure project**
3. **Go to Settings → Environment Variables**
4. **Add these variables:**

```
DATABASE_URL=postgresql://your-username:your-password@your-host/your-database
NODE_ENV=production
```

## 🚀 Step 3: Deploy to Vercel

1. **Push your latest changes to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment with Neon database"
   git push origin main
   ```

2. **Vercel will automatically deploy from your GitHub repository**

## 📊 Step 4: Initialize Database Schema

After deployment, you need to run the database migration:

1. **Go to your Vercel project dashboard**
2. **Go to Functions → API Routes**
3. **Create a temporary API route to run migrations:**

Create a file: `api/migrate.ts`
```typescript
import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import { Pool } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool);
    
    await migrate(db, { migrationsFolder: './migrations' });
    await pool.end();
    
    res.status(200).json({ message: 'Database migrated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

4. **Call this endpoint once to initialize your database:**
   ```bash
   curl -X POST https://your-vercel-app.vercel.app/api/migrate
   ```

## 🔍 Step 5: Test Your Deployment

1. **Visit your Vercel app URL**
2. **Fill out the trial form**
3. **Check your Neon database to verify data is stored**

## 🛠️ Alternative: Manual Database Setup

If you prefer to set up the database manually:

1. **Connect to your Neon database**
2. **Run these SQL commands:**

```sql
-- Create orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  apollo_filter_link TEXT NOT NULL,
  number_of_leads INTEGER NOT NULL,
  payment_method TEXT NOT NULL,
  additional_requirements TEXT,
  total_price INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create trials table
CREATE TABLE trials (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  apollo_filter_link TEXT NOT NULL,
  business_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Troubleshooting

### Issue: "DATABASE_URL not set"
- Make sure you've added the DATABASE_URL environment variable in Vercel
- Check that the URL format is correct: `postgresql://user:pass@host/db`

### Issue: "Connection failed"
- Verify your Neon database is active
- Check that the DATABASE_URL is correct
- Ensure your Neon database allows connections from Vercel

### Issue: "Tables don't exist"
- Run the database migration or create tables manually
- Check that the schema matches your application

## 📈 Monitoring

1. **Check Vercel logs** for any errors
2. **Monitor Neon database** for connection issues
3. **Test form submissions** regularly

## 🎯 Success Checklist

- ✅ Neon database created and connected
- ✅ DATABASE_URL set in Vercel environment variables
- ✅ Database schema initialized
- ✅ Forms submitting successfully
- ✅ Data appearing in Neon database
- ✅ Application deployed and accessible

Your application will now store data in the real Neon database instead of the mock server! 