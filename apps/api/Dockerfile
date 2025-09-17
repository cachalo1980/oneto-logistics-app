# Archivo: apps/api/Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
RUN npm install --omit=dev
COPY . .
RUN npm run build -w @oneto/api

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
COPY --from=builder /app/apps/api/dist ./dist
CMD [ "node", "dist/main" ]