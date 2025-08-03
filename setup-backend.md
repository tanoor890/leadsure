# Backend Setup Guide for Vercel Deployment

## 🗄️ Step 1: Create Neon Database

1. **Go to https://neon.tech**
2. **Sign up for a free account**
3. **Create a new project**
4. **Copy the DATABASE_URL** from the connection details

## 🔧 Step 2: Set Up Environment Variables

### For Local Development:
Create a `.env` file in the `server/` directory:
```
DATABASE_URL=postgresql://your-username:your-password@your-host/your-database?sslmode=require
NODE_ENV=development
```

### For Vercel Backend:
1. **Go to your Vercel dashboard**
2. **Create a new project for the backend**
3. **Select your GitHub repository**
4. **Set the root directory to `server`**
5. **Add environment variables:**
   - `DATABASE_URL` = your Neon connection string
   - `NODE_ENV` = `production`

## 🚀 Step 3: Deploy Backend to Vercel

1. **Push your changes to GitHub:**
   ```bash
   git add .
   git commit -m "Setup backend for Vercel deployment"
   git push origin main
   ```

2. **Deploy the backend:**
   - Vercel will automatically deploy from the `server/` directory
   - Your backend will be available at: `https://your-backend-name.vercel.app`

## 📊 Step 4: Initialize Database Schema

After deployment, run the database migration:

```bash
# From the project root
npx drizzle-kit push
```

Or create a migration API endpoint and call it once.

## 🔗 Step 5: Update Frontend API URL

Once your backend is deployed, update the frontend to point to the new backend URL:

1. **Update `client/vite.config.ts`** for production:
   ```typescript
   proxy: {
     '/api': {
       target: 'https://your-backend-name.vercel.app',
       changeOrigin: true,
       secure: true,
     },
   },
   ```

2. **Or update the API calls** in your frontend code to use the full backend URL.

## 🧪 Step 6: Test Your Setup

1. **Test backend health:**
   ```
   https://your-backend-name.vercel.app/api/health
   ```

2. **Test form submissions:**
   - Fill out forms on your frontend
   - Check if data appears in your Neon database

## 📋 Expected Results

- ✅ Backend deployed at `https://your-backend-name.vercel.app`
- ✅ `/api/health` returns success message
- ✅ Form submissions store data in Neon database
- ✅ Frontend can communicate with backend

## 🔧 Troubleshooting

### Issue: "DATABASE_URL not set"
- Make sure you've added the DATABASE_URL environment variable in Vercel
- Check that the URL format is correct

### Issue: "Connection failed"
- Verify your Neon database is active
- Check that the DATABASE_URL is correct
- Ensure your Neon database allows connections from Vercel

### Issue: "Tables don't exist"
- Run the database migration: `npx drizzle-kit push`
- Check that the schema matches your application

## 🎯 Success Checklist

- ✅ Neon database created and connected
- ✅ DATABASE_URL set in Vercel environment variables
- ✅ Backend deployed to Vercel
- ✅ Database schema initialized
- ✅ Forms submitting successfully
- ✅ Data appearing in Neon database
- ✅ Frontend communicating with backend 