FROM postgres:13-alpine
WORKDIR /app
ENV POSTGRES_USER=username
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=tori
EXPOSE 5432
EXPOSE 4000
## VOLUME ./postgresdata /var/lib/postgresql/data
COPY ./initdb.sql /docker-entrypoint-initdb.d/initdb.sql
