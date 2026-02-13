# multi-stage Dockerfile for the Gateway service
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# optionally include build tools (kept in builder only)
RUN apk add --no-cache python3 make g++ libc6-compat || true

# copy workspace manifests and app sources needed for build
COPY package.json package-lock.json ./
COPY tsconfig*.json ./
COPY libs ./libs
COPY apps/gateway/package.json ./apps/gateway/package.json
COPY apps/gateway/nest-cli.json ./apps/gateway/nest-cli.json
COPY apps/gateway/src ./apps/gateway/src

# install and build the gateway (uses workspace build script)
RUN npm ci
RUN npm run build:gateway

# remove devDependencies to keep the final image small
RUN npm prune --production

# --- final image ---
FROM node:20-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

# copy runtime artifacts
COPY --from=builder /usr/src/app/dist/apps/gateway ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 3002
CMD ["node", "dist/main"]
