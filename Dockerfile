# Stage 1: Install dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare yarn@4.0.2 --activate
WORKDIR /app

# Copy workspace config and lockfile
COPY package.json yarn.lock .yarnrc.yml ./

# Copy all package.json files for workspace resolution
COPY apps/web/package.json ./apps/web/
COPY packages/types/package.json ./packages/types/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/

RUN yarn install

# Stage 2: Build the application
FROM node:18-alpine AS builder
RUN corepack enable && corepack prepare yarn@4.0.2 --activate
WORKDIR /app

# Copy full source and node_modules from deps
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.yarnrc.yml ./.yarnrc.yml
COPY . .

# Build shared packages first, then the web app
RUN yarn build:packages
RUN yarn build:web

# Stage 3: Production runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone build output
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
