# Archivo: apps/web/Dockerfile (VERSIÓN FINAL CON BASE DEBIAN)

# --- Stage 1: Builder ---
# Usamos la imagen base de Debian.
FROM node:18-bullseye-slim AS builder 
WORKDIR /app

COPY . .
RUN npm install
ENV NEXT_PUBLIC_API_URL=/api
RUN npm run build -w @oneto/web

# --- Stage 2: Production ---
# Usamos la misma base para la imagen final.
FROM node:18-bullseye-slim 
WORKDIR /app
ENV NODE_ENV=production

# Copiamos el resultado de la construcción 'standalone' que ya incluye un node_modules optimizado.
COPY --from=builder /app/apps/web/.next/standalone ./
# Copiamos los assets estáticos.
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

EXPOSE 3000
CMD ["node", "apps/web/server.js"]