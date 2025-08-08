# SSR Dashboard

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- Server-side rendering (SSR)
- MongoDB integration
- Ready-to-use dashboard structure

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and update it with your MongoDB connection string:

```bash
cp .env.example .env
```

Edit `.env` and set your `MONGODB_URI` and any other required variables.

### 3. Start MongoDB

You can use Docker to start a local MongoDB instance:

```bash
docker-compose up -d
```

Or install MongoDB locally and ensure it's running.

### 4. Seed the Database

Run the seed script to populate the database with initial data:

```bash
npm run seed
```

> The seed script is located at `src/scripts/mongodb/seed.ts`. Make sure your environment variables are set before running.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub repository](https://github.com/vercel/next.js)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for
