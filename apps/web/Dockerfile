# Archivo: apps/web/Dockerfile (CORREGIDO)

# --- Stage 1: Build ---
# Instalamos todo para poder construir la app de Next.js
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

# ¡CORRECCIÓN! Instalamos todo, incluidas las devDependencies
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Pasamos la variable de entorno para la API
ENV NEXT_PUBLIC_API_URL=/api

# Construimos el frontend
RUN npm run build -w @oneto/web

# --- Stage 2: Production ---
# Creamos la imagen final, ligera y optimizada
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production

# Copiamos solo el resultado de la construcción (standalone) desde el stage anterior.
# Esto incluye una carpeta node_modules optimizada.
COPY --from=builder /app/apps/web/.next/standalone ./
# Copiamos los assets estáticos
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

EXPOSE 3000
CMD ["node", "apps/web/server.js"]