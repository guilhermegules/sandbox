FROM node:24-alpine AS builder
WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++ libc6-compat || true

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig*.json ./
COPY libs ./libs
COPY apps/orders/package.json ./apps/orders/package.json
COPY apps/orders/tsconfig*.json ./apps/orders/
COPY apps/orders/nest-cli.json ./apps/orders/nest-cli.json
COPY apps/orders/src ./apps/orders/src

RUN npm run build:orders
RUN npm prune --production

FROM node:24-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 3001
CMD ["node", "dist/apps/orders/src/main.js"]
