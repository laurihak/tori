
FROM node:14-alpine as build-stage

WORKDIR /app

COPY . .

RUN npm ci && npm run build

FROM nginx:1.18
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /app/.cert /usr/share/nginx/.cert
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# CMD ["bash"]