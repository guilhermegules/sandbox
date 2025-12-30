# Notification system

```
Browser (Next.js)
   │
   │  SSE (HTTP stream)
   ▼
Next.js API Route (SSE Gateway)
   │
   │  Pub/Sub
   ▼
Redis
   │
   │  Events
   ▼
Order Service (mock / producer)
```

## Getting Started

First, run the docker compose to start redis:

```bash
docker compose up
```

Then development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
