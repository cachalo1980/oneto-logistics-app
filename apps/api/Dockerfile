# Archivo: apps/api/Dockerfile (VERSIÓN FINAL DEFINITIVA)

# --- Stage 1: Builder ---
# Instala todas las dependencias y construye el código fuente
FROM node:18-alpine AS builder
WORKDIR /app

# Copia todos los manifiestos de paquetes
COPY package*.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

# Instala TODAS las dependencias (incluidas dev)
RUN npm install

# Copia el resto del código fuente
COPY . .
    
# Construye la aplicación
RUN npm run build -w @oneto/api

# --- Stage 2: Production ---
# Crea la imagen final, limpia y optimizada
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production

# ¡PASO CLAVE! Copiamos los package.json para crear un entorno de producción limpio
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/apps/api/package.json ./apps/api/
# No necesitamos el package.json de 'web' aquí

# Instalamos SOLAMENTE las dependencias de producción basándonos en el package-lock.json
# Esto crea un 'node_modules' limpio y correcto para producción.
RUN npm install --omit=dev

# Copiamos la aplicación ya construida desde el stage 'builder'
COPY --from=builder /app/apps/api/dist ./dist

# Copiamos los datos del seeder
COPY --from=builder /app/apps/api/src/seed/data ./src/seed/data

CMD [ "node", "dist/main" ]