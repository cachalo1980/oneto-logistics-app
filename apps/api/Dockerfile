# Archivo: apps/api/Dockerfile (VERSIÓN FINAL Y ROBUSTA)

# --- Stage 1: Build - Prepara e instala todo ---
FROM node:18-alpine AS builder
WORKDIR /app

# Copia los manifiestos de paquetes
COPY package*.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

# Instala TODAS las dependencias
RUN npm install

# Copia todo el código fuente
COPY . .
    
# Construye la aplicación de API
RUN npm run build -w @oneto/api


# --- Stage 2: Production - Ensambla la imagen final ---
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production

# ¡CAMBIO CLAVE! Copiamos la carpeta node_modules completa desde el builder.
# No volvemos a ejecutar 'npm install'.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copiamos la aplicación ya construida
COPY --from=builder /app/apps/api/dist ./dist

# Copiamos los datos del seeder
COPY --from=builder /app/apps/api/src/seed/data ./src/seed/data

CMD [ "node", "dist/main" ]