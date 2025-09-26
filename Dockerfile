FROM node:22.17.0-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:22.17.0-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install --prod --frozen-lockfile
CMD ["pnpm", "start:prod"]
