# Archivo: apps/api/Dockerfile (VERSIÓN FINAL CON BASE DEBIAN)

# --- Stage 1: Builder ---
# Usamos una imagen base de Debian (Bullseye) que es más compatible.
FROM node:18-bullseye-slim AS builder 
WORKDIR /app

# Copiamos el proyecto completo para asegurar que el build tenga todo lo que necesita.
COPY . .
# Instalamos TODAS las dependencias para la construcción.
RUN npm install
# Construimos la aplicación.
RUN npm run build -w @oneto/api


# --- Stage 2: Production ---
# Usamos la misma base de Debian para la imagen final.
FROM node:18-bullseye-slim AS production 
WORKDIR /app
ENV NODE_ENV=production

# Copiamos los manifiestos para una instalación de producción limpia.
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/apps/api/package.json ./apps/api/

# Instalamos SOLAMENTE las dependencias de producción.
RUN npm install --omit=dev

# Copiamos la aplicación ya construida.
COPY --from=builder /app/apps/api/dist ./dist
# Copiamos los datos del seeder.
COPY --from=builder /app/apps/api/src/seed/data ./src/seed/data

CMD [ "node", "dist/main" ]