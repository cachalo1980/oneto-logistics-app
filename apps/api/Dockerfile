# Archivo: apps/api/Dockerfile (VERSIÓN DE FUERZA BRUTA)

FROM node:18-bullseye-slim
WORKDIR /app
ENV NODE_ENV=production

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia todo el proyecto
COPY . .

# Le decimos a pnpm que estamos en un entorno no interactivo
ENV CI=true
# Instala TODAS las dependencias. La carpeta node_modules resultante es la que usaremos.
RUN pnpm install --frozen-lockfile --unsafe-perm=true

# Construye la aplicación
RUN pnpm --filter @oneto/api build

# El comando de inicio usa la carpeta 'dist' que acabamos de crear
CMD [ "node", "dist/main" ]