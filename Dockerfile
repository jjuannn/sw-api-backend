FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build
RUN npm prune --production

FROM node:20-alpine

RUN apk update && apk add --no-cache \
    docker-cli \
    git \
    && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app
ENV NODE_ENV production
ENV DOCKER_CONTENT_TRUST=0

COPY package.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/src/main.js"] 