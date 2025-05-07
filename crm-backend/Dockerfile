# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Gere os arquivos do Prisma se estiver usando
RUN npx prisma generate

# Etapa 2: Runtime
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app /app

ENV NODE_ENV=production
CMD ["node", "server.js"]
