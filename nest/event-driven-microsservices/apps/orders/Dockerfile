# multi-stage Dockerfile for the Orders microservice
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++ libc6-compat || true

COPY package.json package-lock.json ./
COPY tsconfig*.json ./
COPY libs ./libs
COPY apps/orders/package.json ./apps/orders/package.json
COPY apps/orders/nest-cli.json ./apps/orders/nest-cli.json
COPY apps/orders/src ./apps/orders/src

RUN npm ci
RUN npm run build:orders
RUN npm prune --production

FROM node:20-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=builder /usr/src/app/dist/apps/orders ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 3001
CMD ["node", "dist/main"]
