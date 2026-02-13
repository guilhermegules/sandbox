# multi-stage Dockerfile for the Inventory microservice
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++ libc6-compat || true

COPY package.json package-lock.json ./
COPY tsconfig*.json ./
COPY libs ./libs
COPY apps/inventory/package.json ./apps/inventory/package.json
COPY apps/inventory/nest-cli.json ./apps/inventory/nest-cli.json
COPY apps/inventory/src ./apps/inventory/src

RUN npm ci
RUN npm run build:inventory
RUN npm prune --production

FROM node:20-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=builder /usr/src/app/dist/apps/inventory ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 3000
CMD ["node", "dist/main"]
