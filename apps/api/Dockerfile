# Archivo: apps/api/Dockerfile (VERSIÓN ROBUSTA)

# --- Stage 1: Base - Instala todas las dependencias ---
FROM node:18-alpine AS base
WORKDIR /app

# Copiamos solo los archivos de manifiesto primero para cachear las dependencias
COPY package*.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

# Instalamos TODAS las dependencias, incluidas las de desarrollo
RUN npm install

# --- Stage 2: Build - Construye la aplicación ---
FROM base AS build
WORKDIR /app

# Copiamos todo el código fuente encima de las dependencias ya instaladas
COPY . .

# Construimos la API
RUN npm run build -w @oneto/api

# --- Stage 3: Production - Crea la imagen final limpia ---
FROM node:18-alpine AS production
WORKDIR /app

# Copiamos el package.json de la API y el de la raíz para instalar solo las deps de producción
COPY --from=base /app/package*.json ./
COPY --from=base /app/apps/api/package.json ./apps/api/

# ¡Paso clave! Instalamos SOLO las dependencias de PRODUCCIÓN
RUN npm install --workspace @oneto/api --omit=dev

# Copiamos la aplicación ya construida desde el stage de 'build'
COPY --from=build /app/apps/api/dist ./dist

# Copiamos los datos del seeder
COPY --from=build /app/apps/api/src/seed/data ./src/seed/data

# El comando de ejecución no cambia
CMD [ "node", "dist/main" ]