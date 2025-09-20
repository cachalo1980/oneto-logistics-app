# Archivo: apps/web/Dockerfile

# --- Stage 1: Build ---
FROM node:18-bullseye-slim AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY . .

# --- ¡CAMBIO CLAVE! ---
ENV CI=true
RUN pnpm install --unsafe-perm=true --frozen-lockfile

ENV NEXT_PUBLIC_API_URL=/api
RUN pnpm --filter @oneto/web build

# --- Stage 2: Production ---
# La etapa de producción del web no ejecuta 'pnpm install', por lo que no necesita el cambio.
FROM node:18-bullseye-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
EXPOSE 3000
CMD ["node", "apps/web/server.js"]