FROM node:18-bullseye-slim
WORKDIR /usr/src/oneto-logistics-app
ENV NODE_ENV=production
RUN npm install -g pnpm
COPY . .
ENV CI=true
RUN pnpm install --frozen-lockfile --unsafe-perm=true
RUN pnpm --filter @oneto/api build
CMD [ "pnpm", "--filter", "@oneto/api", "start:prod" ]