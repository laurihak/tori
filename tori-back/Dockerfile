
FROM node:14-alpine as builder

WORKDIR /app
RUN apk update
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm config set python /usr/bin/python
RUN npm i -g npm
RUN npm install
RUN npm rebuild bcrypt --build-from-source
RUN apk del builds-deps
COPY package*.json ./
COPY . .
RUN npm ci --only=production
CMD ["node", "index.js"]