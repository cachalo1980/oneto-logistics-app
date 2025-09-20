# Archivo: apps/api/Dockerfile (VERSIÓN FINAL CON BASE DEBIAN)

# --- Stage 1: Builder ---
FROM node:18-bullseye-slim AS builder 
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -w @oneto/api

# --- Stage 2: Production ---
FROM node:18-bullseye-slim AS production 
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/apps/api/package.json ./apps/api/
RUN npm install --omit=dev
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/src/seed/data ./src/seed/data
CMD [ "node", "dist/main" ]