# Database Setup Instructions

## 1. Create a Neon Database

1. Go to https://neon.tech
2. Sign up for a free account
3. Create a new project
4. Copy the DATABASE_URL from the connection details

## 2. Set Environment Variables

Create a `.env` file in the root directory:

```bash
DATABASE_URL=postgresql://your-username:your-password@your-host/your-database
NODE_ENV=development
```

## 3. Initialize Database Schema

```bash
npm run db:push
```

## 4. Test Database Connection

```bash
node test-db-connection.mjs
```

## 5. Start the Application

```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 6. Test Form Submission

1. Fill out the order form
2. Submit the form
3. Check the database to verify data is stored

## Database Schema

The application uses two main tables:

### Orders Table
- id (serial, primary key)
- fullName (text)
- email (text)
- whatsappNumber (text)
- apolloFilterLink (text)
- numberOfLeads (integer)
- paymentMethod (text)
- additionalRequirements (text, optional)
- totalPrice (integer)
- status (text, default: "pending")
- createdAt (timestamp)

### Trials Table
- id (serial, primary key)
- fullName (text)
- email (text)
- whatsappNumber (text)
- apolloFilterLink (text)
- businessType (text)
- status (text, default: "pending")
- createdAt (timestamp) 