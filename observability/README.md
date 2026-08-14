# Observability Playground - Node.js/TypeScript

Check more information on the `/docs` folder.

## Motivation

This project was created to learn observability hands-on with a Node.js project. It demonstrates how to collect, store, and visualize logs and metrics using industry-standard tools like Loki and Grafana.

## Scripts

```bash
# Install dependencies
npm install

# Run in development mode with hot-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server (after build)
npm start

# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Prisma commands
npm run db:generate   # Generate Prisma Client
npm run db:push       # Push schema to database
npm run db:migrate    # Run database migrations
npm run db:studio    # Open Prisma Studio
```

## Prisma (Database)

This project uses Prisma ORM v7 with PostgreSQL. The database connection URL is configured in `prisma.config.ts`.

### Commands

```bash
# Generate Prisma Client from schema
npm run db:generate
# or: npx prisma generate

# Push schema changes to database (creates tables if they don't exist)
npm run db:push
# or: npx prisma db push

# Create and apply new migration
npm run db:migrate
# or: npx prisma migrate dev

# Open Prisma Studio (GUI for browsing data)
npm run db:studio
# or: npx prisma studio
```

### Migration Workflow

```bash
# 1. Modify prisma/schema.prisma with your changes

# 2. Push to database (for development) or create migration
npm run db:push    # Quick sync - good for dev
# or
npm run db:migrate # Creates proper migration files

# 3. Regenerate Prisma Client
npm run db:generate
```

### Using Prisma Studio

```bash
# Opens a web interface to view/edit database
npm run db:studio
```

Note: Prisma Studio will use the `DATABASE_URL` from your `.env` file.

## API Endpoints

| Method   | Route                      | Description                      |
| -------- | -------------------------- | -------------------------------- |
| `GET`    | `/health`                  | Health check                     |
| `POST`   | `/urls`                    | Create short URL                 |
| `GET`    | `/urls/:id`                | Get URL details                  |
| `PATCH`  | `/urls/:id`                | Update URL/expiration            |
| `DELETE` | `/urls/:id`                | Delete URL                       |
| `GET`    | `/urls?page=1&per_page=10` | List URLs (paginated)            |
| `GET`    | `/:code`                   | Redirect + increment click count |
| `GET`    | `/urls/:id/stats`          | Click statistics                 |
| `GET`    | `/urls/:id/qr`             | QR code (base64 PNG)             |

### Example Requests

```bash
# Create URL
curl -X POST http://localhost:3001/urls \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com"}'

# Create with custom code
curl -X POST http://localhost:3001/urls \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com", "custom_code": "gsearch"}'

# Create with expiration
curl -X POST http://localhost:3001/urls \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com", "expires_at": "2026-12-31T23:59:59Z"}'

# List with pagination
curl "http://localhost:3001/urls?page=1&per_page=20"

# Get stats
curl http://localhost:3001/urls/{id}/stats

# Get QR code
curl http://localhost:3001/urls/{id}/qr
```

## Testing

The project uses **Test-Driven Development (TDD)** with Vitest:

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Coverage

| Test Suite   | Tests | Description                           |
| ------------ | ----- | ------------------------------------- |
| `AppError`   | 8     | Error class hierarchy                 |
| `Url`        | 6     | Entity behavior and serialization     |
| `UrlService` | 20    | Business logic with mocked repository |

## Docker

```bash
# Build and start containers
docker compose up --build

# Stop and remove volumes
docker compose down -v

# View logs
docker compose logs -f app

# Run shell in container
docker compose exec app sh
```

## Environment Variables

| Variable       | Default                                                | Description                  |
| -------------- | ------------------------------------------------------ | ---------------------------- |
| `DATABASE_URL` | `postgres://postgres:postgres@localhost:5432/postgres` | PostgreSQL connection string |
| `PORT`         | `3000`                                                 | Server port                  |
| `HOST`         | `0.0.0.0`                                              | Server host                  |

## Loki & Grafana

This project includes Loki for log aggregation and Grafana for visualization.

### Linking Loki to Grafana

1. Open Grafana at http://localhost:3002
2. Go to **Connections** → **Data Sources**
3. Click **Add data source**
4. Select **Loki**
5. In the URL field, enter: `http://loki:3100`
6. Click **Save & Test**

### Making a Simple Query

In Grafana's Explore view:

1. Select the Loki data source
2. Enter this LogQL query:
   ```
   {service="app"} | json
   ```
3. Click **Run query**

This will:

- Match all logs with the label `service="app"`
- Parse the log line as JSON for easier filtering

#### Useful LogQL Patterns

```bash
# All logs from the app service
{service="app"}

# Filter by specific field after JSON parsing
{service="app"} | json | level="error"

# Count logs per minute
count_over_time({service="app"}[1m])
```
