
FROM node:14-alpine as build-stage

WORKDIR /app

COPY . .

RUN npm ci --only=production && npm run build

FROM nginx:1.18
COPY --from=build-stage /app/build /usr/share/nginx/html
# certs used for https testing
# COPY --from=build-stage /app/.cert /usr/share/nginx/.cert
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# CMD ["bash"]