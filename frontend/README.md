# Guessing Game Frontend

Next.js client for the live multiplayer guessing game.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` with your backend URL:

```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:3012
```

3. Run the app:

```bash
npm run dev
```

## Deploying (Vercel + External Backend)

This project uses Socket.IO for real-time gameplay. Vercel is great for the Next.js frontend, but long-lived Socket.IO servers should run on a persistent Node host (for example Render, Railway, Fly.io, or VPS).

1. Deploy `backend/` to a Node host.
2. Set backend env vars:

```bash
PORT=3012
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

3. Deploy `frontend/` to Vercel.
4. In Vercel project settings, add:

```bash
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com
```

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run start` - run production build locally
- `npm run lint` - lint project
