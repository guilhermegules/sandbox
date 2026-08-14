FROM node:24-alpine AS builder
WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++ libc6-compat || true

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig*.json ./
COPY libs ./libs
COPY apps/gateway/package.json ./apps/gateway/package.json
COPY apps/gateway/tsconfig*.json ./apps/gateway/
COPY apps/gateway/nest-cli.json ./apps/gateway/nest-cli.json
COPY apps/gateway/src ./apps/gateway/src

RUN npm run build:gateway
RUN npm prune --production

FROM node:24-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 3002
CMD ["node", "dist/apps/gateway/src/main.js"]
