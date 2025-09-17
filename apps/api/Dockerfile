# Archivo: apps/api/Dockerfile (CORREGIDO)

# --- Stage 1: Build ---
# En este stage, instalamos TODAS las dependencias para poder construir
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

# ¡CORRECCIÓN! Instalamos TODO, incluidas las devDependencies
RUN npm install

# Copiamos el resto del código fuente
COPY . .
    
# Ahora 'nest' existirá y el build funcionará
RUN npm run build -w @oneto/api

# --- Stage 2: Production ---
# En este stage, creamos una imagen limpia solo con lo necesario para EJECUTAR
FROM node:18-alpine
WORKDIR /app

# Volvemos a instalar, pero esta vez solo las dependencias de PRODUCCIÓN
COPY package*.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
RUN npm install --omit=dev

# Copiamos la aplicación ya construida desde el stage anterior
COPY --from=builder /app/apps/api/dist ./dist

CMD [ "node", "dist/main" ]