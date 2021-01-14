
FROM node:14-alpine

WORKDIR /app
RUN apk update
COPY package*.json ./
COPY . .
RUN npm ci --only=production
CMD ["node", "index.js"]