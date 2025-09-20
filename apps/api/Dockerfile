# Archivo: apps/api/Dockerfile

# --- Stage 1: Build ---
FROM node:18-bullseye-slim AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY . .

# --- ¡CAMBIO CLAVE! ---
# Le decimos a pnpm que estamos en un entorno no interactivo.
ENV CI=true
RUN pnpm install --frozen-lockfile

RUN pnpm --filter @oneto/api build

# --- Stage 2: Production ---
FROM node:18-bullseye-slim
WORKDIR /app
ENV NODE_ENV=production
RUN npm install -g pnpm
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/pnpm-workspace.yaml ./

# --- ¡CAMBIO CLAVE! ---
ENV CI=true
RUN pnpm install --unsafe-perm=true --frozen-lockfile
RUN pnpm install --prod --unsafe-perm=true --frozen-lockfile

COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/src/seed/data ./src/seed/data
CMD [ "node", "dist/main" ]