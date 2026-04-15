# Leadsure

A full-stack lead generation platform that delivers fresh, targeted Apollo data to customers. Built with React, Node.js, TypeScript, and PostgreSQL.

## What It Does

Leadsure is a production-ready web application where businesses can order targeted B2B leads scraped from Apollo using custom filters. It handles order management, free trial requests, payment coordination, and customer communication all in one platform.

## Features

- Lead order system with dynamic pricing calculator (from $5 per 1000 leads)
- Free trial system offering 100 leads to new customers
- Real-time order tracking and status management
- Multiple payment methods: Wise, Binance, Bank Transfer
- WhatsApp integration for direct customer support
- Mobile-first responsive design optimized for conversions
- GDPR-compliant privacy policy

## Tech Stack

**Frontend**
`React 18` `TypeScript` `Tailwind CSS` `shadcn/ui` `TanStack Query` `Framer Motion` `Vite`

**Backend**
`Node.js` `Express.js` `TypeScript` `Drizzle ORM`

**Database**
`PostgreSQL` `Neon Database`

**Deployment**
`Vercel` `Railway` `Render`

## Getting Started

1. Clone the repo
```bash
git clone https://github.com/tanoor890/leadsure.git
cd leadsure
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Add your DATABASE_URL to .env
```

4. Initialize the database
```bash
npm run db:push
```

5. Start the development server
```bash
npm run dev
```

App runs at `http://localhost:5000`

## Project Structure

```
leadsure/
├── client/          # React frontend
├── server/          # Express.js backend API
├── shared/          # Shared TypeScript types and schema
├── drizzle.config.ts
├── vercel.json
└── package.json
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NODE_ENV` | Yes | `development` or `production` |

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:push` | Push database schema |

## Author

**Fazla Saim Tanoor**
AI Engineer | [LinkedIn](https://www.linkedin.com/in/fazla-saim-tanoor-2560ba382/)
