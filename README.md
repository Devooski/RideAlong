# RideAlong Backend

Production-ready Node.js/Express backend for the RideAlong web app.

## Includes
- Express API
- Socket.IO real-time matching
- PostgreSQL + PostGIS schema
- JWT authentication
- Stripe payment intent endpoint
- Error scan report

## Setup
```bash
npm install
cp .env.example .env
npm run dev
```

Run `db/schema.sql` in Supabase or PostgreSQL before using matching.

## API
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- POST /api/trips
- GET /api/trips/mine
- PATCH /api/trips/:id/cancel
- POST /api/matching/passenger-search
- POST /api/matching/driver-search
- POST /api/matching/accept
- POST /api/payments/intent

## Deploy
Use Render or Railway for backend, Supabase for PostgreSQL/PostGIS, and Vercel for frontend.
