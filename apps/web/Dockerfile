# Archivo: apps/web/Dockerfile (VERSIÓN DE FUERZA BRUTA)
FROM node:18-bullseye-slim
WORKDIR /app
ENV NODE_ENV=production
RUN npm install -g pnpm
COPY . .
ENV CI=true
RUN pnpm install --frozen-lockfile --unsafe-perm=true
ENV NEXT_PUBLIC_API_URL=/api
RUN pnpm --filter @oneto/web build
EXPOSE 3000
CMD ["node", "server.js"]