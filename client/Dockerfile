# =========================
# Stage 1: dependencies
# =========================
FROM node:24-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Copy package manifests
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Install dependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

# =========================
# Stage 2: build
# =========================
FROM node:24-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build static site; `next export` is no longer needed
RUN npm run build

# =========================
# Stage 3: runtime (NGINX)
# =========================
FROM nginx:1.29.1-alpine AS runner
WORKDIR /usr/share/nginx/html

# Remove default content
RUN rm -rf ./*

# Copy static site output from builder
COPY --from=builder /app/out ./

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]